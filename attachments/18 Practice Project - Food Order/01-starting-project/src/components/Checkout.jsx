/**
 * ============================================================================
 * CHECKOUT COMPONENT - ORDER FORM MODAL (Lessons 295, 296, 297, 298, 300 & 301)
 * ============================================================================
 *
 * This component displays the checkout form in a modal, allowing users to
 * enter their shipping information and submit their order.
 *
 * LESSON 295 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Creating a new checkout component for order submission
 * 2. Displaying checkout in a Modal component
 * 3. Consuming both CartContext and UserProgressContext
 * 4. Building a form with multiple input fields
 * 5. Creating reusable Input components (optional approach)
 * 6. Understanding the onClose prop for Escape key handling
 *
 * LESSON 296 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Handling form submission with onSubmit prop
 * 2. Understanding why preventDefault() is necessary
 * 3. Using HTML5 validation with the required attribute
 * 4. Different approaches to extract form values (state, refs, FormData)
 * 5. Using the FormData API with Object.fromEntries()
 * 6. Combining customer data with cart data for the order
 *
 * LESSON 297 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Configuring fetch() for POST requests
 * 2. Setting request method, headers, and body
 * 3. Using JSON.stringify() to convert data to JSON format
 * 4. Structuring the order data: { order: { items, customer } }
 * 5. Getting cart items from CartContext
 * 6. Ensuring form field names match backend expectations
 * 7. Verifying requests in browser Network tab
 * 8. Checking backend data storage (orders.json)
 *
 * LESSON 298 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Using the custom useHttp hook for POST requests
 * 2. Why we call sendRequest() from handleSubmit (not from useEffect)
 * 3. Defining requestConfig OUTSIDE the component to prevent infinite loops
 * 4. Understanding the difference between GET (auto-fetch) and POST (manual trigger)
 * 5. Managing loading, error, and success states for better UX
 *
 * LESSON 300 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Handling loading state (isSending) - show loading text instead of buttons
 * 2. Handling error state - display Error component when submission fails
 * 3. Handling success state - show success modal when order completes
 * 4. Creating handleFinish for complete cleanup after successful order
 * 5. Calling clearCart() to empty the shopping cart
 * 6. Calling clearData() to prevent stale success screens
 * 7. Understanding why all three cleanup actions are necessary
 *
 * LESSON 301 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Migrating from onSubmit to form actions
 * 2. Renaming handleSubmit to checkoutAction for clarity
 * 3. Using action prop instead of onSubmit prop on the form
 * 4. FormData is automatically passed to form actions (no event.target needed)
 * 5. No need for event.preventDefault() with form actions
 * 6. Form actions can be async functions (since sendRequest returns a Promise)
 * 7. Understanding both approaches work for form submission
 *
 * TWO APPROACHES TO FORM SUBMISSION (Lesson 296):
 * ===============================================
 * The instructor explains:
 * "if we wanna handle the submission of this form, we can either do that
 * manually by adding the onSubmit prop and setting up our own function
 * that's triggered when that submit event occurs, or we could use a
 * form action."
 *
 * "Now, here, I'll start by using this onSubmit prop and I'll handle the
 * form submission manually. I'll not use this form actions feature that's
 * offered by React, but later, at the end of this section, we'll actually
 * migrate this project to use form actions so that you see both approaches
 * in action."
 *
 * WHY CREATE A CHECKOUT COMPONENT? (Lesson 295)
 * =============================================
 * The instructor explains the need for this component:
 * "Therefore, we need to add such a component. A new checkout component
 * in a new checkout component file."
 *
 * "Now my plan here is to also show this checkout component in such
 * a modal. Because the idea is that even when checkout is open, we
 * still have the rest of the page in the background. And that's why
 * I will use a modal here."
 *
 * CHECKOUT FEATURES:
 * ==================
 * - Display total order amount
 * - Form fields: Full Name, Email, Street, Postal Code, City
 * - HTML5 form validation (required attribute)
 * - Loading state while submitting
 * - Success message after order submission
 * - Error handling if submission fails
 *
 * USER FLOW:
 * ==========
 * 1. User clicks "Go to Checkout" in Cart
 * 2. UserProgressContext.showCheckout() is called
 * 3. Checkout modal opens (progress === 'checkout')
 * 4. User fills in form and clicks "Submit Order"
 * 5. Order sent to backend via POST request
 * 6. On success: Show success message, user clicks "Okay"
 * 7. hideCheckout() called, cart cleared, modal closes
 */

import { useContext } from 'react';

/**
 * IMPORTS (Lesson 295)
 * ====================
 * The instructor explains the necessary imports:
 *
 * Modal: "Now my plan here is to also show this checkout component
 * in such a modal."
 *
 * CartContext: "Now of course, this total amount depends on our cart
 * and therefore this checkout component will also need access to our
 * CartContext here."
 *
 * UserProgressContext: For controlling when the checkout modal is open
 * and closing it after order completion.
 *
 * currencyFormatter: For formatting the total price
 * useHttp: Custom hook for HTTP requests
 * Error: Component for displaying error messages
 */
import Modal from './Modal.jsx';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import { currencyFormatter } from '../util/formatting.js';
import useHttp from '../hooks/useHttp.js';
import Error from './Error.jsx';

