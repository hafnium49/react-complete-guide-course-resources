/**
 * ============================================================================
 * APP COMPONENT - Root Component with Redux & Firebase Sync (Lessons 329, 335, 337, 338)
 * ============================================================================
 *
 * ============================================================================
 * USING ACTION CREATOR THUNKS (Lesson 338)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 338):
 * "Now before we start fetching data, let's have a look at the alternative,
 * of putting all that side effect logic into our component. That is perfectly
 * fine, but we learned that it's only one of the two options. The other option
 * would be the usage of an action creator."
 *
 * TWO APPROACHES FOR SIDE EFFECTS:
 * ================================
 * 1. useEffect in components (Lesson 337) - What we had before
 *    - Side effect logic lives in the component
 *    - Component dispatches multiple actions (pending, success, error)
 *    - Component handles the HTTP request directly
 *
 * 2. Action Creator Thunks (Lesson 338) - What we have now
 *    - Side effect logic lives in the Redux store file (cart-slice.js)
 *    - Component dispatches ONE action (the thunk)
 *    - The thunk handles HTTP request and dispatches notifications
 *
 * INSTRUCTOR QUOTE (Lesson 338):
 * "Why would we wanna use that pattern? Well, it's simply an alternative to
 * having that logic in your component. You can add that logic in your
 * components. You can stick to the approach we had before, but it's also not
 * a bad idea to keep your components lean, to not have too much logic in them."
 *
 * LEANER COMPONENT (Lesson 338):
 * =============================
 * INSTRUCTOR QUOTE:
 * "And at the moment, by moving that logic to this action creator function,
 * we did achieve this. This component is now leaner. It only dispatches one
 * action, not multiple actions. It doesn't care about sending the HTTP request,
 * and all the hard work, happens inside of our custom action creator function,
 * in our Redux files."
 *
 * BOTH APPROACHES ARE VALID (Lesson 338):
 * ======================================
 * INSTRUCTOR QUOTE:
 * "And splitting our code like this, could be considered good, because it keeps
 * our components lean. That does not mean that the other approach is bad. Both
 * options are viable and that's why I am showing both here."
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
 * 6. useEffect detects cart changed → dispatches sendCartData thunk
 * 7. Thunk sends PUT request to Firebase and handles notifications
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
 * IMPORTING THE THUNK ACTION CREATOR (Lesson 338):
 * ================================================
 * INSTRUCTOR QUOTE:
 * "Therefore I'll export it in cart slice, and then app JS can import. I'll
 * import, send cart data so that function which we just exported, from store
 * cart slice, from that file."
 *
 * NOTE: We no longer import uiActions here!
 * =========================================
 * INSTRUCTOR QUOTE (Lesson 338):
 * "I'll get rid of my UI actions import."
 *
 * The notification dispatching is now handled INSIDE the sendCartData thunk
 * in cart-slice.js. This component doesn't need to know about notifications!
 */
import { sendCartData } from './store/cart-slice';

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
 * KEEPING isInitial WITH THUNKS (Lesson 338):
 * ===========================================
 * INSTRUCTOR QUOTE:
 * "I actually will keep that isInitial code though, where I return and set
 * isInitial to false. I'll keep that."
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
 * INSTRUCTOR QUOTE (Lesson 337):
 * "So what I'll do here is I'll add a variable here, let isInitial = true.
 * And this will be initialized once when this file is parsed for the first
 * time when the app starts. And it's defined outside of the component
 * function so it won't be reinitialized when the component re-renders."
 *
 * WHY OUTSIDE THE COMPONENT:
 * ==========================
 * - Inside component: would reset to true on every re-render
 * - Outside component: persists across re-renders, only set once on file load
 */
let isInitial = true;

