/**
 * ============================================================================
 * MEALS PAGE - LESSON 439: Exercise - Adding More Routes
 * ============================================================================
 *
 * LESSON 439 - EXERCISE: CREATE THE /meals ROUTE
 *
 * INSTRUCTOR QUOTE:
 * "My exercise for you is to create three new routes in this new project.
 * I want you to create a meals route..."
 *
 * ============================================================================
 * FILE-BASED ROUTING REVIEW
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And this course should be pretty straightforward to complete because
 * creating routes was something we already did together before."
 *
 * HOW THIS ROUTE IS CREATED:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FOLDER STRUCTURE:          URL ROUTE:                                  │
 * │  ─────────────────────────  ─────────────────────────────────────────── │
 * │  app/                       /                                           │
 * │  └── meals/                 (creates /meals path segment)               │
 * │      └── page.js            → /meals (THIS FILE)                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * KEY POINTS:
 * - Creating a folder named "meals" inside app/ adds /meals to the URL
 * - The page.js file inside that folder renders the page content
 * - This is a SERVER COMPONENT by default (no 'use client' directive)
 *
 * ============================================================================
 */

import Link from 'next/link';

/**
 * MEALS PAGE COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "Create those routes, add some links, but don't worry about styling or the
 * page content. In the next lecture, we're going to set up those routes together."
 *
 * This is a simple placeholder page for the /meals route.
 * We'll build this out with actual meal listings in upcoming lessons.
 *
 * @returns {JSX.Element} The meals page content
 */
export default function MealsPage() {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Meals Page
      </h1>

      {/**
       * NAVIGATION LINKS
       *
       * Adding links to navigate between pages.
       * The Link component provides SPA-style navigation.
       */}
      <nav style={{ textAlign: 'center', marginTop: '2rem' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '1rem 0' }}>
            <Link href="/" style={{ color: '#f9572a' }}>
              Home
            </Link>
          </li>
          <li style={{ margin: '1rem 0' }}>
            <Link href="/meals/share" style={{ color: '#f9572a' }}>
              Share a Meal
            </Link>
          </li>
          <li style={{ margin: '1rem 0' }}>
            <Link href="/community" style={{ color: '#f9572a' }}>
              Community
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}

/**
 * ============================================================================
 * LESSON 439 - EXERCISE SUMMARY: /meals ROUTE
 * ============================================================================
 *
 * WHAT WE LEARNED:
 *
 * 1. Creating a route is as simple as:
 *    - Create a folder with the desired path name (meals/)
 *    - Add a page.js file inside that folder
 *
 * 2. The folder structure directly maps to the URL structure:
 *    app/meals/page.js → /meals
 *
 * 3. This pattern is consistent across all routes in Next.js App Router
 *
 * UPCOMING IN THIS SECTION:
 * - Adding actual meal data
 * - Fetching from a database
 * - Displaying meal cards with images
 *
 * ============================================================================
 */
