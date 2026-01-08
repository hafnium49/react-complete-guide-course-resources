/**
 * ============================================================================
 * REDUX STORE CONFIGURATION (Lesson 329)
 * ============================================================================
 *
 * SECTION 20: ADVANCED REDUX
 * ==========================
 * This section builds on Section 19 (Redux Basics) and focuses on:
 * - Practical implementation of Redux in a shopping cart app
 * - Managing multiple state slices
 * - Side effects and async code with Redux (upcoming lessons)
 *
 * PROJECT SETUP (Lesson 329):
 * ===========================
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
 */
const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
  },
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
