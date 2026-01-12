/**
 * ============================================================================
 * PRODUCTS PAGE COMPONENT (Lessons 347, 349, 350, 354, 355)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 347):
 * "So let's add more pages. And for that I'm first of all going to add another
 * component to the pages folder. And I'll name it 'Products JS.'"
 *
 * ============================================================================
 * BUILDING LINKS FOR DYNAMIC ROUTES (Lesson 355)
 * ============================================================================
 *
 * WHY Link INSTEAD OF NavLink? (Lesson 355):
 * ==========================================
 * INSTRUCTOR QUOTE (Lesson 355):
 * "And here I'm using link instead of nav link because I don't wanna highlight
 * those links as being active once they're clicked because we're actually
 * leaving this page when clicking one of these links here anyways."
 *
 * COMPARISON:
 * ===========
 * | Component | Use Case                                    | Active Styling |
 * |-----------|---------------------------------------------|----------------|
 * | NavLink   | Navigation links that stay visible (navbar) | Yes            |
 * | Link      | Links that navigate away from current page  | No (not needed)|
 *
 * In MainNavigation: We use NavLink because the nav stays visible
 * Here in Products: We use Link because we're leaving this page
 *
 * REAL BACKEND DATA PATTERN (Lesson 355):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "Now in reality you would probably fetch the product data from some backend,
 * from some database. And therefore you might have your products as an array,
 * which you're getting from your backend."
 *
 * INSTRUCTOR QUOTE:
 * "The data you might be getting might be an array full of JavaScript objects,
 * where every object has an ID and a title."
 *
 * Real-world flow:
 * 1. Component mounts
 * 2. useEffect fetches data from API: fetch('/api/products')
 * 3. API returns array: [{ id: 'p1', title: 'Product 1' }, ...]
 * 4. State is updated with products
 * 5. Component re-renders with product list
 *
 * DYNAMIC LIST GENERATION (Lesson 355):
 * =====================================
 * INSTRUCTOR QUOTE:
 * "And therefore, in reality, instead of hard coding our list items like this,
 * we might be creating that list dynamically as you learned it early in the
 * course. By mapping through all these products."
 *
 * TEMPLATE LITERALS FOR DYNAMIC PATHS (Lesson 355):
 * =================================================
 * INSTRUCTOR QUOTE:
 * "And to do that, we could add a dynamic value, where we construct a string
 * dynamically by using back ticks. So that we build such a JavaScript template
 * literal, which makes it easier to dynamically inject dynamic values into
 * this string."
 *
 * INSTRUCTOR QUOTE:
 * "And then we start with slash products, but thereafter, after this second
 * slash. We inject a dynamic value into this string. And the dynamic value
 * here could be 'prod.id'."
 *
 * Template literal syntax:
 * `/products/${product.id}`
 *
 * For product.id = "p1": produces "/products/p1"
 * For product.id = "p2": produces "/products/p2"
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

/**
 * LINK IMPORT (Lesson 355):
 * =========================
 * INSTRUCTOR QUOTE (Lesson 355):
 * "For that, we can of course again, use the link component from
 * 'react-router-dom'."
 *
 * WHY Link AND NOT NavLink? (Lesson 355):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "And here I'm using link instead of nav link because I don't wanna highlight
 * those links as being active once they're clicked because we're actually
 * leaving this page when clicking one of these links here anyways."
 *
 * NavLink's active state feature is unnecessary here because:
 * - We leave the Products page when clicking a product link
 * - The link won't be visible after navigation
 * - No need for "active" highlighting on these links
 */
import { Link } from 'react-router-dom';

/**
 * DUMMY PRODUCTS DATA (Lesson 355):
 * =================================
 * INSTRUCTOR QUOTE (Lesson 355):
 * "Now in reality you would probably fetch the product data from some backend,
 * from some database. And therefore you might have your products as an array,
 * which you're getting from your backend. Here, I'm hard coding it in this
 * dummy products constant, but this could be data coming from a backend."
 *
 * INSTRUCTOR QUOTE:
 * "The data you might be getting might be an array full of JavaScript objects,
 * where every object has an ID and a title. Like, product one. So here I might
 * have free products, which are fetched from a backend, which have different
 * IDs and different titles. That's how we might be getting our data."
 *
 * REAL-WORLD IMPLEMENTATION:
 * ==========================
 * In a real application:
 *
 * const [products, setProducts] = useState([]);
 *
 * useEffect(() => {
 *   fetch('/api/products')
 *     .then(res => res.json())
 *     .then(data => setProducts(data));
 * }, []);
 *
 * The data structure would be the same:
 * [{ id: 'p1', title: 'Product 1' }, { id: 'p2', title: 'Product 2' }, ...]
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
 * UPDATED (Lessons 354, 355):
 * ===========================
 * Now includes a list of products with links to their detail pages.
 * Each link uses a dynamic path that will be matched by the route
 * definition: '/products/:productId'
 */
