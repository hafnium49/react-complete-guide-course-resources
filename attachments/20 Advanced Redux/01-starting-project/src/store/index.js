/**
 * ============================================================================
 * REDUX STORE CONFIGURATION (Lessons 329, 332, 341)
 * ============================================================================
 *
 * SECTION 20: ADVANCED REDUX
 * ==========================
 * This section builds on Section 19 (Redux Basics) and focuses on:
 * - Practical implementation of Redux in a shopping cart app
 * - Managing multiple state slices
 * - Side effects and async code with Redux (Lesson 332+)
 * - Redux DevTools for debugging (Lesson 341)
 *
 * ============================================================================
 * REDUX DEVTOOLS (Lesson 341)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 341):
 * "Besides handling async tasks and side effects with Redux and understanding
 * where to put our code there was another important topic I wanted to have a
 * look at in this module. And that would be the Redux Devtools."
 *
 * WHY USE REDUX DEVTOOLS? (Lesson 341):
 * =====================================
 * INSTRUCTOR QUOTE:
 * "These are extra tools which we can use which make debugging Redux and our
 * Redux state a bit easier. Because in more complex applications with a lot of
 * Redux state handled by a lot of different slices and a lot of different
 * actions going on it can be difficult to find errors in your debug state in
 * the order of your actions and so on."
 *
 * INSTRUCTOR QUOTE:
 * "And sometimes it might be interesting to look into the current state of your
 * overall Redux store without having to dive into different parts of the UI to
 * verify that everything works correctly."
 *
 * INSTALLATION (Lesson 341):
 * ==========================
 * INSTRUCTOR QUOTE:
 * "You can simply search for Redux Devtools and you'll find a GitHub repository
 * about the Redux Devtools and the Redux Devtools can be used and installed as
 * a browser extension."
 *
 * INSTRUCTOR QUOTE:
 * "You can always install them as a stand alone app but I personally find the
 * browser extension easiest to use."
 *
 * Install as browser extension:
 * - Chrome: Search "Redux DevTools" in Chrome Web Store
 * - Firefox: Search "Redux DevTools" in Firefox Add-ons
 * - Edge: Search "Redux DevTools" in Edge Add-ons
 *
 * WORKS OUT OF THE BOX WITH REDUX TOOLKIT (Lesson 341):
 * =====================================================
 * INSTRUCTOR QUOTE:
 * "When using Redux without Redux toolkit you had to set up some extra code to
 * make Redux Devtools work. With Redux tool kit it will conveniently work out
 * of the box and you should then have access to that extension."
 *
 * No additional configuration needed! configureStore() automatically sets up
 * Redux DevTools integration. Just install the browser extension and it works!
 *
 * ACCESSING DEVTOOLS (Lesson 341):
 * ================================
 * INSTRUCTOR QUOTE:
 * "When I do so I have this Redux Devtools icon here or in the browser Devtools
 * you also should find Redux here as an option."
 *
 * Two ways to access:
 * 1. Click the Redux DevTools icon in browser toolbar
 * 2. Open browser DevTools (F12) → Find "Redux" tab
 *
 * WHAT YOU CAN SEE (Lesson 341):
 * ==============================
 * INSTRUCTOR QUOTE:
 * "And now here, you have insights into your Redux store into your actions and
 * much more. On the left side, you for example, see the actions that were
 * dispatched."
 *
 * Features:
 * - See all dispatched actions
 * - View action payloads
 * - Inspect state after each action
 * - See state "diff" (what changed)
 * - Time travel debugging (jump to previous states)
 *
 * ============================================================================
 * FIREBASE BACKEND INTEGRATION (Lesson 332)
 * ============================================================================
 *
 * BACKEND URL: https://react-13c13-default-rtdb.firebaseio.com/
 *
 * INSTRUCTOR QUOTE (Lesson 332):
 * "Now for that as a backend, I will again use Firebase because it's that
 * easy to use, no backend code required, backend, which simply, well, makes
 * our life as a developer a bit easier."
 *
 * WHAT WE'RE BUILDING (Lesson 332):
 * =================================
 * INSTRUCTOR QUOTE:
 * "My idea is that whenever I edit the cart, because we add items or we reduce
 * the quantity or remove items, whenever that happens, I wanna send a request
 * to a backend server to store that updated cart on the backend so that when
 * we reload this front-end application, we can fetch that saved cart from
 * the server, load it and display it here."
 *
 * THE PROBLEM WE'RE SOLVING (Lesson 332):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "Because currently, if we add something to the cart, if we edit our cart,
 * once I reload, all that data is lost because currently we're not storing
 * that cart anywhere."
 *
 * KEY REDUX RULE (Lesson 332):
 * ============================
 * INSTRUCTOR QUOTE:
 * "Keep in mind, reducers must be pure, side effect free, and synchronous.
 * So when we have any code that produces a side effect or is asynchronous,
 * like sending a HTTP request, such code must not go into our reducer functions."
 *
 * TWO OPTIONS FOR SIDE EFFECTS (Lesson 332):
 * ==========================================
 * INSTRUCTOR QUOTE:
 * "We can execute it in the components. So we can simply ignore Redux, if you
 * want to call it like this. Or we create something which is called an action
 * creator which we only used indirectly thus far which also would allow us to
 * run asynchronous code or generally any side effect code."
 *
 * ============================================================================
 * PROJECT SETUP (Lesson 329)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now I got another starting project for you to which we're now going to add
 * Redux and some logic. And that will then be the project which will be used
 * in the next lecture to add some side effects and some asynchronous code."
 *
 * INSTALLING REDUX (Lesson 329):
 * ==============================
 * INSTRUCTOR QUOTE:
 * "For this, let's set up Redux in this application. Now for this I'll first
 * of all quit the Dev server and then install @reduxjs/toolkit to install
 * the Redux Toolkit because I still wanna use that."
 *
 * INSTRUCTOR QUOTE:
 * "You could also use just Redux and just React Redux but working with Redux
 * Toolkit, simply makes working with Redux much easier."
 *
 * INSTRUCTOR QUOTE:
 * "Now, one thing I forgot of course is that we still need to install React
 * Redux though. So you should always install React Redux in addition to the
 * toolkit."
 *
 * INSTALLATION COMMANDS:
 * ======================
 * npm install @reduxjs/toolkit react-redux
 *
 * STORE FOLDER STRUCTURE (Lesson 329):
 * ====================================
 * INSTRUCTOR QUOTE:
 * "For this in the source folder, I'll add a store folder. Again, it doesn't
 * have to be named store but it is a common convention. And in that store
 * folder, I wanna add my index JS file which will set up my Redux store and
 * so on."
 *
 * store/
 *   index.js      <- THIS FILE: Store configuration
 *   ui-slice.js   <- UI state (cart visibility)
 *   cart-slice.js <- Cart state (items, quantities)
 */

