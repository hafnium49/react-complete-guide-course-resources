/**
 * ============================================================================
 * MEALS DATA MODULE - BONUS LESSON 473: AWS S3 Cloud File Storage
 * ============================================================================
 *
 * WHY AWS S3 INSTEAD OF LOCAL FILE STORAGE?
 *
 * As explained in Lesson 472, storing uploaded files on the local filesystem
 * is problematic in production:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  LOCAL STORAGE PROBLEM:                                                 │
 * │                                                                          │
 * │  1. During build (npm run build), public/ is copied to .next/          │
 * │  2. Production server serves from .next/, not public/                  │
 * │  3. Runtime uploads to public/ are IGNORED by production server        │
 * │  4. User uploads work in dev but DISAPPEAR in production!              │
 * │                                                                          │
 * │  SOLUTION: Store files in cloud storage (AWS S3)                       │
 * │  → Files stored externally, accessible from anywhere                    │
 * │  → Works in development AND production                                  │
 * │  → Scales to any amount of storage                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * WHAT IS AWS S3?
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  AWS S3 (Simple Storage Service) is Amazon's cloud object storage.     │
 * │                                                                          │
 * │  KEY CONCEPTS:                                                          │
 * │  • Bucket: A container for storing objects (like a folder)             │
 * │  • Object: A file stored in a bucket (image, document, etc.)           │
 * │  • Key: The unique identifier (filename) for an object in a bucket     │
 * │                                                                          │
 * │  PRICING: Free tier available, then pay-per-use                        │
 * │  See: https://aws.amazon.com/s3/pricing/                               │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * REMOVED: Local File System Module
 * ============================================================================
 *
 * Previously we used:
 *   import fs from 'node:fs';
 *
 * This was used to write uploaded images to the local public/images/ folder.
 * Since we're now storing images in S3, we no longer need the fs module.
 *
 * The fs module code that was removed:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  const stream = fs.createWriteStream(`public/images/${fileName}`);     │
 * │  stream.write(Buffer.from(bufferedImage), (error) => { ... });         │
 * │  meal.image = `/images/${fileName}`;                                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * All of this is replaced with S3 SDK calls below.
 */
// import fs from 'node:fs';

/**
 * ============================================================================
 * AWS S3 SDK IMPORT
 * ============================================================================
 *
 * The @aws-sdk/client-s3 package is the official AWS SDK for interacting
 * with S3 from JavaScript/Node.js applications.
 *
 * INSTALLATION:
 * npm install @aws-sdk/client-s3
 *
 * WHAT IT PROVIDES:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  • S3 class: Main client for S3 operations                              │
 * │  • putObject: Upload files to a bucket                                  │
 * │  • getObject: Download files from a bucket                              │
 * │  • deleteObject: Remove files from a bucket                             │
 * │  • listObjects: List files in a bucket                                  │
 * │  • And many more operations...                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * We only need the S3 class for our use case (uploading images).
 */
import { S3 } from '@aws-sdk/client-s3';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

/**
 * ============================================================================
 * S3 CLIENT INITIALIZATION
 * ============================================================================
 *
 * Create an S3 client instance configured for your AWS region.
 *
 * CONFIGURATION OPTIONS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  region: The AWS region where your bucket is located                    │
 * │          Common regions:                                                │
 * │          • 'us-east-1' (N. Virginia - default/oldest)                  │
 * │          • 'us-west-2' (Oregon)                                         │
 * │          • 'eu-west-1' (Ireland)                                        │
 * │          • 'ap-northeast-1' (Tokyo)                                     │
 * │                                                                          │
 * │  credentials: AWS access keys (optional here - see below)               │
 * │          • accessKeyId: Your AWS access key                             │
 * │          • secretAccessKey: Your AWS secret key                         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * AUTHENTICATION - How the SDK gets your credentials:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  The AWS SDK automatically looks for credentials in this order:        │
 * │                                                                          │
 * │  1. Environment variables: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY    │
 * │  2. Shared credentials file: ~/.aws/credentials                         │
 * │  3. EC2 instance metadata (if running on AWS)                          │
 * │  4. Explicit credentials in constructor (not recommended for security) │
 * │                                                                          │
 * │  RECOMMENDED: Use environment variables via .env.local file            │
 * │                                                                          │
 * │  Create a .env.local file in your project root:                        │
 * │  ┌────────────────────────────────────────────────────────────────────┐│
 * │  │ AWS_ACCESS_KEY_ID=your-access-key-here                             ││
 * │  │ AWS_SECRET_ACCESS_KEY=your-secret-key-here                         ││
 * │  └────────────────────────────────────────────────────────────────────┘│
 * │                                                                          │
 * │  ⚠️  NEVER commit .env.local to Git! Add it to .gitignore              │
 * │  ⚠️  NEVER share your access keys with anyone!                         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * HOW TO GET AWS ACCESS KEYS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. Log into AWS Console (https://console.aws.amazon.com)              │
 * │  2. Click your account name (top right) → "Security Credentials"       │
 * │  3. Scroll to "Access Keys" section                                    │
 * │  4. Click "Create access key"                                          │
 * │  5. Copy both the Access Key ID and Secret Access Key                  │
 * │  6. Store them securely - you won't see the secret again!              │
 * │                                                                          │
 * │  Learn more: https://docs.aws.amazon.com/IAM/latest/UserGuide/         │
 * │              id_credentials_access-keys.html                            │
 * └─────────────────────────────────────────────────────────────────────────┘
 */
