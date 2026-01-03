/**
 * ============================================================================
 * CART COMPONENT - SHOPPING CART MODAL
 * ============================================================================
 *
 * This component displays the shopping cart in a modal, allowing users to
 * view their items, adjust quantities, and proceed to checkout.
 *
 * KEY LEARNING OBJECTIVES:
 * ========================
 * 1. Consuming multiple contexts in one component
 * 2. Calculating derived values from state (cart total)
 * 3. Conditional rendering based on state
 * 4. Composing reusable components (Modal, CartItem)
 * 5. Passing callback functions as props
 *
 * CART FEATURES:
 * ==============
 * - Display list of items in cart
 * - Show quantity and price for each item
 * - +/- buttons to adjust quantities
 * - Calculate and display total price
 * - "Close" button to dismiss modal
 * - "Go to Checkout" button (only if cart has items)
 *
 * USER FLOW:
 * ==========
 * 1. User clicks cart button in Header
 * 2. UserProgressContext.showCart() is called
 * 3. Cart modal opens (progress === 'cart')
 * 4. User can adjust quantities or proceed to checkout
 * 5. Clicking "Close" → hideCart() → modal closes
 * 6. Clicking "Go to Checkout" → showCheckout() → checkout modal opens
 */

import { useContext } from 'react';

/**
 * IMPORTS
 * =======
 * - Modal: Reusable modal component for displaying the cart
 * - CartContext: Access to cart items and operations
 * - UserProgressContext: Controls which modal is displayed
 * - currencyFormatter: For formatting prices
 * - CartItem: Component for individual cart items
 */
import Modal from './Modal.jsx';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import { currencyFormatter } from '../util/formatting.js';
import CartItem from './CartItem.jsx';

/**
 * CART COMPONENT
 * ==============
 * Displays the shopping cart modal with items and total.
 */
