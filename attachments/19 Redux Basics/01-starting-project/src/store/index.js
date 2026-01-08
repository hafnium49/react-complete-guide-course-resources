/**
 * ============================================================================
 * REDUX STORE CONFIGURATION (Lessons 311-326)
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
 * - Lesson 325: Splitting code into separate files
 * - Lesson 326: Section summary and Redux vs Context (THIS LESSON)
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
 *
 * ============================================================================
 * LESSON 326 - COURSE SECTION SUMMARY
 * ============================================================================
 *
 * SECTION OVERVIEW (Lesson 326):
 * ==============================
 * INSTRUCTOR QUOTE:
 * "Now that is it for this course section. Was again another long section but
 * it was about a super important topic, Redux."
 *
 * WHAT WE LEARNED IN THIS SECTION:
 * ================================
 *
 * 1. REDUX WITHOUT REACT (Lesson 311):
 *    - How Redux works as a standalone library
 *    - Creating stores, reducers, and dispatching actions
 *    - Subscribing to store changes
 *
 * 2. REDUX WITHOUT REDUX TOOLKIT (Lessons 311-318):
 *    - Manual reducer setup with if/else or switch statements
 *    - Creating action objects manually with type property
 *    - State immutability rules (never mutate!)
 *    - Copying state manually in every return statement
 *
 * WHY REDUX TOOLKIT IS RECOMMENDED (Lesson 326):
 * ==============================================
 * INSTRUCTOR QUOTE:
 * "Now Redux Toolkit is amazing and my strong recommendation is to use it
 * because as you saw throughout this course section, it's much easier to
 * manage your state and your reducers and your actions when using Toolkit
 * instead of having to set up everything on your own."
 *
 * WHY WE LEARNED WITHOUT REDUX TOOLKIT FIRST (Lesson 326):
 * ========================================================
 * INSTRUCTOR QUOTE:
 * "Still it's important to know what happens behind the scenes which is why
 * I did start without Redux Toolkit so that you really know everything about
 * Redux what you need to know and so that you're also able to dive into
 * projects that might not be using Redux Toolkit but just Redux."
 *
 * CORE REDUX CONCEPTS REVIEWED (Lesson 326):
 * ==========================================
 * INSTRUCTOR QUOTE:
 * "Now then you learn about these core Redux concepts and this Redux flow
 * you learned about actions and reducers or this one root reducer and about
 * the fact that Redux has this one central data store."
 *
 * THE REDUX FLOW:
 * ===============
 *
 *   Component                    Redux Store
 *   ---------                    -----------
 *       |                             |
 *       |  1. dispatch(action)        |
 *       | --------------------------> |
 *       |                             |
 *       |         2. Reducer receives action
 *       |            Returns new state
 *       |                             |
 *       |  3. useSelector reads       |
 *       |     updated state           |
 *       | <-------------------------- |
 *       |                             |
 *       |  4. Component re-renders    |
 *
 * CONFIGURESTORE RECAP (Lesson 326):
 * ==================================
 * INSTRUCTOR QUOTE:
 * "That we can create this store with configure store when using Redux Toolkit.
 * And that then as an argument, we pass in an object where we assign our route
 * reducer. We either point at just one reducer function, or we set up such a
 * map of reducers, which are then merged together into one big reducer behind
 * the scenes."
 *
 * Two ways to configure:
 *
 * // Single reducer:
 * configureStore({
 *   reducer: counterSlice.reducer
 * });
 *
 * // Reducer map (multiple slices):
 * configureStore({
 *   reducer: {
 *     counter: counterReducer,
 *     auth: authReducer,
 *   }
 * });
 *
 * USING REDUX DATA IN COMPONENTS (Lesson 326):
 * ============================================
 * INSTRUCTOR QUOTE:
 * "Now we also learned how we can then use our Redux managed data that we can
 * use useSelector in our components to read data from our Redux managed state
 * and that we can use useDispatch to get access to that dispatch function
 * which we use to dispatch our actions, which then ultimately leads to our
 * Redux state being changed."
 *
 * | Hook          | Purpose                              | Usage                        |
 * |---------------|--------------------------------------|------------------------------|
 * | useSelector   | Read state from store                | const val = useSelector(...) |
 * | useDispatch   | Get dispatch function                | const dispatch = useDispatch()|
 *
 * ACTION PAYLOADS (Lesson 326):
 * ============================
 * INSTRUCTOR QUOTE:
 * "We also learned that we can pass extra data to those actions because you
 * often have actions and reducer function there for which do need extra data."
 *
 * // Without payload:
 * dispatch(counterActions.increment())
 *
 * // With payload:
 * dispatch(counterActions.increase(10))  // 10 becomes action.payload
 *
 * CLASS-BASED COMPONENTS (Lesson 326):
 * ====================================
 * INSTRUCTOR QUOTE:
 * "We also learned how we would connect a class-based component to Redux.
 * We're not going to use that in this course and you might not see it too
 * often out there but on the other hand, there are a lot of projects which
 * still only use class based components. So that's definitely also something
 * you should be aware of."
 *
 * - Use connect() from react-redux instead of hooks
 * - mapStateToProps for reading state
 * - mapDispatchToProps for dispatching actions
 *
 * ============================================================================
 * REDUX VS REACT CONTEXT (Lesson 326)
 * ============================================================================
 *
 * REDUX IS NOT ALWAYS REQUIRED (Lesson 326):
 * ==========================================
 * INSTRUCTOR QUOTE:
 * "Redux is an amazing library. It can replace React context as you learned
 * but it's also not a must use library. It's always up to you to decide
 * whether for your project you want to go with React context, or if you
 * need Redux."
 *
 * WHEN REACT CONTEXT MIGHT BE ENOUGH (Lesson 326):
 * ================================================
 * INSTRUCTOR QUOTE:
 * "React context can have certain disadvantages as I mentioned, but they might
 * not matter in your project. You might not see or measure any performance
 * issues and you might not have a super complex setup and management. Then
 * of course, there's nothing wrong with sticking to React context."
 *
 * REDUX ADDS BUNDLE SIZE (Lesson 326):
 * ====================================
 * INSTRUCTOR QUOTE:
 * "Because you must not forget that if you use Redux, you do add an extra
 * third party library. And that of course adds up to the overall code of
 * your application. It makes your application bigger. So Redux is not
 * always better."
 *
 * DECISION GUIDE: REDUX VS CONTEXT
 * ================================
 *
 * | Factor                      | React Context      | Redux              |
 * |-----------------------------|--------------------|--------------------|
 * | Bundle size                 | None (built-in)    | Adds ~10-15KB      |
 * | Learning curve              | Lower              | Higher             |
 * | Boilerplate                 | Less               | More (but Toolkit helps) |
 * | DevTools                    | React DevTools     | Redux DevTools     |
 * | Performance (large state)   | Can have issues    | Optimized          |
 * | Middleware support          | Manual             | Built-in           |
 * | Complex state logic         | Harder             | Easier             |
 * | Time-travel debugging       | No                 | Yes                |
 *
 * WHEN TO CHOOSE REDUX:
 * =====================
 * - Large application with complex state
 * - Many state updates that need to be tracked
 * - Need for time-travel debugging
 * - Multiple developers working on state
 * - Lots of async operations with state
 * - Performance issues with Context
 *
 * WHEN CONTEXT IS FINE:
 * =====================
 * - Smaller to medium applications
 * - Simple state that doesn't change often
 * - Theme, locale, or auth state only
 * - No performance issues observed
 * - Want to minimize dependencies
 *
 * CONCLUSION (Lesson 326):
 * ========================
 * INSTRUCTOR QUOTE:
 * "It can be a decent option and now you know how it works and when you should
 * maybe consider it. Now we are going to work more with it throughout the
 * course but this is now a solid foundation which you need as a React developer."
 *
 * ============================================================================
 * COMPLETE SECTION REFERENCE (Lessons 311-326)
 * ============================================================================
 *
 * LESSON-BY-LESSON SUMMARY:
 * =========================
 *
 * 311 - Redux without React
 *       - createStore, reducers, dispatch, subscribe
 *       - Store folder and file setup
 *
 * 312 - Providing store to React
 *       - Provider component from react-redux
 *       - Wrapping App component
 *
 * 313 - Reading state with useSelector
 *       - Selector functions
 *       - Automatic subscriptions
 *
 * 314 - Dispatching actions with useDispatch
 *       - Getting dispatch function
 *       - Action objects with type property
 *
 * 315 - Class-based components with connect()
 *       - mapStateToProps, mapDispatchToProps
 *       - Higher-order component pattern
 *
 * 316 - Action payloads
 *       - Adding extra data to actions
 *       - Accessing payload in reducer
 *
 * 317 - Multiple state properties
 *       - Managing complex state
 *       - Multiple useSelector calls
 *
 * 318 - State immutability rules
 *       - Never mutate state directly
 *       - Always return new objects
 *
 * 319 - Redux challenges & intro to Toolkit
 *       - Problems with manual Redux
 *       - Why Redux Toolkit helps
 *
 * 320 - createSlice for slices
 *       - Slice configuration
 *       - Immer for immutable updates
 *
 * 321 - configureStore for store setup
 *       - Configuration object
 *       - Reducer property
 *
 * 322 - Auto-generated action creators
 *       - slice.actions
 *       - Exporting and using actions
 *
 * 323 - Multiple slices and reducer maps
 *       - Separation of concerns
 *       - State access changes
 *
 * 324 - Using auth state in components
 *       - Conditional rendering
 *       - Login/logout functionality
 *
 * 325 - Splitting code into separate files
 *       - One file per slice
 *       - Clean imports
 *
 * 326 - Section summary (THIS LESSON)
 *       - Redux Toolkit recommendation
 *       - Redux vs Context
 *       - When to use each
 *
 * KEY TAKEAWAYS:
 * ==============
 * 1. Redux provides centralized state management
 * 2. Redux Toolkit simplifies Redux significantly
 * 3. useSelector reads state, useDispatch dispatches actions
 * 4. Slices group related state and reducers together
 * 5. configureStore merges multiple reducers automatically
 * 6. Redux is powerful but not always necessary
 * 7. Choose based on your project's needs
 */
