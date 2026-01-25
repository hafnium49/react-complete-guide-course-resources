/**
 * ============================================================================
 * SHARE MEAL PAGE - LESSON 440: Setting Up The Meals Routes
 * ============================================================================
 *
 * LESSON 440 - CREATING THE /meals/share NESTED ROUTE
 *
 * INSTRUCTOR QUOTE:
 * "Now the goal also was to add a nested route in that meals folder so that
 * we can also visit slash meals slash share."
 *
 * ============================================================================
 * NESTED ROUTES EXPLAINED
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And for that we can simply create a nested folder with again, that path
 * segment that we want to have as a folder name. And again, we need a page.js
 * file in there in order to be able to visit that."
 *
 * HOW NESTED ROUTES WORK:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FOLDER STRUCTURE:              RESULTING URL:                          │
 * │  ───────────────────────────    ─────────────────────────────────────── │
 * │  app/                           /                                       │
 * │  └── meals/                     /meals                                  │
 * │      └── share/                 /meals/share (nested!)                  │
 * │          └── page.js            → This file handles /meals/share        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * KEY INSIGHT:
 * - Nested folders = Nested URL paths
 * - Each level adds another segment to the URL
 * - meals + share = /meals/share
 *
 * ============================================================================
 */

/**
 * SHARE MEAL PAGE COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "And then of course, export a component function. So here are the share
 * meal page, that sounds like a fitting name. And then I'll return an H1
 * element where I say share meal."
 *
 * This is placeholder content. Later in this section, this page will contain:
 * - A form to submit new meals
 * - Image upload functionality
 * - Server Actions for form handling
 *
 * @returns {JSX.Element} The share meal page content
 */
export default function ShareMealPage() {
  return (
    <h1>Share Meal</h1>
  );
}

/**
 * ============================================================================
 * LESSON 440 - NESTED ROUTES SUMMARY
 * ============================================================================
 *
 * WHAT WE LEARNED:
 *
 * 1. NESTED FOLDERS = NESTED PATHS
 *    - Put a folder inside another folder
 *    - URL segments stack automatically
 *
 * 2. EACH LEVEL NEEDS page.js (if you want it visitable)
 *    - app/meals/page.js → /meals
 *    - app/meals/share/page.js → /meals/share
 *    - Both can exist independently!
 *
 * 3. COMPONENT NAMING IS FLEXIBLE
 *    - ShareMealPage is a descriptive choice
 *    - The export is what matters, not the name
 *
 * FOLDER STRUCTURE SO FAR:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  app/                                                                   │
 * │  ├── page.js              → /                                           │
 * │  └── meals/                                                             │
 * │      ├── page.js          → /meals                                      │
 * │      └── share/                                                         │
 * │          └── page.js      → /meals/share (THIS FILE)                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
