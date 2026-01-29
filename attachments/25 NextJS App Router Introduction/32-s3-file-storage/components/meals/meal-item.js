/**
 * ============================================================================
 * MEAL ITEM COMPONENT - BONUS LESSON 473: Loading Images from AWS S3
 * ============================================================================
 *
 * This component displays a single meal card in the meals grid.
 *
 * KEY CHANGE FOR S3 INTEGRATION:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  BEFORE (Local Storage):                                                │
 * │  <Image src={image} ... />                                              │
 * │  Where image = '/images/burger.jpg' (path to public folder)            │
 * │                                                                          │
 * │  AFTER (S3 Storage):                                                    │
 * │  <Image src={`https://bucket.s3.amazonaws.com/${image}`} ... />        │
 * │  Where image = 'burger.jpg' (just the filename/S3 Key)                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * WHY CONSTRUCT THE URL IN THE COMPONENT?
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FLEXIBILITY:                                                           │
 * │  • If you change S3 buckets, update ONE place (here)                   │
 * │  • Database stores just the filename (portable)                        │
 * │  • Could easily switch to different CDN/storage                        │
 * │                                                                          │
 * │  ALTERNATIVE: Store full URL in database                               │
 * │  • Pro: Simpler component code                                         │
 * │  • Con: Need to update ALL database records if bucket changes          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-item.module.css';

/**
 * MealItem Component
 *
 * @param {Object} props
 * @param {string} props.title - The meal title
 * @param {string} props.slug - URL-friendly identifier for the meal
 * @param {string} props.image - The image FILENAME (S3 Key), e.g., 'burger.jpg'
 * @param {string} props.summary - Brief description of the meal
 * @param {string} props.creator - Name of the person who created this meal
 */
export default function MealItem({ title, slug, image, summary, creator }) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          {/**
           * ================================================================
           * S3 IMAGE URL CONSTRUCTION
           * ================================================================
           *
           * The `image` prop contains JUST THE FILENAME (e.g., 'burger.jpg'),
           * which is the S3 "Key" for the object.
           *
           * We construct the full S3 URL by prepending the bucket URL:
           *
           * S3 URL FORMAT:
           * ┌───────────────────────────────────────────────────────────────┐
           * │  https://{bucket-name}.s3.amazonaws.com/{key}                │
           * │                                                               │
           * │  Example:                                                     │
           * │  https://maxschwarzmueller-nextjs-demo-users-image            │
           * │         .s3.amazonaws.com/burger.jpg                         │
           * └───────────────────────────────────────────────────────────────┘
           *
           * REQUIREMENTS FOR THIS TO WORK:
           * 1. S3 bucket must allow public read (configured via Bucket Policy)
           * 2. next.config.js must include this domain in remotePatterns
           * 3. The image file must exist in the S3 bucket with this exact name
           *
           * ⚠️  IMPORTANT: Replace the bucket URL with YOUR bucket URL!
           */}
          <Image
            src={`https://nextjs-foodies-dev-meals-images-960231572557.s3.ap-northeast-1.amazonaws.com/${image}`}
            alt={title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}

/**
 * ============================================================================
 * LESSON 473 - COMPONENT CHANGES SUMMARY
 * ============================================================================
 *
 * WHAT CHANGED:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  BEFORE:  src={image}                                                   │
 * │           → Expected: '/images/burger.jpg' (local path)                │
 * │                                                                          │
 * │  AFTER:   src={`https://bucket.s3.amazonaws.com/${image}`}             │
 * │           → Expected: 'burger.jpg' (filename only)                      │
 * │           → Constructs full S3 URL                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ALSO REQUIRED:
 * • next.config.js must allow this S3 domain in remotePatterns
 * • S3 bucket must be configured for public read access
 *
 * ============================================================================
 */
