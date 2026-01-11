/**
 * ============================================================================
 * CART ACTIONS - Thunk Action Creators for Cart Side Effects (Lessons 339-340)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 339):
 * "But since this file is now getting bigger and bigger, I'm a fan of creating
 * a separate file for that. Let's maybe name it cart-actions.js, of course,
 * the file name is up to you."
 *
 * WHY A SEPARATE FILE? (Lesson 339):
 * ==================================
 * - cart-slice.js was getting too large with both slice definition AND thunks
 * - Separating thunks into their own file improves organization
 * - This file contains ONLY action creator thunks (async side effects)
 * - cart-slice.js now contains ONLY the slice definition (sync reducers)
 *
 * FILE ORGANIZATION:
 * ==================
 * - cart-slice.js: createSlice definition, reducers, auto-generated actions
 * - cart-actions.js: Custom thunk action creators (sendCartData, fetchCartData)
 *
 * WHAT THIS FILE CONTAINS:
 * ========================
 * 1. sendCartData - Sends cart to Firebase (PUT request)
 *    - Updated in Lesson 340 to exclude 'changed' property
 * 2. fetchCartData - Fetches cart from Firebase (GET request)
 *    - Updated in Lesson 340 to handle empty items array
 *
 * FIREBASE URL: https://react-13c13-default-rtdb.firebaseio.com/
 */

import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

/**
 * ============================================================================
 * SEND CART DATA THUNK (Lessons 338, 339, 340)
 * ============================================================================
 *
 * This thunk was originally in cart-slice.js (Lesson 338).
 * It's now moved here to keep cart-slice.js focused on the slice definition.
 *
 * WHAT THIS THUNK DOES:
 * =====================
 * 1. Dispatches pending notification
 * 2. Sends PUT request to Firebase with cart data (excluding 'changed' property)
 * 3. Dispatches success or error notification based on result
 *
 * LESSON 340 UPDATE - EXCLUDING 'changed' PROPERTY:
 * =================================================
 * INSTRUCTOR QUOTE (Lesson 340):
 * "Now, as a side note, this changed property is now all the part of Firebase,
 * because we're sending the overall cart state, as it's stored by Redux to Firebase."
 *
 * INSTRUCTOR QUOTE:
 * "If we would wanna avoid this, we could of course, go to the cart-actions and
 * there, where we send our cart data, instead of taking the whole cart, we could
 * create a new objects, where we then just use items from cart items and just
 * the totalQuantity from cart.totalQuantity. So we would create a new object,
 * which does not contain changed."
 *
 * @param {Object} cart - The cart data to send to Firebase
 * @returns {Function} A function that Redux will execute with dispatch
 */
