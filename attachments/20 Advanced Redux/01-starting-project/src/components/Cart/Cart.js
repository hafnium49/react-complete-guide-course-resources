/**
 * ============================================================================
 * CART COMPONENT - Shopping Cart Display (Lesson 330)
 * ============================================================================
 *
 * CONNECTING CART TO REDUX (Lesson 330):
 * ======================================
 * INSTRUCTOR QUOTE:
 * "Now of course, at the moment the cart component is also not really
 * connected to Redux. At the moment it's outputting some dummy cart item
 * with dummy data in it."
 *
 * INSTRUCTOR QUOTE:
 * "We wanna use Redux instead and to tap into our Redux managed cart state,
 * we need to use the useSelector hook here, which we import from React Redux."
 *
 * COMPONENT PURPOSE:
 * ==================
 * - Displays the shopping cart with all cart items
 * - Reads cart items from Redux state using useSelector
 * - Maps over items to render CartItem components
 * - Passes item data and ID for add/remove functionality
 */
import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

/**
 * ============================================================================
 * CART COMPONENT (Lesson 330)
 * ============================================================================
 *
 * USING useSelector TO READ CART ITEMS (Lesson 330):
 * ==================================================
 * INSTRUCTOR QUOTE:
 * "We need to use the useSelector hook here, which we import from React Redux.
 * And then we use it to extract what? State.cart.items. So to get access to
 * this items array in the cart state slice."
 */
const Cart = (props) => {
  /**
   * EXTRACTING CART ITEMS FROM REDUX (Lesson 330):
   * ==============================================
   * INSTRUCTOR QUOTE:
   * "And then we use it to extract what? State.cart.items. So to get access to
   * this items array in the cart state slice."
   *
   * STATE STRUCTURE:
   * ================
   * {
   *   ui: { cartIsVisible: true },
   *   cart: {
   *     items: [
   *       { id: 'p1', name: 'My First Book', price: 6, quantity: 2, totalPrice: 12 },
   *       { id: 'p2', name: 'My Second Book', price: 5, quantity: 1, totalPrice: 5 }
   *     ],
   *     totalQuantity: 3
   *   }
   * }
   *
   * We're accessing: state.cart.items
   */
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {/**
         * MAPPING CART ITEMS (Lesson 330):
         * ================================
         * INSTRUCTOR QUOTE:
         * "And I wanna output my cart items here. I wanna map through them and
         * I wanna output the cart item for every item where then the data we're
         * passing to cart item should come from that item."
         *
         * PASSING DATA TO CartItem (Lesson 330):
         * =====================================
         * INSTRUCTOR QUOTE:
         * "Now about the data that should be forwarded, let's go to the cart
         * item to see what's expected there... title, quantity, total and price
         * is extracted from props.item. So we forward all that data."
         *
         * Props passed to each CartItem:
         * - key: Required by React for list rendering
         * - item: Object with { title, quantity, total, price }
         *   - title comes from item.name (stored as 'name' in cart-slice)
         *   - quantity comes from item.quantity
         *   - total comes from item.totalPrice
         *   - price comes from item.price
         * - id: Item ID (needed for add/remove operations)
         *
         * INSTRUCTOR QUOTE:
         * "I should also pass the ID through to make sure that we can use that
         * for adding or for removing items."
         */}
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              title: item.name,
              quantity: item.quantity,
              total: item.totalPrice,
              price: item.price,
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
