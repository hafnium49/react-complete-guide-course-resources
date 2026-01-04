/**
 * ============================================================================
 * MEAL ITEM COMPONENT - INDIVIDUAL MEAL CARD (Lesson 287)
 * ============================================================================
 *
 * This component renders a single meal card with image, details, and an
 * "Add to Cart" button. It's used by the Meals component to display each
 * meal in the grid.
 *
 * LESSON 287 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Creating a separate component for repeated UI elements
 * 2. Deciding between passing individual props vs a single object prop
 * 3. Using CSS classes from the provided index.css file
 * 4. Working with backend images using template literals
 * 5. Semantic HTML structure (article, list items)
 *
 * WHY CREATE A SEPARATE COMPONENT?
 * ================================
 * As the instructor explains:
 * "Since that will be quite some markup to add I'll add a brand new
 * component here, which is optional, you could also add that markup
 * which I'm about to add in a new component here in the meals component
 * in that list item here, but I'll add a new component instead which
 * I'll name MealItem.jsx."
 *
 * Benefits of separate component:
 * - Keeps Meals.jsx clean and focused on fetching
 * - MealItem handles its own presentation
 * - Easier to maintain and modify
 * - More reusable
 *
 * COMPONENT RESPONSIBILITIES:
 * ===========================
 * - Display meal image (with backend URL)
 * - Show meal name, price, and description
 * - Provide "Add to Cart" button
 *
 * DATA FLOW:
 * ==========
 * Meals.jsx → (meal object as prop) → MealItem.jsx
 */

/**
 * REACT IMPORTS (Lesson 291)
 * ==========================
 * The instructor explains importing useContext:
 * "Therefore we of course need to get access to that context and we can
 * do that with help of the useContext hook, which must be imported from React."
 */
import { useContext } from 'react';

/**
 * IMPORTS
 * =======
 * - currencyFormatter: Utility for formatting prices (Lesson 288)
 * - CartContext: Context for accessing cart operations (Lesson 291)
 *
 * LESSON 288 - IMPORTING currencyFormatter:
 * -----------------------------------------
 * The instructor explains: "And now we can use this currencyFormatter
 * here in the MealItem by importing currencyFormatter from going up one
 * level and then diving into the util folder and importing from the
 * formatting.js file."
 *
 * MDN Documentation for Intl.NumberFormat:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 *
 * LESSON 291 - IMPORTING CartContext:
 * ------------------------------------
 * The instructor explains: "To use context, you must pass your context object
 * as an identifier. So therefore here I'll import CartContext, not the provider
 * component, but instead the context object itself. So this default export and
 * therefore this object that's defined in the CartContext.jsx file."
 *
 * "And I'll import that from going up one level, diving into the store, and
 * then into CartContext.jsx."
 */
import { currencyFormatter } from '../util/formatting.js'; // Added in Lesson 288
import CartContext from '../store/CartContext.jsx'; // Added in Lesson 291

/**
 * MEAL ITEM COMPONENT
 * ===================
 * Renders a meal card with image, details, and add to cart functionality.
 *
 * PROPS DESIGN DECISION (Lesson 287):
 * ------------------------------------
 * The instructor discusses two options:
 *
 * "So here we should definitely expect to get some props and it's now up
 * to you, whether you expect to get a name prop, a price prop, an image
 * prop, and so on, or if you expect to get a single meal prop, which then
 * contains all these different fields as properties."
 *
 * OPTION 1 - Individual props:
 * function MealItem({ name, price, description, image }) { ... }
 * <MealItem name={meal.name} price={meal.price} ... />
 *
 * OPTION 2 - Single object prop (chosen):
 * function MealItem({ meal }) { ... }
 * <MealItem meal={meal} />
 *
 * "That really comes down to preference, and here I will go for this
 * single meal prop."
 *
 * @param {Object} props
 * @param {Object} props.meal - Meal data object from backend
 * @param {string} props.meal.id - Unique identifier
 * @param {string} props.meal.name - Meal name
 * @param {number|string} props.meal.price - Meal price
 * @param {string} props.meal.description - Meal description
 * @param {string} props.meal.image - Image path (relative to backend)
 */
