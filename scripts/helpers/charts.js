import { getLanguageColor } from "./colors.js";

export function createDonutChart(x, y, radius, languages, theme) {
  const total = languages.reduce(
    (sum, lang) => sum + parseFloat(lang.percentage),
    0
  );
  let currentAngle = -90;

  const paths = languages
    .map((lang, i) => {
      const percentage = parseFloat(lang.percentage);
      const angle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const x1 = x + radius * Math.cos(startRad);
      const y1 = y + radius * Math.sin(startRad);
      const x2 = x + radius * Math.cos(endRad);
      const y2 = y + radius * Math.sin(endRad);

      const largeArc = angle > 180 ? 1 : 0;

      const innerRadius = radius * 0.6;
      const x3 = x + innerRadius * Math.cos(endRad);
      const y3 = y + innerRadius * Math.sin(endRad);
      const x4 = x + innerRadius * Math.cos(startRad);
      const y4 = y + innerRadius * Math.sin(startRad);

      currentAngle = endAngle;

      const color = getLanguageColor(lang.name);

      return `
      <path d="M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z"
            fill="${color}"
            opacity="0.9"
            class="animated">
        <title>${lang.name}: ${lang.percentage}%</title>
      </path>`;
    })
    .join("");

  const legend = languages
    .map(
      (lang, i) => `
    <g transform="translate(0, ${i * 25})">
      <circle cx="${x + radius + 40}" cy="${
        y - 60 + i * 25
      }" r="6" fill="${getLanguageColor(lang.name)}"/>
      <text x="${x + radius + 55}" y="${y - 55 + i * 25}" class="stat-label">${
        lang.name
      }</text>
      <text x="${x + radius + 180}" y="${
        y - 55 + i * 25
      }" class="stat-value" text-anchor="end">${lang.percentage}%</text>
    </g>
  `
    )
    .join("");

  return `
  <g class="animated">
    ${paths}
    ${legend}
  </g>`;
}

export function createStreakChart(x, y, width, height, contributionDays) {
  const last30Days = contributionDays.slice(0, 30).reverse();
  const maxContributions = Math.max(
    ...last30Days.map((d) => d.contributionCount),
    1
  );

  const barWidth = width / 30 - 2;
  const bars = last30Days
    .map((day, i) => {
      const barHeight =
        (day.contributionCount / maxContributions) * (height - 20);
      const opacity = day.contributionCount > 0 ? 0.8 : 0.2;

      return `
      <rect x="${x + i * (barWidth + 2)}" 
            y="${y + height - barHeight}" 
            width="${barWidth}" 
            height="${barHeight}" 
            fill="var(--accent)" 
            opacity="${opacity}"
            rx="2"
            class="animated">
        <title>${day.date}: ${day.contributionCount} contributions</title>
      </rect>`;
    })
    .join("");

  return `
  <g>
    <text class="stat-label" x="${x}" y="${y - 10}">Last 30 Days Activity</text>
    ${bars}
  </g>`;
}

export function createContributionHeatmap(x, y, contributionDays, theme) {
  const weeks = Math.min(52, Math.ceil(contributionDays.length / 7));
  const cellSize = 10;
  const cellGap = 2;

  const maxContributions = Math.max(
    ...contributionDays.map((d) => d.contributionCount),
    1
  );

  const cells = contributionDays
    .slice(0, weeks * 7)
    .map((day, i) => {
      const week = Math.floor(i / 7);
      const dayOfWeek = i % 7;
      const cellX = x + week * (cellSize + cellGap);
      const cellY = y + dayOfWeek * (cellSize + cellGap);

      const intensity =
        day.contributionCount > 0
          ? Math.min(day.contributionCount / maxContributions, 1)
          : 0;

      const color = intensity === 0 ? theme.cardBorder : theme.accent;

      return `
      <rect x="${cellX}" y="${cellY}" 
            width="${cellSize}" height="${cellSize}" 
            fill="${color}" 
            opacity="${intensity * 0.8 + 0.2}"
            rx="2"
            class="animated">
        <title>${day.date}: ${day.contributionCount} contributions</title>
      </rect>`;
    })
    .join("");

  return `<g>${cells}</g>`;
}
