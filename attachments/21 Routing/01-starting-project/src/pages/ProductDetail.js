/**
 * ============================================================================
 * PRODUCT DETAIL PAGE COMPONENT (Lesson 354)
 * ============================================================================
 *
 * WHY A PRODUCT DETAIL PAGE? (Lesson 354):
 * ========================================
 * INSTRUCTOR QUOTE:
 * "It would be quite common to load a separate details page for the different
 * products. And, of course, that is what you have essentially on any online
 * shop. You have a list of products, you can click on a product to view the
 * details of that product."
 *
 * INSTRUCTOR QUOTE:
 * "Now, in order to do so, what you would typically have is a separate page,
 * maybe called 'Product Detail'. So the product detail page like this."
 *
 * ============================================================================
 * DYNAMIC ROUTES & PATH PARAMETERS (Lesson 354)
 * ============================================================================
 *
 * THE PROBLEM (Lesson 354):
 * =========================
 * INSTRUCTOR QUOTE:
 * "But what's now the path for this route? Of course, it could be /productdetail.
 * But, keep in mind that we typically have different products here with different
 * details. So whilst we always wanna load the same component, the data that will
 * be displayed in there will be different for the different products."
 *
 * WHY NOT HARDCODE PATHS? (Lesson 354):
 * =====================================
 * INSTRUCTOR QUOTE:
 * "Now of course we could add multiple paths like this. Now we have three route
 * definitions with slightly different paths. But that of course is not a realistic
 * approach because the more products we have, the more paths must be added."
 *
 * INSTRUCTOR QUOTE:
 * "And typically we don't even know in advance how many products we'll have.
 * And we also will add more products dynamically. After all, most websites are
 * pretty dynamic and users and administrators might be able to add new products.
 * We don't want to add it to code all the time."
 *
 * THE SOLUTION - DYNAMIC PATH SEGMENTS (Lesson 354):
 * ==================================================
 * INSTRUCTOR QUOTE:
 * "And that's why React Router DOM supports dynamic path segments or path
 * parameters as it's also called. You add a parameter to a path. So such
 * dynamic path segment. By adding a colon and then any identifier of your
 * choice like Id or product Id."
 *
 * ROUTE DEFINITION IN App.js:
 * ===========================
 * { path: '/products/:productId', element: <ProductDetailPage /> }
 *
 * THE COLON IS CRUCIAL (Lesson 354):
 * ==================================
 * INSTRUCTOR QUOTE:
 * "The colon is very important though. This signals to React Router DOM that
 * this part of the path is dynamic. So that you actually don't want to load
 * this element for /products:/productId. But instead /products/ any value
 * that will be used as an actual value for this product Id placeholder."
 *
 * HOW IT WORKS:
 * =============
 * | URL                    | :productId value | Page Loaded        |
 * |------------------------|------------------|--------------------|
 * | /products/p1           | "p1"             | ProductDetailPage  |
 * | /products/product-1    | "product-1"      | ProductDetailPage  |
 * | /products/abc          | "abc"            | ProductDetailPage  |
 * | /products/123          | "123"            | ProductDetailPage  |
 *
 * INSTRUCTOR QUOTE:
 * "So now we load the same component for all these paths because the part
 * after /products is dynamic and we can plug in any value of our choice
 * for this placeholder."
 *
 * ============================================================================
 * useParams HOOK (Lesson 354)
 * ============================================================================
 *
 * WHY DO WE NEED THE PARAMETER VALUE? (Lesson 354):
 * =================================================
 * INSTRUCTOR QUOTE:
 * "Now let's say, that on 'Product Detail' page we of course wanna know for
 * which exact product this page was loaded. We wanna know which product Id
 * was used so that we could, for example, reach out to backend API and a
 * database to fetch the data for that specific product and display it on
 * the screen."
 *
 * THE SOLUTION - useParams (Lesson 354):
 * ======================================
 * INSTRUCTOR QUOTE:
 * "And therefore React Router DOM gives us another tool for getting hold of
 * the actual value used instead of that placeholder. Instead of :productId.
 * And that tool which we get from React Router DOM is the useParams hook."
 *
 * HOW useParams WORKS (Lesson 354):
 * =================================
 * INSTRUCTOR QUOTE:
 * "This hook gives us a params object, if we call it like this. And this
 * params object is a simple JavaScript object which contains every dynamic
 * path segment we defined in our route definition as a property."
 *
 * PARAMETER NAMING (Lesson 354):
 * ==============================
 * INSTRUCTOR QUOTE:
 * "So in my case here, I got a property called productId on this params
 * object because in my route definition I chose productId as an identifier
 * for this placeholder, for this path parameter, for this dynamic path segment."
 *
 * INSTRUCTOR QUOTE:
 * "So the part after the colon that is the identifier, which you can use
 * as a property name on that params object here."
 *
 * MATCH YOUR IDENTIFIERS (Lesson 354):
 * ====================================
 * INSTRUCTOR QUOTE:
 * "Of course, if you chose a different identifier after the colon in your
 * route definition. If you chose just Id for example you have to use that
 * identifier here, like this."
 *
 * Route: '/products/:productId'  →  params.productId
 * Route: '/products/:id'         →  params.id
 * Route: '/users/:userId'        →  params.userId
 */

