import { fetchGitHubStats } from "./fetchStats.js";
import { generateSVG } from "./generateSVG.js";
import { saveFile, validateEnvironment } from "./helpers/utils.js";
import { join } from "path";

async function main() {
  try {
    console.log("🚀 Starting GitHub Stats Generator...\n");

    const { username, token } = validateEnvironment();
    console.log(`📊 Fetching stats for: ${username}\n`);

    const stats = await fetchGitHubStats(username, token);
    console.log("✓ Stats fetched successfully\n");

    console.log("📈 Generating SVG...");
    const svgContent = generateSVG(stats, "dark");

    const assetsDir = join(process.cwd(), "assets");
    const svgPath = join(assetsDir, "github-stats.svg");

    await saveFile(svgPath, svgContent);

    console.log("\n✨ Generation complete!");
    console.log(`\n📍 Output location: ${svgPath}`);
    console.log("\n📋 Embed in your README with:");
    console.log(`
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${username}/github-stats/main/assets/github-stats.svg?theme=dark">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/${username}/github-stats/main/assets/github-stats.svg?theme=light">
  <img alt="GitHub Stats" src="https://raw.githubusercontent.com/${username}/github-stats/main/assets/github-stats.png" />
</picture>
    `);
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
}

main();
