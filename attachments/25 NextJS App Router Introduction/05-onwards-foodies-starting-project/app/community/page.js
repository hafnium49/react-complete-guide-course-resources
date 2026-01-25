/**
 * ============================================================================
 * COMMUNITY PAGE - LESSON 440: Setting Up The Meals Routes
 * ============================================================================
 *
 * LESSON 440 - CREATING THE /community ROUTE (SIBLING ROUTE)
 *
 * INSTRUCTOR QUOTE:
 * "But there also is another route, not nested into the meals folder, but
 * instead a sibling to the meals folder. And that is the community route."
 *
 * ============================================================================
 * SIBLING vs NESTED ROUTES
 * ============================================================================
 *
 * SIBLING ROUTE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  app/                                                                   │
 * │  ├── meals/           ← One top-level route                             │
 * │  │   └── page.js      → /meals                                          │
 * │  └── community/       ← SIBLING (same level as meals)                   │
 * │      └── page.js      → /community (THIS FILE)                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * NESTED ROUTE (for comparison):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  app/                                                                   │
 * │  └── meals/                                                             │
 * │      └── share/       ← NESTED (inside meals)                           │
 * │          └── page.js  → /meals/share                                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * KEY DIFFERENCE:
 * - SIBLING: Folders at the same level → separate URL paths
 * - NESTED: Folder inside another → combined URL path
 *
 * ============================================================================
 */

/**
 * COMMUNITY PAGE COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "And again, in here we add a page.js file, and then export our community
 * page component here, and then simply return H1 community."
 *
 * This is placeholder content. Later in this section, this page might contain:
 * - Information about the food-loving community
 * - Community statistics
 * - Featured contributors
 *
 * @returns {JSX.Element} The community page content
 */
export default function CommunityPage() {
  return (
    <h1>Community</h1>
  );
}

/**
 * ============================================================================
 * LESSON 440 - SIBLING ROUTES SUMMARY
 * ============================================================================
 *
 * WHAT WE LEARNED:
 *
 * 1. SIBLING ROUTES are folders at the SAME LEVEL
 *    - app/meals/ and app/community/ are siblings
 *    - They create separate, unrelated URL paths
 *
 * 2. DIFFERENCE FROM NESTED:
 *    - Sibling: /meals and /community (independent)
 *    - Nested: /meals and /meals/share (share is inside meals)
 *
 * 3. ALL ROUTES SHARE THE ROOT LAYOUT
 *    - app/layout.js wraps everything
 *    - Consistent UI elements appear on all pages
 *
 * COMPLETE ROUTE STRUCTURE AFTER THIS LESSON:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ROUTE              │  FILE                       │  TYPE               │
 * │  ───────────────────│─────────────────────────────│─────────────────────│
 * │  /                  │  app/page.js                │  Home page          │
 * │  /meals             │  app/meals/page.js          │  Sibling route      │
 * │  /meals/share       │  app/meals/share/page.js    │  Nested route       │
 * │  /community         │  app/community/page.js      │  Sibling route      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
