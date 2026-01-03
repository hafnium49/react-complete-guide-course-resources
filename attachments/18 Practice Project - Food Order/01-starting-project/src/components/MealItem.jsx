/**
 * ============================================================================
 * MEAL ITEM COMPONENT - INDIVIDUAL MEAL CARD
 * ============================================================================
 *
 * This component renders a single meal card with image, details, and an
 * "Add to Cart" button. It's used by the Meals component to display each
 * meal in the grid.
 *
 * KEY LEARNING OBJECTIVES:
 * ========================
 * 1. Creating presentational components that receive data via props
 * 2. Consuming Context to access shared functionality (addItem)
 * 3. Handling user interactions (click events)
 * 4. Formatting data for display (currency)
 * 5. Working with backend images
 *
 * COMPONENT RESPONSIBILITIES:
 * ===========================
 * - Display meal image
 * - Show meal name, price, and description
 * - Provide "Add to Cart" button
 * - Add meal to cart when button is clicked
 *
 * DATA FLOW:
 * ==========
 * Props in:  meal object from Meals component
 * Action out: addItem() called on CartContext when button clicked
 */

import { useContext } from 'react';

/**
 * IMPORTS
 * =======
 * - currencyFormatter: Utility for formatting prices as currency
 * - CartContext: Context for accessing cart operations
 */
import { currencyFormatter } from '../util/formatting.js';
import CartContext from '../store/CartContext.jsx';

/**
 * MEAL ITEM COMPONENT
 * ===================
 * Renders a meal card with image, details, and add to cart functionality.
 *
 * @param {Object} props
 * @param {Object} props.meal - Meal data object
 * @param {string} props.meal.id - Unique identifier
 * @param {string} props.meal.name - Meal name
 * @param {number|string} props.meal.price - Meal price
 * @param {string} props.meal.description - Meal description
 * @param {string} props.meal.image - Image path (relative to backend)
 */
