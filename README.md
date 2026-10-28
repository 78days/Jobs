# Job Search Web App

Jobs is a responsive remote developer job search application built with React, TypeScript, and Vite. It helps users discover relevant opportunities, sort and paginate results, inspect detailed job listings, and save bookmarks that persist across sessions.

## Overview

Jobs is a polished job discovery experience for developers looking for remote work. The app combines debounced search, filtering, pagination, bookmark management, and detailed job views into a clean, mobile-friendly interface designed for quick browsing and efficient decision-making.

## Features

- Debounced job search to reduce unnecessary API requests
- Job results sorted by relevance or recency
- Paginated search results
- Detailed job views opened through URL hash navigation
- Bookmark jobs and persist them with `localStorage`
- Loading spinners for search results, job details, and bookmarks
- Toast notifications for API errors
- Responsive layout for desktop and mobile screens

## Tech Stack

- React 18
- TypeScript
- Vite
- TanStack React Query
- Axios
- React Hot Toast
- Radix UI Icons
- ESLint

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Open the local URL shown by Vite in your browser.

## Deploying to Vercel

This project is deployed as a Vite application on Vercel.

- Vercel project: `moirai2/jobs`
- Production URL: [jobs-plum.vercel.app](https://jobs-plum.vercel.app)
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

### Deploy with the Vercel CLI

Install the CLI if it is not already available, then run the deployment from the project directory:

```bash
npm install --global vercel
vercel
```

Use `vercel --prod` for later production deployments. The Vercel CLI detects the Vite build command and output directory automatically; choose `no` when asked whether to customize the settings unless you want to override the defaults.

The initial project was created successfully, but connecting the GitHub repository requires a GitHub Login Connection in Vercel. Until that connection is added, deploy with the CLI or connect the repository manually after enabling the integration.

## Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite development server        |
| `npm run build`   | Type-check and create a production build |
| `npm run lint`    | Run ESLint with zero warnings allowed    |
| `npm run preview` | Preview the production build locally     |
| `npm run biome`   | Format and check files with Biome        |

## Project Structure

```text
.
├── src/
│   ├── components/       # UI components for search, jobs, bookmarks, and layout
│   ├── context/          # Bookmark state and persistence
│   ├── main.tsx          # React and React Query application setup
│   └── index.css         # Global styles and responsive layout
├── constants.ts          # API URL and pagination settings
├── hook.ts               # Data-fetching and shared React hooks
├── types.ts              # Shared TypeScript models
└── README.md             # Project documentation
```

## Data Fetching

Job data is fetched from the RMTDev course API with Axios and cached through TanStack React Query. Search requests are delayed until the user stops typing, and completed queries remain fresh for optimal performance.

The API endpoint is configured in `constants.ts`:

```ts
export const BASE_URL =
  "https://bytegrad.com/course-assets/projects/rmtdev/api/data";
```

## Validation

The project currently uses the following checks before production builds:

```bash
npm run lint
npm run build
```
