import { useCallback, useEffect, useState } from "react";
import { storage } from "../services/storage";
import { tourSteps, type TourStep } from "../data/tour";

const KEY = "tour:seen";

export function useTour() {
  const [active, setActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const seen = storage.get<boolean>(KEY, false);
    if (!seen) {
      const t = setTimeout(() => setActive(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const currentStep: TourStep | null = active ? tourSteps[stepIndex] ?? null : null;

  const next = useCallback(() => {
    setStepIndex((i) => {
      const next = i + 1;
      if (next >= tourSteps.length) {
        setActive(false);
        storage.set(KEY, true);
        return 0;
      }
      return next;
    });
  }, []);

  const prev = useCallback(() => {
    setStepIndex((i) => Math.max(0, i - 1));
  }, []);

  const skip = useCallback(() => {
    setActive(false);
    storage.set(KEY, true);
  }, []);

  const restart = useCallback(() => {
    storage.remove(KEY);
    setStepIndex(0);
    setActive(true);
  }, []);

  return {
    active,
    currentStep,
    stepIndex,
    totalSteps: tourSteps.length,
    next,
    prev,
    skip,
    restart,
  };
}