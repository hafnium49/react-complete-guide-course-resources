/**
 * ============================================================================
 * CART CONTEXT - SHOPPING CART STATE MANAGEMENT (Lesson 290)
 * ============================================================================
 *
 * This file implements the shopping cart functionality using React Context
 * and the useReducer hook for complex state management.
 *
 * LESSON 290 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Creating a dedicated "store" folder for state management
 * 2. Using React Context for global/shared state
 * 3. Using useReducer for complex state logic
 * 4. Implementing immutable state updates in reducers
 * 5. Setting up default context values for IDE auto-completion
 * 6. Creating a context provider component pattern
 *
 * PROJECT PROGRESSION (End of Lesson 289):
 * ========================================
 * As the instructor says at the end of Lesson 289:
 * "And therefore, I'd say as a next step it probably makes sense to make
 * sure that these buttons can be clicked and that we start managing some
 * cart data which we then at some point can also display in a modal that
 * opens when we click this cart button."
 *
 * This sets up Lesson 290's goal: making the "Add to Cart" buttons work.
 *
 * WHY USE CONTEXT FOR CART? (Lesson 290)
 * ======================================
 * The instructor explains the reasoning:
 * "So my next goal is to make this Add to Cart button work and to manage
 * such a shopping cart behind the scenes. Now it sounds like this cart data
 * should not be data that should be managed in a single component, because
 * this data will be needed in multiple places in this app."
 *
 * "For example, we of course need this cart data in those meal items,
 * because there we need to add items to the cart. We'll need the cart data
 * in the header, where we want to show the overall number of items in the
 * cart. And we'll also need the cart data later to show it in a modal...
 * and we'll also need it to send it to the backend to submit an order."
 *
 * "Now there are of course different ways of managing such data... I'll
 * instead use React's context feature to manage this cart data in a more
 * general, centralized way."
 *
 * Components that use CartContext:
 * - Header: Displays total item count
 * - MealItem: Adds items to cart
 * - Cart: Displays items, allows quantity changes
 * - CartItem: Increment/decrement item quantity
 * - Checkout: Gets cart items for order submission, clears cart on success
 *
 * CREATING THE STORE FOLDER (Lesson 290):
 * =======================================
 * The instructor explains the folder structure:
 * "I'll add a new folder in my source folder, which I'll name store.
 * Though you could also call it context or state or anything like that."
 *
 * src/
 * └── store/             ← New folder created in Lesson 290
 *     └── CartContext.jsx  ← This file
 *
 * WHY useReducer INSTEAD OF useState? (Lesson 290)
 * ================================================
 * The instructor explains the decision:
 * "And one thing that'll be a bit more complex though will be the logic
 * for managing these items because if something gets added, I wanna check
 * if it's already part of the cart, and if it is, I just wanna update the
 * quantity of that existing item instead of adding a new item, because if
 * I add the same meal twice, I don't wanna add it twice but instead just
 * update the quantity. So that's the complex cart logic we'll need."
 *
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
 * CREATING THE CONTEXT (Lesson 290)
 * ==================================
 * The instructor explains creating the context:
 * "And in there, I'll add a CartContext.jsx file... because in that file
 * I want to export my context, so I'll export here the CartContext, and
 * this CartContext should be created with React's createContext function."
 *
 * DEFAULT VALUE PURPOSE (Lesson 290):
 * -----------------------------------
 * The instructor explains why we pass default values to createContext:
 * "Now in this createContext, we can set a default value, which technically
 * will never be used because this context will always be used with a
 * provider... but it can still be helpful to add such a default value here
 * because your IDE will then be able to pick up on that default value
 * structure and give you better auto-completion when using this context
 * later."
 *
 * KEY INSIGHT: Default values enable IDE auto-completion!
 * When you type cartCtx.add... the IDE will suggest addItem().
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
 * INITIAL LESSON 290 VERSION:
 * ---------------------------
 * The instructor initially creates a simpler version with just items and addItem:
 * const CartContext = createContext({
 *   items: [],
 *   addItem: (item) => {},
 * });
 *
 * The removeItem and clearCart functions are added in later lessons.
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
 *   quantity: number     // How many of this item in cart (added by reducer)
 * }
 */
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

