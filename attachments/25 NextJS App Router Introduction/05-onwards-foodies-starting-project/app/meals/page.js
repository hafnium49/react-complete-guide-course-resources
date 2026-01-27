/**
 * ============================================================================
 * MEALS PAGE - LESSONS 450, 452 & 454: Suspense for Granular Loading States
 * ============================================================================
 *
 * LESSON 454 - WHY USE SUSPENSE INSTEAD OF loading.js?
 *
 * INSTRUCTOR QUOTE:
 * "But if we take a closer look at this meals page, we actually have that
 * header here, which does not depend on any loaded data at all. So it would
 * be great if we could show that header instantly and only show that loading
 * text whilst we're waiting for the meals to be fetched."
 *
 * THE PROBLEM WITH loading.js:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  loading.js replaces the ENTIRE page during loading                     │
 * │                                                                          │
 * │  LOADING STATE:              LOADED STATE:                              │
 * │  ┌───────────────────┐       ┌───────────────────┐                      │
 * │  │                   │       │     Header        │ ← Header is static!  │
 * │  │ "Fetching meals..." │  →  ├───────────────────┤                      │
 * │  │                   │       │   Meals Grid      │ ← Only this loads    │
 * │  └───────────────────┘       └───────────────────┘                      │
 * │                                                                          │
 * │  The header doesn't depend on data, but loading.js hides it anyway!     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * THE SOLUTION: React Suspense for granular control
 *
 * INSTRUCTOR QUOTE:
 * "So a better solution is to not use this loading.js file here, and hence,
 * I'll name it loading-out so that it does not have any special purpose
 * anymore, because that's now not a file name NextJS will be looking for."
 *
 * ============================================================================
 * HOW SUSPENSE PROVIDES GRANULAR LOADING STATES
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Instead, we can add a more granular loading state by going into that page
 * component and using an alternative approach. We can simply go to the place
 * where we have some operation that may take a bit longer, like fetching
 * the meals from the database, and we can then create a separate component."
 *
 * PAGE LAYOUT WITH SUSPENSE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  MealsPage (synchronous - renders immediately)                          │
 * │    <header> ← Shows instantly (no data dependency)                      │
 * │    <main>                                                               │
 * │      <Suspense fallback={loading...}>                                   │
 * │        <Meals /> ← Async component, shows fallback while loading        │
 * │      </Suspense>                                                        │
 * │  </>                                                                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

import Link from 'next/link';
import { Suspense } from 'react';

import classes from './page.module.css';

import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';

/**
 * ============================================================================
 * SEPARATE ASYNC COMPONENT FOR DATA FETCHING
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And I'll name this component Meals. And the idea behind this component is
 * that it's now this component that will fetch the data. So we can move that
 * code where we're calling get meals out of meals page, into this new
 * component function."
 *
 * WHY A SEPARATE COMPONENT?
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  • Suspense can only show fallback for child components                 │
 * │  • By extracting data fetching into a child, we control what "loads"    │
 * │  • The parent (MealsPage) renders instantly with static content         │
 * │  • Only this child component triggers the loading state                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "So this component here now is the one that will take a bit longer to
 * execute."
 *
 * @returns {Promise<JSX.Element>} MealsGrid with fetched data
 */
