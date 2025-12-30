/**
 * ============================================================================
 * LESSON 275: NEW OPINION FORM - INTRODUCTION TO FORM ACTIONS
 * ============================================================================
 *
 * This component renders a form where users can submit new opinions.
 * It demonstrates the HTML structure for React forms that will use Form Actions
 * (a React 19 feature) in upcoming lessons.
 *
 * KEY LEARNING OBJECTIVES:
 * ========================
 * 1. Building accessible HTML forms in React
 * 2. Understanding the foundation for React 19 Form Actions
 * 3. Proper use of labels, inputs, and form semantics
 * 4. Form structure that will support asynchronous submission
 *
 * CURRENT STATE (LESSON 275):
 * ===========================
 * In this introductory lesson, the form is a basic HTML form without:
 * - Form action handler
 * - State management for inputs
 * - Validation logic
 * - Error handling
 * - Loading states
 *
 * This is intentional - we're starting simple to understand the structure.
 *
 * WHAT'S COMING IN FUTURE LESSONS:
 * =================================
 * We will enhance this form to:
 * 1. Use React 19's Form Actions (action prop on <form>)
 * 2. Implement useActionState hook for managing form state
 * 3. Add validation (required fields, min/max lengths)
 * 4. Show error messages for invalid input
 * 5. Display loading states during submission
 * 6. Handle backend errors gracefully
 * 7. Reset the form after successful submission
 *
 * REACT 19 FORM ACTIONS PREVIEW:
 * ===============================
 * Form Actions are a new React 19 feature that simplifies form handling,
 * especially for forms that communicate with backends.
 *
 * Traditional approach (React 18):
 * --------------------------------
 * - Use useState for each input
 * - Handle onChange for each field
 * - Prevent default on submit
 * - Manually extract form data
 * - Manually manage loading/error states
 *
 * Form Actions approach (React 19):
 * ----------------------------------
 * - No state needed for input values
 * - No onChange handlers needed
 * - React automatically extracts FormData
 * - Built-in loading state management
 * - Cleaner, more declarative code
 *
 * Example of what we'll add:
 * <form action={submitOpinionAction}>
 *   {/* inputs with name attributes */}
 * </form>
 *
 * The action function will receive the form data automatically!
 */

/**
 * NEW OPINION COMPONENT
 * =====================
 * A form component for submitting new opinions to share with other users.
 *
 * FORM STRUCTURE:
 * ---------------
 * The form collects three pieces of information:
 * 1. userName - Who is sharing the opinion
 * 2. title - A short title summarizing the opinion
 * 3. body - The full opinion text
 *
 * This data will be sent to the backend to create a new opinion entry.
 *
 * ACCESSIBILITY:
 * --------------
 * This form follows web accessibility best practices:
 * - Every input has an associated label (linked via htmlFor/id)
 * - Labels are visible (not placeholders only)
 * - Semantic HTML elements (form, label, input, textarea, button)
 * - Proper input types (text for short inputs, textarea for long text)
 *
 * NAME ATTRIBUTES:
 * ----------------
 * Each input has a 'name' attribute that:
 * - Identifies the field when form data is submitted
 * - Will be used by Form Actions to extract the data
 * - Should match the backend API expectations
 *
 * For example: <input name="userName" />
 * When submitted, this creates: { userName: "value entered by user" }
 */
