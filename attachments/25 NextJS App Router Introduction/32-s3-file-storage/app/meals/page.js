/**
 * ============================================================================
 * MEALS PAGE - LESSON 474: Adding Static Page Metadata
 * ============================================================================
 *
 * This page displays all meals in the community. It demonstrates how
 * PAGE-SPECIFIC METADATA overrides the default metadata from the root layout.
 *
 * ============================================================================
 * METADATA OVERRIDE DEMONSTRATION
 * ============================================================================
 *
 * From the instructor:
 * "If you add this metadata to a layout, it will automatically be added
 * to all the pages that are wrapped by that layout UNLESS a page specifies
 * its own metadata. In that case, the page metadata wins."
 *
 * WHAT HAPPENS ON THIS PAGE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │   ROOT LAYOUT (app/layout.js)                                           │
 * │   └── metadata.title: "NextLevel Food"                                  │
 * │   └── metadata.description: "Delicious meals, shared by..."             │
 * │                     │                                                    │
 * │                     ▼                                                    │
 * │   THIS PAGE (app/meals/page.js)                                         │
 * │   └── metadata.title: "All Meals"               ← OVERRIDES root!       │
 * │   └── metadata.description: "Browse the..."     ← OVERRIDES root!       │
 * │                                                                          │
 * │   RESULT IN BROWSER TAB: "All Meals"                                    │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * WHY PAGE-SPECIFIC METADATA MATTERS
 * ============================================================================
 *
 * Each page should have descriptive metadata for:
 *
 * 1. USER EXPERIENCE:
 *    - Users can identify the page from their browser tabs
 *    - "All Meals" is more descriptive than "NextLevel Food" when
 *      browsing the meals listing
 *
 * 2. SEO (Search Engine Optimization):
 *    - Search engines index pages with their specific titles
 *    - "All Meals - Browse delicious recipes" ranks better for
 *      people searching for meal recipes
 *
 * 3. SOCIAL SHARING:
 *    - When someone shares /meals on social media, they see
 *      "All Meals" as the title, not the generic site name
 *
 * ============================================================================
 * STATIC METADATA SYNTAX
 * ============================================================================
 *
 * For pages with FIXED content (like this meals listing), use:
 *
 *   export const metadata = {
 *     title: 'Page Title',
 *     description: 'Page description for SEO',
 *   };
 *
 * This is called STATIC METADATA because the values are known at build time.
 *
 * ============================================================================
 * COMPARISON: STATIC vs DYNAMIC METADATA
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  STATIC METADATA (this page)                                            │
 * │  ─────────────────────────────                                          │
 * │  • Use: export const metadata = { ... }                                 │
 * │  • When: Page content is fixed/known at build time                      │
 * │  • Example: /meals → "All Meals"                                        │
 * │  • Example: /meals/share → "Share a Meal"                               │
 * │                                                                          │
 * │  DYNAMIC METADATA (see [mealSlug]/page.js)                              │
 * │  ────────────────────────────────────────                               │
 * │  • Use: export async function generateMetadata({ params }) { ... }      │
 * │  • When: Page content depends on route params or fetched data           │
 * │  • Example: /meals/burger → "Juicy Cheese Burger"                       │
 * │  • Example: /meals/schnitzel → "Wiener Schnitzel"                       │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * DOCS REFERENCE:
 * https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 * ============================================================================
 */

import { Suspense } from 'react';
import Link from 'next/link';

import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';

/**
 * PAGE-SPECIFIC METADATA
 *
 * This metadata OVERRIDES the root layout's metadata for this page.
 * When a user visits /meals, they will see:
 * - Browser tab: "All Meals"
 * - Search results: "All Meals" with description "Browse the delicious..."
 *
 * The root layout's "NextLevel Food" title is NOT used on this page
 * because we've defined our own metadata here.
 */
export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community.',
};

async function Meals() {
  console.log('Fetching meals');
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
