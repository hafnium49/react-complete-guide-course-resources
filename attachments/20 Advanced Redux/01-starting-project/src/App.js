/**
 * ============================================================================
 * APP COMPONENT - Conditional Cart Rendering (Lesson 329)
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
 * EXTRACTING DATA FROM REDUX (Lesson 329):
 * ========================================
 * INSTRUCTOR QUOTE:
 * "So for that inside of app component, we need to extract data from Redux.
 * And we do that with another hook which we import from React Redux. It's
 * the use selector hook as you learned."
 *
 * COMPONENT STRUCTURE:
 * ====================
 * - Layout: Wraps the entire app (includes header)
 * - Cart: Conditionally rendered based on ui.cartIsVisible
 * - Products: Always rendered (shows available products)
 */
import { useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  /**
   * USING useSelector TO READ REDUX STATE (Lesson 329):
   * ===================================================
   * INSTRUCTOR QUOTE:
   * "We can import use selector and then execute that in our app component
   * function, use selector like this, not use effect. We execute this and
   * then you learned that to use selector, we need to pass a function which
   * receives the Redux state automatically because this function which we
   * pass to use selector will be executed by React Redux."
   *
   * INSTRUCTOR QUOTE:
   * "So it receives the current state automatically and we should return
   * the data which we wanna use in this component. And in this case, that
   * is this cartIsVisible property value."
   *
   * DRILLING INTO THE STATE (Lesson 329):
   * =====================================
   * INSTRUCTOR QUOTE:
   * "But for this we'll need to drill into that state slice and since I'm
   * setting up a map of reducers here in the index JS file in the store
   * folder, we need to use this key to drill into that part of the state,
   * so to say, and then use that property name in which we're interested.
   * So here we need to access state.ui.cartIsVisible. That's how we extract
   * that value."
   *
   * STATE STRUCTURE:
   * ================
   * {
   *   ui: {
   *     cartIsVisible: false  // <-- This is what we're reading
   *   },
   *   cart: {
   *     items: [...],
   *     totalQuantity: 0
   *   }
   * }
   *
   * WHY state.ui.cartIsVisible?
   * ===========================
   * - state.ui -> because we used 'ui' as the key in configureStore reducer map
   * - .cartIsVisible -> because that's the property name in initialState
   */
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  return (
    <Layout>
      {/**
       * CONDITIONAL RENDERING (Lesson 329):
       * ===================================
       * INSTRUCTOR QUOTE:
       * "And then we can store this in a constant. ShowCart could be the
       * constant name and we can now use this to conditionally show or hide
       * this cart component like this."
       *
       * Pattern: {showCart && <Cart />}
       * - If showCart is true: renders Cart component
       * - If showCart is false: renders nothing (short-circuit)
       *
       * TESTING (Lesson 329):
       * =====================
       * INSTRUCTOR QUOTE:
       * "If we do that and save this and restart the dev server to make sure
       * that that's up and running, we should be able that once it is running
       * again, that we actually click My Cart to show it and hide it. So that
       * is working and that's the first part."
       *
       * This works because:
       * 1. Click "My Cart" button
       * 2. CartButton dispatches uiActions.toggle()
       * 3. ui-slice reducer toggles cartIsVisible
       * 4. App component re-renders (useSelector subscription)
       * 5. Cart is now visible (or hidden)
       */}
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
