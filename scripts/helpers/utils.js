import { writeFile, mkdir } from "fs/promises";
import { dirname } from "path";

export async function saveFile(filepath, content) {
  try {
    await mkdir(dirname(filepath), { recursive: true });
    await writeFile(filepath, content, "utf-8");
    console.log(`✓ Saved: ${filepath}`);
  } catch (error) {
    console.error(`✗ Failed to save ${filepath}:`, error.message);
    throw error;
  }
}

export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function validateEnvironment() {
  const required = ["GITHUB_USERNAME", "GITHUB_TOKEN"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  return {
    username: process.env.GITHUB_USERNAME,
    token: process.env.GITHUB_TOKEN,
  };
}

export function calculatePercentageChange(current, previous) {
  if (previous === 0) return 0;
  return (((current - previous) / previous) * 100).toFixed(1);
}

export function getDateRange(days) {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);
  return { start, end };
}
