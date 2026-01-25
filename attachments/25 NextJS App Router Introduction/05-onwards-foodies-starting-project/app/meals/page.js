/**
 * ============================================================================
 * MEALS PAGE - LESSON 440: Setting Up The Meals Routes
 * ============================================================================
 *
 * LESSON 440 - CREATING THE /meals ROUTE
 *
 * INSTRUCTOR QUOTE:
 * "And I will start with the meals route. Now, for that, we should go to that
 * app folder because that folder has a special role in NextJS projects as you
 * learned."
 *
 * ============================================================================
 * CREATING A NEW ROUTE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And in there we can set up a new route and a new path segment that can be
 * entered in the URL by simply adding a folder with that intended path segment
 * as a name. So for example, meals if we want to be able to go to our domain
 * slash meals."
 *
 * THE TWO-STEP PROCESS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  STEP 1: Create a folder with the path segment name                     │
 * │          app/meals/  ← Creates the /meals URL segment                   │
 * │                                                                          │
 * │  STEP 2: Add a page.js file inside that folder                          │
 * │          app/meals/page.js  ← Makes the route visitable                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "Now, as I also mentioned before, adding just a folder like this won't do
 * anything though. Instead you must add a page.js file here to show something
 * on the screen."
 *
 * ============================================================================
 * COMPONENT NAMING
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And then in this page.js file, you should export a component, a React
 * component, a functional component to be precise. In this case, you could
 * name it MealsPage, though this name here, as I mentioned, doesn't matter,
 * it's totally up to you, but you must export a component, that's important."
 *
 * KEY POINTS:
 * - The component name (MealsPage) is YOUR choice
 * - What matters is that you EXPORT a component
 * - Next.js doesn't care about the name, only that it's a valid component
 *
 * ============================================================================
 */

/**
 * MEALS PAGE COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "And then here I'll simply return an H1 element where I say meals page,
 * that's of course just some dummy content and we're going to replace it
 * with more meaningful content later."
 *
 * This is placeholder content. Throughout this section, we'll transform this
 * into a full meals listing page with:
 * - Grid of meal cards
 * - Images and descriptions
 * - Links to individual meal pages
 * - Data fetched from a database
 *
 * @returns {JSX.Element} The meals page content
 */
export default function MealsPage() {
  return (
    <h1>Meals Page</h1>
  );
}

/**
 * ============================================================================
 * LESSON 440 - ROUTE CREATION SUMMARY
 * ============================================================================
 *
 * WHAT WE LEARNED:
 *
 * 1. FOLDER = URL SEGMENT
 *    - app/meals/ folder creates /meals URL path
 *
 * 2. page.js = RENDERABLE ROUTE
 *    - Just a folder isn't enough
 *    - page.js makes the route actually work
 *
 * 3. COMPONENT EXPORT = REQUIRED
 *    - Must export a React component function
 *    - Name is flexible, export is mandatory
 *
 * FILE-BASED ROUTING VISUALIZATION:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FOLDER         │  FILE        │  URL           │  WORKS?              │
 * │  ───────────────│──────────────│────────────────│──────────────────────│
 * │  app/meals/     │  (none)      │  /meals        │  No (404)            │
 * │  app/meals/     │  page.js     │  /meals        │  Yes (THIS FILE)     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
