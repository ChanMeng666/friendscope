# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FriendScope is a Next.js 15 application that provides scientific friendship assessments through a client-side architecture. The application evaluates friendships across 10 psychological categories using a 20-question assessment, providing users with detailed analytics, historical tracking, and personalized recommendations - all while maintaining complete privacy through local storage.

**Tech Stack:**
- **Framework**: Next.js 15 with App Router, React 19, TypeScript 5
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand with persist middleware
- **Charts**: Recharts + ApexCharts
- **Animations**: Framer Motion + Lottie React
- **PDF Export**: jsPDF
- **Deployment**: Vercel

## Development Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Package Manager
npm install          # Install dependencies (also: yarn, pnpm)
```

## Architecture

### Core Assessment System

The assessment engine (`lib/assessment.ts`) is the heart of the application:

- **20 questions across 10 categories**: Each question has a weight (1.0-1.5) reflecting psychological importance
- **10 assessment categories**:
  - Trust & Honesty (weight: 1.5) - Core foundation
  - Emotional Support (weight: 1.2)
  - Communication (weight: 1.0)
  - Boundaries (weight: 1.3)
  - Reciprocity (weight: 1.1)
  - Conflict Resolution (weight: 1.2)
  - Growth & Development (weight: 1.0)
  - Values Alignment (weight: 1.4)
  - Respect & Recognition (weight: 1.2)
  - Reliability (weight: 1.3)

- **Scoring algorithm**: Weighted calculation that converts 7-point Likert scale responses into category scores (0-100), then averages to overall score
- **Health assessment thresholds**: Excellent (85+), Good (70-84), Concerning (50-69), Unhealthy (30-49), Toxic (<30)

### State Management Architecture

**Two separate Zustand stores with different purposes:**

1. **`lib/store.ts`** - Assessment State (non-persistent):
   - Manages current assessment session
   - Tracks question progression and answers
   - Resets on completion
   - No persistence - temporary state only

2. **`lib/history-store.ts`** - History State (persistent):
   - Persists completed assessments to localStorage
   - Manages assessment history (max 50 entries)
   - Provides CRUD operations for historical data
   - Key: `friendship-assessment-history`

**Critical distinction**: Assessment state is transient; only completed assessments are saved to history store.

### Data Flow

```
User Input → Assessment Store (temp) → Calculate Scores → Save to History Store (persistent) → Visualization
```

1. User takes assessment (`app/assess/page.tsx`)
2. Answers stored in temporary assessment store (`lib/store.ts`)
3. On completion, scores calculated (`lib/assessment.ts:calculateScores`)
4. Result saved to history store with localStorage persistence (`lib/history-store.ts`)
5. User redirected to results page (`app/results/[id]/page.tsx`)

### Component Structure

```
app/
├── page.tsx                 # Landing page
├── assess/page.tsx          # Assessment interface (stepper through 20 questions)
├── results/[id]/page.tsx    # Individual result detail page
├── results/page.tsx         # All results overview
├── history/page.tsx         # Assessment history with comparison
├── about/page.tsx           # Mission and scientific foundation
├── resources/page.tsx       # Professional support resources
└── layout.tsx              # Root layout with Header/Footer

components/
├── ui/                     # shadcn/ui base components
├── layout/                 # Header.tsx, Footer.tsx
├── dialogs/                # ShareDialog.tsx
├── ComparisonChart.tsx     # Multi-assessment comparison visualization
├── FriendInfoDialog.tsx    # Assessment metadata entry
├── GEOHead.tsx            # SEO/meta tags
├── GEODashboard.tsx       # Analytics dashboard
└── LottieAnimation.tsx     # Animation wrapper

lib/
├── assessment.ts           # Questions, scoring, health assessment logic
├── assessment-utils.ts     # PDF generation, share functionality
├── store.ts               # Assessment state (non-persistent)
├── history-store.ts       # History state (persistent to localStorage)
├── geo-analytics.ts       # Analytics utilities
├── svg-generator.ts       # SVG export functionality
├── fonts.ts               # Font configurations
└── utils.ts               # General utilities (cn, etc.)

