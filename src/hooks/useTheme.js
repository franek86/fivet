import { useEffect, useState } from "react";

const THEME_KEY = "app-theme";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || "system";
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (selectedTheme) => {
      const isDark = selectedTheme === "dark" || (selectedTheme === "system" && mediaQuery.matches);

      document.body.classList.toggle("dark-mode", isDark);
    };

    applyTheme(theme);

    const handleChange = (e) => {
      if (theme === "system") {
        document.body.classList.toggle("dark-mode", e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return {
    theme,
    setTheme,
    isDark: document.body.classList.contains("dark-mode"),
  };
}
