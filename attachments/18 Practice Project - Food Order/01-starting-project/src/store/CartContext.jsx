/**
 * ============================================================================
 * CART CONTEXT - SHOPPING CART STATE MANAGEMENT
 * ============================================================================
 *
 * This file implements the shopping cart functionality using React Context
 * and the useReducer hook for complex state management.
 *
 * KEY LEARNING OBJECTIVES:
 * ========================
 * 1. Creating and using React Context for global state
 * 2. Using useReducer for complex state logic
 * 3. Implementing cart operations (add, remove, clear)
 * 4. Immutable state updates in reducers
 * 5. Exporting both Context and Provider from the same file
 *
 * WHY USE CONTEXT FOR CART?
 * =========================
 * The shopping cart is a perfect use case for Context because:
 * - Multiple components need access to cart data (Header, Cart, Checkout)
 * - Multiple components need to modify the cart (MealItem, CartItem)
 * - Without Context, we'd have to pass cart state through many component levels
 *
 * Components that use CartContext:
 * - Header: Displays total item count
 * - MealItem: Adds items to cart
 * - Cart: Displays items, allows quantity changes
 * - CartItem: Increment/decrement item quantity
 * - Checkout: Gets cart items for order submission, clears cart on success
 *
 * WHY useReducer INSTEAD OF useState?
 * ====================================
 * useReducer is better when:
 * - State logic is complex (multiple sub-values)
 * - Next state depends on previous state
 * - Multiple actions can modify state
 * - State updates need to be predictable
 *
 * With useState, we'd have:
 * const [items, setItems] = useState([]);
 * function addItem(item) {
 *   setItems(prev => { ...complex logic... });
 * }
 *
 * With useReducer, we have:
 * - Clear action types: 'ADD_ITEM', 'REMOVE_ITEM', 'CLEAR_CART'
 * - All state logic in one place (the reducer function)
 * - Easier to test and debug
 * - More predictable state transitions
 */

import { createContext, useReducer } from 'react';

/**
 * CREATING THE CONTEXT
 * ====================
 * createContext() creates a Context object that components can subscribe to.
 *
 * The object passed to createContext() is the DEFAULT value. This value is
 * used when a component tries to access the context but isn't wrapped in
 * a provider.
 *
 * The default value also serves as documentation - it shows the shape of
 * the context value that consumers can expect.
 *
 * CONTEXT SHAPE:
 * --------------
 * {
 *   items: [],           // Array of cart items
 *   addItem: (item) => {},     // Function to add item to cart
 *   removeItem: (id) => {},    // Function to remove item from cart
 *   clearCart: () => {},       // Function to clear all items
 * }
 *
 * ITEM SHAPE:
 * -----------
 * Each item in the items array has:
 * {
 *   id: string,          // Unique identifier (from backend)
 *   name: string,        // Meal name
 *   price: number,       // Price per item
 *   description: string, // Meal description
 *   image: string,       // Image path
 *   quantity: number     // How many of this item in cart
 * }
 */
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

/**
 * CART REDUCER FUNCTION
 * =====================
 * The reducer function contains all the logic for updating cart state.
 *
 * REDUCER ANATOMY:
 * ----------------
 * function reducer(state, action) {
 *   // Based on action.type, return new state
 *   return newState;
 * }
 *
 * Parameters:
 * - state: The current state (passed automatically by React)
 * - action: An object describing what happened (we dispatch this)
 *
 * Return value:
 * - The new state (must be a new object, not mutated original)
 *
 * IMPORTANT: IMMUTABLE UPDATES
 * ============================
 * We never modify state directly. Instead, we create new objects/arrays.
 * This is crucial for React to detect changes and re-render components.
 *
 * BAD (Mutation):
 * state.items.push(newItem);
 * return state;
 *
 * GOOD (Immutable):
 * const updatedItems = [...state.items, newItem];
 * return { ...state, items: updatedItems };
 *
 * @param {Object} state - Current cart state { items: [] }
 * @param {Object} action - Action object { type: string, ...payload }
 * @returns {Object} New state
 */
