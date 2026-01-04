/**
 * ============================================================================
 * CART ITEM COMPONENT - INDIVIDUAL CART ITEM ROW (Lesson 294)
 * ============================================================================
 *
 * This component displays a single item in the shopping cart, including
 * the item name, quantity, price, and controls to adjust the quantity.
 *
 * LESSON 294 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Creating a separate component for cart items (vs inline in Cart.jsx)
 * 2. Using multiple props approach instead of single object prop
 * 3. Event handling with callback props (onIncrease/onDecrease)
 * 4. Keeping components "lean" by not using context directly
 *
 * WHY A SEPARATE COMPONENT? (Lesson 294)
 * ======================================
 * The instructor explains the choice:
 * "And of course, that will be relatively straightforward because for that
 * we'll simply have to add some JSX code here in the card component or
 * build a separate card item component. And I'll do the latter."
 *
 * "But of course, you could take either route. There is no right or wrong
 * here, but I'll go for a separate card item component to keep the JSX
 * code of this card component a bit leaner."
 *
 * "But it would definitely be okay if you would add the card item markup
 * here in this card component instead."
 *
 * COMPONENT DESIGN PHILOSOPHY (Lesson 294):
 * =========================================
 * This is a "dumb" or "presentational" component:
 * - No state of its own
 * - No context access (by design choice)
 * - All data comes from props
 * - All actions are callback props
 *
 * The instructor explains keeping it "lean":
 * "But if you want to keep this component a bit leaner, and you don't want
 * to add the code for using the context in there, you could simply accept
 * props like this."
 *
 * Benefits of this design:
 * - Easy to test (just pass props and check output)
 * - Highly reusable (doesn't depend on specific context)
 * - Easy to understand (no hidden dependencies)
 * - Parent controls all behavior
 *
 * PROPS INTERFACE (Lesson 294):
 * =============================
 * - name: string - The item name to display
 * - quantity: number - Current quantity in cart
 * - price: number - Price per item
 * - onIncrease: function - Called when + button clicked
 * - onDecrease: function - Called when - button clicked
 */

/**
 * IMPORTS (Lesson 294)
 * ====================
 * The instructor explains importing currencyFormatter:
 * "Though the price should be formatted and therefore we can of course
 * import this currency formatter again from that formatting JS file,
 * which we added earlier."
 */
import { currencyFormatter } from '../util/formatting.js';

