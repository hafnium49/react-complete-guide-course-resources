/**
 * ============================================================================
 * LESSON 276: FORM ACTIONS WITH VALIDATION - COMPLETE IMPLEMENTATION
 * ============================================================================
 *
 * This component demonstrates React 19's Form Actions feature with:
 * - Client-side form validation
 * - Error display with user feedback
 * - Form state management using useActionState hook
 * - Preservation of user input when validation fails
 * - Automatic form reset on successful submission
 *
 * KEY LEARNING OBJECTIVES:
 * ========================
 * 1. Implementing Form Actions with the action prop
 * 2. Using useActionState hook for state management
 * 3. Extracting form data with FormData API
 * 4. Client-side validation logic
 * 5. Displaying validation errors to users
 * 6. Preserving user input with defaultValue
 * 7. Form reset behavior on success
 *
 * WHAT'S NEW IN LESSON 276:
 * ==========================
 * Compared to Lesson 275's basic form structure, we now have:
 * ✓ Form action handler (shareOpinionAction)
 * ✓ State management (useActionState hook)
 * ✓ Validation logic (required fields, min/max lengths)
 * ✓ Error handling and display
 * ✓ Input value preservation on validation failure
 * ✓ Form reset on successful submission
 *
 * REACT 19 FORM ACTIONS - HOW IT WORKS:
 * ======================================
 * Form Actions is a declarative pattern where you pass an action function
 * to the form element. React handles:
 * - Preventing default form submission
 * - Extracting form data as FormData object
 * - Calling your action function with the data
 * - Managing loading/pending states
 * - Re-rendering with the returned state
 *
 * TRADITIONAL VS FORM ACTIONS COMPARISON:
 * ========================================
 *
 * TRADITIONAL (React 18):
 * -----------------------
 * function MyForm() {
 *   const [userName, setUserName] = useState('');
 *   const [title, setTitle] = useState('');
 *   const [errors, setErrors] = useState([]);
 *
 *   function handleSubmit(e) {
 *     e.preventDefault();
 *     const newErrors = [];
 *     if (title.length < 5) newErrors.push('Title too short');
 *     setErrors(newErrors);
 *     if (newErrors.length === 0) {
 *       // submit logic
 *       setUserName('');
 *       setTitle('');
 *     }
 *   }
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <input value={userName} onChange={(e) => setUserName(e.target.value)} />
 *       <input value={title} onChange={(e) => setTitle(e.target.value)} />
 *     </form>
 *   );
 * }
 *
 * FORM ACTIONS (React 19):
 * ------------------------
 * function MyForm() {
 *   function submitAction(prevState, formData) {
 *     const title = formData.get('title');
 *     const errors = [];
 *     if (title.length < 5) errors.push('Title too short');
 *     if (errors.length > 0) {
 *       return { errors, enteredValues: { title } };
 *     }
 *     return { errors: null };  // Form auto-resets!
 *   }
 *
 *   const [formState, formAction] = useActionState(submitAction, { errors: null });
 *
 *   return (
 *     <form action={formAction}>
 *       <input name="title" defaultValue={formState.enteredValues?.title} />
 *     </form>
 *   );
 * }
 *
 * Benefits:
 * - Less code (no useState, onChange handlers)
 * - No manual e.preventDefault()
 * - Automatic FormData extraction
 * - Form resets automatically on success
 * - Cleaner separation of validation logic
 */

/**
 * IMPORTS
 * =======
 */

/**
 * useActionState HOOK (React 19)
 * ===============================
 * This is a new React 19 hook specifically designed for Form Actions.
 *
 * WHAT IT DOES:
 * -------------
 * useActionState manages the state that results from executing a form action.
 * It's similar to useState but optimized for async form submissions.
 *
 * SIGNATURE:
 * ----------
 * const [state, formAction] = useActionState(actionFunction, initialState);
 *
 * PARAMETERS:
 * -----------
 * 1. actionFunction: The function to execute when the form is submitted
 *    - Must accept (prevState, formData) parameters
 *    - Returns the new state (typically an object with errors, values, etc.)
 *
 * 2. initialState: The initial value for the state
 *    - Usually { errors: null } or similar
 *    - This is what 'state' will be before the first submission
 *
 * RETURN VALUES:
 * --------------
 * 1. state: The current state returned by the action function
 *    - Initially set to initialState
 *    - Updates to whatever the action function returns
 *    - Triggers re-render when it changes
 *
 * 2. formAction: A special function to pass to the form's action prop
 *    - NOT the same as your actionFunction
 *    - React wraps your actionFunction with additional logic
 *    - Handles FormData extraction, state updates, re-rendering
 *
 * HOW IT DIFFERS FROM useState:
 * ------------------------------
 * useState:
 * - const [state, setState] = useState(initialValue);
 * - You call setState manually: setState(newValue)
 * - Synchronous updates
 *
 * useActionState:
 * - const [state, formAction] = useActionState(actionFn, initialValue);
 * - React calls your actionFn automatically when form submits
 * - state updates to whatever actionFn returns
 * - Built-in support for async actions
 * - Manages pending states automatically
 *
 * EXAMPLE:
 * --------
 * function MyComponent() {
 *   function myAction(prevState, formData) {
 *     const name = formData.get('name');
 *     if (!name) return { error: 'Name required' };
 *     return { error: null, success: true };
 *   }
 *
 *   const [state, formAction] = useActionState(myAction, { error: null });
 *
 *   return (
 *     <form action={formAction}>
 *       {state.error && <p>{state.error}</p>}
 *       <input name="name" />
 *       <button>Submit</button>
 *     </form>
 *   );
 * }
 *
 * WHY USE IT FOR FORMS?
 * ---------------------
 * - Automatically manages form submission state
 * - No need for manual state updates or e.preventDefault()
 * - Clean separation between validation logic and UI
 * - Built-in support for progressive enhancement
 * - Works seamlessly with Server Actions in Next.js
 */
