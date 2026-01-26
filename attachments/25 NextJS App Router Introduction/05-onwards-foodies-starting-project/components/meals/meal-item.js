/**
 * ============================================================================
 * MEAL ITEM COMPONENT - LESSON 450: Outputting Meals Data & Images
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And I prepared a meal-item.module.css file, which is also attached.
 * And attached you'll also find my finished meal-item.js file, which is a
 * relatively straightforward component that simply accepts a bunch of props
 * and then outputs those props in a structured way."
 *
 * PURPOSE:
 * This component renders a single meal card with:
 * - An image of the meal
 * - Title and creator information
 * - A brief summary
 * - A link to the meal's detail page
 *
 * ============================================================================
 */

/**
 * IMPORTING LINK FOR DYNAMIC NAVIGATION
 *
 * INSTRUCTOR QUOTE:
 * "Now what's interesting about this component is, for one, that it then has
 * a link that takes us to a specific meal detail page."
 */
import Link from 'next/link';

/**
 * ============================================================================
 * IMPORTING THE NEXT.JS IMAGE COMPONENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "The other interesting thing is this image component. It's this next/image
 * component. And it's interesting here because the images I'm outputting here
 * will now not be imported manually from the assets folder."
 *
 * WHY THE IMAGE COMPONENT IS USED DIFFERENTLY HERE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  PREVIOUS USAGE (in MainHeader):                                        │
 * │  - Images imported from local filesystem                                │
 * │  - import logoImg from '@/assets/logo.png';                             │
 * │  - Next.js can detect width/height automatically                        │
 * │                                                                          │
 * │  THIS USAGE (MealItem):                                                 │
 * │  - Images loaded dynamically from database                              │
 * │  - src={image} where image is a path string like '/images/burger.jpg'   │
 * │  - Next.js CANNOT detect width/height automatically                     │
 * │  - Must use `fill` prop or explicit width/height                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 */
import Image from 'next/image';

/**
 * CSS Module import for meal item styles.
 */
import classes from './meal-item.module.css';

/**
 * MEAL ITEM COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "...which is a relatively straightforward component that simply accepts
 * a bunch of props and then outputs those props in a structured way."
 *
 * EXPECTED PROPS:
 * - title: The name of the meal (e.g., "Juicy Cheese Burger")
 * - slug: URL-friendly identifier (e.g., "juicy-cheese-burger")
 * - image: Path to the image in the public folder (e.g., "/images/burger.jpg")
 * - summary: Brief description of the meal
 * - creator: Name of the person who shared the meal
 *
 * @param {Object} props - The meal data
 * @returns {JSX.Element} A meal card with image, info, and link
 */
