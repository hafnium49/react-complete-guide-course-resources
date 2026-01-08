/**
 * ============================================================================
 * REDUX STORE CONFIGURATION (Lessons 311-325)
 * ============================================================================
 *
 * ============================================================================
 * LESSON 325 - SPLITTING CODE INTO SEPARATE FILES
 * ============================================================================
 *
 * WHY SPLIT THE STORE FILE? (Lesson 325):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "Now to come to an end in this module where we learned a lot of important things.
 * I wanna split up this index JS file into store folder. It's actually quite a
 * small file not too much code in it, but of course, in your typical a React
 * application where you have multiple state slices, this can become a very long file."
 *
 * INSTRUCTOR QUOTE:
 * "So therefore it might be worth splitting it up into smaller pieces. And when
 * using Redux Toolkit it could make sense to put every slice into its own file."
 *
 * FILE STRUCTURE AFTER SPLITTING:
 * ===============================
 * store/
 *   index.js      <- THIS FILE: Store configuration and reducer merging
 *   counter.js    <- Counter slice, reducer, and actions
 *   auth.js       <- Auth slice, reducer, and actions
 *
 * WHAT THIS FILE DOES NOW (Lesson 325):
 * =====================================
 * INSTRUCTOR QUOTE:
 * "Now in index JS, we want to merge all those slices together. Therefore we can
 * remove, create slice in there. We don't need that import anymore because we're
 * not creating any slices in this file anymore. Instead, we focus on creating
 * that main store and merging all the slice reducers together."
 *
 * This file is now ONLY responsible for:
 * 1. Importing reducers from slice files
 * 2. Creating the store with configureStore
 * 3. Merging reducers via the reducer map
 * 4. Exporting the store
 *
 * BENEFITS OF THIS STRUCTURE (Lesson 325):
 * ========================================
 * INSTRUCTOR QUOTE:
 * "And in bigger application stat can ensure that our code stays maintainable
 * and is easier to manage because now we have a lean index JS file and then
 * pretty lean files for our different state slices which are then focused on
 * one specific type of state."
 *
 * | Before (All in index.js)      | After (Split files)           |
 * |-------------------------------|-------------------------------|
 * | Initial states                | Moved to slice files          |
 * | Slice definitions             | Moved to slice files          |
 * | Action exports                | Moved to slice files          |
 * | Store configuration           | Stays here                    |
 * | Reducer merging               | Stays here                    |
 *
 * INSTRUCTOR QUOTE:
 * "Not required here but definitely helpful in bigger applications. And even
 * here, it certainly doesn't hurt."
 *
 * LESSON 311-324 REVIEW:
 * ======================
 * Previous lessons covered:
 * - Lesson 311: Creating the store folder and basic Redux setup
 * - Lesson 312: Providing the store to React with Provider
 * - Lesson 313: Reading state with useSelector
 * - Lesson 314: Dispatching actions with useDispatch
 * - Lesson 315: Class-based components with connect()
 * - Lesson 316: Action payloads
 * - Lesson 317: Multiple state properties
 * - Lesson 318: State immutability rules
 * - Lesson 319: Redux challenges and intro to Redux Toolkit
 * - Lesson 320: createSlice for defining slices
 * - Lesson 321: configureStore for store setup
 * - Lesson 322: Auto-generated action creators
 * - Lesson 323: Multiple slices and reducer maps
 * - Lesson 324: Using auth state in components
 * - Lesson 325: Splitting code into separate files (THIS LESSON)
 */

import { configureStore } from '@reduxjs/toolkit';

/**
 * ============================================================================
 * IMPORTING REDUCERS FROM SLICE FILES (Lesson 325)
 * ============================================================================
 *
 * REMOVING createSlice IMPORT (Lesson 325):
 * =========================================
 * INSTRUCTOR QUOTE:
 * "Therefore we can remove, create slice in there. We don't need that import
 * anymore because we're not creating any slices in this file anymore."
 *
 * We only need configureStore since slice creation happens in separate files.
 *
 * IMPORTING counterReducer (Lesson 325):
 * ======================================
 * INSTRUCTOR QUOTE:
 * "Hence we can now import the counter slice from ./counter, or since we only
 * really needed to reducer in here, we actually go to the counter and we just
 * export the reducer. So we don't export the entire slice but just it's reducer part."
 *
 * INSTRUCTOR QUOTE:
 * "By doing that in index JS we could import the counter reducer here since that
 * is what we're exporting as a default. And then just assign that as a reducer
 * to counter the counter reducer."
 *
 * counter.js exports:
 *   export default counterSlice.reducer;  // This is what we import
 *   export const counterActions = counterSlice.actions;  // Components import this
 */
