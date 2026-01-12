/**
 * ============================================================================
 * PRODUCTS PAGE COMPONENT (Lesson 347)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 347):
 * "So let's add more pages. And for that I'm first of all going to add another
 * component to the pages folder. And I'll name it 'Products JS.' The name of
 * course is up to you, though."
 *
 * ADDING MULTIPLE PAGES (Lesson 347):
 * ===================================
 * This lesson demonstrates how to:
 * 1. Add additional page components to the /pages folder
 * 2. Create route definitions for each page
 * 3. Access different pages via different URL paths
 *
 * PAGE NAMING CONVENTION:
 * =======================
 * - File: Products.js (or ProductsPage.js)
 * - Component: ProductsPage (descriptive name indicating it's a page)
 * - Location: /pages folder (separates page components from reusable components)
 *
 * DUMMY PAGE (Lesson 347):
 * ========================
 * INSTRUCTOR QUOTE:
 * "Here I'll add a products page, but it will still just be a dummy page,
 * without any actual real content on it."
 *
 * For learning routing, we start with simple placeholder content.
 * In a real application, this would contain:
 * - Product listings
 * - Filtering/sorting options
 * - Links to individual product pages
 */

/**
 * PRODUCTS PAGE COMPONENT:
 * ========================
 * INSTRUCTOR QUOTE (Lesson 347):
 * "Here I will then return an H-1 element, where I say 'the products page.'"
 *
 * This component will be rendered when the user visits /products.
 * The routing configuration in App.js maps the path to this component.
 */
function ProductsPage() {
  return <h1>The Products Page</h1>;
}

export default ProductsPage;