export default function MealItem({ title, slug, image, summary, creator }) {
  return (
    <article className={classes.meal}>
      {/**
       * MEAL CARD HEADER
       *
       * Contains the image and title/creator information.
       */}
      <header>
        {/**
         * ================================================================
         * LESSON 450 - IMAGE WITH FILL PROP (DYNAMIC IMAGES)
         * ================================================================
         *
         * INSTRUCTOR QUOTE:
         * "It's able to detect that automatically when you are using the
         * image component as we did it in the header on an image that's
         * imported from the local filesystem... But for those meal items,
         * we'll load them dynamically from a database."
         *
         * THE PROBLEM WITH DYNAMIC IMAGES:
         *
         * INSTRUCTOR QUOTE:
         * "And then in the database, we'll have a path pointing to some
         * image, and NextJS will not be able to resolve the width and
         * height of such an image, of such a dynamically loaded and
         * resolved image simply because the information is not available
         * at build time, as it's the case for all imported images, but
         * only at runtime."
         *
         * WHY width/height ARE NORMALLY REQUIRED:
         * ┌─────────────────────────────────────────────────────────────┐
         * │  The Image component needs dimensions to:                   │
         * │  - Prevent Cumulative Layout Shift (CLS)                    │
         * │  - Reserve the correct space before image loads             │
         * │  - Generate appropriate srcset for responsive images        │
         * └─────────────────────────────────────────────────────────────┘
         *
         * THE fill PROP SOLUTION:
         *
         * INSTRUCTOR QUOTE:
         * "And that's why I added this special fill prop here. An
         * alternative would've been to explicitly set the width and
         * height of the images that will be output here, but the problem
         * is that I don't know that in advance because we'll also be
         * dealing with images shared by the user."
         *
         * INSTRUCTOR QUOTE:
         * "And in such scenarios, fill is an alternative. This then
         * tells NextJS that it should simply fill the available space
         * with that image as defined by its parent components."
         *
         * HOW fill WORKS:
         * ┌─────────────────────────────────────────────────────────────┐
         * │  1. Parent container MUST have position: relative           │
         * │  2. Image becomes position: absolute                        │
         * │  3. Image fills the parent's dimensions completely          │
         * │  4. CSS controls the actual size via the parent             │
         * │  5. object-fit: cover ensures proper scaling                │
         * └─────────────────────────────────────────────────────────────┘
         *
         * WHEN TO USE fill vs width/height:
         * ┌─────────────────────────────────────────────────────────────┐
         * │  USE fill WHEN:                                             │
         * │  ✓ Image dimensions unknown at build time                   │
         * │  ✓ Images uploaded by users                                 │
         * │  ✓ Images from external sources/databases                   │
         * │  ✓ You want CSS to control the size                         │
         * │                                                              │
         * │  USE width/height WHEN:                                     │
         * │  ✓ Image dimensions are known in advance                    │
         * │  ✓ Images are imported locally                              │
         * │  ✓ You want explicit control over dimensions                │
         * └─────────────────────────────────────────────────────────────┘
         *
         * NOTE: The parent div has position: relative in the CSS
         * (see .image class in meal-item.module.css)
         */}
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
        </div>

        {/**
         * TITLE AND CREATOR INFO
         *
         * Displays the meal name and who created/shared it.
         */}
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>

      {/**
       * MEAL CARD CONTENT
       *
       * Contains the summary and action button.
       */}
      <div className={classes.content}>
        {/**
         * MEAL SUMMARY
         *
         * A brief description of the meal to entice users.
         */}
        <p className={classes.summary}>{summary}</p>

        {/**
         * ================================================================
         * DYNAMIC LINK TO MEAL DETAIL PAGE
         * ================================================================
         *
         * INSTRUCTOR QUOTE:
         * "Now what's interesting about this component is, for one, that
         * it then has a link that takes us to a specific meal detail page.
         * And here, the path is constructed dynamically with a dynamically
         * injected segment that will be different for every meal because
         * we have that dynamic meal details page."
         *
         * HOW THE DYNAMIC PATH WORKS:
         * ┌─────────────────────────────────────────────────────────────┐
         * │  Template literal: `/meals/${slug}`                         │
         * │                                                              │
         * │  EXAMPLE VALUES:                                            │
         * │  - slug = "juicy-cheese-burger"                             │
         * │  - href = "/meals/juicy-cheese-burger"                      │
         * │                                                              │
         * │  This matches the dynamic route:                            │
         * │  app/meals/[mealSlug]/page.js                               │
         * │  Where [mealSlug] captures "juicy-cheese-burger"            │
         * └─────────────────────────────────────────────────────────────┘
         *
         * INSTRUCTOR QUOTE:
         * "Here, this page, which expects a dynamic value for that path
         * segment so that we can visit that details page for different
         * meals. And in the end here where I'm constructing this path,
         * it's this dynamic slug, which will be different for every meal
         * that will be used as a concrete value for this placeholder."
         */}
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}

/**
 * ============================================================================
 * LESSON 450 - MEAL ITEM COMPONENT SUMMARY
 * ============================================================================
 *
 * KEY CONCEPTS:
 *
 * 1. DYNAMIC IMAGE HANDLING WITH fill PROP
 *    - Used when image dimensions are unknown at build time
 *    - Parent must have position: relative
 *    - Image fills the parent container
 *
 * 2. DYNAMIC NAVIGATION
 *    - Links use template literals for dynamic paths
 *    - The slug prop is injected into the URL
 *    - Matches the [mealSlug] dynamic route segment
 *
 * 3. PROP STRUCTURE
 *    Expects these props from the meal data:
 *    ┌─────────────────────────────────────────────────────────────────────────┐
 *    │  PROP      │  TYPE    │  EXAMPLE VALUE                                  │
 *    │  ─────────────────────────────────────────────────────────────────────  │
 *    │  title     │  string  │  "Juicy Cheese Burger"                          │
 *    │  slug      │  string  │  "juicy-cheese-burger"                          │
 *    │  image     │  string  │  "/images/burger.jpg"                           │
 *    │  summary   │  string  │  "A mouth-watering burger..."                   │
 *    │  creator   │  string  │  "John Doe"                                     │
 *    └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "And in such cases, fill is a great alternative to explicitly setting a
 * width or height, which you should do though if you know the width and
 * height in advance."
 *
 * ============================================================================
 */
