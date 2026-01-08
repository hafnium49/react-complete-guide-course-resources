/**
 * ============================================================================
 * COUNTER SLICE (Lesson 325 - Splitting Code)
 * ============================================================================
 *
 * WHY SPLIT INTO SEPARATE FILES? (Lesson 325):
 * ============================================
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
 * FILE ORGANIZATION PATTERNS:
 * ===========================
 * | Pattern               | Structure                     | Best For           |
 * |-----------------------|-------------------------------|---------------------|
 * | Single file           | store/index.js                | Tiny apps           |
 * | File per slice        | store/counter.js, auth.js     | Most applications   |
 * | Feature folders       | features/counter/counterSlice | Large applications  |
 *
 * FILE NAMING (Lesson 325):
 * =========================
 * INSTRUCTOR QUOTE:
 * "So we could add a new file in the store folder and let's say the counter-slice.JS
 * file or just counter.JS, the file name is up to you."
 *
 * Common naming conventions:
 * - counter.js (simple, what we're using)
 * - counterSlice.js (more explicit)
 * - counter-slice.js (kebab-case)
 *
 * WHAT GOES IN THIS FILE (Lesson 325):
 * ====================================
 * INSTRUCTOR QUOTE:
 * "And then we want to create and manage the counter specific state and slice in there.
 * So we would grab the initial counter state and the entire counter slice cut that
 * and add it into counter JS file."
 *
 * This file contains:
 * - Initial counter state (initialCounterState)
 * - Counter slice definition (counterSlice)
 * - Counter reducer export (default export)
 * - Counter actions export (named export)
 */
import { createSlice } from '@reduxjs/toolkit';

/**
 * IMPORTING createSlice (Lesson 325):
 * ===================================
 * INSTRUCTOR QUOTE:
 * "Now to use, create slice. We of course now need to import that here.
 * So we import create slice from at Redux JS toolkit."
 *
 * Each slice file needs its own createSlice import since slices
 * are now defined in separate files.
 */

/**
 * ============================================================================
 * INITIAL COUNTER STATE
 * ============================================================================
 *
 * This was moved from index.js to keep all counter-related code together.
 *
 * INSTRUCTOR QUOTE:
 * "So we would grab the initial counter state and the entire counter slice
 * cut that and add it into counter JS file."
 */
const initialCounterState = {
  counter: 0,
  showCounter: true,
};

/**
 * ============================================================================
 * COUNTER SLICE DEFINITION
 * ============================================================================
 *
 * All counter-related reducers are defined here:
 * - increment: Add 1 to counter
 * - decrement: Subtract 1 from counter
 * - increase: Add payload amount to counter
 * - toggleCounter: Toggle visibility
 *
 * BENEFITS OF SEPARATE FILES:
 * ===========================
 * 1. Focused code - only counter logic in this file
 * 2. Easier to find and modify counter-related code
 * 3. Better for team collaboration (less merge conflicts)
 * 4. Cleaner imports in components
 */
const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

/**
 * ============================================================================
 * EXPORTING THE REDUCER (Lesson 325)
 * ============================================================================
 *
 * WHAT TO EXPORT? (Lesson 325):
 * ============================
 * INSTRUCTOR QUOTE:
 * "Hence we can now import the counter slice from ./counter, or since we only
 * really needed to reducer in here, we actually go to the counter and we just
 * export the reducer. So we don't export the entire slice but just it's reducer
 * part."
 *
 * WHY EXPORT JUST THE REDUCER?
 * ============================
 * - index.js only needs the reducer to configure the store
 * - Actions are exported separately for components
 * - Keeps imports clean and focused
 *
 * INSTRUCTOR QUOTE:
 * "By doing that in index JS we could import the counter reducer here since
 * that is what we're exporting as a default."
 *
 * In index.js:
 *   import counterReducer from './counter';
 *   // counterReducer === counterSlice.reducer
 */
export default counterSlice.reducer;

/**
 * ============================================================================
 * EXPORTING ACTION CREATORS (Lesson 325)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now regarding the actions, I want to export those from there, from the files
 * into which they belong. So the counter actions should be exported here in the
 * counter JS file still by accessing dot actions and exporting that as a named export."
 *
 * WHY EXPORT FROM SLICE FILES?
 * ============================
 * - Keeps related code together (state + reducers + actions)
 * - Components import from the specific slice they need
 * - Clear ownership of actions
 *
 * UPDATING COMPONENT IMPORTS (Lesson 325):
 * ========================================
 * INSTRUCTOR QUOTE:
 * "Now with that, if we saved this we'll need to fix a couple of imports in
 * counter JS for example, where I try to import counter actions from the index
 * file we now need to import them from the counter file in the store folder."
 *
 * OLD import in Counter.js:
 *   import { counterActions } from '../store/index';
 *
 * NEW import in Counter.js:
 *   import { counterActions } from '../store/counter';
 *
 * counterActions contains:
 * - counterActions.increment()
 * - counterActions.decrement()
 * - counterActions.increase(payload)
 * - counterActions.toggleCounter()
 */
export const counterActions = counterSlice.actions;
