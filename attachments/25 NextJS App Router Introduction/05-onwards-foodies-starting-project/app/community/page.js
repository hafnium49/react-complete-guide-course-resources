/**
 * ============================================================================
 * COMMUNITY PAGE - LESSON 439: Exercise - Adding More Routes
 * ============================================================================
 *
 * LESSON 439 - EXERCISE: CREATE THE /community ROUTE
 *
 * INSTRUCTOR QUOTE:
 * "I want you to create a meals route, a /meals/share route, so a nested
 * route in the meals route with an extra path of share, and a community route."
 *
 * ============================================================================
 * SIBLING ROUTES
 * ============================================================================
 *
 * The /community route is a SIBLING to /meals, not nested inside it.
 * Both are top-level routes under the app/ folder.
 *
 * FOLDER STRUCTURE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  app/                                                                   │
 * │  ├── page.js              → / (home)                                    │
 * │  ├── meals/               → /meals routes                               │
 * │  │   ├── page.js          → /meals                                      │
 * │  │   ├── share/                                                         │
 * │  │   │   └── page.js      → /meals/share                                │
 * │  │   └── [slug]/                                                        │
 * │  │       └── page.js      → /meals/:slug                                │
 * │  └── community/           → /community route (THIS FOLDER)              │
 * │      └── page.js          → /community (THIS FILE)                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * KEY POINTS:
 * - /community is at the same level as /meals in the folder hierarchy
 * - They are independent routes that don't share URL path segments
 * - Both share the same root layout (app/layout.js)
 *
 * ============================================================================
 */

import Link from 'next/link';

/**
 * COMMUNITY PAGE COMPONENT
 *
 * This page will showcase the food-loving community.
 * For now, it's a simple placeholder as per the exercise instructions.
 *
 * INSTRUCTOR QUOTE:
 * "Create those routes, add some links, but don't worry about styling or the
 * page content. In the next lecture, we're going to set up those routes together."
 *
 * FUTURE FUNCTIONALITY:
 * - Display community members
 * - Show community statistics
 * - Feature top contributors
 * - Social interaction features
 *
 * @returns {JSX.Element} The community page content
 */
export default function CommunityPage() {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Our Community
      </h1>

      <p style={{ color: '#ddd8d8', textAlign: 'center' }}>
        Join our food-loving community!
      </p>

      {/**
       * NAVIGATION LINKS
       *
       * Provides navigation to other parts of the app.
       */}
      <nav style={{ textAlign: 'center', marginTop: '2rem' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '1rem 0' }}>
            <Link href="/" style={{ color: '#f9572a' }}>
              Home
            </Link>
          </li>
          <li style={{ margin: '1rem 0' }}>
            <Link href="/meals" style={{ color: '#f9572a' }}>
              Browse Meals
            </Link>
          </li>
          <li style={{ margin: '1rem 0' }}>
            <Link href="/meals/share" style={{ color: '#f9572a' }}>
              Share a Meal
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}

/**
 * ============================================================================
 * LESSON 439 - EXERCISE SUMMARY: /community ROUTE
 * ============================================================================
 *
 * WHAT WE LEARNED:
 *
 * 1. SIBLING ROUTES are created by adding folders at the same level:
 *    - app/meals/ and app/community/ are siblings
 *    - Neither is nested inside the other
 *
 * 2. The URL structure mirrors the folder structure:
 *    - app/community/page.js → /community
 *    - Simple and predictable
 *
 * 3. All routes share the ROOT LAYOUT:
 *    - app/layout.js wraps all pages
 *    - The decorative SVG header appears on every page
 *
 * ============================================================================
 */
