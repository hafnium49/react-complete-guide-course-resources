/**
 * ============================================================================
 * AUTH SLICE (Lesson 325 - Splitting Code)
 * ============================================================================
 *
 * WHY A SEPARATE AUTH FILE? (Lesson 325):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "Now we can do the same for off. So I'll add an off JS file and take my initial
 * off state and D off slice cut debt from the index JS file and move it into off JS."
 *
 * SEPARATION OF CONCERNS:
 * =======================
 * - counter.js handles all counter-related state
 * - auth.js handles all authentication-related state
 * - index.js brings them together in the store
 *
 * This separation makes it clear where to look for:
 * - Login/logout logic -> auth.js
 * - Counter logic -> counter.js
 * - Store configuration -> index.js
 *
 * BENEFITS IN LARGER APPLICATIONS (Lesson 325):
 * =============================================
 * INSTRUCTOR QUOTE:
 * "And in bigger application stat can ensure that our code stays maintainable
 * and is easier to manage because now we have a lean index JS file and then
 * pretty lean files for our different state slices which are then focused on
 * one specific type of state."
 *
 * Real-world example structure:
 * store/
 *   index.js         <- Store configuration only
 *   auth.js          <- Authentication state
 *   user.js          <- User profile state
 *   cart.js          <- Shopping cart state
 *   products.js      <- Product catalog state
 *   ui.js            <- UI state (modals, notifications)
 */
import { createSlice } from '@reduxjs/toolkit';

/**
 * IMPORTING createSlice (Lesson 325):
 * ===================================
 * INSTRUCTOR QUOTE:
 * "And then also import create slice here from add to Redux Toolkit."
 *
 * Each slice file independently imports what it needs from Redux Toolkit.
 */

/**
 * ============================================================================
 * INITIAL AUTH STATE
 * ============================================================================
 *
 * This was moved from index.js to keep all auth-related code together.
 *
 * Authentication state is app-wide state that matters to:
 * - Header (show/hide navigation, logout button)
 * - Auth component (show login form)
 * - UserProfile component (show user info)
 * - App component (conditional rendering)
 */
const initialAuthState = {
  isAuthenticated: false,
};

/**
 * ============================================================================
 * AUTH SLICE DEFINITION
 * ============================================================================
 *
 * All authentication-related reducers are defined here:
 * - login: Set isAuthenticated to true
 * - logout: Set isAuthenticated to false
 *
 * In a real application, this might include more:
 * - User info (name, email, avatar)
 * - Auth tokens
 * - Loading states
 * - Error messages
 */
const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

/**
 * ============================================================================
 * EXPORTING THE REDUCER (Lesson 325)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Do the same for off the JS just export the reducer year and an index JS.
 * Then therefore import the auth reducer from ./auth and assign this as a
 * value for the auth key in that reducer map."
 *
 * In index.js:
 *   import authReducer from './auth';
 *   // authReducer === authSlice.reducer
 *
 * The reducer is used in configureStore's reducer map:
 *   reducer: {
 *     counter: counterReducer,
 *     auth: authReducer,  // <-- This comes from auth.js
 *   }
 */
export default authSlice.reducer;

/**
 * ============================================================================
 * EXPORTING ACTION CREATORS (Lesson 325)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "At the same for auth I'll grab that export and index JS and move that into
 * auth JS."
 *
 * UPDATING COMPONENT IMPORTS (Lesson 325):
 * ========================================
 * INSTRUCTOR QUOTE:
 * "In auth JS, we need to import auth the actions from the auth file in the
 * store folder. In header, we need to import auth actions from the auth file
 * as well."
 *
 * Components that need authActions:
 * - Auth.js (for login)
 * - Header.js (for logout)
 *
 * OLD import:
 *   import { authActions } from '../store/index';
 *
 * NEW import:
 *   import { authActions } from '../store/auth';
 *
 * authActions contains:
 * - authActions.login()
 * - authActions.logout()
 */
export const authActions = authSlice.actions;
