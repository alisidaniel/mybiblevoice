import { Icon } from "../ui/Icon";
import type { StudyFocus, TopicStudyResult } from "../../types/bible";

interface Props {
  subjectType: "topic" | "story";
  subjectTitle: string;
  study: TopicStudyResult | null;
  loading: boolean;
  onGenerate: (focus: StudyFocus) => void;
  creditCost?: number;
}

const FOCUS_OPTIONS: { id: StudyFocus; label: string }[] = [
  { id: "all", label: "Balanced study" },
  { id: "context", label: "Historical context" },
  { id: "connections", label: "Cross-references" },
  { id: "application", label: "Modern application" },
];

export function DeepStudyPanel({
  subjectType,
  subjectTitle,
  study,
  loading,
  onGenerate,
  creditCost = 5,
}: Props) {
  if (!study && !loading) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-2 text-[28px]">✨</div>
        <h3 className="mb-1 text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
          Unlock a deep study of {subjectType === "story" ? "this story" : "this topic"}
        </h3>
        <p className="mx-auto mb-4 max-w-sm text-[12.5px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          The AI will trace <strong className="text-zinc-900 dark:text-zinc-100">{subjectTitle}</strong>{" "}
          through Scripture — context, cross-references, themes, and application. Uses{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">{creditCost} credits</strong>.
        </p>
        <div className="flex flex-wrap justify-center gap-1.5">
          {FOCUS_OPTIONS.map((f) => (
            <button
              key={f.id}
              onClick={() => onGenerate(f.id)}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[12px] font-medium text-zinc-700 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-zinc-900 dark:bg-zinc-100" />
          Generating study…
        </div>
        <div className="space-y-3">
          {[3, 4, 3, 2].map((w, i) => (
            <div
              key={i}
              className={`h-3 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800 ${
                w === 3 ? "w-3/4" : w === 4 ? "w-full" : w === 2 ? "w-2/3" : "w-5/6"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!study) return null;

  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
        <Icon name="star" size={12} />
        AI deep study · {study.focus === "all" ? "Balanced" : study.focus}
      </div>

      <div className="space-y-6">
        {study.sections.map((s) => (
          <div key={s.heading}>
            <h3 className="mb-2 font-serif text-[16px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {s.heading}
            </h3>
            <p className="text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-300">
              {s.body}
            </p>
          </div>
        ))}
      </div>

      {study.crossReferences.length > 0 && (
        <div className="mt-6 border-t border-zinc-100 pt-5 dark:border-zinc-800">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Cross-references
          </div>
          <ul className="space-y-2">
            {study.crossReferences.map((r) => (
              <li key={r.reference} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                <div>
                  <span className="text-[12.5px] font-medium text-zinc-900 dark:text-zinc-100">
                    {r.reference}
                  </span>
                  <span className="ml-2 text-[12.5px] italic text-zinc-500 dark:text-zinc-400">
                    {r.text}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 text-[11px] text-zinc-400 dark:border-zinc-800">
        <span>Generated {new Date(study.generatedAt).toLocaleString()}</span>
        <span className="inline-flex items-center gap-1">
          <Icon name="check" size={11} /> {creditCost} credits used
        </span>
      </div>
    </article>
  );
}