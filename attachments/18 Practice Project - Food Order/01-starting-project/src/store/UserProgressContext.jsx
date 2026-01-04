/**
 * ============================================================================
 * USER PROGRESS CONTEXT - UI STATE MANAGEMENT (Lesson 293)
 * ============================================================================
 *
 * This file manages the "user progress" state - essentially which modal
 * is currently being displayed to the user.
 *
 * LESSON 293 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Creating another context for UI state management
 * 2. Using useState instead of useReducer for simpler state
 * 3. Managing modal visibility across components
 * 4. Coordinating UI flow between Cart and Checkout
 *
 * WHY ANOTHER CONTEXT? (Lesson 293)
 * ==================================
 * The instructor explains the need for this context:
 * "I'll go for another context, which can be controlled from different
 * parts of the app in different ways."
 *
 * "And to be precise, I'll add another context that will manage the state
 * that determines which screen, I guess you could say, should be shown
 * to the user."
 *
 * WHY "USER PROGRESS"? (Lesson 293)
 * =================================
 * The instructor explains the naming:
 * "I'll name it user progress context because you could argue that viewing
 * the cart and going to the checkout screen thereafter are different steps
 * in the user's journey through the application."
 *
 * CartContext: Manages WHAT is in the cart (data)
 * UserProgressContext: Manages WHERE the user is in the UI (navigation)
 *
 * This separation means:
 * - Each context has one clear responsibility
 * - Easier to understand and maintain
 * - Components only re-render when relevant state changes
 *
 * USER FLOW:
 * ==========
 * 1. User browses meals (progress = '')
 * 2. User clicks cart button → showCart() → (progress = 'cart')
 * 3. User clicks "Go to Checkout" → showCheckout() → (progress = 'checkout')
 * 4. User submits order → hideCheckout() → (progress = '')
 *
 * Or user can close at any point:
 * - In Cart: Click "Close" → hideCart() → (progress = '')
 * - In Checkout: Click "Close" → hideCheckout() → (progress = '')
 *
 * MODAL VISIBILITY LOGIC:
 * =======================
 * In Cart.jsx:
 *   <Modal open={userProgressCtx.progress === 'cart'} />
 *
 * In Checkout.jsx:
 *   <Modal open={userProgressCtx.progress === 'checkout'} />
 *
 * Only one modal can be open at a time because progress can only be
 * one value at a time.
 */

/**
 * IMPORTS (Lesson 293)
 * ====================
 * The instructor explains why we use useState here:
 * "but to mix things up, and since it's all the way simpler state here
 * I'll use the standard useState hook, which therefore also must be
 * imported from React."
 *
 * Note: We use useState instead of useReducer because the state is simple
 * (just a single string value).
 */
import { createContext, useState } from 'react';

/**
 * CREATING THE CONTEXT (Lesson 293)
 * ==================================
 * The instructor creates this context:
 * "I'll name it user progress context because you could argue that viewing
 * the cart and going to the checkout screen thereafter are different steps
 * in the user's journey through the application."
 *
 * The default value shows the shape of the context:
 *
 * PROGRESS VALUES (Lesson 293):
 * -----------------------------
 * The instructor explains:
 * "Now here, inside of this create context, I'll define some default context
 * value again, where I have a progress property, which is an empty string
 * by default. But it could also be cart, or it could also be checkout."
 *
 * ''         → No modal open, user is browsing
 * 'cart'     → Cart modal is open
 * 'checkout' → Checkout modal is open
 *
 * Using strings instead of booleans allows for easy expansion
 * (e.g., adding 'confirmation', 'payment', etc. in the future).
 *
 * FUNCTIONS (Lesson 293):
 * -----------------------
 * The instructor adds helper functions:
 * "And I'll also add some functions here, showCart, which is a dummy
 * function initially, hideCart, which is also a dummy function initially,
 * and showCheckout and hideCheckout."
 */
