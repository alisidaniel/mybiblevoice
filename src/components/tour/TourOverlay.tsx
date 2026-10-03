import { useEffect, useLayoutEffect, useState } from "react";
import { Icon } from "../ui/Icon";
import type { TourStep } from "../../data/tour";

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface Props {
  step: TourStep;
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
}

export function TourOverlay({
  step,
  stepIndex,
  totalSteps,
  onNext,
  onPrev,
  onSkip,
}: Props) {
  const [rect, setRect] = useState<Rect | null>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const el = document.querySelector<HTMLElement>(
      `[data-tour="${step.target}"]`
    );
    if (!el) {
      setRect(null);
      setReady(true);
      return;
    }
    const update = () => {
      const r = el.getBoundingClientRect();
      setRect({
        top: r.top,
        left: r.left,
        width: r.width,
        height: r.height,
      });
    };
    update();
    setReady(true);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [step.target]);

  useEffect(() => {
    if (!rect) return;
    const el = document.querySelector<HTMLElement>(
      `[data-tour="${step.target}"]`
    );
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [rect, step.target]);

  if (!ready) return null;

  // If target missing (e.g. hidden on mobile), auto-advance.
  if (!rect) {
    return (
      <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 p-6">
        <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl dark:bg-zinc-900">
          <p className="mb-4 text-[13.5px] text-zinc-600 dark:text-zinc-300">
            Step hidden on this screen size.
          </p>
          <div className="flex justify-between">
            <button
              onClick={onSkip}
              className="text-[12.5px] font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Skip tour
            </button>
            <button
              onClick={onNext}
              className="rounded-lg bg-zinc-900 px-3.5 py-1.5 text-[12.5px] font-medium text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }

  const pad = 8;
  const cutout = {
    top: rect.top - pad,
    left: rect.left - pad,
    width: rect.width + pad * 2,
    height: rect.height + pad * 2,
  };

  // tooltip placement
  const tooltipW = 320;
  const gap = 14;
  const placement = step.placement ?? "bottom";
  let tooltipTop = cutout.top + cutout.height + gap;
  let tooltipLeft = cutout.left + cutout.width / 2 - tooltipW / 2;

  if (placement === "top") {
    tooltipTop = cutout.top - gap - 180; // assume max height ~180
  } else if (placement === "left") {
    tooltipTop = cutout.top;
    tooltipLeft = cutout.left - gap - tooltipW;
  } else if (placement === "right") {
    tooltipTop = cutout.top;
    tooltipLeft = cutout.left + cutout.width + gap;
  }

  // clamp to viewport
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  tooltipLeft = Math.max(12, Math.min(vw - tooltipW - 12, tooltipLeft));
  tooltipTop = Math.max(12, Math.min(vh - 200, tooltipTop));

  return (
    <div className="pointer-events-none fixed inset-0 z-[150]">
      {/* cutout */}
      <div
        className="pointer-events-auto absolute rounded-xl ring-2 ring-white/60 transition-all duration-300"
        style={{
          top: cutout.top,
          left: cutout.left,
          width: cutout.width,
          height: cutout.height,
          boxShadow: "0 0 0 9999px rgba(0,0,0,0.65)",
        }}
      />

      {/* tooltip */}
      <div
        className="pointer-events-auto absolute rounded-2xl bg-white p-4 shadow-2xl dark:bg-zinc-900"
        style={{ top: tooltipTop, left: tooltipLeft, width: tooltipW }}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400">
            Step {stepIndex + 1} of {totalSteps}
          </span>
          <button
            onClick={onSkip}
            className="grid h-6 w-6 place-items-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800"
            aria-label="Skip tour"
          >
            <Icon name="x" size={11} />
          </button>
        </div>

        <div className="mb-1 text-[14.5px] font-semibold text-zinc-900 dark:text-zinc-100">
          {step.title}
        </div>
        <p className="mb-4 text-[12.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          {step.body}
        </p>

        <div className="flex items-center justify-between">
          <button
            onClick={onPrev}
            disabled={stepIndex === 0}
            className="text-[12.5px] font-medium text-zinc-500 transition-colors hover:text-zinc-900 disabled:opacity-30 dark:hover:text-zinc-100"
          >
            Back
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === stepIndex
                    ? "w-4 bg-zinc-900 dark:bg-zinc-100"
                    : "w-1.5 bg-zinc-200 dark:bg-zinc-700"
                }`}
              />
            ))}
          </div>

          <button
            onClick={onNext}
            className="rounded-lg bg-zinc-900 px-3.5 py-1.5 text-[12.5px] font-medium text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
          >
            {stepIndex === totalSteps - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}