/**
 * ============================================================================
 * USER PROGRESS CONTEXT - UI STATE MANAGEMENT
 * ============================================================================
 *
 * This file manages the "user progress" state - essentially which modal
 * is currently being displayed to the user.
 *
 * KEY LEARNING OBJECTIVES:
 * ========================
 * 1. Using Context for UI state management
 * 2. Simple state with useState (vs useReducer for complex state)
 * 3. Managing modal visibility across components
 * 4. Coordinating UI flow between Cart and Checkout
 *
 * WHY A SEPARATE CONTEXT FOR UI STATE?
 * =====================================
 * We could have put this in CartContext, but separating concerns is better:
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

import { createContext, useState } from 'react';

/**
 * CREATING THE CONTEXT
 * ====================
 * The default value shows the shape of the context:
 *
 * - progress: String indicating current state ('', 'cart', or 'checkout')
 * - showCart: Function to open cart modal
 * - hideCart: Function to close cart modal
 * - showCheckout: Function to open checkout modal
 * - hideCheckout: Function to close checkout modal
 *
 * PROGRESS VALUES:
 * ----------------
 * ''         → No modal open, user is browsing
 * 'cart'     → Cart modal is open
 * 'checkout' → Checkout modal is open
 *
 * Using strings instead of booleans allows for easy expansion
 * (e.g., adding 'confirmation', 'payment', etc. in the future).
 */
const UserProgressContext = createContext({
  progress: '', // 'cart', 'checkout'
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

/**
 * USER PROGRESS CONTEXT PROVIDER
 * ==============================
 * This component wraps children and provides UI state to them.
 *
 * We use useState here instead of useReducer because:
 * - The state is simple (just one string value)
 * - There are only a few possible values
 * - State transitions are straightforward
 *
 * If we had more complex UI state (multiple modals, nested states, etc.),
 * useReducer might be a better choice.
 *
 * @param {Object} props
 * @param {ReactNode} props.children - Components to wrap with provider
 */
export function UserProgressContextProvider({ children }) {
  /**
   * USER PROGRESS STATE
   * ===================
   * Simple string state that tracks where the user is in the UI.
   *
   * Initial value is '' (empty string), meaning no modal is open
   * and the user is browsing the meals.
   */
  const [userProgress, setUserProgress] = useState('');

  /**
   * SHOW CART MODAL
   * ===============
   * Called when user clicks the cart button in Header.
   * Sets progress to 'cart', which causes Cart component's modal to open.
   *
   * Usage: userProgressCtx.showCart()
   */
  function showCart() {
    setUserProgress('cart');
  }

  /**
   * HIDE CART MODAL
   * ===============
   * Called when user clicks "Close" in Cart modal.
   * Sets progress to '', closing the modal and returning to browsing.
   *
   * Usage: userProgressCtx.hideCart()
   */
  function hideCart() {
    setUserProgress('');
  }

  /**
   * SHOW CHECKOUT MODAL
   * ===================
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
   * HIDE CHECKOUT MODAL
   * ===================
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
   * CONTEXT VALUE
   * =============
   * The object provided to all consuming components.
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
   * RENDER PROVIDER
   * ===============
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
 * SUMMARY & KEY CONCEPTS
 * ============================================================================
 *
 * SIMPLE VS COMPLEX STATE:
 * ========================
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
 * USAGE FLOW:
 * ===========
 * 1. Header: onClick → showCart()
 * 2. Cart: "Close" → hideCart() | "Go to Checkout" → showCheckout()
 * 3. Checkout: "Close" → hideCheckout() | "Submit" (success) → hideCheckout()
 */
