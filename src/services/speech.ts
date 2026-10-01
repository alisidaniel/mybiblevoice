export interface SpeakOptions {
    rate?: number;
    pitch?: number;
    volume?: number;
    voice?: SpeechSynthesisVoice | null;
    onEnd?: () => void;
    onStart?: () => void;
  }
  
  const STORAGE_KEY = "speech:voice";
  const STORAGE_RATE = "speech:rate";
  
  const isSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;
  
  export const speech = {
    supported: isSupported,
  
    voices(): SpeechSynthesisVoice[] {
      if (!isSupported) return [];
      return window.speechSynthesis.getVoices();
    },
  
    /** Best-fit English voice for Bible reading. */
    preferredVoice(): SpeechSynthesisVoice | null {
      if (!isSupported) return null;
      const all = this.voices();
      if (!all.length) return null;
  
      const savedName = localStorage.getItem(STORAGE_KEY);
      if (savedName) {
        const match = all.find((v) => v.name === savedName);
        if (match) return match;
      }
  
      // Prefer natural-sounding English voices
      const preferred = [
        "Samantha",
        "Alex",
        "Karen",
        "Daniel",
        "Google UK English Female",
        "Google US English",
        "Microsoft Aria",
        "Microsoft Jenny",
      ];
      for (const name of preferred) {
        const v = all.find((voice) => voice.name.includes(name));
        if (v) return v;
      }
      return all.find((v) => v.lang.startsWith("en")) ?? all[0];
    },
  
    savedRate(): number {
      const r = Number(localStorage.getItem(STORAGE_RATE));
      return Number.isFinite(r) && r > 0 ? r : 0.92;
    },
  
    setSavedRate(rate: number) {
      localStorage.setItem(STORAGE_RATE, String(rate));
    },
  
    saveVoice(voice: SpeechSynthesisVoice) {
      localStorage.setItem(STORAGE_KEY, voice.name);
    },
  
    speak(text: string, opts: SpeakOptions = {}) {
      if (!isSupported) {
        opts.onEnd?.();
        return;
      }
      this.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = opts.rate ?? this.savedRate();
      utter.pitch = opts.pitch ?? 1;
      utter.volume = opts.volume ?? 1;
      const voice = opts.voice ?? this.preferredVoice();
      if (voice) utter.voice = voice;
      if (opts.onStart) utter.onstart = opts.onStart;
      if (opts.onEnd) utter.onend = opts.onEnd;
      utter.onerror = () => opts.onEnd?.();
      window.speechSynthesis.speak(utter);
    },
  
    pause() {
      if (!isSupported) return;
      window.speechSynthesis.pause();
    },
  
    resume() {
      if (!isSupported) return;
      window.speechSynthesis.resume();
    },
  
    cancel() {
      if (!isSupported) return;
      window.speechSynthesis.cancel();
    },
  
    speaking(): boolean {
      if (!isSupported) return false;
      return window.speechSynthesis.speaking;
    },
  };