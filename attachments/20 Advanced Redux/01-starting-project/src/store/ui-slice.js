/**
 * ============================================================================
 * UI SLICE - User Interface State Management (Lesson 329)
 * ============================================================================
 *
 * SECTION 20: ADVANCED REDUX - INTRODUCTION
 * =========================================
 * This section builds on Section 19 (Redux Basics) and focuses on:
 * - Practical Redux implementation in a shopping cart application
 * - Managing multiple state slices (UI state + cart state)
 * - Handling side effects and asynchronous code with Redux (upcoming lessons)
 *
 * WHY A SEPARATE UI SLICE? (Lesson 329):
 * ======================================
 * INSTRUCTOR QUOTE:
 * "I also wanna create multiple slices, one slice for managing the cart and
 * one slice for user interface logic like toggling the cart, which should go
 * into its own slice here."
 *
 * SEPARATION OF CONCERNS:
 * =======================
 * | Slice      | Responsibility                    | State Properties        |
 * |------------|-----------------------------------|-------------------------|
 * | ui-slice   | UI state (visibility, modals)     | cartIsVisible           |
 * | cart-slice | Business data (cart items)        | items, totalQuantity    |
 *
 * INSTRUCTOR QUOTE:
 * "That's not a must do, you could put it all into one code file, but splitting
 * it up ensures that all the code stays maintainable and manageable and we
 * don't end up with super large code files."
 *
 * WHAT THIS SLICE MANAGES:
 * ========================
 * - Whether the cart is visible or hidden
 * - Could be extended for: notifications, loading states, modal visibility, etc.
 *
 * THE FEATURE WE'RE BUILDING (Lesson 329):
 * ========================================
 * INSTRUCTOR QUOTE:
 * "I wanna ensure that if we click the My Cart button, we toggle this cart,
 * so we show it. And if it is already showing up, we hide it."
 */

import { createSlice } from '@reduxjs/toolkit';

/**
 * ============================================================================
 * CREATING THE UI SLICE (Lesson 329)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "For this in the UI Slice JS file, I'll import something from @reduxjs/toolkit.
 * And that something as you learned, is to create slice function which does
 * what the name implies. When we call it, it creates a slice."
 *
 * SLICE CONFIGURATION (Lesson 329):
 * =================================
 * INSTRUCTOR QUOTE:
 * "And you learned that it needs to object for a configuration where we give
 * this slice a unique name and here I'll choose UI as a name, but of course
 * the name is up to you."
 */
const uiSlice = createSlice({
  /**
   * SLICE NAME (Lesson 329):
   * ========================
   * INSTRUCTOR QUOTE:
   * "We give this slice a unique name and here I'll choose UI as a name,
   * but of course the name is up to you."
   *
   * The name is used to generate action types automatically:
   * - 'ui/toggle' for the toggle action
   */
  name: 'ui',

  /**
   * INITIAL STATE (Lesson 329):
   * ===========================
   * INSTRUCTOR QUOTE:
   * "Then in addition we wanna set up some initial state and we can create
   * a separate constant for this, or do it here on the fly and I'll do the
   * ladder and my initial state is that the cartIsVisible property is false."
   *
   * INSTRUCTOR QUOTE:
   * "That will be the property which controls whether the cart is visible
   * or not, as you can probably guess by its name."
   *
   * Starting with cart hidden - user must click "My Cart" to see it.
   */
  initialState: {
    cartIsVisible: false,
  },

  /**
   * REDUCERS (Lesson 329):
   * ======================
   * INSTRUCTOR QUOTE:
   * "Then we need the reducers key, which is a map of all the reducers or
   * to be precise it's a map of methods that represent all the different
   * cases, the different actions we wanna handle with that reducer."
   *
   * INSTRUCTOR QUOTE:
   * "And here, I actually only need one method. Let's say the toggle method,
   * which receives the old state and where I then wanna set state.cartIsVisible
   * to the opposite of what it was."
   */
  reducers: {
    /**
     * TOGGLE REDUCER (Lesson 329):
     * ============================
     * Toggles the cart visibility between true and false.
     *
     * MUTATING CODE IS SAFE WITH REDUX TOOLKIT (Lesson 329):
     * =====================================================
     * INSTRUCTOR QUOTE:
     * "And we can write this mutating code here because you learned that when
     * using Redux Toolkit, we are not really mutating the state, even though
     * it looks like we do, but instead Redux Toolkit will kind of capture
     * this code and use another third party library immer to ensure that this
     * is actually translated to some immutable code which creates a new state
     * object instead of manipulating the existing one."
     *
     * Without Redux Toolkit, you'd have to write:
     *   return { ...state, cartIsVisible: !state.cartIsVisible };
     *
     * With Redux Toolkit:
     *   state.cartIsVisible = !state.cartIsVisible;
     *   // Immer handles immutability behind the scenes!
     */
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

/**
 * ============================================================================
 * EXPORTING THE SLICE AND ACTIONS (Lesson 329)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now I'll store it in a constant UI Slice and then export this as a default
 * here. And actually that's not all I wanna export, I also wanna export the
 * actions, so I'll create a new constant which I export, the UI Actions, which
 * we get by accessing uislice.actions."
 *
 * TWO EXPORTS FROM THIS FILE:
 * ===========================
 * 1. uiSlice (default) - Used in store/index.js for configureStore
 * 2. uiActions (named) - Used in components to dispatch actions
 *
 * HOW uiActions WORKS:
 * ====================
 * uiActions.toggle() returns an action object:
 * { type: 'ui/toggle' }
 *
 * This is an auto-generated action creator - no manual action objects needed!
 */
export const uiActions = uiSlice.actions;

export default uiSlice;
