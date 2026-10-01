import { useEffect, useState } from "react";
import { speech } from "../../services/speech";
import { Icon } from "../ui/Icon";

export function VoicePicker() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selected, setSelected] = useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate] = useState(0.92);
  const [previewing, setPreviewing] = useState(false);

  useEffect(() => {
    if (!speech.supported) return;

    const load = () => {
      const list = speech.voices();
      if (list.length) {
        setVoices(list);
        setSelected(speech.preferredVoice());
      }
    };

    load();
    // voices can load asynchronously in Chrome
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = load;
    }
    setRate(speech.savedRate());

    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const handleSelect = (voice: SpeechSynthesisVoice) => {
    setSelected(voice);
    speech.saveVoice(voice);
  };

  const handleRate = (r: number) => {
    setRate(r);
    speech.setSavedRate(r);
  };

  const preview = () => {
    if (!selected || previewing) return;
    setPreviewing(true);
    speech.speak("Be still, and know that I am God. Psalm 46:10.", {
      voice: selected,
      rate,
      onEnd: () => setPreviewing(false),
    });
  };

  if (!speech.supported) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-200 p-4 text-[13px] text-zinc-400 dark:border-zinc-800">
        Speech synthesis is not supported in this browser.
      </div>
    );
  }

  const englishVoices = voices.filter((v) => v.lang.startsWith("en"));
  const otherVoices = voices.filter((v) => !v.lang.startsWith("en"));

  return (
    <div className="flex flex-col gap-5">
      {/* Voice select */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Voice
          </span>
          <button
            onClick={preview}
            disabled={previewing || !selected}
            className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-zinc-500 transition-colors hover:text-zinc-900 disabled:opacity-50 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <Icon name="play" size={11} />
            {previewing ? "Playing…" : "Preview"}
          </button>
        </div>

        <select
          value={selected?.name ?? ""}
          onChange={(e) => {
            const v = voices.find((x) => x.name === e.target.value);
            if (v) handleSelect(v);
          }}
          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-[13px] text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
        >
          {voices.length === 0 && <option>Loading voices…</option>}
          {englishVoices.length > 0 && (
            <optgroup label="English">
              {englishVoices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name} — {v.lang}
                </option>
              ))}
            </optgroup>
          )}
          {otherVoices.length > 0 && (
            <optgroup label="Other">
              {otherVoices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name} — {v.lang}
                </option>
              ))}
            </optgroup>
          )}
        </select>

        <p className="mt-2 text-[11.5px] text-zinc-500 dark:text-zinc-400">
          Voices come from your operating system. Availability varies by
          browser and device.
        </p>
      </div>

      {/* Rate */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Reading speed
          </span>
          <span className="text-[11.5px] tabular-nums text-zinc-500 dark:text-zinc-400">
            {rate.toFixed(2)}×
          </span>
        </div>
        <input
          type="range"
          min={0.5}
          max={1.5}
          step={0.01}
          value={rate}
          onChange={(e) => handleRate(Number(e.target.value))}
          className="w-full accent-zinc-900 dark:accent-zinc-100"
        />
        <div className="mt-1 flex justify-between text-[10.5px] text-zinc-400">
          <span>Slower</span>
          <span>Normal</span>
          <span>Faster</span>
        </div>
      </div>
    </div>
  );
}