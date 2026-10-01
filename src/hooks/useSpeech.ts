import { useCallback, useEffect, useRef, useState } from "react";
import { speech } from "../services/speech";

interface Options {
  rate?: number;
}

export function useSpeech({ rate }: Options = {}) {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      speech.cancel();
    };
  }, []);

  const speak = useCallback(
    (text: string) => {
      speech.speak(text, {
        rate: rate ?? speech.savedRate(),
        onStart: () => {
          if (!mounted.current) return;
          setSpeaking(true);
          setPaused(false);
        },
        onEnd: () => {
          if (!mounted.current) return;
          setSpeaking(false);
          setPaused(false);
        },
      });
    },
    [rate]
  );

  const pause = useCallback(() => {
    speech.pause();
    setPaused(true);
  }, []);

  const resume = useCallback(() => {
    speech.resume();
    setPaused(false);
  }, []);

  const stop = useCallback(() => {
    speech.cancel();
    setSpeaking(false);
    setPaused(false);
  }, []);

  return { supported: speech.supported, speaking, paused, speak, pause, resume, stop };
}