export const sendCartData = (cart) => {
  return async (dispatch) => {
    /**
     * DISPATCH PENDING NOTIFICATION:
     * ==============================
     * Show "Sending..." notification before the HTTP request starts.
     */
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    /**
     * NESTED ASYNC FUNCTION FOR ERROR HANDLING:
     * =========================================
     * We wrap the fetch in a separate function so we can use try/catch
     * to handle both network errors and HTTP errors (!response.ok).
     */
    const sendRequest = async () => {
      /**
       * CREATE OBJECT WITHOUT 'changed' PROPERTY (Lesson 340):
       * =======================================================
       * INSTRUCTOR QUOTE (Lesson 340):
       * "Instead of taking the whole cart, we could create a new object, where
       * we then just use items from cart.items and just the totalQuantity from
       * cart.totalQuantity. So we would create a new object, which does not
       * contain changed."
       *
       * INSTRUCTOR QUOTE:
       * "That's something we could do. And with that, it is removed, if we send
       * something. Now it's no longer part of Firebase."
       *
       * WHY WE DO THIS:
       * ===============
       * - The `changed` flag is a frontend-only concern
       * - It tracks whether cart was modified locally (for deciding when to send)
       * - We don't need/want to store it in Firebase
       * - This keeps Firebase data clean and focused on actual cart data
       */
      const response = await fetch(
        'https://react-13c13-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
};

/**
 * ============================================================================
 * FETCH CART DATA THUNK (Lesson 339) - NEW!
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 339):
 * "Now what we learned about thunks and thunk action creators, so these action
 * creator functions here. Now, did we learn about that, let's build an action
 * creator that fetches the cart when the application loads. Because at the
 * moment we're only sending data but we never fetched data when the application
 * loads. And therefore, if we reload, all our state is still lost and that's
 * of course not the goal."
 *
 * WHY WE NEED THIS:
 * =================
 * - Currently we only SEND cart data to Firebase
 * - When the app reloads, all cart state is lost
 * - We need to FETCH the cart from Firebase on app load
 * - This restores the cart state from the backend
 *
 * THE PATTERN (Lesson 339):
 * =========================
 * INSTRUCTOR QUOTE:
 * "And just as before that will immediately return a function which gets
 * dispatch as an argument and then does something else."
 *
 * Same thunk pattern as sendCartData:
 * - Returns an async function
 * - Redux executes it and provides dispatch
 * - We can dispatch actions inside
 *
 * WHY GET REQUEST DOESN'T NEED CONFIG (Lesson 339):
 * =================================================
 * INSTRUCTOR QUOTE:
 * "So we don't need to add this configuration object then as a second
 * parameter, because a GET request is the default, anyways."
 *
 * fetch() defaults:
 * - Method: GET (no need to specify)
 * - No body needed for GET requests
 * - Just pass the URL
 *
 * DATA FORMAT (Lesson 339):
 * =========================
 * INSTRUCTOR QUOTE:
 * "Now, the cart data we're fetching, will have that format which is stored
 * on Firebase and that's the format which we're sending to Firebase of course.
 * It will be this cart, which we're sending there so it is an object with the
 * items key, with an array inside and a totalQuantity key."
 *
 * INSTRUCTOR QUOTE:
 * "Which is exactly the format we need here in our front-end as well. Which is
 * no surprise because we are sending that Redux state snapshot as data to the
 * backend at the end."
 *
 * Firebase stores exactly what we send:
 * {
 *   items: [{ id, name, price, quantity, totalPrice }, ...],
 *   totalQuantity: number
 * }
 *
 * WHY NO TRANSFORMATION NEEDED (Lesson 339):
 * ==========================================
 * INSTRUCTOR QUOTE:
 * "So we automatically get back correctly formatted data here and we don't
 * need to transform that Firebase data first because it has the format, we
 * sent to Firebase earlier. That's different from other sections in the
 * course, here we had to transform Firebase data because there we used POST
 * for sending our data not PUT as we're doing here and hence we let Firebase
 * create a list of data which turned out to be an object when we fetched it."
 *
 * INSTRUCTOR QUOTE:
 * "Here with PUT we're sending our data snapshots to Firebase and Firebase
 * will take it as it is and store it like it is without changing it. So when
 * we then fetch it, we also have the correct structure."
 *
 * PUT vs POST with Firebase:
 * - PUT: Data stored exactly as sent → fetch returns same structure
 * - POST: Firebase creates list with unique IDs → fetch returns different structure
 *
 * USING replaceCart (Lesson 339):
 * ===============================
 * INSTRUCTOR QUOTE:
 * "And hence this cart data is correctly formatted and therefore now, we can
 * use this replaceCart reducer, which I provided to you earlier in this module
 * to replace our front-end cart with the cart we're loading from Firebase."
 *
 * INSTRUCTOR QUOTE:
 * "And replaceCart expects a payload which has a totalQuantity and an items
 * field which is exactly the data structure we're fetching from Firebase."
 *
 * @returns {Function} A function that Redux will execute with dispatch
 */
export const fetchCartData = () => {
  /**
   * THE RETURNED ASYNC FUNCTION (Lesson 339):
   * =========================================
   * INSTRUCTOR QUOTE:
   * "If I turn this into an async function, which we can, Redux supports that,
   * this function which we return here is async. So we can use await here as well."
   */
  return async (dispatch) => {
    /**
     * NESTED FETCH FUNCTION (Lesson 339):
     * ===================================
     * INSTRUCTOR QUOTE:
     * "I'll create a new function, fetchData, and have nested function which
     * is async because I'll use the fetch API and I wanna wrap fetchData with
     * try catch after - that's why I'm putting it into a separate function."
     *
     * Why nested function?
     * - We can await it in try/catch
     * - Any thrown error will be caught
     * - Clean separation of fetch logic from error handling
     */
    const fetchData = async () => {
      /**
       * GET REQUEST TO FIREBASE (Lesson 339):
       * =====================================
       * INSTRUCTOR QUOTE:
       * "So then we await fetch action get a response here and wanna fetch by
       * sending a request to that same URL again but this time it should be a
       * GET request."
       *
       * No configuration object needed:
       * - GET is the default method
       * - No body to send
       * - Just the URL
       */
      const response = await fetch(
        'https://react-13c13-default-rtdb.firebaseio.com/cart.json'
      );

      /**
       * ERROR HANDLING (Lesson 339):
       * ============================
       * INSTRUCTOR QUOTE:
       * "But of course, I also still wanna check if the response is maybe not
       * okay for whatever reason and if that should be the case I'll throw a
       * new error where I say, 'could not fetch cart data' something like this."
       */
      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      /**
       * PARSE JSON RESPONSE (Lesson 339):
       * =================================
       * INSTRUCTOR QUOTE:
       * "Instead this time I am now interested in the data, so in the result
       * of calling await response.json."
       *
       * response.json() returns a Promise that resolves to the parsed JSON.
       * The data will have the structure:
       * { items: [...], totalQuantity: number }
       */
      const data = await response.json();

      /**
       * RETURN DATA FOR USE IN TRY BLOCK (Lesson 339):
       * ==============================================
       * INSTRUCTOR QUOTE:
       * "Now, if we make it past this line of code here though, we have the
       * data and I will then return it here, I'll return it here because that
       * is not a separate nested function."
       *
       * By returning data, we can await fetchData() and get the result.
       */
      return data;
    };

    /**
     * TRY/CATCH FOR ERROR HANDLING (Lesson 339):
     * ==========================================
     * INSTRUCTOR QUOTE:
     * "Hence here I'll then try executing fetchData and catch any errors we
     * might be getting."
     */
    try {
      /**
       * AWAIT THE FETCH (Lesson 339):
       * =============================
       * INSTRUCTOR QUOTE:
       * "If we however, are in the try block I can await fetchData, I can do
       * this if I turn this into an async function, which we can, Redux
       * supports that."
       */
      const cartData = await fetchData();

      /**
       * DISPATCH replaceCart ACTION (Lessons 339, 340):
       * ================================================
       * INSTRUCTOR QUOTE (Lesson 339):
       * "So, in cart-actions, we just wanna import our cartActions from the
       * cart slice, so these automatically generated actions now. And here,
       * I then wanna dispatch cartActions.replaceCart and pass my cartData
       * as a payload, which as mentioned has the correct structure already."
       *
       * INSTRUCTOR QUOTE:
       * "Now we could have also shown a success notification but I don't wanna
       * do that, I just wanna use the cart data and we're good to go."
       *
       * Why no success notification?
       * - Fetching on load should be seamless
       * - User doesn't need to know data was fetched
       * - Only show notification if something goes wrong
       *
       * ================================================================
       * HANDLING EMPTY CART / UNDEFINED ITEMS (Lesson 340):
       * ================================================================
       * INSTRUCTOR QUOTE (Lesson 340):
       * "We're getting this error because I cleared my cart entirely and I
       * reloaded and therefore I fetched my cart data from Firebase. Since I
       * cleared the cart entirely though, we see that on Firebase here, we
       * have no items key in the cart anymore."
       *
       * INSTRUCTOR QUOTE:
       * "So we fetched that data from Firebase and we set our local carts to
       * the fetched cart. And that means that items is now not an empty array,
       * but undefined and therefore trying to call find on undefined, fails."
       *
       * THE PROBLEM:
       * ============
       * When cart is completely empty on Firebase:
       * - Firebase doesn't store empty arrays
       * - cartData.items will be undefined, not []
       * - Redux state gets items: undefined
       * - Calling .find() on undefined throws error!
       *
       * THE FIX:
       * ========
       * INSTRUCTOR QUOTE (Lesson 340):
       * "To solve this, we should go to cart-actions and to the place where we
       * fetch our cart. And then, when we replace our cart with cartData, there
       * indeed is a tiny transformation we should make. We should make sure,
       * that the payload we pass to replaceCart, is a object which always has
       * a items key, which is either cartsData.items, or if that should be
       * undefined and therefore a falsy and empty array."
       *
       * INSTRUCTOR QUOTE:
       * "With that, we ensure that we never end up with items being undefined.
       * Instead, it will always be an empty array."
       *
       * Using || [] fallback:
       * - If cartData.items exists → use it
       * - If cartData.items is undefined/null → use empty array []
       */
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      /**
       * ERROR NOTIFICATION (Lesson 339):
       * ================================
       * INSTRUCTOR QUOTE:
       * "And if we get an error, we still might wanna show the error
       * notification. So I'll then dispatch this error notification action
       * again down here, but I'll say, 'fetching cart data failed.'"
       */
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        })
      );
    }
  };
};
