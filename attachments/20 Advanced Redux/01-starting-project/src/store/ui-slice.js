/**
 * ============================================================================
 * UI SLICE - User Interface State Management (Lessons 329, 337)
 * ============================================================================
 *
 * SECTION 20: ADVANCED REDUX - INTRODUCTION
 * =========================================
 * This section builds on Section 19 (Redux Basics) and focuses on:
 * - Practical Redux implementation in a shopping cart application
 * - Managing multiple state slices (UI state + cart state)
 * - Handling side effects and asynchronous code with Redux
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
 * | Slice      | Responsibility                    | State Properties           |
 * |------------|-----------------------------------|----------------------------|
 * | ui-slice   | UI state (visibility, modals)     | cartIsVisible, notification|
 * | cart-slice | Business data (cart items)        | items, totalQuantity       |
 *
 * ============================================================================
 * NOTIFICATION STATE (Lesson 337)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 337):
 * "Now for this we could import use state and set up some local state in this
 * component, some is loading state and maybe an error state... We could do all
 * of that, there would be nothing wrong with that and it would be a good way
 * of handling this. But since we already have a UI slice here in Redux why not
 * use that? Why don't we add more to the state we're managing here with Redux
 * and we managed the notification, which we're showing with help of Redux now."
 *
 * WHY USE REDUX FOR NOTIFICATIONS?
 * ================================
 * Option 1: Local state (useState) - Fine for simple cases
 * Option 2: Redux state - Better when:
 *   - Multiple components need to trigger notifications
 *   - You want centralized notification management
 *   - The notification is tied to global async operations
 *
 * WHAT THIS SLICE NOW MANAGES:
 * ============================
 * - cartIsVisible: Whether the cart panel is shown
 * - notification: Current notification to display (or null)
 */

import { createSlice } from '@reduxjs/toolkit';

/**
 * ============================================================================
 * CREATING THE UI SLICE (Lessons 329, 337)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 329):
 * "For this in the UI Slice JS file, I'll import something from @reduxjs/toolkit.
 * And that something as you learned, is to create slice function which does
 * what the name implies. When we call it, it creates a slice."
 */
const uiSlice = createSlice({
  name: 'ui',

  /**
   * INITIAL STATE (Lessons 329, 337):
   * =================================
   * INSTRUCTOR QUOTE (Lesson 329):
   * "My initial state is that the cartIsVisible property is false."
   *
   * INSTRUCTOR QUOTE (Lesson 337):
   * "For this I'll add a notification property to initial state and I'll set
   * it to null initially, so that initially we have no notification."
   */
  initialState: {
    cartIsVisible: false,
    /**
     * NOTIFICATION STATE STRUCTURE (Lesson 337):
     * ==========================================
     * When null: No notification shown
     * When set: { status: 'pending'|'success'|'error', title: string, message: string }
     *
     * Examples:
     * - { status: 'pending', title: 'Sending...', message: 'Sending cart data' }
     * - { status: 'success', title: 'Success!', message: 'Sent cart data successfully' }
     * - { status: 'error', title: 'Error!', message: 'Sending cart data failed' }
     */
    notification: null,
  },

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
     * is actually translated to some immutable code."
     */
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },

    /**
     * =========================================================================
     * SHOW NOTIFICATION REDUCER (Lesson 337)
     * =========================================================================
     *
     * INSTRUCTOR QUOTE (Lesson 337):
     * "But then we can add a new reducer which we could call set notification
     * or show notification maybe, where we get our state and where we also use
     * the action because I expect some action payload here because the kind of
     * notification that should be shown should be encoded in the action as a
     * payload."
     *
     * PAYLOAD STRUCTURE:
     * ==================
     * action.payload = {
     *   status: 'pending' | 'success' | 'error',
     *   title: string,
     *   message: string
     * }
     *
     * INSTRUCTOR QUOTE:
     * "And we then therefore set state notification equal to an object let's say...
     * where I have a status key which I expect to get from my action payload.
     * Let's say there, we also expect the status property and status could be
     * something like pending, error and success. And then we also expect a title
     * let's say which we also get from the action payload and a message which
     * we all know I expect as a property on the action payload."
     *
     * USAGE IN App.js (Lesson 337):
     * ============================
     * // Pending state (when starting to send)
     * dispatch(uiActions.showNotification({
     *   status: 'pending',
     *   title: 'Sending...',
     *   message: 'Sending cart data'
     * }));
     *
     * // Success state (when done)
     * dispatch(uiActions.showNotification({
     *   status: 'success',
     *   title: 'Success!',
     *   message: 'Sent cart data successfully'
     * }));
     *
     * // Error state (when failed)
     * dispatch(uiActions.showNotification({
     *   status: 'error',
     *   title: 'Error!',
     *   message: 'Sending cart data failed'
     * }));
     */
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

/**
 * ============================================================================
 * EXPORTING THE SLICE AND ACTIONS (Lessons 329, 337)
 * ============================================================================
 *
 * TWO EXPORTS FROM THIS FILE:
 * ===========================
 * 1. uiSlice (default) - Used in store/index.js for configureStore
 * 2. uiActions (named) - Used in components to dispatch actions
 *
 * AVAILABLE ACTIONS:
 * ==================
 * - uiActions.toggle() - Toggle cart visibility
 * - uiActions.showNotification(payload) - Show a notification
 *
 * HOW uiActions WORKS:
 * ====================
 * uiActions.toggle() returns: { type: 'ui/toggle' }
 * uiActions.showNotification({...}) returns: { type: 'ui/showNotification', payload: {...} }
 */
export const uiActions = uiSlice.actions;

export default uiSlice;