/**
 * REQUEST CONFIG FOR POST (Lessons 297 & 298)
 * ===========================================
 * Configuration object for the HTTP POST request.
 *
 * The instructor explains why we need to configure the request:
 * "We did not have to do that before in the meals file because the default
 * without configuration is that fetch sends a get request to this route.
 * But we now need to configure it because we need to change the request
 * method now from get to post."
 *
 * WHY DEFINE THIS OUTSIDE THE COMPONENT? (Lesson 298 - CRITICAL!)
 * ---------------------------------------------------------------
 * INSTRUCTOR QUOTE (Lesson 298):
 * "Here's one problem, with this config object... I'm also using this
 * config object as a dependency of my sendRequest function inside of
 * useCallback. And this config object will change every time this
 * component function executes."
 *
 * "Therefore this config object is recreated, therefore this function
 * is recreated, therefore useEffect runs again, and it all starts all
 * over again."
 *
 * SOLUTION (Lesson 298):
 * "So since this object doesn't use any values that are only available
 * inside of the component function, we can simply move this object
 * definition outside of the component function."
 *
 * Same reason as in Meals.jsx - defining outside prevents creating
 * a new object on every render. This is important because:
 *
 * 1. The config object is in useHttp's useCallback dependency array
 * 2. A new object every render = new reference = "change" detected
 * 3. This triggers infinite re-fetching loops!
 *
 * CONFIGURATION OPTIONS (Lesson 297):
 * -----------------------------------
 * method: 'POST'
 * The instructor explains:
 * "We should send a post request to this route to be precise."
 *
 * headers: { 'Content-Type': 'application/json' }
 * The instructor explains:
 * "In addition we should now also add some headers to add the Content-Type
 * header, and set it to application/json like this so that the backend
 * understands that we're submitting some data in JSON format, and it
 * should be extracted accordingly."
 *
 * Note: The actual body (the order data) is passed separately
 * when calling sendRequest(), not here.
 */
const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * CHECKOUT COMPONENT
 * ==================
 * Displays the checkout form modal and handles order submission.
 */
