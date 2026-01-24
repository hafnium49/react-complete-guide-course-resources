/**
 * ============================================================================
 * ROOT LAYOUT - LESSONS 429-430: Next.js App Router Structure
 * ============================================================================
 *
 * THE APP FOLDER STRUCTURE
 *
 * INSTRUCTOR QUOTE:
 * "This app folder is there right from the start, even in an unedited project."
 *
 * In Next.js App Router, the `app/` folder is the heart of your application.
 * It contains special files that define your app's structure:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  SPECIAL FILES IN app/ FOLDER:                                          │
 * │  ─────────────────────────────────────────────────────────────────────  │
 * │  layout.js  → Root layout (wraps ALL pages) - THIS FILE                 │
 * │  page.js    → Page component (defines a route)                          │
 * │  loading.js → Loading UI (shown while page loads)                       │
 * │  error.js   → Error UI (shown when page errors)                         │
 * │  not-found.js → 404 page                                                │
 * │  route.js   → API endpoint (backend route)                              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * WHAT IS layout.js?
 * ============================================================================
 *
 * layout.js defines the ROOT LAYOUT - the shell that wraps your entire app.
 * It's like the App.js in a standard React app, but with more power.
 *
 * KEY FEATURES:
 * - Contains the <html> and <body> tags (required!)
 * - Wraps ALL pages in your application
 * - Persists across route changes (doesn't re-render)
 * - Can be nested (each folder can have its own layout)
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  LAYOUT HIERARCHY:                                                       │
 * │                                                                          │
 * │  app/layout.js (Root Layout - wraps everything)                         │
 * │    └── app/meals/layout.js (Nested layout - wraps /meals pages)         │
 * │          └── app/meals/page.js                                          │
 * │          └── app/meals/share/page.js                                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

/**
 * IMPORTING GLOBAL STYLES
 *
 * In Next.js, you import global CSS in the root layout.
 * This makes the styles available to ALL pages in your app.
 *
 * Unlike standard React where you might import CSS in index.js or App.js,
 * Next.js requires global CSS to be imported in a layout file.
 */
import './globals.css';

/**
 * ============================================================================
 * METADATA EXPORT
 * ============================================================================
 *
 * Next.js uses a special `metadata` export to define page metadata.
 * This replaces the need for <Helmet> or manual <head> manipulation.
 *
 * The metadata object can include:
 * - title: Page title (shown in browser tab)
 * - description: Meta description (for SEO)
 * - keywords, openGraph, twitter, etc.
 *
 * BENEFITS:
 * - Automatic <head> management
 * - SEO optimization
 * - No need for third-party libraries like react-helmet
 *
 * Each page can have its own metadata export that overrides/extends this.
 */
export const metadata = {
  title: 'NextJS Course App',
  description: 'Your first NextJS app!',
};

/**
 * ============================================================================
 * ROOT LAYOUT COMPONENT
 * ============================================================================
 *
 * This is a REQUIRED file in the app/ folder.
 * It MUST export a default function that:
 * - Returns an <html> element
 * - Contains a <body> element
 * - Renders {children} (the page content)
 *
 * The `children` prop contains the current page being rendered.
 * As users navigate, different page components are passed as children.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  WHAT {children} CONTAINS:                                              │
 * │                                                                          │
 * │  URL: /           → children = <Home /> (from app/page.js)              │
 * │  URL: /about      → children = <About /> (from app/about/page.js)       │
 * │  URL: /meals      → children = <Meals /> (from app/meals/page.js)       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The current page content
 */
export default function RootLayout({ children }) {
  return (
    /**
     * HTML & BODY TAGS
     *
     * Unlike standard React (CRA/Vite), Next.js requires you to define
     * the <html> and <body> tags in your layout.
     *
     * This gives you full control over:
     * - Language attribute (lang="en")
     * - Body class names
     * - Any attributes on <html> or <body>
     */
    <html lang="en">
      <body>
        {/**
         * CHILDREN - THE CURRENT PAGE
         *
         * {children} is automatically populated by Next.js with the
         * page component that matches the current route.
         *
         * This is similar to React Router's <Outlet /> but handled
         * automatically by the file-based routing system.
         */}
        {children}
      </body>
    </html>
  );
}

/**
 * ============================================================================
 * SERVER COMPONENTS AND LAYOUTS
 * ============================================================================
 *
 * Like all components in the app/ folder, layouts are SERVER COMPONENTS
 * by default. This means:
 *
 * ✓ Can fetch data directly (no useEffect needed)
 * ✓ Can access server-only resources (databases, files)
 * ✓ Reduced client-side JavaScript bundle
 * ✗ Cannot use useState, useEffect, useContext
 * ✗ Cannot use browser APIs (window, document)
 *
 * If you need client-side features in a layout, you can:
 * 1. Add 'use client' at the top (makes entire layout a Client Component)
 * 2. Create a Client Component and import it into the layout
 *
 * ============================================================================
 * COMPARISON: NEXT.JS vs STANDARD REACT
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  STANDARD REACT (CRA/Vite):                                             │
 * │  ─────────────────────────────────────────────────────────────────────  │
 * │  - HTML is in public/index.html                                         │
 * │  - React renders into a <div id="root">                                 │
 * │  - Routes defined in code with React Router                             │
 * │  - No built-in metadata management                                      │
 * │                                                                          │
 * │  NEXT.JS (App Router):                                                  │
 * │  ─────────────────────────────────────────────────────────────────────  │
 * │  - HTML structure in layout.js                                          │
 * │  - Full control over <html>, <head>, <body>                             │
 * │  - Routes defined by file structure                                     │
 * │  - Built-in metadata with export const metadata                         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
