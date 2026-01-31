/**
 * ============================================================================
 * ROOT LAYOUT - LESSON 476: Section Summary & Complete Reference
 * ============================================================================
 *
 * This is the ROOT LAYOUT of our Next.js application. It wraps ALL pages
 * in the app and is the perfect place to define default metadata.
 *
 * ============================================================================
 * 🎓 LESSON 476: SECTION COMPLETE - NEXTJS APP ROUTER MASTERY
 * ============================================================================
 *
 * From the instructor:
 * "At this point you have a super solid NextJS foundation and you are ready
 * to use NextJS with its App Router in your future projects."
 *
 * This section covered the complete Next.js App Router architecture. Below
 * is a comprehensive summary of everything learned.
 *
 * ============================================================================
 * 📁 SPECIAL FILE NAMES IN NEXT.JS APP ROUTER
 * ============================================================================
 *
 * From the instructor:
 * "You learned how you can set up routes by using the file system... and by
 * using these special file names like page.js and layout.js."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FILE NAME        │  PURPOSE                                           │
 * │───────────────────┼─────────────────────────────────────────────────────│
 * │  page.js          │  Defines the UI for a route (required for route)  │
 * │  layout.js        │  Shared UI wrapper for pages (THIS FILE)          │
 * │  error.js         │  Error boundary for handling errors               │
 * │  not-found.js     │  404 page when notFound() is called               │
 * │  loading.js       │  Loading state while page loads                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "You also learned about other special files like error.js for handling
 * errors, or not-found.js for handling not found errors, or the loading.js
 * file... though you learned that you have more granular control by using
 * Suspense, which is what we then did."
 *
 * ============================================================================
 * 🛤️  FILE-SYSTEM BASED ROUTING
 * ============================================================================
 *
 * Routes are created by folder structure in the /app directory:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FOLDER STRUCTURE              │  ROUTE                                │
 * │────────────────────────────────┼───────────────────────────────────────│
 * │  app/page.js                   │  /                                    │
 * │  app/meals/page.js             │  /meals                               │
 * │  app/meals/share/page.js       │  /meals/share                         │
 * │  app/meals/[mealSlug]/page.js  │  /meals/:mealSlug (dynamic)          │
 * │  app/community/page.js         │  /community                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔀 DYNAMIC ROUTES
 * ============================================================================
 *
 * From the instructor:
 * "You also learned how to configure dynamic routes where some path segments
 * aren't known in advance, like here, where we load pages for individual
 * meals, where we don't know in advance how many meals we'll have."
 *
 * Dynamic segments use square brackets: [paramName]
 *
 *   app/meals/[mealSlug]/page.js
 *   ↓
 *   /meals/burger      → params.mealSlug = 'burger'
 *   /meals/pizza       → params.mealSlug = 'pizza'
 *   /meals/schnitzel   → params.mealSlug = 'schnitzel'
 *
 * ============================================================================
 * ⚡ SERVER COMPONENTS vs CLIENT COMPONENTS
 * ============================================================================
 *
 * From the instructor:
 * "You learned that all those pages in the end just export standard React
 * components, but that those components are kind of special when using
 * NextJS. That they are server components that are executed on the server,
 * that are rendered on the server, therefore. And it's not just those page
 * components, but instead all components unless you explicitly opt out of
 * this behavior by adding this use client directive."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  SERVER COMPONENTS (Default)                                            │
 * │  ───────────────────────────                                            │
 * │  • Rendered on the server                                               │
 * │  • Can fetch data directly (no useEffect needed!)                       │
 * │  • Can access backend resources (database, file system)                 │
 * │  • Cannot use hooks like useState, useEffect                            │
 * │  • Cannot handle user events directly                                   │
 * │                                                                          │
 * │  CLIENT COMPONENTS ('use client')                                       │
 * │  ─────────────────────────────────                                      │
 * │  • Rendered on the client (browser)                                     │
 * │  • CAN use useState, useEffect, and other hooks                         │
 * │  • CAN handle user events (onClick, onChange, etc.)                     │
 * │  • Must send requests to APIs for data                                  │
 * │  • Add 'use client' at the top of the file                              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "To convert a file and its components into a client component, which then
 * is rendered on the client and which then therefore may use client side
 * functionality like useState or handling user events."
 *
 * ============================================================================
 * 📊 DATA FETCHING IN SERVER COMPONENTS
 * ============================================================================
 *
 * From the instructor:
 * "You therefore also learned that you can take advantage of those Server
 * components by fetching data directly inside of those components. There is
 * no need to use useEffect and send requests to separate backends. Instead,
 * you can fetch the data from right inside your Server components."
 *
 * TRADITIONAL REACT (Client-side):
 *   useEffect(() => {
 *     fetch('/api/meals').then(res => setMeals(res.data));
 *   }, []);
 *
 * NEXT.JS SERVER COMPONENTS:
 *   async function MealsPage() {
 *     const meals = await getMeals();  // Direct database access!
 *     return <MealsGrid meals={meals} />;
 *   }
 *
 * ============================================================================
 * 🎬 SERVER ACTIONS
 * ============================================================================
 *
 * From the instructor:
 * "You also learned about Server Actions, async functions that either have
 * to use 'use server' directive inside of them or that are stored in a file
 * with 'use server' at the top. And the special thing about those Server
 * Actions is that you can assign them as values to the action prop on form
 * elements."
 *
 * Server Actions enable form handling without API routes:
 *
 *   // lib/actions.js
 *   'use server';
 *   export async function shareMeal(formData) {
 *     // Runs on the server!
 *     await saveMealToDatabase(formData);
 *   }
 *
 *   // In component
 *   <form action={shareMeal}>...</form>
 *
 * ============================================================================
 * 📝 useFormState & useFormStatus
 * ============================================================================
 *
 * From the instructor:
 * "Either directly or as we're doing it here with help of useFormState, which
 * is a hook provided by react-dom to handle responses returned by the Server
 * action function and then potentially update the UI based on those responses.
 * Like here where we are conditionally showing an error message."
 *
 * useFormState - Handle server action responses:
 *   const [state, formAction] = useFormState(shareMeal, { message: null });
 *   {state.message && <p>{state.message}</p>}
 *
 * From the instructor:
 * "You also learned about the useFormStatus hook, which can be used to find
 * out whether a form is currently being submitted or not, which can then be
 * used to update the UI accordingly."
 *
 * useFormStatus - Track form submission state:
 *   const { pending } = useFormStatus();
 *   <button disabled={pending}>{pending ? 'Submitting...' : 'Submit'}</button>
 *
 * ============================================================================
 * 🔄 CACHING & revalidatePath
 * ============================================================================
 *
 * From the instructor:
 * "You also learned that NextJS does some pretty aggressive caching and that
 * therefore you should call revalidatePath whenever you change some data to
 * make sure that the latest data is fetched and represented on your pages."
 *
 * ⚠️  CRITICAL WARNING from the instructor:
 * "You also saw that it can be dangerous if you never test your app in
 * production mode because everything worked in development mode in our app
 * here, but then suddenly the data was missing in production mode."
 *
 * After modifying data, call revalidatePath:
 *   import { revalidatePath } from 'next/cache';
 *
 *   async function shareMeal(formData) {
 *     await saveMeal(formData);
 *     revalidatePath('/meals');  // Refresh the cached data!
 *   }
 *
 * ============================================================================
 * 🏷️  METADATA (Lessons 474 & 475)
 * ============================================================================
 *
 * From the instructor:
 * "Last but not least, we also talked about metadata that can be added to
 * pages, static metadata as we have it here or dynamically generated metadata."
 *
 * STATIC METADATA:
 *   export const metadata = { title: 'Page Title', description: '...' };
 *
 * DYNAMIC METADATA:
 *   export async function generateMetadata({ params }) {
 *     const meal = await getMeal(params.slug);
 *     return { title: meal.title, description: meal.summary };
 *   }
 *
 * ============================================================================
 * 📍 WHERE TO FIND EXAMPLES IN THIS PROJECT
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  CONCEPT                │  FILE LOCATION                               │
 * │─────────────────────────┼──────────────────────────────────────────────│
 * │  Root Layout            │  app/layout.js (THIS FILE)                   │
 * │  Static Routes          │  app/page.js, app/meals/page.js              │
 * │  Dynamic Routes         │  app/meals/[mealSlug]/page.js                │
 * │  Error Handling         │  app/meals/error.js                          │
 * │  Not Found Page         │  app/not-found.js, app/meals/not-found.js    │
 * │  Server Components      │  Most components (default)                   │
 * │  Client Components      │  app/meals/share/page.js ('use client')      │
 * │  Server Actions         │  lib/actions.js ('use server')               │
 * │  Data Fetching          │  lib/meals.js, app/meals/page.js             │
 * │  useFormState           │  app/meals/share/page.js                     │
 * │  useFormStatus          │  components/meals/meals-form-submit.js       │
 * │  revalidatePath         │  lib/actions.js                              │
 * │  Static Metadata        │  app/layout.js, app/meals/page.js            │
 * │  Dynamic Metadata       │  app/meals/[mealSlug]/page.js                │
 * │  Suspense               │  app/meals/page.js                           │
 * │  S3 Integration         │  lib/meals.js (Lesson 473)                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🎉 SECTION COMPLETE!
 * ============================================================================
 *
 * From the instructor:
 * "At this point you have a super solid NextJS foundation and you are ready
 * to use NextJS with its App Router in your future projects."
 *
 * KEY TAKEAWAYS:
 * 1. File-based routing with special file names (page.js, layout.js, etc.)
 * 2. Server Components are the default - great for data fetching
 * 3. Client Components ('use client') for interactivity
 * 4. Server Actions for form handling without API routes
 * 5. Aggressive caching requires revalidatePath after data changes
 * 6. ALWAYS test in production mode before deploying!
 * 7. Metadata for SEO (static and dynamic)
 *
 * ============================================================================
 *
 * ============================================================================
 * WHAT IS PAGE METADATA?
 * ============================================================================
 *
 * From the instructor:
 * "At the moment, our page has no title and the metadata that's showing up
 * in the browser window or tab is not really helpful. We want to add metadata
 * like a page title or a description."
 *
 * Metadata includes:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  • Page Title      - Shows in browser tab, search results              │
 * │  • Description     - Shows in search engine results (SEO)              │
 * │  • Open Graph      - For social media sharing (Facebook, LinkedIn)     │
 * │  • Twitter Cards   - For Twitter/X sharing                             │
 * │  • Keywords        - Search engine optimization (less important now)   │
 * │  • Viewport        - Mobile responsiveness settings                    │
 * │  • Icons           - Favicons and app icons                            │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * HOW NEXT.JS HANDLES METADATA
 * ============================================================================
 *
 * From the instructor:
 * "NextJS is looking for exported variables or constants called metadata
 * in all your page or layout files."
 *
 * The magic constant name is: `metadata` (must be exactly this name!)
 *
 * Next.js automatically:
 * 1. Finds all `export const metadata` in your page/layout files
 * 2. Converts them into proper <head> elements
 * 3. Handles merging between layouts and pages
 *
 * ============================================================================
 * METADATA CASCADING (Layout → Pages)
 * ============================================================================
 *
 * From the instructor:
 * "If you add this metadata to a layout, it will automatically be added
 * to all the pages that are wrapped by that layout unless a page specifies
 * its own metadata. In that case, the page metadata wins."
 *
 * INHERITANCE HIERARCHY:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │   ROOT LAYOUT (app/layout.js)                                           │
 * │   └── metadata: { title: 'NextLevel Food', description: '...' }        │
 * │       │                                                                  │
 * │       ├── HOME PAGE (app/page.js)                                       │
 * │       │   └── No metadata → INHERITS from Root Layout                   │
 * │       │       → Title: "NextLevel Food"                                 │
 * │       │                                                                  │
 * │       ├── MEALS PAGE (app/meals/page.js)                                │
 * │       │   └── metadata: { title: 'All Meals', ... }                     │
 * │       │       → Title: "All Meals" (PAGE METADATA WINS!)                │
 * │       │                                                                  │
 * │       └── COMMUNITY PAGE (app/community/page.js)                        │
 * │           └── No metadata → INHERITS from Root Layout                   │
 * │               → Title: "NextLevel Food"                                 │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * STATIC vs DYNAMIC METADATA (Lessons 474 & 475)
 * ============================================================================
 *
 * STATIC METADATA (This file - Lesson 474):
 * - Uses `export const metadata = { ... }`
 * - Values are known at build time
 * - Perfect for pages with fixed content
 *
 * DYNAMIC METADATA (Lesson 475):
 * - Uses `export async function generateMetadata({ params }) { ... }`
 * - Values depend on route parameters or fetched data
 * - Used for pages like /meals/[mealSlug] where title = meal.title
 * - IMPORTANT: Must handle notFound() in generateMetadata too!
 * - See app/meals/[mealSlug]/page.js for detailed implementation
 *
 * ============================================================================
 * SEO IMPORTANCE
 * ============================================================================
 *
 * Good metadata is CRUCIAL for SEO:
 *
 * 1. SEARCH RESULTS:
 *    ┌─────────────────────────────────────────────────────────────────────┐
 *    │  NextLevel Food                            ← title                  │
 *    │  https://nextlevel-food.com                                         │
 *    │  Delicious meals, shared by a food-loving  ← description            │
 *    │  community.                                                         │
 *    └─────────────────────────────────────────────────────────────────────┘
 *
 * 2. SOCIAL SHARING (with Open Graph - can be added):
 *    When someone shares your link on Facebook/Twitter/LinkedIn,
 *    the title and description appear in the preview card.
 *
 * 3. BROWSER TAB:
 *    The title shows in the browser tab, helping users identify your page.
 *
 * ============================================================================
 * DOCS REFERENCE:
 * https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 * ============================================================================
 */

import MainHeader from '@/components/main-header/main-header';
import './globals.css';

/**
 * ROOT METADATA - Default for all pages
 *
 * From the instructor:
 * "You export a constant called metadata, and this must hold an object
 * where you can then set a title property to set the title of the page,
 * and you can set a description to set the description of the page."
 *
 * This metadata applies to:
 * - The home page (app/page.js) - no metadata of its own
 * - The community page (app/community/page.js) - no metadata of its own
 * - Any other page that doesn't define its own metadata
 *
 * Pages that OVERRIDE this:
 * - /meals → "All Meals" (defined in app/meals/page.js)
 * - /meals/share → "Share a Meal" (defined in app/meals/share/page.js)
 * - /meals/[slug] → Dynamic title from meal data (uses generateMetadata)
 */
export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