/**
 * CART REDUCER FUNCTION (Lesson 290)
 * ===================================
 * The instructor explains the approach:
 * "And one thing that'll be a bit more complex though will be the logic
 * for managing these items... And since I have that more complex logic,
 * I'll use the useReducer hook instead of the useState hook here."
 *
 * "So I'll have my cartReducer function, which I'll define outside of
 * the component, outside of the provider component to be precise, because
 * this function should not be recreated every time the context value
 * changes, or every time this provider component here is re-executed."
 *
 * WHY DEFINE OUTSIDE COMPONENT?
 * -----------------------------
 * Key insight: Reducers don't need access to component props or state.
 * They only receive the action and current state as parameters.
 * Defining outside prevents unnecessary re-creation on every render.
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
 * IMPORTANT: IMMUTABLE UPDATES (Lesson 290)
 * =========================================
 * The instructor emphasizes:
 * "And now here we should not use push because push modifies an existing
 * array... we should not mutate existing state. We should instead create
 * a brand new state."
 *
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
   * ADD_ITEM ACTION (Lesson 290)
   * ============================
   * The instructor builds this logic step by step:
   * "I want to handle actions of type ADD_ITEM... And when we receive such
   * an action, we should check if the item that should be added is already
   * part of the cart, because in that case, we should only update its
   * quantity, not add it again."
   *
   * LOGIC:
   * 1. Check if item already exists in cart (by ID)
   * 2. If exists: increment quantity
   * 3. If not exists: add item with quantity 1
   *
   * WHY CHECK FOR EXISTING ITEM? (Lesson 290)
   * -----------------------------------------
   * The instructor explains:
   * "if something gets added, I wanna check if it's already part of the cart,
   * and if it is, I just wanna update the quantity of that existing item
   * instead of adding a new item, because if I add the same meal twice,
   * I don't wanna add it twice but instead just update the quantity."
   *
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
     * FIND EXISTING ITEM (Lesson 290)
     * ================================
     * The instructor explains using findIndex:
     * "And I can find out whether the item is already part of the cart by
     * using state items and then the findIndex method, which is a default
     * method available on arrays in JavaScript, to find a specific element
     * in an array."
     *
     * findIndex() returns the index of the first element that matches,
     * or -1 if no match is found.
     *
     * "And find index will return the index of an item, of an element, in
     * this array that matches a certain condition which you define by
     * providing a function to find index."
     *
     * We compare by ID because it's the unique identifier for each meal.
     */
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    /**
     * CREATE COPY OF ITEMS ARRAY (Lesson 290)
     * =======================================
     * The instructor emphasizes immutability:
     * "And now here we should not use push because push modifies an existing
     * array... instead I'll create a new constant where I have updated items
     * which is a brand new array where I spread the existing state items."
     *
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
       * ITEM EXISTS - INCREMENT QUANTITY (Lesson 290)
       * ==============================================
       * The instructor explains this branch:
       * "So if we got an existing cart item index that's greater than minus
       * one, so that therefore is positive... if that's the case, the item
       * already is part of the cart."
       *
       * "And in that case I just wanna update the quantity of that item."
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
       * ITEM DOESN'T EXIST - ADD NEW ITEM (Lesson 290)
       * ===============================================
       * The instructor explains:
       * "And we have an else case here for the alternative where the item
       * does not exist yet. So we have the case where it did exist and we
       * updated the quantity, and now we have the case where it does not
       * exist yet."
       *
       * "In that case, I wanna push a new item onto updated items... I wanna
       * spread action.item... and to add a quantity field set to one."
       *
       * WHY ADD QUANTITY: 1?
       * --------------------
       * The item from action doesn't have quantity (it comes from
       * the meals data), so we add it here when adding to cart.
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
   * REMOVE_ITEM ACTION (Lesson 291)
   * ================================
   * The instructor explains the remove item logic:
   * "Of course, we also wanna make sure that we can remove items.
   * And for that I'll actually also start by getting my existing
   * cart item index."
   *
   * "So I'll copy that code from add item and add this here in
   * remove item. Because again, we wanna update that existing cart
   * item in an immutable way."
   *
   * LOGIC (Lesson 291):
   * -------------------
   * 1. Find the item by ID
   * 2. If quantity > 1: decrement quantity
   * 3. If quantity === 1: remove item entirely
   *
   * WHY NO EXISTENCE CHECK? (Lesson 291)
   * ------------------------------------
   * The instructor explains:
   * "Now here, when removing items, we don't have to check whether
   * an item exists already or not because in this app we'll only be
   * able to remove items if they do exist because we'll only be able
   * to reduce the amount of items in the shopping cart from inside
   * that shopping cart screen."
   *
   * This is a design decision - remove buttons only appear for items
   * that are already in the cart.
   */
  if (action.type === 'REMOVE_ITEM') {
    /**
     * FIND THE ITEM TO REMOVE (Lesson 291)
     * =====================================
     * The instructor explains:
     * "So therefore here we'll need to grab our existing cart item
     * by reaching out to the state items and accessing this existing
     * cart item index."
     *
     * NOTE: In Lesson 291, the instructor changes action.item.id to action.id
     * "I'm looking for an entire item property here, but that's no problem
     * because I only need the id here anyways so I can simply access action.id
     * here and everything should work. We don't need the full item here,
     * unlike with the addItem case because when removing the item we just
     * needed the id to identify it."
     */
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    /**
     * CREATE COPY OF ITEMS ARRAY (Lesson 291)
     * =======================================
     * The instructor explains moving this out of the if block:
     * "And to do that I'll actually move this updated items array
     * creation here out of that if block, so that I can use it in
     * both the if and also the else branch of this if check."
     */
    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      /**
       * QUANTITY IS 1 - REMOVE ENTIRE ITEM (Lesson 291)
       * ================================================
       * The instructor explains this condition:
       * "we will need to check what the quantity of that item is because
       * if it's greater than one we wanna reduce the quantity. If it's
       * equal to one, we wanna remove the entire item from the shopping
       * cart items array."
       *
       * Using splice() method:
       * "One way of removing the item is to again create a copy of the
       * old items... and to then call the splice method on that array.
       * Splice takes an index, in this case the existing cart item index
       * and then the number of items that should be spliced, which here
       * simply means removed."
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
       * QUANTITY > 1 - DECREMENT QUANTITY (Lesson 291)
       * ===============================================
       * The instructor explains:
       * "If the quantity is greater than one though we wanna update that
       * quantity. And for this, we'll need an updated item which is a
       * fresh copy of the existing item. And we then need to update the
       * quantity and set it equal to existingCartItem.quantity minus one."
       *
       * "So that we create a new item based on the old item where we
       * reduce the quantity."
       *
       * "And then in the else branch, I'll set updated items for this
       * existing cart item index equal to my updated item here, which
       * has that reduced quantity."
       */
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    /**
     * RETURN UPDATED STATE (Lesson 291)
     * ==================================
     * The instructor explains:
     * "Now we just need to return that updated state outside of this
     * inner if block, but still inside of this if block. And here it's
     * in the end the same logic as before in the add item if block.
     * We wanna return a new object that copies in the old state and
     * updates the items."
     */
    return { ...state, items: updatedItems };
  }

  /**
   * CLEAR_CART ACTION (Lesson 300)
   * ==============================
   * Note: In Lesson 290, the instructor only implements ADD_ITEM.
   * CLEAR_CART is added in Lesson 300 when implementing the checkout flow
   * to clear the cart after successful order submission.
   *
   * WHY CLEAR THE CART? (Lesson 300)
   * ================================
   * INSTRUCTOR QUOTE:
   * "now in this function [handleFinish], we, of course, also wanna clear
   * our cart. And I'll do that by going to my CartContext and by adding
   * another action there or another function we can dispatch through this
   * context - a clearCart function."
   *
   * After a successful order submission, we need to:
   * 1. Reset the cart to empty (this action)
   * 2. Close the checkout modal
   * 3. Reset the HTTP hook's data state
   *
   * IMPLEMENTATION (Lesson 300):
   * ============================
   * The instructor explains:
   * "And then I also need to dispatch this in my reducer, in my cartReducer...
   * So I'll add another if check here in the reducer, checking if action.type
   * equals CLEAR_CART, and if that's the case, I wanna return a new state
   * where I spread the existing state and I set items to an empty array."
   *
   * Used when:
   * - Order is successfully submitted (in handleFinish)
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
 * CART CONTEXT PROVIDER COMPONENT (Lesson 290)
 * ============================================
 * The instructor explains this pattern:
 * "And then I also want to export a component function which I'll call
 * CartContextProvider... a component which you will typically also create
 * when creating a context like this, so that you can wrap your provider
 * around the parts of your component tree that need access to that context."
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
   * INITIALIZE useReducer (Lesson 290)
   * ==================================
   * The instructor explains:
   * "And since I have that more complex logic, I'll use the useReducer
   * hook instead of the useState hook here. So here I'll use useReducer
   * importing it from React."
   *
   * "And useReducer takes as a first argument a so-called reducer function,
   * and as a second argument your initial state."
   *
   * useReducer returns:
   * - cart: Current state (initially { items: [] })
   * - dispatchCartAction: Function to dispatch actions
   *
   * When we call dispatchCartAction({ type: 'ADD_ITEM', item }),
   * React calls cartReducer(currentState, action) and updates state.
   */
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  /**
   * ACTION CREATOR FUNCTIONS (Lesson 290)
   * =====================================
   * The instructor explains creating these wrapper functions:
   * "And I'll also have an addItem function in here, which is a function
   * that takes an item as an input... And this function should then in the
   * end call dispatchCartAction."
   *
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
   * ADD ITEM TO CART (Lesson 290)
   * =============================
   * The instructor explains:
   * "And this function should then in the end call dispatchCartAction and
   * dispatch an action. And the action which we're dispatching should have
   * a type of add item. And then we also should forward that item."
   *
   * @param {Object} item - Meal object to add { id, name, price, ... }
   */
  function addItem(item) {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  }

  /**
   * REMOVE ITEM FROM CART (Lesson 291)
   * ===================================
   * The instructor explains the action dispatch:
   * "Now for remove item, we also want to dispatch a cart action
   * but now the identifier is REMOVE_ITEM, or whichever identifier
   * you used in your reducer."
   *
   * WHY PASS id INSTEAD OF item? (Lesson 291)
   * -----------------------------------------
   * "And I now actually also have to change my reducer because here
   * I'm getting an id as an input. That's what I'm expecting. And
   * therefore I wanna forward that through the action to the reducer."
   *
   * "We don't need the full item here, unlike with the addItem case
   * because when removing the item we just needed the id to identify it."
   *
   * @param {string} id - ID of the item to remove
   */
  function removeItem(id) {
    dispatchCartAction({ type: 'REMOVE_ITEM', id });
  }

  /**
   * CLEAR ALL ITEMS FROM CART (Lesson 300)
   * ======================================
   * Note: In Lesson 290, the instructor only implements addItem.
   * clearCart is added in Lesson 300 when implementing order submission.
   *
   * WHY THIS FUNCTION? (Lesson 300)
   * ===============================
   * INSTRUCTOR QUOTE:
   * "And I'll do that by going to my CartContext and by adding another action
   * there or another function we can dispatch through this context - a clearCart
   * function."
   *
   * "So I'll add a clearCart function to my context value which calls
   * dispatchCartAction and dispatches an action of type CLEAR_CART."
   *
   * WHEN IS THIS CALLED? (Lesson 300)
   * =================================
   * This function is called in Checkout.jsx's handleFinish():
   * - After a successful order submission
   * - When user clicks "Okay" on the success modal
   *
   * COMPLETE CLEANUP SEQUENCE (Lesson 300):
   * =======================================
   * When an order succeeds, handleFinish does THREE things:
   * 1. userProgressCtx.hideCheckout() - Close the modal
   * 2. cartCtx.clearCart() - Empty the cart (THIS FUNCTION)
   * 3. clearData() - Reset HTTP hook state
   */
  function clearCart() {
    dispatchCartAction({ type: 'CLEAR_CART' });
  }

  /**
   * CONTEXT VALUE (Lesson 290)
   * ==========================
   * The instructor explains creating this context value object:
   * "Now we also need a cartContext constant, I'll name it like this,
   * which should be an object that holds the data that will be exposed
   * through this context."
   *
   * "And here we should have an items key, which points at cart.items...
   * we should have that addItem function on there, just like this."
   *
   * INITIAL LESSON 290 VERSION:
   * ---------------------------
   * const cartContext = {
   *   items: cart.items,
   *   addItem,
   * };
   *
   * removeItem and clearCart are added in later lessons.
   *
   * It includes:
   * - items: The cart items array (from reducer state)
   * - addItem: Function to add item
   * - removeItem: Function to remove item (added later)
   * - clearCart: Function to clear all items (added later)
   */
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  /**
   * RENDER PROVIDER (Lesson 290)
   * ============================
   * The instructor explains:
   * "And then down here, I wanna return something, and what I wanna return
   * is the CartContext.Provider, so the provider property of that context
   * which we created up here."
   *
   * "And this provider should wrap the children... And on this provider,
   * we also need to set the value prop, which contains the actual context
   * data. And that's why we pass this cartContext object to value."
   *
   * The Provider component makes the context value available to all
   * descendants. The 'value' prop is what consumers receive.
   *
   * {children} renders all child components wrapped by this provider.
   */

  console.log(cartContext); // For debugging: log current cart context

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

