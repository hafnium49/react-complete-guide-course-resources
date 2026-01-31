/**
 * ============================================================================
 * MEALS NOT FOUND PAGE - LESSON 476 Section Summary Reference
 * ============================================================================
 *
 * This is a ROUTE-SPECIFIC not-found page for the /meals route and its
 * children (like /meals/[mealSlug]).
 *
 * ============================================================================
 * NESTED NOT-FOUND PAGES
 * ============================================================================
 *
 * Next.js allows you to have not-found pages at different levels:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ROUTE                  │  NOT-FOUND FILE USED                         │
 * │─────────────────────────┼──────────────────────────────────────────────│
 * │  /invalid-route         │  app/not-found.js (root)                     │
 * │  /meals/invalid-slug    │  app/meals/not-found.js (THIS FILE) ✓       │
 * │  /meals/share/invalid   │  app/meals/not-found.js (bubbles up)        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * WHEN THIS PAGE IS SHOWN
 * ============================================================================
 *
 * This page is shown when notFound() is called from within the /meals routes:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  // In app/meals/[mealSlug]/page.js:                                    │
 * │                                                                          │
 * │  export async function generateMetadata({ params }) {                   │
 * │    const meal = getMeal(params.mealSlug);                               │
 * │    if (!meal) {                                                         │
 * │      notFound();  // ← Shows THIS page (app/meals/not-found.js)        │
 * │    }                                                                    │
 * │    ...                                                                  │
 * │  }                                                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * WHY HAVE A MEALS-SPECIFIC NOT-FOUND?
 * ============================================================================
 *
 * GENERIC (app/not-found.js):
 *   "Unfortunately, we could not find the requested page or resource."
 *
 * SPECIFIC (this file):
 *   "Unfortunately, we could not find the requested page or meal data."
 *
 * The specific message is more helpful for users who are looking for a meal.
 * They know it's not just any 404, but specifically that the MEAL wasn't found.
 *
 * ============================================================================
 */

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>Meal not found</h1>
      <p>Unfortunately, we could not find the requested page or meal data.</p>
    </main>
  );
}
