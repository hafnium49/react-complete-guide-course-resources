/**
 * ============================================================================
 * CART SLICE - Shopping Cart State Management (Lessons 329-330, 332)
 * ============================================================================
 *
 * ============================================================================
 * CRITICAL RULE: REDUCERS AND SIDE EFFECTS (Lesson 332)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 332):
 * "Keep in mind, reducers must be pure, side effect free, and synchronous.
 * So when we have any code that produces a side effect or is asynchronous,
 * like sending a HTTP request, such code must not go into our reducer functions."
 *
 * WHAT THIS MEANS:
 * ================
 * INSTRUCTOR QUOTE:
 * "So we can't send our HTTP request inside of the reducers in our cart slice
 * after we edited our state here. We can't go to the end of the reducer and
 * then use the fetch API and send the request to the backend."
 *
 * INSTRUCTOR QUOTE:
 * "This would totally be against the idea of Redux. It would be super bad and
 * you must never do something like this. Don't perform a side effect inside
 * of your reducer. No matter if it's synchronous or asynchronous, don't do it
 * inside of the reducer and never run any asynchronous code in the reducer
 * in general."
 *
 * WHAT REDUCERS CAN DO:
 * =====================
 * ✓ Pure state transformations (current state + action → new state)
 * ✓ Synchronous operations only
 * ✓ No side effects (no HTTP, no localStorage, no timers, no console.log)
 *
 * WHAT REDUCERS CANNOT DO:
 * ========================
 * ✗ Send HTTP requests (fetch, axios, etc.)
 * ✗ Access localStorage or sessionStorage
 * ✗ Use timers (setTimeout, setInterval)
 * ✗ Generate random values or dates
 * ✗ Modify anything outside of state
 *
 * TWO OPTIONS FOR HANDLING SIDE EFFECTS (Lesson 332):
 * ===================================================
 * INSTRUCTOR QUOTE:
 * "Instead, when it comes to running such code, we have two main options
 * where to put such code. We can execute it in the components. So we can
 * simply ignore Redux, if you want to call it like this. Or we create
 * something which is called an action creator which we only used indirectly
 * thus far which also would allow us to run asynchronous code or generally
 * any side effect code. These are our two main options."
 *
 * Option 1: Execute side effects in React components
 *   - Use useEffect to send HTTP requests
 *   - Dispatch Redux actions with the results
 *   - Redux only handles the synchronous state updates
 *
 * Option 2: Use action creators (thunks)
 *   - Create custom action creators that return functions
 *   - These functions can contain async code
 *   - Redux Toolkit supports this via createAsyncThunk or custom thunks
 *
 * ============================================================================
 * FIREBASE BACKEND (Lesson 332)
 * ============================================================================
 *
 * BACKEND URL: https://react-13c13-default-rtdb.firebaseio.com/
 *
 * INSTRUCTOR QUOTE (Lesson 332):
 * "Now for that as a backend, I will again use Firebase because it's that
 * easy to use, no backend code required, backend, which simply, well, makes
 * our life as a developer a bit easier."
 *
 * GOAL (Lesson 332):
 * ==================
 * INSTRUCTOR QUOTE:
 * "My idea is that whenever I edit the cart, because we add items or we reduce
 * the quantity or remove items, whenever that happens, I wanna send a request
 * to a backend server to store that updated cart on the backend so that when
 * we reload this front-end application, we can fetch that saved cart from
 * the server, load it and display it here."
 *
 * CURRENT PROBLEM:
 * ================
 * INSTRUCTOR QUOTE:
 * "Because currently, if we add something to the cart, if we edit our cart,
 * once I reload, all that data is lost because currently we're not storing
 * that cart anywhere."
 *
 * ============================================================================
 * THE MORE COMPLEX SLICE (Lesson 329):
 * ============================================================================
 * INSTRUCTOR QUOTE:
 * "Now the missing part and arguably the more difficult part, is that we now
 * also wanna manage the content of the cart. So the cart items should be
 * updated correctly when we click Add to Cart or when we click Plus or Minus
 * here."
 *
 * WHAT THIS SLICE MANAGES:
 * ========================
 * - Cart items array (products added to cart)
 * - Total quantity (sum of all item quantities)
 * - Adding items to cart (with duplicate detection)
 * - Removing items from cart (decrement quantity or remove entirely)
 *
 * FEATURES TO IMPLEMENT (Lesson 329):
 * ===================================
 * INSTRUCTOR QUOTE:
 * "I wanna make sure that if we click Add to Cart on a product, we do add it
 * to the cart. And if it's already part of the cart, we just increase the
 * quantity of the existing item."
 *
 * INSTRUCTOR QUOTE:
 * "And in the cart, with these buttons Plus and Minus, we also want to control
 * the quantity. And if the quantity is one and we click Minus, we remove the
 * item entirely from the cart."
 */