/**
 * DEFAULT EXPORT (Lesson 290)
 * ===========================
 * The instructor explains the export pattern:
 * "I also wanna export my context as a default so that it can be imported
 * and used by components that wanna consume it."
 *
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
 * SUMMARY & KEY CONCEPTS FROM LESSONS 290, 291 & 300
 * ============================================================================
 *
 * LESSON 290 WORKFLOW:
 * ====================
 * 1. Create "store" folder in src
 * 2. Create CartContext.jsx file
 * 3. Set up createContext with default values for IDE auto-completion
 * 4. Create CartContextProvider component
 * 5. Use useReducer for complex cart state logic
 * 6. Implement cartReducer with ADD_ITEM action
 * 7. Export both context (default) and provider (named)
 *
 * LESSON 291 WORKFLOW:
 * ====================
 * 1. Add REMOVE_ITEM action to the reducer
 * 2. Handle quantity check: decrement vs remove entirely
 * 3. Use splice() to remove items from array
 * 4. Add addItem and removeItem dispatch functions
 * 5. Wrap App with CartContextProvider
 * 6. Use context in MealItem to add items
 * 7. Use context in Header to display cart count with reduce()
 *
 * WHY CONTEXT? (From instructor):
 * ===============================
 * "it sounds like this cart data should not be data that should be managed
 * in a single component, because this data will be needed in multiple
 * places in this app"
 *
 * REDUCER PATTERN:
 * ================
 * The reducer pattern separates:
 * - WHAT happened (action type)
 * - HOW state changes (reducer logic)
 *
 * This makes state changes predictable and debuggable.
 *
 * IMMUTABLE STATE (From instructor):
 * ==================================
 * "And now here we should not use push because push modifies an existing
 * array... we should not mutate existing state. We should instead create
 * a brand new state."
 *
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
 * USAGE EXAMPLE (as shown in MealItem.jsx - Lesson 291):
 * ======================================================
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
 *
 * USING reduce() FOR CART COUNT (Lesson 291):
 * ===========================================
 * The instructor explains in Header.jsx:
 * "Now, just taking the length would not be enough now because we add
 * every item only once to that cart and thereafter we just increase
 * the quantity. So instead, I'll call the built-in reduce method."
 *
 * const totalCartItems = cartCtx.items.reduce((total, item) => {
 *   return total + item.quantity;
 * }, 0);
 *
 * WHAT'S NEXT (end of Lesson 291):
 * ================================
 * "The next step now is to make sure that when we click this cart button,
 * we open up a modal and we show some cart data in that modal."
 *
 * ============================================================================
 * LESSON 300 - CLEARING THE CART
 * ============================================================================
 *
 * LESSON 300 WORKFLOW (CartContext additions):
 * ============================================
 * 1. Add CLEAR_CART action to cartReducer
 * 2. Add clearCart function to CartContextProvider
 * 3. Include clearCart in context value
 * 4. Call clearCart in Checkout's handleFinish
 *
 * WHY CLEAR THE CART? (Lesson 300)
 * ================================
 * INSTRUCTOR QUOTE:
 * "now in this function [handleFinish], we, of course, also wanna clear
 * our cart. And I'll do that by going to my CartContext and by adding
 * another action there or another function we can dispatch through this
 * context - a clearCart function."
 *
 * After a successful order, we need to:
 * - Empty the cart (so ordered items don't remain)
 * - Close the checkout modal
 * - Reset the HTTP hook state
 *
 * CLEAR_CART REDUCER ACTION (Lesson 300):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "And then I also need to dispatch this in my reducer, in my cartReducer...
 * So I'll add another if check here in the reducer, checking if action.type
 * equals CLEAR_CART, and if that's the case, I wanna return a new state
 * where I spread the existing state and I set items to an empty array."
 *
 * Implementation:
 * if (action.type === 'CLEAR_CART') {
 *   return { ...state, items: [] };
 * }
 *
 * clearCart FUNCTION (Lesson 300):
 * ================================
 * INSTRUCTOR QUOTE:
 * "So I'll add a clearCart function to my context value which calls
 * dispatchCartAction and dispatches an action of type CLEAR_CART."
 *
 * Implementation:
 * function clearCart() {
 *   dispatchCartAction({ type: 'CLEAR_CART' });
 * }
 *
 * COMPLETE CLEANUP IN CHECKOUT (Lesson 300):
 * ==========================================
 * When the user clicks "Okay" on the success screen, handleFinish:
 * 1. Calls userProgressCtx.hideCheckout() - closes modal
 * 2. Calls cartCtx.clearCart() - empties cart (THIS FUNCTION)
 * 3. Calls clearData() - resets HTTP hook state
 *
 * All three are necessary for a clean state before next order!
 */