const s3 = new S3({
  /**
   * Region from environment variable, with fallback to 'us-east-1'.
   * Set AWS_REGION in your .env.local file to match your S3 bucket's region.
   */
  region: process.env.AWS_REGION || 'us-east-1',
  /**
   * OPTIONAL: Explicit credentials (not recommended for production)
   * The SDK will automatically use environment variables if available:
   * - AWS_ACCESS_KEY_ID
   * - AWS_SECRET_ACCESS_KEY
   * Only uncomment this if you have issues with automatic credential loading.
   */
  // credentials: {
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  // },
});

/**
 * Database connection - same as before (unchanged from local storage version)
 */
const db = sql('meals.db');

/**
 * Get all meals from the database (unchanged)
 */
export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // throw new Error('Loading meals failed');
  return db.prepare('SELECT * FROM meals').all();
}

/**
 * Get a single meal by slug (unchanged)
 */
export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

/**
 * ============================================================================
 * SAVE MEAL WITH S3 IMAGE UPLOAD
 * ============================================================================
 *
 * This function has been modified to upload images to AWS S3 instead of
 * saving them to the local public/images/ folder.
 *
 * COMPARISON - LOCAL vs S3:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  LOCAL STORAGE (OLD):                                                   │
 * │  1. Get file extension                                                  │
 * │  2. Create filename                                                     │
 * │  3. fs.createWriteStream('public/images/...')                          │
 * │  4. stream.write(buffer)                                               │
 * │  5. meal.image = '/images/filename.jpg'                                │
 * │                                                                          │
 * │  S3 STORAGE (NEW):                                                      │
 * │  1. Get file extension                                                  │
 * │  2. Create filename                                                     │
 * │  3. s3.putObject({ Bucket, Key, Body, ContentType })                   │
 * │  4. meal.image = 'filename.jpg'  (just the filename!)                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * NOTE: The image path stored in the database is now JUST the filename,
 * not the full path. The full S3 URL is constructed in the components
 * when displaying the image.
 *
 * @param {Object} meal - The meal object to save
 */