export default function Cart() {
  /**
   * CONSUMING MULTIPLE CONTEXTS
   * ===========================
   * This component needs both contexts:
   *
   * CartContext: For cart data and operations
   * - items: Array of items to display
   * - addItem: To increase quantity (passed to CartItem)
   * - removeItem: To decrease quantity (passed to CartItem)
   *
   * UserProgressContext: For modal visibility
   * - progress: To determine if this modal should be open
   * - hideCart: To close this modal
   * - showCheckout: To open checkout modal
   */
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  /**
   * CALCULATING CART TOTAL
   * ======================
   * We use reduce() to sum up the total price of all items.
   *
   * For each item: quantity × price
   * Then sum all those values together.
   *
   * EXAMPLE:
   * --------
   * items: [
   *   { name: "Mac & Cheese", quantity: 2, price: 8.99 },
   *   { name: "Pizza", quantity: 1, price: 12.99 }
   * ]
   *
   * Calculation:
   * 0 + (2 × 8.99) = 17.98
   * 17.98 + (1 × 12.99) = 30.97
   *
   * Result: $30.97
   *
   * WHY CALCULATE IN COMPONENT?
   * ---------------------------
   * This is a "derived value" - it's calculated from the cart items.
   * We could store it in state, but that would be redundant because
   * it can always be computed from the items array.
   *
   * React's re-render will recalculate this whenever items change.
   */
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  /**
   * CLOSE CART HANDLER
   * ==================
   * Called when user clicks "Close" button.
   * Sets userProgress to '' which closes the modal.
   */
  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  /**
   * GO TO CHECKOUT HANDLER
   * ======================
   * Called when user clicks "Go to Checkout" button.
   * Sets userProgress to 'checkout' which:
   * - Closes cart modal (progress !== 'cart')
   * - Opens checkout modal (progress === 'checkout')
   */
  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  /**
   * RENDER CART MODAL
   * =================
   * We use the Modal component and pass our cart content as children.
   */
  return (
    <Modal
      /**
       * MODAL PROPS
       * ===========
       * className="cart": Adds "cart" class for specific styling
       *
       * open={progress === 'cart'}:
       * - Modal is open when userProgress is 'cart'
       * - Any other value ('', 'checkout') keeps it closed
       *
       * onClose CONDITIONAL:
       * --------------------
       * onClose={progress === 'cart' ? handleCloseCart : null}
       *
       * This is a clever pattern to handle a specific scenario:
       * When we go to checkout, userProgress changes from 'cart' to 'checkout'.
       * This causes the Cart modal to close (open becomes false).
       * The Modal's cleanup effect calls close(), which fires the onClose event.
       *
       * Without the condition:
       * - onClose would always be handleCloseCart
       * - handleCloseCart sets progress to ''
       * - Checkout modal would close immediately!
       *
       * With the condition:
       * - When progress === 'checkout', onClose is null
       * - No handler fires when cart modal closes
       * - Checkout modal opens correctly
       */
      className="cart"
      open={userProgressCtx.progress === 'cart'}
      onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
    >
      {/*
        CART TITLE
        ==========
        Simple heading for the modal.
      */}
      <h2>Your Cart</h2>

      {/*
        CART ITEMS LIST
        ===============
        We map over the cart items and render a CartItem for each.

        PASSING CALLBACK PROPS:
        -----------------------
        onIncrease={() => cartCtx.addItem(item)}
        - Creates an arrow function that calls addItem with the current item
        - When + button is clicked, addItem adds another of this item

        onDecrease={() => cartCtx.removeItem(item.id)}
        - Creates an arrow function that calls removeItem with item's ID
        - When - button is clicked, removeItem decreases quantity or removes item

        WHY ARROW FUNCTIONS?
        --------------------
        We need to pass specific arguments (item, item.id) to the context functions.
        Arrow functions let us "pre-configure" the call with these arguments.

        Alternative (less clean):
        onIncrease={cartCtx.addItem.bind(null, item)}
      */}
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>

      {/*
        CART TOTAL
        ==========
        Displays the formatted total price.

        CSS class "cart-total" provides:
        - display: flex
        - justify-content: flex-end (aligns to right)
        - font-weight: bold
        - color: #46443c (dark gray)
      */}
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>

      {/*
        ACTION BUTTONS
        ==============
        Container for the modal action buttons.

        CSS class "modal-actions" provides:
        - display: flex
        - justify-content: flex-end (buttons on right)
        - gap: 1rem (space between buttons)
      */}
      <p className="modal-actions">
        {/*
          CLOSE BUTTON
          ============
          Always visible. Closes the cart modal.

          "text-button" class: Transparent background, gold text
        */}
        <button className="text-button" onClick={handleCloseCart}>
          Close
        </button>

        {/*
          GO TO CHECKOUT BUTTON
          =====================
          Only shown if cart has items.

          CONDITIONAL RENDERING:
          ----------------------
          {condition && <Element />}

          If condition is truthy, Element is rendered.
          If condition is falsy (0, empty array length), nothing is rendered.

          Here: items.length > 0 means "cart has at least one item"

          "button" class: Gold background, dark text
        */}
        {cartCtx.items.length > 0 && (
          <button className="button" onClick={handleGoToCheckout}>
            Go to Checkout
          </button>
        )}
      </p>
    </Modal>
  );
}

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS
 * ============================================================================
 *
 * MULTIPLE CONTEXTS:
 * ==================
 * Components can consume multiple contexts to access different
 * pieces of application state. Each useContext call subscribes
 * to that context's updates.
 *
 * DERIVED STATE:
 * ==============
 * Values like cartTotal are "derived" from the source state (items).
 * Rather than storing them separately, we calculate them during render.
 * This ensures they're always in sync with the source data.
 *
 * CALLBACK PROPS:
 * ===============
 * Passing functions as props allows child components to communicate
 * back to parents (or in this case, to Context).
 *
 * Pattern: onEvent={() => handler(specificData)}
 *
 * CONDITIONAL RENDERING:
 * ======================
 * {condition && <Element />} is the idiomatic React way to
 * conditionally render elements. The element only renders when
 * condition is truthy.
 *
 * MODAL COORDINATION:
 * ===================
 * The onClose conditional prevents conflicts when transitioning
 * between modals. This is a subtle but important pattern for
 * multi-modal applications.
 *
 * COMPONENT COMPOSITION:
 * ======================
 * Cart uses:
 * - Modal: For the overlay behavior
 * - CartItem: For each item row
 *
 * This composition keeps each component focused and reusable.
 */
