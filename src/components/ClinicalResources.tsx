import React, { useState, useEffect } from "react";
import { BookOpen } from "@phosphor-icons/react";
import { TONE_CHIP, CategoryTone } from "../data/categoryTones";

interface ResourceLink {
  title: string;
  uri: string;
  description: string;
  citation?: string;
}

/**
 * Tags each source with what it is *for*, so a student can tell at a glance
 * where to go for diagnostic criteria vs. a crisis line.
 *
 * Derived rather than stored: /api/resources returns arbitrary links, so the
 * type has to be inferred from the title and domain. Anything unrecognised
 * falls back to a neutral "Reference" rather than guessing wrong.
 */
function classifyResource(title: string, uri: string): { label: string; tone: CategoryTone } {
  const text = `${title} ${uri}`.toLowerCase();

  if (/samhsa|crisis|helpline|hotline|find-help|988|suicide/.test(text)) {
    return { label: "Crisis Support", tone: "red" };
  }
  if (/nimh|nih\.gov|research|pubmed|journal|clinical-trials|epidemiolog/.test(text)) {
    return { label: "Research", tone: "green" };
  }
  if (/beck|cbt|therapy|therapist|treatment|intervention|counsel/.test(text)) {
    return { label: "Therapy", tone: "purple" };
  }
  if (/apa\.org|psychiatry|guideline|criteria|dsm|practice/.test(text)) {
    return { label: "Guidelines", tone: "blue" };
  }
  return { label: "Reference", tone: "neutral" };
}

interface ClinicalResourcesProps {
  clinicalConcept: string;
}

export default function ClinicalResources({ clinicalConcept }: ClinicalResourcesProps) {
  const [links, setLinks] = useState<ResourceLink[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchResources() {
      if (!clinicalConcept) return;
      setLoading(true);

      try {
        const response = await fetch("/api/resources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ concept: clinicalConcept }),
        });

        if (response.ok) {
          const data = await response.json();
          if (active && data.links && Array.isArray(data.links) && data.links.length > 0) {
            const formatted = data.links.slice(0, 4).map((l: any) => ({
              title: l.title,
              uri: l.uri,
              description: l.description,
              citation: l.citation || `${l.title.split("-")[0].trim()} • Diagnostic & Clinical Practice Guidelines`
            }));
            setLinks(formatted);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn("Falling back to standard clinical citations:", e);
      }

      if (active) {
        setLinks([
          {
            title: "American Psychological Association (APA)",
            uri: "https://www.apa.org/topics",
            description: "Official clinical overview of diagnostic criteria, evidence-based psychotherapeutic protocols, and clinical practice guidelines.",
            citation: "American Psychological Association (APA) • Clinical Practice & Science Directives"
          },
          {
            title: "National Institute of Mental Health (NIMH)",
            uri: "https://www.nimh.nih.gov/health/topics",
            description: "Research-backed summaries, epidemiological data, brain chemistry analysis, and clinical trials database.",
            citation: "National Institute of Mental Health (NIH/NIMH) • Behavioral Research Index"
          },
          {
            title: "Beck Institute for Cognitive Behavior Therapy",
            uri: "https://beckinstitute.org/cbt-resources",
            description: "Cognitive conceptualization frameworks, automatic thought identification, and CBT intervention worksheets.",
            citation: "Beck Institute for CBT • Cognitive Conceptualization & Intervention Protocols"
          },
          {
            title: "Substance Abuse and Mental Health Services Administration (SAMHSA)",
            uri: "https://www.samhsa.gov/find-help",
            description: "National evidence-based practice guidelines, crisis support infrastructure, and verified treatment locator tools.",
            citation: "U.S. Department of Health and Human Services (SAMHSA) • Clinical Guidelines"
          }
        ]);
        setLoading(false);
      }
    }

    fetchResources();

    return () => {
      active = false;
    };
  }, [clinicalConcept]);

  return (
    <div id="clinical-resources-container" className="w-full py-6">
      <div className="max-w-3xl">
        
        {/* Title Block */}
        <div className="border-b border-line pb-4 mb-6">
          <span className="text-[12px] font-medium text-muted flex items-center gap-1.5">
            <BookOpen size={14} weight="light" aria-hidden="true" /> Recommended academic and clinical literature
          </span>
          <h3 className="text-[22px] md:text-[25px] font-serif font-medium text-body tracking-tight mt-1">
            Verifiable Primary Resources & Citations
          </h3>
          <p className="text-muted text-[14px] mt-1.5 leading-relaxed">
            Standard educational links and clinical guidelines for psychology students reviewing <span className="text-body font-semibold">{clinicalConcept}</span>.
          </p>
        </div>

        {/* Loading Spinner Skeleton */}
        {loading && (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((val) => (
              <div key={val} className="py-3 border-b border-line space-y-2">
                <div className="w-1/3 h-4 bg-line-strong rounded" />
                <div className="w-full h-3 bg-line rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Links as Flowing Editorial Citations (Not identical bordered cards) */}
        {!loading && links.length > 0 && (
          <div className="flex flex-col">
            {links.map((resource, i) => {
              const type = classifyResource(resource.title, resource.uri);
              const domain = resource.uri.replace("https://", "").replace("www.", "").split("/")[0];

              return (
                <a
                  key={`${resource.uri}-${i}`}
                  href={resource.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-4 border-b border-line last:border-b-0 group"
                >
                  <div className="flex items-center flex-wrap gap-2 mb-1.5">
                    <strong className="text-[14px] font-semibold text-body group-hover:text-link transition-colors">
                      {resource.title}
                    </strong>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-[0.05em] px-2 py-0.5 rounded ${TONE_CHIP[type.tone]}`}
                    >
                      {type.label}
                    </span>
                    <span className="text-[11px] text-muted ml-auto shrink-0" aria-hidden="true">
                      {domain} ↗
                    </span>
                  </div>

                  <p className="text-[13px] text-muted leading-relaxed font-sans mb-1">
                    {resource.description}
                  </p>

                  <p className="text-[11px] font-mono text-muted">
                    {resource.citation || resource.title}
                  </p>
                </a>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
