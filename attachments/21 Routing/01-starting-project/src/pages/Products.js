/**
 * ============================================================================
 * PRODUCTS PAGE COMPONENT (Lessons 347, 349, 350)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 347):
 * "So let's add more pages. And for that I'm first of all going to add another
 * component to the pages folder. And I'll name it 'Products JS.'"
 *
 * ============================================================================
 * NAVIGATION NOW HANDLED BY LAYOUT (Lesson 350)
 * ============================================================================
 *
 * BEFORE LESSON 350:
 * ==================
 * We had Link components in each page for navigation.
 * This was repetitive - every page needed the same navigation links.
 *
 * AFTER LESSON 350:
 * =================
 * INSTRUCTOR QUOTE (Lesson 350):
 * "The advantage of this approach is that this root layout now, indeed, does
 * act as a wrapper for these page components."
 *
 * Navigation is now centralized in MainNavigation component, rendered by RootLayout.
 * All pages automatically get navigation without code duplication!
 *
 * HOW THIS PAGE IS RENDERED (Lesson 350):
 * =======================================
 * 1. User visits localhost:3000/products
 * 2. Router matches the parent route (path: '/')
 * 3. RootLayout renders (includes MainNavigation)
 * 4. Router matches child route (path: '/products')
 * 5. ProductsPage renders at <Outlet /> in RootLayout
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
 * │  │  │  THIS ProductsPage! │  │  │
 * │  │  └─────────────────────┘  │  │
 * │  └───────────────────────────┘  │
 * └─────────────────────────────────┘
 */

/**
 * PRODUCTS PAGE COMPONENT:
 * ========================
 * INSTRUCTOR QUOTE (Lesson 347):
 * "Here I'll add a products page, but it will still just be a dummy page,
 * without any actual real content on it."
 *
 * This component is now simpler - just the page content.
 * Navigation and layout are handled by RootLayout.
 */
function ProductsPage() {
  return (
    <>
      <h1>The Products Page</h1>
      <p>Browse our amazing products!</p>
    </>
  );
}

export default ProductsPage;
