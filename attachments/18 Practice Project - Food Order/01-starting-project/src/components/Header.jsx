/**
 * ============================================================================
 * LESSON 285: HEADER COMPONENT - STARTING WITH A SIMPLE COMPONENT
 * ============================================================================
 *
 * This is the first component we build in the Food Order App project.
 * As the instructor explains: "I personally like to start by building the
 * core components and the core user interface. And then I gradually add
 * more and more features."
 *
 * KEY LEARNING OBJECTIVES:
 * ========================
 * 1. Starting a project by building simple, core components first
 * 2. Using CSS IDs for styling (matching index.css selectors)
 * 3. Importing and using image assets in React
 * 4. Creating a basic header with logo, title, and navigation
 * 5. Integrating Context to display dynamic cart count
 *
 * WHY START WITH THE HEADER?
 * ==========================
 * As the instructor says: "Let's start simple. Let's add a simple component.
 * Let's add a header. And it's always great to start with a basic simple
 * component like this, because that quickly gives you that feeling of
 * success, I guess."
 *
 * Starting with a simple component:
 * - Gives you immediate visual feedback
 * - Helps verify your project setup is working
 * - Provides a foundation to build upon
 * - Boosts motivation with quick wins
 *
 * PROJECT PLANNING APPROACH:
 * ==========================
 * The instructor's approach for this project:
 * 1. Start by adding the Header component (this file)
 * 2. Work on the Meals components to load and display meals
 * 3. Work on the Cart feature
 * 4. Work on the Checkout feature
 *
 * "And again, that's just one way of doing it but it is the approach
 * I'll follow in my solution here."
 *
 * COMPONENT STRUCTURE:
 * ====================
 * The header contains:
 * - A logo image (from assets folder)
 * - The app title "ReactFood"
 * - A cart button that shows the number of items in the cart
 *
 * This matches what we see in the finished project screenshot:
 * "we got a basic header at the top which has this cart button
 * which we can press to open the cart"
 */

import { useContext } from 'react';

/**
 * IMPORTING IMAGE ASSETS
 * ======================
 * As the instructor explains: "I'll use this logo, which I provided as part
 * of the starting project. So here in Header.jsx we can import this logo
 * image by going up one level, diving into the assets folder and targeting
 * logo.jpg."
 *
 * When you import an image like this in a Vite/React project:
 * - Vite processes and optimizes the image
 * - The import returns a URL path to the optimized file
 * - You can use this path in the src attribute of img elements
 *
 * "And then as you learned earlier in the course we can set the source
 * of this image to this imported image which will be a path to the
 * optimized image file."
 */
import logoImg from '../assets/logo.jpg';

/**
 * CONTEXT IMPORTS (Lessons 291 & 293)
 * ====================================
 * We import two contexts to access app-wide state:
 *
 * 1. CartContext: Provides access to cart items (Lesson 291)
 *    The instructor explains:
 *    "And doing so now thankfully is pretty easy because all we have to do
 *    is call useContext, which must be imported from React in the header
 *    component, pass the CartContext object, which also must be imported
 *    as an identifier to useContext so that we get access to the CartContext."
 *    - Used to calculate and display the total number of items in the cart
 *    - The cart count is displayed next to the "Cart" text in the button
 *
 * 2. UserProgressContext: Manages UI state (Lesson 293)
 *    The instructor explains:
 *    "And in that header component now, I want to get access to that
 *    userProgressContext."
 *    - Used to show the cart modal when the user clicks the cart button
 *    - Controls the flow: browsing → cart → checkout
 */
import CartContext from '../store/CartContext.jsx'; // Used in Lesson 291 for cart count
import UserProgressContext from '../store/UserProgressContext.jsx'; // Used in Lesson 293 for showing cart

/**
 * HEADER COMPONENT
 * ================
 * The main header component for the Food Order app.
 *
 * INITIAL VERSION (from lesson):
 * ------------------------------
 * The instructor initially builds a simple version:
 * "This component function, at least right now, doesn't need any complex
 * logic or any state or anything like that. Instead here we just need
 * to return some JSX code."
 *
 * The initial version had a hardcoded cart count:
 * "And later we'll also show the number of cart items next to this text.
 * And of course, this number will be dynamic, but for a start I'll simply
 * use this hard-coded number zero here."
 *
 * ENHANCED VERSION (current):
 * ---------------------------
 * This version includes:
 * - Dynamic cart count from CartContext
 * - Click handler to open the cart modal
 * - Integration with UserProgressContext
 */