const UserProgressContext = createContext({
  progress: '', // 'cart', 'checkout'
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

/**
 * USER PROGRESS CONTEXT PROVIDER (Lesson 293)
 * ============================================
 * The instructor explains creating the provider:
 * "Now then I'll also add a UserProgressContextProvider here, which
 * expects children."
 *
 * WHY useState INSTEAD OF useReducer? (Lesson 293)
 * ------------------------------------------------
 * The instructor explains this choice:
 * "but to mix things up, and since it's all the way simpler state here
 * I'll use the standard useState hook, which therefore also must be
 * imported from React."
 *
 * We use useState here instead of useReducer because:
 * - The state is simple (just one string value)
 * - There are only a few possible values
 * - State transitions are straightforward
 *
 * If we had more complex UI state (multiple modals, nested states, etc.),
 * useReducer might be a better choice (like CartContext).
 *
 * @param {Object} props
 * @param {ReactNode} props.children - Components to wrap with provider
 */
export function UserProgressContextProvider({ children }) {
  /**
   * USER PROGRESS STATE (Lesson 293)
   * =================================
   * The instructor sets up the state:
   * "And the first state, which I'll name userProgress, is used with the
   * standard useState hook."
   *
   * Simple string state that tracks where the user is in the UI.
   *
   * Initial value is '' (empty string), meaning no modal is open
   * and the user is browsing the meals.
   */
  const [userProgress, setUserProgress] = useState('');

  /**
   * SHOW CART MODAL (Lesson 293)
   * ============================
   * The instructor explains these functions:
   * "Now in here, I'll add a couple of functions. ShowCart, which will
   * set the user progress to cart."
   *
   * Called when user clicks the cart button in Header.
   * Sets progress to 'cart', which causes Cart component's modal to open.
   *
   * Usage: userProgressCtx.showCart()
   */
  function showCart() {
    setUserProgress('cart');
  }

  /**
   * HIDE CART MODAL (Lesson 293)
   * ============================
   * The instructor adds this function:
   * "HideCart, which sets it to an empty string."
   *
   * Called when user clicks "Close" in Cart modal.
   * Sets progress to '', closing the modal and returning to browsing.
   *
   * Usage: userProgressCtx.hideCart()
   */
  function hideCart() {
    setUserProgress('');
  }

  /**
   * SHOW CHECKOUT MODAL (Lesson 293)
   * =================================
   * The instructor adds this function:
   * "ShowCheckout, which sets it to checkout."
   *
   * Called when user clicks "Go to Checkout" in Cart modal.
   * Sets progress to 'checkout', which:
   * - Closes the Cart modal (progress !== 'cart')
   * - Opens the Checkout modal (progress === 'checkout')
   *
   * This is a seamless transition - no intermediate state.
   *
   * Usage: userProgressCtx.showCheckout()
   */
  function showCheckout() {
    setUserProgress('checkout');
  }

  /**
   * HIDE CHECKOUT MODAL (Lesson 293)
   * =================================
   * The instructor adds this function:
   * "And HideCheckout, which also sets it to an empty string."
   *
   * Called when:
   * - User clicks "Close" in Checkout modal
   * - Order is successfully submitted
   *
   * Sets progress to '', closing the modal and returning to browsing.
   *
   * Usage: userProgressCtx.hideCheckout()
   */
  function hideCheckout() {
    setUserProgress('');
  }

  /**
   * CONTEXT VALUE (Lesson 293)
   * ==========================
   * The instructor sets up the context value object:
   * "And I'll then set up the user progress context value which I provide
   * to all the consuming components."
   *
   * Includes:
   * - progress: Current progress state
   * - Four functions to change the progress state
   */
  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  /**
   * RENDER PROVIDER (Lesson 293)
   * ============================
   * The instructor wraps children with the provider:
   * "And I'll return user progress context provider and output the
   * children between the opening and closing tag of this provider
   * component."
   *
   * The Provider makes the context value available to all descendants.
   */
  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

/**
 * DEFAULT EXPORT
 * ==============
 * Export the context for consuming components:
 * import UserProgressContext from '../store/UserProgressContext.jsx';
 * const userProgressCtx = useContext(UserProgressContext);
 *
 * Named export (UserProgressContextProvider) is used in App.jsx.
 */
export default UserProgressContext;

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS FROM LESSON 293
 * ============================================================================
 *
 * LESSON 293 WORKFLOW:
 * ====================
 * 1. Create UserProgressContext.jsx in store folder
 * 2. Use createContext with default values for progress and functions
 * 3. Create UserProgressContextProvider with useState (not useReducer)
 * 4. Add showCart, hideCart, showCheckout, hideCheckout functions
 * 5. Set up context value object with progress state and functions
 * 6. Export both the context (default) and provider (named)
 * 7. Wrap App components with UserProgressContextProvider
 *
 * WHY A SEPARATE CONTEXT? (Lesson 293)
 * =====================================
 * The instructor explains:
 * "I'll go for another context, which can be controlled from different
 * parts of the app in different ways."
 *
 * SIMPLE VS COMPLEX STATE (Lesson 293):
 * =====================================
 * The instructor explains using useState here:
 * "but to mix things up, and since it's all the way simpler state here
 * I'll use the standard useState hook"
 *
 * - Simple state (like progress): Use useState
 * - Complex state (like cart items): Use useReducer
 *
 * UserProgressContext uses useState because:
 * - Only one value to track
 * - Simple string values
 * - Straightforward updates
 *
 * CartContext uses useReducer because:
 * - Multiple operations (add, remove, clear)
 * - Complex logic (check existing items, update quantities)
 * - Array manipulation
 *
 * SEPARATION OF CONCERNS:
 * =======================
 * By having separate contexts for cart data and UI state:
 *
 * 1. Code is more organized and easier to understand
 * 2. Each context has a single responsibility
 * 3. Changes to UI logic don't affect cart logic and vice versa
 * 4. Components can subscribe to only what they need
 *
 * MODAL COORDINATION:
 * ===================
 * The progress state acts as a "traffic controller" for modals:
 *
 * When progress changes, React re-renders components that consume
 * this context, and modals open/close based on the new value.
 *
 * Cart.jsx:
 *   open={progress === 'cart'}  // true when progress is 'cart'
 *
 * Checkout.jsx:
 *   open={progress === 'checkout'}  // true when progress is 'checkout'
 *
 * USAGE FLOW (Lesson 293):
 * ========================
 * 1. Header: onClick → showCart()
 * 2. Cart: "Close" → hideCart() | "Go to Checkout" → showCheckout()
 * 3. Checkout: "Close" → hideCheckout() | "Submit" (success) → hideCheckout()
 *
 * WHAT'S NEXT (end of Lesson 293):
 * ================================
 * The instructor wraps App with UserProgressContextProvider and
 * connects Header's cart button to showCart().
 */