import { createSlice } from '@reduxjs/toolkit';

/**
 * ============================================================================
 * CART SLICE DEFINITION (Lesson 329)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "For this all dive into the cart slice JS file, and again import create
 * slice from Redux @reduxtoolkit. Then we create a slice here and configure
 * it with an object. It gets a name, for example, cart, it gets an initial
 * state and it will get some reducers."
 *
 * REMEMBER (Lesson 332):
 * ======================
 * All reducers below are PURE and SYNCHRONOUS. They only transform state.
 * Side effects (HTTP requests to Firebase) will be handled OUTSIDE of
 * these reducers - either in React components or in action creators (thunks).
 */
const cartSlice = createSlice({
  name: 'cart',

  /**
   * INITIAL STATE STRUCTURE (Lesson 329):
   * =====================================
   * INSTRUCTOR QUOTE:
   * "Now, what is our initial state here? How should the state of this state
   * slice look like? Which structure should, does state slice have? I think
   * it makes sense to have some items, some cart items and that should
   * probably be an array of items."
   *
   * INSTRUCTOR QUOTE:
   * "We probably also wanna have a total quantity of items in the cart. And
   * with that, I don't mean the length of this array, but the quantity of
   * the items of that array summed up, and initially that's zero."
   *
   * STATE STRUCTURE:
   * ================
   * {
   *   items: [
   *     { id: 'p1', name: 'Product 1', price: 6, quantity: 2, totalPrice: 12 },
   *     { id: 'p2', name: 'Product 2', price: 3, quantity: 1, totalPrice: 3 },
   *   ],
   *   totalQuantity: 3  // Sum of all quantities (2 + 1)
   * }
   */
  initialState: {
    items: [],
    totalQuantity: 0,
  },

  /**
   * REDUCERS - ACTIONS FOR CART MANAGEMENT (Lesson 329):
   * ====================================================
   * INSTRUCTOR QUOTE:
   * "Now we also need functions in our reducer, so different actions which
   * this part of our state should handle in the end. And here be clearly
   * need a addItemToCart action and a removeItemFromCart action, I would argue."
   *
   * IMPORTANT REMINDER (Lesson 332):
   * ================================
   * These reducers ONLY handle state transformation. They do NOT:
   * - Send HTTP requests to Firebase
   * - Perform any side effects
   * - Run any async code
   *
   * The HTTP sync with Firebase will be handled separately!
   */
  reducers: {
    /**
     * =========================================================================
     * ADD ITEM TO CART (Lesson 329)
     * =========================================================================
     *
     * INSTRUCTOR QUOTE:
     * "And it probably makes sense to start with adding items. So here we get
     * a state and we'll also accept this action argument because this action,
     * when it is dispatched, should carry extra information. We need to know
     * which items should be added after all."
     *
     * PAYLOAD STRUCTURE (Lesson 329):
     * ===============================
     * INSTRUCTOR QUOTE:
     * "Well, in there, we should probably extract the item from the action and
     * there keep in mind that it will be the payload property which Redux
     * Toolkit sets for you which contains any extra data you added to the action.
     * And here, I assume that this extra data is another object describing
     * the item that should be added."
     *
     * Expected action.payload:
     * {
     *   id: 'p1',
     *   title: 'Product Name',
     *   price: 6.99
     * }
     *
     * LOGIC OVERVIEW:
     * ===============
     * 1. Extract the new item from action.payload
     * 2. Check if item already exists in cart (by ID)
     * 3. If NOT exists: push new item with quantity 1
     * 4. If EXISTS: increment quantity and totalPrice of existing item
     *
     * NOTE (Lesson 332):
     * ==================
     * After this reducer runs, the cart state is updated in Redux.
     * But the cart is NOT yet saved to Firebase! That happens separately
     * using side effects (in components or action creators).
     */
    addItemToCart(state, action) {
      /**
       * EXTRACTING THE NEW ITEM (Lesson 329):
       * =====================================
       * INSTRUCTOR QUOTE:
       * "We should probably extract the item from the action and there keep in
       * mind that it will be the payload property which Redux Toolkit sets for
       * you which contains any extra data you added to the action."
       */
      const newItem = action.payload;

      /**
       * CHECK IF ITEM ALREADY EXISTS (Lesson 329):
       * ==========================================
       * INSTRUCTOR QUOTE:
       * "Now we could just push it to this array, but actually I wanna check
       * if it's part of that array already and if it is, I wanna increase the
       * quantity of the existing cart item instead of push it as an additional item."
       *
       * INSTRUCTOR QUOTE:
       * "So therefore, I want to get my existing item let's say, by reaching
       * out to the state items and finding an item in there where the item ID,
       * let's assume that our items have IDs, is equal to the item ID of the
       * item we're getting here."
       */
      const existingItem = state.items.find((item) => item.id === newItem.id);

      /**
       * UPDATE TOTAL QUANTITY:
       * ======================
       * Always increment totalQuantity when adding an item,
       * regardless of whether it's new or existing.
       */
      state.totalQuantity++;

      if (!existingItem) {
        /**
         * ITEM DOES NOT EXIST - ADD NEW ITEM (Lesson 329):
         * ================================================
         * INSTRUCTOR QUOTE:
         * "Now, if it does not exist, if existing item is falsy, so if it's not
         * part of the array yet, then we wanna add it. So then we wanna go to
         * our state items and push a new item."
         *
         * USING push() IS SAFE WITH REDUX TOOLKIT (Lesson 329):
         * =====================================================
         * INSTRUCTOR QUOTE:
         * "And that would be absolutely bad if you're using just Redux because
         * push manipulates the existing array in the existing state. And that's
         * a must not do, but with Redux Toolkit, as emphasized before, we don't
         * have that problem because their Redux Toolkit internally ensures that
         * this will not manipulate the existing state but that it instead
         * transforms this into an operation which updates the state in an
         * immutable way. So we can use push here when working with Redux Toolkit."
         *
         * NEW ITEM STRUCTURE (Lesson 329):
         * ================================
         * INSTRUCTOR QUOTE:
         * "And then we push a new object let's say, to our array where we have
         * an item ID field which is newItem.id, where we have a price field
         * which let's say is newItem.price, expecting a price field on all our
         * products. Then the quantity let's say, which is one hard-coded, because
         * if we add an item for the first time, the quantity will be one. And
         * therefore we always have a total price which is also newItem.price.
         * It's price times quantity, but since quantity is one, it's just the price."
         *
         * INSTRUCTOR QUOTE:
         * "Maybe we should also add the title or the name, however you want to
         * name it after product and I expect this on newItem.title."
         */
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price, // price * quantity, but quantity is 1
          name: newItem.title,
        });
      } else {
        /**
         * ITEM EXISTS - UPDATE EXISTING ITEM (Lesson 329):
         * ================================================
         * INSTRUCTOR QUOTE:
         * "But we also need to work on the else case, so the item does exist.
         * If that's the case, we wanna update the existing item, again, not
         * something you should do with just Redux but absolutely fine when
         * working with Redux Toolkit."
         *
         * INSTRUCTOR QUOTE:
         * "Then we reach out to the existing item and we update those fields
         * on the existing item. The item ID does not need to be updated, the
         * price also hasn't changed, but the quantity should be set to existing
         * item quantity plus one."
         *
         * INSTRUCTOR QUOTE:
         * "The total price should be set equal to total price plus newItem.price.
         * So we add the price and of course that should be existingItem.totalPrice.
         * So we increased the existing total price by adding the item price again.
         * And the name also hasn't changed. So we updated quantity and total price,
         * and we're done."
         *
         * DIRECT MUTATION IS SAFE:
         * ========================
         * We're directly modifying existingItem properties.
         * This works because:
         * 1. existingItem is a reference to an item in state.items
         * 2. Redux Toolkit/Immer tracks these changes
         * 3. Immer creates a new state object with these updates
         */
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }

      /**
       * WHAT WE CANNOT DO HERE (Lesson 332):
       * ====================================
       * INSTRUCTOR QUOTE:
       * "So we can't send our HTTP request inside of the reducers in our cart
       * slice after we edited our state here."
       *
       * ❌ WRONG - DO NOT DO THIS:
       * fetch('https://react-13c13-default-rtdb.firebaseio.com/cart.json', {
       *   method: 'PUT',
       *   body: JSON.stringify(state)
       * });
       *
       * This would violate the reducer purity rule!
       * Side effects will be handled outside the reducer.
       */
    },

    /**
     * =========================================================================
     * REMOVE ITEM FROM CART (Lesson 330)
     * =========================================================================
     *
     * INSTRUCTOR QUOTE (Lesson 330):
     * "Now when we remove items from the cart, we go to the remove item
     * from cart method and there we do the opposite. So there we also, first
     * of all, find the existing item."
     *
     * LOGIC:
     * ======
     * 1. Find the existing item by ID (from action.payload)
     * 2. Decrement totalQuantity
     * 3. If quantity is 1: remove the item entirely from array
     * 4. If quantity > 1: just decrement quantity and totalPrice
     *
     * IMPORTANT FIX (Lesson 330):
     * ===========================
     * INSTRUCTOR QUOTE:
     * "In the else case... we also should update the total price of that item.
     * And that's something I initially forgot here actually. So that's a bug
     * I would say, which I introduced there."
     *
     * INSTRUCTOR QUOTE:
     * "So here it should be existing item, total price is equal to existing
     * item, total price minus existing item price, so minus the individual
     * price of one such item."
     */
    removeItemFromCart(state, action) {
      /**
       * GETTING THE ID (Lesson 330):
       * ============================
       * Unlike addItemToCart which receives a full item object,
       * removeItemFromCart only needs the ID to find and update the item.
       */
      const id = action.payload; // Just the ID, not a full item object
      const existingItem = state.items.find((item) => item.id === id);

      /**
       * DECREMENT TOTAL QUANTITY:
       * =========================
       * Always decrement totalQuantity when removing an item,
       * regardless of whether we're reducing quantity or removing entirely.
       */
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        /**
         * QUANTITY IS 1 - REMOVE ITEM ENTIRELY (Lesson 330):
         * ==================================================
         * INSTRUCTOR QUOTE:
         * "If the quantity is one and we click Minus, we remove the item
         * entirely from the cart."
         *
         * filter() creates a new array excluding the item with this ID.
         * This is an immutable operation that Redux Toolkit handles safely.
         */
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        /**
         * QUANTITY > 1 - DECREASE QUANTITY (Lesson 330):
         * ==============================================
         * INSTRUCTOR QUOTE:
         * "In the else case... we reduce the quantity by one. And we also should
         * update the total price of that item. And that's something I initially
         * forgot here actually. So that's a bug I would say, which I introduced there."
         *
         * INSTRUCTOR QUOTE:
         * "So here it should be existing item, total price is equal to existing
         * item, total price minus existing item price, so minus the individual
         * price of one such item."
         */
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

/**
 * ============================================================================
 * EXPORTS (Lesson 329)
 * ============================================================================
 *
 * Following the same pattern as ui-slice:
 * - Default export: The slice itself (for configureStore)
 * - Named export: Action creators (for components to dispatch)
 *
 * USAGE IN COMPONENTS (Lesson 330):
 * =================================
 * import { cartActions } from '../store/cart-slice';
 *
 * // Adding an item (from ProductItem):
 * dispatch(cartActions.addItemToCart({
 *   id: 'p1',
 *   title: 'Product Name',
 *   price: 6.99
 * }));
 *
 * // Removing an item (from CartItem):
 * dispatch(cartActions.removeItemFromCart('p1')); // Just pass the ID
 *
 * ABOUT ACTION CREATORS (Lesson 332):
 * ===================================
 * INSTRUCTOR QUOTE:
 * "Or we create something which is called an action creator which we only
 * used indirectly thus far which also would allow us to run asynchronous
 * code or generally any side effect code."
 *
 * The action creators exported here (cartActions) are auto-generated by
 * createSlice. They are "synchronous action creators" - they just create
 * action objects.
 *
 * In upcoming lessons, we'll learn about "thunk action creators" that can
 * contain async code and side effects!
 */
export const cartActions = cartSlice.actions;

export default cartSlice;
