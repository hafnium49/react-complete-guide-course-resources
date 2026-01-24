/**
 * ============================================================================
 * ROOT LAYOUT - LESSON 434: Understanding the Layout File
 * ============================================================================
 *
 * LESSON 434 - LAYOUT.JS: ANOTHER RESERVED FILE NAME
 *
 * INSTRUCTOR QUOTE:
 * "Now, if you take a look at that starting project I prepared for you,
 * you'll not just see that page JS file. Instead, there also is a layout JS
 * file, and that's actually another reserved file name, another special type
 * of file."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  RESERVED FILENAMES IN app/ FOLDER:                                     │
 * │  ─────────────────────────────────────────────────────────────────────  │
 * │  page.js    → Defines the CONTENT of a page                             │
 * │  layout.js  → Defines the SHELL around one or more pages (THIS FILE)    │
 * │  loading.js → Loading UI (shown while page loads)                       │
 * │  error.js   → Error UI (shown when page errors)                         │
 * │  not-found.js → 404 page                                                │
 * │  route.js   → API endpoint (backend route)                              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * WHAT IS layout.js? THE WRAPPER/SHELL AROUND PAGES
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Where the page JS file defines the content of a page, the layout JS file
 * defines the shell around one or more pages. It's the, as the name implies,
 * layout, into which a page will be rendered."
 *
 * Think of it like a picture frame:
 * - layout.js = The frame (stays the same)
 * - page.js = The picture inside (changes based on route)
 *
 * ============================================================================
 * ROOT LAYOUT IS REQUIRED!
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And every next project needs at least one root layout JS file. So, one
 * layout JS file at the top of the app folder."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  REQUIRED: app/layout.js (Root Layout)                                  │
 * │                                                                          │
 * │  app/                                                                   │
 * │  ├── layout.js     ← ROOT LAYOUT (REQUIRED - THIS FILE)                 │
 * │  ├── page.js       ← Home page (/)                                      │
 * │  └── about/                                                             │
 * │      └── page.js   ← About page (/about)                                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * NESTED LAYOUTS (Optional)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "You can also have nested layout JS files. So, we could add one here in
 * the about folder, and then this layout defined here would only apply to
 * the pages in the about folder and any nested folders there."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  NESTED LAYOUT EXAMPLE:                                                  │
 * │                                                                          │
 * │  app/                                                                   │
 * │  ├── layout.js           ← Root Layout (wraps EVERYTHING)               │
 * │  ├── page.js             ← Home page                                    │
 * │  └── about/                                                             │
 * │      ├── layout.js       ← Nested Layout (only for /about/* pages)      │
 * │      ├── page.js         ← /about                                       │
 * │      └── team/                                                          │
 * │          └── page.js     ← /about/team (uses BOTH layouts!)             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * When you visit /about/team:
 * 1. Root layout wraps everything
 * 2. About layout wraps the about section
 * 3. Team page content is rendered inside both
 *
 * ============================================================================
 */

/**
 * IMPORTING GLOBAL STYLES
 *
 * In Next.js, you import global CSS in the root layout.
 * This makes the styles available to ALL pages in your app.
 *
 * Unlike standard React where you might import CSS in index.js or App.js,
 * Next.js requires global CSS to be imported in a layout file.
 */
import './globals.css';

/**
 * ============================================================================
 * LESSON 434: WHERE IS THE <head> ELEMENT?
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, you might wonder where the head element is, which is also typically
 * needed to set a title and some metadata, and that's actually not rendered
 * here because that can be populated in a different way in NextJS by
 * exporting a special variable called metadata."
 *
 * In traditional HTML, you would have:
 *   <html>
 *     <head>
 *       <title>My App</title>
 *       <meta name="description" content="..." />
 *     </head>
 *     <body>...</body>
 *   </html>
 *
 * In Next.js, the <head> is NOT written manually. Instead, you export
 * a `metadata` variable and Next.js handles the <head> for you!
 *
 * ============================================================================
 * METADATA: A RESERVED NAME
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Constant or variable. So, this is also a reserved name. The component name
 * was not reserved, but this here is a reserved name, and if you export a
 * variable or constant with that name, it should contain an object where you
 * can then set the title of the page and the description of the page, and
 * also some other metadata fields, which will then applied to all pages that
 * are covered by that layout."
 *
 * IMPORTANT DISTINCTION:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Component Name (e.g., RootLayout):                                     │
 * │    → NOT reserved, can be anything you want                             │
 * │                                                                          │
 * │  Export Name 'metadata':                                                 │
 * │    → RESERVED, must be exactly 'metadata' to work                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * METADATA FIELDS YOU CAN SET:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  title       → Browser tab title                                        │
 * │  description → Meta description (SEO)                                   │
 * │  keywords    → Meta keywords                                            │
 * │  authors     → Document authors                                         │
 * │  openGraph   → Social media sharing (Facebook, LinkedIn)                │
 * │  twitter     → Twitter card metadata                                    │
 * │  icons       → Favicons and app icons                                   │
 * │  robots      → Search engine indexing instructions                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 */
export const metadata = {
  title: 'NextJS Course App',
  description: 'Your first NextJS app!',
};