export default function MealItem({ meal }) {
  /**
   * CONSUMING CART CONTEXT
   * ======================
   * We use useContext to access the CartContext.
   *
   * We only need the addItem function from the context.
   * We could destructure it: const { addItem } = useContext(CartContext);
   * But keeping cartCtx makes it clear where addItem comes from.
   */
  const cartCtx = useContext(CartContext);

  /**
   * ADD TO CART HANDLER
   * ===================
   * Called when user clicks the "Add to Cart" button.
   *
   * WHAT HAPPENS:
   * 1. cartCtx.addItem(meal) dispatches ADD_ITEM action to the reducer
   * 2. Reducer checks if meal already exists in cart
   * 3. If exists: increment quantity
   * 4. If not: add meal with quantity 1
   * 5. CartContext state updates
   * 6. All components consuming CartContext re-render
   * 7. Header shows updated cart count
   *
   * WHY PASS THE WHOLE MEAL OBJECT?
   * -------------------------------
   * The cart needs all meal data (id, name, price, etc.) to:
   * - Display the item in the cart
   * - Calculate totals
   * - Include in order submission
   *
   * We could pass just the ID and look up the meal, but passing
   * the whole object is simpler and more efficient.
   */
  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }

  /**
   * RENDER MEAL CARD
   * ================
   * The meal card structure follows the CSS classes defined in index.css.
   */
  return (
    /**
     * LIST ITEM
     * =========
     * We use <li> because this component is rendered inside a <ul> in Meals.
     * The "meal-item" class provides card styling:
     * - background-color: #1d1a16 (dark)
     * - border-radius: 1rem
     * - overflow: hidden (clips image corners)
     * - text-align: center
     * - box-shadow for depth
     */
    <li className="meal-item">
      {/*
        ARTICLE ELEMENT
        ===============
        Using <article> is semantically correct for self-contained content
        that could be distributed independently.

        The CSS makes this a flex container with space-between to push
        the button to the bottom of the card.
      */}
      <article>
        {/*
          MEAL IMAGE
          ==========
          Images are served by the backend at http://localhost:3000/

          meal.image contains a relative path like "images/mac-and-cheese.jpg"
          We concatenate with the backend URL to get the full path.

          Template literal: `http://localhost:3000/${meal.image}`
          Result: "http://localhost:3000/images/mac-and-cheese.jpg"

          ALT TEXT:
          ---------
          Using meal.name as alt text is good for accessibility.
          Screen readers will announce "Mac & Cheese" instead of just "image".

          CSS styling (from index.css):
          - width: 100%
          - height: 20rem
          - object-fit: cover (maintains aspect ratio, crops if needed)
        */}
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />

        {/*
          MEAL DETAILS
          ============
          Container for the text content of the meal card.
        */}
        <div>
          {/*
            MEAL NAME
            =========
            The h3 element displays the meal name prominently.

            CSS styling:
            - font-size: 1.5rem
            - font-weight: bold
            - margin: 0.75rem 0
          */}
          <h3>{meal.name}</h3>

          {/*
            MEAL PRICE
            ==========
            Displays the formatted price in a styled badge.

            CURRENCY FORMATTING:
            --------------------
            currencyFormatter.format(meal.price)

            Takes the raw price (e.g., 8.99 or "8.99") and formats it
            as US currency: "$8.99"

            The formatter handles:
            - Adding $ symbol
            - Proper decimal places
            - Thousands separators for large numbers

            CSS styling (meal-item-price class):
            - display: inline-block
            - background-color: #312c1d (brown/gold)
            - color: #ffc404 (gold)
            - padding: 0.5rem 2rem
            - border-radius: 4px
          */}
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>

          {/*
            MEAL DESCRIPTION
            ================
            The description text provides more detail about the meal.

            CSS styling (meal-item-description class):
            - margin: 1rem
          */}
          <p className="meal-item-description">{meal.description}</p>
        </div>

        {/*
          ACTIONS SECTION
          ===============
          Container for action buttons (currently just "Add to Cart").

          CSS styling (meal-item-actions class):
          - margin-bottom: 1.5rem
        */}
        <p className="meal-item-actions">
          {/*
            ADD TO CART BUTTON
            ==================
            The main call-to-action for this component.

            onClick={handleAddMealToCart}:
            - When clicked, calls our handler function
            - Handler adds the meal to the cart via Context
            - No need for event.preventDefault() since it's a button, not form

            className="button":
            - Gold background (#ffc404)
            - Dark text (#1f1a09)
            - Hover effect (slightly darker gold)
            - cursor: pointer
          */}
          <button className="button" onClick={handleAddMealToCart}>
            Add to Cart
          </button>
        </p>
      </article>
    </li>
  );
}

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS
 * ============================================================================
 *
 * PRESENTATIONAL VS CONTAINER COMPONENTS:
 * =======================================
 * MealItem is primarily a PRESENTATIONAL component:
 * - Receives data via props
 * - Displays that data
 * - Has minimal logic
 *
 * The one "smart" part is accessing CartContext for the addItem function.
 * This is a reasonable exception - the alternative would be passing
 * the addItem function as a prop from Meals, which adds coupling.
 *
 * CONTEXT USAGE:
 * ==============
 * Instead of prop drilling:
 *   App → Meals → MealItem (pass addItem as prop through each level)
 *
 * We use Context:
 *   CartContextProvider wraps the tree
 *   MealItem directly accesses addItem via useContext
 *
 * This is cleaner when many components need the same data/functions.
 *
 * IMAGE HANDLING:
 * ===============
 * Backend images are served statically from the backend server.
 * The meal.image property contains a relative path, and we construct
 * the full URL using the backend's address.
 *
 * In production, you might:
 * - Use environment variables for the backend URL
 * - Use a CDN for images
 * - Use image optimization services
 *
 * CURRENCY FORMATTING:
 * ====================
 * Using Intl.NumberFormat for currency formatting:
 * - Internationalization support
 * - Consistent formatting across the app
 * - Handles edge cases (rounding, locale differences)
 *
 * SEMANTIC HTML:
 * ==============
 * - <li> for list items (inside <ul> in Meals)
 * - <article> for self-contained content
 * - <h3> for heading (inside the list item)
 * - <p> for paragraphs
 * - <button> for interactive actions
 *
 * Good semantic HTML improves accessibility and SEO.
 */
