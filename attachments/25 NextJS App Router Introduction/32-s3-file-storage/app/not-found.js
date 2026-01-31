/**
 * ============================================================================
 * ROOT NOT FOUND PAGE - LESSON 476 Section Summary Reference
 * ============================================================================
 *
 * This file demonstrates the not-found.js special file, one of the key
 * Next.js App Router conventions covered in this section.
 *
 * ============================================================================
 * SPECIAL FILE: not-found.js
 * ============================================================================
 *
 * From the instructor (Lesson 476):
 * "You also learned about other special files like error.js for handling
 * errors, or not-found.js for handling not found errors."
 *
 * This file is automatically rendered when:
 * 1. A user navigates to a route that doesn't exist
 * 2. Code calls the notFound() function from 'next/navigation'
 *
 * ============================================================================
 * HOW not-found.js WORKS
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  AUTOMATIC TRIGGER:                                                     │
 * │  User visits /invalid-page → Next.js shows this not-found.js           │
 * │                                                                          │
 * │  PROGRAMMATIC TRIGGER:                                                  │
 * │  import { notFound } from 'next/navigation';                            │
 * │  if (!meal) { notFound(); }  → Next.js shows this not-found.js         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * NOT-FOUND PAGE HIERARCHY
 * ============================================================================
 *
 * Not-found pages can be nested, just like layouts:
 *
 *   app/not-found.js           ← ROOT not-found (THIS FILE)
 *   app/meals/not-found.js     ← /meals specific not-found
 *
 * When notFound() is called:
 * 1. Next.js looks for the CLOSEST not-found.js in the route hierarchy
 * 2. If found in current route, uses that
 * 3. If not found, bubbles up to parent routes
 * 4. Finally falls back to root not-found.js (this file)
 *
 * EXAMPLE:
 *   /meals/invalid-slug → Uses app/meals/not-found.js (more specific)
 *   /invalid-route     → Uses app/not-found.js (this file)
 *
 * ============================================================================
 * RELATED SPECIAL FILES
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  page.js       │  Route UI component                                   │
 * │  layout.js     │  Shared wrapper for routes                            │
 * │  error.js      │  Error boundary (for runtime errors)                  │
 * │  not-found.js  │  404 page (THIS FILE)                                 │
 * │  loading.js    │  Loading state (can use Suspense instead)             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "The loading.js file, which I'm not using here, but which we used
 * temporarily to show some loading state on the screen. Though you learned
 * that you have more granular control by using Suspense."
 *
 * ============================================================================
 */

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>Not found</h1>
      <p>Unfortunately, we could not find the requested page or resource.</p>
    </main>
  );
}
