# ABIM BiasGuard - Frontend

Modern Next.js frontend for the ABIM Bias Checker application. Detects and analyzes potential bias in ABIM exam vignettes and clinical feedback narratives.

## Features

- **4 Bias Categories**: Demographic Bias, Clinical Stigma Bias, Assessment Bias, and No Bias
- **High Accuracy**: RoBERTa + LoRA model achieving 98.7% accuracy on test set
- **Real-time Analysis**: Instant bias detection with AI-powered explanations
- **Explainable AI**: View rationale, flagged phrases, and recommended revisions
- **Premium UI**: Modern design with Tailwind CSS, smooth animations, and responsive layout
- **Example Library**: Pre-loaded vignettes for quick testing

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend API running on `http://localhost:8000` (see `../backend/README.md`)

### Installation

```bash
# Install dependencies
npm install
```

### Configuration

Create a `.env.local` file (already created) with:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Running Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Landing page (Research Overview)
│   ├── analyze/             # Bias analysis interface
│   ├── taxonomy/            # Bias taxonomy guide
│   ├── robustness/          # Model performance metrics
│   ├── history/             # Audit history
│   ├── layout.tsx           # Root layout with sidebar
│   └── globals.css          # Global styles and design tokens
├── components/
│   ├── layout/              # Layout components (Sidebar)
│   ├── analyze/             # Analysis page components
│   │   ├── ArtifactConsole.tsx
│   │   ├── ExampleTabs.tsx
│   │   ├── ExplainabilityCard.tsx
│   │   ├── FlagsDetected.tsx
│   │   ├── RecommendedRevision.tsx
│   │   └── AuditScore.tsx
│   └── ui/                  # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       └── LoadingSpinner.tsx
├── services/
│   └── api.ts               # Backend API integration
├── types/
│   └── index.ts             # TypeScript interfaces
└── data/
    └── examples.ts          # Example vignettes and feedback
```

## Usage

### Analyzing Text

1. Navigate to the **Analyze Artifact** page
2. Click an example tab or enter your own vignette/feedback text
3. Toggle between "Vignette" or "Feedback" source type
4. Click **Perform Bias Analysis**
5. Review results:
   - **Explainability Rationale**: AI explanation of detected bias
   - **Flags Detected**: Highlighted problematic phrases
   - **Recommended Revision**: Suggested improvements
   - **Audit Score**: Compliance rating (1-10 scale)

### Understanding Bias Categories

Visit the **Taxonomy Guide** page to learn about all 4 bias categories, with examples and impact assessments.

### Viewing Model Performance

The **Robustness Engine** page shows model accuracy, training dataset details, and architecture information.

## API Integration

The frontend communicates with the Flask backend at `http://localhost:8000`:

- **POST /predict**: Analyzes a single text sample
- **GET /health**: Checks backend availability

The API service (`services/api.ts`) enriches backend responses with:

- Rationale templates for each bias type
- Flag detection patterns
- Recommended revisions
- Audit scoring (1-10 scale)

## Design System

The application uses a premium design system defined in `app/globals.css`:

- **Colors**: Blue gradient primary, semantic colors for bias types
- **Typography**: Inter font family, responsive sizing
- **Shadows**: Layered elevation for depth
- **Animations**: Smooth transitions, fade-in effects
- **Components**: Reusable, accessible UI primitives

## Browser Compatibility

Tested on:

- Chrome 120+
- Firefox 120+
- Safari 17+
- Edge 120+

## Development

### Adding New Pages

Create a new directory in `app/` with a `page.tsx` file. Update the sidebar navigation in `components/layout/Sidebar.tsx`.

### Customizing Bias Logic

Edit `services/api.ts` to modify rationale templates, flag patterns, or revision logic.

### Styling

Modify `app/globals.css` for global design tokens. Use Tailwind utility classes in components.

## Troubleshooting

**Backend Connection Error**:

- Ensure the backend is running: `cd ../backend && python src/app.py`
- Check `.env.local` has the correct `NEXT_PUBLIC_API_URL`

**Build Errors**:

- Clear the `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## License

This project is part of the ABIM Bias Checker research initiative.
