# StringHub

A modern social networking frontend application built with **React** and **TypeScript**, featuring authentication, user profiles, posts, comments, and Storybook for component documentation.

**Note:** Some pages are still in development and may contain hardcoded dummy data for UI demonstration purposes.

---

## Requirements

* Node.js (LTS recommended)
* npm

---

## Quick Start

Get the project running in a few commands:

```bash
# Clone repository
git clone <repository-url>
cd snc-fe

# Install dependencies
npm install

# Start development server
npm run dev
```

Your application will be available at `http://localhost:5173`.

---

## Tech Stack

* TypeScript
* React
* React Router
* Vite
* Tailwind CSS
* shadcn/ui
* Jest + React Testing Library
* Storybook

---

## Project Structure

```
├─ /.github                # GitHub Actions workflows
├─ /.storybook             # Storybook configuration
├─ /@shadcn                # shadcn/ui component library
├─ /public                 # Static assets
├─ /src
│  ├─ /components          # UI components organized by feature
│  │  ├─ /auth             # Authentication (Login, Register)
│  │  ├─ /common           # Shared components
│  │  ├─ /header           # Header components
│  │  ├─ /home             # Home page components
│  │  ├─ /layout           # Layout components
│  │  ├─ /posts            # Posts feature components
│  │  ├─ /profile          # User profile components
│  │  └─ /settings         # Settings page components
│  ├─ /context             # React context providers
│  ├─ /hooks               # Custom React hooks
│  ├─ /layouts             # Route layout wrappers
│  ├─ /schemas             # Zod validation schemas
│  ├─ /services            # API services and utilities
│  ├─ /types               # TypeScript type definitions
│  └─ /utils               # Utility functions
├─ /test                   # Test setup and utilities
├─ package.json
├─ tsconfig.json           # TypeScript configuration
├─ vite.config.ts          # Vite configuration
└─ README.md
```

---

## Scripts

* `npm run dev` – Starts the development server with hot reload.
* `npm run build` – Builds the application for production.
* `npm run preview` – Previews the production build locally.
* `npm start` – Builds and previews the application.
* `npm run lint` – Runs ESLint and auto-fixes issues.
* `npm test` – Runs the test suite.
* `npm run test:coverage` – Runs tests with coverage report.
* `npm run storybook` – Starts Storybook on port 6006.
* `npm run build-storybook` – Builds Storybook for deployment.

---

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Home page |
| `/login` | Guest only | User login |
| `/register` | Guest only | User registration |
| `/profile` | Authenticated | Current user profile |
| `/profile/:userId` | Authenticated | View user profile |
| `/settings` | Authenticated | User settings |
| `/discover` | Authenticated | Discover content |
| `/posts/:postId/details` | Authenticated | Post details view |

---

## CI/CD

This project uses GitHub Actions for continuous integration. The pipeline runs on pull requests to `main` and includes:

* Tests
* Prettier formatting check

---

## Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage
```

---

## Storybook

View and develop components in isolation:

```bash
npm run storybook
```

Storybook will be available at `http://localhost:6006`.
