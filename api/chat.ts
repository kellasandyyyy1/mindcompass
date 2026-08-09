import Groq from "groq-sdk";

// ---------------------------------------------------------------------------
// Retry helper — same exponential back-off pattern as the Gemini version.
// Retries on 429 / 503 / rate-limit / quota / overloaded transient errors.
// ---------------------------------------------------------------------------
async function chatWithRetry(
    client: Groq,
    params: Groq.Chat.ChatCompletionCreateParamsNonStreaming,
    maxRetries = 3,
    initialDelayMs = 1500
): Promise<Groq.Chat.ChatCompletion> {
    let delay = initialDelayMs;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await client.chat.completions.create(params);
        } catch (error: any) {
            const errStr = String(error?.message || error || "").toLowerCase();
            const isTransient =
                /503|429|resource_exhausted|unavailable|overloaded|rate_limit|quota/.test(errStr);
            if (isTransient && attempt < maxRetries) {
                await new Promise((resolve) => setTimeout(resolve, delay));
                delay *= 2;
            } else {
                throw error;
            }
        }
    }
    // TypeScript requires a return — unreachable in practice.
    throw new Error("Max retries exceeded");
}

// ---------------------------------------------------------------------------
// Vercel serverless handler — same req/res contract as before.
// Input:  { history: Array<{ sender: string; text: string }>, mood?: string }
// Output: { success: true, reply: string, followUps: string[] }
//      OR  { error: string, reply: string, followUps: string[] }  on failure
// ---------------------------------------------------------------------------
export default async function handler(req: any, res: any) {
    if (req.method !== "POST") return res.status(405).end();

    const { history, mood } = req.body;
    if (!history || !Array.isArray(history)) {
        return res.status(400).json({ error: "History is required as an array." });
    }

    // ------------------------------------------------------------------
    // Guard: missing / placeholder key → return the same fallback message.
    // ------------------------------------------------------------------
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey === "MY_GROQ_API_KEY") {
        return res.json({
            reply: "Hello! I am your AI Chat Companion here at Mind Compass. I would love to help you discuss your symptoms, explore your emotional patterns, and offer wellness insights within the Body, Mind, and World framework.\n\n*Important Disclaimer: I am an educational AI companion and not a licensed clinician. I do not provide medical diagnoses or healthcare treatment. If you are experiencing distress, please seek professional support.*\n\nSince no active Groq API key is configured on this server, I am using this default fallback message.",
            followUps: ["How can I find my clinical patterns?", "Show me a simple breathing exercise."]
        });
    }

    try {
        const client = new Groq({ apiKey });

        // ----------------------------------------------------------------
        // Build the message array for Groq's OpenAI-compatible chat format.
        // ----------------------------------------------------------------
        const moodInstruction = mood
            ? `The user did a mood check-in and is currently feeling: "${mood}". Sympathize gently with this mood in your tone and suggest tailored advice.`
            : "";

        const systemPrompt = `
You are the Mind Compass AI Chat Companion, a compassionate, educational psychology chat assistant.
Your goal is to help users understand their thoughts, feelings, somatic sensations, or behavioral indicators under the Tri-Origin framework (Body, Mind, World).

CRITICAL DIRECTIVE: You are NOT a medical professional or clinical doctor. You MUST explicitly state in your reply that you do NOT provide medical diagnoses or healthcare treatment, and that your feedback is for educational exploration only.

Persona: Deeply warm, supportive, structured, and objective.

Features to cover:
- Conversational assessment of user-reported symptoms or experiences.
- Gentle, helpful follow-up questions to prompt self-reflection.
- Personalized, action-oriented recommendations based on the Tri-Origin parameters: Body, Mind, and World.
- Direct acknowledgement of the user's current mood state if provided.

${moodInstruction}

IMPORTANT — Output Format:
You MUST respond with a single valid JSON object and nothing else. Do not wrap it in markdown fences.
The JSON object must have exactly these two fields:
{
  "reply": "Markdown formatted string containing your response and the required medical disclaimer.",
  "followUps": ["Option 1 (Under 50 chars)", "Option 2 (Under 50 chars)"]
}
Do not include any text before or after the JSON object.
`;

        // Map history to Groq's message format.
        const messages: Groq.Chat.ChatCompletionMessageParam[] = [
            { role: "system", content: systemPrompt },
            ...history.map((msg: any) => ({
                role: (msg.sender === "user" ? "user" : "assistant") as "user" | "assistant",
                content: msg.text as string,
            })),
        ];

        // ----------------------------------------------------------------
        // Call Groq with JSON mode enabled (response_format: json_object).
        // ----------------------------------------------------------------
        const completion = await chatWithRetry(client, {
            model: "llama-3.3-70b-versatile",
            messages,
            response_format: { type: "json_object" },
            temperature: 0.7,
        });

        const rawContent = completion.choices[0]?.message?.content ?? "";

        if (!rawContent.trim()) {
            throw new Error("Empty response from Groq API");
        }

        // ----------------------------------------------------------------
        // Safe JSON parse — fall through to catch block on malformed JSON.
        // ----------------------------------------------------------------
        let parsed: { reply?: string; followUps?: string[] };
        try {
            parsed = JSON.parse(rawContent.trim());
        } catch {
            throw new Error("Groq returned malformed JSON: " + rawContent.slice(0, 200));
        }

        if (!parsed.reply || !Array.isArray(parsed.followUps)) {
            throw new Error("Groq response missing required fields: " + rawContent.slice(0, 200));
        }

        return res.json({ success: true, reply: parsed.reply, followUps: parsed.followUps });

    } catch (e: any) {
        console.error("AI Chat companion failed:", e);
        return res.status(500).json({
            error: "Failed to generate response: " + e.message,
            reply: "I am having some connection trouble right now. Please keep in mind that I am an AI companion and cannot offer a medical diagnosis. If you need immediate support, please reach out to trusted local services.",
            followUps: ["Let's try again in a moment.", "Can we try a breathing check-in?"]
        });
    }
}