export function NewOpinion() {
  /**
   * COMPONENT RENDER
   * ================
   * Currently this component is purely presentational - it just renders
   * the form structure without any logic.
   *
   * In future lessons, we'll add:
   * - useActionState hook to manage form state
   * - Error display logic
   * - Loading state indicators
   * - Form reset after submission
   */
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>

      {/*
        FORM ELEMENT
        ============
        The main form element that will collect user input.

        CURRENT STATE:
        --------------
        Right now, this form has no action handler. If you click Submit,
        the browser would try to submit it traditionally (causing a page reload),
        which is NOT what we want in a React app.

        WHAT'S COMING:
        --------------
        In future lessons, we'll add an 'action' prop:

        <form action={submitOpinionAction}>

        Where submitOpinionAction is an async function that:
        1. Receives the form data automatically (as FormData object)
        2. Sends it to the backend
        3. Returns any errors or success state
        4. React manages the submission state for us

        BENEFITS OF FORM ACTIONS:
        --------------------------
        - No need for onSubmit + e.preventDefault()
        - No need for useState to track each input
        - No need for onChange handlers on inputs
        - React handles loading states automatically
        - Cleaner code with less boilerplate
        - Progressive enhancement (works without JS)

        UNCONTROLLED INPUTS:
        --------------------
        Notice we don't have value={} or onChange={} on any inputs.
        This makes them "uncontrolled" inputs - the DOM manages their values,
        not React state.

        With Form Actions, uncontrolled inputs are preferred because:
        - Less code (no state management needed)
        - Better performance (no re-renders on every keystroke)
        - Form Actions extract the values when submitted
        - Still get all the benefits of React for submission logic
      */}
      <form>
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
            <input type="text" id="userName" name="userName" />

            - type="text": Single-line text input (default, but explicit is good)
            - id="userName": Links to the label's htmlFor
            - name="userName": Key used when submitting form data

            The name attribute is CRUCIAL:
            When submitted, Form Actions will create an object like:
            { userName: "whatever the user typed" }

            NO VALUE OR ONCHANGE:
            ---------------------
            Notice we don't have:
            - value={userName} (making it uncontrolled)
            - onChange={handleChange} (no state to update)

            This is the Form Actions pattern - the form manages its own values
            until submission, then React extracts them all at once.

            VALIDATION (COMING LATER):
            --------------------------
            We could add HTML5 validation attributes like:
            - required (field must be filled)
            - minLength={3} (minimum 3 characters)
            - maxLength={50} (maximum 50 characters)
            - pattern="..." (must match regex)

            We'll add these in future lessons when implementing validation.
          */}
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" />
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
          */}
          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
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
        */}
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5}></textarea>
        </p>

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
 * SUMMARY & KEY CONCEPTS
 * ============================================================================
 *
 * WHAT WE'VE LEARNED:
 * ===================
 * 1. HTML FORM STRUCTURE: Proper semantic HTML with labels, inputs, and
 *    buttons creates accessible, user-friendly forms.
 *
 * 2. UNCONTROLLED INPUTS: With Form Actions, we don't need state for each
 *    input. The form manages values until submission.
 *
 * 3. ACCESSIBILITY: Every input has a properly linked label using htmlFor
 *    and id attributes. This helps all users, especially those using
 *    screen readers.
 *
 * 4. NAME ATTRIBUTES: The 'name' attribute on each input is crucial - it
 *    becomes the key in the form data object that Form Actions provide.
 *
 * 5. BUTTON TYPES: Always specify type on buttons in forms to control
 *    their behavior (submit vs button vs reset).
 *
 * UNCONTROLLED VS CONTROLLED:
 * ===========================
 * UNCONTROLLED (what we have here):
 * - No value prop on inputs
 * - No onChange handlers
 * - DOM manages the input values
 * - Values extracted on submission
 * - Simpler code, better performance
 * - Preferred with Form Actions
 *
 * CONTROLLED (traditional React):
 * - value={state} on inputs
 * - onChange={handler} to update state
 * - React manages the input values
 * - Re-render on every keystroke
 * - More code, more re-renders
 * - Needed for real-time validation, formatting
 *
 * FORM ACTIONS BENEFITS:
 * ======================
 * What we'll gain by using Form Actions in future lessons:
 * ✓ Automatic form data extraction (no manual e.target.value)
 * ✓ Built-in loading state management
 * ✓ Cleaner async handling
 * ✓ Progressive enhancement (works without JS)
 * ✓ Less boilerplate code
 * ✓ Better separation of concerns
 *
 * ACCESSIBILITY CHECKLIST:
 * ========================
 * ✓ Every input has a label
 * ✓ Labels are linked via htmlFor/id
 * ✓ Labels have descriptive text
 * ✓ Semantic HTML elements used
 * ✓ Button types specified
 * ✓ Logical tab order (top to bottom)
 *
 * Future accessibility improvements:
 * - Add aria-invalid when validation fails
 * - Add aria-describedby to link error messages
 * - Add required attributes for validation
 * - Add aria-live region for success messages
 *
 * NEXT STEPS:
 * ===========
 * In upcoming lessons, we'll enhance this form with:
 * 1. React 19 Form Actions (action prop on form)
 * 2. useActionState hook for state management
 * 3. Validation logic (required fields, length limits)
 * 4. Error display components
 * 5. Loading states during submission
 * 6. Success feedback after submission
 * 7. Form reset functionality
 * 8. Integration with OpinionsContext to add opinions
 *
 * DEVELOPMENT NOTE:
 * =================
 * If you try to submit this form in its current state, the browser will
 * attempt a traditional form submission (page reload). This is expected -
 * we'll prevent it and add proper handling in the next lessons.
 */
