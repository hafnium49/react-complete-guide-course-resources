/**
 * ============================================================================
 * HEADER COMPONENT - LESSON 435: Custom Components in Next.js
 * ============================================================================
 *
 * LESSON 435 - CUSTOM COMPONENTS ARE NOT SPECIAL FILES
 *
 * INSTRUCTOR QUOTE:
 * "We can, for example, still also add regular React components, which are not
 * treated as pages."
 *
 * This file demonstrates that:
 * 1. You can create regular React components in Next.js projects
 * 2. Not every .js file is a "special" file - only reserved names are
 * 3. Components can be stored anywhere in your project
 *
 * ============================================================================
 * WHY "header.js" IS NOT A SPECIAL FILE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "But now in here we can export a function, a component function called header,
 * where we return a fragment, and then in there, this image next to the h1
 * element. So that's now again, a standard React component, but now it's
 * actually a component that's not automatically picked up or handled by NextJS
 * in any way. It's not rendered as a layout or as a page. Instead, it's
 * currently ignored because header is now not some special filename."
 *
 * SPECIAL FILE NAMES (Reserved by Next.js):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  page.js       → Creates a route                                        │
 * │  layout.js     → Creates a layout wrapper                               │
 * │  loading.js    → Creates loading UI                                     │
 * │  error.js      → Creates error UI                                       │
 * │  not-found.js  → Creates 404 page                                       │
 * │  route.js      → Creates API endpoint                                   │
 * │  icon.png      → Sets favicon                                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * NON-SPECIAL FILE NAMES (Regular files - like this one!):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  header.js     → Regular component (THIS FILE)                          │
 * │  button.js     → Regular component                                      │
 * │  utils.js      → Utility functions                                      │
 * │  styles.js     → Style objects                                          │
 * │  anything.js   → Any name that's not reserved                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * FILE NAMING CONVENTION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "You could also name this Header with an uppercase starting character. But
 * here, since all these other default and important NextJS file names use
 * lowercase names, I'll stick to a lowercase name for my component file here
 * as well."
 *
 * Note: You can use .jsx extension if you prefer:
 *
 * INSTRUCTOR QUOTE:
 * "By the way, you can also use .jsx as an extension also for those pages if
 * you prefer that. But here I'll stick to the default, which was .js in this
 * next project."
 *
 * ============================================================================
 * WHERE TO STORE COMPONENTS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, personally, I prefer to store my components outside of that app folder,
 * but you can absolutely store them in there. And indeed, in the official
 * NextJS documentation, you can find an entire article that discusses different
 * ways of structuring your NextJS projects and storing components."
 *
 * OPTION 1: Components OUTSIDE app folder (THIS APPROACH - Instructor's preference)
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  project/                                                               │
 * │  ├── app/                 ← Only routing-related files                  │
 * │  │   ├── page.js                                                        │
 * │  │   └── layout.js                                                      │
 * │  └── components/          ← Components stored here (THIS FILE)          │
 * │      └── header.js                                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * OPTION 2: Components INSIDE app folder (Colocation)
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  project/                                                               │
 * │  └── app/                                                               │
 * │      ├── page.js                                                        │
 * │      ├── layout.js                                                      │
 * │      └── components/      ← Components next to routes                   │
 * │          └── header.js                                                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "I prefer to have my components outside of the app folder, so that the app
 * folder is just used for routing and routing related tasks."
 *
 * ============================================================================
 * COLOCATION: WHY COMPONENTS FOLDER DOESN'T BECOME A ROUTE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Here, you also see the importance of page.js because now that I added this
 * components folder here, you could think that we now should be able to visit
 * /components, but we would get a 404 error because this file in there is
 * ignored by NextJS when it comes to routing, and we simply got no page.js
 * file in here."
 *
 * KEY INSIGHT: A folder only becomes a route if it contains page.js!
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  app/components/header.js     → /components = 404 (no page.js)          │
 * │  app/components/page.js       → /components = WORKS (has page.js)       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From Next.js Documentation on Colocation:
 * "A route is NOT publicly accessible until a page.js or route.js file is
 * added to a route segment."
 *
 * ============================================================================
 */

/**
 * HEADER COMPONENT
 *
 * This is a standard React component, just like you'd create in any React project.
 * It uses a React Fragment (<> </>) to wrap multiple elements without adding
 * an extra DOM node.
 *
 * INSTRUCTOR QUOTE:
 * "We can of course import it now. We can import it here into page.js like
 * this, and then here we can output it just as you learned it with Vanilla
 * React because we are still working with React here, we are still working
 * with components, and JSX just enhanced with some extra features."
 *
 * @returns {JSX.Element} The header with logo and heading
 */
export default function Header() {
  return (
    /**
     * React Fragment - groups elements without adding extra DOM nodes
     * Equivalent to: <React.Fragment> ... </React.Fragment>
     */
    <>
      {/**
       * Logo image from the public/ folder
       * Images in public/ are served at the root URL
       * So /logo.png refers to public/logo.png
       */}
      <img src="/logo.png" alt="A server surrounded by magic sparkles." />
      <h1>Welcome to this NextJS Course!</h1>
    </>
  );
}

/**
 * ============================================================================
 * LESSON 435 SUMMARY: CUSTOM COMPONENTS IN NEXT.JS
 * ============================================================================
 *
 * KEY TAKEAWAYS:
 *
 * 1. Not every file in a Next.js project is "special"
 *    - Only reserved names (page.js, layout.js, etc.) have special meaning
 *    - Other files are treated as regular JavaScript/React files
 *
 * 2. You can create regular React components anywhere
 *    - In the app/ folder (colocation)
 *    - Outside the app/ folder (separation - instructor's preference)
 *
 * 3. Folders without page.js are NOT routes
 *    - A components/ folder inside app/ won't create a /components route
 *    - Only folders with page.js become routes
 *
 * 4. You're still working with React
 *    - Same component patterns
 *    - Same JSX syntax
 *    - Same import/export mechanics
 *    - Just enhanced with Next.js features
 *
 * INSTRUCTOR QUOTE:
 * "So that's how the Next App Router works."
 *
 * ============================================================================
 */