function ProductsPage() {
  return (
    <>
      <h1>The Products Page</h1>
      {/**
       * DYNAMIC PRODUCT LIST (Lessons 354, 355):
       * ========================================
       * INSTRUCTOR QUOTE (Lesson 354):
       * "So here we could have a list where we have product one, and product
       * two, and product three. And we could, of course, have an infinite
       * amount of products here. This is just an example afterall."
       *
       * INSTRUCTOR QUOTE (Lesson 355):
       * "And therefore, in reality, instead of hard coding our list items
       * like this, we might be creating that list dynamically as you learned
       * it early in the course. By mapping through all these products."
       *
       * Each product links to its detail page using:
       * - The Link component for client-side navigation
       * - Dynamic path: /products/{product.id}
       * - The id becomes the :productId parameter
       */}
      <ul>
        {/**
         * MAPPING THROUGH PRODUCTS (Lesson 355):
         * ======================================
         * INSTRUCTOR QUOTE:
         * "And therefore, in reality, instead of hard coding our list items
         * like this, we might be creating that list dynamically as you
         * learned it early in the course. By mapping through all these
         * products. And then here we're rendering a list item for every
         * product in this array."
         *
         * KEY PROP (Lesson 355):
         * ======================
         * INSTRUCTOR QUOTE:
         * "We add the key, as we should always do, when creating lists
         * like this."
         *
         * The key prop helps React efficiently update the list when
         * products are added, removed, or reordered.
         */}
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            {/**
             * DYNAMIC LINK WITH TEMPLATE LITERAL (Lessons 354, 355):
             * =======================================================
             * INSTRUCTOR QUOTE (Lesson 355):
             * "And to do that, we could add a dynamic value, where we
             * construct a string dynamically by using back ticks. So that
             * we build such a JavaScript template literal, which makes it
             * easier to dynamically inject dynamic values into this string."
             *
             * INSTRUCTOR QUOTE:
             * "And then we start with slash products, but thereafter, after
             * this second slash. We inject a dynamic value into this string.
             * And the dynamic value here could be 'prod.id'."
             *
             * TEMPLATE LITERAL BREAKDOWN:
             * ===========================
             * `/products/${product.id}`
             *
             * - Backticks (``) enable template literal syntax
             * - ${...} injects a JavaScript expression
             * - product.id is the expression being injected
             *
             * For product.id = "p1" → produces "/products/p1"
             * For product.id = "p2" → produces "/products/p2"
             *
             * LINK TEXT (Lesson 355):
             * =======================
             * INSTRUCTOR QUOTE:
             * "And in the list item, we then output our link. Where between
             * the link text, we output the product title."
             *
             * FLOW:
             * =====
             * 1. User clicks "Product 1"
             * 2. Link navigates to /products/p1
             * 3. Router matches /products/:productId route
             * 4. ProductDetailPage renders
             * 5. useParams() returns { productId: "p1" }
             *
             * THE RESULT (Lesson 355):
             * ========================
             * INSTRUCTOR QUOTE:
             * "So now we're generating multiple list items with different
             * links, which have different paths... if we click those
             * different links, we're taken to the product details page with
             * the different product IDs. Which can also be found here in
             * the URL. So, that's how this is connected."
             */}
            <Link to={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * ============================================================================
 * SUMMARY: BUILDING LINKS FOR DYNAMIC ROUTES (Lesson 355)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 355):
 * "So that's how we can generate and build links for routes that have dynamic
 * path parameters."
 *
 * THE PATTERN:
 * ============
 * 1. DEFINE DYNAMIC ROUTE (App.js):
 *    { path: '/products/:productId', element: <ProductDetailPage /> }
 *
 * 2. CREATE DYNAMIC LINKS (Products.js):
 *    products.map(product => (
 *      <Link to={`/products/${product.id}`}>{product.title}</Link>
 *    ))
 *
 * 3. ACCESS PARAMETER (ProductDetailPage.js):
 *    const { productId } = useParams();
 *
 * REAL-WORLD CONNECTION:
 * ======================
 * - Backend provides products array with IDs
 * - Frontend maps array to Link components
 * - Each Link's `to` prop includes the product ID
 * - Router matches the dynamic route
 * - Detail page uses useParams() to fetch specific product data
 */

export default ProductsPage;
