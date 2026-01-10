/**
 * ============================================================================
 * CART SLICE - Shopping Cart State Management (Lessons 329-330, 332-335, 338-339)
 * ============================================================================
 *
 * ============================================================================
 * FILE ORGANIZATION (Lesson 339)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 339):
 * "But since this file is now getting bigger and bigger, I'm a fan of creating
 * a separate file for that. Let's maybe name it cart-actions.js, of course,
 * the file name is up to you."
 *
 * FILE STRUCTURE:
 * ===============
 * - cart-slice.js (THIS FILE): createSlice definition, reducers, auto-generated actions
 * - cart-actions.js: Custom thunk action creators (sendCartData, fetchCartData)
 *
 * WHY SEPARATE FILES?
 * ===================
 * - Keeps each file focused on one responsibility
 * - cart-slice.js: Synchronous state transformations only
 * - cart-actions.js: Async side effects (HTTP requests)
 * - Easier to maintain as the application grows
 *
 * ============================================================================
 * FAT REDUCERS vs FAT COMPONENTS vs FAT ACTIONS (Lesson 334)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 334):
 * "When we consider where to put our logic, our code, then we have to
 * differentiate between synchronous, side-effect free code and code with
 * side effects or code that is asynchronous."
 *
 * THE KEY QUESTION: WHERE TO PUT YOUR CODE?
 * ==========================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  TYPE OF CODE              │  WHERE TO PUT IT                          │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │  Synchronous,              │  ✓ PREFER Reducers (fat reducers)         │
 * │  Side-effect free          │  ✗ Avoid action creators                  │
 * │  (data transformation)     │  ✗ Avoid components                       │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │  Asynchronous,             │  ✓ PREFER Action creators (thunks)        │
 * │  Side effects              │  ✓ OR Components (useEffect)              │
 * │  (HTTP requests, etc.)     │  ✗ NEVER in reducers                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE (Lesson 334):
 * "If we're dealing with synchronous side-effect free code. So if we basically
 * just have some data transformation... then you typically should prefer
 * reducers. Now, if you personally have a different opinion, if you like
 * having your code in the component, that of course is fine, but generally
 * it is considered a bit better to prefer reducers."
 *
 * WHY FAT REDUCERS ARE PREFERRED (Lesson 334):
 * ============================================
 * 1. Reducers are the NATURAL place for state transformation logic
 * 2. Redux Toolkit/Immer handles immutability automatically
 * 3. Logic is centralized, not scattered across components
 * 4. No need to duplicate transformation logic in multiple components
 * 5. Components stay lean and focused on UI
 *
 * THE SUBOPTIMAL APPROACH (Lesson 334):
 * =====================================
 * INSTRUCTOR QUOTE:
 * "We have sub optimal code because we are performing the data transformation
 * in the component and not inside of the reducer if we rely on replace cart
 * and that is sub optimal."
 *
 * The instructor demonstrated code where:
 * - ProductItem does all the cart transformation manually
 * - A simple `replaceCart` reducer just stores the result
 * - This is SUBOPTIMAL because it puts logic in components
 *
 * See the `replaceCart` reducer below and the comments in ProductItem.js
 * for the full explanation of why this approach is not recommended.
 *
 * ============================================================================
 * WHY THE REDUCER DOES SO MUCH WORK (Lesson 333)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 333):
 * "Therefore it's important to recognize that the code we need to write on
 * the frontend and where we write that code will depend on our backend code."
 *
 * OUR BACKEND IS A "DUMB" BACKEND (Lesson 333):
 * =============================================
 * INSTRUCTOR QUOTE:
 * "Instead here we have a backend that does not do a lot of work. It basically
 * just stores incoming data in the format it receives it in. And that means
 * that we do need to do more work on the frontend."
 *
 * INSTRUCTOR QUOTE:
 * "Firebase the way we are using it does not have any logic on its own on
 * the backend. So if we send some product data there, that product data would
 * simply be added to the database but all the logic we have in the reducer
 * for checking whether a product is already part of the cart and if it is
 * updating its quantity, if it's not adding it - that kind of logic simply
 * does not run on Firebase."
 *
 * WHAT THIS MEANS FOR OUR CODE:
 * =============================
 * INSTRUCTOR QUOTE:
 * "We are not just getting the finished cart as a payload on the action,
 * instead we get a product and we need to find out how to add it to the
 * cart here in this code."
 *
 * The reducers below (addItemToCart, removeItemFromCart) contain all the
 * transformation logic because Firebase won't do it for us:
 * - Check if product already exists in cart
 * - Update quantity if it exists
 * - Add new item if it doesn't exist
 * - Calculate totalPrice
 * - Handle removal logic
 *
 * IF WE HAD A "SMART" BACKEND (Lesson 333):
 * =========================================
 * INSTRUCTOR QUOTE:
 * "Now if we would have a backend API that does a lot of work so that does
 * not just store incoming data but also transform it. If we had an API like
 * this then our frontend application could do less work. It could just send
 * data like data for a product that should be added to a cart. It could send
 * that data to the backend, let the backend do the transformation and then
 * use the response on the frontend to then just there hand it off to the
 * reducer."
 *
 * With a smart backend, our reducer could be much simpler:
 * replaceCart(state, action) {
 *   state.items = action.payload.items;
 *   state.totalQuantity = action.payload.totalQuantity;
 * }
 *
 * But that's not our scenario here!
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
 * NOTE ON uiActions IMPORT (Lesson 339):
 * ======================================
 * INSTRUCTOR QUOTE (Lesson 339):
 * "So in cart-slice, I'll get rid of that import, cut that and add that in
 * cart-actions instead."
 *
 * The uiActions import was moved to cart-actions.js because:
 * - This file (cart-slice.js) only contains synchronous reducers
 * - Reducers don't dispatch actions (they just transform state)
 * - The thunks in cart-actions.js need uiActions to dispatch notifications
 */

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
   * REDUCERS - ACTIONS FOR CART MANAGEMENT (Lessons 329, 333):
   * ==========================================================
   * INSTRUCTOR QUOTE:
   * "Now we also need functions in our reducer, so different actions which
   * this part of our state should handle in the end. And here be clearly
   * need a addItemToCart action and a removeItemFromCart action, I would argue."
   *
   * WHY THESE REDUCERS DO TRANSFORMATION WORK (Lesson 333):
   * =======================================================
   * INSTRUCTOR QUOTE:
   * "We are not just getting the finished cart as a payload on the action,
   * instead we get a product and we need to find out how to add it to the
   * cart here in this code. And the same for removing."
   *
   * Because Firebase is a "dumb" backend that just stores data:
   * - addItemToCart: receives { id, title, price }, transforms into cart item
   * - removeItemFromCart: receives id, updates quantity or removes item
   *
   * THE CHALLENGE (Lesson 333):
   * ===========================
   * INSTRUCTOR QUOTE:
   * "Therefore we will need to find a way to still do the work here on the
   * frontend and at the same time then send that transformed data to the
   * backend without doing that sending inside of the reducer because we
   * learned that we're not allowed to do it there."
   *
   * SOLUTION - useEffect IN App.js (Lesson 335):
   * =============================================
   * INSTRUCTOR QUOTE (Lesson 335):
   * "We can simply switch the order. We can first do the work on the front end
   * and let Redux update its store. And then in a second step thereafter we
   * send the request to the server."
   *
   * THE FLOW:
   * 1. Reducers do the transformation (this file - pure, sync)
   * 2. Redux store updates with new cart state
   * 3. useSelector in App.js detects change
   * 4. useEffect in App.js sends PUT request to Firebase
   *
   * See App.js for the implementation!
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
        state.items.push({ // Safe to use push() with Redux Toolkit
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
        existingItem.quantity++; // Safe direct mutation with Redux Toolkit
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

    /**
     * =========================================================================
     * REPLACE CART (Lesson 334) - FOR SUBOPTIMAL APPROACH
     * =========================================================================
     *
     * ⚠️ WARNING: This reducer exists to demonstrate a SUBOPTIMAL approach!
     *
     * INSTRUCTOR QUOTE (Lesson 334):
     * "I added a new reducer in the store, the replace cart reducer. I added
     * that off screen and that simply gets the new total quantity and the new
     * items from the payload and overrides it in the Redux store."
     *
     * WHAT THIS REDUCER DOES:
     * =======================
     * This is a "dumb" reducer that just stores whatever data is passed to it.
     * It doesn't do any transformation - it expects the caller to have already
     * done all the work of:
     * - Checking if item exists
     * - Updating quantities
     * - Calculating totalPrice
     * - Creating the final cart structure
     *
     * WHY THIS APPROACH IS SUBOPTIMAL (Lesson 334):
     * =============================================
     * INSTRUCTOR QUOTE:
     * "The problem is, that if we would use this in all the parts of our
     * application, where we need to update the cart. So if we would also use
     * it instead of cart item to be precise, then we would need to copy all
     * that logic here which I added to this component to the cart item
     * component as well."
     *
     * Problems with this approach:
     * 1. Data transformation logic is in COMPONENTS, not REDUCERS
     * 2. Would need to DUPLICATE this logic in every component (ProductItem, CartItem)
     * 3. Goes against the Redux philosophy of "fat reducers"
     * 4. Makes the reducer "dumb" when it should be "smart"
     *
     * WHEN WOULD THIS BE USED:
     * ========================
     * - When fetching cart data from a backend (we'll do this later)
     * - When the transformation is already done elsewhere
     * - NOT as the primary way to update cart state
     *
     * @param {Object} action.payload - Complete cart data
     * @param {number} action.payload.totalQuantity - Total items count
     * @param {Array} action.payload.items - Array of cart items
     */
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
  },
});

/**
 * ============================================================================
 * EXPORTS (Lessons 329, 338, 339)
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
 * THUNK ACTION CREATORS MOVED (Lesson 339):
 * =========================================
 * INSTRUCTOR QUOTE (Lesson 339):
 * "I'll then copy this sendCartData function, cut it from cart-slice and add
 * it to cart-actions."
 *
 * Custom thunk action creators are now in cart-actions.js:
 * - sendCartData(cart) - Sends cart to Firebase (PUT request)
 * - fetchCartData() - Fetches cart from Firebase (GET request)
 *
 * Import them from cart-actions.js:
 * import { sendCartData, fetchCartData } from '../store/cart-actions';
 *
 * The action creators exported here (cartActions) are auto-generated by
 * createSlice. They are "synchronous action creators" - they just create
 * action objects. Thunk action creators (async) are in cart-actions.js.
 */
export const cartActions = cartSlice.actions;

export default cartSlice;
