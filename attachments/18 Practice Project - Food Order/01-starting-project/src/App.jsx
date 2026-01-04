/**
 * ============================================================================
 * FOOD ORDER APP - ROOT COMPONENT (App.jsx)
 * ============================================================================
 *
 * This is the root component of the Food Order application. As with most
 * React projects, App.jsx serves as the central hub that brings together
 * all the major pieces of the application.
 *
 * KEY LEARNING OBJECTIVES:
 * ========================
 * 1. Understanding the role of the root component
 * 2. Setting up Context Providers to share state across the app
 * 3. Composing the application from smaller components
 * 4. Understanding the component hierarchy and data flow
 *
 * APPLICATION ARCHITECTURE:
 * =========================
 * As the instructor explains: "we can now use this header component in the
 * app component because that's of course our root component as it is in
 * most React projects."
 *
 * The App component is responsible for:
 * 1. Wrapping the app with necessary Context Providers
 * 2. Rendering the main visual components (Header, Meals)
 * 3. Including modal components (Cart, Checkout) that conditionally display
 *
 * COMPONENT HIERARCHY:
 * ====================
 * App
 * ├── UserProgressContextProvider (manages which modal is open)
 * │   └── CartContextProvider (manages shopping cart state)
 * │       ├── Header (logo, title, cart button)
 * │       ├── Meals (list of available meals)
 * │       ├── Cart (modal - shown when viewing cart)
 * │       └── Checkout (modal - shown when checking out)
 *
 * WHY THIS ORDER OF PROVIDERS?
 * ============================
 * UserProgressContextProvider wraps CartContextProvider because:
 * - The Cart and Checkout components need access to BOTH contexts
 * - UserProgress controls which modal is visible
 * - Cart controls the shopping cart items
 * - By nesting them, all child components can access both
 *
 * The order could be reversed without issues since neither provider
 * depends on the other's values during initialization.
 */

/**
 * COMPONENT IMPORTS
 * =================
 * We import all the main components that make up our application.
 *
 * Visual Components:
 * - Header: The app header with logo and cart button (Lesson 285)
 * - Meals: The grid of available meals to order (Lesson 286)
 *
 * Modal Components:
 * - Cart: Shows cart contents in a modal (displayed conditionally)
 * - Checkout: Shows checkout form in a modal (displayed conditionally)
 *
 * LESSON 286 - ADDING MEALS:
 * --------------------------
 * The instructor says: "To now see this in action, we of course have to
 * go to the App component and in there, add our Meals component which
 * must be imported from the Meals.jsx file."
 */
import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx'; // Added in Lesson 286
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';

/**
 * CONTEXT PROVIDER IMPORTS (Lessons 291 & 293)
 * =============================================
 * We import the Provider components from our context files.
 *
 * Context in React allows us to share state across components without
 * having to pass props manually through every level of the component tree.
 * This is especially useful for "global" state like:
 * - Shopping cart contents
 * - User authentication status
 * - Theme preferences
 * - UI state (which modal is open)
 *
 * CartContextProvider (Lesson 291):
 * ---------------------------------
 * The instructor explains why we wrap with CartContextProvider:
 * "And that therefore is the next step to use this context from inside
 * other components. Now as a first step we therefore have to wrap this
 * CartContextProvider around all the components that are interested."
 *
 * "And in the end here, id offer one wrap, basically all my app components
 * and all their nested components with that provider component. And hence
 * the best place to do that is the App component, the root component of
 * this application."
 *
 * "Here we can import as a named import CartContextProvider from
 * ./store/CartContext.jsx. And then simply wrap this around Header and
 * Meals. And this will allow all these components and their nested child
 * components to access this context and its properties."
 *
 * - Manages the shopping cart state
 * - Provides: items array, addItem(), removeItem(), clearCart()
 * - Used by: Header (cart count), MealItem (add to cart), Cart (display/edit items)
 *
 * UserProgressContextProvider (Lesson 293):
 * ------------------------------------------
 * The instructor explains wrapping with this provider:
 * "Now we also need to add this UserProgressContextProvider. So that
 * should also be wrapped around all our app components."
 *
 * - Manages which modal is currently displayed
 * - Provides: progress state, showCart(), hideCart(), showCheckout(), hideCheckout()
 * - Used by: Header (open cart), Cart (close/proceed), Checkout (close)
 */
import { CartContextProvider } from './store/CartContext.jsx'; // Wrapped in Lesson 291
import { UserProgressContextProvider } from './store/UserProgressContext.jsx'; // Wrapped in Lesson 293

/**
 * APP COMPONENT
 * =============
 * The root component that assembles the entire application.
 *
 * As the instructor mentions: "Here we can get rid of this H1 element
 * and all that dummy content that was in there and instead output our
 * custom header component for which it must be imported from the
 * Header.jsx file."
 *
 * INITIAL STATE (before building):
 * ---------------------------------
 * function App() {
 *   return (
 *     <>
 *       <h1>You got this 💪</h1>
 *       <p>Stuck? Not sure how to proceed?</p>
 *       <p>Don't worry - we've all been there...</p>
 *     </>
 *   );
 * }
 *
 * FINAL STATE (after building):
 * -----------------------------
 * The complete app with all components and context providers.
 */
