/**
 * ============================================================================
 * PRODUCTS PAGE COMPONENT (Lessons 347, 349, 350, 354)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 347):
 * "So let's add more pages. And for that I'm first of all going to add another
 * component to the pages folder. And I'll name it 'Products JS.'"
 *
 * ============================================================================
 * PRODUCT LIST WITH LINKS TO DETAILS (Lesson 354)
 * ============================================================================
 *
 * WHY A PRODUCT LIST? (Lesson 354):
 * =================================
 * INSTRUCTOR QUOTE:
 * "Besides just saying something like 'The Product Page', it would be quite
 * common to have a list of products on this page. So here we could have a
 * list where we have product one, and product two, and product three."
 *
 * LINKING TO DETAIL PAGES (Lesson 354):
 * =====================================
 * INSTRUCTOR QUOTE:
 * "It would be quite common to load a separate details page for the different
 * products. And, of course, that is what you have essentially on any online
 * shop. You have a list of products, you can click on a product to view the
 * details of that product."
 *
 * HOW LINKS WORK WITH DYNAMIC ROUTES:
 * ===================================
 * Route definition: '/products/:productId'
 *
 * | Link to              | :productId value | Page Loaded        |
 * |----------------------|------------------|--------------------|
 * | /products/p1         | "p1"             | ProductDetailPage  |
 * | /products/p2         | "p2"             | ProductDetailPage  |
 * | /products/p3         | "p3"             | ProductDetailPage  |
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

import { Link } from 'react-router-dom';

/**
 * DUMMY PRODUCTS DATA:
 * ====================
 * In a real application, this would come from:
 * - An API call to a backend
 * - A database query
 * - State management (Redux, Context)
 *
 * For this demo, we use hardcoded data to demonstrate dynamic routing.
 */
const DUMMY_PRODUCTS = [
  { id: 'p1', title: 'Product 1' },
  { id: 'p2', title: 'Product 2' },
  { id: 'p3', title: 'Product 3' },
];

/**
 * PRODUCTS PAGE COMPONENT:
 * ========================
 * INSTRUCTOR QUOTE (Lesson 347):
 * "Here I'll add a products page, but it will still just be a dummy page,
 * without any actual real content on it."
 *
 * UPDATED (Lesson 354):
 * =====================
 * Now includes a list of products with links to their detail pages.
 * Each link uses a dynamic path that will be matched by the route
 * definition: '/products/:productId'
 */
function ProductsPage() {
  return (
    <>
      <h1>The Products Page</h1>
      {/**
       * PRODUCT LIST (Lesson 354):
       * ==========================
       * INSTRUCTOR QUOTE:
       * "So here we could have a list where we have product one, and product
       * two, and product three. And we could, of course, have an infinite
       * amount of products here. This is just an example afterall."
       *
       * Each product links to its detail page using:
       * - The Link component for client-side navigation
       * - Dynamic path: /products/{product.id}
       * - The id becomes the :productId parameter
       */}
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            {/**
             * LINK TO PRODUCT DETAIL (Lesson 354):
             * ====================================
             * This link navigates to: /products/p1, /products/p2, etc.
             *
             * The path matches the route: '/products/:productId'
             * - "p1" becomes the value of :productId
             * - ProductDetailPage accesses it via useParams().productId
             *
             * FLOW:
             * 1. User clicks "Product 1"
             * 2. Link navigates to /products/p1
             * 3. Router matches /products/:productId route
             * 4. ProductDetailPage renders
             * 5. useParams() returns { productId: "p1" }
             */}
            <Link to={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductsPage;