types/
└── assessment.ts          # AssessmentResult interface
```

## Key Implementation Details

### Assessment Question Format

Each question in `lib/assessment.ts` follows this structure:
```typescript
{
  id: number,              // 1-20
  text: string,            // Question text
  options: string[],       // 7-point Likert scale (standardOptions)
  category: string,        // One of 10 categories
  weight: number          // 1.0-1.5 (psychological importance)
}
```

### Score Calculation

The `calculateScores` function in `lib/assessment.ts:182`:
1. Groups answers by category
2. Converts each answer to weighted score: `((optionsLength - 1 - optionIndex) / (optionsLength - 1)) * 100 * weight`
3. Calculates category averages
4. Overall score = mean of all category averages

### localStorage Schema

```typescript
// Key: friendship-assessment-history
{
  state: {
    assessments: AssessmentResult[] // Max 50 entries
  },
  version: 0
}
```

### TypeScript Path Aliases

Uses `@/*` alias for imports (e.g., `@/lib/assessment`, `@/components/ui/button`)

## Privacy-First Architecture

**Critical**: All data processing happens client-side:
- No backend API calls
- No user authentication/tracking
- All assessments stored in browser localStorage
- No external analytics (except Next.js built-in)
- PDF generation and sharing are client-side only

When adding features, maintain this privacy-first approach.

## Styling Conventions

- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for component primitives (never modify these directly)
- **Framer Motion** for page transitions and animations
- **Responsive design**: Mobile-first approach
- **Dark mode**: Not currently implemented but Tailwind is configured for it

## Common Development Tasks

### Adding a New Assessment Question

1. Add question to `lib/assessment.ts:questions` array
2. Ensure it uses `standardOptions`
3. Assign to existing category or create new one
4. Set appropriate weight (1.0-1.5)
5. Update category descriptions if new category

### Modifying Scoring Algorithm

All scoring logic is in `lib/assessment.ts:calculateScores`. Consider:
- Weighted vs unweighted scores
- Category average calculations
- Overall score aggregation
- Impact on existing assessments

### Adding New Visualizations

Charts are built with Recharts/ApexCharts:
- See `app/results/[id]/page.tsx` for radar chart implementation
- See `components/ComparisonChart.tsx` for multi-assessment comparisons
- Keep charts responsive and accessible

### Extending History Features

History store (`lib/history-store.ts`) supports:
- Adding/removing assessments
- Retrieving by ID
- Clearing all history
- Automatic 50-entry limit

## Scientific Accuracy

The assessment is based on psychological research. When modifying:
- Maintain evidence-based question design
- Preserve weighted scoring reflecting research importance
- Keep 7-point Likert scale for statistical validity
- Ensure health assessment thresholds are meaningful

## Performance Considerations

- Next.js automatic code splitting by route
- Lazy load heavy components (charts, animations)
- Optimize images with Next.js Image component
- localStorage operations are synchronous - keep minimal
- Zustand provides efficient re-renders

## Testing Assessment Flow

Manual testing checklist:
1. Start assessment on `/assess`
2. Answer all 20 questions
3. Enter friend name and notes in dialog
4. Verify score calculation
5. Check localStorage persistence
6. Test PDF export
7. Verify history tracking
8. Test comparison charts with multiple assessments

## Known Constraints

- Maximum 50 assessments in history (oldest auto-deleted)
- localStorage size limits vary by browser (~5-10MB)
- PDF generation is client-side only (limited styling)
- No backend means no cross-device sync
- Assessment questions are English-only

## Deployment

Project is configured for Vercel deployment:
- No environment variables required
- Automatic deployments on push to master
- Edge runtime not used (client-side rendering)
- No serverless functions needed
