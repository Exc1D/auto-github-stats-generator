# 🎯 GitHub Stats Generator

Automatically generate beautiful, dynamic GitHub statistics cards with SVG and PNG outputs. Features include contribution streaks, language breakdowns, and comprehensive metrics.

![GitHub Stats Example](./assets/github-stats.svg)

## ✨ Features

- 📊 **Comprehensive Stats**: Followers, stars, forks, commits, PRs, issues
- 🎨 **Dynamic Theming**: Auto-detects light/dark mode preferences
- 📈 **Visual Charts**: Donut chart for languages, streak visualization
- 🔄 **Auto-Updates**: GitHub Actions refreshes stats every 6 hours
- 🖼️ **Dual Format**: SVG for web, PNG fallback for compatibility
- 🎯 **Modular Design**: Clean, maintainable codebase

## 🚀 Quick Start

### 1. Fork This Repository

Click the "Fork" button at the top right of this page.

### 2. Enable GitHub Actions

1. Go to your forked repository
2. Click on "Actions" tab
3. Click "I understand my workflows, go ahead and enable them"

### 3. Set Repository Secrets

1. Go to Settings → Secrets and variables → Actions
2. The workflow will use `GITHUB_TOKEN` automatically (no setup needed)

### 4. Trigger First Run

1. Go to Actions → Update GitHub Stats
2. Click "Run workflow" → "Run workflow"
3. Wait for completion (~30 seconds)

### 5. Embed in Your README

Add this to your GitHub profile README:

```markdown
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/YOUR_USERNAME/github-stats/main/assets/github-stats.svg?theme=dark">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/YOUR_USERNAME/github-stats/main/assets/github-stats.svg?theme=light">
  <img alt="GitHub Stats" src="https://raw.githubusercontent.com/YOUR_USERNAME/github-stats/main/assets/github-stats.png" />
</picture>
```

Replace `YOUR_USERNAME` with your GitHub username.

## 🛠️ Local Development

### Prerequisites

- Node.js 18+
- GitHub Personal Access Token

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/github-stats.git
cd github-stats

# Install dependencies
npm install
```

### Configuration

Create a `.env` file:

```env
GITHUB_USERNAME=your-username
GITHUB_TOKEN=your-personal-access-token
```

To create a GitHub token:

1. Go to Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `read:user` and `repo` scopes

### Generate Stats

```bash
npm run generate
```

Output will be in `assets/github-stats.svg`

## 📁 Project Structure

github-stats/
├── README.md
├── package.json
├── scripts/
│ ├── fetchStats.js # GitHub API data fetching
│ ├── generateSVG.js # SVG generation logic
│ ├── index.js # Main orchestrator
│ └── helpers/
│ ├── colors.js # Theme definitions
│ ├── templates.js # SVG templates
│ ├── charts.js # Chart generators
│ └── utils.js # Utility functions
├── assets/
│ ├── github-stats.svg # Generated SVG
│ └── github-stats.png

# Generated PNG fallback

└── .github/
└── workflows/
└── update-stats.yml # Auto-update workflow

## 🎨 Customization

### Modify Themes

Edit `scripts/helpers/colors.js` to customize color schemes:

```javascript
export const themes = {
  light: {
    background: "#ffffff",
    primary: "#3b82f6",
    // ... more colors
  },
  dark: {
    background: "#0d1117",
    primary: "#58a6ff",
    // ... more colors
  },
};
```

### Adjust Layout

Modify `scripts/generateSVG.js` to change badge positions, sizes, or add new elements.

### Change Update Frequency

Edit `.github/workflows/update-stats.yml`:

```yaml
schedule:
  - cron: "0 */6 * * *" # Change to desired frequency
```

## 🔧 Troubleshooting

### Stats Not Updating

1. Check Actions tab for error logs
2. Verify `GITHUB_TOKEN` permissions
3. Ensure Actions are enabled in repository settings

### PNG Not Generated

- Verify ImageMagick is installed (automatic in GitHub Actions)
- Check workflow logs for conversion errors

### API Rate Limits

- The workflow uses authenticated requests (5,000/hour limit)
- Unauthenticated users have 60 requests/hour
- Rate limit resets hourly

## 📊 Metrics Included

| Metric        | Description                         |
| ------------- | ----------------------------------- |
| Followers     | Total GitHub followers              |
| Stars         | Sum of stars across all repos       |
| Forks         | Sum of forks across all repos       |
| Repositories  | Public repository count             |
| Commits       | Total commit contributions          |
| Issues        | Issues created                      |
| Pull Requests | PRs and PR reviews                  |
| Streak        | Current and max contribution streak |
| Languages     | Top 5 languages by repository count |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- GitHub API for comprehensive data access
- SVG format for dynamic, themeable graphics
- GitHub Actions for seamless automation

---

**Made with ❤️ by the open source community**

⭐ Star this repository if you find it useful!
