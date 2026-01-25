/**
 * ============================================================================
 * SHARE MEAL PAGE - LESSON 439: Exercise - Adding More Routes
 * ============================================================================
 *
 * LESSON 439 - EXERCISE: CREATE THE /meals/share NESTED ROUTE
 *
 * INSTRUCTOR QUOTE:
 * "I want you to create a meals route, a /meals/share route, so a nested
 * route in the meals route with an extra path of share..."
 *
 * ============================================================================
 * NESTED ROUTES IN NEXT.JS
 * ============================================================================
 *
 * HOW NESTED ROUTES WORK:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FOLDER STRUCTURE:              URL ROUTE:                              │
 * │  ───────────────────────────    ─────────────────────────────────────── │
 * │  app/                           /                                       │
 * │  └── meals/                     /meals                                  │
 * │      ├── page.js                → /meals                                │
 * │      └── share/                 /meals/share (nested folder!)           │
 * │          └── page.js            → /meals/share (THIS FILE)              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * KEY POINTS ABOUT NESTED ROUTES:
 * - Create a subfolder inside an existing route folder
 * - The path segments stack: meals + share = /meals/share
 * - Each folder with a page.js becomes its own accessible route
 * - Both /meals AND /meals/share are valid routes
 *
 * ============================================================================
 * ROUTE HIERARCHY
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  /                    → app/page.js          (Home)                     │
 * │  /meals               → app/meals/page.js    (Meals listing)            │
 * │  /meals/share         → app/meals/share/page.js (THIS FILE - Form)      │
 * │  /meals/[slug]        → app/meals/[slug]/page.js (Individual meal)      │
 * │  /community           → app/community/page.js (Community page)          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

import Link from 'next/link';

/**
 * SHARE MEAL PAGE COMPONENT
 *
 * This page will eventually contain a form for users to share their own meals.
 * For now, it's a simple placeholder as per the exercise instructions.
 *
 * INSTRUCTOR QUOTE:
 * "Create those routes, add some links, but don't worry about styling or the
 * page content. In the next lecture, we're going to set up those routes together."
 *
 * FUTURE FUNCTIONALITY:
 * - Form to submit meal name, description, instructions
 * - Image upload capability
 * - Server Action to handle form submission
 * - Database storage of new meals
 *
 * @returns {JSX.Element} The share meal page content
 */
export default function ShareMealPage() {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Share Your Meal
      </h1>

      <p style={{ color: '#ddd8d8', textAlign: 'center' }}>
        This page will contain a form to share your favorite meals!
      </p>

      {/**
       * NAVIGATION LINKS
       *
       * Provides navigation back to other parts of the app.
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
 * LESSON 439 - EXERCISE SUMMARY: /meals/share NESTED ROUTE
 * ============================================================================
 *
 * WHAT WE LEARNED:
 *
 * 1. NESTED ROUTES are created by nesting folders:
 *    - app/meals/share/page.js → /meals/share
 *
 * 2. Each path segment = one folder level:
 *    - "meals" folder creates /meals
 *    - "share" folder inside creates /meals/share
 *
 * 3. Both parent and child routes can have their own page.js:
 *    - /meals has its own page (meals listing)
 *    - /meals/share has its own page (share form)
 *
 * 4. This is different from having ONLY a dynamic route:
 *    - /meals/share is a STATIC nested route
 *    - /meals/[slug] is a DYNAMIC route
 *    - Both can coexist! Next.js matches static routes first.
 *
 * ============================================================================
 */
