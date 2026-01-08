/**
 * ============================================================================
 * PRODUCTS COMPONENT - Product List Display (Lesson 330)
 * ============================================================================
 *
 * ADDING DUMMY PRODUCTS (Lesson 330):
 * ===================================
 * INSTRUCTOR QUOTE:
 * "And by the way, for the products here, I'll instead just add a dummy
 * products array here in the products component. You could also manage them
 * differently or store them on a backend and fetch them from there. We will
 * actually talk about async code later. But for now, I'll just use a dummy
 * product array here, which is an array of products with IDs and so on."
 *
 * COMPONENT PURPOSE:
 * ==================
 * - Displays the list of available products
 * - Maps over DUMMY_PRODUCTS to render ProductItem components
 * - Each ProductItem receives product data as props
 */
import ProductItem from './ProductItem';
import classes from './Products.module.css';

/**
 * ============================================================================
 * DUMMY PRODUCTS DATA (Lesson 330)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So I'll create a dummy product array here with an array of objects where
 * we have an ID let's say of P1, where we have a price of maybe $6, where we
 * have a title of my first book, let's say, because we are selling books here
 * and a description of the first book I ever wrote."
 *
 * INSTRUCTOR QUOTE:
 * "And then I'll also add a second product for testing purposes with an ID
 * of P2, a price of maybe $5, a title of my second book and a description of
 * the second book I ever wrote."
 *
 * DATA STRUCTURE:
 * ===============
 * Each product has:
 * - id: Unique identifier (used in cart-slice to find items)
 * - price: Number (will be formatted with toFixed(2))
 * - title: Product name (stored as 'name' in cart-slice)
 * - description: Product description (displayed in ProductItem)
 *
 * NOTE: In a real application, this would come from:
 * - A backend API (fetch/axios)
 * - A database
 * - Redux state (if fetched from an API)
 */
const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    price: 6,
    title: 'My First Book',
    description: 'The first book I ever wrote',
  },
  {
    id: 'p2',
    price: 5,
    title: 'My Second Book',
    description: 'The second book I ever wrote',
  },
];

/**
 * ============================================================================
 * PRODUCTS COMPONENT (Lesson 330)
 * ============================================================================
 *
 * MAPPING OVER PRODUCTS (Lesson 330):
 * ===================================
 * INSTRUCTOR QUOTE:
 * "And now instead of rendering one product item, I'll output my dummy
 * products and map through them to render one product item per product."
 *
 * INSTRUCTOR QUOTE:
 * "So for every product I have in that products array, I wanna return a
 * product item and forward the data to that product item."
 */
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {/**
         * RENDERING PRODUCTS DYNAMICALLY (Lesson 330):
         * ============================================
         * INSTRUCTOR QUOTE:
         * "So for every product I have in that products array, I wanna return
         * a product item and forward the data to that product item. For this
         * all said key to product ID and also add ID, title, price and
         * description as extra props which I forward to product item."
         *
         * Props passed to each ProductItem:
         * - key: Required by React for list rendering (uses product.id)
         * - id: Product ID (needed for cart operations)
         * - title: Product name
         * - price: Product price
         * - description: Product description
         */}
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