export async function saveMeal(meal) {
  /**
   * Generate slug from title (same as before)
   */
  meal.slug = slugify(meal.title, { lower: true });

  /**
   * Sanitize instructions for XSS protection (same as before)
   */
  meal.instructions = xss(meal.instructions);

  /**
   * Get file extension from uploaded image (same as before)
   */
  const extension = meal.image.name.split('.').pop();

  /**
   * Generate unique filename using slug (same as before)
   */
  const fileName = `${meal.slug}.${extension}`;

  /**
   * Convert image to buffer (same as before, but used differently)
   */
  const bufferedImage = await meal.image.arrayBuffer();

  /**
   * ================================================================
   * UPLOAD IMAGE TO S3
   * ================================================================
   *
   * s3.putObject() uploads a file to an S3 bucket.
   *
   * PARAMETERS:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  Bucket: The name of your S3 bucket                                │
   * │          Must match the bucket you created in AWS Console          │
   * │          Example: 'maxschwarzmueller-nextjs-demo-users-image'      │
   * │                                                                     │
   * │  Key:    The filename/path for the object in the bucket            │
   * │          This is how you'll reference the file later               │
   * │          Example: 'grandmas-apple-pie.jpg'                         │
   * │                                                                     │
   * │  Body:   The actual file content (as a Buffer)                     │
   * │          We convert ArrayBuffer → Buffer using Buffer.from()       │
   * │                                                                     │
   * │  ContentType: The MIME type of the file                            │
   * │          Tells browsers how to handle the file                     │
   * │          Example: 'image/jpeg', 'image/png'                        │
   * │          We get this from meal.image.type (File API property)      │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * WHAT HAPPENS AFTER UPLOAD:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  The image becomes accessible at:                                   │
   * │  https://{bucket-name}.s3.amazonaws.com/{key}                      │
   * │                                                                     │
   * │  Example:                                                           │
   * │  https://maxschwarzmueller-nextjs-demo-users-image.s3.amazonaws.com│
   * │         /grandmas-apple-pie.jpg                                    │
   * │                                                                     │
   * │  This URL works because we configured the bucket to allow public   │
   * │  read access via the Bucket Policy.                                │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * ⚠️  IMPORTANT: Replace the Bucket name with YOUR bucket name!
   */
  s3.putObject({
    Bucket: 'nextjs-foodies-dev-meals-images-960231572557',
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  /**
   * ================================================================
   * STORE FILENAME (NOT PATH) IN DATABASE
   * ================================================================
   *
   * KEY DIFFERENCE FROM LOCAL STORAGE:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  LOCAL:  meal.image = '/images/grandmas-apple-pie.jpg'             │
   * │          → Full path from root (for Next.js public folder)         │
   * │                                                                     │
   * │  S3:     meal.image = 'grandmas-apple-pie.jpg'                     │
   * │          → Just the filename (Key in S3 bucket)                    │
   * │          → Full URL is constructed when displaying the image       │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * This allows flexibility - if you change S3 buckets or regions,
   * you only need to update the URL in the display components,
   * not the database records.
   */
  meal.image = fileName;

  /**
   * Insert meal into database (same as before)
   */
  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}

/**
 * ============================================================================
 * LESSON 473 - AWS S3 INTEGRATION SUMMARY
 * ============================================================================
 *
 * SETUP STEPS (DO THESE IN AWS CONSOLE):
 *
 * 1. CREATE AWS ACCOUNT
 *    → https://aws.amazon.com
 *
 * 2. CREATE S3 BUCKET
 *    → Navigate to S3 Console
 *    → Click "Create Bucket"
 *    → Choose a globally unique name (e.g., yourname-nextjs-demo-images)
 *    → Confirm default settings
 *
 * 3. UPLOAD DUMMY IMAGES
 *    → Select your bucket
 *    → Click "Upload"
 *    → Drag & drop the images from public/images/
 *
 * 4. CONFIGURE BUCKET FOR PUBLIC ACCESS
 *    → Go to Permissions tab
 *    → Edit "Block public access" → Disable all checkboxes
 *    → Add Bucket Policy:
 *
 *    {
 *      "Version": "2012-10-17",
 *      "Statement": [
 *        {
 *          "Sid": "PublicRead",
 *          "Effect": "Allow",
 *          "Principal": "*",
 *          "Action": ["s3:GetObject", "s3:GetObjectVersion"],
 *          "Resource": ["arn:aws:s3:::YOUR-BUCKET-NAME/*"]
 *        }
 *      ]
 *    }
 *
 * 5. CREATE ACCESS KEYS
 *    → Click account name → Security Credentials
 *    → Create new Access Key
 *    → Save both keys securely
 *
 * 6. ADD ENVIRONMENT VARIABLES
 *    → Create .env.local in project root:
 *
 *    AWS_ACCESS_KEY_ID=your-access-key
 *    AWS_SECRET_ACCESS_KEY=your-secret-key
 *
 * CODE CHANGES SUMMARY:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FILE                        │ CHANGE                                   │
 * │  ────────────────────────────│──────────────────────────────────────────│
 * │  lib/meals.js                │ Import S3 SDK, use putObject for upload │
 * │  next.config.js              │ Add remotePatterns for S3 domain        │
 * │  initdb.js                   │ Change image paths to just filenames    │
 * │  components/meals/meal-item  │ Construct S3 URL for Image src          │
 * │  app/meals/[slug]/page.js    │ Construct S3 URL for Image src          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
