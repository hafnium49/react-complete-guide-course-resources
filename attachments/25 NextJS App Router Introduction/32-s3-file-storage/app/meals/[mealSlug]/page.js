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
 * DYNAMIC METADATA GENERATION
 * ============================================================================
 *
 * This function generates page-specific metadata (title, description) based
 * on the meal data. This is unchanged from the local storage version.
 */
export async function generateMetadata({ params }) {
  const meal = getMeal(params.mealSlug);

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
 * MEAL DETAILS PAGE COMPONENT
 * ============================================================================
 *
 * Displays a single meal's full details including:
 * - Large hero image (from S3)
 * - Title and creator information
 * - Summary
 * - Full cooking instructions
 *
 * @param {Object} props
 * @param {Object} props.params - Route parameters containing mealSlug
 */
export default function MealDetailsPage({ params }) {
  const meal = getMeal(params.mealSlug);

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