import { useActionState } from 'react';

/**
 * NEW OPINION COMPONENT
 * =====================
 * A form component for submitting new opinions with validation.
 *
 * COMPONENT ARCHITECTURE:
 * -----------------------
 * This component demonstrates the Form Actions pattern:
 * 1. Define an action function (shareOpinionAction) that validates data
 * 2. Use useActionState to manage the form's state
 * 3. Pass formAction to the form's action prop
 * 4. Display errors from formState
 * 5. Preserve user input using defaultValue
 *
 * FORM STRUCTURE:
 * ---------------
 * The form collects three pieces of information:
 * 1. userName - Who is sharing the opinion (required)
 * 2. title - A short title summarizing the opinion (min 5 characters)
 * 3. body - The full opinion text (10-300 characters)
 *
 * VALIDATION RULES:
 * -----------------
 * - userName: Required (cannot be empty after trimming whitespace)
 * - title: Minimum 5 characters (after trimming whitespace)
 * - body: Between 10 and 300 characters (after trimming whitespace)
 *
 * ERROR HANDLING:
 * ---------------
 * - Validation errors are collected in an array
 * - All errors are displayed at once (not one at a time)
 * - User input is preserved when validation fails
 * - Form resets automatically when validation succeeds
 *
 * ACCESSIBILITY:
 * --------------
 * This form follows web accessibility best practices:
 * - Every input has an associated label (linked via htmlFor/id)
 * - Labels are visible (not placeholders only)
 * - Semantic HTML elements (form, label, input, textarea, button)
 * - Errors are displayed in a list for screen readers
 * - Error list has className="errors" for styling
 */