function App() {
  return (
    /**
     * CONTEXT PROVIDER NESTING (Lessons 291 & 293)
     * =============================================
     * We wrap our components in Context Providers to give them access
     * to shared state. The nesting order matters for which contexts
     * components can access.
     *
     * LESSON 293 - Adding UserProgressContextProvider:
     * -------------------------------------------------
     * The instructor explains:
     * "Now we also need to add this UserProgressContextProvider. So that
     * should also be wrapped around all our app components."
     *
     * Rule: A component can only access contexts from providers that
     * are ABOVE it in the component tree.
     *
     * With this structure:
     * - Header can access: UserProgressContext, CartContext ✓
     * - Meals can access: UserProgressContext, CartContext ✓
     * - Cart can access: UserProgressContext, CartContext ✓
     * - Checkout can access: UserProgressContext, CartContext ✓
     *
     * All components can access both contexts because both providers
     * wrap all components.
     */
    <UserProgressContextProvider>
      <CartContextProvider>
        {/*
          HEADER COMPONENT
          ================
          The first component we built in this project.
          Displays: Logo, app title "ReactFood", and cart button.

          The cart button shows the total number of items in the cart
          and opens the Cart modal when clicked.
        */}
        <Header />

        {/*
          MEALS COMPONENT (Added in Lesson 286)
          =====================================
          Fetches meal data from the backend (GET /meals) and displays
          them in a responsive grid layout.

          As the instructor explains in Lesson 286:
          "To now see this in action, we of course have to go to the
          App component and in there, add our Meals component which
          must be imported from the Meals.jsx file."

          "And if we then save this and reload our page, we should see
          that meals data here. Obviously, at the moment, just the names
          because at the moment we're not outputting anything else but
          this proves that fetching this data works. And that's of course
          a huge step into the right direction."

          LESSON 286 VERSION:
          -------------------
          Initially just displayed meal names in a simple list.

          CURRENT VERSION:
          ----------------
          Each meal card shows:
          - Meal image
          - Meal name
          - Price
          - Description
          - "Add to Cart" button
        */}
        <Meals />

        {/*
          CART COMPONENT (Modal) - Added in Lesson 293
          =============================================
          The instructor explains:
          "So, to output some cart details, it's time for another new
          component, a cart component."

          Renders a modal that displays when userProgress === 'cart'.
          The modal is always in the DOM but only visible when open.

          Features:
          - Lists all items in the cart
          - Shows quantity and price for each item
          - +/- buttons to adjust quantities
          - Total price calculation
          - "Close" and "Go to Checkout" buttons

          The modal is opened by clicking the cart button in Header.
        */}
        <Cart />

        {/*
          CHECKOUT COMPONENT (Modal) - Added in Lesson 295
          =================================================
          The instructor explains adding this component:
          "Therefore, we need to add such a component. A new checkout
          component in a new checkout component file."

          Renders a modal that displays when userProgress === 'checkout'.
          The user reaches this by clicking "Go to Checkout" in the Cart modal.

          Features:
          - Shows total order amount
          - Form fields: Name, Email, Street, Postal Code, City
          - Form validation
          - Submits order to backend (POST /orders)
          - Shows loading state during submission
          - Shows success message after order completion
        */}
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

/**
 * DEFAULT EXPORT
 * ==============
 * We export App as the default export so it can be imported in main.jsx
 * where React renders it into the DOM.
 *
 * In main.jsx:
 * import App from './App.jsx'
 * ReactDOM.createRoot(document.getElementById('root')).render(<App />)
 */
export default App;

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS
 * ============================================================================
 *
 * APPLICATION STRUCTURE:
 * ======================
 * This app follows a common React pattern:
 *
 * 1. CONTEXT PROVIDERS at the top level for global state management
 * 2. VISUAL COMPONENTS (Header, Meals) that are always visible
 * 3. MODAL COMPONENTS (Cart, Checkout) that conditionally appear
 *
 * DATA FLOW:
 * ==========
 * 1. User browses meals in the Meals component
 * 2. User clicks "Add to Cart" → CartContext.addItem() is called
 * 3. Header re-renders with updated cart count
 * 4. User clicks cart button → UserProgressContext.showCart()
 * 5. Cart modal appears showing items from CartContext
 * 6. User clicks "Go to Checkout" → UserProgressContext.showCheckout()
 * 7. Checkout modal appears with form
 * 8. User submits form → Order sent to backend
 * 9. Success → Cart cleared, modal closed
 *
 * WHY USE CONTEXT?
 * ================
 * Without Context, we would need to:
 * - Store cart state in App component
 * - Pass cart items as props to Header, Meals, Cart, Checkout
 * - Pass update functions as props through multiple levels
 * - This is called "prop drilling" and gets messy quickly
 *
 * With Context:
 * - State lives in the Provider
 * - Any component can access it directly
 * - No prop drilling needed
 * - Cleaner, more maintainable code
 *
 * PROJECT FILE STRUCTURE:
 * =======================
 * src/
 * ├── App.jsx              ← Root component (this file)
 * ├── main.jsx             ← React entry point
 * ├── index.css            ← Global styles
 * ├── components/
 * │   ├── Header.jsx       ← App header
 * │   ├── Meals.jsx        ← Meals list
 * │   ├── MealItem.jsx     ← Individual meal card
 * │   ├── Modal.jsx        ← Reusable modal
 * │   ├── Cart.jsx         ← Cart modal
 * │   ├── CartItem.jsx     ← Cart item row
 * │   ├── Checkout.jsx     ← Checkout modal
 * │   └── Error.jsx        ← Error display
 * ├── store/
 * │   ├── CartContext.jsx  ← Cart state management
 * │   └── UserProgressContext.jsx ← UI state management
 * ├── hooks/
 * │   └── useHttp.js       ← Custom HTTP hook
 * └── util/
 *     └── formatting.js    ← Utility functions
 */
