/**
 * Single source of truth for quiz difficulty levels.
 *
 * The setup screen promises a question count and a time estimate before the
 * user commits, so `questionCount` must be what the generator actually
 * produces — server.ts reads the same value when it builds the prompt. Change
 * it here and both sides move together.
 */

export type QuizDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface DifficultyMeta {
  level: QuizDifficulty;
  /** How many questions the generator is asked for. */
  questionCount: number;
  /** Rough completion time, at ~35s per question plus reading the rationale. */
  estimatedMinutes: number;
  desc: string;
  audience: string;
  example: string;
}

export const DIFFICULTIES: DifficultyMeta[] = [
  {
    level: "Beginner",
    questionCount: 5,
    estimatedMinutes: 3,
    desc: "Foundational concepts and simple diagnostic awareness",
    audience: "students new to clinical psychology or DSM terminology",
    example: "Which of the following is a core symptom of OCD?"
  },
  {
    level: "Intermediate",
    questionCount: 7,
    estimatedMinutes: 6,
    desc: "Symptom recognition and evidence-based coping strategies",
    audience: "students familiar with DSM-5 criteria",
    example:
      "A client avoids handshakes and checks locks repeatedly. Which cognitive schema is most active?"
  },
  {
    level: "Advanced",
    questionCount: 10,
    estimatedMinutes: 10,
    desc: "Complex scenario reasoning, differential factors, and clinical empathy",
    audience: "students preparing for clinical assessments or exams",
    example: "Differentiate OCD from OCPD in the context of this case study."
  }
];

export function getDifficultyMeta(level: string): DifficultyMeta {
  return DIFFICULTIES.find((d) => d.level === level) ?? DIFFICULTIES[0];
}