function App() {
  /**
   * USING useDispatch (Lesson 338):
   * ==============================
   * We still need dispatch to send the thunk action.
   * But now we only dispatch ONE action instead of multiple!
   *
   * BEFORE (Lesson 337):
   * - dispatch(uiActions.showNotification({ status: 'pending', ... }))
   * - dispatch(uiActions.showNotification({ status: 'success', ... }))
   * - dispatch(uiActions.showNotification({ status: 'error', ... }))
   *
   * AFTER (Lesson 338):
   * - dispatch(sendCartData(cart))  // That's it! One dispatch!
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
   *
   * NOTE: The thunk in cart-slice.js dispatches the notifications.
   * We just read the notification state here to render it.
   */
  const notification = useSelector((state) => state.ui.notification);

  /**
   * SELECTING THE CART FOR FIREBASE SYNC (Lesson 335):
   * ==================================================
   * INSTRUCTOR QUOTE (Lesson 335):
   * "We can, for example do it in the ProductItem.js file or in a totally
   * different file. Let's say in App.js as our root component. There we can
   * simply get hold of our overall cart by basically using useSelector and
   * listening to changes to our cart state."
   *
   * WHY useSelector WORKS FOR THIS:
   * ===============================
   * INSTRUCTOR QUOTE:
   * "Now, the great thing is that useSelector sets up a subscription to Redux.
   * So whenever our Redux store does change, this component function will be
   * re-executed and we will get to the latest state. So in this case, the
   * latest cart."
   */
  const cart = useSelector((state) => state.cart);

  /**
   * =========================================================================
   * useEffect WITH THUNK DISPATCH (Lessons 335, 337, 338)
   * =========================================================================
   *
   * CLEANED UP useEffect (Lesson 338):
   * ==================================
   * INSTRUCTOR QUOTE:
   * "Instead in app JS in there, I will clean up the content and useEffect.
   * I'll keep useEffect though but I'll clean up all the code in there."
   *
   * BEFORE (Lesson 337):
   * - Defined async sendCartData function inside useEffect
   * - Dispatched pending/success/error notifications manually
   * - Handled HTTP request and error catching here
   * - ~50 lines of code in useEffect
   *
   * AFTER (Lesson 338):
   * - Just dispatch the thunk!
   * - All the logic moved to cart-slice.js
   * - ~10 lines of code in useEffect
   *
   * DISPATCHING A THUNK (Lesson 338):
   * =================================
   * INSTRUCTOR QUOTE:
   * "And then here useEffect, I dispatch sent cart data, and I'll execute it
   * and pass my cart as an argument."
   *
   * INSTRUCTOR QUOTE:
   * "Now this might look weird. What we dispatched before, always were action
   * creators. So functions that return an action object with a type and so on.
   * Now in cart slice, we are instead dispatching a function that returns
   * another function."
   *
   * HOW REDUX HANDLES THE THUNK (Lesson 338):
   * =========================================
   * INSTRUCTOR QUOTE:
   * "But the great thing about Redux, when using Redux toolkit, is that it's
   * prepared for that. It does not just accept action objects with a type
   * property. Instead it also does accept, action creators that return functions.
   * And if it sees, that you're dispatching, a action which is actually a
   * function, instead of action object, it will execute that function for you."
   *
   * What happens when we dispatch(sendCartData(cart)):
   * 1. sendCartData(cart) returns an async function
   * 2. Redux sees it's a function, not an action object
   * 3. Redux executes that function and passes dispatch to it
   * 4. The function dispatches notifications and sends HTTP request
   * 5. Reducers receive the notification actions and update state
   */
  useEffect(() => {
    /**
     * isInitial CHECK - SKIP FIRST RUN (Lessons 337, 338):
     * ====================================================
     * INSTRUCTOR QUOTE (Lesson 338):
     * "I actually will keep that isInitial code though, where I return and set
     * isInitial to false. I'll keep that."
     *
     * THE FLOW:
     * =========
     * 1. First render: isInitial is true
     *    → Set isInitial to false
     *    → return early (don't send cart)
     * 2. Subsequent cart changes: isInitial is false
     *    → Skip this check
     *    → Dispatch sendCartData thunk → send to Firebase
     */
    if (isInitial) {
      isInitial = false;
      return;
    }

    /**
     * DISPATCH THE THUNK (Lesson 338):
     * ================================
     * INSTRUCTOR QUOTE:
     * "I wanna use send cart data as a action creator. So in app JS, I still
     * wanna dispatch, after this initial check, and I wanna dispatch, this
     * send cart data action so to say."
     *
     * INSTRUCTOR QUOTE:
     * "So dispatching this here will work. And when we dispatch, Redux will go
     * ahead, and it will execute this function for us. And therefore all our
     * other actions will be dispatched, and the HTTP request will be sent."
     *
     * This single line replaces all the async logic we had before!
     * The thunk in cart-slice.js handles:
     * - Dispatching pending notification
     * - Sending HTTP PUT request to Firebase
     * - Dispatching success notification
     * - Catching errors and dispatching error notification
     */
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);
  /**
   * DEPENDENCY ARRAY (Lessons 335, 337):
   * ===================================
   * [cart, dispatch] means:
   * - Run this effect on initial render (but isInitial check returns early)
   * - Re-run whenever `cart` reference changes
   * - `dispatch` is included because we use it in the effect
   *
   * Redux gives us a NEW cart object whenever state changes.
   * So this effect runs every time someone adds/removes items!
   *
   * TESTING (Lesson 338):
   * =====================
   * INSTRUCTOR QUOTE:
   * "So if you save all of that, if we reload here, if I add something to my
   * cart, it works just as before, that still works and firebase, the staff
   * were still being hit, and all the data, is still being stored in there.
   * That still works, because that is a supported pattern by Redux."
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
       * The notification state is set by the thunk in cart-slice.js.
       * We just read it here and render the Notification component.
       *
       * notification can be:
       * - null: Nothing renders (no notification bar)
       * - { status, title, message }: Notification bar shows at top
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
