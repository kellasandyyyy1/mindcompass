import { GoogleGenAI, Type } from "@google/genai";
import { getOfflineQuiz } from "../src/data/offlineQuizzes.js";

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

    let { difficulty, category } = req.body;

    const categories = [
        "Anxiety Disorders", "Depression & Moods", "ADHD & Executive Function",
        "OCD & Intrusive Loops", "PTSD & Complex Trauma", "Bipolar Spectrum",
        "Borderline Personality", "Schizophrenia Spectrum", "Eating Disorders Awareness",
        "Stress & Burnout Syndrome", "Sleep & Circadian Rhythm", "Somatic Symptom Challenges",
        "Grief & Deep Bereavement", "Mental Health Myth-Busting", "Emotional Intelligence & EQ",
        "Supportive Dialogue & Empathy", "Panic & Phobia Responses",
        "Perfectionism & Cognitive Distortion", "Dissociative Disorders",
        "Autism Spectrum Conditions", "Narcissistic Personality Dynamics",
        "Seasonal Affective Disorder (SAD)", "Generalized Anxiety (GAD)",
        "Postpartum Mood Challenges", "Social Anxiety & Avoidance",
        "Insomnia & Cognitive Flight", "Substance Use & Co-occurring Status",
        "Body Dysmorphic Disorder (BDD)", "Adjustment & Life Transitions",
        "Sensory Processing Sensitivity"
    ];

    if (!difficulty || !["Beginner", "Intermediate", "Advanced"].includes(difficulty)) {
        difficulty = "Beginner";
    }

    if (!category || !categories.includes(category)) {
        category = categories[Math.floor(Math.random() * categories.length)];
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        const offlineQuestions = getOfflineQuiz(category, difficulty);
        return res.json({
            success: true,
            source: "offline-fallback",
            category,
            difficulty,
            questions: offlineQuestions
        });
    }

    try {
        const ai = new GoogleGenAI({
            apiKey,
            httpOptions: { headers: { "User-Agent": "aistudio-build" } }
        });

        const systemInstruction = `
      You are the Mind Compass Infinite Quiz Generator, a compassionate psychology educator and clinical researcher.
      Your goal is to build an interactive mental health quiz to help students learn about various states of mind.
      
      Generate exactly 5 highly engaging, technically rigorous, and completely unique questions for the category: "${category}" at a difficulty level suitable for an "${difficulty}" reader.
      
      CRITICAL EDUCATION RULE: In your answers, remind the user of behavioral patterns and remind them that this is for educational study only, and does not replace diagnostic clinical evaluations.

      Question types MUST be mixed:
      - "myth-fact": Contrast common public myths with real clinical science. Options must be exactly ["Fact", "Myth"].
      - "scenario": Describe a brief human situation and ask what indicator or dynamic it shows.
      - "multiple-choice": Explore clinical concepts, coping methods, or biological factors.
      - "supportive-response": Present a peer or loved one in distress and test the user on selecting the most supportive, empathetic response.
      - "true-learning": Present a nuanced statement where the student needs to find the most accurate clinical fact.

      Difficulty Guidelines:
      - "Beginner": Focus on high-level signs, debunking myths, basic self-compassion, and general mental health hygiene.
      - "Intermediate": Focus on clinical criteria, somatic vs mental responses, coping exercises, and interactive dialogue tools.
      - "Advanced": Focus on nuanced differential considerations, somatic integration, systemic trauma loops, and professional boundaries.
    `;

        const response = await generateContentWithRetry(ai, {
            model: "gemini-2.0-flash",
            contents: `Generate exactly 5 diverse JSON questions under category "${category}" at difficulty level "${difficulty}".`,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        category: { type: Type.STRING },
                        difficulty: { type: Type.STRING },
                        questions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    id: { type: Type.STRING },
                                    type: { type: Type.STRING },
                                    question: { type: Type.STRING },
                                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                                    correctAnswer: { type: Type.STRING },
                                    explanation: { type: Type.STRING }
                                },
                                required: ["id", "type", "question", "options", "correctAnswer", "explanation"]
                            }
                        }
                    },
                    required: ["category", "difficulty", "questions"]
                }
            }
        });

        if (response && response.text) {
            const resultJson = JSON.parse(response.text.trim());
            return res.json({ success: true, source: "gemini", ...resultJson });
        } else {
            throw new Error("Empty response from Gemini API");
        }

    } catch (e: any) {
        console.error("AI dynamic quiz generation failed. Serving fallbacks:", e);
        const offlineQuestions = getOfflineQuiz(category, difficulty);
        return res.json({
            success: true,
            source: "offline-fallback-error",
            category,
            difficulty,
            questions: offlineQuestions
        });
    }
}