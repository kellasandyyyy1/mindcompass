import React, { useState, useEffect } from "react";
import { Sliders } from "@phosphor-icons/react";

interface BehaviorVisualizerProps {
  behaviorId: string;
  clinicalConcept: string;
}

// Zone boundaries are shared by the badge, the track widths and the axis, so a
// value can never be described as "moderate" while sitting over a green zone.
const ZONE_LOW_MAX = 33;
const ZONE_MID_MAX = 66;

type Zone = "low" | "mid" | "high";

const ZONES: Record<Zone, { badge: string; accent: string; label: string; description: string }> = {
  low: {
    label: "Mild / Low Intensity",
    badge: "bg-ok-tint text-ok-ink",
    accent: "border-l-ok",
    description:
      "At low intensity, the individual experiences manageable background apprehension or mild habit urges that do not disrupt essential occupational or social routines."
  },
  mid: {
    label: "Moderate Expression",
    badge: "bg-warn-tint text-warn-ink",
    accent: "border-l-overlap-mid",
    description:
      "At moderate intensity, cognitive bandwidth is increasingly consumed by coping strategies, creating noticeable fatigue and occasional avoidance behaviors."
  },
  high: {
    label: "Acute / High Clinical Manifestation",
    badge: "bg-overlap-high/10 text-overlap-ink",
    accent: "border-l-overlap-high",
    description:
      "At acute intensity, the behavioral loop severely restricts daily autonomy, requiring substantial psychological energy to manage distress and maintain safety."
  }
};

function zoneFor(value: number): Zone {
  if (value <= ZONE_LOW_MAX) return "low";
  if (value <= ZONE_MID_MAX) return "mid";
  return "high";
}

export default function BehaviorVisualizer({ behaviorId, clinicalConcept }: BehaviorVisualizerProps) {
  const [intensity, setIntensity] = useState<number>(50);

  useEffect(() => {
    setIntensity(50);
  }, [behaviorId]);

  const zone = zoneFor(intensity);
  const level = ZONES[zone];

  return (
    <div className="p-5 bg-surface border border-line rounded-xl shadow-xs flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <Sliders size={16} weight="light" className="text-link" aria-hidden="true" />
          <h4 className="text-[14px] font-semibold text-body font-serif">
            Behavioral Intensity Continuum
          </h4>
        </div>
        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded ${level.badge}`}>
          {level.label}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {/* Zoned track. The three coloured bands give the number a meaning —
            58% reads as "moderate" without having to work it out. The range
            input sits transparently on top so the control stays draggable and
            keyboard-operable, and reports a real slider role to assistive tech
            (better than a static image with an aria-label). */}
        <div className="relative h-2 mt-7 rounded-full has-[input:focus-visible]:outline has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-brand has-[input:focus-visible]:outline-offset-4">
          <div className="flex h-2 rounded-full overflow-hidden" aria-hidden="true">
            <div className="bg-ok" style={{ width: `${ZONE_LOW_MAX}%` }} />
            <div className="bg-overlap-mid" style={{ width: `${ZONE_MID_MAX - ZONE_LOW_MAX}%` }} />
            <div className="bg-overlap-high" style={{ width: `${100 - ZONE_MID_MAX}%` }} />
          </div>

          {/* Thumb + floating value, pinned to the actual percentage */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
            style={{ left: `${intensity}%` }}
            aria-hidden="true"
          >
            <span className="absolute bottom-[18px] left-1/2 -translate-x-1/2 text-[12px] font-semibold text-body whitespace-nowrap">
              {intensity}%
            </span>
            <div className="w-[18px] h-[18px] rounded-full bg-surface border-2 border-brand shadow-2xs" />
          </div>

          <input
            type="range"
            min="10"
            max="95"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            aria-label={`Behavioral intensity for ${clinicalConcept}`}
            aria-valuetext={`${intensity} percent, ${level.label}`}
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-6 opacity-0 cursor-pointer"
          />
        </div>

        {/* Axis labels, aligned to the zones they name */}
        <div className="flex text-[11px] text-muted" aria-hidden="true">
          <span style={{ width: `${ZONE_LOW_MAX}%` }}>Subclinical</span>
          <span className="text-center" style={{ width: `${ZONE_MID_MAX - ZONE_LOW_MAX}%` }}>Moderate</span>
          <span className="text-right" style={{ width: `${100 - ZONE_MID_MAX}%` }}>Severe / Acute</span>
        </div>

        <p className={`text-[13px] text-muted leading-relaxed p-4 bg-raised rounded-lg border-l-[3px] ${level.accent}`}>
          {level.description}
        </p>
      </div>
    </div>
  );
}
