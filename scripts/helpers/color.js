export const themes = {
  light: {
    background: "#ffffff",
    foreground: "#1f2937",
    card: "#f9fafb",
    cardBorder: "#e5e7eb",
    primary: "#3b82f6",
    secondary: "#8b5cf6",
    accent: "#10b981",
    text: "#374151",
    textSecondary: "#6b7280",
    chartColors: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"],
    shadowColor: "rgba(0, 0, 0, 0.1)",
  },
  dark: {
    background: "#0d1117",
    foreground: "#e6edf3",
    card: "#161b22",
    cardBorder: "#30363d",
    primary: "#58a6ff",
    secondary: "#a371f7",
    accent: "#3fb950",
    text: "#c9d1d9",
    textSecondary: "#8b949e",
    chartColors: ["#58a6ff", "#a371f7", "#3fb950", "#f0883e", "#f85149"],
    shadowColor: "rgba(0, 0, 0, 0.4)",
  },
};

export function getTheme(themeType = "dark") {
  return themes[themeType] || themes.dark;
}

export function getLanguageColor(language) {
  const colors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    "C#": "#178600",
    PHP: "#4F5D95",
    Ruby: "#701516",
    Go: "#00ADD8",
    Rust: "#dea584",
    Swift: "#ffac45",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Vue: "#41b883",
    React: "#61dafb",
  };
  return colors[language] || "#8b949e";
}
