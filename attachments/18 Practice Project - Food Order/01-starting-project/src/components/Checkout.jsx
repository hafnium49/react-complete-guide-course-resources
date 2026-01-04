/**
 * ============================================================================
 * CHECKOUT COMPONENT - ORDER FORM MODAL (Lesson 295)
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
 * REQUEST CONFIG FOR POST
 * =======================
 * Configuration object for the HTTP POST request.
 *
 * WHY DEFINE THIS OUTSIDE THE COMPONENT?
 * --------------------------------------
 * Same reason as in Meals.jsx - defining outside prevents creating
 * a new object on every render. This is important because:
 *
 * 1. The config object is in useHttp's dependency array
 * 2. A new object every render would look like a "change" to React
 * 3. This could cause unintended re-runs of effects
 *
 * CONFIGURATION OPTIONS:
 * ----------------------
 * - method: 'POST' for sending data to the server
 * - headers: Tell the server we're sending JSON data
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
   * USING useHttp FOR POST REQUESTS
   * ===============================
   * Unlike Meals.jsx (which uses GET), this component uses POST.
   *
   * The key difference:
   * - GET requests: useHttp sends automatically on mount
   * - POST requests: We call sendRequest manually when form is submitted
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
   * FINISH HANDLER (POST-SUCCESS)
   * =============================
   * Called when user clicks "Okay" after successful order submission.
   *
   * This function does THREE things:
   * 1. hideCheckout(): Close the modal
   * 2. clearCart(): Empty the shopping cart
   * 3. clearData(): Reset the HTTP hook's data state
   *
   * WHY clearData()?
   * ----------------
   * Without clearing the data, if the user adds more items and
   * goes to checkout again, the 'data' from the previous successful
   * order would still be set, immediately showing the success message
   * instead of the form.
   *
   * This is a common pitfall when reusing HTTP state!
   */
  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  /**
   * FORM SUBMIT HANDLER
   * ===================
   * Called when user submits the checkout form.
   *
   * FORM HANDLING PATTERN:
   * ----------------------
   * 1. Prevent default form submission (page refresh)
   * 2. Extract form data using FormData API
   * 3. Convert FormData to plain object
   * 4. Send to server via our HTTP hook
   *
   * @param {Event} event - The form submission event
   */
  function handleSubmit(event) {
    /**
     * PREVENT DEFAULT BEHAVIOR
     * ========================
     * By default, form submission causes a full page reload.
     * We prevent this because we want to handle it with JavaScript.
     */
    event.preventDefault();

    /**
     * EXTRACTING FORM DATA
     * ====================
     * The FormData API provides easy access to form values.
     *
     * new FormData(event.target):
     * - event.target is the <form> element
     * - FormData collects all named inputs automatically
     *
     * Object.fromEntries(fd.entries()):
     * - fd.entries() returns an iterator of [name, value] pairs
     * - Object.fromEntries() converts those pairs into an object
     *
     * EXAMPLE:
     * --------
     * Form inputs:
     * <input name="name" value="John Doe" />
     * <input name="email" value="john@example.com" />
     *
     * Result:
     * {
     *   name: "John Doe",
     *   email: "john@example.com",
     *   street: "123 Main St",
     *   "postal-code": "12345",
     *   city: "New York"
     * }
     *
     * This is much cleaner than manually reading each input's value!
     */
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    /**
     * SENDING THE ORDER
     * =================
     * We call sendRequest() with the request body as JSON string.
     *
     * ORDER DATA STRUCTURE:
     * ---------------------
     * {
     *   order: {
     *     items: [...],      // Cart items array
     *     customer: {...}    // Customer form data
     *   }
     * }
     *
     * This matches what the backend expects at POST /orders.
     *
     * JSON.stringify() converts our JavaScript object to a JSON string,
     * which is what we need to send in the request body.
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
   * LOADING STATE
   * =============
   * While the request is being sent, show a loading message
   * instead of the buttons.
   *
   * This prevents:
   * - User clicking submit multiple times
   * - Confusion about whether the action worked
   */
  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  /**
   * SUCCESS STATE
   * =============
   * If we have data (response from server) and no error,
   * the order was successful. Show a success message.
   *
   * EARLY RETURN PATTERN:
   * ---------------------
   * We return a completely different JSX structure for success.
   * This is cleaner than trying to conditionally render within
   * a single return statement.
   *
   * SUCCESS MODAL CONTENT:
   * ----------------------
   * - Success heading
   * - Confirmation message
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
   * HTML5 VALIDATION:
   * -----------------
   * We use the 'required' attribute for basic validation.
   * The browser won't submit the form if required fields are empty.
   * The 'email' input type adds email format validation.
   */
  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
      {/*
        FORM ELEMENT
        ============
        onSubmit={handleSubmit}:
        - Called when form is submitted (button click or Enter key)
        - We prevent default and handle it manually
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
          FORM FIELDS (Lesson 295)
          ========================
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

          name ATTRIBUTE:
          ---------------
          The 'name' attribute is crucial for FormData to work.
          FormData uses the name to create key-value pairs.
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
 * SUMMARY & KEY CONCEPTS FROM LESSON 295
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
 */