export default function MealItem({ meal }) {
  /**
   * CONSUMING CART CONTEXT (Lesson 291)
   * ====================================
   * The instructor explains using the context:
   * "Now we must pass CartContext as a value to useContext. And as a result
   * we get back a CartContext object which we can use."
   *
   * WHY MealItem HAS ACCESS TO THE CONTEXT (Lesson 291):
   * ----------------------------------------------------
   * "And we can now start in the MealItem component, which has access to the
   * context because it's used in the Meals component, which in turn is used
   * here in the App component and wrapped by CartContextProvider."
   *
   * Component hierarchy:
   * CartContextProvider (in App.jsx)
   *   └── Meals
   *       └── MealItem ← We are here, inside the provider!
   *
   * LESSON 287 NOTE:
   * ----------------
   * In Lesson 287, the instructor says: "Of course, at the moment the button
   * won't do anything but that will change in the future."
   */
  const cartCtx = useContext(CartContext);

  /**
   * ADD TO CART HANDLER (Lesson 291)
   * =================================
   * The instructor explains the handler function:
   * "So in MealItem.jsx, we can set onClick equal to handleAddMealToCart
   * like this. And here in handleAddMealToCart, I now want to call this
   * addItem function of my context."
   *
   * "And now this object can be used here inside of handleAddMealToCart
   * to call addItem and pass that meal item, which we're getting as a
   * prop here as a value to addItem like this."
   *
   * WHAT HAPPENS WHEN CALLED:
   * -------------------------
   * 1. cartCtx.addItem(meal) is called
   * 2. This dispatches { type: 'ADD_ITEM', item: meal } to the reducer
   * 3. The reducer checks if item exists, updates quantity or adds new
   * 4. State updates, triggering re-renders in consuming components
   * 5. Header updates to show new cart count
   */
  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }

  /**
   * RENDER MEAL CARD
   * ================
   * The instructor builds this structure step by step in Lesson 287.
   *
   * CSS CLASSES FROM index.css:
   * ---------------------------
   * The instructor frequently references the index.css file:
   * "I wanna have a CSS class of meal-item. And I'm adding this class here,
   * of course, because in index.css you'll find this class being selected
   * in CSS rules, and those rules then will make sure that those items
   * look good."
   */
  return (
    /**
     * LIST ITEM (Lesson 287)
     * ======================
     * "So every meal item should be a list item here for a start"
     *
     * We use <li> because this component is rendered inside a <ul> in Meals.
     *
     * The "meal-item" class provides card styling from index.css:
     * - background-color: #1d1a16 (dark)
     * - border-radius: 1rem
     * - overflow: hidden (clips image corners)
     * - text-align: center
     * - box-shadow for depth
     */
    <li className="meal-item">
      {/*
        ARTICLE ELEMENT (Lesson 287)
        ============================
        The instructor references the CSS file for guidance:
        "And you also see some related rules, for example, that we seem
        to have an article in every meal item, at least here in the CSS
        code I provided to you. Therefore here, I'll actually wrap an
        article element around all the other content that makes up a
        meal item."

        Using <article> is semantically correct for self-contained content
        that could be distributed independently.
      */}
      <article>
        {/*
          MEAL IMAGE (Lesson 287)
          =======================
          The instructor explains the image source challenge:

          "And of course, the source of that image should now be received
          as an input to that component as a prop, therefore, because of
          course the meal data lives in the meals jsx file, and we kind
          of need to pass that data to the meal item component."

          BACKEND DATA:
          -------------
          "And it will be meal image because in that dummy backend data,
          you'll see that every meal has a image property, and then also
          a description, price, name and ID."

          THE IMAGE URL PROBLEM (Lesson 287):
          -----------------------------------
          Initially, images were missing because:
          "Now they are missing because in my backend data I just got a
          relative path to those images seen relative from on the backend,
          But we're now loading those images from the frontend. So we in
          the end need to prepend this image path here on the frontend by
          also adding the backend URL."

          TEMPLATE LITERAL SOLUTION:
          --------------------------
          "And for this we can use the template literal feature provided
          by JavaScript by using backticks here, so not single quotes but
          backticks, which allows us to easily create a string where parts
          of that string are dynamic."

          "I'll start with the hard-coded part which is that backend URL,
          localhost:3000/, and then thereafter I'll inject meal.image
          which is that image path that's different for every meal."

          RESULT:
          -------
          meal.image = "images/mac-and-cheese.jpg"
          Full URL = "http://localhost:3000/images/mac-and-cheese.jpg"

          ALT TEXT:
          ---------
          "we can now also set the alt text of that image maybe to meal.name"
        */}
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />

        {/*
          MEAL DETAILS (Lesson 287)
          =========================
          "Below that image output the title of the meal, though for
          styling purposes I'll wrap that into a div."
        */}
        <div>
          {/*
            MEAL NAME (Lesson 287)
            ======================
            "And then here, between those h3 tags, I'll output meal.name."
          */}
          <h3>{meal.name}</h3>

          {/*
            MEAL PRICE (Lessons 287 & 288)
            ==============================
            Lesson 287: "Below that I then wanna have a paragraph where I
            output the price, and for that here I'll give this a class name
            of meal-item-price, again, another class you'll find in the
            CSS file."

            LESSON 287 VERSION (Initial):
            -----------------------------
            "I'll make sure to format it in a second, but for the moment
            I'll just output it like this"

            {meal.price}  // Just the raw number

            LESSON 288 VERSION (With formatting):
            -------------------------------------
            The instructor updates this:
            "And then here where we output the meal price we can output
            currencyFormatter.format meal.price like this, which again
            here is a bit overkill, but something that's good to know
            and something that can be helpful if you got numbers of
            different formats."

            {currencyFormatter.format(meal.price)}  // "$8.99"

            WHY USE currencyFormatter?
            --------------------------
            - Consistent formatting across the app
            - Handles decimal places automatically
            - Adds currency symbol
            - Works with any number format

            MDN Documentation:
            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat

            CSS styling (meal-item-price class from index.css):
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
            MEAL DESCRIPTION (Lesson 287)
            =============================
            "And then below that have another paragraph where we can
            output the meal description. This paragraph should also
            receive a CSS class of meal-item-description."
          */}
          <p className="meal-item-description">{meal.description}</p>
        </div>

        {/*
          ACTIONS SECTION (Lesson 287)
          ============================
          "As a last step, already, below this div here I'll add another
          paragraph which will receive a class name of meal-item-actions
          where I wanna add a button which should allow me to add this
          meal to the cart."

          CSS styling (meal-item-actions class):
          - margin-bottom: 1.5rem
        */}
        <p className="meal-item-actions">
          {/*
            ADD TO CART BUTTON (Lessons 287 & 289)
            ======================================
            Lesson 287: "Of course, at the moment the button won't do anything
            but that will change in the future."

            LESSON 287 VERSION (Initial):
            -----------------------------
            <button>Add to Cart</button>
            (No onClick handler, no styling class)

            LESSON 289 - USING CUSTOM BUTTON COMPONENT:
            -------------------------------------------
            The instructor explains: "Now, on those meal items I want to have
            that other button style and therefore we should go to the MealItem
            component and also import the custom button there from the UI
            folder and then the Button.jsx file."

            "And then go down to this button and here use it just like this.
            And again, here, we don't need any other props for now because
            we're also not handling clicks here yet."

            LESSON 289 VERSION:
            -------------------
            import Button from './UI/Button.jsx';

            <Button onClick={handleAddMealToCart}>
              Add to Cart
            </Button>

            Note: No textOnly prop means it uses the "button" class
            (gold background, primary action style).

            CURRENT VERSION:
            ----------------
            Uses native <button> with "button" class.
            The custom Button component encapsulates this same styling.

            className="button" provides (from index.css):
            - Gold background (#ffc404)
            - Dark text (#1f1a09)
            - Hover effect (#ffab04)
            - cursor: pointer
            - padding and border-radius

            WHAT'S NEXT (end of Lesson 289):
            --------------------------------
            "And therefore, I'd say as a next step it probably makes sense
            to make sure that these buttons can be clicked and that we start
            managing some cart data."
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
 * SUMMARY & KEY CONCEPTS FROM LESSON 287
 * ============================================================================
 *
 * COMPONENT EXTRACTION:
 * =====================
 * When you have a lot of markup that repeats for each item in a list,
 * extract it into a separate component.
 *
 * Before (in Meals.jsx):
 * {loadedMeals.map((meal) => (
 *   <li key={meal.id}>{meal.name}</li>  // Too simple!
 * ))}
 *
 * After (with MealItem):
 * {loadedMeals.map((meal) => (
 *   <MealItem key={meal.id} meal={meal} />
 * ))}
 *
 * PROPS DESIGN:
 * =============
 * Single object prop: { meal }
 * vs
 * Individual props: { name, price, description, image }
 *
 * Both are valid. Single object is simpler to pass and extend.
 *
 * CSS CLASS PATTERNS:
 * ===================
 * The instructor uses the provided CSS as a guide:
 * - meal-item: The card container
 * - meal-item-price: Price badge styling
 * - meal-item-description: Description paragraph
 * - meal-item-actions: Button container
 *
 * This is a common pattern: CSS is designed first, then components
 * are built to match the expected class structure.
 *
 * BACKEND IMAGES:
 * ===============
 * When images are served from a backend:
 * 1. Backend returns relative path: "images/food.jpg"
 * 2. Frontend must prepend base URL: "http://localhost:3000/"
 * 3. Use template literal: `${baseUrl}/${path}`
 *
 * PLACEHOLDER FUNCTIONALITY:
 * ==========================
 * It's okay to add buttons that don't work yet!
 * The instructor adds the "Add to Cart" button knowing it won't
 * function until the cart system is implemented.
 *
 * This approach:
 * - Completes the visual design
 * - Reserves space in the layout
 * - Makes clear what needs to be implemented later
 *
 * WHAT'S NEXT (mentioned at end of Lesson 287):
 * =============================================
 * "I'd argue they don't look that great, and that's therefore what I'd
 * like to change first along with that price formatting here, before
 * we then start working on the cart."
 *
 * Next lessons will:
 * - Add button styling (className="button")
 * - Add price formatting (currencyFormatter)
 * - Implement cart functionality
 */
