/**
 * ============================================================================
 * MEAL DETAILS PAGE - BONUS LESSON 473: Loading Images from AWS S3
 * ============================================================================
 *
 * This page displays the full details of a single meal, including a large
 * hero image loaded from AWS S3.
 *
 * KEY CHANGE FOR S3 INTEGRATION:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  BEFORE (Local Storage):                                                │
 * │  <Image src={meal.image} ... />                                         │
 * │  Where meal.image = '/images/burger.jpg' (path to public folder)       │
 * │                                                                          │
 * │  AFTER (S3 Storage):                                                    │
 * │  <Image src={`https://bucket.s3.amazonaws.com/${meal.image}`} ... />   │
 * │  Where meal.image = 'burger.jpg' (just the filename/S3 Key)            │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * This is the same pattern used in the MealItem component - we construct
 * the full S3 URL by combining the bucket URL with the filename stored
 * in the database.
 *
 * ============================================================================
 */

import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getMeal } from '@/lib/meals';
import classes from './page.module.css';

/**
 * ============================================================================
 * DYNAMIC METADATA GENERATION - LESSON 475: Dynamic Page Metadata
 * ============================================================================
 *
 * For DYNAMIC ROUTES like /meals/[mealSlug], we can't use static metadata
 * because we don't know the meal title or description until we fetch the data.
 *
 * ============================================================================
 * WHY USE generateMetadata INSTEAD OF export const metadata?
 * ============================================================================
 *
 * From the instructor:
 * "For dynamic pages, you can add metadata by not exporting a constant or
 * variable named metadata, but by instead exporting an async function called
 * generateMetadata."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  STATIC PAGES (e.g., /meals)                                            │
 * │  → Use: export const metadata = { title: 'All Meals' }                  │
 * │  → Title is known at build time                                         │
 * │                                                                          │
 * │  DYNAMIC PAGES (e.g., /meals/[mealSlug])                                │
 * │  → Use: export async function generateMetadata({ params })              │
 * │  → Title depends on which meal is being viewed                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * HOW NEXT.JS DISCOVERS generateMetadata
 * ============================================================================
 *
 * From the instructor:
 * "It must be called like this because NextJS is also looking for functions
 * like this. If it doesn't find any other metadata, it's checking whether
 * there is such a function, and if there is such a function, NextJS will
 * execute it for you."
 *
 * Next.js metadata discovery order:
 * 1. Look for `export const metadata = { ... }`
 * 2. If not found, look for `export async function generateMetadata()`
 * 3. Execute the function and use the returned object as metadata
 *
 * ============================================================================
 * THE KEY INSIGHT: SAME PROPS AS PAGE COMPONENT
 * ============================================================================
 *
 * From the instructor:
 * "This function receives the same data our page component receives as props.
 * So here we also get an object with a params key, and that of course allows
 * us to get the meal for which the metadata should be generated."
 *
 * BOTH RECEIVE THE SAME DATA:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │   // generateMetadata receives:                                         │
 * │   export async function generateMetadata({ params }) {                  │
 * │     // params.mealSlug = 'burger'                                       │
 * │   }                                                                      │
 * │                                                                          │
 * │   // Page component receives THE SAME:                                  │
 * │   export default function MealDetailsPage({ params }) {                 │
 * │     // params.mealSlug = 'burger'                                       │
 * │   }                                                                      │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * This means we can fetch the meal data in generateMetadata and use it
 * to create dynamic titles like "Juicy Cheese Burger" instead of generic
 * titles like "Meal Details".
 *
 * ============================================================================
 * ⚠️  CRITICAL: ERROR HANDLING IN generateMetadata
 * ============================================================================
 *
 * From the instructor:
 * "Now if we enter some invalid slug here, we now get an error though
 * instead of the not found page because the metadata is actually generated
 * first and this now simply fails. When I try to access title on meal,
 * that fails because meal is undefined."
 *
 * THE PROBLEM:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │   URL: /meals/invalid-slug                                              │
 * │                                                                          │
 * │   1. Next.js calls generateMetadata({ params: { mealSlug: 'invalid' }}) │
 * │   2. getMeal('invalid') returns undefined (meal not found)              │
 * │   3. We try to access meal.title → ERROR! Cannot read 'title' of undef │
 * │   4. App crashes with error instead of showing 404 page                 │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * THE SOLUTION:
 * From the instructor:
 * "So therefore we should actually add this if check here, where we check
 * whether the meal is maybe not defined, and called the notFound function
 * if it isn't, inside of generateMetadata to ensure that we show the
 * notFound page if generating the metadata fails."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │   export async function generateMetadata({ params }) {                  │
 * │     const meal = getMeal(params.mealSlug);                              │
 * │                                                                          │
 * │     if (!meal) {                                                        │
 * │       notFound();  // ← MUST check here too, not just in page!         │
 * │     }                                                                   │
 * │                                                                          │
 * │     return { title: meal.title, description: meal.summary };            │
 * │   }                                                                      │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * WHY CHECK IN BOTH PLACES?
 * - generateMetadata runs BEFORE the page component renders
 * - If metadata generation fails, the page component never even runs
 * - So the notFound() check in the page component won't help if
 *   generateMetadata crashes first
 *
 * ============================================================================
 * EXECUTION ORDER
 * ============================================================================
 *
 * When visiting /meals/burger:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. generateMetadata({ params })  ← Runs FIRST                         │
 * │     └── Returns: { title: 'Juicy Cheese Burger', description: '...' }  │
 * │                                                                          │
 * │  2. MealDetailsPage({ params })   ← Runs SECOND                        │
 * │     └── Renders the page content                                        │
 * │                                                                          │
 * │  3. Next.js combines metadata + page content into final HTML           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * RESULT IN BROWSER
 * ============================================================================
 *
 * After implementing generateMetadata:
 *
 * From the instructor:
 * "With that, if we now visit a meal, we can see its title, its name
 * represented here in the tab title."
 *
 * EXAMPLES:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  URL                    │  Browser Tab Title                           │
 * │─────────────────────────┼──────────────────────────────────────────────│
 * │  /meals/burger          │  "Juicy Cheese Burger"                       │
 * │  /meals/schnitzel       │  "Wiener Schnitzel"                          │
 * │  /meals/curry           │  "Spicy Curry"                               │
 * │  /meals/invalid         │  → Shows 404 "Meal not found" page           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * DOCS REFERENCE:
 * https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 * ============================================================================
 */
