/**
 * ============================================================================
 * DYNAMIC MEAL PAGE - LESSON 439: Exercise - Adding More Routes
 * ============================================================================
 *
 * LESSON 439 - EXERCISE: CREATE THE /meals/[slug] DYNAMIC ROUTE
 *
 * INSTRUCTOR QUOTE:
 * "I then also want you to create an extra fourth route, which also leads to
 * /meals/something, but now that something part should be dynamic so that
 * basically any value could be entered there."
 *
 * ============================================================================
 * DYNAMIC ROUTES REVIEW
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (from Lesson 437):
 * "In NextJS, we can create such a dynamic route by adding a nested folder
 * where we use square brackets. This is a special syntax supported by NextJS,
 * where you then put any placeholder, any identifier of your choice between
 * those square brackets."
 *
 * THE [slug] FOLDER NAME:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  [slug]  =  "Match ANY value in this URL segment"                       │
 * │                                                                          │
 * │  URL                    │  params.slug value                            │
 * │  ───────────────────────│──────────────────────────────────────────────│
 * │  /meals/burger          │  "burger"                                     │
 * │  /meals/pizza           │  "pizza"                                      │
 * │  /meals/my-favorite     │  "my-favorite"                                │
 * │  /meals/anything-here   │  "anything-here"                              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * STATIC vs DYNAMIC ROUTE PRIORITY
 * ============================================================================
 *
 * IMPORTANT: Next.js matches STATIC routes before DYNAMIC routes!
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  URL               │  Matched Route          │  Why?                    │
 * │  ──────────────────│─────────────────────────│──────────────────────────│
 * │  /meals/share      │  app/meals/share/       │  Static match (exact)    │
 * │  /meals/burger     │  app/meals/[slug]/      │  Dynamic match           │
 * │  /meals/pizza      │  app/meals/[slug]/      │  Dynamic match           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * The /meals/share route is NOT caught by [slug] because there's a specific
 * static route for it. This is the expected behavior in Next.js.
 *
 * ============================================================================
 * COMPLETE FOLDER STRUCTURE FOR MEALS
 * ============================================================================
 *
 * app/
 * └── meals/
 *     ├── page.js           → /meals (meals listing)
 *     ├── share/
 *     │   └── page.js       → /meals/share (STATIC - share form)
 *     └── [slug]/
 *         └── page.js       → /meals/* (DYNAMIC - THIS FILE)
 *
 * ============================================================================
 */

import Link from 'next/link';

/**
 * DYNAMIC MEAL DETAIL PAGE COMPONENT
 *
 * This page displays details for a specific meal based on the URL slug.
 * For now, it's a simple placeholder showing the slug value.
 *
 * INSTRUCTOR QUOTE:
 * "Create those routes, add some links, but don't worry about styling or the
 * page content. In the next lecture, we're going to set up those routes together."
 *
 * FUTURE FUNCTIONALITY:
 * - Fetch meal data from database using the slug
 * - Display meal image, ingredients, instructions
 * - Show the meal creator's information
 * - Allow users to share or save the meal
 *
 * @param {Object} props - Props passed by Next.js
 * @param {Object} props.params - Dynamic route parameters
 * @param {string} props.params.slug - The meal slug from the URL
 * @returns {JSX.Element} The meal detail page content
 */
export default function MealDetailPage({ params }) {
  /**
   * ACCESSING THE DYNAMIC VALUE
   *
   * INSTRUCTOR QUOTE (from Lesson 437):
   * "NextJS actually passes a props object to all those page components.
   * And all these page components get one special prop, which you can pull out
   * with help of destructuring, and that's a params prop."
   *
   * The params.slug value comes directly from the URL:
   *   /meals/burger → params.slug = "burger"
   *   /meals/pizza  → params.slug = "pizza"
   *
   * In a real app, we'd use this slug to fetch the meal data:
   *   const meal = await getMealBySlug(params.slug);
   */

  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Meal Details
      </h1>

      {/**
       * Display the dynamic slug value from the URL
       *
       * In a real application, this would be replaced with actual meal data
       * fetched using the slug as an identifier.
       */}
      <p style={{ color: '#ddd8d8', textAlign: 'center' }}>
        Viewing meal: <strong style={{ color: '#f9572a' }}>{params.slug}</strong>
      </p>

      <p style={{ color: '#ddd8d8', textAlign: 'center', fontSize: '0.9rem' }}>
        (This will show the actual meal details once we fetch data)
      </p>

      {/**
       * NAVIGATION LINKS
       *
       * Provides navigation back to other parts of the app.
       */}
      <nav style={{ textAlign: 'center', marginTop: '2rem' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '1rem 0' }}>
            <Link href="/" style={{ color: '#f9572a' }}>
              Home
            </Link>
          </li>
          <li style={{ margin: '1rem 0' }}>
            <Link href="/meals" style={{ color: '#f9572a' }}>
              All Meals
            </Link>
          </li>
          <li style={{ margin: '1rem 0' }}>
            <Link href="/meals/share" style={{ color: '#f9572a' }}>
              Share a Meal
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}

/**
 * ============================================================================
 * LESSON 439 - EXERCISE SUMMARY: /meals/[slug] DYNAMIC ROUTE
 * ============================================================================
 *
 * WHAT WE LEARNED:
 *
 * 1. DYNAMIC ROUTES use square brackets in the folder name:
 *    - [slug] means "match any value"
 *    - The value is available via params.slug
 *
 * 2. STATIC routes take PRIORITY over dynamic routes:
 *    - /meals/share matches the static route first
 *    - /meals/anything-else matches the dynamic [slug] route
 *
 * 3. The params prop is passed automatically by Next.js:
 *    - No need to use hooks like useParams()
 *    - Works in both Server and Client Components
 *
 * 4. REAL-WORLD USE:
 *    - Use params.slug to fetch specific data from a database
 *    - Each meal gets its own unique URL (SEO-friendly)
 *    - One page.js handles all individual meal pages
 *
 * ============================================================================
 * COMPLETE ROUTE STRUCTURE FOR EXERCISE 439
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ROUTE              │  FILE                       │  TYPE               │
 * │  ───────────────────│─────────────────────────────│─────────────────────│
 * │  /                  │  app/page.js                │  Static             │
 * │  /meals             │  app/meals/page.js          │  Static             │
 * │  /meals/share       │  app/meals/share/page.js    │  Static (nested)    │
 * │  /meals/[slug]      │  app/meals/[slug]/page.js   │  Dynamic            │
 * │  /community         │  app/community/page.js      │  Static             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "So, hopefully this was doable. In the next lecture, we're going to set up
 * those routes together."
 *
 * ============================================================================
 */
