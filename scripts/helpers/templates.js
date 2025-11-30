export function createSVGTemplate(width, height, content, theme) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    @media (prefers-color-scheme: light) {
      :root {
        --bg: ${theme.light.background};
        --fg: ${theme.light.foreground};
        --card: ${theme.light.card};
        --border: ${theme.light.cardBorder};
        --text: ${theme.light.text};
        --text-secondary: ${theme.light.textSecondary};
        --primary: ${theme.light.primary};
        --accent: ${theme.light.accent};
        --shadow: ${theme.light.shadowColor};
      }
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: ${theme.dark.background};
        --fg: ${theme.dark.foreground};
        --card: ${theme.dark.card};
        --border: ${theme.dark.cardBorder};
        --text: ${theme.dark.text};
        --text-secondary: ${theme.dark.textSecondary};
        --primary: ${theme.dark.primary};
        --accent: ${theme.dark.accent};
        --shadow: ${theme.dark.shadowColor};
      }
    }
    * {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    }
    .card {
      fill: var(--card);
      stroke: var(--border);
      stroke-width: 1;
      filter: drop-shadow(0 4px 6px var(--shadow));
    }
    .title {
      fill: var(--text);
      font-size: 18px;
      font-weight: 600;
    }
    .stat-label {
      fill: var(--text-secondary);
      font-size: 12px;
    }
    .stat-value {
      fill: var(--text);
      font-size: 20px;
      font-weight: 700;
    }
    .badge-text {
      fill: var(--text);
      font-size: 14px;
      font-weight: 500;
    }
    .badge-icon {
      fill: var(--primary);
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animated {
      animation: fadeIn 0.8s ease-in;
    }
  </style>
  <rect width="${width}" height="${height}" fill="var(--bg)" rx="10"/>
  ${content}
</svg>`;
}

export function createBadge(x, y, icon, label, value) {
  return `
  <g transform="translate(${x}, ${y})" class="animated">
    <rect class="card" width="140" height="60" rx="8"/>
    <text class="badge-icon" x="20" y="28">${icon}</text>
    <text class="stat-label" x="20" y="48">${label}</text>
    <text class="stat-value" x="115" y="33" text-anchor="end">${value}</text>
  </g>`;
}

export function createStatCard(x, y, width, height, title, stats) {
  const statItems = stats
    .map(
      (stat, i) => `
    <text class="stat-label" x="20" y="${60 + i * 35}">${stat.label}</text>
    <text class="stat-value" x="${width - 20}" y="${
        60 + i * 35
      }" text-anchor="end">${stat.value}</text>
  `
    )
    .join("");

  return `
  <g transform="translate(${x}, ${y})" class="animated">
    <rect class="card" width="${width}" height="${height}" rx="10"/>
    <text class="title" x="20" y="35">${title}</text>
    ${statItems}
  </g>`;
}
