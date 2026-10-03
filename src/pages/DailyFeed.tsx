import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Greeting } from "../components/feed/Greeting";
import { VerseCard } from "../components/feed/VerseCard";
import { WhyCard } from "../components/feed/WhyCard";
import { StoryGrid } from "../components/feed/StoryGrid";
import { AIChatPanel } from "../components/ai/AIChatPanel";
import { useVerse } from "../hooks/useVerse";
import { relatedStories } from "../data/stories";
import { formatLongDate } from "../lib/date";
import { Icon } from "../components/ui/Icon";
import { Toast, type ToastData } from "../components/ui/Toast";
import { useTour } from "../hooks/useTour";
import { TourOverlay } from "../components/tour/TourOverlay";

function VerseSkeleton() {
  return (
    <div className="animate-pulse rounded-[20px] bg-gradient-to-br from-[#1A1A1D] to-[#050505] p-14 pb-8">
      <div className="mb-10 h-3 w-32 rounded bg-white/10" />
      <div className="mb-3 h-8 w-4/5 rounded bg-white/10" />
      <div className="mb-8 h-8 w-3/5 rounded bg-white/10" />
      <div className="mb-10 h-3 w-40 rounded bg-white/10" />
    </div>
  );
}

export default function DailyFeed() {
  const { user, isVerseSaved, saveVerse, unsaveVerse, recordActivity } = useApp();
  const { data, loading, error } = useVerse();
  const [amenActive, setAmenActive] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);
  const tour = useTour();

  const saved = data ? isVerseSaved(data.verse.id) : false;

  useEffect(() => {
    if (!loading && data) {
      recordActivity();
    }
  }, [loading, data, recordActivity]);

  const handleSave = () => {
    if (!data) return;
    if (saved) {
      unsaveVerse(data.verse.id);
      setToast({
        id: `t_${Date.now()}`,
        title: "Removed",
        body: "Verse removed from your saved list.",
      });
    } else {
      saveVerse(data.verse);
      setToast({
        id: `t_${Date.now()}`,
        title: "Saved",
        body: "Verse added to your collection.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Greeting
        firstName={user.firstName}
        date={formatLongDate(new Date())}
        subtitle="Your verse, reflection, and stories for today"
      />

      {loading && <VerseSkeleton />}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-[13.5px] text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
          {error} — showing cached content.
        </div>
      )}

      {!loading && data && (
        <>
          <div data-tour="verse-card">
            <VerseCard
              verse={data.verse}
              amenActive={amenActive}
              savedActive={saved}
              onAmen={() => setAmenActive((v) => !v)}
              onSave={handleSave}
              onShare={() => {
                setToast({
                  id: `t_${Date.now()}`,
                  title: "Shared",
                  body: "Link copied to clipboard.",
                });
              }}
            />
          </div>

          <button
            data-tour="ask-ai"
            onClick={() => setChatOpen(true)}
            className="group flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-5 py-4 text-left shadow-sm transition-all hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-zinc-900 text-[11px] font-bold text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
                AI
              </span>
              <div>
                <div className="text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
                  Ask about this verse
                </div>
                <div className="text-[12px] text-zinc-500 dark:text-zinc-400">
                  Context, meaning, application — on demand.
                </div>
              </div>
            </div>
            <Icon
              name="arrow-right"
              size={16}
              className="text-zinc-400 transition-transform group-hover:translate-x-0.5"
            />
          </button>

          <div data-tour="why-card">
            <WhyCard reason={data.why} />
          </div>

          <AIChatPanel
            verse={data.verse}
            open={chatOpen}
            onClose={() => setChatOpen(false)}
          />
        </>
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />

      <StoryGrid stories={relatedStories} />

      {tour.active && tour.currentStep && (
        <TourOverlay
          step={tour.currentStep}
          stepIndex={tour.stepIndex}
          totalSteps={tour.totalSteps}
          onNext={tour.next}
          onPrev={tour.prev}
          onSkip={tour.skip}
        />
      )}
    </div>
  );
}