import { useCallback, useEffect, useState } from "react";
import { storage } from "../services/storage";

export type Theme = "light" | "dark";

const KEY = "theme";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() =>
    storage.get<Theme>(KEY, "light")
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    storage.set(KEY, theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setThemeState((t) => (t === "light" ? "dark" : "light"));
  }, []);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);

  return { theme, toggle, setTheme };
}