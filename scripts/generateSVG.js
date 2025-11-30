import { themes, getTheme } from "./helpers/colors.js";
import {
  createSVGTemplate,
  createBadge,
  createStatCard,
} from "./helpers/templates.js";
import { createDonutChart, createStreakChart } from "./helpers/charts.js";
import { formatNumber } from "./helpers/utils.js";

export function generateSVG(stats, themeType = "dark") {
  const theme = getTheme(themeType);
  const width = 900;
  const height = 600;

  const badges = [
    { icon: "👥", label: "Followers", value: formatNumber(stats.followers) },
    { icon: "⭐", label: "Total Stars", value: formatNumber(stats.totalStars) },
    { icon: "🔀", label: "Total Forks", value: formatNumber(stats.totalForks) },
    {
      icon: "📦",
      label: "Repositories",
      value: formatNumber(stats.publicRepos),
    },
    {
      icon: "🔥",
      label: "Streak",
      value: `${stats.contributionStreak.current} days`,
    },
    { icon: "💻", label: "Commits", value: formatNumber(stats.totalCommits) },
  ];

  let badgeX = 20;
  let badgeY = 20;
  const badgeHTML = badges
    .map((badge, i) => {
      const x = badgeX + (i % 3) * 160;
      const y = badgeY + Math.floor(i / 3) * 80;
      return createBadge(x, y, badge.icon, badge.label, badge.value);
    })
    .join("");

  const languageChart =
    stats.languages.length > 0
      ? createDonutChart(120, 350, 80, stats.languages, theme)
      : "";

  const streakChart =
    stats.contributionDays.length > 0
      ? createStreakChart(500, 230, 360, 100, stats.contributionDays)
      : "";

  const additionalStats = createStatCard(
    500,
    350,
    380,
    220,
    "📊 Additional Stats",
    [
      { label: "Issues Created", value: formatNumber(stats.totalIssues) },
      { label: "Pull Requests", value: formatNumber(stats.totalPRs) },
      { label: "Max Streak", value: `${stats.contributionStreak.max} days` },
      { label: "Following", value: formatNumber(stats.following) },
    ]
  );

  const titleSection = `
  <g transform="translate(20, 200)">
    <text class="title" x="0" y="0">🎯 ${stats.username}'s GitHub Stats</text>
    <text class="stat-label" x="0" y="25">Last updated: ${new Date(
      stats.fetchedAt
    ).toLocaleDateString()}</text>
  </g>`;

  const languageTitle =
    stats.languages.length > 0
      ? `
  <g transform="translate(20, 240)">
    <text class="title" x="0" y="0">💻 Top Languages</text>
  </g>`
      : "";

  const content = `
    ${badgeHTML}
    ${titleSection}
    ${languageTitle}
    ${languageChart}
    ${streakChart}
    ${additionalStats}
  `;

  return createSVGTemplate(width, height, content, themes);
}
