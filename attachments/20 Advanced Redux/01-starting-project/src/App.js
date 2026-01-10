/**
 * ============================================================================
 * APP COMPONENT - Root Component with Redux & Firebase Sync (Lessons 329, 335)
 * ============================================================================
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
 * - Cart: Conditionally rendered based on ui.cartIsVisible
 * - Products: Always rendered (shows available products)
 */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
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
   * useEffect FOR SENDING HTTP REQUESTS (Lesson 335)
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
     * SENDING HTTP REQUEST TO FIREBASE (Lesson 335):
     * ===============================================
     * INSTRUCTOR QUOTE:
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
    fetch('https://react-13c13-default-rtdb.firebaseio.com/cart.json', {
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
    });
  }, [cart]);
  /**
   * DEPENDENCY ARRAY EXPLAINED (Lesson 335):
   * ========================================
   * INSTRUCTOR QUOTE:
   * "Now, since we're using cart in here we should add it as a dependency to
   * useEffect so that this Effect function re-executes whenever our cart
   * changes, which is exactly what we want."
   *
   * [cart] means:
   * - Run this effect on initial render
   * - Re-run whenever `cart` reference changes
   * - Redux gives us a NEW cart object whenever state changes
   * - So this effect runs every time someone adds/removes items!
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
  );
}

export default App;
