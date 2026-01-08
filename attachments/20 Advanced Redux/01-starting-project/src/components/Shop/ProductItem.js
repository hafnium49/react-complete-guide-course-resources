/**
 * ============================================================================
 * PRODUCT ITEM COMPONENT - Individual Product Display (Lesson 330)
 * ============================================================================
 *
 * COMPONENT PURPOSE (Lesson 330):
 * ===============================
 * INSTRUCTOR QUOTE:
 * "Now let's say, next, work on products item and in the products item
 * component, we also wanna connect that to Redux. So that when Add to Cart
 * is clicked, we wanna dispatch a action with help of the cart actions, of
 * course."
 *
 * WHAT THIS COMPONENT DOES:
 * =========================
 * 1. Displays individual product information (title, price, description)
 * 2. Has "Add to Cart" button that dispatches addItemToCart action
 * 3. Passes product data (id, title, price) to Redux when adding to cart
 *
 * CONNECTING TO REDUX (Lesson 330):
 * =================================
 * This component demonstrates:
 * - Importing action creators from cart-slice
 * - Using useDispatch to get the dispatch function
 * - Dispatching actions with payload data in event handlers
 */
import { useDispatch } from 'react-redux';

/**
 * IMPORTING CART ACTIONS (Lesson 330):
 * ====================================
 * INSTRUCTOR QUOTE:
 * "So in ProductItem I will add new function here, addToCartHandler where
 * I wanna dispatch such an action. And here of course I need to import the
 * dispatch function, so I'll use the use dispatch hook here."
 *
 * Import path breakdown:
 * - ../ - Up from Shop folder to components
 * - ../ - Up from components to src
 * - store/cart-slice - Into store folder, cart-slice file
 */
import { cartActions } from '../../store/cart-slice';

import Card from '../UI/Card';
import classes from './ProductItem.module.css';

/**
 * ============================================================================
 * PRODUCT ITEM COMPONENT (Lesson 330)
 * ============================================================================
 *
 * PROPS RECEIVED FROM Products.js:
 * =================================
 * - id: Product ID (needed for cart operations)
 * - title: Product name
 * - price: Product price
 * - description: Product description
 */
const ProductItem = (props) => {
  /**
   * EXTRACTING PROPS (Lesson 330):
   * ==============================
   * INSTRUCTOR QUOTE:
   * "For this all said key to product ID and also add ID, title, price and
   * description as extra props which I forward to product item."
   *
   * We now also extract 'id' which was not used before,
   * but is needed for the cart functionality.
   */
  const { id, title, price, description } = props;

  /**
   * USING useDispatch (Lesson 330):
   * ===============================
   * INSTRUCTOR QUOTE:
   * "And here of course I need to import the dispatch function, so I'll use
   * the use dispatch hook here."
   *
   * useDispatch() returns the store's dispatch function.
   * We use this to send actions to Redux.
   */
  const dispatch = useDispatch();

  /**
   * ADD TO CART HANDLER (Lesson 330):
   * =================================
   * INSTRUCTOR QUOTE:
   * "So in ProductItem I will add new function here, addToCartHandler where
   * I wanna dispatch such an action."
   *
   * INSTRUCTOR QUOTE:
   * "And then dispatch cart actions, add item to cart and here we need to
   * forward the data about the product that should be added. And the product
   * item component already receives all the relevant information through props.
   * So all I need to do is forward props.ID, props.title and props.price."
   */
  const addToCartHandler = () => {
    /**
     * DISPATCHING addItemToCart (Lesson 330):
     * =======================================
     * INSTRUCTOR QUOTE:
     * "And then dispatch cart actions, add item to cart and here we need to
     * forward the data about the product that should be added."
     *
     * INSTRUCTOR QUOTE:
     * "And the product item component already receives all the relevant
     * information through props. So all I need to do is forward props.ID,
     * props.title and props.price."
     *
     * What happens when this runs:
     * 1. Creates action: { type: 'cart/addItemToCart', payload: { id, title, price } }
     * 2. Dispatches to Redux store
     * 3. cart-slice's addItemToCart reducer runs
     * 4. Either adds new item or updates existing item quantity
     * 5. Components using useSelector re-render with new cart state
     */
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          {/**
           * BINDING THE HANDLER (Lesson 330):
           * =================================
           * INSTRUCTOR QUOTE:
           * "And then we bind this addToCartHandler to the button here with
           * onClick for example."
           *
           * onClick={addToCartHandler} triggers the handler when button is clicked.
           * The handler then dispatches the addItemToCart action to Redux.
           */}
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
