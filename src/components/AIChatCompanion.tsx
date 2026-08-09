import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  PaperPlaneRight,
  Brain,
  ArrowCounterClockwise,
  Compass
} from "@phosphor-icons/react";
import { BehaviorResult } from "../types";

interface Message {
  sender: "user" | "bot";
  text: string;
  /** Pre-formatted clock time, stamped once when the message is created. */
  time: string;
}

interface AIChatCompanionProps {
  activeBehavior: BehaviorResult | null;
}

const GENERIC_FOLLOW_UPS = [
  "How do childhood environments shape anxiety?",
  "Tell me how to ground myself during physical panic."
];

function stamp(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function AIChatCompanion({ activeBehavior }: AIChatCompanionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [followUps, setFollowUps] = useState<string[]>(GENERIC_FOLLOW_UPS);

  // Badge state. True when the companion has topic-aware suggestions the user
  // has not seen yet — i.e. they moved to a new behaviour while the panel was
  // shut. Cleared the moment the panel opens.
  const [hasNewSuggestion, setHasNewSuggestion] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const didMountRef = useRef(false);

  // Seed (or re-seed) the thread whenever the page topic changes.
  useEffect(() => {
    let initialGreeting =
      "Hi! I am your AI Psychology Companion. Tell me how you are feeling, describe a specific behavior, or ask about key symptom clusters. (Please note that I am an educational tool, not a clinical doctor.)";

    if (activeBehavior) {
      initialGreeting = `Hi! I see you are exploring **${activeBehavior.clinicalConcept}**. I can help you discuss these symptoms, find personalized recommendations, or see how and why they relate to Body, Mind, and World parameters. Describe any personal signals you're noticing!`;
      setFollowUps([
        `What are the childhood factors of ${activeBehavior.clinicalConcept}?`,
        `Give me Body-Mind-World advice for this.`
      ]);
    } else {
      setFollowUps(GENERIC_FOLLOW_UPS);
    }

    setMessages([{ sender: "bot", text: initialGreeting, time: stamp() }]);

    // Not on first mount — an unseen suggestion means the topic *changed*
    // underneath a closed panel, which cannot be true for the initial render.
    if (didMountRef.current && !isOpen && activeBehavior) {
      setHasNewSuggestion(true);
    }
    didMountRef.current = true;
    // `isOpen` is read but deliberately not a dependency: re-seeding the thread
    // every time the panel is toggled would wipe the conversation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBehavior]);

  // Scroll to bottom on updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Opening clears the badge and hands focus to the input; Escape closes.
  useEffect(() => {
    if (!isOpen) return;
    setHasNewSuggestion(false);
    inputRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const updatedHistory = [...messages, { sender: "user", text, time: stamp() } as Message];
    setMessages(updatedHistory);
    setInputVal("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: updatedHistory
        })
      });

      if (!response.ok) {
        throw new Error("Failed to contact the digital companion server.");
      }

      const data = await response.json();
      if (data.success) {
        setMessages(prev => [...prev, { sender: "bot", text: data.reply, time: stamp() }]);
        if (data.followUps && Array.isArray(data.followUps)) {
          setFollowUps(data.followUps);
        }
      } else if (data.reply) {
        // Fallback message handles if no developer API key
        setMessages(prev => [...prev, { sender: "bot", text: data.reply, time: stamp() }]);
        if (data.followUps) setFollowUps(data.followUps);
      } else {
        throw new Error("No usable output from active models.");
      }
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: "I am having some connection trouble right now. Please keep in mind that I am an AI companion for educational purposes and cannot offer a medical diagnosis.",
          time: stamp()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "Conversation thread cleared. What cognitive patterns or raw symptom symptoms would you like to explore?",
        time: stamp()
      }
    ]);
    setInputVal("");
    setFollowUps(activeBehavior ? followUps : GENERIC_FOLLOW_UPS);
  };

  return (
    <>
      {/* ─── Floating action button ──────────────────────────────────────────
          Extended pill when shut, collapsing to a round icon-only FAB when the
          panel is open. `layout` animates the width change rather than snapping
          it. Lifted above the bottom tab bar on mobile so the two never
          overlap; 24px from both edges from md up. */}
      <motion.button
        id="ai-chat-companion-fab"
        layout
        onClick={() => setIsOpen(o => !o)}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-label={isOpen ? "Close chat" : "Ask anything"}
        aria-expanded={isOpen}
        aria-controls="ai-chat-companion-window"
        className={`fixed bottom-[72px] md:bottom-6 right-5 md:right-6 z-50 flex items-center justify-center bg-brand hover:bg-brand-hover text-on-brand shadow-lg hover:shadow-2xl cursor-pointer select-none transition-shadow ${
          isOpen ? "h-14 w-14 rounded-full" : "h-[52px] min-w-[44px] gap-2.5 px-5 rounded-[28px]"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <X size={22} weight="light" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2.5"
            >
              <Brain size={20} weight="light" className="shrink-0" />
              <span className="text-[14px] font-medium whitespace-nowrap">Ask anything</span>
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unseen-suggestion badge. Ringed in the page colour so it reads as a
            separate dot rather than a notch cut out of the pill. */}
        {hasNewSuggestion && !isOpen && (
          <span
            className="absolute -top-1 -right-1 h-[18px] w-[18px] rounded-full bg-cat-red ring-2 ring-page"
            aria-hidden="true"
          />
        )}
        {hasNewSuggestion && !isOpen && <span className="sr-only">New suggestion available</span>}
      </motion.button>

      {/* ─── Chat panel ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-chat-companion-window"
            role="dialog"
            aria-label="Your AI Companion"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed bottom-[136px] md:bottom-24 right-5 md:right-6 origin-bottom-right w-[340px] max-w-[calc(100vw-2.5rem)] h-[520px] max-h-[70vh] md:max-h-[82vh] bg-surface border border-line rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden font-sans select-text"
          >
            {/* (1) Header */}
            <header className="bg-raised border-b border-line pl-4 pr-2 py-2 flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative shrink-0">
                  <div className="h-9 w-9 rounded-lg bg-brand-tint border border-brand/20 flex items-center justify-center text-link">
                    <Compass size={18} weight="light" />
                  </div>
                  <span
                    className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-ok ring-2 ring-raised"
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[13px] font-bold text-body tracking-tight leading-tight truncate">
                    AI Companion
                  </h3>
                  <span className="text-[10px] text-ok-ink font-mono uppercase tracking-wider leading-none">
                    Online
                  </span>
                </div>
              </div>

              <div className="flex items-center shrink-0">
                <button
                  onClick={resetChat}
                  aria-label="Reset conversation"
                  title="Reset conversation"
                  className="h-11 w-11 flex items-center justify-center hover:bg-surface text-muted hover:text-body rounded-lg transition-colors cursor-pointer"
                >
                  <ArrowCounterClockwise size={16} weight="light" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="h-11 w-11 flex items-center justify-center hover:bg-surface text-muted hover:text-body rounded-lg transition-colors cursor-pointer"
                >
                  <X size={16} weight="light" />
                </button>
              </div>
            </header>

            {/* (2) Context pill — what the user is looking at right now */}
            {activeBehavior && (
              <div className="shrink-0 bg-brand-tint border-b border-brand/20 px-4 py-1.5 flex items-center gap-1.5 select-none">
                <span className="text-[11px] text-link leading-snug truncate">
                  You're exploring{" "}
                  <strong className="font-semibold">{activeBehavior.clinicalConcept}</strong>
                </span>
              </div>
            )}

            {/* (3) Message area */}
            <div
              role="log"
              aria-live="polite"
              aria-label="Conversation"
              className="flex-1 overflow-y-auto p-4 space-y-3"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs inline-block leading-relaxed whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-brand text-on-brand rounded-tr-sm"
                        : "bg-surface text-body border border-line rounded-tl-sm font-light"
                    }`}
                  >
                    {/* Render text or bullets gracefully */}
                    {msg.text.split("\n").map((line, lIdx) => {
                      if (line.startsWith("- ") || line.startsWith("* ")) {
                        return (
                          <div key={lIdx} className="flex gap-1.5 my-1 pl-1">
                            <span className="text-link">•</span>
                            <span className="flex-1">{line.substring(2)}</span>
                          </div>
                        );
                      }

                      // Support gentle markdown ** bolding
                      const boldParts = line.split("**");
                      if (boldParts.length > 1) {
                        return (
                          <p key={lIdx} className="mb-1">
                            {boldParts.map((part, pIdx) =>
                              // No colour: inherit the bubble's own text token,
                              // which differs between the user and bot bubbles.
                              pIdx % 2 !== 0 ? (
                                <strong key={pIdx} className="font-bold">
                                  {part}
                                </strong>
                              ) : (
                                part
                              )
                            )}
                          </p>
                        );
                      }

                      return (
                        <p key={lIdx} className="mb-0.5">
                          {line}
                        </p>
                      );
                    })}
                  </div>
                  <span className="text-[10px] font-mono text-muted mt-1 px-1">{msg.time}</span>
                </div>
              ))}

              {/* Server loading pulse */}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-surface border border-line rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-brand animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-brand animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-brand animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                    <span className="sr-only">Companion is typing</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* (4) Quick replies + input row */}
            <div className="border-t border-line bg-raised px-3 pt-2.5 pb-3 shrink-0 select-none">
              {followUps.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {followUps.slice(0, 2).map((question, qIdx) => (
                    <button
                      key={qIdx}
                      disabled={loading}
                      onClick={() => handleSendMessage(question)}
                      title={question}
                      className="max-w-full min-h-[32px] px-3 py-1.5 rounded-full bg-surface border border-line hover:border-line-strong hover:bg-brand-tint text-body text-[11px] font-light text-left truncate transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}

              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSendMessage(inputVal);
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  placeholder="Ask anything…"
                  aria-label="Message the companion"
                  className="flex-1 min-w-0 h-11 bg-surface border border-line text-xs px-4 rounded-full text-body placeholder:text-muted"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim() || loading}
                  aria-label="Send message"
                  className="h-11 w-11 shrink-0 rounded-full bg-brand hover:bg-brand-hover text-on-brand flex items-center justify-center disabled:opacity-40 disabled:hover:scale-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <PaperPlaneRight size={16} weight="light" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
