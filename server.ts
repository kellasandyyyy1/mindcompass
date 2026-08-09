import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { getOfflineQuiz } from "./src/data/offlineQuizzes";
import { getDifficultyMeta } from "./src/data/quizConfig";
import { PREDEFINED_BEHAVIORS, findMatchingBehavior } from "./src/data/behaviors";

dotenv.config();

const app = express();
app.use(express.json());

/**
 * Reusable helper with exponential backoff retry logic for transient Gemini errors (like 429 and 503).
 */
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
      // Detect transient error states typical of API throttling or overloaded servers
      const isTransient = /503|429|resource_exhausted|unavailable|overloaded|rate_limit|quota/.test(errStr);

      if (isTransient && attempt < maxRetries) {
        console.warn(`[Gemini API] Transient condition met (Attempt ${attempt}/${maxRetries}): "${error.message || error}". Backing off and retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff spacing multiplier
      } else {
        throw error;
      }
    }
  }
}

async function startServer() {
  // API endpoints FIRST
  app.post("/api/search", async (req, res) => {
    const { query } = req.body;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Query is required and must be a string." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      console.warn("GEMINI_API_KEY is not configured or placeholder. Using server-side fallback dataset matching.");
      const localMatch = findMatchingBehavior(query) || PREDEFINED_BEHAVIORS[0];
      return res.json({ source: "fallback", result: localMatch });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
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
        10. Analogy: An engaging, clear, highly compassionate analogy comparing this condition/behavior to a common physical object or everyday situation (e.g., a faulty fire alarm, carrying a heavy iron suit, etc.) to normalize the condition.
        11. Conversation/Behavioral Scenario: A simulated conversation or behavioral scene showing how the behavior plays out in real life between the person suffering from it and a friend, colleague, or partner. Include:
            - A brief context scene description.
            - Exactly 2 or 3 dialogue exchanges. For each line, specify the speaker's name, their outer speech, and their unspoken inner thoughts (the "unsafe reality" or anxious mind-state for the person experiencing it, or compassionate intent/reaction for the companion).

        Ensure that the response is returned matching the requested JSON schema. Write clear, simple, and compassionate content using beginner-level English. NO heavy medical jargon. Design all transcripts to be read with a very calm, supportive, slow-paced, and reassuring female clinician tone of voice.
      `;

      const response = await generateContentWithRetry(ai, {
        model: "gemini-3.5-flash",
        contents: promptText,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              clinicalConcept: {
                type: Type.STRING,
                description: "Unified, formal clinical name (such as DSM-5 classification) matching the behavior"
              },
              shortExplanation: {
                type: Type.STRING,
                description: "Exactly a 2-sentence explanation of the behavior in clear, non-jargon, compassionate clinical prose."
              },
              outsideAction: {
                type: Type.STRING,
                description: "Observable metrics and manifest actions. Phrase it like 'Observable behaviors: [list of actions]'."
              },
              insideMind: {
                type: Type.STRING,
                description: "The internal coping reality and unspoken mental loops. Phrase it like 'Unspoken reality: [internal cognitive fears/safety loops]'."
              },
              matchMeter: {
                type: Type.ARRAY,
                description: "List of 2 to 3 related psychiatric disorders with their estimated match percentage (statistical DSM-5 overlap). Maximum percentage 100.",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    disorder: { type: Type.STRING, description: "Name of the related disorder" },
                    percentage: { type: Type.INTEGER, description: "Percentage overlap, between 10 and 95" }
                  },
                  required: ["disorder", "percentage"]
                }
              },
              triOrigin: {
                type: Type.OBJECT,
                description: "Dissection into Body, Mind, and World parameters.",
                properties: {
                  body: { type: Type.STRING, description: "🧬 Body: Neurochemical or hereditary factors behind the behavior, written clearly." },
                  mind: { type: Type.STRING, description: "🧠 Mind: Cognitive distortions, safety armor, and defense coping strategies." },
                  world: { type: Type.STRING, description: "🌐 World: Environmental triggers, learned childhood dynamics or systemic stressors." }
                },
                required: ["body", "mind", "world"]
              },
              audioVisualMock: {
                type: Type.OBJECT,
                description: "Pre-rendered clinical session voice notes simulation context.",
                properties: {
                  title: { type: Type.STRING, description: "Title e.g. 'Clinical Transcription Note #xxx'" },
                  duration: { type: Type.STRING, description: "Duration string, e.g. '2:15'" },
                  description: { type: Type.STRING, description: "A highly professional summary of the voice recording case." },
                  narrator: { type: Type.STRING, description: "Professional name and credentials, e.g., 'Dr. Rebecca Stern, Clinical Research Lead'" },
                  transcript: { type: Type.STRING, description: "A realistic 2-3 sentence clinical voice note transcript detailing the patient analysis or session summary." }
                },
                required: ["title", "duration", "description", "narrator", "transcript"]
              },
              childhoodEnvironment: {
                type: Type.STRING,
                description: "Simple English explanation of the early childhood family surroundings."
              },
              childhoodCauses: {
                type: Type.STRING,
                description: "Simple English explanation of childhood developmental triggers or coping causes."
              },
              analogy: {
                type: Type.STRING,
                description: "A highly vivid and compassionate clinical analogy comparing the behavior/feeling to an everyday object or scenario to normalize it."
              },
              conversationScenario: {
                type: Type.OBJECT,
                description: "A real-world dialogue scenario showcasing how the behavior manifests in a relationship.",
                properties: {
                  context: { type: Type.STRING, description: "A simple context describing where the dialogue occurs." },
                  dialogue: {
                    type: Type.ARRAY,
                    description: "An array of 2 to 4 back-and-forth dialogue lines with internal dialogues.",
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        speaker: { type: Type.STRING, description: "The name of the speaker, e.g. 'Friend', 'Partner', 'Person'" },
                        speech: { type: Type.STRING, description: "The literal spoken sentence." },
                        innerThought: { type: Type.STRING, description: "The secret unspoken cognitive thought or raw internal anxiety monologue." }
                      },
                      required: ["speaker", "speech", "innerThought"]
                    }
                  }
                },
                required: ["context", "dialogue"]
              }
            },
            required: [
              "clinicalConcept", 
              "shortExplanation", 
              "outsideAction", 
              "insideMind", 
              "matchMeter", 
              "triOrigin", 
              "audioVisualMock", 
              "childhoodEnvironment", 
              "childhoodCauses",
              "analogy",
              "conversationScenario"
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
      console.warn("Gemini API call failed or quota reached. Serving server-side fallback dataset match:", e?.message || e);
      const localMatch = findMatchingBehavior(query) || PREDEFINED_BEHAVIORS[0];
      return res.json({ source: "fallback-on-error", result: localMatch });
    }
  });

  app.post("/api/chat", async (req, res) => {
    const { history, mood } = req.body;
    if (!history || !Array.isArray(history)) {
      return res.status(400).json({ error: "History is required as an array." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      console.warn("GEMINI_API_KEY is not configured or placeholder. Using static fallback replies.");
      return res.json({
        reply: "Hello! I am your AI Chat Companion here at Mind Compass. I would love to help you discuss your symptoms, explore your emotional patterns, and offer wellness insights within the Body, Mind, and World framework.\n\n*Important Disclaimer: I am an educational AI companion and not a licensed clinician. I do not provide medical diagnoses or healthcare treatment. If you are experiencing distress, please seek professional support.*\n\nSince no active Gemini API key is configured on this server, I am using this default fallback message. To talk dynamically, please configure your key in **Settings > Secrets**!",
        followUps: ["How can I find my clinical patterns?", "Show me a simple breathing exercise."]
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Map roles correctly for General GenAI SDK
      const contents = history.map(msg => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }]
      }));

      const moodInstruction = mood ? `The user did a mood check-in and is currently feeling: "${mood}". Sympathize gently with this mood in your tone and suggest tailored advice.` : "";

      const systemInstruction = `
        You are the Mind Compass AI Chat Companion, a compassionate, educational psychology chat assistant.
        Your goal is to help users understand their thoughts, feelings, somatic sensations, or behavioral indicators under the Tri-Origin framework (Body, Mind, World).
        
        CRITICAL DIRECTIVE: You are NOT a medical professional or clinical doctor. You MUST explicitly state in your reply that you do NOT provide medical diagnoses or healthcare treatment, and that your feedback is for educational exploration only. Ensure this disclaimer is easy to read.

        Persona: Deeply warm, supportive, structured, and objective. Clarify psychological terminology rather than confusing the user with jargon.

        Features to cover:
        - Conversational assessment of user-reported symptoms or experiences.
        - Gentle, helpful follow-up questions to prompt self-reflection or connect to their childhood environment/influences.
        - Personalized, action-oriented recommendations based on the Tri-Origin parameters: Body (physiological calming/breathing), Mind (cognitive framing), and World (relational boundaries or social environments).
        - Direct acknowledgement of the user's current mood state if provided.
        
        ${moodInstruction}
        
        Write clearly and keep the overall response clean. Output must be a JSON object with this exact schema:
        {
          "reply": "Markdown formatted string containing your response and the required medical disclaimer.",
          "followUps": ["Option 1 (Under 50 chars)", "Option 2 (Under 50 chars)"]
        }
      `;

      const response = await generateContentWithRetry(ai, {
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reply: { type: Type.STRING, description: "Compassionate, markdown-formatted response reflecting on symptoms, suggesting helpful coping tips, and reminding that this is educational only and not a clinical diagnosis." },
              followUps: {
                type: Type.ARRAY,
                description: "Exactly 2 short, clickable follow-up responses the user can choose next.",
                items: { type: Type.STRING }
              }
            },
            required: ["reply", "followUps"]
          }
        }
      });

      if (response && response.text) {
        const resultJson = JSON.parse(response.text.trim());
        return res.json({ success: true, ...resultJson });
      } else {
        throw new Error("Empty response from Gemini API");
      }
    } catch (e: any) {
      console.warn("AI Chat companion hit transient rate-limit or error. Serving offline companion fallback reply:", e?.message || e);
      return res.json({
        success: true,
        source: "fallback",
        reply: "I am currently operating in offline study companion mode due to high server traffic. I can still help you explore your thoughts and behavioral patterns!\n\n*Important Disclaimer: Mind Compass is an educational study companion and not a licensed clinician. I do not provide medical diagnoses or healthcare treatment. If you are experiencing distress, please seek professional support.*",
        followUps: ["How can I find my clinical patterns?", "Show me a simple breathing exercise."]
      });
    }
  });

  app.post("/api/resources", async (req, res) => {
    const { concept } = req.body;
    if (!concept || typeof concept !== "string") {
      return res.status(400).json({ error: "Concept is required and must be a string." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const conceptLower = concept.toLowerCase();

    // High fidelity, preset fallback links
    let fallbackLinks = [
      { 
        title: "National Institute of Mental Health (NIMH)", 
        uri: "https://www.nimh.nih.gov/health/topics", 
        description: "Official, peer-reviewed clinical summaries, trial briefs, and statistics on psychiatric conditions, managed by the U.S. Federal Government." 
      },
      { 
        title: "National Alliance on Mental Illness (NAMI)", 
        uri: "https://www.nami.org/About-Mental-Illness", 
        description: "The largest grassroots support and advocacy platform supporting people suffering from cognitive and behavioral conditions." 
      },
      { 
        title: "Psychology Today Research & Diagnostic Center", 
        uri: "https://www.psychologytoday.com/us/basics", 
        description: "Leading resource offering clear, accessible breakdowns of cognitive habits, coping strategies, and support directories." 
      }
    ];

    if (conceptLower.includes("ocd") || conceptLower.includes("obsessive")) {
      fallbackLinks = [
        { 
          title: "International OCD Foundation (IOCDF)", 
          uri: "https://iocdf.org", 
          description: "The premier global non-profit supporting individuals with Obsessive Compulsive Disorder and related conditions, featuring therapist finders." 
        },
        { 
          title: "NIMH Obsessive-Compulsive Disorder Guide", 
          uri: "https://www.nimh.nih.gov/health/topics/obsessive-compulsive-disorder-ocd", 
          description: "Official National Institute of Mental Health overview of OCD symptoms, therapy, and clinical criteria." 
        },
        { 
          title: "Anxiety & Depression Association of America (ADAA)", 
          uri: "https://adaa.org", 
          description: "National platform offering treatment directories, peer support, and educational webinars for obsessive loops." 
        }
      ];
    } else if (conceptLower.includes("agor") || conceptLower.includes("public space")) {
      fallbackLinks = [
        { 
          title: "Mayo Clinic Agoraphobia Care Guide", 
          uri: "https://www.mayoclinic.org/diseases-conditions/agoraphobia", 
          description: "Highly trusted clinical breakdown of agoraphobia diagnostic triggers, risk factors, and medication/therapy options." 
        },
        { 
          title: "Anxiety & Depression Association of America (Agoraphobia)", 
          uri: "https://adaa.org/understanding-anxiety/agoraphobia", 
          description: "Community support networks, panic prevention courses, and evidence-based therapies for open/crowded environments." 
        },
        { 
          title: "NIMH Panic & Phobic Disorders Overview", 
          uri: "https://www.nimh.nih.gov/health/statistics/agoraphobia", 
          description: "Statistical and epidemiological reviews details regarding adult agoraphobia and phobic survival behaviors." 
        }
      ];
    } else if (conceptLower.includes("adhd") || conceptLower.includes("attention")) {
      fallbackLinks = [
        { 
          title: "CHADD - Children and Adults with ADHD", 
          uri: "https://chadd.org", 
          description: "The national resource center for ADHD, providing evidence-based advocacy, parent/adult networks, and training webinars." 
        },
        { 
          title: "ADDitude Magazine Resource Library", 
          uri: "https://www.additudemag.com", 
          description: "The comprehensive journal of record for neurodivergent advice, adult ADHD checklists, and focus organization techniques." 
        },
        { 
          title: "NIMH Attention Deficit Hyperactivity Disorder Brief", 
          uri: "https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd", 
          description: "Official diagnostic criteria, genetic research updates, and pediatric/adult behavioral health guidelines." 
        }
      ];
    } else if (conceptLower.includes("dpdr") || conceptLower.includes("depersonal") || conceptLower.includes("dereal")) {
      fallbackLinks = [
        { 
          title: "NAMI Dissociative Disorders Guide", 
          uri: "https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Dissociative-Disorders", 
          description: "Empathetic, structured guidelines covering chronic depersonalization, derealization, and sensory reconnection tips." 
        },
        { 
          title: "Mayo Clinic - Dissociative Disorders", 
          uri: "https://www.mayoclinic.org/diseases-conditions/dissociative-disorders", 
          description: "Professional medical analysis of derealization triggers, cognitive symptoms, and somatic psychotherapy suggestions." 
        },
        { 
          title: "Mind UK - Coping with Dissociation", 
          uri: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/dissociation-and-dissociative-disorders", 
          description: "High-quality, helpful worksheets, grounding checkers, and peer forums for dealing with derealization." 
        }
      ];
    } else if (conceptLower.includes("panic")) {
      fallbackLinks = [
        { 
          title: "Mayo Clinic Panic Attack Recovery Roadmap", 
          uri: "https://www.mayoclinic.org/diseases-conditions/panic-attacks-and-panic-disorder", 
          description: "Trusted instructions on calming sudden physiological hyper-arousal and intercepting adrenaline loops." 
        },
        { 
          title: "American Psychological Association (APA)", 
          uri: "https://www.apa.org/topics/anxiety/panic-disorder", 
          description: "Evidence-based strategies from licensed therapists to safely master panic fears." 
        },
        { 
          title: "NIMH Panic Disorder Resource Portal", 
          uri: "https://www.nimh.nih.gov/health/publications/panic-disorder-when-fear-overwhelms", 
          description: "Clinical brochures detailing somatic triggers, behavioral exposures, and professional treatment lists." 
        }
      ];
    } else if (conceptLower.includes("eat") || conceptLower.includes("anorex") || conceptLower.includes("bulimia")) {
      fallbackLinks = [
        { 
          title: "National Eating Disorders Association (NEDA)", 
          uri: "https://www.nationaleatingdisorders.org", 
          description: "The primary non-profit providing recovery screening, treatment databases, and dynamic online chat supports." 
        },
        { 
          title: "ANAD free Peer Support and Helpline", 
          uri: "https://anad.org", 
          description: "Provides free daily peer support meetings, recovery coaching programs, and helpline networks." 
        },
        { 
          title: "NIMH Eating Disorders Overview", 
          uri: "https://www.nimh.nih.gov/health/topics/eating-disorders", 
          description: "Federal briefs detailing anorexia nervosa, bulimia, and binge eating from genetic and behavioral scopes." 
        }
      ];
    } else if (conceptLower.includes("social") || conceptLower.includes("phobia") || conceptLower.includes("shy")) {
      fallbackLinks = [
        { 
          title: "Social Anxiety Association Portal", 
          uri: "https://socialanxietyassociation.org", 
          description: "Over 20 years of clinical and peer support programs specifically managing social phobia and selective mutism." 
        },
        { 
          title: "NIMH Social Anxiety Disorder guidelines", 
          uri: "https://www.nimh.nih.gov/health/topics/social-anxiety-disorder-more-than-just-shyness", 
          description: "NIMH overview of somatic fears, cognitive-behavioral exposure therapy, and supportive links." 
        },
        { 
          title: "Anxiety Canada CBT Self-Help Toolkits", 
          uri: "https://www.anxietycanada.com/disorders/social-anxiety-disorder", 
          description: "Highly practical downloadable PDF guides, breathing tools, and thought diaries to handle public evaluations." 
        }
      ];
    } else if (conceptLower.includes("avoidant") || conceptLower.includes("dismissive")) {
      fallbackLinks = [
        { 
          title: "The Attachment Project: Avoidant Attachment Style", 
          uri: "https://www.attachmentproject.com/blog/avoidant-attachment-style", 
          description: "In-depth clinical deep-dive detailing deactivating strategies, emotional shielding, and somatic coping hacks." 
        },
        { 
          title: "Psychology Today - The Dismissive Avoidant", 
          uri: "https://www.psychologytoday.com/us/blog/romance-by-the-numbers/202102/the-dismissive-avoidant-partner-in-relationships", 
          description: "Tips on understanding distance-seeking urges, validating relational independence, and processing somatic lockoffs." 
        },
        { 
          title: "Dr. Diane Poole Heller's Healing Attachment Theory", 
          uri: "https://dianepooleheller.com/avoidant-attachment-style-relationship-dynamics/", 
          description: "Groundbreaking somatic-tracking exercise guides to safely convert defensive armor into secure connection loops." 
        }
      ];
    } else if (conceptLower.includes("anxious") || conceptLower.includes("reassurance") || conceptLower.includes("abandon")) {
      fallbackLinks = [
        { 
          title: "The Attachment Project: Anxious Attachment Style", 
          uri: "https://www.attachmentproject.com/blog/anxious-attachment", 
          description: "Insightful breakdown of preoccupied attachment cycles, textual doublechecking habits, and abandonment anxieties." 
        },
        { 
          title: "Helpguide.org - Attachment Theory & Secure Relationships", 
          uri: "https://www.helpguide.org/articles/relationships-preventing-panic/attachment-theory", 
          description: "Practical exercises to soothe separation alerts, negotiate reassurance, and ground somatic rushes." 
        },
        { 
          title: "Psychology Today - Healing Attachment Anxiety", 
          uri: "https://www.psychologytoday.com/us/blog/the-mindful-self-express/201912/why-the-anxious-attachment-style-is-so-painful", 
          description: "Mindful coping recommendations, re-tuning catastrophic alerts, and building deep secure identity nets." 
        }
      ];
    }

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      console.log("No dynamic search key found. Serving high-fidelity fallsback for " + concept);
      return res.json({ source: "fallback", links: fallbackLinks });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const contentsText = `Search the web to find exactly 3 reputable, verifiable clinical resource links, patient support organizations, or diagnostic guides explicitly for people dealing with: "${concept}". Do not explain anything, just search the web.`;

      const response = await generateContentWithRetry(ai, {
        model: "gemini-3.5-flash",
        contents: contentsText,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks && Array.isArray(chunks) && chunks.length > 0) {
        const parsedLinks: Array<{ title: string; uri: string; description: string }> = [];
        const seenUris = new Set<string>();

        for (const chunk of chunks) {
          if (chunk.web && chunk.web.uri && chunk.web.title) {
            const uriClean = chunk.web.uri;
            if (!seenUris.has(uriClean)) {
              seenUris.add(uriClean);
              parsedLinks.push({
                title: chunk.web.title,
                uri: uriClean,
                description: `Official web resource parsed via Gemini Search Grounding. Verified link for ${concept}.`
              });
            }
          }
          if (parsedLinks.length >= 3) break;
        }

        if (parsedLinks.length > 0) {
          while (parsedLinks.length < 3 && fallbackLinks.length > 0) {
            const pad = fallbackLinks.shift();
            if (pad && !seenUris.has(pad.uri)) {
              parsedLinks.push(pad);
            }
          }
          return res.json({ source: "grounding", links: parsedLinks });
        }
      }

      return res.json({ source: "grounding-empty", links: fallbackLinks });

    } catch (e: any) {
      const errStr = String(e?.message || e || "").toLowerCase();
      const isQuotaError = /503|429|resource_exhausted|unavailable|rate_limit|quota/.test(errStr);
      if (isQuotaError) {
        console.warn("Clinical resources Search Grounding hit transient rate-limit / quota, using fallbacks:", e.message || e);
      } else {
        console.error("Clinical resources Search Grounding error, using fallback links:", e);
      }
      return res.json({ source: "fallback-on-error", links: fallbackLinks });
    }
  });

  app.post("/api/quiz", async (req, res) => {
    let { difficulty, category } = req.body;

    const categories = [
      "Anxiety Disorders",
      "Depression & Moods",
      "ADHD & Executive Function",
      "OCD & Intrusive Loops",
      "PTSD & Complex Trauma",
      "Bipolar Spectrum",
      "Borderline Personality",
      "Schizophrenia Spectrum",
      "Eating Disorders Awareness",
      "Stress & Burnout Syndrome",
      "Sleep & Circadian Rhythm",
      "Somatic Symptom Challenges",
      "Grief & Deep Bereavement",
      "Mental Health Myth-Busting",
      "Emotional Intelligence & EQ",
      "Supportive Dialogue & Empathy",
      "Panic & Phobia Responses",
      "Perfectionism & Cognitive Distortion",
      "Dissociative Disorders",
      "Autism Spectrum Conditions",
      "Narcissistic Personality Dynamics",
      "Seasonal Affective Disorder (SAD)",
      "Generalized Anxiety (GAD)",
      "Postpartum Mood Challenges",
      "Social Anxiety & Avoidance",
      "Insomnia & Cognitive Flight",
      "Substance Use & Co-occurring Status",
      "Body Dysmorphic Disorder (BDD)",
      "Adjustment & Life Transitions",
      "Sensory Processing Sensitivity"
    ];

    if (!difficulty || !["Beginner", "Intermediate", "Advanced"].includes(difficulty)) {
      difficulty = "Beginner";
    }

    // The setup screen promises this many questions before the user commits, so
    // the generator has to be asked for the same number. See src/data/quizConfig.
    const questionCount = getDifficultyMeta(difficulty).questionCount;

    if (!category || !categories.includes(category)) {
      category = categories[Math.floor(Math.random() * categories.length)];
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      console.warn("GEMINI_API_KEY is not configured or placeholder. Using static fallback quizzes.");
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
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemInstruction = `
        You are the Mind Compass Infinite Quiz Generator, a compassionate psychology educator and clinical researcher.
        Your goal is to build an interactive mental health quiz to help students learn about various states of mind.
        
        Generate exactly ${questionCount} highly engaging, technically rigorous, and completely unique questions for the category: "${category}" at a difficulty level suitable for an "${difficulty}" reader.
        
        CRITICAL EDUCATION RULE: In your answers, remind the user of behavioral patterns and remind them that this is for educational study only, and does not replace diagnostic clinical evaluations.

        Question types MUST be mixed (you should aim to generate a diverse set of ${questionCount} questions including these variations):
        - "myth-fact": Contrast common public myths with real clinical science (e.g. statement "OCD is just wanting things clean." Options: ["Fact", "Myth"]. Correct answer: "Myth").
        - "scenario": Describe a brief human situation and ask what indicator or dynamic it shows.
        - "multiple-choice": Explore clinical concepts, coping methods, or biological factors.
        - "supportive-response": Present a peer or loved one in distress and test the user on selecting the most supportive, empathetic response.
        - "true-learning": Present a nuanced statement where the student needs to find the most accurate clinical fact.

        Difficulty Guidelines:
        - "Beginner": Focus on high-level signs, debunking myths, basic self-compassion, and general mental health hygiene.
        - "Intermediate": Focus on clinical criteria, somatic vs mental responses, coping exercises, and interactive dialogue tools.
        - "Advanced": Focus on nuanced differential considerations, somatic integration, systemic trauma loops, and professional boundaries.

        Output MUST be a JSON object with this exact schema:
        {
          "category": "string matching the category",
          "difficulty": "string matching the difficulty",
          "questions": [
            {
              "id": "unique string token (e.g. q-1)",
              "type": "myth-fact" | "scenario" | "multiple-choice" | "supportive-response" | "true-learning",
              "question": "Clear question text in markdown.",
              "options": ["Exactly 4 option strings, or 2 for myth-fact which must be exactly ['Fact', 'Myth']"],
              "correctAnswer": "The EXACT string content of the correct option",
              "explanation": "A complete, compassionate, and educational paragraph detailing why the selected answer is correct, how it connects to the Body, Mind, and World parameters, and reinforcing that this is not a diagnostic tool."
            }
          ]
        }
      `;

      const response = await generateContentWithRetry(ai, {
        model: "gemini-3.5-flash",
        contents: `Generate exactly ${questionCount} diverse JSON questions under category "${category}" at difficulty level "${difficulty}".`,
        config: {
          systemInstruction: systemInstruction,
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
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    },
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
  });


  // Serve static assets or mount Vite middleware
  if (!process.env.VERCEL) {
    const PORT = 3000;
    if (process.env.NODE_ENV !== "production") {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), "dist");
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

startServer();

export default app;
