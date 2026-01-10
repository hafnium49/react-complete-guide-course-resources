/**
 * ============================================================================
 * APP COMPONENT - Root Component with Redux & Firebase Sync (Lessons 329, 335, 337)
 * ============================================================================
 *
 * ============================================================================
 * ERROR HANDLING AND NOTIFICATIONS (Lesson 337)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 337):
 * "Now we need to make sure that we handle potential errors and that we also
 * show some feedback to the user whilst we are sending the data and when we're
 * done sending it. For this I prepared a notification component which you'll
 * find attached to this lecture."
 *
 * WHAT WE'LL ADD IN THIS LESSON:
 * ==============================
 * 1. Import Notification component
 * 2. Add dispatch for sending notification actions
 * 3. Make fetch async with proper error handling
 * 4. Add isInitial check to prevent empty cart on load
 * 5. Dispatch pending/success/error notifications
 *
 * ============================================================================
 * THE OPTIMAL SOLUTION: useEffect FOR SIDE EFFECTS (Lesson 335)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 335):
 * "Now one possible, better solution is actually totally obvious once you see
 * it. Instead of using this approach, which I implemented in the last lecture...
 * Instead of doing that we wanna stick to the approach from before. We wanna
 * dispatch the addItemToCart action and do all this heavy work inside of the
 * Reducer function."
 *
 * THE KEY INSIGHT - SWITCH THE ORDER (Lesson 335):
 * ================================================
 * INSTRUCTOR QUOTE:
 * "But if we now wanna sync our new state to the server, so if we wanna update
 * the server with that new state which we derived on the front end, we can
 * simply switch the order. We can first do the work on the front end and let
 * Redux update its store. And then in a second step thereafter we send the
 * request to the server."
 *
 * THE FLOW:
 * =========
 * 1. User clicks "Add to Cart" in ProductItem
 * 2. Component dispatches addItemToCart action
 * 3. Reducer transforms state (adds/updates item) ← Fat reducer, all logic here
 * 4. Redux store updates with new cart
 * 5. useSelector in App.js gets the NEW cart
 * 6. useEffect detects cart changed → sends PUT request to Firebase
 *
 * WHY THIS IS BETTER (Lesson 335):
 * ================================
 * INSTRUCTOR QUOTE:
 * "And that allows us to keep lean components, create a fat Reducer with all
 * the logic, and then perform any side effects that might depend on our Redux
 * state."
 *
 * Benefits:
 * ✓ Transformation logic stays in reducer (fat reducer)
 * ✓ Components stay lean (just dispatch actions)
 * ✓ Side effects happen AFTER Redux updates
 * ✓ No duplication of logic across components
 * ✓ Clear separation of concerns
 *
 * FIREBASE URL: https://react-13c13-default-rtdb.firebaseio.com/
 *
 * ============================================================================
 * CONDITIONAL CART RENDERING (Lesson 329)
 * ============================================================================
 *
 * USING REDUX STATE FOR CONDITIONAL RENDERING (Lesson 329):
 * =========================================================
 * INSTRUCTOR QUOTE:
 * "Now at the moment of course, if we have a look at UI Slice, we are then
 * changing cartIsVisible, but we're not taking advantage of that right now.
 * That's something we need to do. And for this, we should go to the app
 * component because that is where we render the cart. And I now want to
 * render it conditionally based on that UI Slice state value."
 *
 * COMPONENT STRUCTURE:
 * ====================
 * - Layout: Wraps the entire app (includes header)
 * - Notification: Shows at top when notification state exists (Lesson 337)
 * - Cart: Conditionally rendered based on ui.cartIsVisible
 * - Products: Always rendered (shows available products)
 */
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/**
 * IMPORTING NOTIFICATION COMPONENT (Lesson 337):
 * ==============================================
 * INSTRUCTOR QUOTE:
 * "For this I prepared a notification component which you'll find attached
 * to this lecture. I want you to add that to the UI subfolder inside of your
 * components folder."
 *
 * This component displays status messages at the top of the page:
 * - Blue (pending): "Sending cart data..."
 * - Green (success): "Success!"
 * - Red (error): "Error!"
 */
import Notification from './components/UI/Notification';

/**
 * IMPORTING UI ACTIONS (Lesson 337):
 * ==================================
 * INSTRUCTOR QUOTE:
 * "Instead, we can of course also use our UI slice here in App.js and add a
 * new reducer there, which I'll name showNotification. This should expect a
 * state and an action. And the idea is that with this reducer we can set our
 * notification."
 *
 * We import uiActions to dispatch showNotification with status/title/message.
 */
import { uiActions } from './store/ui-slice';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

