/**
 * ============================================================================
 * CART ACTIONS - Thunk Action Creators for Cart Side Effects (Lesson 339)
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
 * 2. fetchCartData - Fetches cart from Firebase (GET request) - NEW in Lesson 339
 *
 * FIREBASE URL: https://react-13c13-default-rtdb.firebaseio.com/
 */

import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

/**
 * ============================================================================
 * SEND CART DATA THUNK (Moved from cart-slice.js in Lesson 339)
 * ============================================================================
 *
 * This thunk was originally in cart-slice.js (Lesson 338).
 * It's now moved here to keep cart-slice.js focused on the slice definition.
 *
 * WHAT THIS THUNK DOES:
 * =====================
 * 1. Dispatches pending notification
 * 2. Sends PUT request to Firebase with cart data
 * 3. Dispatches success or error notification based on result
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
      const response = await fetch(
        'https://react-13c13-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
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
       * DISPATCH replaceCart ACTION (Lesson 339):
       * =========================================
       * INSTRUCTOR QUOTE:
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