function cartReducer(state, action) {
  /**
   * ADD_ITEM ACTION
   * ===============
   * Handles adding an item to the cart.
   *
   * LOGIC:
   * 1. Check if item already exists in cart (by ID)
   * 2. If exists: increment quantity
   * 3. If not exists: add item with quantity 1
   *
   * WHY CHECK FOR EXISTING ITEM?
   * ----------------------------
   * If a user adds "Mac & Cheese" twice, we don't want:
   * [{ name: "Mac & Cheese", quantity: 1 }, { name: "Mac & Cheese", quantity: 1 }]
   *
   * We want:
   * [{ name: "Mac & Cheese", quantity: 2 }]
   *
   * This is cleaner and makes calculations (total items, total price) easier.
   */
  if (action.type === 'ADD_ITEM') {
    /**
     * FIND EXISTING ITEM
     * ==================
     * findIndex() returns the index of the first element that matches,
     * or -1 if no match is found.
     *
     * We compare by ID because it's the unique identifier for each meal.
     */
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    /**
     * CREATE COPY OF ITEMS ARRAY
     * ==========================
     * We spread the existing items into a new array.
     * This creates a shallow copy that we can modify without
     * mutating the original state.
     *
     * Note: This is a SHALLOW copy. If we modify an item object,
     * we need to create a new object for that item too.
     */
    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      /**
       * ITEM EXISTS - INCREMENT QUANTITY
       * =================================
       * The item is already in the cart, so we just increase its quantity.
       *
       * We create a NEW item object with the updated quantity.
       * We don't mutate the existing item directly.
       *
       * existingItem: { id: 'm1', name: 'Mac & Cheese', quantity: 1 }
       * updatedItem:  { id: 'm1', name: 'Mac & Cheese', quantity: 2 }
       */
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      /**
       * ITEM DOESN'T EXIST - ADD NEW ITEM
       * ==================================
       * The item isn't in the cart yet, so we add it.
       *
       * We spread the item properties and add quantity: 1.
       * The item from action doesn't have quantity (it comes from
       * the meals data), so we add it here.
       *
       * action.item: { id: 'm1', name: 'Mac & Cheese', price: 8.99, ... }
       * new item:    { id: 'm1', name: 'Mac & Cheese', price: 8.99, ..., quantity: 1 }
       */
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    /**
     * RETURN NEW STATE
     * ================
     * We spread the existing state and override the items array.
     * This creates a new state object (important for React).
     */
    return { ...state, items: updatedItems };
  }

  /**
   * REMOVE_ITEM ACTION
   * ==================
   * Handles removing an item from the cart.
   *
   * LOGIC:
   * 1. Find the item by ID
   * 2. If quantity > 1: decrement quantity
   * 3. If quantity === 1: remove item entirely
   *
   * WHY REMOVE ENTIRELY WHEN QUANTITY IS 1?
   * ----------------------------------------
   * We don't want items with quantity: 0 in the cart.
   * When quantity reaches 0, the item should be removed completely.
   */
  if (action.type === 'REMOVE_ITEM') {
    /**
     * FIND THE ITEM TO REMOVE
     * =======================
     * We use the ID from the action to find the item.
     */
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    /**
     * CREATE COPY OF ITEMS ARRAY
     * ==========================
     * Same as in ADD_ITEM - we need a new array to avoid mutation.
     */
    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      /**
       * QUANTITY IS 1 - REMOVE ITEM ENTIRELY
       * =====================================
       * splice() removes elements from an array in place.
       *
       * splice(index, count):
       * - index: Where to start removing
       * - count: How many elements to remove
       *
       * Since updatedItems is already a copy, we can safely use splice.
       */
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      /**
       * QUANTITY > 1 - DECREMENT QUANTITY
       * ==================================
       * Create a new item object with quantity - 1.
       * Replace the old item in our items copy.
       */
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  /**
   * CLEAR_CART ACTION
   * =================
   * Removes all items from the cart.
   *
   * Used when:
   * - Order is successfully submitted
   * - User manually clears cart (if implemented)
   *
   * Simply returns state with an empty items array.
   */
  if (action.type === 'CLEAR_CART') {
    return { ...state, items: [] };
  }

  /**
   * DEFAULT RETURN
   * ==============
   * If the action type doesn't match any known type, return
   * the current state unchanged.
   *
   * This is a safety net for unexpected actions.
   */
  return state;
}

/**
 * CART CONTEXT PROVIDER COMPONENT
 * ===============================
 * This component wraps children and provides cart state to them.
 *
 * HOW PROVIDERS WORK:
 * -------------------
 * 1. Provider holds the state (via useReducer)
 * 2. Provider passes state and functions via 'value' prop
 * 3. Any child component can access this via useContext(CartContext)
 * 4. When state changes, all consuming components re-render
 *
 * @param {Object} props
 * @param {ReactNode} props.children - Components to wrap with provider
 */
export function CartContextProvider({ children }) {
  /**
   * INITIALIZE useReducer
   * =====================
   * useReducer returns:
   * - cart: Current state (initially { items: [] })
   * - dispatchCartAction: Function to dispatch actions
   *
   * When we call dispatchCartAction({ type: 'ADD_ITEM', item }),
   * React calls cartReducer(currentState, action) and updates state.
   */
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  /**
   * ACTION CREATOR FUNCTIONS
   * ========================
   * These functions wrap dispatchCartAction to provide a cleaner API.
   *
   * Instead of:
   * cartCtx.dispatchCartAction({ type: 'ADD_ITEM', item: meal })
   *
   * Components can use:
   * cartCtx.addItem(meal)
   *
   * This is cleaner and hides the implementation details.
   */

  /**
   * ADD ITEM TO CART
   * ================
   * @param {Object} item - Meal object to add { id, name, price, ... }
   */
  function addItem(item) {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  }

  /**
   * REMOVE ITEM FROM CART
   * =====================
   * @param {string} id - ID of the item to remove
   */
  function removeItem(id) {
    dispatchCartAction({ type: 'REMOVE_ITEM', id });
  }

  /**
   * CLEAR ALL ITEMS
   * ===============
   * Removes all items from the cart.
   */
  function clearCart() {
    dispatchCartAction({ type: 'CLEAR_CART' });
  }

  /**
   * CONTEXT VALUE
   * =============
   * This object is passed to all consuming components.
   *
   * It includes:
   * - items: The cart items array (from reducer state)
   * - addItem: Function to add item
   * - removeItem: Function to remove item
   * - clearCart: Function to clear all items
   */
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  /**
   * RENDER PROVIDER
   * ===============
   * The Provider component makes the context value available to all
   * descendants. The 'value' prop is what consumers receive.
   *
   * {children} renders all child components wrapped by this provider.
   */
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

/**
 * DEFAULT EXPORT
 * ==============
 * We export CartContext as default so consuming components can import it:
 * import CartContext from '../store/CartContext.jsx';
 * const cartCtx = useContext(CartContext);
 *
 * We also have a named export (CartContextProvider) for the App component:
 * import { CartContextProvider } from '../store/CartContext.jsx';
 */
export default CartContext;

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS
 * ============================================================================
 *
 * REDUCER PATTERN:
 * ================
 * The reducer pattern separates:
 * - WHAT happened (action type)
 * - HOW state changes (reducer logic)
 *
 * This makes state changes predictable and debuggable.
 *
 * IMMUTABLE STATE:
 * ================
 * Never mutate state directly. Always create new objects/arrays:
 * - [...array] to copy arrays
 * - { ...object } to copy objects
 * - Use map/filter to transform arrays without mutation
 *
 * CONTEXT + REDUCER:
 * ==================
 * Combining Context with useReducer is a powerful pattern:
 * - Context handles the "where" (global availability)
 * - Reducer handles the "how" (state transitions)
 *
 * This is often used as a simpler alternative to Redux for
 * application-wide state management.
 *
 * USAGE EXAMPLE:
 * ==============
 * // In a component
 * import { useContext } from 'react';
 * import CartContext from '../store/CartContext.jsx';
 *
 * function MealItem({ meal }) {
 *   const cartCtx = useContext(CartContext);
 *
 *   function handleAddToCart() {
 *     cartCtx.addItem(meal);
 *   }
 *
 *   return <button onClick={handleAddToCart}>Add to Cart</button>;
 * }
 */
