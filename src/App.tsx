import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MagnifyingGlass,
  ArrowRight,
  Compass,
  Sparkle,
  ArrowSquareOut,
  Info,
  Check,
  CaretRight,
  Pulse,
  Heart,
  User,
  Download,
  Lightbulb,
  ChatTeardropText,
  Dna,
  Lock,
  Brain,
  Scales,
  Microphone,
  MapPin,
  Sun,
  Moon,
  BookOpen,
  Sliders,
  FileText,
  Exam,
  DotsThree,
  ShareNetwork,
  CaretDown,
  ArrowCounterClockwise
} from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { PREDEFINED_BEHAVIORS, findMatchingBehavior } from "./data/behaviors";
import { BehaviorResult } from "./types";
import { getDialogueScenarios } from "./data/dialogueScenarios";
import { TONE_CHIP, CategoryTone } from "./data/categoryTones";
import MatchMeter from "./components/MatchMeter";
import ThreeRoots from "./components/ThreeRoots";
import ClinicalResources from "./components/ClinicalResources";
import BehaviorVisualizer from "./components/BehaviorVisualizer";
import MindCompassLogo from "./components/MindCompassLogo";
import AIChatCompanion from "./components/AIChatCompanion";
import MentalHealthQuiz from "./components/MentalHealthQuiz";

// Where the user's explicit theme choice is stored. Must stay in sync with the
// pre-paint script in index.html, which reads the same key before first paint.
const THEME_STORAGE_KEY = "mc-theme";

// Recent searches. Renamed to the mc- prefix used by THEME_STORAGE_KEY; the
// old key is migrated once on load so existing history is not dropped.
const RECENT_STORAGE_KEY = "mc-recent-searches";
const LEGACY_RECENT_KEY = "mind_compass_recent_searches";

// Result tabs. Labels are deliberately one word each — they are navigation,
// not section headings, and the heading inside each panel carries the detail.
const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "symptoms", label: "Symptoms" },
  { id: "causes", label: "Causes" },
  { id: "resources", label: "Resources" }
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

function loadRecentSearches(): BehaviorResult[] {
  try {
    const saved = localStorage.getItem(RECENT_STORAGE_KEY);
    if (saved) return JSON.parse(saved);

    const legacy = localStorage.getItem(LEGACY_RECENT_KEY);
    if (legacy) {
      localStorage.setItem(RECENT_STORAGE_KEY, legacy);
      localStorage.removeItem(LEGACY_RECENT_KEY);
      return JSON.parse(legacy);
    }
    return [];
  } catch (e) {
    return [];
  }
}