export function NewOpinion() {
  /**
   * ============================================================================
   * FORM ACTION FUNCTION: shareOpinionAction
   * ============================================================================
   *
   * This function is called automatically by React when the form is submitted.
   * It receives form data, validates it, and returns the new state.
   *
   * FUNCTION SIGNATURE:
   * -------------------
   * function shareOpinionAction(prevState, formData)
   *
   * CRITICAL: The parameter order is IMPORTANT and FIXED:
   * 1. prevState - The previous state (from the last action call)
   * 2. formData - The FormData object extracted from the form
   *
   * You CANNOT change this order or omit parameters. React always calls form
   * actions with these two parameters in this exact order.
   *
   * WHY prevState PARAMETER?
   * ------------------------
   * Even though we don't use prevState in this example, React always provides
   * it because:
   * - Some forms need to know the previous state to make decisions
   * - Example: Multi-step forms that need to track which step you're on
   * - Example: Forms that increment a counter or track submission attempts
   * - It maintains a consistent API across all form actions
   *
   * In our case, we ignore prevState because our validation is stateless - we
   * only care about the current form data, not what happened before.
   *
   * WHAT IS FormData?
   * -----------------
   * FormData is a built-in browser API that represents form field values as
   * key-value pairs. React automatically creates this object from your form
   * when it's submitted.
   *
   * Key features:
   * - formData.get('fieldName') - Gets the value of an input by its name attribute
   * - Automatically includes all inputs with name attributes
   * - Handles different input types (text, checkbox, radio, file, etc.)
   * - Does NOT include inputs without name attributes
   *
   * Example form:
   * <form>
   *   <input name="userName" value="Alice" />
   *   <input name="age" value="25" />
   *   <input value="ignored" />  ← No name, not in FormData
   * </form>
   *
   * Results in FormData:
   * formData.get('userName') → "Alice"
   * formData.get('age') → "25"
   *
   * RETURN VALUE:
   * -------------
   * This function must return an object that becomes the new formState.
   * You can structure this object however you want, but common patterns:
   *
   * - On validation failure: { errors: [...], enteredValues: {...} }
   * - On success: { errors: null }
   *
   * The returned object is what you access via formState in your JSX.
   */
  function shareOpinionAction(prevState, formData) {
    /**
     * STEP 1: EXTRACT FORM DATA
     * =========================
     * Use formData.get() to extract values from the form inputs.
     *
     * IMPORTANT DETAILS:
     * ------------------
     * - The string passed to get() MUST match the input's name attribute
     * - Returns the input's value as a STRING (always, even for numbers)
     * - Returns null if the field doesn't exist
     * - Returns empty string "" for empty inputs
     *
     * For our form:
     * <input name="title" /> → formData.get('title')
     * <input name="body" /> → formData.get('body')
     * <input name="userName" /> → formData.get('userName')
     *
     * WHY SEPARATE VARIABLES?
     * -----------------------
     * We extract to variables for:
     * - Readability (clearer what data we're working with)
     * - Validation logic (easier to reference multiple times)
     * - Error messages (can include values in error messages)
     *
     * ALTERNATIVE APPROACH:
     * ---------------------
     * You could also destructure if you prefer:
     * const { title, body, userName } = Object.fromEntries(formData);
     */
    const userName = formData.get('userName');
    const title = formData.get('title');
    const body = formData.get('body');

    /**
     * STEP 2: INITIALIZE ERRORS ARRAY
     * ================================
     * We collect all validation errors in an array so we can show them all
     * at once to the user.
     *
     * WHY AN ARRAY?
     * -------------
     * - Users should see ALL errors at once, not one at a time
     * - Example: If title AND body are invalid, show both errors
     * - Better UX than fixing one error, submitting, seeing another error
     *
     * ALTERNATIVE PATTERNS:
     * ---------------------
     * Some developers use an object to map field names to errors:
     * const errors = {};
     * if (title.length < 5) errors.title = 'Title too short';
     *
     * Both patterns work. Arrays are simpler when you just want to show
     * a list of error messages. Objects are better when you want to
     * display errors next to specific fields.
     */
    const errors = [];

    /**
     * STEP 3: VALIDATION LOGIC
     * ========================
     * Check each field against its validation rules and add error messages
     * if validation fails.
     *
     * VALIDATION PATTERN:
     * -------------------
     * if (condition that makes field INVALID) {
     *   errors.push('User-friendly error message');
     * }
     *
     * Notice we check for INVALID conditions, not valid ones.
     */

    /**
     * TITLE VALIDATION
     * ================
     * Rule: Title must be at least 5 characters long (after trimming whitespace)
     *
     * TRIM() EXPLANATION:
     * -------------------
     * trim() removes whitespace from both ends of a string:
     * "  hello  ".trim() → "hello"
     * "   ".trim() → ""
     *
     * Why trim?
     * - "     " (5 spaces) is 5 characters but isn't a real title
     * - Users might accidentally type spaces before/after their input
     * - Trimming ensures we validate the actual content, not whitespace
     *
     * LENGTH VALIDATION:
     * ------------------
     * .length property gives the number of characters in a string:
     * "React".length → 5
     * "Hi".length → 2
     *
     * We check if length < 5 (less than 5 characters).
     * If true, the title is too short, so we add an error.
     *
     * ERROR MESSAGE GUIDELINES:
     * -------------------------
     * - Clear: "Title must be at least five characters long"
     * - Specific: Tells user exactly what they need to do
     * - User-friendly: No technical jargon
     * - Actionable: User knows how to fix the problem
     */
    if (title.trim().length < 5) {
      errors.push('Title must be at least five characters long.');
    }

    /**
     * BODY VALIDATION
     * ===============
     * Rule: Opinion body must be between 10 and 300 characters (after trimming)
     *
     * COMPOUND CONDITION:
     * -------------------
     * We use || (OR) to check two conditions:
     * - body.trim().length < 10 → Too short
     * - body.trim().length > 300 → Too long
     *
     * If EITHER condition is true, the body is invalid.
     *
     * WHY MIN AND MAX LENGTHS?
     * ------------------------
     * - Minimum (10 chars): Ensures opinions have enough substance
     *   - "Great!" is too short to be meaningful
     *   - "I really enjoyed using this product" is better
     *
     * - Maximum (300 chars): Keeps opinions concise and prevents spam
     *   - Encourages focused feedback
     *   - Prevents users from posting entire essays
     *   - Makes the UI easier to scan
     *
     * ALTERNATIVE: SEPARATE VALIDATIONS
     * ----------------------------------
     * We could also write this as two separate if statements:
     * if (body.trim().length < 10) {
     *   errors.push('Opinion must be at least 10 characters long.');
     * }
     * if (body.trim().length > 300) {
     *   errors.push('Opinion must be no more than 300 characters long.');
     * }
     *
     * This provides more specific error messages but requires more code.
     * The current approach combines both checks into one error message.
     */
    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push('Opinion must be between 10 and 300 characters long.');
    }

    /**
     * USERNAME VALIDATION
     * ===================
     * Rule: Username is required (cannot be empty after trimming)
     *
     * FALSY CHECK:
     * ------------
     * !userName.trim() checks if the trimmed username is falsy.
     *
     * What's falsy?
     * - Empty string: "" (which is what trim() returns for "   ")
     * - null (if the field doesn't exist)
     * - undefined (if the field doesn't exist)
     *
     * Examples:
     * - userName = "Alice" → userName.trim() = "Alice" → !userName.trim() = false → Valid
     * - userName = "  " → userName.trim() = "" → !userName.trim() = true → Invalid
     * - userName = "" → userName.trim() = "" → !userName.trim() = true → Invalid
     *
     * WHY REQUIRE USERNAME?
     * ---------------------
     * - Opinions should be attributed to someone
     * - Even anonymous opinions need a display name
     * - Prevents empty submissions where we don't know who shared it
     *
     * ALTERNATIVE VALIDATION:
     * -----------------------
     * You could also use:
     * - userName.trim().length === 0 (more explicit)
     * - userName.trim() === '' (checks for empty string specifically)
     * - !userName?.trim() (with optional chaining for safety)
     */
    if (!userName.trim()) {
      errors.push('Please provide your name.');
    }

    /**
     * STEP 4: RETURN VALIDATION RESULT
     * =================================
     * Based on whether we have errors, return the appropriate state object.
     */

    /**
     * VALIDATION FAILED CASE
     * ======================
     * If there are any validation errors, return an object with:
     * - errors: Array of error messages to display
     * - enteredValues: Object containing the user's input
     *
     * WHY RETURN enteredValues?
     * -------------------------
     * When validation fails, we want to PRESERVE what the user typed so they
     * don't have to re-enter everything. Imagine this scenario:
     *
     * 1. User fills out entire form (userName, title, body)
     * 2. Title is too short (only 3 characters)
     * 3. Form is submitted, validation fails
     * 4. User sees error message
     *
     * WITHOUT enteredValues:
     * - Form resets to blank
     * - User has to re-type ALL fields (frustrating!)
     * - Even the fields that were valid (userName, body)
     *
     * WITH enteredValues:
     * - Form shows what user originally typed
     * - User only needs to fix the title field
     * - Much better user experience!
     *
     * HOW PRESERVATION WORKS:
     * -----------------------
     * 1. We return the values in this object
     * 2. React sets formState.enteredValues to this object
     * 3. In the JSX, we use defaultValue={formState.enteredValues?.title}
     * 4. The input shows the preserved value
     *
     * ERRORS.LENGTH > 0 CHECK:
     * ------------------------
     * This condition is true when at least one error was added to the array:
     * - [] → length = 0 → condition false (no errors)
     * - ['Error 1'] → length = 1 → condition true (has errors)
     * - ['Error 1', 'Error 2'] → length = 2 → condition true (has errors)
     */
    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          userName,
          title,
          body,
        },
      };
    }

    /**
     * VALIDATION SUCCEEDED CASE
     * =========================
     * If there are no validation errors (errors array is empty), return
     * an object with errors: null to indicate success.
     *
     * WHY RETURN { errors: null }?
     * ----------------------------
     * - Signals to the component that validation passed
     * - In the JSX, we check if formState.errors exists to show error messages
     * - null means "no errors", so error messages won't display
     *
     * WHY NOT RETURN enteredValues?
     * ------------------------------
     * When validation succeeds, we DON'T include enteredValues because:
     * - We want the form to RESET (clear all inputs)
     * - Without enteredValues, defaultValue props get undefined
     * - Undefined defaultValue means inputs show as empty
     * - This is the desired behavior after successful submission
     *
     * FORM RESET MECHANISM:
     * ---------------------
     * This is how form reset works with Form Actions:
     *
     * FAILURE:
     * return { errors: [...], enteredValues: {...} }
     * → formState.enteredValues exists
     * → defaultValue={formState.enteredValues?.title} has a value
     * → Input shows the value (preserved)
     *
     * SUCCESS:
     * return { errors: null }  (no enteredValues property)
     * → formState.enteredValues is undefined
     * → defaultValue={formState.enteredValues?.title} is undefined
     * → Input defaults to empty (form resets)
     *
     * FUTURE ENHANCEMENT:
     * -------------------
     * In the next lesson, we'll add backend submission here:
     * if (errors.length === 0) {
     *   await addOpinion({ userName, title, body });
     *   return { errors: null };
     * }
     *
     * For now, we just validate and return success.
     */
    return { errors: null };
  }

  /**
   * ============================================================================
   * useActionState HOOK USAGE
   * ============================================================================
   *
   * Now we use the useActionState hook to connect our action function to
   * the form and manage the state.
   *
   * HOOK CALL BREAKDOWN:
   * --------------------
   * const [formState, formAction] = useActionState(shareOpinionAction, { errors: null });
   *
   * ARGUMENT 1: shareOpinionAction
   * -------------------------------
   * - This is the action function we defined above
   * - React will call this function when the form is submitted
   * - React passes (prevState, formData) automatically
   * - The return value becomes the new formState
   *
   * ARGUMENT 2: { errors: null }
   * -----------------------------
   * - This is the INITIAL state before any form submissions
   * - formState starts as { errors: null }
   * - This means no errors are shown when the form first renders
   * - After the first submission, formState updates to whatever
   *   shareOpinionAction returns
   *
   * RETURN VALUE 1: formState
   * -------------------------
   * - The current state of the form action
   * - Initially: { errors: null }
   * - After failed validation: { errors: [...], enteredValues: {...} }
   * - After successful validation: { errors: null }
   * - Accessing formState triggers re-render when it changes
   *
   * RETURN VALUE 2: formAction
   * --------------------------
   * - A special wrapped version of shareOpinionAction
   * - This is what you pass to the form's action prop
   * - NOT shareOpinionAction directly (common mistake!)
   * - React wraps it with logic to:
   *   - Prevent default form submission
   *   - Extract FormData from the form
   *   - Call shareOpinionAction with (prevState, formData)
   *   - Update formState with the returned value
   *   - Trigger re-render
   *
   * COMMON MISTAKES:
   * ----------------
   * ✗ <form action={shareOpinionAction}>  // Wrong! Use formAction
   * ✓ <form action={formAction}>  // Correct!
   *
   * WHY CAN'T WE USE shareOpinionAction DIRECTLY?
   * ----------------------------------------------
   * Because shareOpinionAction expects (prevState, formData) parameters.
   * If you pass it directly to the form, it won't receive those parameters
   * correctly. formAction is the wrapped version that React provides to
   * handle all the plumbing.
   *
   * EXECUTION FLOW:
   * ---------------
   * 1. User clicks Submit button
   * 2. React calls formAction (not shareOpinionAction directly)
   * 3. formAction extracts FormData from the form
   * 4. formAction calls shareOpinionAction(currentFormState, formData)
   * 5. shareOpinionAction validates and returns new state
   * 6. formAction updates formState with the returned value
   * 7. Component re-renders with new formState
   * 8. Errors display (if any) or form resets (if successful)
   */
  const [formState, formAction] = useActionState(shareOpinionAction, {
    errors: null,
  });

  /**
   * COMPONENT RENDER
   * ================
   * Now we render the form with validation, error display, and input preservation.
   *
   * Key changes from Lesson 275:
   * - form has action={formAction} prop
   * - inputs have defaultValue to preserve user input
   * - error messages display before the submit button
   */
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>

      {/*
        FORM ELEMENT WITH ACTION PROP
        ==============================
        The main form element that collects user input and handles submission
        via Form Actions.

        THE action PROP:
        ----------------
        <form action={formAction}>

        This is the KEY part of React 19 Form Actions. By passing formAction
        to the action prop, we're telling React:
        - Call our shareOpinionAction function when this form is submitted
        - Extract the form data as FormData automatically
        - Manage the submission state
        - Trigger re-renders when the state changes

        HOW IT WORKS UNDER THE HOOD:
        -----------------------------
        1. User clicks Submit button (type="submit")
        2. Browser's default form submission is prevented by React
        3. React creates a FormData object from all inputs with 'name' attributes
        4. React calls: shareOpinionAction(currentFormState, formData)
        5. shareOpinionAction validates and returns new state
        6. React updates formState with the returned value
        7. Component re-renders with new formState
        8. UI updates (show errors or reset form)

        COMPARISON WITH TRADITIONAL onSubmit:
        --------------------------------------
        OLD WAY (React 18):
        <form onSubmit={handleSubmit}>
          function handleSubmit(e) {
            e.preventDefault();  ← Manual
            const data = new FormData(e.target);  ← Manual
            // validation logic
            setState(newState);  ← Manual
          }
        </form>

        NEW WAY (React 19):
        <form action={formAction}>
          function shareOpinionAction(prevState, formData) {
            // validation logic
            return newState;  ← React handles the rest
          }
        </form>

        PROGRESSIVE ENHANCEMENT:
        ------------------------
        Form Actions support progressive enhancement, meaning the form can
        work even without JavaScript in some cases (especially with Server
        Actions in Next.js). The browser would submit the form traditionally,
        but the server could still process it.

        UNCONTROLLED INPUTS WITH PARTIAL CONTROL:
        ------------------------------------------
        Our inputs are mostly uncontrolled (no value prop, no onChange),
        BUT we use defaultValue to provide initial values. This pattern
        combines the best of both worlds:
        - DOM manages the input's current value (uncontrolled)
        - We can set an initial value (defaultValue)
        - No re-renders on every keystroke (performance benefit)
        - We can reset the form by changing defaultValue (via formState)

        This is the recommended pattern for Form Actions.
      */}
      <form action={formAction}>
        {/*
          CONTROL ROW
          ===========
          A div that groups related inputs in a row (side by side).
          This is a common pattern for forms with multiple short fields.

          The CSS class "control-row" is styled to display children in a
          horizontal layout (probably using flexbox or grid).
        */}
        <div className="control-row">
          {/*
            USERNAME INPUT
            ==============
            Collects the user's name - who is sharing this opinion.

            STRUCTURE BREAKDOWN:
            --------------------
            <p className="control">  ← Wrapper for styling and spacing
              <label htmlFor="userName">  ← Label for accessibility
              <input id="userName" name="userName" />  ← The actual input
            </p>

            WHY <p> AS A WRAPPER?
            ---------------------
            The <p className="control"> serves as a wrapper for:
            - Consistent spacing between form fields
            - Styling hooks (via the "control" class)
            - Grouping label + input together

            Alternative wrappers you might see:
            - <div className="control">  (more common)
            - <fieldset> (for radio/checkbox groups)
            - Just label containing input (for inline inputs)

            THE LABEL ELEMENT:
            ------------------
            <label htmlFor="userName">Your Name</label>

            - htmlFor="userName" links this label to the input with id="userName"
            - When you click the label, it focuses the input
            - Screen readers announce the label when input is focused
            - This is crucial for accessibility

            Why "htmlFor" and not "for"?
            - In HTML, it's <label for="...">
            - In JSX, "for" is a reserved keyword (used in for loops)
            - So React uses "htmlFor" instead

            THE INPUT ELEMENT:
            ------------------
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />

            - type="text": Single-line text input (default, but explicit is good)
            - id="userName": Links to the label's htmlFor
            - name="userName": Key used when submitting form data
            - defaultValue: Preserves user input when validation fails

            THE defaultValue PROP:
            ----------------------
            defaultValue={formState.enteredValues?.userName}

            This is how we PRESERVE user input when validation fails.

            HOW IT WORKS:
            -------------
            1. Initial render (before any submission):
               - formState = { errors: null }
               - formState.enteredValues is undefined
               - formState.enteredValues?.userName is undefined
               - defaultValue={undefined} → input is empty

            2. User fills form and submits with invalid data:
               - shareOpinionAction returns { errors: [...], enteredValues: {...} }
               - formState = { errors: [...], enteredValues: { userName: "Alice", ... } }
               - formState.enteredValues?.userName is "Alice"
               - defaultValue={"Alice"} → input shows "Alice"
               - User's input is preserved!

            3. User fixes errors and submits successfully:
               - shareOpinionAction returns { errors: null }
               - formState = { errors: null }
               - formState.enteredValues is undefined again
               - defaultValue={undefined} → input resets to empty
               - Form is cleared!

            OPTIONAL CHAINING (?.) EXPLANATION:
            ------------------------------------
            The ?. operator safely accesses nested properties:

            WITHOUT optional chaining:
            formState.enteredValues.userName
            ↑ Error! If enteredValues is undefined, this throws:
            "Cannot read property 'userName' of undefined"

            WITH optional chaining:
            formState.enteredValues?.userName
            ↑ Safe! If enteredValues is undefined, returns undefined instead of throwing

            Flow:
            - formState.enteredValues exists → returns formState.enteredValues.userName
            - formState.enteredValues is undefined/null → returns undefined

            WHY defaultValue INSTEAD OF value?
            -----------------------------------
            Controlled (value):
            - <input value={state} onChange={handler} />
            - React manages the input's value
            - Input value is always in sync with state
            - Re-renders on every keystroke
            - More code (need onChange handler)

            Uncontrolled (defaultValue):
            - <input defaultValue={initialValue} />
            - DOM manages the input's value
            - Only sets the INITIAL value
            - No re-renders on typing
            - Less code (no onChange needed)
            - Perfect for Form Actions!

            FORM RESET MECHANISM:
            ---------------------
            React recognizes when defaultValue changes from a value to undefined,
            and it RESETS the input. This is how form reset works:

            After failed validation:
            defaultValue="Alice" → input shows "Alice"

            After successful submission (component re-renders):
            defaultValue=undefined → input clears to empty

            This automatic reset is one of the nicest features of Form Actions!
          */}
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          {/*
            TITLE INPUT
            ===========
            Collects a short title for the opinion.

            STRUCTURE:
            ----------
            This follows the same pattern as userName:
            - <p> wrapper with "control" class
            - <label> linked to input via htmlFor/id
            - <input> with name attribute for form submission

            PURPOSE:
            --------
            The title serves as a brief summary of the opinion, similar to:
            - Email subject lines
            - Forum post titles
            - Article headlines

            This helps users quickly scan the opinions list and decide what
            to read in full.

            ACCESSIBILITY:
            --------------
            The label "Title" clearly describes what the input is for.
            Screen reader users will hear "Title" when they focus this input.

            NAME ATTRIBUTE:
            ---------------
            name="title" means when submitted:
            { title: "user's entered title" }

            DEFAULTVALUE PROP:
            ------------------
            Just like the userName input, we add defaultValue to preserve the
            user's input when validation fails:

            defaultValue={formState.enteredValues?.title}

            This ensures that if the user enters an invalid title (too short),
            they don't have to re-type it - they can just fix it.
          */}
          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>

        {/*
          OPINION BODY TEXTAREA
          =====================
          Collects the full text of the opinion.

          WHY TEXTAREA INSTEAD OF INPUT?
          -------------------------------
          - <input type="text"> is for single-line, short text
          - <textarea> is for multi-line, longer text
          - Textarea is resizable and better for paragraphs

          For an opinion that might be several sentences or paragraphs,
          textarea is the appropriate choice.

          THE TEXTAREA ELEMENT:
          ---------------------
          <textarea id="body" name="body" rows={5}></textarea>

          - id="body": Links to the label's htmlFor
          - name="body": Key for form submission data
          - rows={5}: Initial height (5 lines of text visible)
          - Self-closing allowed in JSX: <textarea ... /> or <textarea></textarea>

          Note: In HTML, textarea content goes between tags:
          <textarea>default content</textarea>

          But in React, you can use a value prop instead:
          <textarea value={content} /> (for controlled components)

          Since we're using uncontrolled inputs with Form Actions, we just
          use an empty textarea and let the user fill it in.

          THE rows ATTRIBUTE:
          -------------------
          rows={5} sets the initial visible height to 5 lines.

          Why 5 rows?
          - Provides enough space for a paragraph
          - Not so large that it dominates the form
          - User can still resize if they need more space

          You might adjust this based on:
          - Typical opinion length
          - Available screen space
          - Mobile vs desktop layout

          JSX NUMBER ATTRIBUTES:
          ----------------------
          rows={5}  ← Correct (number in braces)
          rows="5"  ← Also works (string)
          rows=5    ← Incorrect (not valid JSX)

          In JSX, dynamic values (including numbers) go in {curly braces}.

          SPACING AND LAYOUT:
          -------------------
          This input is NOT in the control-row div, so it will display
          full-width below the userName and title inputs.

          This is common for longer inputs like textarea - they get their
          own row for more space.

          DEFAULTVALUE ON TEXTAREA:
          -------------------------
          Textareas also support defaultValue for preservation:

          defaultValue={formState.enteredValues?.body}

          In HTML, textareas use content between tags:
          <textarea>default content here</textarea>

          But in React, we use the defaultValue prop (just like inputs):
          <textarea defaultValue="default content" />

          Both syntaxes work in React, but defaultValue is preferred because:
          - Consistent with input elements
          - Clearer that it's a React-managed value
          - Easier to dynamically set (no need for children)

          The body field is especially important to preserve because users
          might write a long opinion (up to 300 characters), and losing that
          due to a validation error would be very frustrating.
        */}
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {/*
          ERROR DISPLAY SECTION
          =====================
          This section displays validation errors to the user if any exist.

          CONDITIONAL RENDERING:
          ----------------------
          {formState.errors && (
            <ul className="errors">...</ul>
          )}

          This only renders the error list if formState.errors is truthy.

          WHEN formState.errors IS TRUTHY:
          ---------------------------------
          - After failed validation: formState.errors = ['Error 1', 'Error 2']
          - Array is truthy, so the error list renders
          - User sees all validation errors

          WHEN formState.errors IS FALSY:
          --------------------------------
          - Initial render: formState = { errors: null } → null is falsy
          - After successful validation: formState = { errors: null } → null is falsy
          - Error list does NOT render
          - User sees no errors

          WHY USE && OPERATOR?
          --------------------
          The && operator is a common pattern for conditional rendering in React:
          - condition && <Element /> → renders Element only if condition is true
          - If condition is false, nothing is rendered (React skips it)

          Alternative approaches:
          - Ternary: {formState.errors ? <ul>...</ul> : null}
          - If statement: if (formState.errors) return <ul>...</ul>

          The && operator is the most concise for "render something or nothing".

          ERROR LIST STRUCTURE:
          ---------------------
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>

          - <ul> creates an unordered (bulleted) list
          - className="errors" allows CSS styling (probably red color, warning icon)
          - We map over the errors array to create <li> items

          MAPPING OVER ERRORS:
          --------------------
          formState.errors.map((error) => <li key={error}>{error}</li>)

          For each error string in the array, we create a list item:
          - Input: ['Error 1', 'Error 2', 'Error 3']
          - Output: [
              <li key="Error 1">Error 1</li>,
              <li key="Error 2">Error 2</li>,
              <li key="Error 3">Error 3</li>
            ]

          KEY PROP:
          ---------
          key={error}

          React requires a unique 'key' prop when rendering lists.
          We use the error message itself as the key because:
          - Each error message is unique
          - Error messages are stable (don't change)
          - We don't have error IDs

          Normally you'd use an ID (key={error.id}), but for simple string
          arrays, the string itself works fine as a key.

          ACCESSIBILITY:
          --------------
          Using <ul> and <li> for errors is good for accessibility:
          - Screen readers announce "List, 3 items" before reading errors
          - Users know how many errors there are
          - Semantic HTML communicates structure

          FUTURE ENHANCEMENT:
          -------------------
          For better accessibility, we could add:
          - <ul role="alert" aria-live="polite"> to announce errors immediately
          - aria-describedby on inputs to link them to their specific errors
          - Error icons or visual indicators for colorblind users

          PLACEMENT:
          ----------
          We show errors BEFORE the submit button so users see them before
          trying to submit again. This is a better UX than showing errors
          after the button.
        */}
        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        {/*
          FORM ACTIONS (SUBMIT BUTTON)
          =============================
          Contains the button to submit the form.

          THE <p className="actions"> WRAPPER:
          -------------------------------------
          This is a common pattern for form buttons:
          - Groups all action buttons together
          - The "actions" class likely styles it (centering, spacing, etc.)
          - Separates buttons from inputs visually

          In more complex forms, you might have multiple buttons here:
          <p className="actions">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
            <button type="reset">Clear Form</button>
          </p>

          THE SUBMIT BUTTON:
          ------------------
          <button type="submit">Submit</button>

          - type="submit": This is the key part!
          - When clicked, it triggers the form's submit event
          - With Form Actions, this will call the action function
          - Without an action, it would do a traditional form submission

          BUTTON TYPE ATTRIBUTE:
          ----------------------
          Always specify type on buttons inside forms:

          - type="submit" → Submits the form (what we want here)
          - type="button" → Does nothing by itself (for custom onClick handlers)
          - type="reset" → Clears all form inputs (rarely used)

          Why specify?
          If you don't specify type, browsers default to type="submit", which
          can cause accidental form submissions if you have multiple buttons.

          Example of a bug if you don't specify type:
          <button onClick={handleSomething}>Do Thing</button>
          ↑ This would ALSO submit the form! (unwanted)

          <button type="button" onClick={handleSomething}>Do Thing</button>
          ↑ This does NOT submit the form (correct)

          BUTTON CONTENT:
          ---------------
          "Submit" is clear and action-oriented. Alternatives:
          - "Share Opinion" (more specific to our app)
          - "Post" (shorter)
          - "Submit Opinion" (more explicit)

          WHAT HAPPENS ON CLICK (FUTURE LESSONS):
          ----------------------------------------
          Once we add Form Actions, clicking this button will:
          1. Trigger the form's action function
          2. React extracts all input values into a FormData object
          3. React calls our action function with the FormData
          4. Our action sends the data to the backend
          5. React shows loading state automatically
          6. If errors, our action returns them for display
          7. If success, we can reset the form or show confirmation

          LOADING STATE (COMING LATER):
          ------------------------------
          When using useActionState, React tracks whether the form is
          submitting. We can use that to:
          - Disable the button during submission
          - Show a spinner
          - Change the button text to "Submitting..."

          Example:
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        */}
        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS - LESSON 276
 * ============================================================================
 *
 * WHAT WE'VE IMPLEMENTED:
 * =======================
 * This component now demonstrates a complete Form Actions implementation with:
 * ✓ React 19 Form Actions (action prop on form)
 * ✓ useActionState hook for state management
 * ✓ Client-side validation logic (userName required, title min 5, body 10-300)
 * ✓ Error display components (ul with mapped error messages)
 * ✓ Form reset functionality (automatic on successful validation)
 * ✓ Input value preservation (defaultValue with formState.enteredValues)
 *
 * KEY CONCEPTS LEARNED:
 * =====================
 *
 * 1. FORM ACTION FUNCTIONS:
 *    - Function signature: (prevState, formData) => newState
 *    - Parameter order is fixed and required by React
 *    - Extract data with formData.get('fieldName')
 *    - Return state object with errors and/or enteredValues
 *
 * 2. useActionState HOOK:
 *    - const [formState, formAction] = useActionState(actionFn, initialState)
 *    - formState contains the current state (errors, enteredValues)
 *    - formAction is passed to form's action prop (NOT the action function itself)
 *    - React manages the submission flow automatically
 *
 * 3. FORM DATA EXTRACTION:
 *    - FormData API automatically extracts values from inputs with 'name' attributes
 *    - All values are strings (even numbers)
 *    - Only inputs with name attributes are included
 *    - Provides a clean interface for working with form data
 *
 * 4. VALIDATION PATTERN:
 *    - Collect errors in an array
 *    - Use .trim() to ignore leading/trailing whitespace
 *    - Check all fields and accumulate errors
 *    - Show all errors at once (better UX than one-at-a-time)
 *
 * 5. INPUT PRESERVATION WITH defaultValue:
 *    - defaultValue={formState.enteredValues?.fieldName}
 *    - Optional chaining (?.) prevents errors when enteredValues is undefined
 *    - When validation fails: defaultValue has a value → input shows it
 *    - When validation succeeds: defaultValue is undefined → input resets
 *    - This is uncontrolled (no value prop, no onChange)
 *
 * 6. FORM RESET MECHANISM:
 *    - On success: return { errors: null } WITHOUT enteredValues
 *    - formState.enteredValues becomes undefined
 *    - All defaultValue props evaluate to undefined
 *    - React clears the inputs automatically
 *    - No manual form.reset() needed!
 *
 * 7. ERROR DISPLAY:
 *    - Conditional rendering: {formState.errors && <ul>...</ul>}
 *    - Map over errors array to create list items
 *    - Use error message as key (acceptable for simple string arrays)
 *    - Show errors before submit button for better visibility
 *
 * COMPARISON WITH TRADITIONAL REACT (React 18):
 * ==============================================
 *
 * TRADITIONAL APPROACH (React 18):
 * --------------------------------
 * - useState for each input (userName, title, body)
 * - onChange handler for each input to update state
 * - onSubmit handler with e.preventDefault()
 * - Manual validation and error state management
 * - Manual form reset (setting each state to '')
 * - Re-renders on every keystroke
 * - ~50-80 lines of code for this functionality
 *
 * FORM ACTIONS APPROACH (React 19):
 * ----------------------------------
 * - No useState for input values
 * - No onChange handlers
 * - No e.preventDefault() needed
 * - One action function with all logic
 * - Automatic form reset (via defaultValue pattern)
 * - No re-renders on typing (only on submit)
 * - ~30-40 lines of actual logic (rest is comments)
 *
 * CODE REDUCTION: ~40-50% less code with cleaner separation of concerns
 *
 * UNCONTROLLED VS CONTROLLED INPUTS:
 * ==================================
 * This component uses UNCONTROLLED inputs with DEFAULT VALUES:
 * - No value prop (uncontrolled)
 * - No onChange handlers (uncontrolled)
 * - defaultValue prop (provides initial value)
 * - DOM manages the current value
 * - React reads the value on submission via FormData
 *
 * Benefits:
 * - Better performance (no re-renders on typing)
 * - Less code (no state management)
 * - Still get value preservation when needed
 * - Perfect match for Form Actions pattern
 *
 * VALIDATION RULES IMPLEMENTED:
 * ==============================
 * - userName: Required (cannot be empty after trimming)
 * - title: Minimum 5 characters (after trimming)
 * - body: Between 10 and 300 characters (after trimming)
 *
 * All validation uses .trim() to ignore whitespace, ensuring users can't
 * bypass validation with spaces.
 *
 * ACCESSIBILITY FEATURES:
 * =======================
 * ✓ Every input has a properly linked label (htmlFor/id)
 * ✓ Errors displayed in semantic <ul> list
 * ✓ Screen readers announce error list
 * ✓ Logical tab order maintained
 * ✓ Clear, descriptive error messages
 *
 * Future accessibility enhancements:
 * - aria-invalid on inputs when they have errors
 * - aria-describedby to link inputs to their specific errors
 * - aria-live region for announcing errors dynamically
 * - Error icons for colorblind users
 *
 * EXECUTION FLOW SUMMARY:
 * =======================
 * 1. User fills in form fields (userName, title, body)
 * 2. User clicks Submit button
 * 3. React prevents default browser submission
 * 4. React creates FormData from all inputs with name attributes
 * 5. React calls formAction (which calls shareOpinionAction)
 * 6. shareOpinionAction extracts and validates data
 * 7. IF VALIDATION FAILS:
 *    - Returns { errors: [...], enteredValues: {...} }
 *    - formState updates with errors and values
 *    - Component re-renders
 *    - Errors display, inputs preserve user input
 *    - User fixes errors and resubmits
 * 8. IF VALIDATION SUCCEEDS:
 *    - Returns { errors: null }
 *    - formState updates with no errors, no enteredValues
 *    - Component re-renders
 *    - No errors display, inputs reset to empty
 *    - Form is ready for new submission
 *
 * WHAT'S NEXT (LESSON 277):
 * ==========================
 * In the next lesson, we'll add backend integration:
 * - Use OpinionsContext's addOpinion function
 * - Send validated data to the backend
 * - Handle backend errors (network failures, server errors)
 * - Show success feedback to users
 * - Make the action async (await backend response)
 * - Optimistic updates (show opinion immediately, remove if backend fails)
 *
 * TESTING THIS COMPONENT:
 * =======================
 * Try these scenarios to see the validation in action:
 *
 * 1. Submit empty form:
 *    - See all 3 error messages
 *
 * 2. Enter short title (e.g., "Hi"):
 *    - See "Title must be at least five characters long"
 *    - Note: userName and body inputs preserve your values
 *
 * 3. Enter valid title but short body (e.g., "Hello"):
 *    - See "Opinion must be between 10 and 300 characters long"
 *
 * 4. Fill all fields correctly:
 *    - No errors display
 *    - Form resets (all inputs clear)
 *
 * 5. Test trimming by entering "     " (spaces) in any field:
 *    - Validation treats it as empty
 */
