/**
 * ============================================================================
 * CART ITEM COMPONENT - INDIVIDUAL CART ITEM ROW
 * ============================================================================
 *
 * This component displays a single item in the shopping cart, including
 * the item name, quantity, price, and controls to adjust the quantity.
 *
 * KEY LEARNING OBJECTIVES:
 * ========================
 * 1. Creating "dumb" presentational components
 * 2. Receiving all data and callbacks via props
 * 3. Keeping components simple and focused
 * 4. Event handling with callback props
 *
 * COMPONENT DESIGN PHILOSOPHY:
 * ============================
 * This is a "dumb" or "presentational" component:
 * - No state of its own
 * - No context access
 * - All data comes from props
 * - All actions are callback props
 *
 * Benefits of this design:
 * - Easy to test (just pass props and check output)
 * - Highly reusable (doesn't depend on specific context)
 * - Easy to understand (no hidden dependencies)
 * - Parent controls all behavior
 *
 * PROPS INTERFACE:
 * ================
 * - name: string - The item name to display
 * - quantity: number - Current quantity in cart
 * - price: number - Price per item
 * - onIncrease: function - Called when + button clicked
 * - onDecrease: function - Called when - button clicked
 */

import { currencyFormatter } from '../util/formatting.js';

/**
 * CART ITEM COMPONENT
 * ===================
 * Renders a single row in the cart list.
 *
 * @param {Object} props
 * @param {string} props.name - Item name
 * @param {number} props.quantity - Quantity in cart
 * @param {number} props.price - Price per item
 * @param {Function} props.onIncrease - Handler for + button
 * @param {Function} props.onDecrease - Handler for - button
 */
export default function CartItem({ name, quantity, price, onIncrease, onDecrease }) {
  /**
   * RENDER CART ITEM ROW
   * ====================
   * A simple row displaying item info and quantity controls.
   */
  return (
    /**
     * LIST ITEM
     * =========
     * We use <li> because this is rendered inside a <ul> in Cart.jsx.
     *
     * CSS class "cart-item" provides:
     * - display: flex
     * - justify-content: space-between (text left, controls right)
     * - align-items: center
     * - margin: 0.5rem 0
     */
    <li className="cart-item">
      {/*
        ITEM INFO
        =========
        Displays: "Item Name - quantity x $price"
        Example: "Mac & Cheese - 2 x $8.99"

        The format shows:
        - What the item is (name)
        - How many they're ordering (quantity)
        - The unit price (formatted as currency)

        Note: We don't show the line total (quantity × price) here.
        The total for all items is shown separately in Cart.jsx.
      */}
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>

      {/*
        QUANTITY CONTROLS
        =================
        +/- buttons with quantity display between them.

        CSS class "cart-item-actions" provides:
        - display: flex
        - gap: 1rem (space between buttons and number)
        - align-items: center

        Button styling (from index.css):
        - width/height: 1.5rem
        - border-radius: 50% (circular)
        - background: #312c1d (dark brown)
        - color: #ffc404 (gold)
      */}
      <p className="cart-item-actions">
        {/*
          DECREASE BUTTON
          ===============
          Clicking this calls the onDecrease prop function.

          In Cart.jsx, this is wired to:
          onDecrease={() => cartCtx.removeItem(item.id)}

          The removeItem function:
          - If quantity > 1: decreases quantity by 1
          - If quantity === 1: removes item from cart entirely

          ACCESSIBILITY NOTE:
          -------------------
          For better accessibility, these buttons should have:
          - aria-label="Decrease quantity of {name}"
          - type="button" (explicit, though it's the default)
        */}
        <button onClick={onDecrease}>-</button>

        {/*
          QUANTITY DISPLAY
          ================
          Shows the current quantity between the buttons.
          This is just a display - users change it via the buttons.
        */}
        <span>{quantity}</span>

        {/*
          INCREASE BUTTON
          ===============
          Clicking this calls the onIncrease prop function.

          In Cart.jsx, this is wired to:
          onIncrease={() => cartCtx.addItem(item)}

          The addItem function:
          - Finds the item in the cart
          - Increments its quantity by 1

          Note: addItem receives the full item object so it has
          access to all item data if needed.
        */}
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS
 * ============================================================================
 *
 * PRESENTATIONAL COMPONENTS:
 * ==========================
 * CartItem is a pure presentational component:
 * - Receives everything via props
 * - No internal state
 * - No context dependencies
 * - Just renders UI based on props
 *
 * This pattern is also called:
 * - "Dumb" components (vs "smart" container components)
 * - "Stateless" components (though they can have local UI state)
 * - "Pure" components (output depends only on props)
 *
 * CALLBACK PROPS PATTERN:
 * =======================
 * Parent component (Cart) defines the behavior:
 * onIncrease={() => cartCtx.addItem(item)}
 *
 * Child component (CartItem) just calls the prop:
 * <button onClick={onIncrease}>+</button>
 *
 * This separation means:
 * - CartItem doesn't need to know about CartContext
 * - CartItem could be used in different contexts
 * - Testing is simpler (mock the callback)
 * - Behavior can be changed by parent without modifying CartItem
 *
 * FORMATTING DISPLAY DATA:
 * ========================
 * We format the price using currencyFormatter.format(price).
 * Raw data (8.99) becomes display data ("$8.99").
 *
 * FORMAT STRING: "{name} - {quantity} x ${price}"
 * Example: "Mac & Cheese - 2 x $8.99"
 *
 * This format clearly shows:
 * - What item
 * - How many
 * - Price per item
 *
 * SEMANTIC HTML:
 * ==============
 * - <li> for list item (inside <ul> in parent)
 * - <p> for text content
 * - <span> for inline text (quantity number)
 * - <button> for interactive controls
 *
 * POTENTIAL ENHANCEMENTS:
 * =======================
 * If extending this component, consider:
 * - aria-labels for accessibility
 * - Disable - button when quantity is 1 (about to remove)
 * - Confirmation before removing last item
 * - Item image thumbnail
 * - Line total display
 */