// Function to export clinical analysis as a structured PDF report
function exportToPDF(behavior: BehaviorResult, searchQuery: string) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const margin = 20;
  let currentY = 22;

  const checkNewPage = (neededHeight: number) => {
    if (currentY + neededHeight > 275) {
      doc.addPage();
      currentY = 22;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(107, 103, 94); // Muted
      doc.text("Mind Compass — Clinical Reference Report (Continued)", margin, 12);

      doc.setDrawColor(228, 224, 216);
      doc.setLineWidth(0.3);
      doc.line(margin, 14, 190, 14);
    }
  };

  // Header Unit
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(53, 80, 107); // Slate Blue
  doc.text("CLINICAL & BEHAVIORAL REFERENCE REPORT", margin, currentY);
  currentY += 5;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(43, 41, 36);
  doc.text(behavior.clinicalConcept, margin, currentY);
  currentY += 8;

  doc.setFont("helvetica", "italic");
  doc.setFontSize(9.5);
  doc.setTextColor(107, 103, 94);
  doc.text(`Everyday Behavior Description: "${searchQuery}"`, margin, currentY);
  currentY += 10;

  doc.setDrawColor(228, 224, 216);
  doc.setLineWidth(0.5);
  doc.line(margin, currentY, 190, currentY);
  currentY += 10;

  // Overview Summary
  checkNewPage(30);
  doc.setFillColor(247, 245, 241);
  const summaryLines = doc.splitTextToSize(behavior.shortExplanation, 155);
  const summaryBoxHeight = (summaryLines.length * 5) + 14;

  doc.roundedRect(margin, currentY, 170, summaryBoxHeight, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(53, 80, 107);
  doc.text("CLINICAL OVERVIEW SUMMARY", margin + 6, currentY + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(43, 41, 36);
  doc.text(summaryLines, margin + 6, currentY + 12);

  currentY += summaryBoxHeight + 10;

  // Symptoms: Outside vs Inside
  checkNewPage(45);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(43, 41, 36);
  doc.text("Symptom Expressions: Observable vs Internal", margin, currentY);
  currentY += 6;

  // Outside Action Section
  const outsideLines = doc.splitTextToSize(behavior.outsideAction, 155);
  const outsideHeight = (outsideLines.length * 5) + 14;
  checkNewPage(outsideHeight + 6);

  doc.setFillColor(247, 245, 241);
  doc.roundedRect(margin, currentY, 170, outsideHeight, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(53, 80, 107);
  doc.text("OBSERVED BEHAVIORAL MANIFESTATIONS", margin + 6, currentY + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(43, 41, 36);
  doc.text(outsideLines, margin + 6, currentY + 12);
  currentY += outsideHeight + 6;

  // Inside Mind Section
  const insideLines = doc.splitTextToSize(behavior.insideMind, 155);
  const insideHeight = (insideLines.length * 5) + 14;
  checkNewPage(insideHeight + 10);

  doc.setFillColor(247, 245, 241);
  doc.roundedRect(margin, currentY, 170, insideHeight, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(181, 97, 62); // Clay
  doc.text("INTERNAL COGNITIVE EXPERIENCE & COPING REALITY", margin + 6, currentY + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(43, 41, 36);
  doc.text(insideLines, margin + 6, currentY + 12);
  currentY += insideHeight + 10;

  // Three Roots
  checkNewPage(45);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(43, 41, 36);
  doc.text("The Three Roots of Behavioral Origin", margin, currentY);
  currentY += 6;

  const roots = [
    { title: "BODY & BIOLOGY (PHYSIOLOGICAL DIMENSION)", desc: behavior.triOrigin.body },
    { title: "MIND & COGNITION (PSYCHOLOGICAL DIMENSION)", desc: behavior.triOrigin.mind },
    { title: "WORLD & ENVIRONMENT (DEVELOPMENTAL & SYSTEMIC)", desc: behavior.triOrigin.world }
  ];

  roots.forEach((root) => {
    const rootDescLines = doc.splitTextToSize(root.desc, 150);
    const rootH = (rootDescLines.length * 5) + 12;
    checkNewPage(rootH + 4);

    doc.setDrawColor(92, 122, 94); // Sage
    doc.setLineWidth(1.2);
    doc.line(margin + 1, currentY, margin + 1, currentY + rootH - 2);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(92, 122, 94);
    doc.text(root.title, margin + 6, currentY + 4);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(43, 41, 36);
    doc.text(rootDescLines, margin + 6, currentY + 10);
    currentY += rootH + 2;
  });
  currentY += 6;

  // Diagnostic Match Meter
  checkNewPage(45);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(43, 41, 36);
  doc.text("Diagnostic Overlap Metrics (DSM-5 Overlap)", margin, currentY);
  currentY += 6;

  behavior.matchMeter.forEach((meter) => {
    checkNewPage(14);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(43, 41, 36);
    doc.text(meter.disorder, margin, currentY);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(181, 97, 62);
    doc.text(`${meter.percentage}% Overlap`, 165, currentY);

    currentY += 2;
    doc.setFillColor(228, 224, 216);
    doc.rect(margin, currentY, 170, 2, "F");

    doc.setFillColor(181, 97, 62);
    doc.rect(margin, currentY, (meter.percentage / 100) * 170, 2, "F");

    currentY += 8;
  });
  currentY += 6;

  // Persistent Disclaimer Footer
  const disclaimerText = "* Educational Disclaimer: Mind Compass is an academic study companion tool for psychology students and is not intended to provide medical diagnosis, official psychiatric evaluations, or direct therapeutic treatment.";
  const disclaimerLines = doc.splitTextToSize(disclaimerText, 170);
  const footerH = (disclaimerLines.length * 4) + 12;
  checkNewPage(footerH);

  doc.setDrawColor(228, 224, 216);
  doc.setLineWidth(0.3);
  doc.line(margin, currentY, 190, currentY);
  currentY += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(107, 103, 94);
  doc.text(disclaimerLines, margin, currentY);
  currentY += (disclaimerLines.length * 4);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text(`Generated on ${new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })} | Mind Compass Reference Database`, margin, currentY + 4);

  const filename = `${behavior.clinicalConcept.replace(/[^a-zA-Z0-9]/g, "_")}_Reference_Report.pdf`;
  doc.save(filename);
}

export default function App() {
  // The pre-paint script in index.html has already resolved the theme and put
  // it on <html>. Read it back rather than re-deriving it, so React's first
  // render always agrees with what is on screen.
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const applied = document.documentElement.getAttribute("data-theme");
    if (applied === "dark" || applied === "light") return applied;

    // Only reached if the inline script was blocked (e.g. strict CSP).
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "dark" || saved === "light") return saved;
    } catch (e) {
      // Storage unavailable — fall through to the OS preference.
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [activeView, setActiveView] = useState<"finder" | "quiz">("finder");
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [query, setQuery] = useState("");
  const [selectedBehavior, setSelectedBehavior] = useState<BehaviorResult | null>(null);
  const [mindToggle, setMindToggle] = useState<"outside" | "inside">("outside");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<BehaviorResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [systemAlert, setSystemAlert] = useState<string | null>(null);
  const [selectedSocialTab, setSelectedSocialTab] = useState<"friend" | "family" | "couple">("friend");
  // The dialogue is long. It starts collapsed so the summary and analogy are
  // what the user lands on, and they opt in to the conversation.
  const [showDialogue, setShowDialogue] = useState(false);
  // Result actions live behind a "..." menu — a bottom sheet on mobile, an
  // anchored dropdown on wider screens.
  const [actionsOpen, setActionsOpen] = useState(false);
  // The disclaimer collapses to its headline on mobile so it does not eat the
  // top of a small screen. Always fully expanded from md up.
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);

  const [recentSearches, setRecentSearches] = useState<BehaviorResult[]>(loadRecentSearches);
  // History now lives in a dropdown off the search bar rather than a panel in
  // the results, so it stops interrupting the reading flow of the tabs.
  const [recentOpen, setRecentOpen] = useState(false);

  // The predictive result list is an overlay, so it needs a real open/close
  // state: it can be dismissed (Escape, click-outside) while the query that
  // produced it is still in the field.
  const [predictiveOpen, setPredictiveOpen] = useState(true);
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Re-collapse the dialogue whenever a different behavior is opened, so every
  // result starts from the same compact state.
  useEffect(() => {
    setShowDialogue(false);
  }, [selectedBehavior?.id]);

  // Mirror the theme onto <html>. `data-theme` is the single switch the whole
  // token system keys off, so nothing else needs to know about the theme.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Follow the OS while the user has not made an explicit choice. Once they hit
  // the toggle their preference is stored and wins from then on.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(THEME_STORAGE_KEY)) return;
      } catch (err) {
        // Storage unavailable — treat as "no explicit choice" and follow the OS.
      }
      setTheme(e.matches ? "dark" : "light");
    };

    media.addEventListener("change", handleSystemChange);
    return () => media.removeEventListener("change", handleSystemChange);
  }, []);

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === "light" ? "dark" : "light";
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch (e) {
        console.warn("Could not save theme preference to localStorage", e);
      }
      return next;
    });
  };

  const addToHistory = (behavior: BehaviorResult) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter(item => item.clinicalConcept !== behavior.clinicalConcept && item.query.toLowerCase() !== behavior.query.toLowerCase());
      const updated = [behavior, ...filtered].slice(0, 5);
      try {
        localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Local storage error:", e);
      }
      return updated;
    });
  };

  // Example searches. The category tag lets a reader tell "washes hands
  // continuously" from "hears voices" at a glance, instead of scanning
  // eight visually identical lines.
  const exampleQueries: { text: string; tag: string; tone: CategoryTone }[] = [
    { text: "Washes hands continuously", tag: "OCD", tone: "blue" },
    { text: "Won't leave the house", tag: "Agoraphobia", tone: "purple" },
    { text: "Loses keys & can't stay focused", tag: "ADHD", tone: "green" },
    { text: "Feels detached from own body", tag: "Dissociation", tone: "amber" },
    { text: "Sudden racing chest, fear of dying", tag: "Panic", tone: "red" },
    { text: "Skips meals, counts calories obsessed", tag: "Eating", tone: "magenta" },
    { text: "Terrified of group presentations", tag: "Social Anxiety", tone: "teal" },
    { text: "Hears voices, feels people are watching", tag: "Psychosis", tone: "neutral" }
  ];

  // Predictive search matching with 300ms debounce and 3-char minimum threshold
  useEffect(() => {
    const qTrim = query.trim().toLowerCase();
    if (qTrim.length < 3) {
      setSuggestions([]);
      return;
    }

    const handler = setTimeout(() => {
      const scored = PREDEFINED_BEHAVIORS.map(b => {
        let score = 0;
        if (b.clinicalConcept.toLowerCase() === qTrim) score += 500;
        else if (b.clinicalConcept.toLowerCase().includes(qTrim)) score += 150;
        if (b.query.toLowerCase().includes(qTrim)) score += 100;
        if (b.tags) {
          b.tags.forEach(t => {
            if (t.toLowerCase() === qTrim) score += 80;
            else if (t.toLowerCase().includes(qTrim)) score += 40;
          });
        }
        if (b.searchSentences) {
          b.searchSentences.forEach(s => {
            if (s.toLowerCase().includes(qTrim)) score += 60;
          });
        }
        return { behavior: b, score };
      })
        .filter(item => item.score > 10)
        .sort((a, b) => b.score - a.score)
        .map(item => item.behavior);

      setSuggestions(scored);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  // Execute Search Mapping
  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setErrorText("");
    setSystemAlert(null);

    // Try server endpoint
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.source === "gemini" && data.result) {
          const geminiResult: BehaviorResult = {
            id: `gemini-${Date.now()}`,
            query: searchQuery,
            clinicalConcept: data.result.clinicalConcept,
            shortExplanation: data.result.shortExplanation,
            outsideAction: data.result.outsideAction,
            insideMind: data.result.insideMind,
            matchMeter: data.result.matchMeter,
            triOrigin: data.result.triOrigin,
            childhoodEnvironment: data.result.childhoodEnvironment || "Family environment details mapped for this behavior pattern.",
            childhoodCauses: data.result.childhoodCauses || "Adaptive developmental origins observed."
          };
          setSelectedBehavior(geminiResult);
          addToHistory(geminiResult);
          setMindToggle("outside");
          setQuery(searchQuery);
          setSuggestions([]);
          setActiveSection("overview");
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn("Using local matching engine:", e);
    }

    // Client-side heuristic match
    const localMatch = findMatchingBehavior(searchQuery);
    if (localMatch) {
      setSelectedBehavior(localMatch);
      addToHistory(localMatch);
      setMindToggle("outside");
      setSuggestions([]);
      setActiveSection("overview");
    } else {
      setErrorText(`No direct clinical match found for "${searchQuery}". Please try selecting one of the suggested behaviors or refine your description.`);
      setSuggestions([]);
    }
    setLoading(false);
  };

  const handleSuggestionClick = (behavior: BehaviorResult) => {
    setSelectedBehavior(behavior);
    addToHistory(behavior);
    setQuery(behavior.query);
    setSuggestions([]);
    setMindToggle("outside");
    setErrorText("");
    setActiveSection("overview");
  };

  // Native share sheet where the browser offers one, clipboard everywhere else.
  const shareResult = async (behavior: BehaviorResult) => {
    const shareData = {
      title: `Mind Compass — ${behavior.clinicalConcept}`,
      text: `${behavior.clinicalConcept}: ${behavior.shortExplanation}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(`${shareData.title} — ${shareData.url}`);
      setSystemAlert("Link copied to clipboard");
    } catch (e) {
      // A cancelled share sheet lands here too, so only report a real failure.
      if (e instanceof Error && e.name === "AbortError") return;
      setSystemAlert("Could not share this result");
    }
  };

  // Clear the transient toast after a few seconds.
  useEffect(() => {
    if (!systemAlert) return;
    const timer = setTimeout(() => setSystemAlert(null), 3000);
    return () => clearTimeout(timer);
  }, [systemAlert]);

  // Escape closes the result actions menu, matching the recent-searches dropdown.
  useEffect(() => {
    if (!actionsOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActionsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [actionsOpen]);

  // Arrow / Home / End move between tabs, per the WAI-ARIA tabs pattern. Every
  // tab stays in the tab order too, so plain Tab still reaches each one.
  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = SECTIONS.length - 1;
    let next: number | null = null;

    if (e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;

    if (next === null) return;
    e.preventDefault();
    setActiveSection(SECTIONS[next].id);
    tabRefs.current[next]?.focus();
  };

  // Empty field only: while typing, the live suggestion list is more relevant
  // than history, and stacking both would bury it.
  const showRecentDropdown =
    recentOpen && query.trim() === "" && recentSearches.length > 0;

  // The predictive dropdown floats over the page rather than sitting in flow,
  // so the suggestion chips and the "What you'll see" card below never move
  // when it opens or closes.
  const showPredictiveDropdown =
    predictiveOpen &&
    !loading &&
    !errorText &&
    !selectedBehavior &&
    query.trim().length >= 3;

  // An overlay has to be dismissable by the two gestures users expect. Escape
  // returns focus to the field; a click outside just closes it, since the user
  // has already chosen where to put focus.
  useEffect(() => {
    if (!showPredictiveDropdown) return;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!searchWrapRef.current?.contains(e.target as Node)) {
        setPredictiveOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPredictiveOpen(false);
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [showPredictiveDropdown]);

  return (
    <div id="mind-compass-container" className="page-scroll-pad min-h-screen bg-page text-body flex flex-col items-center relative transition-colors duration-300">

      {/* Header Navigation */}
      <header id="editorial-nav-header" className="w-full border-b border-line bg-page/90 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3 select-none">
        <div className="flex items-center gap-2 shrink-0">
          <MindCompassLogo size="22px" isAnimated={false} />
          <span className="text-[15px] font-semibold tracking-tight text-body font-serif">
            Mind Compass
          </span>
          <span className="hidden xs:inline-block text-[10px] font-mono text-muted bg-line px-2 py-0.5 rounded-md ml-1">
            Reference Tool
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Below md these two move into the bottom tab bar, where they are
              reachable one-handed instead of stranded at the top of the screen. */}
          <button
            type="button"
            onClick={() => setActiveView("finder")}
            className={`hidden md:inline-block text-[13px] font-medium transition-colors cursor-pointer ${activeView === "finder"
                ? "text-link font-semibold border-b-2 border-link pb-0.5"
                : "text-muted hover:text-body"
              }`}
          >
            Behavior Finder
          </button>

          <button
            type="button"
            onClick={() => setActiveView("quiz")}
            className={`hidden md:inline-block text-[13px] font-medium transition-colors cursor-pointer ${activeView === "quiz"
                ? "text-link font-semibold border-b-2 border-link pb-0.5"
                : "text-muted hover:text-body"
              }`}
          >
            Practice Quiz
          </button>

          {/* Theme Switcher Button */}
          <button
            type="button"
            data-theme-toggle
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="touch-icon flex items-center justify-center p-1.5 rounded-lg border border-line text-muted hover:text-body hover:bg-line transition-colors cursor-pointer"
          >
            {/* Moon while light (click to go dark), sun while dark. */}
            {theme === "light" ? <Moon size={16} weight="light" /> : <Sun size={16} weight="light" />}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-4xl px-4 sm:px-6 flex-1 flex flex-col py-8 items-center">

        {activeView === "quiz" ? (
          <div className="w-full flex justify-center animate-fadeIn">
            <MentalHealthQuiz onClose={() => setActiveView("finder")} />
          </div>
        ) : (
          <>
            {/* Title & Introduction */}
            <div
              id="landing-header"
              className={`text-center transition-all duration-500 overflow-hidden ${selectedBehavior ? 'my-4 max-h-[100px]' : 'my-10 max-h-[300px]'
                }`}
            >
              <h1 className={`font-serif font-medium text-body tracking-tight leading-tight ${selectedBehavior ? 'text-[20px] md:text-[26px]' : 'text-[22px] md:text-[40px]'
                }`}>
                Clinical Behavior Reference Tool
              </h1>
              {/* Hidden below md — the search placeholder already says what the
                  tool does, and on a small screen this pushes it off-screen. */}
              <p className={`text-[15px] text-muted max-w-xl mx-auto font-sans leading-relaxed mt-2 ${selectedBehavior ? 'hidden' : 'hidden md:block'
                }`}>
                Look up everyday human behaviors to examine related clinical concepts, diagnostic symptom overlaps, multi-factor origins, and primary academic resources.
              </p>
            </div>

            {/* Search Input Engine. This wrapper is the positioning context for
                the two dropdowns, so it holds the bar and the overlays and
                nothing else — anything else inside it would push `top: 100%`
                down past the bar and the panels would open below the fold. */}
            <div
              id="search-engine-wrap"
              ref={searchWrapRef}
              /* z-45: above the sticky #section-nav-tabs (z-40) so an open
                 dropdown wins, but under the page header (z-50). */
              className="w-full max-w-2xl relative z-[45]"
            >

              <div
                id="search-bar-frame"
                className={`flex items-center h-12 md:h-13 bg-surface border rounded-xl px-3 md:px-4 shadow-xs transition-all duration-200 relative ${isFocused
                    ? "border-link ring-2 ring-brand/20"
                    : "border-line"
                  }`}
              >
                <MagnifyingGlass className={`mr-3 shrink-0 ${isFocused ? "text-link" : "text-muted"}`} size={18} weight="light" />

                <input
                  id="search-input-field"
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    // Typing is an explicit re-request for predictions, even if
                    // the overlay was dismissed a keystroke ago.
                    setPredictiveOpen(true);
                    if (selectedBehavior) setSelectedBehavior(null);
                    if (errorText) setErrorText("");
                  }}
                  onFocus={() => {
                    setIsFocused(true);
                    setRecentOpen(true);
                    setPredictiveOpen(true);
                  }}
                  onBlur={() =>
                    setTimeout(() => {
                      setIsFocused(false);
                      setRecentOpen(false);
                    }, 200)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch(query);
                    if (e.key === "Escape") {
                      setRecentOpen(false);
                      setPredictiveOpen(false);
                    }
                  }}
                  placeholder="Describe a behavior (e.g., washes hands continuously, terrified of speeches)..."
                  /* 16px on mobile: anything smaller makes iOS Safari zoom the
                     viewport when the field takes focus. */
                  className="flex-1 min-w-0 bg-transparent text-[16px] md:text-[14px] text-body placeholder-muted font-sans"
                  autoComplete="off"
                  aria-label="Search behaviors"
                  aria-haspopup="listbox"
                  aria-expanded={showRecentDropdown || showPredictiveDropdown}
                  aria-controls={showPredictiveDropdown ? "matching-behavior-list" : "recent-dropdown"}
                />

                {query && (
                  <button
                    onClick={() => {
                      setQuery("");
                      setSuggestions([]);
                      setSelectedBehavior(null);
                      setErrorText("");
                    }}
                    className="text-[12px] text-muted hover:text-body mr-2 shrink-0 font-medium px-2 py-1 rounded hover:bg-line transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                )}

                <button
                  onClick={() => handleSearch(query)}
                  disabled={loading}
                  className="h-11 md:h-8 px-3 md:px-4 shrink-0 bg-brand hover:bg-brand-hover text-on-brand rounded-lg font-medium text-[13px] transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-2xs"
                >
                  {loading ? "Searching..." : "Search"}
                  <ArrowRight size={13} weight="light" aria-hidden="true" />
                </button>
              </div>

              {/* Recent searches, surfaced from the search bar on focus. Only
                  while the field is empty — once the user is typing, the live
                  suggestion list below is the more useful thing to show.
                  onMouseDown is prevented so a click here lands before blur. */}
              {showRecentDropdown && (
                <div
                  id="recent-dropdown"
                  onMouseDown={(e) => e.preventDefault()}
                  className="absolute top-[calc(100%+4px)] left-0 right-0 z-[9999] p-2 bg-surface border border-line-strong rounded-lg shadow-lg"
                >
                  <p className="text-[12px] font-medium text-muted px-2 py-1 mb-1">
                    Recent
                  </p>

                  <div role="listbox" aria-label="Recent searches" className="flex flex-col">
                    {recentSearches.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        role="option"
                        aria-selected={false}
                        onClick={() => {
                          handleSuggestionClick(item);
                          setRecentOpen(false);
                        }}
                        className="w-full text-left px-2 py-2 rounded-md hover:bg-raised transition-colors cursor-pointer"
                      >
                        <span className="block text-[13px] font-medium text-body truncate">
                          {item.clinicalConcept}
                        </span>
                        <span className="block text-[11px] text-muted truncate mt-px">
                          "{item.query}"
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end border-t border-line mt-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setRecentSearches([]);
                        localStorage.removeItem(RECENT_STORAGE_KEY);
                        setRecentOpen(false);
                      }}
                      className="text-[12px] text-muted hover:text-body px-2 py-1 rounded-md hover:bg-raised transition-colors cursor-pointer"
                    >
                      Clear history
                    </button>
                  </div>
                </div>
              )}

              {/* Predictive results. Absolutely positioned inside the search
                  wrapper so it overlays the page rather than sitting in flow —
                  the suggestion chips and the "What you'll see" card below keep
                  their position whether this is open or shut. */}
              {showPredictiveDropdown && (
                <div
                  id="matching-behavior-list"
                  className="absolute top-full left-0 w-full z-[100] max-h-[60vh] overflow-y-auto bg-surface border-[0.5px] border-line rounded-b-xl shadow-lg text-left animate-dropdownIn"
                >
                  {suggestions.length > 0 ? (
                    <>
                      <span className="block text-[12px] font-medium text-muted px-4 pt-3 pb-1">
                        Matching behavior profiles ({suggestions.length})
                      </span>

                      <div
                        role="listbox"
                        aria-label="Matching behavior profiles"
                        className="flex flex-col px-4 pb-2"
                      >
                        {suggestions.map((item, idx) => {
                          const isLast = idx === suggestions.length - 1;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              role="option"
                              aria-selected={false}
                              onClick={() => handleSuggestionClick(item)}
                              className={`w-full min-h-[44px] py-2.5 flex items-start justify-between gap-3 text-left group cursor-pointer transition-colors ${!isLast ? "border-b border-line" : ""
                                }`}
                            >
                              <div className="flex flex-col pr-2">
                                <span className="text-[13px] sm:text-[14px] font-normal text-body group-hover:text-link leading-snug transition-colors">
                                  {item.clinicalConcept}
                                </span>
                                <span className="text-[11px] font-mono text-muted mt-0.5">
                                  Trigger: "{item.query}"
                                </span>
                              </div>
                              <CaretRight
                                size={14}
                                weight="light"
                                className="text-muted group-hover:text-link group-hover:translate-x-0.5 shrink-0 mt-1 transition-all"
                              />
                            </button>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <div id="no-matches-state" className="px-4 py-5 text-center text-[13px] text-muted">
                      <p className="font-medium text-body mb-1">
                        No direct behavior profile matches found for "{query}".
                      </p>
                      <p className="text-[12px]">
                        Press <span className="font-semibold text-link">Search</span> or <span className="font-semibold text-link">Enter</span> to run an AI clinical synthesis.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mutually Exclusive Content States below Search Bar. A sibling of
                the search wrapper, not a child — see the note above it. */}
            <div id="search-below-content" className="w-full max-w-2xl">
              {loading ? (
                <div id="search-loading-state" className="mt-8 py-8 flex flex-col items-center justify-center gap-3">
                  <div className="h-7 w-7 rounded-full border-2 border-t-brand border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                  <span className="text-[12px] font-mono text-muted">
                    Loading...
                  </span>
                </div>
              ) : errorText ? (
                <div id="search-error-state" role="status" className="mt-6 p-3.5 bg-warn-tint border border-warn/30 rounded-lg text-[13px] text-warn-ink leading-relaxed flex items-center gap-2">
                  <Info size={16} weight="light" className="shrink-0" />
                  <span>{errorText}</span>
                </div>
              ) : selectedBehavior ? (
                null
              ) : (
                /* Default Empty State: "Try one of these". No longer swapped
                   out while the user types — the predictive list floats over
                   it, so this block never moves or disappears mid-search. */
                <div id="example-suggestion-list" className="mt-8 w-full max-w-[640px] mx-auto text-left animate-fadeIn">
                  <span className="text-[12px] font-medium text-muted block mb-3 text-left sm:text-center">
                    Try one of these
                  </span>

                  {/* Wrapping pills rather than eight full-width rows: the same
                      eight suggestions in ~2-3 rows, so the result preview below
                      stays above the fold. Each pill holds its category tag, so
                      the colour context of the old rows is preserved. */}
                  <ul className="flex flex-wrap gap-2 justify-start sm:justify-center w-full">
                    {exampleQueries.map((item) => (
                      <li key={item.text} className="max-w-full">
                        <button
                          onClick={() => {
                            setQuery(item.text);
                            handleSearch(item.text);
                          }}
                          aria-label={`Search: ${item.text} (${item.tag})`}
                          className="max-w-full min-h-[36px] inline-flex items-center gap-[7px] px-3 py-[7px] rounded-full border border-line bg-surface cursor-pointer transition-colors hover:border-line-strong hover:bg-raised active:scale-[0.98]"
                        >
                          <span
                            className={`shrink-0 text-[9px] font-semibold uppercase tracking-[0.05em] px-1.5 py-0.5 rounded leading-[1.4] ${TONE_CHIP[item.tone]}`}
                          >
                            {item.tag}
                          </span>
                          {/* One line per pill; on a narrow phone the longest
                              label truncates rather than wrapping the pill. */}
                          <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[12px] sm:text-[13px] font-normal text-body leading-none">
                            {item.text}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Shows what a result contains before the user commits to a
                      search. Static and inert — a sample, not a control. */}
                  <div className="mt-10" aria-label="Example of what a result looks like">
                    <p className="text-[12px] font-medium text-muted mb-2">
                      What you'll see
                    </p>
                    <div
                      className="border border-line rounded-lg px-6 py-4 bg-surface pointer-events-none select-none"
                      aria-hidden="true"
                    >
                      <div className="mb-4">
                        <span className="inline-block text-[12px] font-medium text-brand bg-brand-tint px-2 py-[3px] rounded mb-1.5">
                          Clinical concept
                        </span>
                        <strong className="block text-[16px] font-semibold text-body">
                          Obsessive-Compulsive Disorder (OCD)
                        </strong>
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-line">
                        {[
                          "Symptom breakdown",
                          "3 root causes",
                          "Diagnostic match meter",
                          "Academic citations"
                        ].map((feature) => (
                          <span key={feature} className="flex items-center gap-1.5 text-[12px] text-muted">
                            <Check size={12} weight="bold" className="text-cat-green shrink-0" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Selected Behavior Result View */}
            {selectedBehavior && (
              <div id="clinical-content-sheet" className="w-full mt-8 flex flex-col gap-6 animate-fadeIn">

                {/* Persistent Disclaimer Banner — styles live in index.css so the
                    app's most important safety message has one definition. */}
                <div
                  id="persistent-disclaimer-banner"
                  className="disclaimer-banner"
                  role="note"
                  aria-label="Educational use disclaimer"
                >
                  <div className="disclaimer-icon" aria-hidden="true">
                    <svg viewBox="0 0 20 20" width="18" height="18" fill="none">
                      <path d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2z"
                            stroke="currentColor" strokeWidth="1.5" />
                      <path d="M10 9v5M10 7h.01"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="disclaimer-text min-w-0">
                    <strong>Educational reference only — not a diagnostic tool.</strong>
                    {/* Collapsed to the headline below md; always open from md up. */}
                    <span className={`${disclaimerOpen ? "block" : "hidden"} md:block`}>
                      Designed for psychology students and educators studying clinical
                      terminology and behavioral overlaps.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDisclaimerOpen((open) => !open)}
                    aria-expanded={disclaimerOpen}
                    aria-label={disclaimerOpen ? "Hide full disclaimer" : "Show full disclaimer"}
                    className="md:hidden touch-icon -my-2 -mr-2 flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    <CaretDown
                      size={16}
                      weight="bold"
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${disclaimerOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                {/* Section Navigation Tabs (In-Page). Short labels: these are
                    navigation, not section headings. */}
                <div
                  id="section-nav-tabs"
                  role="tablist"
                  aria-label="Result sections"
                  className="tab-scroller sticky top-14 z-40 bg-page/95 border-b border-line flex items-center no-scrollbar"
                >
                  {SECTIONS.map((section, index) => {
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        type="button"
                        role="tab"
                        id={`tab-${section.id}`}
                        aria-selected={isActive}
                        aria-controls={`panel-${section.id}`}
                        ref={(el) => {
                          tabRefs.current[index] = el;
                        }}
                        onClick={() => setActiveSection(section.id)}
                        onKeyDown={(e) => handleTabKeyDown(e, index)}
                        className={`tab-item shrink-0 min-h-[44px] px-4 py-3 -mb-px text-[13px] font-medium whitespace-nowrap cursor-pointer border-b-2 transition-colors ${isActive
                            ? "text-body border-brand"
                            : "text-muted border-transparent hover:text-body"
                          }`}
                      >
                        {section.label}
                      </button>
                    );
                  })}
                </div>

                {/* Section 1: OVERVIEW. The panel wrapper always exists so each
                    tab's aria-controls resolves; the contents mount only while
                    active, which keeps the Resources fetch from firing early. */}
                <div role="tabpanel" id="panel-overview" aria-labelledby="tab-overview" hidden={activeSection !== "overview"}>
                {activeSection === "overview" && (
                  <div className="flex flex-col gap-6 animate-fadeIn">

                    {/* Content heading — stands alone at full width. Utility
                        actions moved to the utility bar; "Reset Search" was
                        dropped because the search bar's "Clear" already does
                        exactly the same thing. */}
                    <div className="border-b border-line pb-4 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[12px] font-medium text-muted">
                          Primary clinical concept
                        </p>
                        <h2 className="text-[22px] md:text-[28px] font-serif font-medium text-body tracking-tight mt-1">
                          {selectedBehavior.clinicalConcept}
                        </h2>
                        <p className="text-[13px] text-muted mt-1 italic font-sans">
                          Described as: "{selectedBehavior.query}"
                        </p>
                      </div>

                      {/* Result actions. Collapsed behind one control so they
                          never compete with the heading for attention. */}
                      <div className="relative shrink-0">
                        <button
                          type="button"
                          onClick={() => setActionsOpen((open) => !open)}
                          aria-label="Result actions"
                          aria-haspopup="menu"
                          aria-expanded={actionsOpen}
                          className="touch-icon flex items-center justify-center rounded-lg text-muted hover:text-body hover:bg-raised transition-colors cursor-pointer"
                        >
                          <DotsThree size={24} weight="bold" aria-hidden="true" />
                        </button>

                        {actionsOpen && (
                          <>
                            {/* Backdrop: dims the page behind the sheet on
                                mobile and catches outside clicks everywhere. */}
                            <div
                              className="fixed inset-0 z-[55] bg-black/40 md:bg-transparent"
                              onClick={() => setActionsOpen(false)}
                              aria-hidden="true"
                            />

                            {/* Bottom sheet below md, anchored menu from md up. */}
                            <div
                              role="menu"
                              aria-label="Result actions"
                              /* z above the bottom tab bar and the FAB (both z-50),
                                 so the sheet covers them rather than sliding under. */
                              className="fixed inset-x-0 bottom-0 z-[60] rounded-t-2xl border-t border-line bg-surface p-2 pb-[calc(8px+env(safe-area-inset-bottom,0px))] shadow-2xl md:absolute md:inset-x-auto md:bottom-auto md:right-0 md:top-[calc(100%+4px)] md:w-56 md:rounded-lg md:border md:pb-2"
                            >
                              <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-line-strong md:hidden" aria-hidden="true" />
                              {[
                                {
                                  label: "Export PDF",
                                  Icon: Download,
                                  onSelect: () =>
                                    exportToPDF(selectedBehavior, query || selectedBehavior.query)
                                },
                                { label: "Share", Icon: ShareNetwork, onSelect: () => shareResult(selectedBehavior) },
                                {
                                  label: "Reset search",
                                  Icon: ArrowCounterClockwise,
                                  onSelect: () => {
                                    setSelectedBehavior(null);
                                    setQuery("");
                                    setErrorText("");
                                  }
                                }
                              ].map(({ label, Icon, onSelect }) => (
                                <button
                                  key={label}
                                  type="button"
                                  role="menuitem"
                                  onClick={() => {
                                    setActionsOpen(false);
                                    onSelect();
                                  }}
                                  className="w-full min-h-[44px] flex items-center gap-3 px-3 rounded-lg text-left text-[14px] text-body hover:bg-raised transition-colors cursor-pointer"
                                >
                                  <Icon size={18} weight="light" aria-hidden="true" className="text-muted shrink-0" />
                                  {label}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* One-Paragraph Plain Language Summary */}
                    <article id="compassionate-summary" className="py-2">
                      <h3 className="text-[12px] font-medium text-muted mb-2">
                        Summary
                      </h3>
                      <p className="text-[16px] md:text-[17px] text-body leading-relaxed font-serif">
                        {selectedBehavior.shortExplanation}
                      </p>
                    </article>

                    {/* Mental Analogy Callout (if available) */}
                    {selectedBehavior.analogy && (
                      <div id="disorder-analogy-section" className="p-4 bg-note-tint border border-note/20 rounded-xl flex gap-3 items-start">
                        <Lightbulb size={18} weight="light" className="text-note-ink shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-[12px] font-medium text-note-ink mb-1.5">
                            Conceptual Analogy
                          </h4>
                          <p className="text-[14px] text-body leading-relaxed font-sans">
                            {selectedBehavior.analogy}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Dialogue Scenario Simulation */}
                    {selectedBehavior.conversationScenario && (
                      <div id="relational-dialogue-section" className="border-t border-line pt-6">
                        {/* Framing — says why the dialogue is worth opening. */}
                        <div className="mb-4">
                          <h3 className="text-[16px] font-semibold text-body">
                            How {selectedBehavior.clinicalConcept} sounds in conversation
                          </h3>
                          <p className="text-[13px] text-muted leading-relaxed mt-1">
                            The spoken words vs. what's actually happening internally — the gap
                            between them is where {selectedBehavior.clinicalConcept} operates.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowDialogue((open) => !open)}
                          aria-expanded={showDialogue}
                          aria-controls="dialogue-content"
                          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-line bg-transparent hover:bg-raised hover:border-line-strong text-[13px] font-medium text-body transition-colors cursor-pointer"
                        >
                          <span>{showDialogue ? "Hide" : "Show"} example conversation</span>
                          <CaretRight
                            size={14}
                            weight="light"
                            aria-hidden="true"
                            className={`shrink-0 transition-transform duration-200 ${showDialogue ? "-rotate-90" : "rotate-90"}`}
                          />
                        </button>

                        <div id="dialogue-content" hidden={!showDialogue} className="mt-4">
                          <div className="flex justify-end mb-3">
                            <div className="flex bg-surface border border-line rounded-lg p-0.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => setSelectedSocialTab("friend")}
                              className={`px-2.5 py-1 text-[11px] font-medium rounded cursor-pointer transition-colors ${selectedSocialTab === "friend" ? "bg-brand text-on-brand" : "text-muted"
                                }`}
                            >
                              Friend
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedSocialTab("family")}
                              className={`px-2.5 py-1 text-[11px] font-medium rounded cursor-pointer transition-colors ${selectedSocialTab === "family" ? "bg-brand text-on-brand" : "text-muted"
                                }`}
                            >
                              Family
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedSocialTab("couple")}
                              className={`px-2.5 py-1 text-[11px] font-medium rounded cursor-pointer transition-colors ${selectedSocialTab === "couple" ? "bg-brand text-on-brand" : "text-muted"
                                }`}
                            >
                              Partner
                            </button>
                          </div>
                        </div>

                        {(() => {
                          const scenarios = getDialogueScenarios(selectedBehavior);
                          const activeScenario = scenarios[selectedSocialTab] || selectedBehavior.conversationScenario;
                          return (
                            <div className="flex flex-col gap-4 bg-surface border border-line p-4 rounded-xl">
                              <span className="text-[11px] font-mono text-muted">
                                Context: {activeScenario.context}
                              </span>

                              <div className="flex flex-col gap-3">
                                {activeScenario.dialogue.map((line, idx) => {
                                  const isSufferer = line.speaker.toLowerCase().includes("person") || line.speaker.toLowerCase().includes("patient") || line.speaker.toLowerCase().includes("sufferer");
                                  return (
                                    <div key={idx} className={`flex flex-col gap-1 max-w-[92%] ${isSufferer ? "mr-auto" : "ml-auto text-right"}`}>
                                      <span className="text-[10px] font-mono font-semibold text-muted">
                                        {line.speaker}
                                      </span>
                                      <div className={`p-3 rounded-lg text-[13.5px] font-sans ${isSufferer
                                          ? "bg-page text-body border border-line"
                                          : "bg-brand text-on-brand"
                                        }`}>
                                        "{line.speech}"
                                      </div>
                                      {/* 13px, no opacity — the annotation is the
                                          point of the section, not a footnote. */}
                                      {line.innerThought && (
                                        <div className="text-[13px] italic leading-normal text-warn-ink px-1 mt-1">
                                          Unspoken thought: "{line.innerThought}"
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })()}
                        </div>
                      </div>
                    )}

                  </div>
                )}

                </div>

                {/* Section 2: SYMPTOMS */}
                <div role="tabpanel" id="panel-symptoms" aria-labelledby="tab-symptoms" hidden={activeSection !== "symptoms"}>
                {activeSection === "symptoms" && (
                  <div className="flex flex-col gap-6 animate-fadeIn">

                    <div className="border-b border-line pb-3">
                      <h3 className="text-[20px] font-serif font-medium text-body">
                        Symptom Expressions & Manifestations
                      </h3>
                      <p className="text-[13px] text-muted mt-0.5">
                        Differentiating observable outward behaviors from internal subjective experience.
                      </p>
                    </div>

                    {/* Outside vs Inside Switch */}
                    <div className="flex flex-col gap-3">
                      {/* Plain language up front, clinical framing underneath —
                          the toggle should be readable at a glance. */}
                      <div className="flex gap-1 w-full md:max-w-md" role="group" aria-label="Choose symptom perspective">
                        {([
                          { id: "outside", label: "What others see", sub: "observable behaviors" },
                          { id: "inside", label: "What they feel", sub: "internal experience" }
                        ] as const).map((option) => {
                          const isActive = mindToggle === option.id;
                          return (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => setMindToggle(option.id)}
                              aria-pressed={isActive}
                              className={`flex-1 flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-lg border text-[13px] font-medium cursor-pointer transition-colors ${isActive
                                  ? "bg-surface border-brand text-body"
                                  : "bg-raised border-line text-muted hover:text-body"
                                }`}
                            >
                              {option.label}
                              <span className="text-[12px] font-normal text-muted">
                                {option.sub}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Boxed Data Card for Symptom Checklist */}
                      <div className="p-5 bg-surface border border-line rounded-xl shadow-xs">
                        {mindToggle === "outside" ? (
                          <div className="space-y-2">
                            <span className="text-[12px] font-medium text-muted">
                              Observable behaviors and manifestations
                            </span>
                            <p className="text-[15px] leading-relaxed text-body font-sans">
                              {selectedBehavior.outsideAction}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <span className="text-[12px] font-medium text-muted">
                              Unspoken internal experience and coping reality
                            </span>
                            <p className="text-[15px] leading-relaxed text-body font-sans">
                              {selectedBehavior.insideMind}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Behavioral Intensity Continuum */}
                    <div className="mt-2">
                      <BehaviorVisualizer
                        behaviorId={selectedBehavior.id}
                        clinicalConcept={selectedBehavior.clinicalConcept}
                      />
                    </div>

                  </div>
                )}

                </div>

                {/* Section 3: CAUSES */}
                <div role="tabpanel" id="panel-causes" aria-labelledby="tab-causes" hidden={activeSection !== "causes"}>
                {activeSection === "causes" && (
                  <div className="animate-fadeIn">
                    <ThreeRoots
                      data={selectedBehavior.triOrigin}
                      childhoodEnvironment={selectedBehavior.childhoodEnvironment}
                      childhoodCauses={selectedBehavior.childhoodCauses}
                    />
                  </div>
                )}
                </div>

                {/* Section 4: RESOURCES */}
                <div role="tabpanel" id="panel-resources" aria-labelledby="tab-resources" hidden={activeSection !== "resources"}>
                {activeSection === "resources" && (
                  <div className="flex flex-col gap-8 animate-fadeIn">

                    {/* Match Meter Data Card */}
                    <div className="max-w-2xl">
                      <MatchMeter
                        disorders={selectedBehavior.matchMeter}
                        onSelectDisorder={(disorder) => {
                          setQuery(disorder);
                          handleSearch(disorder);
                        }}
                      />
                    </div>

                    {/* Clinical Literature & Citations */}
                    <ClinicalResources clinicalConcept={selectedBehavior.clinicalConcept} />

                  </div>
                )}
                </div>

              </div>
            )}

            {/* Recent searches used to sit here as a panel below the tabs. It
                now lives in a dropdown off the search bar (see #recent-dropdown)
                so it no longer interrupts the flow of the result content. */}
          </>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 px-4 mt-auto border-t border-line text-[12px] text-muted flex flex-col items-center gap-2">
        <p className="max-w-xs sm:max-w-none text-center leading-relaxed">
          Mind Compass
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> &middot; </span>
          Psychology Reference Tool for Students
        </p>
        <p className="font-mono text-[10px] sm:text-[11px] max-w-xs sm:max-w-none text-center leading-relaxed">
          Educational Use Only &middot; Not for Clinical Diagnosis
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> &middot; </span>
          Developed by{" "}
          <a
            href="https://kellasandrei.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-link transition-colors"
          >Andrei</a>
        </p>
      </footer>

      {/* Bottom tab bar — the primary navigation below md, where the top-right
          text links were both cramped and hard to reach one-handed. */}
      <nav
        aria-label="Primary"
        className="bottom-tab-bar md:hidden fixed bottom-0 inset-x-0 z-50 flex border-t border-line bg-page/95 backdrop-blur-md"
      >
        {([
          { id: "finder", label: "Finder", Icon: Brain },
          { id: "quiz", label: "Quiz", Icon: Exam }
        ] as const).map(({ id, label, Icon }) => {
          const isActive = activeView === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveView(id)}
              aria-current={isActive ? "page" : undefined}
              className={`bottom-tab flex-1 flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors cursor-pointer ${isActive ? "text-link" : "text-muted"
                }`}
            >
              <Icon size={20} weight={isActive ? "fill" : "light"} aria-hidden="true" />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Floating AI Companion */}
      <AIChatCompanion activeBehavior={selectedBehavior} />

      {/* Transient confirmation (e.g. "Link copied"), announced politely. */}
      {systemAlert && (
        <div
          role="status"
          className="fixed left-1/2 -translate-x-1/2 bottom-[132px] md:bottom-24 z-[70] px-4 py-2 rounded-lg bg-surface border border-line-strong shadow-lg text-[13px] text-body"
        >
          {systemAlert}
        </div>
      )}
    </div>
  );
}
