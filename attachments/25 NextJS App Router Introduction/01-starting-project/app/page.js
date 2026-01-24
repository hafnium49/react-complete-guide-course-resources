/**
 * ============================================================================
 * PAGE COMPONENT - LESSONS 429-430: Introduction to Next.js
 * ============================================================================
 *
 * LESSON 429 - WHAT IS NEXT.JS?
 *
 * Next.js is a REACT FRAMEWORK - a framework that builds on top of React.
 * It allows you to build FULLSTACK applications with React.
 *
 * INSTRUCTOR QUOTE:
 * "This section here is about working with NextJS, a React framework, so a
 * framework that builds up on React, that allows you to build fullstack
 * applications with React."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  STANDARD REACT APP (Client-Side Only):                                 │
 * │    - Front-end only (runs in browser)                                   │
 * │    - Needs separate backend (Node.js, Django, etc.)                     │
 * │    - Data fetching via useEffect + fetch/axios                          │
 * │                                                                          │
 * │  NEXT.JS APP (Fullstack):                                               │
 * │    - Front-end AND back-end in ONE project                              │
 * │    - Server Components (render on server)                               │
 * │    - API Routes (build backend endpoints)                               │
 * │    - Server Actions (handle form submissions)                           │
 * │    - Seamless data fetching                                             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "Applications where the front end is still controlled by React, just as
 * you learned it throughout this course, but where this front-end then
 * seamlessly blends with the backend."
 *
 * ============================================================================
 * LESSON 430 - CREATING A NEXT.JS PROJECT
 * ============================================================================
 *
 * To create a new Next.js project, run:
 *   npx create-next-app@latest your-project-name
 *
 * INSTRUCTOR QUOTE:
 * "We need a project that comes with NextJS pre-installed and that has a
 * certain structure and setup that's needed by NextJS."
 *
 * During setup, you'll be asked several questions:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ? Would you like to use TypeScript?              → No (for this course)│
 * │  ? Would you like to use ESLint?                  → Yes                 │
 * │  ? Would you like to use Tailwind CSS?            → No (for simplicity) │
 * │  ? Would you like to use `src/` directory?        → No                  │
 * │  ? Would you like to use App Router? (recommended)→ YES (important!)    │
 * │  ? Customize default import alias?                → No                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "You should confirm the App Router if asked. So you should pick yes here."
 *
 * The App Router is Next.js 13+ recommended routing system that uses:
 * - File-based routing (folders = routes)
 * - Server Components by default
 * - Layouts, loading states, error boundaries
 *
 * ============================================================================
 * THIS FILE: app/page.js
 * ============================================================================
 *
 * In the App Router, this file represents the HOME PAGE (root route "/").
 *
 * FILE-BASED ROUTING IN NEXT.JS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  File Path                    │  URL Route                              │
 * │  ─────────────────────────────│─────────────────────────────────────────│
 * │  app/page.js                  │  /                                      │
 * │  app/about/page.js            │  /about                                 │
 * │  app/meals/page.js            │  /meals                                 │
 * │  app/meals/[slug]/page.js     │  /meals/:slug (dynamic route)           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * This is DIFFERENT from React Router where you define routes in code:
 *   <Route path="/" element={<Home />} />
 *
 * In Next.js, the FILE STRUCTURE defines the routes automatically!
 *
 * ============================================================================
 * SERVER COMPONENTS (Default in Next.js App Router)
 * ============================================================================
 *
 * By default, ALL components in the `app/` folder are SERVER COMPONENTS.
 * This means:
 * - They render on the SERVER, not in the browser
 * - They can directly access databases, file systems, etc.
 * - They send pre-rendered HTML to the client (faster initial load)
 * - They CANNOT use useState, useEffect, or browser APIs
 *
 * To make a component a CLIENT COMPONENT (like traditional React):
 *   Add 'use client' at the top of the file
 *
 * ============================================================================
 */

/**
 * HOME PAGE COMPONENT
 *
 * This is a Server Component (default in Next.js App Router).
 * It renders on the server and sends HTML to the browser.
 *
 * Notice: No 'use client' directive at the top = Server Component
 *
 * INSTRUCTOR QUOTE:
 * "And if you then go to that address, you should see something like this
 * on the screen. And that's that very basic first starting project I
 * prepared for you."
 */
export default function Home() {
  return (
    <main>
      {/**
       * STATIC ASSETS IN NEXT.JS
       *
       * Images in the `public/` folder are served at the root URL.
       * - File: public/logo.png
       * - URL: /logo.png
       *
       * This is similar to how CRA (Create React App) handles static assets.
       * Next.js also has an optimized <Image> component (covered later).
       */}
      <img src="/logo.png" alt="A server surrounded by magic sparkles." />
      <h1>Welcome to this NextJS Course!</h1>
      <p>🔥 Let&apos;s get started! 🔥</p>
    </main>
  );
}

/**
 * ============================================================================
 * LESSON 429-430 SUMMARY
 * ============================================================================
 *
 * WHAT YOU'LL LEARN IN THIS SECTION:
 *
 * INSTRUCTOR QUOTE:
 * "In this section here, you will learn what exactly NextJS is and why you
 * might wanna use it, before you'll then learn how to use it, how to set
 * up routes and pages and work with React components when working with
 * NextJS, and how to fetch and send data."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Topics Covered:                                                        │
 * │  ─────────────────────────────────────────────────────────────────────  │
 * │  1. What is NextJS & Why use it?                                        │
 * │  2. Routing, Pages & Server Components                                  │
 * │  3. Fetching & Sending Data                                             │
 * │  4. Styling, Image Upload & Managing Page Metadata                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * PROJECT COMMANDS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  npm install     → Install dependencies                                 │
 * │  npm run dev     → Start development server (http://localhost:3000)     │
 * │  npm run build   → Build for production                                 │
 * │  npm start       → Run production build                                 │
 * │  npm run lint    → Run ESLint                                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "By the end of this section, you'll be able to use your React knowledge
 * and enhance it tremendously, so that you are able to build fullstack
 * applications and not just front-end applications with React."
 *
 * ============================================================================
 */
