import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Compass,
  Trophy,
  ArrowsClockwise,
  Sparkle,
  ArrowRight,
  CheckCircle,
  XCircle,
  BookOpen,
  CaretRight,
  Info
} from "@phosphor-icons/react";
import { DIFFICULTIES } from "../data/quizConfig";

interface Question {
  id: string;
  type: "myth-fact" | "scenario" | "multiple-choice" | "supportive-response" | "true-learning";
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const CATEGORIES = [
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
  "Generalized Anxiety (GAD)",
  "Social Anxiety & Avoidance"
];

// Difficulty metadata (counts, timings, sample questions) is shared with the
// server so the counts advertised here are the counts actually generated.

interface MentalHealthQuizProps {
  onClose?: () => void;
}

export default function MentalHealthQuiz({ onClose }: MentalHealthQuizProps) {
  const [quizState, setQuizState] = useState<"setup" | "loading" | "active" | "completed">("setup");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Beginner");
  const [selectedCategory, setSelectedCategory] = useState("Anxiety Disorders");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Array<{ question: string; answer: string; isCorrect: boolean; explanation: string }>>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const startQuiz = async () => {
    setQuizState("loading");
    setErrorMsg("");
    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          difficulty: selectedDifficulty,
          category: selectedCategory
        })
      });

      if (!response.ok) {
        throw new Error("Unable to load dynamic study questions right now.");
      }

      const data = await response.json();
      if (data.success && data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setCurrentStep(0);
        setSelectedOption(null);
        setIsSubmitted(false);
        setUserScore(0);
        setUserAnswers([]);
        setQuizState("active");
      } else {
        throw new Error("Empty questions payload received.");
      }
    } catch (e: any) {
      console.warn("Quiz server fallback:", e);
      setErrorMsg("Using offline standard study question bank due to high server traffic.");

      // Fallback questions set
      setQuestions([
        {
          id: "fb-1",
          type: "multiple-choice",
          question: `In clinical evaluation of ${selectedCategory}, which core feature distinguishes clinical severity from normal everyday emotional response?`,
          options: [
            "Functional impairment in daily occupational or social roles",
            "Having occasional feelings of stress or anxiety",
            "Experiencing transient mood changes after a long workday",
            "Preferring solitude during personal time"
          ],
          correctAnswer: "Functional impairment in daily occupational or social roles",
          explanation: "Clinical severity in DSM-5 diagnostic criteria requires persistent distress and significant functional impairment in social, occupational, or personal domains."
        },
        {
          id: "fb-2",
          type: "myth-fact",
          question: "True or False: Cognitive Behavioral Therapy (CBT) aims to replace all negative thoughts with positive affirmations.",
          options: [
            "False — CBT focuses on identifying and reframing cognitive distortions with realistic, evidence-based appraisal",
            "True — CBT requires maintaining constant positive thinking regardless of circumstances"
          ],
          correctAnswer: "False — CBT focuses on identifying and reframing cognitive distortions with realistic, evidence-based appraisal",
          explanation: "CBT does not promote toxic positivity; rather, it helps individuals recognize irrational cognitive distortions (e.g., catastrophizing, black-and-white thinking) and test them against empirical reality."
        },
        {
          id: "fb-3",
          type: "scenario",
          question: "An individual describes feeling an overwhelming urge to complete repetitive routines to relieve intrusive thoughts. What is the psychological function of these behaviors?",
          options: [
            "Temporarily reduce acute anxiety caused by intrusive obsessions",
            "Permanently eliminate underlying anxiety triggers",
            "Voluntary habit seeking for amusement",
            "Subconscious attention-seeking response"
          ],
          correctAnswer: "Temporarily reduce acute anxiety caused by intrusive obsessions",
          explanation: "Compulsive behaviors function as negative reinforcement: performing the ritual temporarily alleviates acute distress triggered by obsessions, thereby reinforcing the ritual loop."
        }
      ]);

      setCurrentStep(0);
      setSelectedOption(null);
      setIsSubmitted(false);
      setUserScore(0);
      setUserAnswers([]);
      setQuizState("active");
    }
  };

  const handleOptionSelect = (option: string) => {
    if (isSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || isSubmitted) return;
    const currentQuestion = questions[currentStep];
    const isCorrect = selectedOption.trim() === currentQuestion.correctAnswer.trim();

    if (isCorrect) {
      setUserScore(prev => prev + 1);
    }

    setUserAnswers(prev => [
      ...prev,
      {
        question: currentQuestion.question,
        answer: selectedOption,
        isCorrect,
        explanation: currentQuestion.explanation
      }
    ]);

    setIsSubmitted(true);
  };

  const handleNextStep = () => {
    if (currentStep + 1 < questions.length) {
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizState("completed");
    }
  };

  return (
    <div className="w-full max-w-[540px] mx-auto py-2">
      <AnimatePresence mode="wait">

        {/* SETUP SCREEN */}
        {quizState === "setup" && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-surface border border-line rounded-xl p-5 sm:p-7 shadow-xs flex flex-col gap-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Compass size={18} weight="light" className="text-link" />
                <h2 className="text-[20px] font-serif font-medium text-body tracking-tight">
                  Psychological Practice Quiz
                </h2>
              </div>
              <p className="text-[13.5px] text-muted font-sans leading-relaxed">
                Pick a mental health topic and difficulty level to test your clinical knowledge with interactive practice questions.
              </p>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-5">

              {/* Category Dropdown (Clean Native Select - No z-index or clipping bugs) */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="quiz-topic-select"
                  className="text-[12px] font-medium text-muted"
                >
                  Select study topic
                </label>
                <div className="relative">
                  {/* 48px tall with a solid 1px border so it reads as a tappable
                      control rather than a flat block of text. */}
                  <select
                    id="quiz-topic-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full h-12 bg-raised border border-line-strong rounded-lg px-3.5 pr-10 text-[16px] md:text-[14px] text-body font-sans focus:border-link transition-colors appearance-none cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-surface text-body">
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                    <CaretRight size={16} weight="light" className="rotate-90" />
                  </div>
                </div>
              </div>

              {/* Reader Level Cards */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-medium text-muted">
                  Select difficulty level
                </label>
                <div className="flex flex-col gap-2">
                  {DIFFICULTIES.map((dif) => {
                    const isSelected = selectedDifficulty === dif.level;
                    return (
                      <button
                        key={dif.level}
                        type="button"
                        onClick={() => setSelectedDifficulty(dif.level)}
                        aria-pressed={isSelected}
                        className={`min-h-[52px] text-left px-3.5 py-3 rounded-lg border transition-all cursor-pointer flex flex-col justify-center ${isSelected
                            ? "border-[1.5px] border-link bg-brand-tint"
                            : "border-line bg-raised hover:border-brand/50"
                          }`}
                      >
                        {/* Shape of the commitment, before the user makes it. */}
                        <div className="flex items-baseline justify-between gap-3">
                          <span className={`text-[15px] font-semibold font-sans ${isSelected ? "text-link" : "text-body"}`}>
                            {dif.level}
                          </span>
                          <span className="text-[11px] text-muted bg-surface border border-line px-2 py-0.5 rounded shrink-0 whitespace-nowrap">
                            {dif.questionCount} questions · ~{dif.estimatedMinutes} min
                          </span>
                        </div>

                        {/* Below md only the chosen card carries its detail, so
                            all three plus the Start button fit without scrolling.
                            From md up every card stays expanded. */}
                        <div className={`${isSelected ? "flex" : "hidden md:flex"} flex-col`}>
                          <span className="text-[13px] text-muted mt-1 font-sans leading-snug">
                            {dif.desc}
                          </span>
                          <span className="text-[12px] text-link mt-1.5 font-sans leading-snug">
                            Best for: {dif.audience}
                          </span>
                          <span className="text-[13px] text-muted font-sans leading-snug mt-1.5 pl-2 border-l-2 border-brand">
                            {dif.example}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {errorMsg && (
              <div role="status" className="p-3 bg-warn-tint border border-warn/30 rounded-lg text-[12px] text-warn-ink flex items-center gap-2">
                <Info size={15} weight="light" className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Start Button */}
            <div className="mt-1">
              <button
                type="button"
                onClick={startQuiz}
                className="w-full h-11 bg-brand hover:bg-brand-hover text-on-brand rounded-lg font-medium text-[14px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <span>Start Quiz</span>
              </button>
              <p className="text-[12px] text-muted text-center mt-2">
                Answers and explanations appear immediately after each question.
              </p>
            </div>
          </motion.div>
        )}

        {/* LOADING SCREEN */}
        {quizState === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-surface border border-line rounded-xl p-8 sm:p-12 shadow-xs flex flex-col items-center justify-center text-center gap-4 min-h-[280px]"
          >
            <div className="relative flex items-center justify-center">
              <div className="h-10 w-10 rounded-full border-2 border-t-brand border-r-transparent border-b-transparent border-l-transparent animate-spin" />
              <Compass size={18} weight="light" className="absolute text-link animate-pulse" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-body">
                Generating study questions...
              </p>
              <p className="text-[12px] text-muted mt-1 font-sans">
                Preparing {selectedDifficulty} questions for {selectedCategory}.
              </p>
            </div>
          </motion.div>
        )}

        {/* ACTIVE QUESTION SCREEN */}
        {quizState === "active" && questions.length > 0 && (
          <motion.div
            key="active"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-surface border border-line rounded-xl p-5 sm:p-7 shadow-xs flex flex-col gap-5"
          >
            {/* Steps & Score Header */}
            <div className="flex items-center justify-between border-b border-line pb-3 gap-3">
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-medium text-muted truncate">
                  {selectedCategory} ({selectedDifficulty})
                </span>
                <span className="text-[15px] font-serif font-medium text-body tracking-tight mt-0.5">
                  Question {currentStep + 1} of {questions.length}
                </span>
              </div>

              {/* Score Badge (Sufficient width, shrink-0, no clipping!) */}
              <div className="shrink-0 font-mono text-[12px] font-semibold text-link bg-brand-tint border border-brand/20 px-3 py-1 rounded-md whitespace-nowrap">
                Score: {userScore} / {questions.length}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-raised border border-line h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-brand h-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Box */}
            <div className="bg-raised border border-line rounded-lg p-4">
              <span className="text-[12px] font-medium text-muted block mb-1.5">
                Question focus &bull; {questions[currentStep].type.replace("-", " ")}
              </span>
              <p className="text-[14.5px] font-sans text-body leading-relaxed">
                {questions[currentStep].question}
              </p>
            </div>

            {/* Answer Options List (Radios Left-Aligned & Visible Before Submit) */}
            <div className="flex flex-col gap-2.5">
              {questions[currentStep].options.map((option, idx) => {
                const isSelected = selectedOption === option;

                let containerClass = "border-line bg-raised hover:border-brand/50";

                if (isSelected) {
                  containerClass = "border-[1.5px] border-link bg-brand-tint text-body";
                }

                if (isSubmitted) {
                  const isCorrectAnswer = option.trim() === questions[currentStep].correctAnswer.trim();
                  if (isSelected) {
                    containerClass = isCorrectAnswer
                      ? "border-[1.5px] border-ok bg-ok-tint text-ok-ink"
                      : "border-[1.5px] border-warn bg-warn-tint text-warn-ink";
                  } else if (isCorrectAnswer) {
                    containerClass = "border-[1.5px] border-ok bg-ok-tint text-ok-ink";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => handleOptionSelect(option)}
                    className={`min-h-[44px] text-left p-3.5 rounded-lg border text-[13.5px] font-sans leading-relaxed transition-all flex items-start gap-3 cursor-pointer ${containerClass}`}
                  >
                    {/* Left-Aligned Radio Indicator */}
                    <div className="shrink-0 mt-0.5">
                      {isSubmitted && option.trim() === questions[currentStep].correctAnswer.trim() ? (
                        <CheckCircle size={16} weight="light" className="text-ok-ink" />
                      ) : isSubmitted && isSelected ? (
                        <XCircle size={16} weight="light" className="text-warn-ink" />
                      ) : (
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${isSelected
                            ? "border-brand bg-brand"
                            : "border-muted bg-transparent"
                          }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-on-brand" />}
                        </div>
                      )}
                    </div>

                    <span className="flex-1 text-body">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Explanation after submission */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="overflow-hidden"
                >
                  <div className="bg-raised border border-line rounded-lg p-4 text-left">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <BookOpen size={14} weight="light" className="text-link" />
                      <span className="text-[12px] font-medium text-muted">
                        Clinical rationale
                      </span>
                    </div>
                    <p className="text-[13px] text-body leading-relaxed font-sans">
                      {questions[currentStep].explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step trigger controls */}
            <div className="flex justify-end pt-2">
              {!isSubmitted ? (
                <button
                  type="button"
                  disabled={!selectedOption}
                  onClick={handleSubmitAnswer}
                  className="h-10 px-5 bg-brand hover:bg-brand-hover text-on-brand rounded-lg font-medium text-[13px] transition-colors flex items-center gap-1.5 disabled:opacity-40 cursor-pointer shadow-2xs"
                >
                  <span>Submit Response</span>
                  <ArrowRight size={14} weight="light" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="h-10 px-5 bg-brand hover:bg-brand-hover text-on-brand rounded-lg font-medium text-[13px] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span>{currentStep + 1 === questions.length ? "View Final Score" : "Next Question"}</span>
                  <CaretRight size={14} weight="light" />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* COMPLETED SCREEN */}
        {quizState === "completed" && (
          <motion.div
            key="completed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface border border-line rounded-xl p-5 sm:p-7 shadow-xs flex flex-col gap-6 text-center"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-ok-tint border border-ok/30 flex items-center justify-center text-ok-ink">
                <Trophy size={22} weight="light" />
              </div>
              <h2 className="text-[20px] font-serif font-medium text-body tracking-tight mt-1">
                Study Session Complete
              </h2>
              <div className="font-mono text-[13px] font-semibold text-link bg-brand-tint px-3 py-1 rounded-md border border-brand/20">
                Final Score: {userScore} / {questions.length} ({Math.round((userScore / questions.length) * 100)}%)
              </div>
            </div>

            {/* Performance Review */}
            <div className="text-left bg-raised border border-line rounded-lg p-4 flex flex-col gap-4">
              <span className="text-[12px] font-medium text-muted block">
                Session question review
              </span>

              {userAnswers.map((answer, index) => (
                <div key={index} className="border-b border-line pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start gap-2 justify-between">
                    <p className="text-[13px] font-medium font-sans text-body leading-relaxed flex-1">
                      {index + 1}. {answer.question}
                    </p>
                    <div className="shrink-0 mt-0.5">
                      {answer.isCorrect ? (
                        <span className="text-[10px] bg-ok-tint text-ok-ink font-mono uppercase font-semibold px-2 py-0.5 rounded border border-ok/30 flex items-center gap-1">
                          <CheckCircle size={11} weight="light" /> Correct
                        </span>
                      ) : (
                        <span className="text-[10px] bg-warn-tint text-warn-ink font-mono uppercase font-semibold px-2 py-0.5 rounded border border-warn/30 flex items-center gap-1">
                          <XCircle size={11} weight="light" /> Incorrect
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-[12px] text-muted font-sans leading-relaxed mt-2 bg-surface p-2.5 rounded border border-line">
                    <span className="font-medium text-muted block mb-0.5 text-[12px]">
                      Clinical insight
                    </span>
                    {answer.explanation}
                  </div>
                </div>
              ))}
            </div>

            {/* Restart Controls */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() => setQuizState("setup")}
                className="h-10 px-4 bg-surface border border-line hover:bg-raised text-body text-[13px] font-medium rounded-lg transition-colors cursor-pointer"
              >
                Change Topic or Level
              </button>
              <button
                type="button"
                onClick={startQuiz}
                className="h-10 px-5 bg-brand hover:bg-brand-hover text-on-brand text-[13px] font-medium rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
              >
                <ArrowsClockwise size={13} weight="light" />
                <span>Restart Practice Loop</span>
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
