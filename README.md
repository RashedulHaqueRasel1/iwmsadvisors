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

- Node.js 18 or later
- npm or yarn
- IWMS backend API running locally or on a live server

### Run from ZIP File

If you do not want to use Git, follow these steps:

1. Open the GitHub repository in your browser.
2. Click `Code`.
3. Click `Download ZIP`.
4. Extract the ZIP file.
5. Open the extracted folder in VS Code or any editor.
6. Open a terminal inside the project folder.
7. Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root and add:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

| Variable              | What it is used for                         | Example value                  |
| --------------------- | ------------------------------------------- | ------------------------------ |
| `NEXT_PUBLIC_API_URL` | Backend API base URL used by frontend calls | `http://localhost:5000/api/v1` |

### How to Run Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Commands

```bash
npm run build
npm run start
```

### Full Local Run Order

If you are running the full system locally from ZIP files:

1. Download and extract the backend ZIP file.
2. Configure backend `.env`.
3. Run backend with `npm install` and `npm run dev` or `npm start`.
4. Confirm backend is running at `http://localhost:5000`.
5. Download and extract this frontend ZIP file.
6. Create the frontend `.env` file.
7. Run `npm install`.
8. Run `npm run dev`.

### What Is Used Where

- `Next.js 16` is used for routing, page rendering, and the App Router structure inside `src/app/`.
- `React 19` is used for the UI layer and reusable components.
- `Tailwind CSS 4` is used for styling across the site.
- `TanStack React Query` is used in `src/providers/ReactQueryProvider.tsx` and related hooks for API data fetching and caching.
- `Axios` is used for calling the backend API.
- `Framer Motion` is used for animations and interactive motion effects.
- `Shadcn UI` and `Radix UI` are used for reusable UI building blocks.
- `Sonner` is used for toast notifications.
- `Lucide React` and `React Icons` are used for icons.

### Main Folder Guide

- `src/app/` contains route pages such as home, about, services, blogs, careers, and contact.
- `src/components/` contains reusable UI and website sections.
- `src/lib/` contains helper functions and API-related utilities.
- `src/providers/` contains provider setup such as React Query.
- `src/data/` contains local static data.
- `public/` contains images, logos, blog assets, and real estate assets.

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
