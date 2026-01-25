/**
 * ============================================================================
 * NESTED LAYOUT DEMONSTRATION - LESSON 441: Understanding Layouts
 * ============================================================================
 *
 * ⚠️  IMPORTANT: DEMONSTRATION FILE ONLY
 *
 * INSTRUCTOR QUOTE:
 * "But here, we actually don't need that nested layout, hence I'll delete it."
 *
 * This file was created by the instructor to DEMONSTRATE how nested layouts
 * work, then deleted. It's kept here for educational purposes to show:
 * - How to create a nested layout
 * - How nested layouts use the children prop
 * - How nested layouts are wrapped by parent layouts
 *
 * You can DELETE this file if you want to follow the instructor exactly,
 * or KEEP it to see the nested layout in action on /meals pages.
 *
 * ============================================================================
 * WHAT IS A NESTED LAYOUT?
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And you can theoretically also have nested layouts where a subset of pages
 * could also use another more specialized layout."
 *
 * A NESTED LAYOUT is a layout.js file placed inside a route folder.
 * It only affects pages within that folder (and its subfolders).
 *
 * FOLDER LOCATION:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  app/                                                                   │
 * │  ├── layout.js         ← ROOT layout (always active)                    │
 * │  ├── page.js           → / (uses root layout only)                      │
 * │  ├── community/                                                         │
 * │  │   └── page.js       → /community (uses root layout only)             │
 * │  └── meals/                                                             │
 * │      ├── layout.js     ← THIS FILE (nested layout for meals)            │
 * │      ├── page.js       → /meals (uses BOTH layouts)                     │
 * │      ├── share/                                                         │
 * │      │   └── page.js   → /meals/share (uses BOTH layouts)               │
 * │      └── [mealSlug]/                                                    │
 * │          └── page.js   → /meals/:slug (uses BOTH layouts)               │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * HOW NESTED LAYOUTS WORK
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "It's worth noting, though, that if you had a nested layout, so if we had
 * a layout in this meals folder here, then this layout here would indeed only
 * become active for those meals-related pages, but it would itself be nested
 * into the root layout. So the root layout will always be active."
 *
 * WRAPPING ORDER:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. ROOT LAYOUT wraps everything (including this nested layout)         │
 * │  2. THIS LAYOUT wraps meals pages only                                  │
 * │  3. PAGE is the innermost content                                       │
 * │                                                                          │
 * │  Result:                                                                │
 * │    <RootLayout>          ← From app/layout.js                           │
 * │      <MealsLayout>       ← From THIS FILE                               │
 * │        <MealsPage />     ← From app/meals/page.js                       │
 * │      </MealsLayout>                                                     │
 * │    </RootLayout>                                                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * THE CHILDREN PROP IN NESTED LAYOUTS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And for that, those layout components can use the special children prop
 * that exists in React."
 *
 * In a nested layout, children contains:
 * - The page component (e.g., meals/page.js)
 * - OR another nested layout (if there's one deeper)
 *
 * INSTRUCTOR QUOTE:
 * "However, in case of layouts and pages, we aren't rendering those components
 * ourselves. We're not using them in JSX code ourselves, instead, NextJS is
 * using them for us."
 *
 * ============================================================================
 */

/**
 * MEALS LAYOUT COMPONENT (DEMONSTRATION)
 *
 * INSTRUCTOR QUOTE:
 * "And I can quickly show this to you by adding a component function to this
 * layout.js file. Because layouts, like pages, are, in the end, React components.
 * And I'll name this meals layout."
 *
 * NOTE: Unlike the root layout, nested layouts should NOT include <html> or
 * <body> tags. They should return a fragment (<></>) or a wrapper element.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The page content or deeper nested layouts
 */
export default function MealsLayout({ children }) {
  /**
   * INSTRUCTOR'S DEMONSTRATION STRUCTURE:
   *
   * INSTRUCTOR QUOTE:
   * "And then here, I'll return, let's say, a fragment. Where I'll simply at
   * a paragraph, which says Meals layout. And which below that paragraph
   * should then output the actual page content."
   *
   * The fragment (<></>) is used because:
   * - We can't have multiple root elements without a wrapper
   * - We don't want to add unnecessary DOM elements
   * - The root layout already provides <html> and <body>
   */
  return (
    <>
      {/**
       * DEMONSTRATION PARAGRAPH
       *
       * INSTRUCTOR QUOTE:
       * "And with that nested layout added, you'll see that on the starting
       * page, we don't see it. We don't see that text meals layout anywhere
       * on the screen on the starting page. But if I go to a meals page,
       * we see it here."
       *
       * This proves:
       * - Nested layouts only affect their route segment and children
       * - The home page (/) doesn't show this because it's not in /meals
       * - All /meals/* pages will show this paragraph
       */}
      <p>Meals Layout</p>

      {/**
       * PAGE CONTENT
       *
       * INSTRUCTOR QUOTE:
       * "And therefore, children will give you access to any nested layouts
       * or pages. And hence, we can output the page content here with children."
       *
       * This renders the actual page content:
       * - /meals → meals/page.js
       * - /meals/share → meals/share/page.js
       * - /meals/burger → meals/[mealSlug]/page.js
       */}
      {children}
    </>
  );
}

/**
 * ============================================================================
 * LESSON 441 - NESTED LAYOUT DEMONSTRATION SUMMARY
 * ============================================================================
 *
 * WHAT THE INSTRUCTOR DEMONSTRATED:
 *
 * 1. Created this layout.js file in the meals folder
 *
 * 2. Showed that it only appears on /meals/* pages, not on /
 *    INSTRUCTOR QUOTE:
 *    "And with that nested layout added, you'll see that on the starting
 *    page, we don't see it. We don't see that text meals layout anywhere
 *    on the screen on the starting page. But if I go to a meals page,
 *    we see it here."
 *
 * 3. Proved that the root layout is STILL active (SVG visible)
 *    INSTRUCTOR QUOTE:
 *    "And yet the root layout is still active, as you can, for example,
 *    tell by this SVG, this brownish SVG, which is still visible here."
 *
 * 4. Then DELETED this file because it wasn't needed
 *    INSTRUCTOR QUOTE:
 *    "But here, we actually don't need that nested layout, hence I'll delete it."
 *
 * ============================================================================
 * TO FOLLOW THE INSTRUCTOR EXACTLY:
 * ============================================================================
 *
 * DELETE this file! The instructor created it only for demonstration purposes.
 *
 * To delete: Simply remove this file (app/meals/layout.js)
 *
 * If you KEEP this file:
 * - You'll see "Meals Layout" text on all /meals/* pages
 * - It demonstrates nested layouts working correctly
 * - It won't break anything - it's just not part of the final app
 *
 * ============================================================================
 * WHEN WOULD YOU USE A NESTED LAYOUT?
 * ============================================================================
 *
 * Real-world use cases for nested layouts:
 *
 * 1. DASHBOARD LAYOUTS
 *    - /dashboard/settings, /dashboard/profile share a sidebar
 *    - Create app/dashboard/layout.js with the sidebar
 *
 * 2. AUTHENTICATION SECTIONS
 *    - /auth/login, /auth/register share a centered card layout
 *    - Create app/auth/layout.js with the card wrapper
 *
 * 3. ADMIN PANELS
 *    - /admin/* pages share admin navigation
 *    - Create app/admin/layout.js with admin nav
 *
 * 4. DOCUMENTATION
 *    - /docs/* pages share a table of contents sidebar
 *    - Create app/docs/layout.js with the TOC
 *
 * ============================================================================
 */