/**
 * ============================================================================
 * isInitial FLAG - PREVENTING INITIAL EMPTY CART SEND (Lesson 337)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 337):
 * "We have a problem though. And the problem is that when our app is reloaded,
 * we also send the cart to the backend because the effect will also run when
 * the app starts since the component is rendered for the first time then. And
 * therefore we would send the initial, so the empty cart to the backend and
 * override any data stored there."
 *
 * THE PROBLEM:
 * ============
 * 1. App loads → component mounts
 * 2. useEffect runs (because cart is a dependency)
 * 3. cart is empty ({ items: [], totalQuantity: 0 })
 * 4. Empty cart is sent to Firebase → overwrites real data!
 *
 * THE SOLUTION:
 * =============
 * INSTRUCTOR QUOTE:
 * "So what I'll do here is I'll add a variable here, let isInitial = true.
 * And this will be initialized once when this file is parsed for the first
 * time when the app starts. And it's defined outside of the component
 * function so it won't be reinitialized when the component re-renders."
 *
 * WHY OUTSIDE THE COMPONENT (Lesson 337):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "It won't be reinitialized whenever this component function runs again.
 * So this is not created new for every render cycle. And that's important
 * because it allows us to use this inside of that effect and check if
 * isInitial is true."
 *
 * - Inside component: would reset to true on every re-render
 * - Outside component: persists across re-renders, only set once on file load
 */
let isInitial = true;

