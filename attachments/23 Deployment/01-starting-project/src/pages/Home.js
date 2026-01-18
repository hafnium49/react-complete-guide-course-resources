/**
 * ============================================================================
 * HOME PAGE COMPONENT (Lesson 404 - Minimal Import Chain)
 * ============================================================================
 *
 * This is the simplest page component - it has NO imports of other components.
 *
 * ============================================================================
 * IMPORT CHAIN COMPARISON
 * ============================================================================
 *
 * Home.js:
 * ┌────────────────────────────────────────┐
 * │  No additional imports needed          │
 * │  Just renders a simple <h1> element    │
 * │  Very small code footprint             │
 * └────────────────────────────────────────┘
 *
 * Blog.js:
 * ┌────────────────────────────────────────┐
 * │  ├── react-router-dom                  │
 * │  └── PostList                          │
 * │        └── PostItem                    │
 * │              └── CSS module            │
 * │  Much larger code footprint            │
 * └────────────────────────────────────────┘
 *
 * ============================================================================
 * LAZY LOADING CONSIDERATION
 * ============================================================================
 *
 * For this HomePage:
 * - It's so simple that lazy loading wouldn't help much
 * - It's likely the most common landing page
 * - Usually kept in the main bundle (not lazy loaded)
 *
 * In real apps, you typically lazy load:
 * - Less frequently visited pages
 * - Pages with heavy dependencies (charts, editors, etc.)
 * - Admin/settings pages most users won't access
 *
 * ============================================================================
 */

/**
 * HomePage Component
 *
 * The landing page of the application.
 * Simple enough that it should remain in the main bundle.
 */
function HomePage() {
  return <h1>The Home Page</h1>;
}

export default HomePage;