import counterReducer from './counter';

/**
 * IMPORTING authReducer (Lesson 325):
 * ===================================
 * INSTRUCTOR QUOTE:
 * "Do the same for off the JS just export the reducer year and an index JS.
 * Then therefore import the auth reducer from ./auth and assign this as a value
 * for the auth key in that reducer map."
 *
 * auth.js exports:
 *   export default authSlice.reducer;  // This is what we import
 *   export const authActions = authSlice.actions;  // Components import this
 */
import authReducer from './auth';

/**
 * ============================================================================
 * CREATING THE STORE WITH MERGED REDUCERS (Lesson 325)
 * ============================================================================
 *
 * CLEANER STORE CONFIGURATION (Lesson 325):
 * =========================================
 * Now that slices are in separate files, the store configuration is much simpler:
 * - Import reducers from their respective files
 * - Merge them in the reducer map
 * - Export the store
 *
 * The reducer map creates this state structure:
 * {
 *   counter: { counter: 0, showCounter: true },  // from counterReducer
 *   auth: { isAuthenticated: false }             // from authReducer
 * }
 *
 * STATE ACCESS IN COMPONENTS:
 * ===========================
 * - state.counter.counter -> counter value
 * - state.counter.showCounter -> visibility flag
 * - state.auth.isAuthenticated -> login status
 */
const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});

/**
 * ============================================================================
 * EXPORTING THE STORE (Lesson 325)
 * ============================================================================
 *
 * The store is the only thing exported from index.js now.
 *
 * ACTIONS ARE EXPORTED FROM SLICE FILES (Lesson 325):
 * ===================================================
 * INSTRUCTOR QUOTE:
 * "Now regarding the actions, I want to export those from there, from the files
 * into which they belong. So the counter actions should be exported here in the
 * counter JS file still by accessing dot actions and exporting that as a named
 * export at the same for auth."
 *
 * WHERE TO IMPORT FROM:
 * ====================
 * | What                | Import From           |
 * |---------------------|----------------------|
 * | store               | '../store/index'     |
 * | counterActions      | '../store/counter'   |
 * | authActions         | '../store/auth'      |
 *
 * COMPONENT IMPORT UPDATES (Lesson 325):
 * ======================================
 * INSTRUCTOR QUOTE:
 * "Now with that, if we saved this we'll need to fix a couple of imports in
 * counter JS for example, where I try to import counter actions from the index
 * file we now need to import them from the counter file in the store folder."
 *
 * INSTRUCTOR QUOTE:
 * "In auth JS, we need to import auth the actions from the auth file in the
 * store folder. In header, we need to import auth actions from the auth file
 * as well."
 *
 * Updated imports in components:
 * - Counter.js: import { counterActions } from '../store/counter';
 * - Auth.js: import { authActions } from '../store/auth';
 * - Header.js: import { authActions } from '../store/auth';
 */
export default store;

/**
 * ============================================================================
 * SUMMARY - LESSON 325 FILE STRUCTURE
 * ============================================================================
 *
 * BEFORE SPLITTING (All in index.js):
 * ===================================
 * store/
 *   index.js
 *     - createSlice import
 *     - configureStore import
 *     - initialCounterState
 *     - initialAuthState
 *     - counterSlice definition
 *     - authSlice definition
 *     - store configuration
 *     - counterActions export
 *     - authActions export
 *     - store export
 *
 * AFTER SPLITTING (Lesson 325):
 * =============================
 * store/
 *   index.js (THIS FILE)
 *     - configureStore import
 *     - counterReducer import (from ./counter)
 *     - authReducer import (from ./auth)
 *     - store configuration with reducer map
 *     - store export
 *
 *   counter.js
 *     - createSlice import
 *     - initialCounterState
 *     - counterSlice definition
 *     - counterReducer export (default)
 *     - counterActions export (named)
 *
 *   auth.js
 *     - createSlice import
 *     - initialAuthState
 *     - authSlice definition
 *     - authReducer export (default)
 *     - authActions export (named)
 *
 * BENEFITS:
 * =========
 * 1. Each file has a single responsibility
 * 2. Easier to find and modify specific features
 * 3. Better for team collaboration
 * 4. Scales well as application grows
 * 5. Cleaner imports in components
 *
 * INSTRUCTOR QUOTE:
 * "And in bigger application stat can ensure that our code stays maintainable
 * and is easier to manage because now we have a lean index JS file and then
 * pretty lean files for our different state slices which are then focused on
 * one specific type of state, not required here but definitely helpful in
 * bigger applications. And even here, it certainly doesn't hurt."
 */