function App() {
  /**
   * USING useDispatch (Lesson 337):
   * ==============================
   * INSTRUCTOR QUOTE:
   * "Now here we need useDispatch. So let's import that from react-redux
   * and store the dispatch function in a constant."
   *
   * We need dispatch to send showNotification actions for:
   * - Pending state (before fetch)
   * - Success state (after fetch succeeds)
   * - Error state (if fetch fails)
   */
  const dispatch = useDispatch();

  /**
   * USING useSelector TO READ REDUX STATE (Lesson 329):
   * ===================================================
   * INSTRUCTOR QUOTE:
   * "So it receives the current state automatically and we should return
   * the data which we wanna use in this component. And in this case, that
   * is this cartIsVisible property value."
   */
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  /**
   * SELECTING NOTIFICATION STATE (Lesson 337):
   * ==========================================
   * INSTRUCTOR QUOTE:
   * "We should also get hold of the notification which might have been set.
   * And for that, I'll add another const here, notification. And I'll again
   * use useSelector to get state.ui.notification."
   *
   * notification will be:
   * - null: No notification to show
   * - { status, title, message }: Show notification with these props
   */
  const notification = useSelector((state) => state.ui.notification);

  /**
   * =========================================================================
   * SELECTING THE CART FOR FIREBASE SYNC (Lesson 335)
   * =========================================================================
   *
   * INSTRUCTOR QUOTE (Lesson 335):
   * "We can, for example do it in the ProductItem.js file or in a totally
   * different file. Let's say in App.js as our root component. There we can
   * simply get hold of our overall cart by basically using useSelector and
   * listening to changes to our cart state."
   *
   * INSTRUCTOR QUOTE:
   * "I'll use useSelector, which we're already importing, to get hold of my
   * overall cart and then I'll store it in that constant like this."
   *
   * WHY useSelector WORKS FOR THIS (Lesson 335):
   * ============================================
   * INSTRUCTOR QUOTE:
   * "Now, the great thing is that useSelector sets up a subscription to Redux.
   * So whenever our Redux store does change, this component function will be
   * re-executed and we will get to the latest state. So in this case, the
   * latest cart."
   *
   * The subscription chain:
   * 1. Redux store updates → 2. useSelector triggers re-render →
   * 3. We get new cart value → 4. useEffect runs with new cart
   */
  const cart = useSelector((state) => state.cart);

  /**
   * =========================================================================
   * useEffect FOR SENDING HTTP REQUESTS WITH ERROR HANDLING (Lessons 335, 337)
   * =========================================================================
   *
   * INSTRUCTOR QUOTE (Lesson 335):
   * "And now we can use useEffect which we import from React to watch for
   * changes in our cart state, because you learned that useEffect allows you
   * to run side effects. So it sounds like a good choice here, and it allows
   * you to run an effect whenever some dependency changes."
   *
   * WHY useEffect IS PERFECT HERE:
   * ==============================
   * 1. Side effects (HTTP requests) belong in useEffect, not reducers
   * 2. useEffect runs AFTER render, so Redux has already updated
   * 3. Dependency array lets us run effect only when cart changes
   * 4. We can use the TRANSFORMED cart data from Redux
   *
   * INSTRUCTOR QUOTE:
   * "So that means that effect will also be re-evaluated and it will re-execute
   * if our cart did change and that is exactly what we need."
   */
  useEffect(() => {
    /**
     * DEFINING ASYNC FUNCTION INSIDE useEffect (Lesson 337):
     * =====================================================
     * INSTRUCTOR QUOTE:
     * "Now we could add async here and use await down there, but that is not
     * allowed. You can't turn this effect function into an async function.
     * Instead, if you wanna use async await, which I wanna do, you need to
     * create a new function inside of that effect function."
     *
     * WHY CAN'T useEffect BE async?
     * =============================
     * - useEffect callback can return a cleanup function (or nothing)
     * - async functions always return a Promise
     * - React expects undefined or a cleanup function, not a Promise
     *
     * THE PATTERN:
     * ============
     * 1. Define async function inside useEffect
     * 2. Call that function immediately
     * 3. Use .catch() for error handling after the call
     */
    const sendCartData = async () => {
      /**
       * DISPATCH PENDING NOTIFICATION (Lesson 337):
       * ===========================================
       * INSTRUCTOR QUOTE:
       * "Dispatch here, UI actions show notification. And then there pass an
       * object with a status of, let's say, pending. A title of sending, and
       * a message of sending cart data, maybe something like this."
       *
       * This notification shows BEFORE the fetch request starts.
       * User sees: Blue bar with "Sending..." and "Sending cart data..."
       */
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!',
        })
      );

      /**
       * SENDING HTTP REQUEST TO FIREBASE (Lessons 335, 337):
       * ====================================================
       * INSTRUCTOR QUOTE (Lesson 335):
       * "Now, inside of the Effect function, I wanna send a Http request with
       * the Fetch API, let's say and I wanna send it to Firebase. So we grab
       * that URL from Firebase, add that here and maybe target a cart.json node."
       *
       * FIREBASE URL STRUCTURE:
       * =======================
       * https://react-13c13-default-rtdb.firebaseio.com/cart.json
       *
       * - Base URL: https://react-13c13-default-rtdb.firebaseio.com/
       * - /cart: Creates a "cart" node in the database
       * - .json: Firebase-specific extension (required!)
       *
       * INSTRUCTOR QUOTE:
       * "The .json is Firebase specific. This will create a new cart Node in the
       * database and then store the data there."
       *
       * WHY PUT INSTEAD OF POST? (Lesson 335):
       * =====================================
       * INSTRUCTOR QUOTE:
       * "And we wanna send a POST request because that will tell Firebase to
       * store new data or to be precise, actually here, I wanna send a PUT
       * request. That's also allowed by Firebase."
       *
       * INSTRUCTOR QUOTE:
       * "And if we send a PUT request we also do store data on Firebase. But
       * the difference to POST is that the new data will not be added in a list
       * of data so to say, but that it will override existing data. So when
       * sending a PUT request, we will override the existing cart with the
       * incoming data and that's exactly what we want here."
       *
       * POST vs PUT:
       * - POST: Adds new data to a list (Firebase generates unique IDs)
       * - PUT: Overwrites existing data at that path (what we want!)
       *
       * We want to REPLACE the cart each time, not add to a list of carts.
       */
      const response = await fetch(
        'https://react-13c13-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          /**
           * SENDING THE CART DATA (Lesson 335):
           * ===================================
           * INSTRUCTOR QUOTE:
           * "And then set our request body to JSON.stringify. And now here, I
           * wanna send my cart. So this cart, which I get from Redux, I convert
           * this to JSON data and send it as part of the request."
           *
           * What gets sent to Firebase:
           * {
           *   "items": [
           *     { "id": "p1", "name": "My First Book", "price": 6, "quantity": 2, "totalPrice": 12 }
           *   ],
           *   "totalQuantity": 2
           * }
           *
           * This is the TRANSFORMED cart data - all the logic has already been
           * done by the reducer! We're just syncing the result to the backend.
           */
          body: JSON.stringify(cart),
        }
      );

      /**
       * CHECKING FOR HTTP ERRORS (Lesson 337):
       * =====================================
       * INSTRUCTOR QUOTE:
       * "Now here I wanna check if response.ok, whether this is okay, and if
       * it's not okay, I wanna throw a new error, 'Sending cart data failed.'"
       *
       * response.ok is:
       * - true: Status code 200-299
       * - false: Status code 400+
       *
       * By throwing an error, we trigger the .catch() block below.
       */
      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }

      /**
       * DISPATCH SUCCESS NOTIFICATION (Lesson 337):
       * ==========================================
       * INSTRUCTOR QUOTE:
       * "And then only if we make it past this check here, I wanna dispatch
       * a success message. Status success, title, success, and message sent
       * cart data successfully, for example."
       *
       * This notification shows AFTER the fetch succeeds.
       * User sees: Green/teal bar with "Success!" and "Sent cart data successfully!"
       */
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    };

    /**
     * isInitial CHECK - SKIP FIRST RUN (Lesson 337):
     * ==============================================
     * INSTRUCTOR QUOTE:
     * "And then inside of the effect after we are done with this sendCartData
     * function, I'll check if isInitial is true. And if that's the case, I will
     * set isInitial to false and return so that we don't continue with the code
     * that will come after this if check here."
     *
     * THE FLOW:
     * =========
     * 1. First render: isInitial is true
     *    → Set isInitial to false
     *    → return early (don't send cart)
     * 2. Subsequent cart changes: isInitial is false
     *    → Skip this check
     *    → Call sendCartData() → send to Firebase
     *
     * WHY THIS WORKS (Lesson 337):
     * ===========================
     * INSTRUCTOR QUOTE:
     * "And that will ensure that this sendCartData function, which I have here,
     * doesn't execute when the app started but only thereafter when the cart
     * really changed because the user did change it."
     */
    if (isInitial) {
      isInitial = false;
      return;
    }

    /**
     * CALLING THE ASYNC FUNCTION WITH ERROR HANDLING (Lesson 337):
     * ============================================================
     * INSTRUCTOR QUOTE:
     * "And then call this function here at the end of this useEffect function.
     * And then we can also chain catch onto this to catch any errors that might
     * be thrown inside of that function."
     *
     * WHY .catch() INSTEAD OF try/catch?
     * ==================================
     * Since sendCartData() returns a Promise (it's async), we can use .catch()
     * to handle any errors that occur during execution. This includes:
     * - Network errors (fetch failed)
     * - HTTP errors (response.ok is false → we throw)
     * - Any other runtime errors inside the function
     */
    sendCartData().catch((error) => {
      /**
       * DISPATCH ERROR NOTIFICATION (Lesson 337):
       * =========================================
       * INSTRUCTOR QUOTE:
       * "Dispatch UI actions.showNotification and show an error notification.
       * So status could be error. Title could also be Error! with an
       * exclamation mark. And the message could be 'Sending cart data failed!'"
       *
       * This notification shows when fetch fails.
       * User sees: Dark red bar with "Error!" and "Sending cart data failed!"
       */
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    });
  }, [cart, dispatch]);
  /**
   * DEPENDENCY ARRAY EXPLAINED (Lessons 335, 337):
   * ==============================================
   * INSTRUCTOR QUOTE (Lesson 335):
   * "Now, since we're using cart in here we should add it as a dependency to
   * useEffect so that this Effect function re-executes whenever our cart
   * changes, which is exactly what we want."
   *
   * [cart, dispatch] means:
   * - Run this effect on initial render
   * - Re-run whenever `cart` reference changes
   * - `dispatch` is included because we use it in the effect
   *   (technically stable, but good practice to include)
   *
   * Redux gives us a NEW cart object whenever state changes.
   * So this effect runs every time someone adds/removes items!
   *
   * THE COMPLETE FLOW (Lesson 335):
   * ===============================
   * INSTRUCTOR QUOTE:
   * "So with this simple addition here we will send this Http request whenever
   * our cart changes and we can keep our logic for updating the cart inside
   * of the reducer, because we simply switched the order. We first update our
   * Redux store and we're done with that. And then we select the updated store
   * to send the request."
   *
   * TESTING (Lesson 335):
   * =====================
   * INSTRUCTOR QUOTE:
   * "If I add something to my cart, you see a Http request is sent and that
   * happens whenever I update my cart. And if we go to Firebase, we therefore
   * see the cart's there. And we see that here we have the correct cart
   * reflected."
   */

  return (
    /**
     * USING FRAGMENT FOR MULTIPLE ROOT ELEMENTS (Lesson 337):
     * =======================================================
     * INSTRUCTOR QUOTE:
     * "And then here in App.js, I wanna output this notification component.
     * And I wanna output it above the layout component. So for this, here in
     * the JSX code, I'll add a fragment as a wrapper."
     *
     * WHY FRAGMENT?
     * =============
     * - React components must return a single root element
     * - We need both Notification and Layout at the top level
     * - Fragment (<Fragment> or <>) groups elements without adding DOM nodes
     * - This keeps the HTML structure clean
     */
    <Fragment>
      {/**
       * CONDITIONAL NOTIFICATION RENDERING (Lesson 337):
       * ================================================
       * INSTRUCTOR QUOTE:
       * "I'll check if we have a notification and if we do, I'll render the
       * notification component. And I need to import notification from
       * components UI notification."
       *
       * INSTRUCTOR QUOTE:
       * "And then I forward status, and that's notification.status, title
       * notification.title, and message notification.message."
       *
       * notification can be:
       * - null: Nothing renders (no notification bar)
       * - { status, title, message }: Notification bar shows at top
       *
       * Pattern: {notification && <Notification ... />}
       * - If notification is null: renders nothing (short-circuit)
       * - If notification exists: renders Notification with props
       */}
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {/**
         * CONDITIONAL RENDERING (Lesson 329):
         * ===================================
         * Pattern: {showCart && <Cart />}
         * - If showCart is true: renders Cart component
         * - If showCart is false: renders nothing (short-circuit)
         */}
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
