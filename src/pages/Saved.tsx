import { useApp } from "../context/AppContext";
import { Icon } from "../components/ui/Icon";

export default function Saved() {
  const { savedVerses, unsaveVerse } = useApp();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-[30px] leading-none tracking-tight text-zinc-900">
          Saved verses
        </h1>
        <p className="mt-1.5 text-[13px] text-zinc-400">
          {savedVerses.length} verses you've kept
        </p>
      </div>

      {savedVerses.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 p-12 text-center text-[13.5px] text-zinc-400">
          Verses you save will appear here.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {savedVerses.map((v) => (
            <article
              key={v.id}
              className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <p className="mb-3 font-serif text-[18px] leading-snug tracking-tight text-zinc-900">
                "{v.text}"
              </p>
              <div className="flex items-center justify-between">
                <div className="text-[12.5px] text-zinc-500">
                  <span className="font-medium text-zinc-900">
                    {v.reference}
                  </span>
                  <span className="mx-2">·</span>
                  <span>{v.translation}</span>
                </div>
                <button
                  onClick={() => unsaveVerse(v.id)}
                  className="inline-flex items-center gap-1 text-[12px] font-medium text-zinc-400 transition-colors hover:text-zinc-900"
                >
                  <Icon name="x" size={12} />
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}