export default function Header() {
  /**
   * CONSUMING CONTEXT
   * =================
   * We use useContext to access the values provided by our context providers.
   *
   * cartCtx gives us access to:
   * - items: Array of cart items (each with id, name, price, quantity)
   * - addItem: Function to add items to cart
   * - removeItem: Function to remove items from cart
   * - clearCart: Function to clear all items
   *
   * userProgressCtx gives us access to:
   * - progress: Current state ('', 'cart', or 'checkout')
   * - showCart: Function to open the cart modal
   * - hideCart: Function to close the cart modal
   * - showCheckout: Function to open checkout modal
   * - hideCheckout: Function to close checkout modal
   */
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  /**
   * CALCULATING TOTAL CART ITEMS (Lesson 291)
   * ==========================================
   * The instructor explains why we need this and how to implement it:
   *
   * "So now to kind of finish this first step of implementing the cart,
   * I wanna make sure that we also use the items data, not just to log it
   * here, but to update this number here in the header."
   *
   * "And that's why we used this context feature in the first place so that
   * we can access that data from different places. Because whilst I wanna
   * update my cart from inside the meal item component, I now want to access
   * the items data and get the number of meals in the cart in my header component."
   *
   * WHY NOT JUST USE .length? (Lesson 291)
   * --------------------------------------
   * The instructor explains:
   * "Now, just taking the length would not be enough now because we add every
   * item only once to that cart and thereafter we just increase the quantity."
   *
   * USING reduce() (Lesson 291):
   * ----------------------------
   * The instructor explains the reduce method:
   * "So instead, I'll call the built-in reduce method, which in the end is
   * a built-in method that allows us to reduce an array to a single value,
   * to a single number for example."
   *
   * "For this, reduce takes a function as a first argument and a starting
   * value which I'll set to zero here as a second argument."
   *
   * "And that function, which we pass as a first argument then itself gets
   * two arguments, passed in automatically by JavaScript. And that's the
   * new value which we want to derive. So in this case, the total number
   * of items, to make it very clear what this is. And then thereafter as
   * a second value every item of the array on which we call reduce."
   *
   * "Step by step, item by item because this function will be executed once
   * for every item in that item's array. And we then must return a new
   * updated value and extend this updated value that will be fed into the
   * next function execution as a value for total number of items."
   *
   * "And this zero here is simply just the starting value for the first
   * execution of this function for the first item. So here I therefore
   * want to return total number of items plus item quantity to add up
   * all the quantities of all the items in this items array."
   *
   * EXAMPLE:
   * --------
   * If cart has: [{ quantity: 2 }, { quantity: 3 }, { quantity: 1 }]
   *
   * Iteration 1: 0 + 2 = 2
   * Iteration 2: 2 + 3 = 5
   * Iteration 3: 5 + 1 = 6
   * Final result: 6 total items
   *
   * WHY USE QUANTITY?
   * -----------------
   * Each cart item has a quantity property because users can add the same
   * meal multiple times. Instead of having duplicate items in the array,
   * we increment the quantity of existing items.
   *
   * So if a user adds "Mac & Cheese" 3 times:
   * - We DON'T have: [{ name: "Mac & Cheese" }, { name: "Mac & Cheese" }, { name: "Mac & Cheese" }]
   * - We DO have: [{ name: "Mac & Cheese", quantity: 3 }]
   *
   * This approach is more efficient and makes cart management easier.
   */
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  /**
   * CART BUTTON CLICK HANDLER (Lesson 293)
   * ======================================
   * The instructor connects the Header to UserProgressContext:
   * "And in there, I now just wanna call userProgressContext.showCart
   * to change the progress to cart. And open the cart modal therefore."
   *
   * When the user clicks the cart button, we want to open the cart modal.
   *
   * This function calls showCart() from UserProgressContext, which:
   * 1. Sets progress state to 'cart'
   * 2. This causes the Cart component to render its modal as open
   * 3. The user can now see and interact with their cart
   *
   * The cart modal will show:
   * - List of items in the cart
   * - Quantity controls (+/- buttons)
   * - Total price
   * - "Close" and "Go to Checkout" buttons
   */
  function handleShowCart() {
    userProgressCtx.showCart();
  }

  /**
   * JSX RETURN
   * ==========
   * As the instructor explains: "I will return a header element, the built-in
   * header element, in which I want to have a div which should contain an
   * image and my H1 title. And then below that div, I'll add another element,
   * let's say a nav element maybe since in there I then want to have a button
   * which will later open my cart."
   */
  return (
    /**
     * HEADER ELEMENT WITH ID
     * ======================
     * "I'll add an ID prop here to my header element and set this to
     * main-header so that we get that styling that is set up here in
     * the index CSS file on this header."
     *
     * USING CSS FROM index.css:
     * -------------------------
     * The instructor explains: "If we take a look at the index CSS file,
     * which I provided to you, which can be a great place to get some
     * ideas regarding components you could build or elements you might
     * need, you'll see that in there I got some CSS rules where I'm
     * looking for a main header ID on some element."
     *
     * The CSS rules for #main-header include:
     * - display: flex
     * - justify-content: space-between
     * - align-items: center
     * - padding: 3rem 10%
     *
     * This creates a horizontal layout with the logo/title on the left
     * and the cart button on the right.
     */
    <header id="main-header">
      {/*
        TITLE DIV
        =========
        "On this div here, I'll add an ID of title so that, for example,
        this rule where I target an image in that title works."

        The CSS rules for #title include:
        - display: flex
        - gap: 1rem
        - align-items: center

        This creates a horizontal layout for the logo and title text.
      */}
      <div id="title">
        {/*
          LOGO IMAGE
          ==========
          "And then as you learned earlier in the course we can set the
          source of this image to this imported image which will be a
          path to the optimized image file. And then give it alt text
          where I'll just say a restaurant or something like this."

          The CSS for the image (#main-header #title img):
          - width: 4rem
          - height: 4rem
          - object-fit: contain
          - border-radius: 50% (makes it circular)
          - border: 2px solid #ffc404 (gold border)
        */}
        <img src={logoImg} alt="A restaurant" />

        {/*
          APP TITLE
          =========
          "Now the title which I wanna have here is ReactFood in my case.
          But of course you can give your fictional food order shop here
          any name you want."

          The h1 styling from index.css:
          - font-family: 'Lato', sans-serif
          - font-weight: 700
          - font-size: 2rem
          - color: #ffc404 (gold)
          - letter-spacing: 0.2rem
          - text-transform: uppercase
        */}
        <h1>ReactFood</h1>
      </div>

      {/*
        NAVIGATION
        ==========
        We use a <nav> element for semantic HTML. Even though we only have
        one button, using <nav> indicates this is a navigation area.

        The cart button:
        - Shows the current cart count
        - Opens the cart modal when clicked
        - Uses the "text-button" class for styling (no background, gold text)
      */}
      <nav>
        {/*
          CART BUTTON (Lessons 285 & 289)
          ===============================
          Lesson 285: "In there I then want to have a button which will later
          open my cart. And later we'll also show the number of cart items
          next to this text."

          DYNAMIC CART COUNT:
          -------------------
          Initially: Cart (0) - hardcoded
          Now: Cart ({totalCartItems}) - dynamic from context

          The count updates automatically whenever:
          - Items are added to the cart
          - Items are removed from the cart
          - Cart is cleared

          LESSON 289 - USING CUSTOM BUTTON COMPONENT:
          -------------------------------------------
          The instructor explains: "For example, in the Header component.
          There I have a button, which now should be built with that new
          custom button. Therefore, here we can import this Button component
          from ./UI/Button.jsx, and then replace the built-in button with
          this custom button."

          "And here, I won't add onClick yet because we're not dealing with
          clicks yet. But I wanna make sure that here I got this text only
          style. So therefore I wanna set text only here to true on this
          custom button."

          "And this can easily be done by simply adding the textOnly prop.
          You could set it to true like this, but that's actually not required
          because just adding a prop like this will automatically set it to
          true in React."

          LESSON 289 VERSION:
          -------------------
          import Button from './UI/Button.jsx';

          <Button textOnly onClick={handleShowCart}>
            Cart ({totalCartItems})
          </Button>

          CURRENT VERSION:
          ----------------
          Uses native <button> with "text-button" class.
          The custom Button component encapsulates this same styling.

          CLICK HANDLER:
          --------------
          onClick={handleShowCart} - when clicked, opens the cart modal
          This triggers the UserProgressContext to update, which causes
          the Cart component to show its modal.
        */}
        <button className="text-button" onClick={handleShowCart}>
          Cart ({totalCartItems})
        </button>
      </nav>
    </header>
  );
}

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS - LESSON 285
 * ============================================================================
 *
 * WHAT WE'VE LEARNED:
 * ===================
 * 1. START SIMPLE: Begin with basic, visual components to build momentum
 *    and verify your setup is working.
 *
 * 2. USE CSS IDs: Match your JSX element IDs with the CSS selectors in
 *    index.css to apply the provided styling.
 *
 * 3. IMPORT IMAGES: Use ES6 imports for images, and Vite will optimize
 *    them and provide the correct path.
 *
 * 4. SEMANTIC HTML: Use appropriate HTML elements (<header>, <nav>)
 *    for better accessibility and SEO.
 *
 * 5. CONTEXT INTEGRATION: Connect components to app-wide state using
 *    Context to share data like cart items across the component tree.
 *
 * PROJECT STRUCTURE:
 * ==================
 * src/
 * ├── components/
 * │   └── Header.jsx  ← We are here
 * ├── store/
 * │   ├── CartContext.jsx
 * │   └── UserProgressContext.jsx
 * └── assets/
 *     └── logo.jpg
 *
 * NEXT STEPS (from the instructor):
 * ==================================
 * "Let's then as a next step work on the meals so that we can load and
 * display those meals before we then thereafter work on this cart feature
 * and on this checkout feature."
 *
 * The progression:
 * 1. ✅ Header component (this file)
 * 2. ➡️ Meals components (load and display meals)
 * 3. ⏳ Cart feature (add/remove items)
 * 4. ⏳ Checkout feature (submit orders)
 */
