import fetch from "node-fetch";

const GITHUB_API = "https://api.github.com";
const GITHUB_GRAPHQL = "https://api.github.com/graphql";

export async function fetchGitHubStats(username, token) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "User-Agent": "GitHub-Stats-Generator",
  };

  try {
    const [userStats, repoStats, contributionStats, languageStats] =
      await Promise.all([
        fetchUserData(username, headers),
        fetchRepositoryStats(username, headers),
        fetchContributionData(username, headers),
        fetchLanguageData(username, headers),
      ]);

    return {
      username,
      followers: userStats.followers,
      following: userStats.following,
      publicRepos: userStats.public_repos,
      totalStars: repoStats.totalStars,
      totalForks: repoStats.totalForks,
      totalIssues: contributionStats.totalIssues,
      totalPRs: contributionStats.totalPRs,
      totalCommits: contributionStats.totalCommits,
      contributionStreak: contributionStats.streak,
      contributionDays: contributionStats.contributionDays,
      languages: languageStats,
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error.message);
    throw error;
  }
}

async function fetchUserData(username, headers) {
  const response = await fetch(`${GITHUB_API}/users/${username}`, { headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch user data: ${response.statusText}`);
  }
  return await response.json();
}

async function fetchRepositoryStats(username, headers) {
  const response = await fetch(
    `${GITHUB_API}/users/${username}/repos?per_page=100`,
    { headers }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch repository data: ${response.statusText}`);
  }

  const repos = await response.json();
  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

  return { totalStars, totalForks };
}

async function fetchContributionData(username, headers) {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch contribution data: ${response.statusText}`
    );
  }

  const data = await response.json();
  const contributions = data.data.user.contributionsCollection;
  const calendar = contributions.contributionCalendar;

  const allDays = calendar.weeks.flatMap((week) => week.contributionDays);
  const streak = calculateStreak(allDays);

  return {
    totalCommits: contributions.totalCommitContributions,
    totalIssues: contributions.totalIssueContributions,
    totalPRs:
      contributions.totalPullRequestContributions +
      contributions.totalPullRequestReviewContributions,
    streak,
    contributionDays: allDays,
  };
}

async function fetchLanguageData(username, headers) {
  const response = await fetch(
    `${GITHUB_API}/users/${username}/repos?per_page=100`,
    { headers }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch language data: ${response.statusText}`);
  }

  const repos = await response.json();
  const languageCounts = {};

  for (const repo of repos) {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  }

  const sortedLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  const total = sortedLanguages.reduce((sum, lang) => sum + lang.count, 0);

  return sortedLanguages.map((lang) => ({
    name: lang.name,
    percentage: ((lang.count / total) * 100).toFixed(1),
  }));
}

function calculateStreak(contributionDays) {
  let currentStreak = 0;
  let maxStreak = 0;
  let tempStreak = 0;

  const sortedDays = contributionDays.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < sortedDays.length; i++) {
    const day = sortedDays[i];
    const dayDate = new Date(day.date);
    dayDate.setHours(0, 0, 0, 0);

    if (day.contributionCount > 0) {
      tempStreak++;
      if (i === 0 || (today - dayDate) / (1000 * 60 * 60 * 24) <= 1) {
        currentStreak = tempStreak;
      }
      maxStreak = Math.max(maxStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  return {
    current: currentStreak,
    max: maxStreak,
  };
}
