/**
 * ============================================================================
 * HOME PAGE COMPONENT (Lessons 346, 349, 350)
 * ============================================================================
 *
 * ============================================================================
 * NAVIGATION NOW HANDLED BY LAYOUT (Lesson 350)
 * ============================================================================
 *
 * BEFORE LESSON 350:
 * ==================
 * We had to add Link components directly in each page component.
 * This was repetitive - every page needed navigation links.
 *
 * AFTER LESSON 350:
 * =================
 * INSTRUCTOR QUOTE (Lesson 350):
 * "The advantage of this approach is that this root layout now, indeed, does
 * act as a wrapper for these page components."
 *
 * Navigation is now in MainNavigation component, rendered by RootLayout.
 * All pages automatically get navigation without any code duplication!
 *
 * HOW THIS PAGE IS RENDERED (Lesson 350):
 * =======================================
 * 1. User visits localhost:3000/
 * 2. Router matches the parent route (path: '/')
 * 3. RootLayout renders (includes MainNavigation)
 * 4. Router matches child route (path: '/')
 * 5. HomePage renders at <Outlet /> in RootLayout
 *
 * VISUALIZATION:
 * ==============
 * ┌─────────────────────────────────┐
 * │        RootLayout               │
 * │  ┌───────────────────────────┐  │
 * │  │    MainNavigation         │  │
 * │  │  [Home]  [Products]       │  │
 * │  └───────────────────────────┘  │
 * │  ┌───────────────────────────┐  │
 * │  │  <main className=content> │  │
 * │  │  ┌─────────────────────┐  │  │
 * │  │  │  <Outlet /> renders │  │  │
 * │  │  │  THIS HomePage!     │  │  │
 * │  │  └─────────────────────┘  │  │
 * │  └───────────────────────────┘  │
 * └─────────────────────────────────┘
 */

/**
 * HOME PAGE COMPONENT:
 * ====================
 * INSTRUCTOR QUOTE (Lesson 346):
 * "Here we could then add a Home.js file that contains our homepage component."
 *
 * This component is now simpler - just the page content.
 * Navigation and layout are handled by RootLayout.
 */
function HomePage() {
  return (
    <>
      <h1>My Home Page</h1>
      <p>Welcome to our website!</p>
    </>
  );
}

export default HomePage;
