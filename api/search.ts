import { GoogleGenAI, Type } from "@google/genai";

async function generateContentWithRetry(
    ai: any,
    params: { model: string; contents: any; config?: any },
    maxRetries = 3,
    initialDelayMs = 1500
): Promise<any> {
    let delay = initialDelayMs;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await ai.models.generateContent({
                model: params.model,
                contents: params.contents,
                config: params.config,
            });
            return response;
        } catch (error: any) {
            const errStr = String(error?.message || error || "").toLowerCase();
            const isTransient = /503|429|resource_exhausted|unavailable|overloaded|rate_limit|quota/.test(errStr);
            if (isTransient && attempt < maxRetries) {
                await new Promise((resolve) => setTimeout(resolve, delay));
                delay *= 2;
            } else {
                throw error;
            }
        }
    }
}

export default async function handler(req: any, res: any) {
    if (req.method !== "POST") return res.status(405).end();

    const { query } = req.body;
    if (!query || typeof query !== "string") {
        return res.status(400).json({ error: "Query is required and must be a string." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.json({
            source: "fallback",
            error: "Please configure your GEMINI_API_KEY in Settings to enable real-time dynamic AI search for any raw behaviour!"
        });
    }

    try {
        const ai = new GoogleGenAI({
            apiKey,
            httpOptions: { headers: { "User-Agent": "aistudio-build" } }
        });

        const promptText = `
      You are an advanced psychology categorization assistant for students running in 'Mind Compass'.
      The student has typed this everyday, raw, non-technical behavior query: "${query}".

      Please map this behavior to:
      1. Clinical Concept/Disorder Name (e.g., "Panic Disorder", "ADHD", "Fear of Public Spaces (Agoraphobia)", "Generalized Anxiety Disorder (GAD)", "Major Depressive Disorder (MDD)", "Post-Traumatic Stress Disorder (PTSD)", "Borderline Personality Disorder (BPD)", "Bipolar Disorder", "Insomnia"). Make it simple and easy to understand. Keep in mind common clinical concepts like OCD, Agoraphobia, ADHD, DPDR, Panic Disorder, Anorexia, Social Anxiety, GAD, Depression, PTSD, BPD, Bipolar, or Insomnia, but you are free to find others if they suit the query better.
      2. Exactly a 2-sentence explanation of the behavior in very simple, clear, everyday, non-jargon, compassionate prose.
      3. Outside Action (what observers or friends can see: "What people see: [list of simple actions]").
      4. Inside Mind (what they actually feel internally: "What they actually feel: [internal fears/thoughts]").
      5. Match Meter rankings: List 2 to 3 related psychiatric conditions or states with simple names and realistic match percentages.
      6. Tri-Origin framework dissection in simple English:
         - Body: Simple description of biological factors (e.g., brain signals, genetics, or body chemicals).
         - Mind: Simple description of feelings, coping habits, or negative thoughts.
         - World: Simple description of family environment, childhood, or stressful situations.
      7. Clinical Voice Note clip simulation:
         - Title (e.g., 'Anonymized Case Note #302')
         - Duration (e.g., '1:30')
         - Description: Very simple summary of the case.
         - Narrator: A realistic female doctor or counselor's name (e.g., 'Dr. Sarah Jenkins', 'Dr. Catherine Voss', 'Dr. Rebecca Stern', 'Dr. Elena Patel').
         - Transcript: A simple 2-3 sentence observation modeling the session details.
      8. Childhood Environment: Simple English explanation of the early child family surroundings (1 clear sentence).
      9. Childhood Causes: Simple English explanation of the youth developmental triggers or early psychological adaptations (1 clear sentence).
      10. Analogy: An engaging, clear, highly compassionate analogy comparing this condition/behavior to a common physical object or everyday situation to normalize the condition.
      11. Conversation/Behavioral Scenario: A simulated conversation or behavioral scene showing how the behavior plays out in real life between the person suffering from it and a friend, colleague, or partner. Include:
          - A brief context scene description.
          - Exactly 2 or 3 dialogue exchanges. For each line, specify the speaker's name, their outer speech, and their unspoken inner thoughts.

      Ensure that the response is returned matching the requested JSON schema. Write clear, simple, and compassionate content using beginner-level English. NO heavy medical jargon.
    `;

        const response = await generateContentWithRetry(ai, {
            model: "gemini-2.0-flash",
            contents: promptText,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        clinicalConcept: { type: Type.STRING },
                        shortExplanation: { type: Type.STRING },
                        outsideAction: { type: Type.STRING },
                        insideMind: { type: Type.STRING },
                        matchMeter: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    disorder: { type: Type.STRING },
                                    percentage: { type: Type.INTEGER }
                                },
                                required: ["disorder", "percentage"]
                            }
                        },
                        triOrigin: {
                            type: Type.OBJECT,
                            properties: {
                                body: { type: Type.STRING },
                                mind: { type: Type.STRING },
                                world: { type: Type.STRING }
                            },
                            required: ["body", "mind", "world"]
                        },
                        audioVisualMock: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING },
                                duration: { type: Type.STRING },
                                description: { type: Type.STRING },
                                narrator: { type: Type.STRING },
                                transcript: { type: Type.STRING }
                            },
                            required: ["title", "duration", "description", "narrator", "transcript"]
                        },
                        childhoodEnvironment: { type: Type.STRING },
                        childhoodCauses: { type: Type.STRING },
                        analogy: { type: Type.STRING },
                        conversationScenario: {
                            type: Type.OBJECT,
                            properties: {
                                context: { type: Type.STRING },
                                dialogue: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            speaker: { type: Type.STRING },
                                            speech: { type: Type.STRING },
                                            innerThought: { type: Type.STRING }
                                        },
                                        required: ["speaker", "speech", "innerThought"]
                                    }
                                }
                            },
                            required: ["context", "dialogue"]
                        }
                    },
                    required: [
                        "clinicalConcept", "shortExplanation", "outsideAction", "insideMind",
                        "matchMeter", "triOrigin", "audioVisualMock", "childhoodEnvironment",
                        "childhoodCauses", "analogy", "conversationScenario"
                    ]
                }
            }
        });

        if (response && response.text) {
            const resultJson = JSON.parse(response.text.trim());
            return res.json({ source: "gemini", result: resultJson });
        } else {
            throw new Error("Empty response from Gemini API");
        }

    } catch (e: any) {
        const errStr = String(e?.message || e || "");
        const isQuotaError = /quota|RESOURCE_EXHAUSTED|exceeded|429/.test(errStr);
        return res.status(isQuotaError ? 429 : 500).json({
            error: isQuotaError ? "QUOTA_EXCEEDED" : "Gemini analysis error: " + e.message,
            details: e.message
        });
    }
}