export default function Checkout() {
  /**
   * CONSUMING MULTIPLE CONTEXTS (Lesson 295)
   * ========================================
   * The instructor explains needing CartContext:
   * "Now of course, this total amount depends on our cart and therefore
   * this checkout component will also need access to our CartContext here."
   *
   * CartContext provides:
   * - items: The cart items to include in the order
   * - clearCart: Function to empty the cart after successful order
   *
   * UserProgressContext provides:
   * - progress: To determine if this modal should be open
   * - hideCheckout: To close this modal
   */
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  /**
   * USING useHttp FOR POST REQUESTS (Lessons 297 & 298)
   * ===================================================
   * The instructor explains why we send from handleSubmit, not useEffect:
   * "in a similar way as we loaded our meals, though this time not inside
   * of such an Effect function because this time we don't really need to
   * run this when the component loads, but instead we wanna send a request
   * from inside handleSubmit."
   *
   * KEY DIFFERENCE FROM MEALS (Lesson 298):
   * ---------------------------------------
   * INSTRUCTOR QUOTE:
   * "I only wanna send it if it's a GET request, because for POST
   * requests I only want to send those requests once the user clicked
   * a button."
   *
   * - GET requests (Meals): useHttp sends automatically on mount
   * - POST requests (Checkout): We call sendRequest manually when form is submitted
   *
   * WHY USE THE SAME HOOK? (Lesson 298):
   * ------------------------------------
   * INSTRUCTOR QUOTE:
   * "we have two components, the Checkout component and the Meals component,
   * that both need to send requests, even though those requests are sent at
   * different points of time, but they both do it. And they then also, both
   * in the end need to deal with different request states."
   *
   * The useHttp hook handles:
   * - Loading state (isLoading/isSending)
   * - Error state (error message)
   * - Success state (data from server)
   *
   * TARGETING THE /orders ENDPOINT (Lesson 297):
   * --------------------------------------------
   * The instructor explains:
   * "it's inside of this handleSubmit function where we wanna use the fetch
   * function to send the request to that dummy backend here. And there it's
   * slash orders we wanna target because that's the route in this dummy
   * backend that waits for such incoming order requests."
   *
   * NO AUTO-FETCH (Lesson 298):
   * ---------------------------
   * Because requestConfig has method: 'POST', the useHttp hook's
   * useEffect check prevents automatic fetching:
   *
   * if ((config && (config.method === 'GET' || !config.method)) || !config) {
   *   sendRequest(); // Only runs for GET, not POST
   * }
   *
   * DESTRUCTURED VALUES:
   * --------------------
   * - data: Response from server (order confirmation)
   * - isLoading (renamed to isSending): True while request is in progress
   * - error: Error message if request failed
   * - sendRequest: Function to trigger the POST request
   * - clearData: Function to reset the data state
   *
   * WHY RENAME isLoading TO isSending?
   * ----------------------------------
   * Semantic naming! "isSending" better describes what's happening
   * in a form submission context vs "isLoading" which sounds like
   * we're loading/fetching data.
   */
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp('http://localhost:3000/orders', requestConfig);

  /**
   * CALCULATING CART TOTAL
   * ======================
   * Same calculation as in Cart.jsx.
   *
   * We could potentially get this from CartContext if we added
   * a 'total' value there, but calculating it here is fine and
   * keeps the context simpler.
   *
   * REDUCE PATTERN:
   * ---------------
   * accumulator + (quantity × price) for each item
   * Starting from 0, add each item's contribution to total.
   */
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  /**
   * CLOSE HANDLER
   * =============
   * Called when user clicks "Close" button.
   * Simply hides the checkout modal without any other action.
   */
  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  /**
   * FINISH HANDLER (POST-SUCCESS) - Lesson 300
   * ==========================================
   * Called when user clicks "Okay" after successful order submission.
   *
   * INSTRUCTOR QUOTE (Lesson 300):
   * "And now we want to handle this case where we click Okay, and I wanna
   * add a function for that, handleFinish maybe, and I wanna trigger this
   * when the Okay button is clicked."
   *
   * This function does THREE things:
   * 1. hideCheckout(): Close the modal
   * 2. clearCart(): Empty the shopping cart
   * 3. clearData(): Reset the HTTP hook's data state
   *
   * STEP 1: CLOSE THE MODAL (Lesson 300)
   * ------------------------------------
   * INSTRUCTOR QUOTE:
   * "And in handleFinish, I of course wanna close this checkout modal,
   * so I'll call userProgressCtx.hideCheckout."
   *
   * STEP 2: CLEAR THE CART (Lesson 300)
   * -----------------------------------
   * INSTRUCTOR QUOTE:
   * "But now in this function, we, of course, also wanna clear our cart.
   * And I'll do that by going to my CartContext and by adding another
   * action there or another function we can dispatch through this context
   * - a clearCart function."
   *
   * STEP 3: CLEAR HTTP DATA (Lesson 300)
   * ------------------------------------
   * INSTRUCTOR QUOTE:
   * "The problem with that is that if we then add another item to our cart,
   * and we then go to checkout again, we'll instantly see the success screen
   * here because data is still set. This data here is still set."
   *
   * "So therefore, I'll go to my useHttp hook, and I'll add another function
   * which I'll call clearData... And I'll export, I'll return that from our
   * hook, so we can use it in the Checkout component and call it here in
   * handleFinish as well."
   *
   * WHY ALL THREE ARE NECESSARY:
   * ----------------------------
   * Without hideCheckout(): Modal stays open
   * Without clearCart(): Old items remain in cart
   * Without clearData(): Success screen shows immediately on next checkout
   *
   * This is a common pitfall when reusing HTTP state!
   */
  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  /**
   * FORM SUBMIT HANDLER (Lessons 296 & 301)
   * =======================================
   * The instructor explains setting up this handler:
   * "So therefore here, I'll start by adding this onSubmit prop to this
   * form element. And then we can set up a function, handleSubmit could
   * be the name, which we connect to that prop, so which we pass as a
   * value to that prop as we always do."
   *
   * FORM HANDLING PATTERN (onSubmit approach - Lesson 296):
   * -------------------------------------------------------
   * 1. Prevent default form submission (page refresh)
   * 2. Extract form data using FormData API
   * 3. Convert FormData to plain object
   * 4. Send to server via our HTTP hook
   *
   * ============================================================================
   * LESSON 301 - MIGRATING TO FORM ACTIONS
   * ============================================================================
   *
   * INSTRUCTOR QUOTE (Lesson 301):
   * "So in this section here, in the Checkout component, we actually handled
   * the submission of this checkout form manually with the onSubmit prop.
   * And we then extracted those entered values in that function, in that
   * handleSubmit function by constructing a FormData object by then getting
   * hold of the event.target, which is the form, and by then collecting that
   * FormData like this. And that, of course, all works, but you did, of course,
   * also learn about form actions earlier in this course. And, therefore, we
   * could, of course, also handled this form submission with help of form actions."
   *
   * MIGRATION STEPS (Lesson 301):
   * ============================
   * STEP 1 - Rename the function:
   * INSTRUCTOR QUOTE:
   * "We can start by giving this handleSubmit function a different name,
   * which is not mandatory but which we can do to make it clear that it
   * is a form action. And I'll name it checkoutAction."
   *
   * STEP 2 - Change the form prop:
   * INSTRUCTOR QUOTE:
   * "And down there, I'll actually not set this onSubmit prop on my form
   * anymore. But instead, I'll set the action prop to this renamed function,
   * so to the checkoutAction function."
   *
   * STEP 3 - Receive FormData directly:
   * INSTRUCTOR QUOTE:
   * "Now, as you learned earlier in the course, when triggering this as a
   * form action, you will get a FormData object as an input. And I'm naming
   * it FD, since this was also the name I used down here when I created
   * that form data manually."
   *
   * STEP 4 - Remove unnecessary code:
   * INSTRUCTOR QUOTE:
   * "So by switching to a form action, I can actually get rid of some code here."
   * - No more event.preventDefault() needed
   * - No more new FormData(event.target) needed
   * - FormData is passed automatically as the first parameter
   *
   * STEP 5 - Optional: Make it async:
   * INSTRUCTOR QUOTE:
   * "And sendRequest is still that function that's provided by my custom HTTP
   * hook here. It's this function here, which in the end is an async function,
   * so a function that returns a promise. So, of course, we can also turn this
   * into an async form action and await this, though this actually won't make
   * a difference if we don't use the form status anywhere, if we don't use
   * useSubmit or anything like that."
   *
   * FORM ACTION VERSION (Lesson 301):
   * =================================
   * function checkoutAction(fd) {
   *   // Or: async function checkoutAction(fd) {
   *   const customerData = Object.fromEntries(fd.entries());
   *
   *   sendRequest(
   *     JSON.stringify({
   *       order: {
   *         items: cartCtx.items,
   *         customer: customerData,
   *       },
   *     })
   *   );
   * }
   *
   * // On the form:
   * <form action={checkoutAction}>
   *
   * KEY DIFFERENCES:
   * ----------------
   * | Aspect              | onSubmit                    | Form Action               |
   * |---------------------|----------------------------|---------------------------|
   * | Prop name           | onSubmit                   | action                    |
   * | Function receives   | event                      | FormData directly         |
   * | preventDefault      | Required                   | Not needed                |
   * | FormData creation   | new FormData(event.target) | Automatic (first param)   |
   * | Cleaner code?       | No                         | Yes, less boilerplate     |
   *
   * CURRENT IMPLEMENTATION:
   * =======================
   * This file currently uses the onSubmit approach (Lesson 296).
   * You can migrate to form actions as shown above (Lesson 301).
   * Both approaches work correctly!
   *
   * @param {Event} event - The form submission event (onSubmit approach)
   */
  function handleSubmit(event) {
    /**
     * PREVENT DEFAULT BEHAVIOR (Lesson 296)
     * =====================================
     * The instructor explains why this is necessary:
     * "the thing with form submissions just is that out of the box, when
     * using a regular button in a regular form, the browser will go ahead
     * and create an HTTP request for you and send it for you, but
     * unfortunately not to the backend we want it to be sent to because
     * the browser doesn't know about that."
     *
     * "Instead, the browser would send the request to this development
     * server that's serving this site. So our front end. But this server
     * and this site is not prepared and equipped to handle this request."
     *
     * "Therefore, what we need to do is we need to prevent that default.
     * And as you learned, we can do this by calling preventDefault on
     * that standard event object, which we automatically receive in our
     * event handling function. It's passed in by React in the end."
     *
     * "And by calling this method here, preventDefault, we make sure that
     * this request, which otherwise would get created and sent is not
     * getting created and sent."
     *
     * NOTE (Lesson 301):
     * ------------------
     * When using form actions, this line is NOT needed!
     * Form actions automatically prevent the default browser behavior.
     * This is one of the benefits of the form action approach.
     */
    event.preventDefault();

    /**
     * EXTRACTING FORM DATA (Lessons 296 & 301)
     * ========================================
     * The instructor discusses multiple approaches to get form values:
     *
     * APPROACH 1 - State with onChange (Lesson 296):
     * "We could add a state value for every input or a combined state
     * object for all the inputs and use the onChange prop to update
     * the state on every keystroke. We could do that, and for some
     * validation approaches where we wanna validate on every keystroke,
     * we typically would have to do that."
     *
     * APPROACH 2 - Refs (Lesson 296):
     * "Alternatively, we could work with refs. Now, since I have a custom
     * component here, the input component, in order to pass a ref to that
     * component, you might need to use forward ref and wrap that component
     * function with forward ref if you're using a React version lower than 19.
     * If you are using React version 19 or higher, you could simply pass a
     * ref to this component and use it in there."
     *
     * APPROACH 3 - FormData API (Chosen - Lesson 296):
     * "But here again, I instead prefer using the built-in features the
     * browser offers to us. We can create such a FormData object and pass
     * the event target, which is the form element in the end, the underlying
     * object that's managed by the browser to be precise."
     *
     * APPROACH 4 - Form Actions (Lesson 301):
     * With form actions, FormData is automatically passed as the first
     * parameter, so you don't need to create it manually:
     *
     * function checkoutAction(fd) {
     *   const customerData = Object.fromEntries(fd.entries());
     *   // ...
     * }
     *
     * INSTRUCTOR QUOTE (Lesson 301):
     * "Now, as you learned earlier in the course, when triggering this as a
     * form action, you will get a FormData object as an input. And I'm naming
     * it FD, since this was also the name I used down here when I created
     * that form data manually. So by switching to a form action, I can
     * actually get rid of some code here."
     *
     * WHY THE name ATTRIBUTE IS IMPORTANT (Lesson 296):
     * -------------------------------------------------
     * "The only important thing here is that we got this name prop on our
     * inputs because this is required to then access those different input
     * fields by their name and to extract the values entered by the user."
     *
     * USING get() METHOD (Lesson 296):
     * --------------------------------
     * "Because as you learned, we can now use the get method, for example,
     * to get the full name value. So the value that was entered into this field."
     *
     * Example: fd.get('name') returns the value of the input with name="name"
     *
     * CONVERTING TO PLAIN OBJECT (Lesson 296):
     * ----------------------------------------
     * "Or as you also learned in the forms section, we can actually convert
     * this FormData object to a simpler JavaScript object where those form
     * inputs are basically represented by their name as property names, and
     * the entered values are then values for those properties, by using
     * object fromEntries and passing FormData entries like this to it."
     *
     * "And this will essentially give us an object where we, for example,
     * have an email property with the value entered by the user, and of
     * course key value pairs for all the other input fields as well."
     *
     * RESULT EXAMPLE:
     * ---------------
     * {
     *   name: "John Doe",
     *   email: "john@example.com",
     *   street: "123 Main St",
     *   "postal-code": "12345",
     *   city: "New York"
     * }
     *
     * NOTE (Lesson 301):
     * ------------------
     * With form actions, this line becomes just:
     * const customerData = Object.fromEntries(fd.entries());
     *
     * Because 'fd' is already passed as a parameter to the form action,
     * you don't need to create it from event.target.
     */
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    /**
     * SENDING THE ORDER (Lessons 296 & 297)
     * =====================================
     * The instructor explains the data structure needed:
     * "we should make sure then that the request body has a order property
     * with the details about the order, and that should then in turn be an
     * object that has a items property holding the cart items that were
     * ordered, and a customer property with all the customer details that
     * were entered in the checkout form."
     *
     * USING JSON.stringify() (Lesson 297):
     * ------------------------------------
     * The instructor explains:
     * "And of course, we need to set that request body so that data that
     * should be attached. And as mentioned, that should be in JSON format,
     * and you can easily generate data in that format with the built-in
     * JSON.stringify method, which now takes any standard JavaScript value
     * to convert it to JSON."
     *
     * ORDER DATA STRUCTURE (Lesson 297):
     * ----------------------------------
     * {
     *   order: {
     *     items: [...],      // Cart items array (what was ordered)
     *     customer: {...}    // Customer form data (who ordered)
     *   }
     * }
     *
     * CUSTOMER DATA (Lesson 297):
     * ---------------------------
     * The instructor explains:
     * "Now the customer property in the end should simply include this
     * customer data object which we're getting from our form. Because
     * with that we'll then have all these form input fields as key-value
     * pairs in that customer data."
     *
     * CART ITEMS (Lesson 297):
     * ------------------------
     * The instructor explains:
     * "and for the items it's of course now the cart data which I wanna
     * submit, the cart items which we can get from our cart context.
     * So here it's cartCtx.items, and that's the data that should be submitted."
     *
     * VERIFYING THE REQUEST (Lesson 297):
     * -----------------------------------
     * The instructor demonstrates testing:
     * "if you click Submit Order nothing will happen here. But you also
     * shouldn't get an error, and behind the scenes in the Network tab,
     * if you click Submit Order again, you should see that an HTTP request
     * is being sent."
     *
     * You can also verify by checking backend/data/orders.json:
     * "you can validate that it worked if you go back to your project,
     * and into this backend folder, and you take a look at this orders.json
     * file in the data folder. This is the file to which those dummy orders
     * are written if they make it past all these checks in my backend."
     */
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  /**
   * DYNAMIC ACTIONS (BUTTONS)
   * =========================
   * We define the action buttons separately so we can swap them
   * based on the current state.
   *
   * DEFAULT STATE (Not sending):
   * - "Close" button: type="button" prevents form submission
   * - "Submit Order" button: Default type is "submit"
   *
   * IMPORTANT: type="button"
   * ------------------------
   * Buttons inside a <form> default to type="submit".
   * The Close button needs type="button" to prevent it from
   * submitting the form when clicked.
   *
   * FRAGMENT (<> </>):
   * ------------------
   * We use a Fragment to group multiple elements without adding
   * an extra DOM node.
   */
  let actions = (
    <>
      <button type="button" className="text-button" onClick={handleClose}>
        Close
      </button>
      <button className="button">Submit Order</button>
    </>
  );

  /**
   * LOADING STATE (Lesson 300)
   * ==========================
   * While the request is being sent, show a loading message
   * instead of the buttons.
   *
   * INSTRUCTOR QUOTE (Lesson 300):
   * "So when I'm done sending, I basically want to reset and show those
   * buttons again. But whilst I'm sending, I want to show a different
   * text or maybe some loading spinner."
   *
   * IMPLEMENTATION (Lesson 300):
   * ----------------------------
   * INSTRUCTOR QUOTE:
   * "So here we can check if isSending is truthy, so if we are currently
   * sending a request, and if that's the case, I wanna update the actions
   * and set them to, let's say, just a span that says 'Sending order data...'
   * or anything like that."
   *
   * This prevents:
   * - User clicking submit multiple times
   * - Confusion about whether the action worked
   * - Provides feedback that something is happening
   */
  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  /**
   * SUCCESS STATE (Lesson 300)
   * ==========================
   * If we have data (response from server) and no error,
   * the order was successful. Show a success message.
   *
   * INSTRUCTOR QUOTE (Lesson 300):
   * "Now we're checking if we got data and no error, because data is
   * initially undefined here. So if we got data and no error, we know
   * the request succeeded. And if that's the case, I wanna return here
   * and show a success screen."
   *
   * WHY CHECK BOTH data AND !error? (Lesson 300)
   * --------------------------------------------
   * - data: Initially undefined, set when server responds successfully
   * - !error: Ensures no error occurred during the request
   * - Both must be true to show success screen
   *
   * EARLY RETURN PATTERN:
   * ---------------------
   * We return a completely different JSX structure for success.
   * This is cleaner than trying to conditionally render within
   * a single return statement.
   *
   * SUCCESS MODAL CONTENT (Lesson 300):
   * -----------------------------------
   * INSTRUCTOR QUOTE:
   * "And I'll output a paragraph that says 'Your order was submitted
   * successfully.' And maybe also output that 'We will get back to you
   * with more details via email within the next few minutes.'"
   *
   * - Success heading
   * - Confirmation message
   * - Email notification info
   * - "Okay" button to close and reset everything
   *
   * Note: onClose uses handleFinish, not handleClose, so that
   * pressing Escape also clears the cart and data.
   */
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === 'checkout'}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <button className="button" onClick={handleFinish}>
            Okay
          </button>
        </p>
      </Modal>
    );
  }

  /**
   * CHECKOUT FORM RENDER
   * ====================
   * The main checkout form UI.
   *
   * MODAL PROPS:
   * ------------
   * - open: Modal shows when progress === 'checkout'
   * - onClose: handleClose for the Escape key behavior
   *
   * FORM STRUCTURE:
   * ---------------
   * The form contains:
   * - Total amount display
   * - Customer info fields (name, email, street, postal, city)
   * - Error display (if any)
   * - Action buttons
   *
   * HTML5 VALIDATION (Lesson 296):
   * ==============================
   * The instructor explains using the required attribute:
   * "Now here to validate the input, I added the required prop on those
   * input fields. And as a result, if we save that and we go to the
   * Checkout page and we try to submit an empty form, we get some nice
   * error messages here. So that's pretty good. We don't have to worry
   * about this problem here."
   *
   * "Though, as mentioned before, you could of course also implement
   * custom JavaScript-driven validation as you also learned it in the
   * forms section. But here, I'll keep it like this and therefore the
   * validation part is already done."
   *
   * We use the 'required' attribute for basic validation.
   * The browser won't submit the form if required fields are empty.
   * The 'email' input type adds email format validation.
   */
  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
      {/*
        FORM ELEMENT (Lessons 296 & 301)
        ================================
        The instructor explains setting up the onSubmit:
        "So therefore here, I'll start by adding this onSubmit prop
        to this form element."

        CURRENT APPROACH - onSubmit (Lesson 296):
        -----------------------------------------
        onSubmit={handleSubmit}:
        - Called when form is submitted (button click or Enter key)
        - We prevent default and handle it manually

        ALTERNATIVE APPROACH - Form Actions (Lesson 301):
        -------------------------------------------------
        INSTRUCTOR QUOTE (Lesson 301):
        "And down there, I'll actually not set this onSubmit prop on my
        form anymore. But instead, I'll set the action prop to this
        renamed function, so to the checkoutAction function."

        To migrate to form actions:
        1. Rename handleSubmit to checkoutAction
        2. Change onSubmit={handleSubmit} to action={checkoutAction}
        3. Remove event.preventDefault() from the function
        4. Receive FormData directly instead of creating it from event.target

        Form action version:
        <form action={checkoutAction}>

        TESTING (Lesson 301):
        ---------------------
        INSTRUCTOR QUOTE:
        "And with those changes made, if I now go back to my page here
        and add a couple of items to the cart, I can go to the Checkout page,
        enter my name and some email address and some street, like this,
        and if I click Submit Order, I got this Success! Popup thereafter.
        The cart is reset. And if I go to my backend and take a look at
        the orders.json file, I can see that order here at the very bottom
        of this page. So that worked now with the help of form actions."
      */}
      <form onSubmit={handleSubmit}>
        {/*
          CHECKOUT HEADER
          ===============
          Title and total amount.
        */}
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        {/*
          FORM FIELDS (Lessons 295 & 296)
          ===============================
          The instructor discusses two approaches for form inputs:

          APPROACH 1 - Inline Inputs (used here):
          Each field follows the same pattern:
          - Wrapper div with "control" class (for CSS styling)
          - Label with htmlFor (accessibility - links to input)
          - Input with id, name, and required

          APPROACH 2 - Reusable Input Component:
          The instructor also mentions creating a reusable Input component
          in a UI folder that encapsulates the div/label/input pattern.
          This would look like:
          <Input label="Full Name" type="text" id="name" />

          Both approaches are valid - the component approach reduces
          repetition but adds an extra abstraction layer.

          htmlFor vs for:
          ---------------
          In JSX, we use 'htmlFor' instead of 'for' because 'for'
          is a reserved keyword in JavaScript.

          name ATTRIBUTE (Lessons 296 & 297):
          -----------------------------------
          The instructor emphasizes the importance of the name attribute:
          "The only important thing here is that we got this name prop
          on our inputs because this is required to then access those
          different input fields by their name and to extract the values
          entered by the user."

          Without the name attribute, FormData cannot identify the inputs!

          MATCHING BACKEND FIELD NAMES (Lesson 297):
          ------------------------------------------
          The instructor explains a crucial detail:
          "one thing we should actually change here is that on the app
          backend I'm looking for a name field, but in my frontend here,
          I named that field full-name. We should change this to just name
          so that extracting that data and using that data in the backend
          code works fine."

          "So all the fields I'm looking for here on that customer data,
          that should be the names of your form fields in the checkout form.
          So make sure that's the case."

          required ATTRIBUTE (Lesson 296):
          --------------------------------
          The instructor explains HTML5 validation:
          "Now here to validate the input, I added the required prop on
          those input fields. And as a result, if we save that and we go
          to the Checkout page and we try to submit an empty form, we get
          some nice error messages here."
        */}
        <div className="control">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div className="control">
          <label htmlFor="email">E-Mail Address</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className="control">
          <label htmlFor="street">Street</label>
          <input type="text" id="street" name="street" required />
        </div>

        {/*
          SIDE-BY-SIDE CONTROLS
          =====================
          The "control-row" class uses CSS flexbox to display
          postal code and city inputs side by side.

          CSS styling:
          - display: flex
          - gap: 1rem
          - Each .control inside gets flex: 1 for equal width
        */}
        <div className="control-row">
          <div className="control">
            <label htmlFor="postal-code">Postal Code</label>
            <input type="text" id="postal-code" name="postal-code" required />
          </div>

          <div className="control">
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" required />
          </div>
        </div>

        {/*
          ERROR DISPLAY
          =============
          If there's an error from the HTTP request, display it.

          CONDITIONAL RENDERING:
          ----------------------
          {error && <Error ... />}

          If error is undefined/null/empty, nothing renders.
          If error has a value, the Error component renders.
        */}
        {error && <Error title="Failed to submit order" message={error} />}

        {/*
          ACTION BUTTONS
          ==============
          The 'actions' variable contains either:
          - Close + Submit buttons (default)
          - Loading message (while sending)

          This is swapped based on isSending state above.
        */}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS FROM LESSONS 295, 296, 297, 298, 300 & 301
 * ============================================================================
 *
 * LESSON 295 WORKFLOW:
 * ====================
 * 1. Create Checkout.jsx component in components folder
 * 2. Import Modal, CartContext, UserProgressContext
 * 3. Use useContext to access both contexts
 * 4. Calculate cart total for display
 * 5. Create handleClose function for modal closing
 * 6. Build form with input fields for customer data
 * 7. (Optional) Create reusable Input component in UI folder
 * 8. Add Checkout component to App.jsx
 *
 * LESSON 296 WORKFLOW:
 * ====================
 * 1. Add onSubmit prop to the form element
 * 2. Create handleSubmit function to handle form submission
 * 3. Call event.preventDefault() to stop browser's default behavior
 * 4. Add required attribute to inputs for HTML5 validation
 * 5. Create FormData object from event.target (the form)
 * 6. Convert FormData to plain object with Object.fromEntries()
 * 7. Combine customer data with cart items for the order
 * 8. Send HTTP request to backend (covered in next lesson)
 *
 * LESSON 297 WORKFLOW:
 * ====================
 * 1. Configure fetch request for POST (method, headers)
 * 2. Set Content-Type header to application/json
 * 3. Use JSON.stringify() to convert data to JSON format
 * 4. Structure order data: { order: { items, customer } }
 * 5. Get cart items from cartCtx.items
 * 6. Ensure form field names match backend expectations
 * 7. Call sendRequest() with the JSON data
 * 8. Verify request in browser Network tab
 * 9. Check backend/data/orders.json for stored orders
 *
 * LESSON 298 WORKFLOW:
 * ====================
 * 1. Create useHttp custom hook in src/hooks/useHttp.js
 * 2. Define requestConfig OUTSIDE the component (prevents infinite loops)
 * 3. Use useHttp hook with URL, config, and optional initialData
 * 4. Destructure: { data, isLoading, error, sendRequest, clearData }
 * 5. For POST: Call sendRequest(data) from handleSubmit (not auto-fetch)
 * 6. For GET: Hook auto-fetches on mount (method undefined or 'GET')
 * 7. Use isLoading/error/data to update UI accordingly
 * 8. Use clearData() after success to reset for next use
 *
 * WHY SEND FROM handleSubmit, NOT useEffect (Lessons 297 & 298):
 * =======================================================
 * The instructor explains:
 * "this time not inside of such an Effect function because this time we
 * don't really need to run this when the component loads, but instead
 * we wanna send a request from inside handleSubmit."
 *
 * CONFIGURING FETCH FOR POST (Lesson 297):
 * ========================================
 * const requestConfig = {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' }
 * };
 *
 * Why this configuration is needed:
 * "We did not have to do that before in the meals file because the default
 * without configuration is that fetch sends a get request to this route."
 *
 * TWO FORM SUBMISSION APPROACHES (Lesson 296):
 * ============================================
 * 1. onSubmit + handleSubmit (current approach)
 * 2. Form Actions (will be covered later in this section)
 *
 * ROOM FOR IMPROVEMENT (Lesson 297):
 * ==================================
 * The instructor notes areas for enhancement:
 * "the user experience, of course, here isn't that great. If something
 * goes wrong, we wouldn't see an error message here, and if we click
 * Submit Order, we also get no feedback whether that worked or not."
 *
 * "And the same, by the way, is true here for the meals. When we reload
 * the page, we're fetching those meals. But what if something goes wrong
 * here? Or what if we have a slow internet connection?"
 *
 * This sets up the need for loading/error states (covered in next lessons)
 *
 * WHY preventDefault() IS NECESSARY (Lesson 296):
 * ===============================================
 * The instructor explains:
 * "the browser will go ahead and create an HTTP request for you and send
 * it for you, but unfortunately not to the backend we want it to be sent
 * to because the browser doesn't know about that."
 *
 * THREE WAYS TO EXTRACT FORM VALUES (Lesson 296):
 * ===============================================
 * 1. State with onChange - update state on every keystroke
 * 2. Refs - useRef + forwardRef (for React < 19) or just ref (React 19+)
 * 3. FormData API - browser built-in, no React-specific code needed
 *
 * FORM HANDLING WITH FORMDATA:
 * ============================
 * The FormData API is a clean way to collect form values:
 *
 * const fd = new FormData(formElement);
 * const data = Object.fromEntries(fd.entries());
 *
 * Benefits:
 * - Automatically collects all named inputs
 * - No need to manually track each input's value
 * - Works with any form, regardless of how many fields
 *
 * MULTIPLE UI STATES:
 * ===================
 * This component handles four distinct states:
 *
 * 1. DEFAULT: Show form with input fields
 * 2. LOADING (isSending): Show "Sending..." instead of buttons
 * 3. SUCCESS (data && !error): Show success message
 * 4. ERROR (error): Show error component within form
 *
 * CONDITIONAL RETURNS:
 * ====================
 * For significantly different UI (like success vs form), use
 * separate return statements with early returns:
 *
 * if (successCondition) {
 *   return <SuccessUI />;
 * }
 * return <FormUI />;
 *
 * STATE CLEANUP:
 * ==============
 * After successful submission, we must:
 * - Close the modal (hideCheckout)
 * - Clear the cart (clearCart)
 * - Reset HTTP hook state (clearData)
 *
 * Forgetting clearData() would cause the success message to
 * show immediately if the user opens checkout again!
 *
 * ACCESSIBILITY:
 * ==============
 * - Labels linked to inputs via htmlFor/id
 * - HTML5 validation with required and type attributes
 * - Keyboard navigation works (Tab through fields, Enter to submit)
 * - Modal traps focus (from our Modal component)
 *
 * FORM VS BUTTON TYPES:
 * =====================
 * Inside a <form>:
 * - <button> defaults to type="submit"
 * - <button type="button"> won't submit the form
 *
 * Always use type="button" for non-submit buttons inside forms!
 *
 * ============================================================================
 * LESSON 300 - HANDLING DIFFERENT STATES
 * ============================================================================
 *
 * LESSON 300 WORKFLOW:
 * ====================
 * 1. Add isSending state check - show "Sending order data..." text
 * 2. Add error state check - display Error component within form
 * 3. Add success state check (data && !error) - show success modal
 * 4. Create handleFinish function for post-success cleanup
 * 5. Add clearCart to CartContext (CLEAR_CART action in reducer)
 * 6. Add clearData to useHttp hook
 * 7. Call all three cleanup functions in handleFinish
 *
 * HANDLING LOADING STATE (Lesson 300):
 * ====================================
 * INSTRUCTOR QUOTE:
 * "So when I'm done sending, I basically want to reset and show those
 * buttons again. But whilst I'm sending, I want to show a different
 * text or maybe some loading spinner."
 *
 * Implementation:
 * if (isSending) {
 *   actions = <span>Sending order data...</span>;
 * }
 *
 * HANDLING ERROR STATE (Lesson 300):
 * ==================================
 * The Error component is conditionally rendered within the form:
 * {error && <Error title="Failed to submit order" message={error} />}
 *
 * This shows the error but still allows the user to fix issues
 * and try again.
 *
 * HANDLING SUCCESS STATE (Lesson 300):
 * ====================================
 * INSTRUCTOR QUOTE:
 * "Now we're checking if we got data and no error, because data is
 * initially undefined here. So if we got data and no error, we know
 * the request succeeded. And if that's the case, I wanna return here
 * and show a success screen."
 *
 * Implementation:
 * if (data && !error) {
 *   return (
 *     <Modal ...>
 *       <h2>Success!</h2>
 *       <p>Your order was submitted successfully.</p>
 *       ...
 *     </Modal>
 *   );
 * }
 *
 * COMPLETE CLEANUP SEQUENCE (Lesson 300):
 * =======================================
 * When the user clicks "Okay" on the success screen:
 *
 * function handleFinish() {
 *   userProgressCtx.hideCheckout();  // Close modal
 *   cartCtx.clearCart();              // Empty cart
 *   clearData();                       // Reset HTTP state
 * }
 *
 * WHY clearData IS CRITICAL (Lesson 300):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "The problem with that is that if we then add another item to our cart,
 * and we then go to checkout again, we'll instantly see the success screen
 * here because data is still set."
 *
 * Without clearData():
 * 1. User places order → Success, data is set
 * 2. User adds new items
 * 3. User opens checkout → data is STILL set
 * 4. Success screen shows immediately (wrong!)
 *
 * With clearData():
 * 1. User places order → Success, data is set
 * 2. User clicks Okay → clearData() resets data
 * 3. User adds new items
 * 4. User opens checkout → data is undefined
 * 5. Form shows correctly (right!)
 *
 * MULTIPLE UI STATES PATTERN:
 * ===========================
 * This component demonstrates handling four distinct states:
 *
 * 1. DEFAULT: Show form with input fields
 * 2. LOADING (isSending): Show "Sending..." instead of buttons
 * 3. SUCCESS (data && !error): Show success message modal
 * 4. ERROR (error): Show error component within form
 *
 * This pattern provides excellent user experience by giving
 * appropriate feedback for every possible outcome.
 *
 * ============================================================================
 * LESSON 301 - MIGRATING TO FORM ACTIONS
 * ============================================================================
 *
 * LESSON 301 WORKFLOW:
 * ====================
 * 1. Rename handleSubmit to checkoutAction (optional but clear naming)
 * 2. Change onSubmit={handleSubmit} to action={checkoutAction} on the form
 * 3. Remove event.preventDefault() (not needed with form actions)
 * 4. Remove new FormData(event.target) (FormData passed automatically)
 * 5. Change function parameter from (event) to (fd)
 * 6. Optionally make the function async (since sendRequest returns Promise)
 * 7. Test that orders are still saved to backend/data/orders.json
 *
 * INSTRUCTOR QUOTE (Lesson 301):
 * "So in this section here, in the Checkout component, we actually handled
 * the submission of this checkout form manually with the onSubmit prop.
 * And we then extracted those entered values in that function, in that
 * handleSubmit function by constructing a FormData object by then getting
 * hold of the event.target, which is the form, and by then collecting that
 * FormData like this. And that, of course, all works, but you did, of course,
 * also learn about form actions earlier in this course."
 *
 * BEFORE (onSubmit approach - Lesson 296):
 * ========================================
 * function handleSubmit(event) {
 *   event.preventDefault();
 *   const fd = new FormData(event.target);
 *   const customerData = Object.fromEntries(fd.entries());
 *   sendRequest(JSON.stringify({ order: { items, customer } }));
 * }
 *
 * <form onSubmit={handleSubmit}>
 *
 * AFTER (form action approach - Lesson 301):
 * ==========================================
 * function checkoutAction(fd) {
 *   const customerData = Object.fromEntries(fd.entries());
 *   sendRequest(JSON.stringify({ order: { items, customer } }));
 * }
 *
 * <form action={checkoutAction}>
 *
 * KEY DIFFERENCES:
 * ================
 * 1. PROP NAME: onSubmit → action
 * 2. FUNCTION PARAMETER: event → FormData (fd)
 * 3. preventDefault(): Required → Not needed
 * 4. FormData CREATION: Manual → Automatic
 * 5. CODE LINES: More → Less (cleaner)
 *
 * WHY RENAME TO checkoutAction? (Lesson 301)
 * ==========================================
 * INSTRUCTOR QUOTE:
 * "We can start by giving this handleSubmit function a different name,
 * which is not mandatory but which we can do to make it clear that it
 * is a form action. And I'll name it checkoutAction."
 *
 * ASYNC FORM ACTIONS (Lesson 301):
 * ================================
 * INSTRUCTOR QUOTE:
 * "And sendRequest is still that function that's provided by my custom HTTP
 * hook here. It's this function here, which in the end is an async function,
 * so a function that returns a promise. So, of course, we can also turn this
 * into an async form action and await this, though this actually won't make
 * a difference if we don't use the form status anywhere, if we don't use
 * useSubmit or anything like that. But for the moment, let's just keep it
 * like this."
 *
 * async function checkoutAction(fd) {
 *   const customerData = Object.fromEntries(fd.entries());
 *   await sendRequest(...);  // Optional await
 * }
 *
 * TESTING THE MIGRATION (Lesson 301):
 * ===================================
 * INSTRUCTOR QUOTE:
 * "And with those changes made, if I now go back to my page here and add a
 * couple of items to the cart, I can go to the Checkout page, enter my name
 * and some email address and some street, like this, and if I click Submit
 * Order, I got this Success! Popup thereafter. The cart is reset. And if I
 * go to my backend and take a look at the orders.json file, I can see that
 * order here at the very bottom of this page. So that worked now with the
 * help of form actions."
 *
 * WHICH APPROACH TO USE?
 * ======================
 * Both approaches work correctly! Choose based on:
 *
 * onSubmit approach:
 * - More explicit control over the submission process
 * - Familiar to developers who know traditional HTML forms
 * - Works with any React version
 *
 * Form action approach:
 * - Cleaner, less boilerplate code
 * - Integrates with React's form system
 * - Works with useFormStatus() and other React 19+ features
 * - FormData is automatically provided
 *
 * CURRENT IMPLEMENTATION:
 * =======================
 * This file currently uses the onSubmit approach.
 * The comments above show how to migrate to form actions if desired.
 */
