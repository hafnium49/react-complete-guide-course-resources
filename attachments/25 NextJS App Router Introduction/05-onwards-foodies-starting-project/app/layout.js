/**
 * ============================================================================
 * ROOT LAYOUT - LESSONS 438 & 441: Layouts in Next.js
 * ============================================================================
 *
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
         * DECORATIVE SVG BACKGROUND
         * ====================================================================
         *
         * This SVG creates the warm brown-to-orange gradient header background.
         * It's visible on ALL pages because it's in the ROOT layout.
         *
         * INSTRUCTOR QUOTE (from Lesson 441):
         * "And yet the root layout is still active, as you can, for example,
         * tell by this SVG, this brownish SVG, which is still visible here."
         *
         * This proves that even with nested layouts, the root layout
         * (and everything in it) remains active.
         */}
        <div className="header-background">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  style={{ stopColor: '#59453c', stopOpacity: '1' }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: '#8f3a09', stopOpacity: '1' }}
                />
              </linearGradient>
            </defs>
            <path
              fill="url(#gradient)"
              d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,181.3C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>

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
 * LESSON 441 SUMMARY: LAYOUTS IN NEXT.JS
 * ============================================================================
 *
 * KEY TAKEAWAYS:
 *
 * 1. LAYOUTS ARE WRAPPERS
 *    - They wrap around pages
 *    - Use the children prop to render nested content
 *
 * 2. ROOT LAYOUT IS ALWAYS ACTIVE
 *    - Even with nested layouts, root layout stays active
 *    - That's why the SVG background appears on all pages
 *
 * 3. NESTED LAYOUTS ARE OPTIONAL
 *    - Create layout.js in a route folder for route-specific layouts
 *    - Nested layouts are wrapped by parent layouts (including root)
 *
 * 4. NEXT.JS RENDERS LAYOUTS AUTOMATICALLY
 *    - You don't use <Layout> in your code
 *    - Next.js handles the wrapping based on file location
 *
 * 5. ONLY ROOT LAYOUT HAS <html> AND <body>
 *    - Nested layouts should return fragments or divs
 *    - They inherit the HTML structure from root
 *
 * INSTRUCTOR QUOTE:
 * "But here, we actually don't need that nested layout, hence I'll delete it.
 * But we will now work on the root layout to add some header that's visible
 * on all pages, some header that allows us to navigate between those pages."
 *
 * COMING NEXT: Adding a proper header with navigation to this root layout!
 *
 * ============================================================================
 */
