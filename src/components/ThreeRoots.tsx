import React from "react";
import { TriOrigin } from "../types";
import { TONE_CHIP, CategoryTone } from "../data/categoryTones";

interface ThreeRootsProps {
  data: TriOrigin;
  childhoodEnvironment?: string;
  childhoodCauses?: string;
}

// A person, a brain and a globe read as body / mind / world instantly. The
// coloured dots they replace carried no meaning on their own.
const BodyIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
    <circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M8 10h8M12 10v8M9 18l3 3 3-3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MindIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
    <path
      d="M9.5 2C7 2 5 4 5 6.5c0 1.2.5 2.3 1.2 3.1C5.5 10.4 5 11.4 5 12.5 5 15 7 17 9.5 17h5c2.5 0 4.5-2 4.5-4.5 0-1.1-.5-2.1-1.2-2.9.7-.8 1.2-1.9 1.2-3.1C19 4 17 2 14.5 2h-5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const WorldIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export default function ThreeRoots({ data, childhoodEnvironment, childhoodCauses }: ThreeRootsProps) {
  const roots: {
    category: string;
    tone: CategoryTone;
    icon: React.ReactNode;
    title: string;
    description: string;
  }[] = [
    {
      category: "Body",
      tone: "blue",
      icon: <BodyIcon />,
      title: "1. Physiological & Neurobiological Factors",
      description: data.body
    },
    {
      category: "Mind",
      tone: "purple",
      icon: <MindIcon />,
      title: "2. Cognitive Schemas & Defense Mechanisms",
      description: data.mind
    },
    {
      category: "World",
      tone: "green",
      icon: <WorldIcon />,
      title: "3. Environmental Triggers & Developmental Factors",
      description: data.world
    }
  ];

  return (
    <div id="three-roots-section" className="w-full py-6">
      <div className="max-w-3xl">

        {/* Article Header */}
        <div className="mb-8 border-b border-line pb-4">
          <span className="text-[12px] font-medium text-muted">
            Etiology and multi-factor origin analysis
          </span>
          <h3 className="text-[22px] md:text-[25px] font-serif font-medium text-body tracking-tight mt-1">
            The Three Roots of Behavioral Origin
          </h3>
          <p className="text-muted text-[14px] mt-2 leading-relaxed">
            Clinical psychology conceptualizes complex behavioral patterns through three
            interconnected dimensions: biological vulnerabilities, cognitive processing, and
            environmental dynamics.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {roots.map((root) => (
            <article key={root.category} className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${TONE_CHIP[root.tone]}`}
                aria-hidden="true"
              >
                {root.icon}
              </div>

              <div className="min-w-0">
                <p className="text-[12px] font-medium text-muted mb-1">
                  {root.category}
                </p>
                <h4 className="text-[15px] font-semibold text-body mb-2">{root.title}</h4>
                <p className="text-[14px] text-muted leading-relaxed font-sans">{root.description}</p>

                {/* Developmental context belongs with the World root */}
                {root.category === "World" && (childhoodEnvironment || childhoodCauses) && (
                  <div className="mt-3 pt-3 border-t border-line text-[14px] text-muted space-y-2">
                    <span className="text-[12px] font-medium text-muted block">
                      Developmental antecedents and youth adaptation
                    </span>
                    {childhoodEnvironment && (
                      <p>
                        <strong className="text-body font-semibold">Family & Atmosphere:</strong>{" "}
                        {childhoodEnvironment}
                      </p>
                    )}
                    {childhoodCauses && (
                      <p>
                        <strong className="text-body font-semibold">Adaptive Origins:</strong>{" "}
                        {childhoodCauses}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