/**
 * ============================================================================
 * ROOT LAYOUT COMPONENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And as you can tell in that file, we're also exporting a React component
 * just as we did it in that page file."
 *
 * Like page.js, layout.js exports a React component. The difference:
 * - page.js component → Defines the actual content
 * - layout.js component → Wraps and provides structure for pages
 *
 * ============================================================================
 * THE CHILDREN PROP: STANDARD REACT PROP
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "This component then uses the standard children prop, which in React can be
 * used by every component, to inject some content between the body tags."
 *
 * `children` is not special to Next.js - it's a standard React pattern.
 * The difference is that Next.js AUTOMATICALLY provides the current page
 * as children based on the URL.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  WHAT {children} CONTAINS AT EACH URL:                                  │
 * │                                                                          │
 * │  URL: /           → children = <Home /> (from app/page.js)              │
 * │  URL: /about      → children = <AboutPage /> (from app/about/page.js)   │
 * │  URL: /contact    → children = <Contact /> (from app/contact/page.js)   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "Well, that will simply be the content of the page that's currently active.
 * Because again, the layout is a wrapper around one or more pages, and
 * depending on which path you are, children will then simply be the content
 * of the page JS file that's currently active."
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The current page content
 */
export default function RootLayout({ children }) {
  return (
    /**
     * ====================================================================
     * LESSON 434: HTML & BODY TAGS - UNUSUAL BUT REQUIRED!
     * ====================================================================
     *
     * INSTRUCTOR QUOTE:
     * "And that's also interesting. This component actually renders an HTML
     * and a body tag. So, some elements which you don't normally use in your
     * React components, but you actually need to do that in your next project
     * in the root layout to set up the general HTML skeleton of the website."
     *
     * In standard React (CRA/Vite):
     *   - HTML structure is in public/index.html
     *   - React renders into <div id="root">
     *   - You never touch <html> or <body> in components
     *
     * In Next.js App Router:
     *   - NO index.html file exists
     *   - You MUST define <html> and <body> in the root layout
     *   - This gives you full control over the HTML skeleton
     *
     * WHY? Next.js gives you complete control over the HTML document
     * structure, allowing for features like:
     *   - Setting lang attribute for accessibility/SEO
     *   - Adding global body classes
     *   - Including scripts or providers at the document level
     */
    <html lang="en">
      <body>
        {/**
         * CHILDREN - THE CONTENT OF THE CURRENTLY ACTIVE PAGE
         *
         * INSTRUCTOR QUOTE:
         * "So, layout JS and page JS work together. Layout is the wrapper,
         * page is the actual content, the content that will be injected here."
         *
         * The children prop is populated by Next.js with whatever page.js
         * matches the current URL. As users navigate:
         *
         *   User visits /         → children = content from app/page.js
         *   User visits /about    → children = content from app/about/page.js
         *   User visits /contact  → children = content from app/contact/page.js
         *
         * The layout itself does NOT re-render when navigating between pages.
         * Only the {children} part changes!
         */}
        {children}
      </body>
    </html>
  );
}

/**
 * ============================================================================
 * LESSON 434 SUMMARY: LAYOUT.JS AND PAGE.JS WORK TOGETHER
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So, layout JS and page JS work together. Layout is the wrapper, page is
 * the actual content, the content that will be injected here."
 *
 * KEY TAKEAWAYS:
 *
 * 1. layout.js is a RESERVED FILENAME (like page.js)
 *
 * 2. It defines the SHELL/WRAPPER around one or more pages
 *
 * 3. Every Next.js project needs at least ONE root layout.js at the top
 *    of the app folder
 *
 * 4. You CAN have nested layouts (e.g., app/about/layout.js) that only
 *    apply to pages in that folder and its subfolders
 *
 * 5. The component renders <html> and <body> tags - unusual for React,
 *    but REQUIRED in the Next.js root layout
 *
 * 6. The `metadata` export name is RESERVED - use it to set <head> content
 *    (title, description, etc.) instead of writing <head> manually
 *
 * 7. The `children` prop automatically contains the active page's content
 *
 * ============================================================================
 * VISUAL: HOW LAYOUT AND PAGE WORK TOGETHER
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  layout.js                                                               │
 * │  ┌───────────────────────────────────────────────────────────────────┐  │
 * │  │  <html>                                                            │  │
 * │  │    <body>                                                          │  │
 * │  │      ┌─────────────────────────────────────────────────────────┐  │  │
 * │  │      │  {children}                                              │  │  │
 * │  │      │                                                          │  │  │
 * │  │      │  ← This is where page.js content appears                 │  │  │
 * │  │      │                                                          │  │  │
 * │  │      │  Visit /       → Home page content                       │  │  │
 * │  │      │  Visit /about  → About page content                      │  │  │
 * │  │      │                                                          │  │  │
 * │  │      └─────────────────────────────────────────────────────────┘  │  │
 * │  │    </body>                                                         │  │
 * │  │  </html>                                                           │  │
 * │  └───────────────────────────────────────────────────────────────────┘  │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * COMPARISON: NEXT.JS vs STANDARD REACT
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  STANDARD REACT (CRA/Vite):                                             │
 * │  ─────────────────────────────────────────────────────────────────────  │
 * │  - HTML skeleton in public/index.html                                   │
 * │  - React renders into a <div id="root">                                 │
 * │  - Never use <html> or <body> in components                             │
 * │  - Use react-helmet for <head> manipulation                             │
 * │                                                                          │
 * │  NEXT.JS (App Router):                                                  │
 * │  ─────────────────────────────────────────────────────────────────────  │
 * │  - HTML skeleton in layout.js (not a separate HTML file)                │
 * │  - You define <html> and <body> directly in the component               │
 * │  - Use `export const metadata` for <head> content                       │
 * │  - Next.js handles the rest automatically                               │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
