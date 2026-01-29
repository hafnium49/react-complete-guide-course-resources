/**
 * ============================================================================
 * ROOT LAYOUT - LESSON 474: Adding Static Page Metadata
 * ============================================================================
 *
 * This is the ROOT LAYOUT of our Next.js application. It wraps ALL pages
 * in the app and is the perfect place to define default metadata.
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
