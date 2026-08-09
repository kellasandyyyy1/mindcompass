import React from "react";
import { RelatedDisorder } from "../types";
import { CaretRight } from "@phosphor-icons/react";

interface MatchMeterProps {
  disorders: RelatedDisorder[];
  onSelectDisorder?: (disorder: string) => void;
}

type Level = "high" | "mid" | "low";

// Thresholds are shared by the bars and the legend, so the key always describes
// what is actually on screen.
const LEVELS: Record<Level, { label: string; range: string; fill: string; ink: string; striped: boolean }> = {
  high: { label: "High", range: "75–100%", fill: "bg-overlap-high", ink: "text-overlap-ink", striped: true },
  mid: { label: "Moderate", range: "40–74%", fill: "bg-overlap-mid", ink: "text-warn-ink", striped: false },
  low: { label: "Lower", range: "0–39%", fill: "bg-overlap-low", ink: "text-ok-ink", striped: false }
};

const LEVEL_ORDER: Level[] = ["high", "mid", "low"];

function levelFor(percentage: number): Level {
  if (percentage >= 75) return "high";
  if (percentage >= 40) return "mid";
  return "low";
}

export default function MatchMeter({ disorders, onSelectDisorder }: MatchMeterProps) {
  return (
    <section
      aria-label="Diagnostic symptom overlap scores"
      className="flex flex-col gap-5 p-5 bg-surface border border-line rounded-xl shadow-xs"
    >
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div>
          <h3 className="text-[15px] font-semibold text-body tracking-tight font-serif">
            Diagnostic Symptom Overlap
          </h3>
          <p className="text-[11px] text-muted mt-0.5">
            Statistical match meter across DSM-5 criteria
          </p>
        </div>
        <span className="text-[10px] font-semibold text-overlap-ink bg-overlap-high/10 px-2.5 py-1 rounded-md font-mono shrink-0">
          DSM-5 OVERLAP
        </span>
      </div>

      <div className="flex flex-col gap-1">
        {disorders.map((item, idx) => {
          const isClickable = !!onSelectDisorder;
          const level = levelFor(item.percentage);
          const style = LEVELS[level];

          // A real <button> when actionable, so it lands in the tab order and
          // picks up the global focus ring. A div with onClick would not.
          const Row = isClickable ? "button" : "div";

          return (
            <Row
              key={item.disorder}
              id={`match-meter-item-${idx}`}
              {...(isClickable
                ? {
                    type: "button" as const,
                    onClick: () => onSelectDisorder(item.disorder),
                    title: `Click to explore ${item.disorder}'s full clinical profile`,
                    "aria-label": `${item.disorder} — ${item.percentage}% symptom overlap, ${style.label.toLowerCase()} match. Click to explore.`
                  }
                : {})}
              className={`w-full text-left flex flex-col gap-1.5 p-3 rounded-lg transition-colors ${
                isClickable ? "cursor-pointer hover:bg-raised group" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[14px] text-body truncate">{item.disorder}</span>
                <span className="flex items-center gap-1 shrink-0">
                  <span className={`text-[14px] font-semibold ${style.ink}`}>
                    {item.percentage}%
                  </span>
                  {isClickable && (
                    <CaretRight
                      size={14}
                      weight="light"
                      aria-hidden="true"
                      className="text-muted transition-all group-hover:translate-x-0.5 group-hover:text-link"
                    />
                  )}
                </span>
              </div>

              <div className="h-2 w-full rounded-full bg-line overflow-hidden" aria-hidden="true">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${style.fill} ${
                    style.striped ? "match-fill--striped" : ""
                  }`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </Row>
          );
        })}
      </div>

      <div className="border-t border-line pt-3 flex flex-col gap-3">
        <p className="text-[12px] text-muted leading-relaxed">
          <strong className="font-semibold">Sourcing note:</strong> based on symptom overlap with
          DSM-5 criteria for each condition.
          {onSelectDisorder && " Click any condition to explore its full clinical profile."}
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Match level key">
          {LEVEL_ORDER.map((key) => (
            <span key={key} className="flex items-center gap-1.5 text-[12px] text-muted">
              <span
                className={`w-3 h-3 rounded-sm shrink-0 ${LEVELS[key].fill} ${
                  LEVELS[key].striped ? "match-fill--striped" : ""
                }`}
                aria-hidden="true"
              />
              {LEVELS[key].label} ({LEVELS[key].range})
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