/**
 * useParams HOOK IMPORT (Lesson 354):
 * ===================================
 * INSTRUCTOR QUOTE (Lesson 354):
 * "And that tool which we get from React Router DOM is the useParams hook."
 *
 * useParams returns an object containing:
 * - Key: The parameter name from the route definition (after the colon)
 * - Value: The actual value from the current URL
 */
import { useParams } from 'react-router-dom';

/**
 * PRODUCT DETAIL PAGE COMPONENT:
 * ==============================
 * INSTRUCTOR QUOTE (Lesson 354):
 * "So the product detail page like this, which we also export. And then here
 * we might want to show the product specific data."
 *
 * This component demonstrates:
 * 1. Using dynamic routes (loaded for /products/:productId)
 * 2. Accessing URL parameters with useParams hook
 * 3. Displaying parameter-based content
 */
function ProductDetailPage() {
  /**
   * =========================================================================
   * ACCESSING URL PARAMETERS WITH useParams (Lesson 354)
   * =========================================================================
   *
   * INSTRUCTOR QUOTE (Lesson 354):
   * "This hook gives us a params object, if we call it like this. And this
   * params object is a simple JavaScript object which contains every dynamic
   * path segment we defined in our route definition as a property."
   *
   * WHAT params CONTAINS:
   * =====================
   * For URL: /products/product-1
   * Route:   /products/:productId
   *
   * params = {
   *   productId: "product-1"   // The actual value from the URL
   * }
   *
   * REAL-WORLD USAGE:
   * =================
   * In a real application, you would:
   * 1. Get the productId from params
   * 2. Use it to fetch product data from an API
   * 3. Display the fetched data in the component
   *
   * Example:
   * const { productId } = useParams();
   * useEffect(() => {
   *   fetch(`/api/products/${productId}`)
   *     .then(res => res.json())
   *     .then(data => setProduct(data));
   * }, [productId]);
   */
  const params = useParams();

  return (
    <>
      <h1>Product Details</h1>
      {/**
       * DISPLAYING THE PARAMETER VALUE (Lesson 354):
       * =============================================
       * INSTRUCTOR QUOTE:
       * "And therefore we can, of course, output that Id here below the title
       * maybe. We can output params.productId"
       *
       * WHAT YOU'LL SEE (Lesson 354):
       * =============================
       * INSTRUCTOR QUOTE:
       * "And with that you will see that now I see ABC here if I'm on
       * /products/abc. If I visit /products/product-1 I see product-1 here."
       *
       * TYPICAL USE CASE (Lesson 354):
       * ==============================
       * INSTRUCTOR QUOTE:
       * "So that's how we can get hold of that data that's encoded in the url.
       * And typically you encode things like Ids of items or products in the
       * URL because then here in product detail, we could reach out to a
       * backend and fetch the data for this product."
       */}
      <p>{params.productId}</p>
    </>
  );
}

export default ProductDetailPage;

/**
 * ============================================================================
 * SUMMARY: DYNAMIC ROUTES (Lesson 354)
 * ============================================================================
 *
 * 1. DEFINE DYNAMIC ROUTE (in App.js):
 *    { path: '/products/:productId', element: <ProductDetailPage /> }
 *    - The colon (:) makes the segment dynamic
 *    - The identifier (productId) is your choice
 *
 * 2. ACCESS PARAMETERS (in the component):
 *    import { useParams } from 'react-router-dom';
 *    const params = useParams();
 *    const productId = params.productId;
 *
 * 3. USE THE VALUE:
 *    - Display it directly
 *    - Fetch data from API
 *    - Any logic based on the parameter
 *
 * COMMON USE CASES:
 * =================
 * - /products/:productId  → Product detail pages
 * - /users/:userId        → User profile pages
 * - /posts/:postId        → Blog post pages
 * - /orders/:orderId      → Order detail pages
 *
 * INSTRUCTOR QUOTE (Lesson 354):
 * "But that's something we'll do later, when we will dive deeper into the
 * data fetching capabilities of React Router DOM."
 */
