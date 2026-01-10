/**
 * ============================================================================
 * PRODUCT ITEM COMPONENT - Individual Product Display (Lessons 330, 333)
 * ============================================================================
 *
 * ============================================================================
 * THE SIDE EFFECT CHALLENGE (Lesson 333)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 333):
 * "Let's start with running the async code, the side effect inside of our
 * components. Let's maybe start with adding items to a card from inside the
 * product item component. That means that in here we have this add to cart
 * handler and we could of course then not just dispatch an action to our
 * Redux store but we could also send that data to Firebase to the backend."
 *
 * THE PROBLEM WITH JUST SENDING PRODUCT DATA (Lesson 333):
 * ========================================================
 * INSTRUCTOR QUOTE:
 * "We would just have one problem with that. If we just send the product data
 * to Firebase, so the data which we're sending to Redux here, if we just sent
 * that to Firebase, we would just store that product data in Firebase, but
 * Firebase the way we are using it does not have any logic on its own on the
 * backend."
 *
 * INSTRUCTOR QUOTE:
 * "So on the Firebase backend we don't run any extra code. So if we send some
 * product data there, that product data would simply be added to the database
 * but all the logic we have in the reducer for checking whether a product is
 * already part of the cart and if it is updating its quantity, if it's not
 * adding it - that kind of logic simply does not run on Firebase, because
 * that's a pretty dumb backend here the way we're using it."
 *
 * WHY THIS MATTERS:
 * =================
 * If we just sent { id, title, price } to Firebase:
 * - Firebase would just store: { id: 'p1', title: 'Book', price: 6 }
 * - No checking if product already exists in cart
 * - No incrementing quantity
 * - No calculating totalPrice
 * - Just raw product data, not a proper cart!
 *
 * ============================================================================
 * BACKEND ARCHITECTURE AFFECTS FRONTEND CODE (Lesson 333)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Therefore it's important to recognize that the code we need to write on
 * the frontend and where we write that code will depend on our backend code."
 *
 * SCENARIO 1: SMART BACKEND (NOT our case):
 * ==========================================
 * INSTRUCTOR QUOTE:
 * "Now if we would have a backend API that does a lot of work so that does not
 * just store incoming data but also transform it. If we had an API like this
 * then our frontend application could do less work. It could just send data
 * like data for a product that should be added to a cart. It could send that
 * data to the backend, let the backend do the transformation and then use the
 * response on the frontend to then just there hand it off to the reducer."
 *
 * With a smart backend:
 * - Frontend sends: { productId: 'p1', action: 'add' }
 * - Backend does: finds cart, checks if product exists, updates quantity
 * - Backend returns: { items: [...], totalQuantity: 5 }
 * - Frontend reducer just stores the response (simple!)
 *
 * SCENARIO 2: DUMB BACKEND (OUR case with Firebase):
 * ===================================================
 * INSTRUCTOR QUOTE:
 * "Instead here we have a backend that does not do a lot of work. It basically
 * just stores incoming data in the format it receives it in. And that means
 * that we do need to do more work on the frontend."
 *
 * With our dumb backend:
 * - Frontend must do ALL the transformation logic
 * - Frontend sends the COMPLETE, TRANSFORMED cart to Firebase
 * - Firebase just stores whatever we send
 * - Our reducer does all the work (checking, updating, calculating)
 *
 * INSTRUCTOR QUOTE:
 * "We are not just getting the finished cart as a payload on the action,
 * instead we get a product and we need to find out how to add it to the
 * cart here in this code."
 *
 * THE CHALLENGE (Lesson 333):
 * ===========================
 * INSTRUCTOR QUOTE:
 * "Therefore we will need to find a way to still do the work here on the
 * frontend and at the same time then send that transformed data to the
 * backend without doing that sending inside of the reducer because we
 * learned that we're not allowed to do it there."
 *
 * ============================================================================
 * COMPONENT PURPOSE (Lesson 330)
 * ============================================================================
 *
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
 * PRODUCT ITEM COMPONENT (Lessons 330, 333)
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
   * ADD TO CART HANDLER (Lessons 330, 333):
   * =======================================
   * INSTRUCTOR QUOTE (Lesson 330):
   * "So in ProductItem I will add new function here, addToCartHandler where
   * I wanna dispatch such an action."
   *
   * WHERE COULD WE SEND HTTP REQUESTS? (Lesson 333):
   * =================================================
   * INSTRUCTOR QUOTE:
   * "That means that in here we have this add to cart handler and we could
   * of course then not just dispatch an action to our Redux store but we
   * could also send that data to Firebase to the backend."
   *
   * OPTION: We COULD send HTTP request here, but there's a problem...
   * The data we're dispatching is just raw product data { id, title, price }.
   * Firebase would just store this raw data without any cart logic!
   *
   * THE BETTER APPROACH (coming in next lessons):
   * ==============================================
   * Instead of sending data from here, we'll:
   * 1. Let Redux do the transformation (add to cart logic)
   * 2. Then send the TRANSFORMED cart data to Firebase
   * 3. This will happen in App.js using useEffect
   *
   * This way:
   * - Redux handles all the cart logic (quantity, totalPrice, etc.)
   * - Firebase receives the complete, correct cart state
   * - We don't duplicate logic between frontend and backend
   */
  const addToCartHandler = () => {
    /**
     * DISPATCHING addItemToCart (Lessons 330, 333):
     * ==============================================
     * INSTRUCTOR QUOTE (Lesson 330):
     * "And then dispatch cart actions, add item to cart and here we need to
     * forward the data about the product that should be added."
     *
     * WHAT WE'RE SENDING (Lesson 333):
     * ================================
     * We're sending RAW PRODUCT DATA to Redux:
     * { id: 'p1', title: 'My First Book', price: 6 }
     *
     * The REDUCER does the transformation:
     * - Checks if product already exists in cart
     * - If yes: increments quantity and totalPrice
     * - If no: adds new item with quantity 1
     *
     * WHY NOT SEND THIS DIRECTLY TO FIREBASE? (Lesson 333):
     * =====================================================
     * INSTRUCTOR QUOTE:
     * "If we just sent that to Firebase, we would just store that product
     * data in Firebase, but Firebase the way we are using it does not have
     * any logic on its own on the backend."
     *
     * Firebase would just store: { id, title, price }
     * But we need a proper cart with: { items: [...], totalQuantity }
     *
     * What happens when this runs:
     * 1. Creates action: { type: 'cart/addItemToCart', payload: { id, title, price } }
     * 2. Dispatches to Redux store
     * 3. cart-slice's addItemToCart reducer runs (does the transformation!)
     * 4. Either adds new item or updates existing item quantity
     * 5. Components using useSelector re-render with new cart state
     * 6. (Coming soon) useEffect in App.js detects cart change → sends to Firebase
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
