export interface QuizQuestion {
  id: string;
  type: "myth-fact" | "scenario" | "multiple-choice" | "supportive-response" | "true-learning";
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const OFFLINE_QUIZZES: Record<string, Record<string, QuizQuestion[]>> = {
  "Anxiety Disorders": {
    "Beginner": [
      {
        id: "anx-beg-1",
        type: "multiple-choice",
        question: "Which of the following is a common somatic (body-based) symptom of acute anxiety?",
        options: [
          "Somatic muscle relaxation & deep breathing",
          "Rapid heart rate, muscle tension, and shallow breathing",
          "Decreased skin sensitivity and lower pulse rate",
          "Immediate emotional numbness and zero physical reaction"
        ],
        correctAnswer: "Rapid heart rate, muscle tension, and shallow breathing",
        explanation: "Acute anxiety triggers the body's sympathetic nervous system (fight-or-flight response). This diverts blood to large muscle groups, increases pulse rate to maximize oxygen supply, and restricts airway space causing shallow breathing."
      },
      {
        id: "anx-beg-2",
        type: "myth-fact",
        question: "Anxiety is always a harmful emotion that needs to be completely eliminated.",
        options: ["Fact", "Myth"],
        correctAnswer: "Myth",
        explanation: "Anxiety is a natural, adaptive survival response designed to alert us to potential threat. In healthy proportions, it sharpens focus and prompts action. It only becomes a disorder when it becomes persistent, overwhelming, and decoupled from actual danger."
      },
      {
        id: "anx-beg-3",
        type: "supportive-response",
        question: "A classmate tells you they are freezing up before public speaking and feel like they can't breathe. What is the most supportive response?",
        options: [
          "Just imagine everyone is in their underwear, you'll be fine!",
          "That sounds incredibly stressful. Let's take two slow, deep breaths together right now—I'm right here with you.",
          "You are overreacting. It's just a simple class presentation.",
          "Maybe you shouldn't present today if you can't stay calm."
        ],
        correctAnswer: "That sounds incredibly stressful. Let's take two slow, deep breaths together right now—I'm right here with you.",
        explanation: "Validating their feeling first reduces emotional isolation, while offering a somatic micro-grounding tool (slow breathing) actively stimulates the parasympathetic nervous system to slow down the panic loop."
      }
    ],
    "Intermediate": [
      {
        id: "anx-int-1",
        type: "true-learning",
        question: "How does 'avoidance' paradoxically reinforce anxiety disorders over time?",
        options: [
          "It allows the nervous system to rest and heal completely.",
          "It denies the brain the opportunity to experience safety disconfirmation, reinforcing the belief that the situation is truly dangerous.",
          "It permanently down-regulates adrenal production.",
          "It increases the cognitive capacity for somatic control."
        ],
        correctAnswer: "It denies the brain the opportunity to experience safety disconfirmation, reinforcing the belief that the situation is truly dangerous.",
        explanation: "Avoidance offers immediate relief from discomfort, which acts as a powerful reward (negative reinforcement). However, it prevents the brain from learning that the feared situation is safe or manageable, raising anxiety next time."
      }
    ]
  },
  "Depression": {
    "Beginner": [
      {
        id: "dep-beg-1",
        type: "myth-fact",
        question: "Depression is simply a state of intense sadness that you can 'snap out of' with positive thinking.",
        options: ["Fact", "Myth"],
        correctAnswer: "Myth",
        explanation: "Clinical depression is a multi-faceted mood disorder involving neurochemical changes, structural neural adjustments, somatic fatigue, and severe lack of dopamine transmission (anhedonia). It cannot simply be turned off by willpower."
      },
      {
        id: "dep-beg-2",
        type: "scenario",
        question: "Maria has experienced a profound loss of interest in hobbies, persistent fatigue, feeling completely empty, and changes in sleep patterns for over a month. What condition is this strongly indicative of?",
        options: [
          "General Social Impatience",
          "Major Depressive Episode",
          "Subtle Attention Deficit",
          "Normal Stress & Burnout"
        ],
        correctAnswer: "Major Depressive Episode",
        explanation: "Sustained loss of interest in hobbies (anhedonia), changes in sleep or appetite, profound exhaustion, and empty mood lasting over two continuous weeks are classic diagnostic indicators of clinical depression."
      }
    ]
  },
  "ADHD": {
    "Beginner": [
      {
        id: "adhd-beg-1",
        type: "myth-fact",
        question: "People with ADHD are always hyperactive and cannot focus on any task.",
        options: ["Fact", "Myth"],
        correctAnswer: "Myth",
        explanation: "ADHD has three presentations: Predominantly Inattentive, Predominantly Hyperactive-Impulsive, and Combined. Many individuals (especially adults) experiences no physical hyperactivity, but suffer with extreme task-initiation, planning, and executive exhaustion. They can also 'hyperfocus' on high-interest tasks."
      }
    ]
  },
  "OCD": {
    "Beginner": [
      {
        id: "ocd-beg-1",
        type: "true-learning",
        question: "Which of the following is the most accurate definition of the relationship between obsessions and compulsions in OCD?",
        options: [
          "Obsessions are tidy behaviors; compulsions are anxious thoughts.",
          "Obsessions are persistent, intrusive distressing thoughts; compulsions are repetitious rituals performed to temporarily relieve that distress.",
          "Compulsions are unconscious coping mechanisms that eliminate obsessions permanently.",
          "Both are voluntary habits used to boost personal organization."
        ],
        correctAnswer: "Obsessions are persistent, intrusive distressing thoughts; compulsions are repetitious rituals performed to temporarily relieve that distress.",
        explanation: "Obsessions (e.g. fears of contamination) trigger powerful somatic panic. Compulsions (e.g. washing hands repetitively) are performed to neutralise that dread. Although hand-washing offers a quick relief, it cements the OCD panic cycle."
      }
    ]
  },
  "PTSD": {
    "Beginner": [
      {
        id: "ptsd-beg-1",
        type: "myth-fact",
        question: "PTSD only affects military combat veterans who have been in active war zones.",
        options: ["Fact", "Myth"],
        correctAnswer: "Myth",
        explanation: "Anyone who has experienced or witnessed a traumatic event—such as a natural disaster, car accident, severe medical emergency, or personal assault—can develop PTSD. It is a biological survival response to extreme life threat."
      }
    ]
  },
  "Bipolar": {
    "Beginner": [
      {
        id: "bip-beg-1",
        type: "true-learning",
        question: "What primary characteristic defines the difference between Bipolar I and Bipolar II disorder?",
        options: [
          "Bipolar I involves full manic episodes; Bipolar II involves hypomanic episodes and major depressive episodes.",
          "Bipolar I only has depressive episodes; Bipolar II only has manic episodes.",
          "Bipolar I depends solely on environmental factors, while Bipolar II is fully genetic.",
          "Bipolar I lasts for a lifetime while Bipolar II resolves within several years of maturity."
        ],
        correctAnswer: "Bipolar I involves full manic episodes; Bipolar II involves hypomanic episodes and major depressive episodes.",
        explanation: "Bipolar I requires at least one full manic episode (severe impairment, potential hospitalization or psychosis). Bipolar II requires a hypomanic episode (a milder form of mania) and at least one major depressive episode."
      }
    ]
  },
  "Stress": {
    "Beginner": [
      {
        id: "stress-beg-1",
        type: "multiple-choice",
        question: "What is the primary indicator of chronic burnout syndrome according to the World Health Organization?",
        options: [
          "Temporary frustration after completing a difficult work project",
          "Profound exhaustion, increased mental distance from one's job, and reduced professional efficacy",
          "A sudden desire to pursue an entirely new creative career path",
          "Inability to handle basic mathematics under pressure"
        ],
        correctAnswer: "Profound exhaustion, increased mental distance from one's job, and reduced professional efficacy",
        explanation: "Burnout is an occupational phenomenon characterized by three dimensions: feelings of energy depletion or exhaustion; increased mental distance from one's job, or feelings of negativism/cynicism; and reduced professional efficacy."
      }
    ]
  }
};

export function getOfflineQuiz(category: string, difficulty: string): QuizQuestion[] {
  // 1. Try exact match first
  let list = OFFLINE_QUIZZES[category]?.[difficulty];
  if (list && list.length > 0) return list;

  // 2. Try smart matching/fuzzy matching category keys
  const catLower = category.toLowerCase();
  const matchedKey = Object.keys(OFFLINE_QUIZZES).find(key => {
    const keyLower = key.toLowerCase();
    return catLower.includes(keyLower) || keyLower.includes(catLower);
  });

  if (matchedKey) {
    list = OFFLINE_QUIZZES[matchedKey][difficulty] || OFFLINE_QUIZZES[matchedKey]["Beginner"];
    if (list && list.length > 0) return list;
  }

  // 3. Try to get any questions for that matched category if current difficulty is empty
  if (matchedKey) {
    const allDiffs = Object.values(OFFLINE_QUIZZES[matchedKey]);
    const foundList = allDiffs.find(d => d && d.length > 0);
    if (foundList) return foundList;
  }

  // 4. Default fallback to first category's selected difficulty
  const firstCat = Object.keys(OFFLINE_QUIZZES)[0];
  list = OFFLINE_QUIZZES[firstCat][difficulty] || OFFLINE_QUIZZES[firstCat]["Beginner"];

  // Double fallback to ensure we never return empty
  if (!list || list.length === 0) {
    return [
      {
        id: "general-1",
        type: "myth-fact",
        question: "Mental health disorders are rare conditions that only impact a tiny fraction of the population.",
        options: ["Fact", "Myth"],
        correctAnswer: "Myth",
        explanation: "Mental health conditions are extremely common global experiences. According to the WHO, approximately 1 in 8 people globally live with a diagnosed mental disorder, making supportive awareness and educational tools helpful for everyone."
      },
      {
        id: "general-2",
        type: "multiple-choice",
        question: "What is emotional intelligence primarily focused on?",
        options: [
          "Suppressing all negative emotions instantly",
          "Understanding, regulating, and constructively expressing emotions",
          "Analyzing logical IQ patterns in peers",
          "Ensuring you never experience stress"
        ],
        correctAnswer: "Understanding, regulating, and constructively expressing emotions",
        explanation: "Emotional intelligence (EQ) represents the capacity to accurately perceive, channel, integrate, and moderate emotional states in yourself and others to guide sound thinking and build warm relationships."
      }
    ];
  }

  return list;
}
