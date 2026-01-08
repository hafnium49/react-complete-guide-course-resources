/**
 * ============================================================================
 * CART ITEM COMPONENT - Individual Cart Item Display (Lesson 330)
 * ============================================================================
 *
 * ADDING PLUS/MINUS FUNCTIONALITY (Lesson 330):
 * =============================================
 * INSTRUCTOR QUOTE:
 * "In cart item therefore, I'll add new functions for the handlers... so the
 * remove item handler, and then also the add item handler."
 *
 * COMPONENT PURPOSE:
 * ==================
 * 1. Displays individual cart item (title, price, quantity, total)
 * 2. Has "-" button that dispatches removeItemFromCart action
 * 3. Has "+" button that dispatches addItemToCart action
 * 4. Uses item ID for add/remove operations
 *
 * CONNECTING TO REDUX (Lesson 330):
 * =================================
 * This component demonstrates:
 * - Importing action creators from cart-slice
 * - Using useDispatch to get the dispatch function
 * - Dispatching different actions for add vs remove
 * - Different payload structures for each action
 */
import { useDispatch } from 'react-redux';

import { cartActions } from '../../store/cart-slice';
import classes from './CartItem.module.css';

/**
 * ============================================================================
 * CART ITEM COMPONENT (Lesson 330)
 * ============================================================================
 *
 * PROPS RECEIVED FROM Cart.js:
 * ============================
 * props.item = {
 *   id: 'p1',
 *   title: 'My First Book',
 *   quantity: 2,
 *   total: 12,      // totalPrice from Redux
 *   price: 6        // individual item price
 * }
 */
const CartItem = (props) => {
  /**
   * EXTRACTING PROPS (Lesson 330):
   * ==============================
   * We destructure from props.item since Cart.js passes the data that way.
   * Note: 'id' is now included for dispatching actions.
   */
  const { id, title, quantity, total, price } = props.item;

  /**
   * USING useDispatch (Lesson 330):
   * ===============================
   * INSTRUCTOR QUOTE:
   * "Here I will of course need to import useDispatch from React Redux again
   * as I did in other components... I get access to the dispatch function by
   * calling useDispatch like this."
   */
  const dispatch = useDispatch();

  /**
   * REMOVE ITEM HANDLER (Lesson 330):
   * =================================
   * INSTRUCTOR QUOTE:
   * "I can then add my handlers here, remove item handler... In there I wanna
   * dispatch an action, cart actions, remove item from cart, and here I need
   * to pass the ID of the item that should be removed. And for that of course,
   * we have to use the ID received on the item."
   *
   * PAYLOAD DIFFERENCE (Lesson 330):
   * ================================
   * INSTRUCTOR QUOTE:
   * "So here we just dispatch that ID. We don't pass an object because remove
   * item from cart, as you can see, just expects the ID as a payload. So here
   * the action payload simply is the ID whereas for add item to cart, we expect
   * an object."
   */
  const removeItemHandler = () => {
    /**
     * DISPATCHING removeItemFromCart (Lesson 330):
     * ============================================
     * INSTRUCTOR QUOTE:
     * "In there I wanna dispatch an action, cart actions, remove item from cart,
     * and here I need to pass the ID of the item that should be removed."
     *
     * What happens when this runs:
     * 1. Creates action: { type: 'cart/removeItemFromCart', payload: 'p1' }
     * 2. Dispatches to Redux store
     * 3. cart-slice's removeItemFromCart reducer runs
     * 4. Either decrements quantity or removes item entirely
     * 5. Components using useSelector re-render with new cart state
     */
    dispatch(cartActions.removeItemFromCart(id));
  };

  /**
   * ADD ITEM HANDLER (Lesson 330):
   * ==============================
   * INSTRUCTOR QUOTE:
   * "Add item handler on the other hand needs more data. We need to pass an
   * object here to add item to cart. And pass an ID, a title and the price."
   */
  const addItemHandler = () => {
    /**
     * DISPATCHING addItemToCart (Lesson 330):
     * =======================================
     * INSTRUCTOR QUOTE:
     * "Add item handler on the other hand needs more data. We need to pass an
     * object here to add item to cart. And pass an ID, a title and the price."
     *
     * Why pass an object here vs just ID for remove?
     * - addItemToCart might be adding a NEW item (needs all info)
     * - removeItemFromCart always works on EXISTING items (ID is enough)
     *
     * What happens when this runs:
     * 1. Creates action: { type: 'cart/addItemToCart', payload: { id, title, price } }
     * 2. Dispatches to Redux store
     * 3. cart-slice's addItemToCart reducer runs
     * 4. Since item exists, just increments quantity and totalPrice
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
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          {/**
           * BINDING HANDLERS TO BUTTONS (Lesson 330):
           * =========================================
           * INSTRUCTOR QUOTE:
           * "And then we can bind those to the buttons. On the first button here,
           * on click we wanna remove an item, and on the second button we wanna
           * add an item."
           *
           * - "-" button: Removes one from quantity (or removes item if qty is 1)
           * - "+" button: Adds one to quantity
           */}
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