import { configureStore } from '@reduxjs/toolkit';

/**
 * IMPORTING SLICES (Lesson 329):
 * ==============================
 * Each slice is in its own file for better organization.
 * We import the default export (the slice itself) to access .reducer
 */
import uiSlice from './ui-slice';
import cartSlice from './cart-slice';

/**
 * ============================================================================
 * CREATING THE STORE WITH configureStore (Lesson 329)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "With that exported, in index JS, we wanna create our store and we do that
 * by importing configure store from @reduxjs/toolkit, and then we call
 * configure store here."
 *
 * INSTRUCTOR QUOTE:
 * "And configure store then once object, where we set up our route reducer.
 * Now that can be a single reducer function or a map of reducers."
 *
 * USING A REDUCER MAP (Lesson 329):
 * =================================
 * INSTRUCTOR QUOTE:
 * "And I'll go for the ladder even though at the moment we only have a single
 * reducer, because we only have one slice, but since we'll later have another
 * slice, I'll set this to a map immediately and add a key of UI, though that
 * is up to you, but I'll name it UI."
 *
 * WHY USE A MAP EVEN WITH ONE SLICE?
 * ==================================
 * - Easier to add more slices later
 * - Consistent pattern throughout the app
 * - Clear structure for state access (state.ui, state.cart)
 *
 * ACCESSING THE REDUCER (Lesson 329):
 * ===================================
 * INSTRUCTOR QUOTE:
 * "And then add an import where I import the UI Slice from ./uislice, and
 * therefore as a value for UI, I point at UI Slice reducer, so the reducer
 * created by UI Slice."
 *
 * The slice object has a .reducer property that contains the combined
 * reducer function for all the reducer methods in that slice.
 *
 * RESULTING STATE STRUCTURE:
 * ==========================
 * {
 *   ui: {
 *     cartIsVisible: false
 *   },
 *   cart: {
 *     items: [],
 *     totalQuantity: 0
 *   }
 * }
 *
 * ACCESS PATTERNS IN COMPONENTS:
 * ==============================
 * - state.ui.cartIsVisible - Whether cart is shown
 * - state.cart.items - Array of cart items
 * - state.cart.totalQuantity - Total items in cart
 *
 * ABOUT MIDDLEWARE (Lesson 332 - Preview):
 * =========================================
 * configureStore automatically sets up middleware that allows us to
 * dispatch "thunks" (functions instead of action objects). This will
 * be important for handling async code with Redux!
 *
 * REDUX DEVTOOLS INTEGRATION (Lesson 341):
 * ========================================
 * INSTRUCTOR QUOTE:
 * "With Redux tool kit it will conveniently work out of the box and you
 * should then have access to that extension."
 *
 * configureStore() automatically:
 * - Enables Redux DevTools browser extension
 * - Sets up action logging
 * - Enables state inspection
 * - Enables time-travel debugging
 *
 * No extra code needed! Just install the browser extension.
 *
 * WHAT DEVTOOLS SHOWS FOR THIS STORE (Lesson 341):
 * ================================================
 * INSTRUCTOR QUOTE:
 * "And if I reload, we see that's in it and replace cart. In it, is this
 * automatically dispatched first action that applies all your initial states
 * to Redux so that initializes the store and replace card was dispatched
 * because we fetched the card initially."
 *
 * On app load, DevTools will show:
 * 1. @@INIT - Initializes the store with initial state
 * 2. cart/replaceCart - From fetchCartData thunk
 *
 * When adding items:
 * 1. cart/addItemToCart - The add action
 * 2. ui/showNotification (pending) - From sendCartData thunk
 * 3. ui/showNotification (success/error) - After HTTP completes
 */
const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
  },
  /**
   * NOTE ON DEVTOOLS (Lesson 341):
   * ==============================
   * Redux Toolkit's configureStore automatically enables DevTools.
   * If you wanted to disable it in production, you could add:
   *
   * devTools: process.env.NODE_ENV !== 'production'
   *
   * But by default, it's enabled and works automatically!
   */
});

/**
 * ============================================================================
 * EXPORTING THE STORE (Lesson 329)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now that gives us our store here and therefore, we can export this store,
 * like this."
 *
 * INSTRUCTOR QUOTE:
 * "With the store exported, we need to provide us to the application for it
 * to have an effect. And we can do this in the index JS file where we set up
 * our route component where we render our route application component."
 *
 * NEXT STEP:
 * ==========
 * In src/index.js, we'll wrap the App component with Provider and pass
 * this store to make Redux available throughout the application.
 */
export default store;
