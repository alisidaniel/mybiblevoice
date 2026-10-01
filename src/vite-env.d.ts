/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_AI_PROVIDER?: "openai" | "claude";
    readonly VITE_OPENAI_KEY?: string;
    readonly VITE_CLAUDE_KEY?: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }