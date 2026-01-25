/**
 * ============================================================================
 * ROOT LAYOUT - LESSONS 438, 441, 442 & 445: Layouts in Next.js
 * ============================================================================
 *
 * LESSON 445 - EXTRACTING THE HEADER BACKGROUND
 *
 * INSTRUCTOR QUOTE:
 * "With that, we can save this and go back to layout.js and then also output
 * the MainHeaderBackground here, or since it, as the name suggests, belongs
 * to the MainHeader, we can actually not do that, get rid of the import and
 * the usage in the root layout.js file, and instead use it here in main-header.js."
 *
 * The SVG background has been moved from this file into a dedicated
 * MainHeaderBackground component, which is now rendered inside MainHeader.
 * This keeps the layout file focused on structure.
 *
 * ============================================================================
 * LESSON 442 - ADDING THE MAIN HEADER
 *
 * INSTRUCTOR QUOTE:
 * "Now to add that header, I'll add a brand new component. We could of course
 * also just add it in here in this layout file. But in order to keep this a
 * bit leaner, I'll add a separate component."
 *
 * The MainHeader component is imported from the components folder (outside app)
 * and placed above the children to appear on ALL pages.
 *
 * ============================================================================
 * LESSON 441 - UNDERSTANDING LAYOUTS
 *
 * INSTRUCTOR QUOTE:
 * "So let's now start working on this page, and let's start making it look
 * better and make it more useful. And for that, I actually want to start by
 * adding a proper header and navigation and logo to this website. And for
 * that, I'll actually work on that layout.js file."
 *
 * ============================================================================
 * WHAT ARE LAYOUTS?
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Because the idea behind layouts in NextJS is that they act as wrappers
 * around pages."
 *
 * KEY CONCEPT:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  LAYOUT = WRAPPER                                                       │
 * │                                                                          │
 * │  ┌─────────────────────────────────────────────────────────────────┐    │
 * │  │  ROOT LAYOUT (this file)                                        │    │
 * │  │  ┌───────────────────────────────────────────────────────────┐  │    │
 * │  │  │  <html>                                                   │  │    │
 * │  │  │    <body>                                                 │  │    │
 * │  │  │      {children} ← Pages are rendered here                 │  │    │
 * │  │  │    </body>                                                │  │    │
 * │  │  │  </html>                                                  │  │    │
 * │  │  └───────────────────────────────────────────────────────────┘  │    │
 * │  └─────────────────────────────────────────────────────────────────┘    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * NESTED LAYOUTS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And you can theoretically also have nested layouts where a subset of pages
 * could also use another more specialized layout. So you are not limited to
 * this one root layout, which we have here in this project."
 *
 * NESTED LAYOUT EXAMPLE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  app/                                                                   │
 * │  ├── layout.js         ← ROOT LAYOUT (always active)                    │
 * │  ├── page.js           → / (wrapped by root layout only)                │
 * │  └── meals/                                                             │
 * │      ├── layout.js     ← NESTED LAYOUT (meals-specific)                 │
 * │      └── page.js       → /meals (wrapped by BOTH layouts)               │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "It's worth noting, though, that if you had a nested layout, so if we had
 * a layout in this meals folder here, then this layout here would indeed
 * only become active for those meals-related pages, but it would itself be
 * nested into the root layout. So the root layout will always be active."
 *
 * HOW NESTING WORKS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ROOT LAYOUT                                                            │
 * │  ┌───────────────────────────────────────────────────────────────────┐  │
 * │  │  <html>                                                           │  │
 * │  │    <body>                                                         │  │
 * │  │      {children} ← Contains NESTED LAYOUT                          │  │
 * │  │      ┌─────────────────────────────────────────────────────────┐  │  │
 * │  │      │  NESTED LAYOUT (meals/layout.js)                        │  │  │
 * │  │      │  ┌───────────────────────────────────────────────────┐  │  │  │
 * │  │      │  │  {children} ← Contains PAGE                       │  │  │  │
 * │  │      │  │  ┌─────────────────────────────────────────────┐  │  │  │  │
 * │  │      │  │  │  PAGE (meals/page.js)                       │  │  │  │  │
 * │  │      │  │  └─────────────────────────────────────────────┘  │  │  │  │
 * │  │      │  └───────────────────────────────────────────────────┘  │  │  │
 * │  │      └─────────────────────────────────────────────────────────┘  │  │
 * │  │    </body>                                                        │  │
 * │  │  </html>                                                          │  │
 * │  └───────────────────────────────────────────────────────────────────┘  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * THE CHILDREN PROP
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And for that, those layout components can use the special children prop
 * that exists in React. Now, you learn that every component can accept and
 * use this prop, and that normally the content that's made available through
 * that prop here will be the content wrapped by those component tags."
 *
 * NORMAL REACT USAGE vs NEXT.JS LAYOUTS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  NORMAL REACT:                                                          │
 * │  <MealsLayout>                                                          │
 * │    <p>This content is available as children</p>                         │
 * │  </MealsLayout>                                                         │
 * │                                                                          │
 * │  NEXT.JS LAYOUTS:                                                       │
 * │  - You DON'T render layouts yourself                                    │
 * │  - Next.js automatically wraps pages with layouts                       │
 * │  - children = nested layouts OR pages                                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "However, in case of layouts and pages, we aren't rendering those components
 * ourselves. We're not using them in JSX code ourselves, instead, NextJS is
 * using them for us. But NextJS will essentially wrap that layout around all
 * pages or nested layouts that are covered by this layout."
 *
 * ============================================================================
 */

/**
 * IMPORTING GLOBAL STYLES
 *
 * The globals.css file contains styles for the entire application.
 * Since this is the ROOT layout, these styles apply to ALL pages.
 */
import './globals.css';

/**
 * ============================================================================
 * LESSON 442 - IMPORTING THE MAIN HEADER COMPONENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "With that all added, and with this main header component finished, we can
 * go back to that root layout and then there output this main header above
 * that children slot here, so above the page content. Simply like this though,
 * very important, you of course must import it."
 *
 * INSTRUCTOR QUOTE:
 * "So here I added this import from that components folder in the root project
 * directory."
 *
 * The @ alias makes this import clean:
 * @/components/main-header → project-root/components/main-header.js
 */
import MainHeader from '@/components/main-header/main-header';

/**
 * ============================================================================
 * METADATA EXPORT
 * ============================================================================
 *
 * The metadata for this app reflects its purpose - a food-sharing community.
 * This metadata is applied to all pages wrapped by this layout.
 */
export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

/**
 * ROOT LAYOUT COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "Because layouts, like pages, are, in the end, React components."
 *
 * This is the ROOT layout - it will ALWAYS be active for every page.
 * Even if you have nested layouts, they are wrapped inside this one.
 *
 * LESSON 441 KEY POINT:
 * The root layout is the only place where you can define <html> and <body>.
 * Nested layouts should NOT include these tags.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Nested layouts OR pages
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/**
         * ====================================================================
         * LESSONS 442 & 445 - MAIN HEADER COMPONENT
         * ====================================================================
         *
         * LESSON 445 UPDATE:
         * The SVG background that was previously here has been extracted into
         * the MainHeaderBackground component, which is now rendered inside
         * MainHeader. This keeps the layout file leaner.
         *
         * INSTRUCTOR QUOTE (Lesson 445):
         * "With that, we can save this and go back to layout.js and then also
         * output the MainHeaderBackground here, or since it, as the name
         * suggests, belongs to the MainHeader, we can actually not do that,
         * get rid of the import and the usage in the root layout.js file,
         * and instead use it here in main-header.js."
         *
         * WHY IT'S PLACED HERE (in root layout):
         * - Visible on ALL pages automatically
         * - No need to add it to each individual page
         * - Consistent navigation across the entire app
         *
         * MainHeader now renders:
         * - MainHeaderBackground (the SVG gradient)
         * - The header element with logo and navigation
         */}
        <MainHeader />

        {/**
         * ====================================================================
         * CHILDREN - PAGE OR NESTED LAYOUT CONTENT
         * ====================================================================
         *
         * INSTRUCTOR QUOTE:
         * "And therefore, children will give you access to any nested layouts
         * or pages. And hence, we can output the page content here with children."
         *
         * WHAT children CONTAINS:
         * ┌─────────────────────────────────────────────────────────────────┐
         * │  URL              │  children contains                          │
         * │  ─────────────────│─────────────────────────────────────────────│
         * │  /                │  app/page.js content                        │
         * │  /meals           │  app/meals/layout.js (if exists)            │
         * │                   │  OR app/meals/page.js directly              │
         * │  /community       │  app/community/page.js content              │
         * └─────────────────────────────────────────────────────────────────┘
         *
         * INSTRUCTOR QUOTE:
         * "And that's also what happens in that root layout, which, as
         * mentioned, will still be active, even if you have a nested layout."
         */}
        {children}
      </body>
    </html>
  );
}

/**
 * ============================================================================
 * LESSONS 441-442 SUMMARY: LAYOUTS AND SHARED COMPONENTS
 * ============================================================================
 *
 * LESSON 441 KEY TAKEAWAYS:
 *
 * 1. LAYOUTS ARE WRAPPERS
 *    - They wrap around pages
 *    - Use the children prop to render nested content
 *
 * 2. ROOT LAYOUT IS ALWAYS ACTIVE
 *    - Even with nested layouts, root layout stays active
 *    - MainHeader (including background) appears on all pages
 *
 * 3. NESTED LAYOUTS ARE OPTIONAL
 *    - Create layout.js in a route folder for route-specific layouts
 *    - Nested layouts are wrapped by parent layouts (including root)
 *
 * ============================================================================
 * LESSON 442 KEY TAKEAWAYS:
 * ============================================================================
 *
 * 1. SHARED COMPONENTS IN LAYOUTS
 *    - Add components to root layout for site-wide visibility
 *    - MainHeader appears on ALL pages automatically
 *
 * 2. COMPONENT FILE ORGANIZATION
 *    - Keep components OUTSIDE app folder (instructor preference)
 *    - app folder = routing only
 *    - components folder = reusable components
 *
 * 3. IMAGE IMPORTS IN NEXT.JS
 *    - Use @ alias for clean imports (@/assets/logo.png)
 *    - Access .src property (images are objects in Next.js)
 *
 * ============================================================================
 * LESSON 445 KEY TAKEAWAYS:
 * ============================================================================
 *
 * 1. COMPONENT EXTRACTION
 *    - Moved SVG background from layout.js to MainHeaderBackground component
 *    - Keeps root layout leaner and more focused
 *
 * 2. FILE ORGANIZATION WITH SUBFOLDERS
 *    - Related components grouped in subfolders (main-header/)
 *    - main-header.js, main-header-background.js, and their CSS modules
 *
 * 3. REACT FRAGMENTS
 *    - MainHeader uses <></> to return multiple sibling elements
 *    - Background and header rendered together without wrapper div
 *
 * INSTRUCTOR QUOTE:
 * "With that, you then just have to make sure that in the root layout.js file,
 * this import path here is updated, which in my case, my IDE did for me.
 * And with that, the page still works as before."
 *
 * CURRENT LAYOUT STRUCTURE (After Lesson 445):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  <html>                                                                 │
 * │    <body>                                                               │
 * │      <MainHeader />  ← Now includes:                                    │
 * │        │               - MainHeaderBackground (SVG)                     │
 * │        │               - Header with logo and nav                       │
 * │      {children}      ← Page content                                     │
 * │    </body>                                                              │
 * │  </html>                                                                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