export async function generateMetadata({ params }) {
  const meal = getMeal(params.mealSlug);

  /**
   * CRITICAL: Check if meal exists BEFORE accessing its properties!
   *
   * From the instructor:
   * "We should add this if check here... inside of generateMetadata to ensure
   * that we show the notFound page if generating the metadata fails, which it
   * does if we don't find that meal."
   *
   * Without this check:
   *   /meals/invalid → Crashes with "Cannot read property 'title' of undefined"
   *
   * With this check:
   *   /meals/invalid → Shows the custom not-found.js page
   */
  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

/**
 * ============================================================================
 * MEAL DETAILS PAGE COMPONENT - LESSON 475
 * ============================================================================
 *
 * Displays a single meal's full details including:
 * - Large hero image (from S3)
 * - Title and creator information
 * - Summary
 * - Full cooking instructions
 *
 * ============================================================================
 * WHY notFound() APPEARS IN BOTH PLACES
 * ============================================================================
 *
 * You'll notice we check `if (!meal) { notFound(); }` in BOTH:
 * 1. generateMetadata() - above
 * 2. MealDetailsPage() - this component
 *
 * This might seem redundant, but it's actually intentional:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  REASON 1: generateMetadata runs FIRST                                  │
 * │  ─────────────────────────────────────                                  │
 * │  If meal doesn't exist, generateMetadata catches it early and shows    │
 * │  the 404 page BEFORE the page component even tries to render.          │
 * │                                                                          │
 * │  REASON 2: Defense in depth                                             │
 * │  ─────────────────────────                                              │
 * │  The page component might be called directly in some edge cases,       │
 * │  or the data might change between the two calls. Having the check      │
 * │  in both places ensures we never accidentally render with undefined.   │
 * │                                                                          │
 * │  REASON 3: Code maintainability                                         │
 * │  ──────────────────────────────                                         │
 * │  If someone removes generateMetadata in the future, the page           │
 * │  component's check will still protect against undefined meals.         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @param {Object} props
 * @param {Object} props.params - Route parameters containing mealSlug
 */
export default function MealDetailsPage({ params }) {
  const meal = getMeal(params.mealSlug);

  /**
   * This check mirrors the one in generateMetadata above.
   * See the comment block above for why we check in both places.
   */
  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          {/**
           * ================================================================
           * S3 IMAGE URL CONSTRUCTION
           * ================================================================
           *
           * The `meal.image` field contains JUST THE FILENAME (e.g., 'burger.jpg'),
           * which is the S3 "Key" for the object.
           *
           * We construct the full S3 URL by prepending the bucket URL:
           *
           * DATABASE VALUE:  meal.image = 'burger.jpg'
           *
           * CONSTRUCTED URL:
           * ┌───────────────────────────────────────────────────────────────┐
           * │  https://maxschwarzmueller-nextjs-demo-users-image            │
           * │         .s3.amazonaws.com/burger.jpg                         │
           * └───────────────────────────────────────────────────────────────┘
           *
           * This is the same pattern used in:
           * - components/meals/meal-item.js (for meal grid cards)
           *
           * REQUIREMENTS FOR THIS TO WORK:
           * 1. S3 bucket must allow public read (configured via Bucket Policy)
           * 2. next.config.js must include this domain in remotePatterns
           * 3. The image file must exist in the S3 bucket with this exact name
           *
           * ⚠️  IMPORTANT: Replace the bucket URL with YOUR bucket URL!
           */}
          <Image
            src={`https://nextjs-foodies-dev-meals-images-960231572557.s3.ap-northeast-1.amazonaws.com/${meal.image}`}
            alt={meal.title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}

/**
 * ============================================================================
 * LESSON 473 - PAGE CHANGES SUMMARY
 * ============================================================================
 *
 * WHAT CHANGED:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  BEFORE:  src={meal.image}                                              │
 * │           → Expected: '/images/burger.jpg' (local path)                │
 * │                                                                          │
 * │  AFTER:   src={`https://bucket.s3.amazonaws.com/${meal.image}`}        │
 * │           → Expected: 'burger.jpg' (filename only)                      │
 * │           → Constructs full S3 URL                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * TWO PLACES USE S3 IMAGES:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. components/meals/meal-item.js  → Meal cards in grid               │
 * │  2. app/meals/[mealSlug]/page.js   → This page (meal details)         │
 * │                                                                          │
 * │  Both use the same S3 URL pattern. If you change your bucket,          │
 * │  update BOTH files!                                                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * IMPROVEMENT IDEA:
 * Create a constant or environment variable for the S3 base URL:
 *
 *   // In a config file or .env.local
 *   const S3_BASE_URL = 'https://bucket.s3.amazonaws.com';
 *
 *   // In components
 *   <Image src={`${S3_BASE_URL}/${meal.image}`} ... />
 *
 * This way, you only need to change the URL in one place!
 *
 * ============================================================================
 */
