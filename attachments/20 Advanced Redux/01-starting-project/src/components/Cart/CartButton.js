/**
 * ============================================================================
 * CART BUTTON COMPONENT - Toggle Cart Visibility (Lesson 329)
 * ============================================================================
 *
 * COMPONENT PURPOSE (Lesson 329):
 * ===============================
 * INSTRUCTOR QUOTE:
 * "So for example, in the layout component, in the layout folder, in the main
 * header component there, we got this Cart button, this Cart button which when
 * clicked, should show the cart area."
 *
 * INSTRUCTOR QUOTE:
 * "Now to make that work, we actually need to go to that Cart button component,
 * which we find in the cart folder, and then here we have our button."
 *
 * WHAT THIS COMPONENT DOES:
 * =========================
 * 1. Displays "My Cart" button in the header
 * 2. Shows badge with total quantity of items
 * 3. Dispatches toggle action when clicked to show/hide cart
 *
 * CONNECTING TO REDUX (Lesson 329):
 * =================================
 * This component demonstrates:
 * - Importing action creators from slice files
 * - Using useDispatch to get the dispatch function
 * - Using useSelector to read state (for the badge)
 * - Dispatching actions in event handlers
 */
import { useDispatch, useSelector } from 'react-redux';

/**
 * IMPORTING ACTIONS (Lesson 329):
 * ===============================
 * INSTRUCTOR QUOTE:
 * "And we can do this with help of the UI Actions, which we are exporting in
 * Cart button. We can import UI Actions as a named import because we export
 * it as a named export, imported from and then going up a level and another
 * level diving into store UI Slice. From there, I import the actions."
 *
 * Import path breakdown:
 * - ../ - Up from Cart folder to components
 * - ../ - Up from components to src
 * - store/ui-slice - Into store folder, ui-slice file
 */
import { uiActions } from '../../store/ui-slice';

import classes from './CartButton.module.css';

const CartButton = (props) => {
  /**
   * USING useDispatch (Lesson 329):
   * ===============================
   * INSTRUCTOR QUOTE:
   * "And to dispatch, we need access to the dispatch function. Now we do get
   * access to that by importing the useDispatch hook from React Redux, as
   * you learned. We can execute this hook in our component function and when
   * we do so, this will give us access to the dispatch function provided by
   * Redux."
   *
   * useDispatch() returns the store's dispatch function.
   * We use this to send actions to Redux.
   */
  const dispatch = useDispatch();

  /**
   * READING CART QUANTITY FROM REDUX:
   * =================================
   * We need to display the total number of items in the cart.
   * This comes from the cart slice, not the ui slice.
   *
   * State structure: state.cart.totalQuantity
   */
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  /**
   * TOGGLE HANDLER (Lesson 329):
   * ============================
   * INSTRUCTOR QUOTE:
   * "Now on that button, we now wanna add an on click listener to make sure
   * that we can do something when it's clicked. And I'll add a new function
   * in the Cart button component, the toggleCartHandler function, where I want
   * to dispatch the logic for toggling the cart, so for showing or hiding the
   * cart."
   *
   * INSTRUCTOR QUOTE:
   * "And for this, of course, we need to dispatch an action which triggers this
   * toggle method in our UI Slice reducers map. So in this a reducer functions
   * map to be precise."
   */
  const toggleCartHandler = () => {
    /**
     * DISPATCHING THE ACTION (Lesson 329):
     * ====================================
     * INSTRUCTOR QUOTE:
     * "And we can now use this dispatch function here inside of toggleCartHandler
     * and then simply dispatch the action which is created by the UI Actions,
     * toggle action creator."
     *
     * WHY EXECUTE toggle() AS A METHOD? (Lesson 329):
     * ===============================================
     * INSTRUCTOR QUOTE:
     * "We need to execute toggle as a method here because as you learned in the
     * last core section, these auto-generated actions which you get here, are
     * actually action creator methods, which you have to execute and when you
     * execute them, they return action objects. So it's then this returned
     * action object which we dispatch here."
     *
     * What happens:
     * 1. uiActions.toggle() creates: { type: 'ui/toggle' }
     * 2. dispatch() sends this action to Redux
     * 3. ui-slice's toggle reducer runs
     * 4. state.ui.cartIsVisible flips from false to true (or vice versa)
     * 5. Components using useSelector(state => state.ui.cartIsVisible) re-render
     */
    dispatch(uiActions.toggle());
  };

  return (
    /**
     * BINDING THE HANDLER (Lesson 329):
     * =================================
     * INSTRUCTOR QUOTE:
     * "For this I'll bind toggleCartHandler to the click."
     *
     * onClick={toggleCartHandler} triggers the handler when button is clicked.
     * The handler then dispatches the toggle action to Redux.
     */
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      {/**
       * CART BADGE:
       * ===========
       * Displays the total quantity from Redux state.
       * This updates automatically when items are added/removed
       * because useSelector subscribes to state changes.
       */}
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
