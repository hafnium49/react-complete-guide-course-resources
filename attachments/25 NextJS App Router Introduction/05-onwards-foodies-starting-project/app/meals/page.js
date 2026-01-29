/**
 * ============================================================================
 * MEALS PAGE - LESSONS 450, 452, 454 & 470: Suspense & Production Caching
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
 * ============================================================================
 * LESSON 470 - PRODUCTION CACHING PROBLEM
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And I can prove that we can simply console log, fetching meals here in
 * that meals component that's being used by the meals page."
 *
 * WHAT HAPPENS IN DEVELOPMENT vs PRODUCTION:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  DEVELOPMENT (npm run dev):                                             │
 * │  • Pages are rendered on every request                                  │
 * │  • getMeals() is called each time → you see the loading state           │
 * │  • "Fetching meals" logs to terminal on each visit                      │
 * │  • New data appears immediately after adding a meal                     │
 * │                                                                          │
 * │  PRODUCTION (npm run build + npm start):                                │
 * │  • Pages are pre-rendered during build                                  │
 * │  • getMeals() is called ONCE during build → cached as static HTML       │
 * │  • "Fetching meals" only logs during build, NOT on visits               │
 * │  • New data does NOT appear until cache is revalidated!                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "Because when you run this NPM run build command to prepare the app for
 * production, NextJS goes ahead and actually generates, pre-renders all the
 * pages of your app that can be pre-generated."
 *
 * WHY THE LOADING STATE DOESN'T SHOW IN PRODUCTION:
 *
 * INSTRUCTOR QUOTE:
 * "So that's why we no longer see any loading indicator because NextJS was
 * able to pre-render that page and therefore it can just send it to us
 * instantly. And that's actually a great thing because it means that users
 * visiting this page get an instant experience."
 *
 * THE CACHING PROBLEM (WHY NEW MEALS DON'T APPEAR):
 *
 * INSTRUCTOR QUOTE:
 * "Now what's the problem then? Well, the problem is that when you update
 * data so, for example, when I share a new meal now if I do that, this of
 * course takes us to the meals page, but you'll notice that that new meal
 * we just added is nowhere to be found."
 *
 * INSTRUCTOR QUOTE:
 * "And that's the case because this data here was fetched during the build
 * process when the project was prepared for production. And NextJS then
 * caches those pre-rendered pages so that it's able to serve them to all
 * visitors."
 *
 * THE CACHE VISUALIZATION:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  BUILD TIME (npm run build):                                            │
 * │  ┌─────────────────────┐      ┌──────────────────────┐                  │
 * │  │ getMeals() called   │  →   │ meals: [A, B, C, D]  │  → Cached HTML   │
 * │  └─────────────────────┘      └──────────────────────┘                  │
 * │                                                                          │
 * │  RUNTIME (user adds meal E):                                            │
 * │  ┌─────────────────────┐      ┌──────────────────────┐                  │
 * │  │ Database now has:   │      │ Cache STILL shows:   │                  │
 * │  │ [A, B, C, D, E]     │      │ [A, B, C, D]         │  ← STALE!        │
 * │  └─────────────────────┘      └──────────────────────┘                  │
 * │                                                                          │
 * │  The new meal E is in the database but NOT in the cached page!          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * NEXT LESSON WILL COVER:
 * → How to use revalidatePath to invalidate the cache
 * → Triggering cache revalidation when data changes
 *
 * @returns {Promise<JSX.Element>} MealsGrid with fetched data
 */
async function Meals() {
  /**
   * CONSOLE.LOG FOR DEMONSTRATING CACHING BEHAVIOR (LESSON 470)
   *
   * INSTRUCTOR QUOTE:
   * "And I can prove that we can simply console log, fetching meals here in
   * that meals component that's being used by the meals page."
   *
   * WHAT TO OBSERVE:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  WITH npm run dev:                                                  │
   * │  • "Fetching meals" logs EVERY time you visit /meals                │
   * │  • Loading state shows for ~2 seconds (simulated delay)             │
   * │                                                                      │
   * │  WITH npm run build + npm start:                                    │
   * │  • "Fetching meals" logs ONLY ONCE during build                     │
   * │  • Loading state NEVER shows (page served from cache)               │
   * │  • Revisiting /meals does NOT trigger this log                      │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  console.log('Fetching meals');

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
 * LESSONS 454 & 470 - SUSPENSE & PRODUCTION CACHING SUMMARY
 * ============================================================================
 *
 * WHAT WE LEARNED (LESSON 454):
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
 * ============================================================================
 * WHAT WE LEARNED (LESSON 470) - PRODUCTION CACHING
 * ============================================================================
 *
 * 5. NEXT.JS PRE-RENDERS PAGES AT BUILD TIME
 *
 *    INSTRUCTOR QUOTE:
 *    "Because when you run this NPM run build command to prepare the app for
 *    production, NextJS goes ahead and actually generates, pre-renders all
 *    the pages of your app that can be pre-generated."
 *
 * 6. PRE-RENDERED PAGES ARE CACHED
 *
 *    INSTRUCTOR QUOTE:
 *    "And NextJS then caches those pre-rendered pages so that it's able to
 *    serve them to all visitors."
 *
 * 7. CACHED DATA BECOMES STALE
 *
 *    INSTRUCTOR QUOTE:
 *    "And that's the case because this data here was fetched during the build
 *    process when the project was prepared for production."
 *
 *    RESULT: New meals added after build don't appear on the page!
 *
 * 8. THE TRADE-OFF: SPEED vs FRESHNESS
 *    ┌─────────────────────────────────────────────────────────────────────┐
 *    │  BENEFIT: Instant page loads (pages served from cache)              │
 *    │  PROBLEM: Stale data (new content doesn't appear)                   │
 *    │                                                                      │
 *    │  SOLUTION: Cache revalidation (covered in next lesson)              │
 *    └─────────────────────────────────────────────────────────────────────┘
 *
 * HOW TO TEST CACHING BEHAVIOR:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. npm run build        (build for production)                         │
 * │     → Watch terminal: "Fetching meals" logs ONCE                       │
 * │                                                                          │
 * │  2. npm start            (start production server)                      │
 * │     → Visit /meals: Page loads INSTANTLY (from cache)                  │
 * │     → Terminal: NO "Fetching meals" log                                │
 * │                                                                          │
 * │  3. Add a new meal via /meals/share                                    │
 * │     → Return to /meals: NEW MEAL IS NOT VISIBLE!                       │
 * │     → This is the caching problem!                                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * CURRENT STATE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ✓ Database set up with 7 dummy meals (Lesson 451)                      │
 * │  ✓ getMeals() function fetches all meals (Lesson 452)                   │
 * │  ✓ loading.js renamed to loading-out.js (disabled) (Lesson 454)         │
 * │  ✓ Suspense for granular loading state (Lesson 454)                     │
 * │  ✓ Header shows instantly, meals load separately (Lesson 454)           │
 * │  ✓ Production caching problem identified (Lesson 470)                   │
 * │  ✓ Cache revalidation with revalidatePath (Lesson 471)                  │
 * │  ✓ Production image storage limitation explained (Lesson 472)           │
 * │  → Next: Image optimization with Next.js Image component                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