/**
 * CART ITEM COMPONENT (Lesson 294)
 * =================================
 * The instructor creates this component:
 * "But here in this new component file, I'll of course again, export
 * the cart item component function."
 *
 * PROPS DESIGN DECISION (Lesson 294):
 * -----------------------------------
 * The instructor explains using multiple props:
 * "And again, we could either accept and use a single prop or multiple
 * props for the different attributes. Now here I'll go for the multi
 * prop approach to also show you this alternative."
 *
 * "And here I then would expect to get my name, my quantity, and my
 * price data so that here we can output the name. Here we can output
 * the quantity and also output that down here and here output the price."
 *
 * CALLBACK PROPS PATTERN (Lesson 294):
 * ------------------------------------
 * The instructor explains using onIncrease/onDecrease props:
 * "Alternatively, to also show you this pattern, which you already know
 * from earlier in the course, we could of course also accept extra props
 * that should get functions as values on increase and on decrease prop,
 * for example."
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
   * RENDER CART ITEM ROW (Lesson 294)
   * =================================
   * The instructor explains the component's goal:
   * "And in this component function, the main goal then is to return
   * some JSX code."
   */
  return (
    /**
     * LIST ITEM (Lesson 294)
     * ======================
     * The instructor explains:
     * "And here I wanna return a list item, which should receive a class
     * name of cart dash item for styling purposes."
     *
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
        ITEM INFO (Lesson 294)
        ======================
        The instructor explains the structure:
        "And then in the list item, there should be a paragraph, which
        in the end outputs the name of the card item. And then next to
        it separated by a dash, the quantity times the price."

        Format: "Item Name - quantity x $price"
        Example: "Mac & Cheese - 2 x $8.99"

        The instructor emphasizes formatting:
        "And then simply call format on that price here."

        Note: We don't show the line total (quantity × price) here.
        The total for all items is shown separately in Cart.jsx.
      */}
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>

      {/*
        QUANTITY CONTROLS (Lesson 294)
        ==============================
        The instructor explains this section:
        "And then below that I wanna have another paragraph where I wanna
        have multiple buttons that can be clicked to interact with that
        card item. One button basically to reduce the quantity then
        another button to increase the quantity. And between those buttons,
        a span where I output the current quantity."

        WHY NOT CUSTOM BUTTON? (Lesson 294)
        -----------------------------------
        The instructor explains:
        "Now here, I'll not use my custom button component because here
        in this card item I wanna have a very different button look."

        CSS CLASS (Lesson 294):
        -----------------------
        "Therefore instead here, I'll just add a class name to this
        surrounding paragraph which should be card dash item, dash actions
        which will take care of styling the content in there."

        CSS "cart-item-actions" provides:
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
          DECREASE BUTTON (Lesson 294)
          ============================
          The instructor explains using callback props:
          "And use these props as values for the on click prop on these
          buttons. So on decrease on the minus button."

          Clicking this calls the onDecrease prop function.

          In Cart.jsx (Lesson 294), this is wired to:
          onDecrease={() => cartCtx.removeItem(item.id)}

          The instructor explains how parent connects it:
          "And on decrease gets a function where we call card context
          remove item and where we pass the item ID to this function."

          The removeItem function:
          - If quantity > 1: decreases quantity by 1
          - If quantity === 1: removes item from cart entirely
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
          INCREASE BUTTON (Lesson 294)
          ============================
          The instructor explains:
          "and on increase on the plus button."

          Clicking this calls the onIncrease prop function.

          In Cart.jsx (Lesson 294), this is wired to:
          onIncrease={() => cartCtx.addItem(item)}

          The instructor explains how parent connects it:
          "So triggering those extra functions is as simple as passing
          an anonymous function here to on increase and calling card
          context add item here and passing this item for which we're
          rendering this card item here as a value to add item."

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
 * SUMMARY & KEY CONCEPTS FROM LESSON 294
 * ============================================================================
 *
 * LESSON 294 WORKFLOW:
 * ====================
 * 1. Create CartItem.jsx as a separate component (vs inline in Cart)
 * 2. Return a list item with class "cart-item"
 * 3. Display name, quantity x price format
 * 4. Add buttons with class "cart-item-actions"
 * 5. Use callback props (onIncrease/onDecrease) instead of context
 * 6. Accept individual props (name, quantity, price) vs single object
 * 7. Format price with currencyFormatter
 *
 * WHY SEPARATE COMPONENT? (Lesson 294)
 * =====================================
 * The instructor explains:
 * "but I'll go for a separate card item component to keep the JSX
 * code of this card component a bit leaner."
 *
 * CALLBACK PROPS PATTERN (Lesson 294):
 * ====================================
 * The instructor explains this alternative to using context:
 * "Alternatively, to also show you this pattern, which you already know
 * from earlier in the course, we could of course also accept extra props
 * that should get functions as values on increase and on decrease prop."
 *
 * "And with that, this component here would not need to tap into this
 * context, even though that also wouldn't be wrong. But if you want to
 * keep this component a bit leaner, and you don't want to add the code
 * for using the context in there, you could simply accept props like this."
 *
 * Parent component (Cart) defines the behavior:
 * onIncrease={() => cartCtx.addItem(item)}
 *
 * Child component (CartItem) just calls the prop:
 * <button onClick={onIncrease}>+</button>
 *
 * ALTERNATIVE: CONTEXT IN CARTITEM (Lesson 294):
 * ==============================================
 * The instructor mentions the alternative:
 * "Now to trigger these functions, we can, of course again, use our
 * context here in the card item."
 *
 * Both approaches are valid - the choice depends on:
 * - How "lean" you want the component
 * - Whether you want context dependencies
 * - Reusability requirements
 *
 * MULTI-PROP VS SINGLE PROP (Lesson 294):
 * =======================================
 * The instructor shows both approaches:
 * "And again, we could either accept and use a single prop or multiple
 * props for the different attributes. Now here I'll go for the multi
 * prop approach to also show you this alternative."
 *
 * WHAT'S NEXT (end of Lesson 294):
 * ================================
 * The instructor explains the next step:
 * "And therefore, now the next step is to make sure that we can also
 * go to the checkout. Though this button here should really also only
 * be shown if we have items in the cart."
 */
