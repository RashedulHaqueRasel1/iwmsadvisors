# IWMS Advisors

A modern, full-featured corporate website for IWMS Advisors — a consulting and advisory firm. Built with Next.js 16, React 19, and Tailwind CSS, featuring CMS-driven content, dynamic service pages, blog, career listings, real estate listings, and more.

## Tech Stack

| Category              | Technology                                      |
| --------------------- | ----------------------------------------------- |
| Framework             | Next.js 16 (App Router)                         |
| Language              | TypeScript 5                                    |
| Styling               | Tailwind CSS 4                                  |
| UI Components         | Shadcn UI (Radix UI primitives)                 |
| State / Data Fetching | TanStack React Query 5                          |
| HTTP Client           | Axios                                           |
| Forms                 | React Hook Form + Zod validation                |
| Animations            | Framer Motion                                   |
| Icons                 | Lucide React, React Icons                       |
| Notifications         | Sonner (toast)                                  |
| Theme                 | next-themes                                     |
| Linting               | ESLint 9                                        |
| Image Hosting         | Cloudinary                                      |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A running backend API (default: `http://localhost:5000/api/v1`)

### Installation

```bash
# Clone the repository
git clone https://github.com/FSDTeam-SAA/iwmsadvisors.git
cd iwmsadvisors

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

| Variable               | Description                | Default                          |
| ---------------------- | -------------------------- | -------------------------------- |
| `NEXT_PUBLIC_API_URL`  | Backend REST API base URL  | `http://localhost:5000/api/v1`   |

### Running the App

```bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Lint
npm run lint
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── about/            # About page
│   ├── blogs/            # Blog listing & detail
│   ├── careers/          # Career listings & applications
│   ├── case-studies/     # Case studies
│   ├── contact/          # Contact page
│   ├── faq/              # FAQ page
│   ├── real-state/       # Real estate listings
│   ├── services/         # Services pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # Shadcn UI components
│   ├── shared/           # Navbar, Footer, shared components
│   └── website/          # Domain-specific page components
├── lib/
│   ├── api/              # API service functions
│   ├── hooks/            # React Query custom hooks
│   ├── type/             # TypeScript type definitions
│   └── utils.ts          # Utility functions
├── providers/            # React context providers
└── data/                 # Static data
```

## Pages

| Route             | Description                        |
| ----------------- | ---------------------------------- |
| `/`               | Home page with hero, services, etc.|
| `/about`          | About the company                  |
| `/services`       | Service listings                   |
| `/services/[id]`  | Individual service detail          |
| `/blogs`          | Blog listing                       |
| `/blogs/[id]`     | Individual blog post               |
| `/case-studies`   | Case study listing                 |
| `/case-studies/[id]` | Individual case study           |
| `/careers`        | Career/job listings                |
| `/careers/[id]`   | Job detail & application           |
| `/real-state`     | Real estate listings               |
| `/real-state/[id]`| Property detail                    |
| `/faq`            | Frequently asked questions         |
| `/contact`        | Contact form                       |

## API Integration

The frontend communicates with a REST API backend. Key endpoint groups:

- **Services** — `/service-page`, `/service-page-title`
- **Blogs** — `/blog` (paginated)
- **Case Studies** — `/case-study`
- **Careers** — `/career`, `/career/:id/apply`
- **Real Estate** — `/real-state`
- **FAQ** — `/faq`
- **Contact** — `/contact` (POST)
- **CMS Content** — `/banner/all`, `/about/get`, `/footer/get`, `/hero/all`, `/navbar/get`, and more

All API calls use Axios and are cached/managed via TanStack React Query hooks located in `src/lib/hooks/`.

## Scripts

| Command          | Description                |
| ---------------- | -------------------------- |
| `npm run dev`    | Start development server   |
| `npm run build`  | Create production build    |
| `npm run start`  | Run production server      |
| `npm run lint`   | Run ESLint                 |

## Deployment

The easiest way to deploy this Next.js app is on [Vercel](https://vercel.com). See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more options.

## License

This project is private and proprietary.
