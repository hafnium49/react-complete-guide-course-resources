// =============================================================================
// SIGNUP COMPONENT - Starting Point for Form Actions
// =============================================================================
//
// This is the Signup component that we'll be working with throughout this
// section. Currently, it's a basic form without any form handling logic.
//
// =============================================================================
// WHAT YOU'LL LEARN HERE
// =============================================================================
//
// In the lessons ahead, you'll learn how to transform this basic form into
// a form that uses React's form actions feature. You'll discover:
//
//   1. How to add a form action function
//   2. How to extract form values using form actions
//   3. How to handle form submission with form actions
//   4. How to manage form state and validation
//   5. How to work with asynchronous actions (like API calls)
//   6. How to implement optimistic updating
//
// =============================================================================
// CURRENT STATE OF THIS FORM
// =============================================================================
//
// Right now, this form is just a plain HTML form with:
//   - No form submission handler
//   - No value extraction logic
//   - No validation
//   - No state management
//
// If you click the "Sign up" button right now, the form will submit in the
// traditional HTML way (causing a page reload), which is NOT what we want
// in a React application.
//
// In the previous section, you learned how to handle this manually using:
//   - useState for controlled components
//   - useRef for uncontrolled components
//   - FormData API for extracting values
//   - Manual event.preventDefault() in onSubmit handlers
//
// In THIS section, you'll learn a DIFFERENT approach using React's built-in
// form actions feature, which can simplify form handling significantly!
//
// =============================================================================
// FORM STRUCTURE
// =============================================================================
//
// This signup form contains various types of form inputs:
//
//   TEXT INPUTS:
//   - Email (type="email")
//   - Password (type="password")
//   - Confirm Password (type="password")
//   - First Name (type="text")
//   - Last Name (type="text")
//
//   SELECT DROPDOWN:
//   - Role selection (Student, Teacher, Employee, Founder, Other)
//
//   CHECKBOXES:
//   - Multiple checkboxes for "How did you find us?" (can select multiple)
//   - Single checkbox for terms and conditions agreement
//
//   BUTTONS:
//   - Reset button (type="reset") - clears the form
//   - Sign up button (type="submit" by default) - submits the form
//
// Notice that all inputs have a `name` attribute. This is important because
// form actions (and the FormData API) use the `name` attribute to identify
// and extract values from form fields.
//
// =============================================================================
// WHY THIS FORM IS A GOOD LEARNING EXAMPLE
// =============================================================================
//
// This form is perfect for learning form actions because it includes:
//
//   ✓ Multiple input types (text, email, password, select, checkboxes)
//   ✓ Both single and multiple value inputs
//   ✓ A good mix of required and optional fields
//   ✓ Real-world complexity (not too simple, not too complex)
//
// As you learn form actions, you'll see how React's form actions feature
// can handle all of these input types elegantly.
//
// =============================================================================

export default function Signup() {
  // ===========================================================================
  // COMPONENT FUNCTION
  // ===========================================================================
  // Currently, this component is very simple - it just returns JSX for the form.
  //
  // In the upcoming lessons, we'll add:
  //   - A form action function
  //   - State management for form validation and feedback
  //   - Logic to handle form submission
  //   - Optimistic updating capabilities
  //
  // But for now, this is our starting point - a clean, simple form structure.
  // ===========================================================================

  return (
    <form>
      {/* =======================================================================
          FORM HEADER
          =======================================================================
          Welcome message and instructions for the user.
          ======================================================================= */}
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      {/* =======================================================================
          EMAIL INPUT
          =======================================================================
          Single email input field.
          
          Notice the `name="email"` attribute - this is crucial for form actions
          to be able to extract the value later.
          ======================================================================= */}
      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>

      {/* =======================================================================
          PASSWORD INPUTS
          =======================================================================
          Two password fields side by side:
          - Password: The user's chosen password
          - Confirm Password: To verify they typed it correctly
          
          Both have `name` attributes so we can extract their values.
          ======================================================================= */}
      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
          />
        </div>
      </div>

      <hr />

      {/* =======================================================================
          NAME INPUTS
          =======================================================================
          First name and last name fields, displayed side by side.
          ======================================================================= */}
      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      {/* =======================================================================
          ROLE SELECT DROPDOWN
          =======================================================================
          A dropdown menu for selecting the user's role.
          
          Note: The label says "What best describes your role?" but the
          `htmlFor` points to "role" (the select's id). This is correct.
          
          The select has `name="role"` so we can extract the selected value.
          ======================================================================= */}
      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* =======================================================================
          ACQUISITION CHECKBOXES (FIELD SET)
          =======================================================================
          A group of checkboxes for "How did you find us?"
          
          IMPORTANT: All checkboxes share the same `name="acquisition"` but have
          different `value` attributes. This means:
          - Users can select multiple options
          - When extracting values, we'll get an array of selected values
          - This is a common pattern for multi-select checkbox groups
          ======================================================================= */}
      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      {/* =======================================================================
          TERMS AND CONDITIONS CHECKBOX
          =======================================================================
          A single checkbox for agreeing to terms and conditions.
          
          Notice the structure: the input is INSIDE the label. This is valid
          HTML and means clicking the label text will also toggle the checkbox.
          
          The checkbox has `name="terms"` so we can check if it's checked.
          ======================================================================= */}
      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>

      {/* =======================================================================
          FORM ACTION BUTTONS
          =======================================================================
          Two buttons at the bottom of the form:
          
          1. RESET BUTTON (type="reset")
             - Has `type="reset"` which means it will clear all form fields
             - This is a native HTML feature - no JavaScript needed
             - Styled with "button-flat" class for a secondary appearance
          
          2. SIGN UP BUTTON (type="submit" by default)
             - No explicit `type` attribute, so it defaults to "submit"
             - This button will trigger form submission
             - Currently, this will cause a page reload (not what we want!)
             - In upcoming lessons, we'll use form actions to handle this properly
          ======================================================================= */}
      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}

// =============================================================================
// WHAT'S NEXT?
// =============================================================================
//
// In the upcoming lessons, you'll learn how to:
//
//   1. Add a form action function to handle form submission
//   2. Extract form values using form actions
//   3. Validate form data
//   4. Handle asynchronous operations (like API calls)
//   5. Implement optimistic updating for better user experience
//
// All of this will be done using React's form actions feature, which is
// built into React 19+. This approach can be simpler and more declarative
// than the manual form handling you learned in the previous section.
//
// Stay tuned for the next lessons where we'll transform this basic form
// into a fully functional form using React's form actions!
//
// =============================================================================