async function Meals() {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

/**
 * ============================================================================
 * MEALS PAGE - NOW SYNCHRONOUS WITH SUSPENSE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And that's a function that's built into React, the suspense function...
 * Suspense is a component provided by React that allows you to handle loading
 * states and show fallback content until some data or resource has been
 * loaded."
 *
 * KEY CHANGES FROM LESSON 452:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  BEFORE (Lesson 452):                 AFTER (Lesson 454):               │
 * │  ─────────────────────────────────    ────────────────────────────────  │
 * │  async function MealsPage() {         function MealsPage() {            │
 * │    const meals = await getMeals();      return (                        │
 * │    return (                               <>                            │
 * │      <>                                     <header>...</header>        │
 * │        <header>...</header>                 <Suspense fallback={...}>   │
 * │        <MealsGrid meals={meals} />            <Meals />                 │
 * │      </>                                    </Suspense>                 │
 * │    );                                     </>                           │
 * │  }                                      );                              │
 * │                                       }                                 │
 * │                                                                          │
 * │  • Page was async                     • Page is now sync (faster!)      │
 * │  • Entire page waited for data        • Header shows immediately        │
 * │  • loading.js for loading state       • Suspense for granular control   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @returns {JSX.Element} The meals listing page with Suspense boundary
 */
export default function MealsPage() {
  console.log('[MealsPage] rendered');

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created <span className={classes.highlight}>by you</span>
        </h1>

        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>

        <p className={classes.cta}>
          <Link href="/meals/share">
            Share Your Favorite Recipe
          </Link>
        </p>
      </header>

      <main>
        {/**
         * ================================================================
         * REACT SUSPENSE BOUNDARY
         * ================================================================
         *
         * INSTRUCTOR QUOTE:
         * "So we can now wrap this component with a component that's built
         * into React. We can wrap this here with the suspense component...
         * And I now have to import suspense from React."
         *
         * HOW SUSPENSE WORKS:
         * ┌──────────────────────────────────────────────────────────────┐
         * │  1. MealsPage renders, reaches Suspense boundary             │
         * │  2. React tries to render <Meals /> child                    │
         * │  3. Meals is async and starts fetching data                  │
         * │  4. While waiting, Suspense shows the fallback               │
         * │  5. When Meals resolves, it replaces the fallback            │
         * └──────────────────────────────────────────────────────────────┘
         *
         * INSTRUCTOR QUOTE:
         * "With that, you can specify a fallback prop on this suspense
         * component. And that fallback should be the content that should
         * be shown whilst this component here is waiting for the data to
         * be loaded."
         */}
        <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}

/**
 * ============================================================================
 * LESSON 454 - SUSPENSE FOR GRANULAR LOADING SUMMARY
 * ============================================================================
 *
 * WHAT WE LEARNED:
 *
 * 1. loading.js REPLACES THE ENTIRE PAGE
 *
 *    INSTRUCTOR QUOTE:
 *    "The problem with loading.js is that indeed the entire page is being
 *    replaced by this loading.js file's content."
 *
 * 2. SUSPENSE PROVIDES GRANULAR CONTROL
 *
 *    INSTRUCTOR QUOTE:
 *    "Now with that, if I save this, let me go back, let me reload this
 *    meals page, and now you see the header is there instantly. Only the
 *    meals are now being loaded."
 *
 * 3. EXTRACT ASYNC OPERATIONS INTO CHILD COMPONENTS
 *    - Create a separate component for data fetching
 *    - Wrap it with Suspense
 *    - Static content renders immediately
 *
 * 4. THE PATTERN:
 *    ┌─────────────────────────────────────────────────────────────────────┐
 *    │  <Suspense fallback={<LoadingUI />}>                                │
 *    │    <AsyncComponentThatFetchesData />                                │
 *    │  </Suspense>                                                        │
 *    └─────────────────────────────────────────────────────────────────────┘
 *
 * USER EXPERIENCE IMPROVEMENT:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  WITH loading.js:              WITH Suspense:                          │
 * │  ─────────────────────────     ─────────────────────────               │
 * │  ┌─────────────────────┐       ┌─────────────────────┐                 │
 * │  │ "Fetching meals..." │       │      HEADER         │ ← Instant!      │
 * │  │                     │       ├─────────────────────┤                 │
 * │  │                     │       │ "Fetching meals..." │ ← Only meals    │
 * │  └─────────────────────┘       └─────────────────────┘                 │
 * │                                                                         │
 * │  User sees blank page          User sees partial page immediately      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "And that is then this more granular approach which I typically prefer.
 * Though of course, if you truly have a page where all the content depends
 * on fetched data, adding a loading.js might be the better approach because
 * it requires less code."
 *
 * CURRENT STATE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ✓ Database set up with 7 dummy meals (Lesson 451)                      │
 * │  ✓ getMeals() function fetches all meals (Lesson 452)                   │
 * │  ✓ loading.js renamed to loading-out.js (disabled) (Lesson 454)         │
 * │  ✓ Suspense for granular loading state (Lesson 454)                     │
 * │  ✓ Header shows instantly, meals load separately (Lesson 454)           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
