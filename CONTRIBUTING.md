# Contributing to FriendScope

Thank you for your interest in contributing! FriendScope is a Next.js + TypeScript web application
for evaluating and strengthening friendships through scientific assessment and personalized
insights. This guide explains how to get involved.

## How to Contribute

### Reporting Bugs

If you find a bug, please [open an issue](https://github.com/ChanMeng666/friendscope/issues/new) with:

- The page or assessment step where it happens
- Steps to reproduce the problem
- Expected vs. actual behavior (screenshots help)
- Your browser and operating system

### Suggesting Features

Have an idea for a new assessment, visualization, or insight? [Open a feature request](https://github.com/ChanMeng666/friendscope/issues/new) describing the problem you want to solve and your proposed solution. Because this project is privacy-focused, please call out any data-handling implications.

### Submitting Changes

1. **Fork** the repository and **clone** your fork:
   ```bash
   git clone https://github.com/<your-username>/friendscope.git
   cd friendscope
   ```
2. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Make your changes** and verify locally (see Development Setup below).
5. **Commit** with a clear message following [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: add friendship trend chart"
   ```
6. **Push** and open a Pull Request against the `master` branch.

## Development Setup

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Production build
npm run build && npm start

# Lint
npm run lint
```

### Cloudflare Deployment (optional)

This project can be deployed to Cloudflare via OpenNext:

```bash
npm run preview   # build for Cloudflare and run locally with Wrangler
npm run deploy    # build and deploy to Cloudflare
```

## Code of Conduct

By participating, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). For questions or
support, see [SUPPORT.md](SUPPORT.md). For security issues, see [SECURITY.md](SECURITY.md).
