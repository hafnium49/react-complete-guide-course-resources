// =============================================================================
// LESSON 265: BUILDING A REUSABLE INPUT COMPONENT
// =============================================================================
//
// WHY CREATE A REUSABLE INPUT COMPONENT?
// --------------------------------------
// In StateLogin.jsx, we have duplicate JSX code for email and password inputs:
//   - Same structure (div > label + input + error message)
//   - Same CSS classes (control, control-error)
//   - Same conditional rendering pattern for errors
//   - Only differences: label text, id, type, name, validation logic
//
// This duplication is a CODE SMELL indicating we should EXTRACT A COMPONENT.
//
// BENEFITS OF REUSABLE COMPONENTS:
// ---------------------------------
// ✓ DRY (Don't Repeat Yourself) - Write once, use everywhere
// ✓ Maintainability - Fix bugs in one place, affects all uses
// ✓ Consistency - All inputs have same structure and behavior
// ✓ Less code - Reduces JSX repetition
// ✓ Testability - Test one component instead of multiple instances
// ✓ Scalability - Easy to add new inputs (just use the component)
//
// BEFORE (StateLogin.jsx - duplicated code):
// ------------------------------------------
//   <div className="control">
//     <label htmlFor="email">Email</label>
//     <input id="email" type="email" ... />
//     <div className="control-error">
//       {emailIsInvalid && <p>Please enter a valid email.</p>}
//     </div>
//   </div>
//
//   <div className="control">
//     <label htmlFor="password">Password</label>
//     <input id="password" type="password" ... />
//     <div className="control-error">
//       {passwordIsInvalid && <p>Please enter a valid password.</p>}
//     </div>
//   </div>
//
// AFTER (using Input component - clean and reusable):
// ----------------------------------------------------
//   <Input
//     label="Email"
//     id="email"
//     type="email"
//     error={emailIsInvalid && "Please enter a valid email."}
//     ...
//   />
//
//   <Input
//     label="Password"
//     id="password"
//     type="password"
//     error={passwordIsInvalid && "Please enter a valid password."}
//     ...
//   />
//
// Much cleaner and easier to maintain!
//
// =============================================================================

// =============================================================================
// PROPS DESTRUCTURING AND FORWARDING - ADVANCED PATTERN
// =============================================================================
//
// This component uses an ADVANCED PATTERN called "props destructuring with
// rest operator and spreading".
//
// THE PATTERN:
// ------------
// export default function Input({ label, id, error, ...props }) {
//   return <input id={id} {...props} />
// }
//
// WHAT THIS DOES:
// ---------------
// 1. DESTRUCTURE specific props we need (label, id, error)
// 2. GATHER remaining props into ...props (rest operator)
// 3. SPREAD those remaining props onto the input element (...props)
//
// WHY THIS IS POWERFUL:
// ---------------------
// This allows us to accept ANY prop and forward it to the wrapped input!
//
// Example usage:
//   <Input
//     label="Email"        ← Destructured explicitly (used for label)
//     id="email"           ← Destructured explicitly (used for label htmlFor + input id)
//     error={someError}    ← Destructured explicitly (used for error message)
//     type="email"         ← Gathered in ...props, spread to input
//     name="email"         ← Gathered in ...props, spread to input
//     value={email}        ← Gathered in ...props, spread to input
//     onChange={handler}   ← Gathered in ...props, spread to input
//     onBlur={handler}     ← Gathered in ...props, spread to input
//     required             ← Gathered in ...props, spread to input
//     className="custom"   ← Gathered in ...props, spread to input
//   />
//
// The input element receives:
//   <input
//     id="email"           ← From destructured id prop
//     type="email"         ← From ...props spread
//     name="email"         ← From ...props spread
//     value={email}        ← From ...props spread
//     onChange={handler}   ← From ...props spread
//     onBlur={handler}     ← From ...props spread
//     required             ← From ...props spread
//     className="custom"   ← From ...props spread
//   />
//
// This makes our component EXTREMELY FLEXIBLE!
// We can use it with ANY input attributes without modifying the component.
//
// =============================================================================

export default function Input({ label, id, error, ...props }) {
  // ===========================================================================
  // COMPONENT PARAMETERS EXPLAINED
  // ===========================================================================
  //
  // EXPLICIT PROPS (Destructured):
  // -------------------------------
  // label: String - The text to display in the <label> element
  //        Example: "Email", "Password", "Username"
  //
  // id: String - The unique identifier for this input
  //     Used in TWO places:
  //       1. <label htmlFor={id}> - Connects label to input
  //       2. <input id={id}> - Identifies the input element
  //     Example: "email", "password", "username"
  //
  // error: String | Boolean - Error message to display
  //        If truthy (string), shows the error message
  //        If falsy (false, undefined, null), shows nothing
  //        Example: "Please enter a valid email."
  //
  // ...props: Object - ALL other props passed to this component
  //           These are automatically forwarded to the <input> element
  //           Examples:
  //             type="email"
  //             name="email"
  //             value={email}
  //             onChange={handleChange}
  //             onBlur={handleBlur}
  //             required
  //             minLength={6}
  //             className="my-custom-class"
  //
  // ===========================================================================
  // WHY DESTRUCTURE SOME PROPS EXPLICITLY?
  // ===========================================================================
  //
  // We could have done this instead:
  //   export default function Input(props) {
  //     return (
  //       <label htmlFor={props.id}>{props.label}</label>
  //       <input {...props} />
  //     )
  //   }
  //
  // But this has PROBLEMS:
  // ----------------------
  // 1. We'd forward 'label' to the input element
  //    <input label="Email" /> ← Invalid! Input doesn't have 'label' attribute
  //
  // 2. We'd forward 'error' to the input element
  //    <input error="Error message" /> ← Invalid! Input doesn't have 'error' attribute
  //
  // 3. The 'id' would only be on input, not used for htmlFor
  //
  // By DESTRUCTURING explicitly:
  // ----------------------------
  // ✓ We EXTRACT props we need for OUR component's logic (label, id, error)
  // ✓ We PREVENT those props from being forwarded to input
  // ✓ We can use them separately (label for <label>, id for htmlFor + id, error for error message)
  // ✓ Everything else goes to input via ...props
  //
  // ===========================================================================
  // THE REST OPERATOR (...props) EXPLAINED
  // ===========================================================================
  //
  // The ...props syntax in the parameter list is the REST OPERATOR.
  //
  // What it does:
  // -------------
  // Gathers all REMAINING props (after destructuring) into a single object.
  //
  // Example:
  //   <Input
  //     label="Email"      ← Destructured explicitly
  //     id="email"         ← Destructured explicitly
  //     error={someError}  ← Destructured explicitly
  //     type="email"       ← Goes into ...props
  //     name="email"       ← Goes into ...props
  //     value={email}      ← Goes into ...props
  //     onChange={fn}      ← Goes into ...props
  //   />
  //
  // Inside the component, props object contains:
  //   {
  //     type: "email",
  //     name: "email",
  //     value: email,
  //     onChange: fn
  //   }
  //
  // Notice that label, id, and error are NOT in props!
  // They were destructured separately.
  //
  // ===========================================================================
  // THE SPREAD OPERATOR ({...props}) EXPLAINED
  // ===========================================================================
  //
  // The {...props} syntax in the JSX is the SPREAD OPERATOR.
  //
  // What it does:
  // -------------
  // Takes all properties from the props object and sets them as attributes
  // on the element.
  //
  // Example:
  //   const props = {
  //     type: "email",
  //     name: "email",
  //     value: "test@test.com",
  //     onChange: handleChange
  //   };
  //
  //   <input {...props} />
  //
  // Is equivalent to:
  //   <input
  //     type="email"
  //     name="email"
  //     value="test@test.com"
  //     onChange={handleChange}
  //   />
  //
  // WHY USE SPREAD?
  // ---------------
  // Instead of manually writing:
  //   <input
  //     type={props.type}
  //     name={props.name}
  //     value={props.value}
  //     onChange={props.onChange}
  //     onBlur={props.onBlur}
  //     ... (dozens of possible props!)
  //   />
  //
  // We can just write:
  //   <input {...props} />
  //
  // This is MUCH cleaner and handles ANY props we might pass in the future!
  //
  // ===========================================================================
  // REST vs SPREAD - SAME SYNTAX, DIFFERENT MEANING
  // ===========================================================================
  //
  // The ... syntax has TWO meanings depending on context:
  //
  // 1. REST OPERATOR (in function parameters or destructuring):
  //    Gathers multiple items into an array/object
  //
  //    function myFunc({ a, b, ...rest }) {
  //      // rest contains all props except 'a' and 'b'
  //    }
  //
  // 2. SPREAD OPERATOR (in JSX or expressions):
  //    Expands an array/object into individual items
  //
  //    <input {...props} />
  //    // Spreads all properties from props object onto input element
  //
  // In this component:
  //   - ...props in parameter = REST (gathering)
  //   - {...props} in JSX = SPREAD (expanding)
  //
  // ===========================================================================

  return (
    <div className="control no-margin">
      {/* =====================================================================
          LABEL ELEMENT
          =====================================================================

          WHY USE htmlFor?
          ----------------
          The htmlFor attribute connects the label to the input.

          When you click the label text, it focuses the associated input!

          This is important for:
            ✓ Usability - Users can click label to focus input (bigger target)
            ✓ Accessibility - Screen readers announce which input the label describes
            ✓ UX - Clear association between label and input

          htmlFor vs for:
          ---------------
          In plain HTML, you'd use 'for':
            <label for="email">Email</label>

          In React/JSX, you use 'htmlFor' (because 'for' is a JavaScript keyword):
            <label htmlFor="email">Email</label>

          The value of htmlFor must MATCH the id of the input!

          Example:
            <label htmlFor="email">Email</label>  ← htmlFor="email"
            <input id="email" />                  ← id="email"
            // Now they're connected!

          DYNAMIC VALUE FROM PROPS:
          -------------------------
          We use {id} here, which comes from props.

          So if we use the component like:
            <Input id="email" label="Email" />

          It renders as:
            <label htmlFor="email">Email</label>
            <input id="email" />

          If we use:
            <Input id="password" label="Password" />

          It renders as:
            <label htmlFor="password">Password</label>
            <input id="password" />

          This makes the component reusable for any input!

          ===================================================================== */}
      <label htmlFor={id}>{label}</label>

      {/* =====================================================================
          INPUT ELEMENT - WITH PROPS FORWARDING
          =====================================================================

          THE MAGIC OF {...props}:
          ------------------------
          This single line forwards ALL props (except label, id, error) to input!

          WHAT GETS FORWARDED:
          --------------------
          When we use the Input component like this:

            <Input
              label="Email"
              id="email"
              type="email"           ← Forwarded to input
              name="email"           ← Forwarded to input
              value={email}          ← Forwarded to input
              onChange={handleChange} ← Forwarded to input
              onBlur={handleBlur}    ← Forwarded to input
              required               ← Forwarded to input
            />

          The input element receives:

            <input
              id="email"             ← Explicitly set
              type="email"           ← From ...props
              name="email"           ← From ...props
              value={email}          ← From ...props
              onChange={handleChange} ← From ...props
              onBlur={handleBlur}    ← From ...props
              required               ← From ...props
            />

          WHY id IS SET EXPLICITLY:
          -------------------------
          Even though id could be forwarded via ...props, we set it explicitly
          for TWO reasons:

          1. CLARITY - Makes it obvious that id is used here
          2. DUAL PURPOSE - We use id for BOTH:
               - The <input id={id}> attribute
               - The <label htmlFor={id}> attribute

          If we only relied on ...props spreading, the id would only go to input.
          We wouldn't be able to use it for htmlFor without extra logic.

          FLEXIBILITY OF THIS APPROACH:
          ------------------------------
          This component now works with ANY input attributes!

          Example 1: Text input
            <Input
              label="Name"
              id="name"
              type="text"
              maxLength={50}    ← Works! Forwarded automatically
              placeholder="John Doe"  ← Works! Forwarded automatically
            />

          Example 2: Number input
            <Input
              label="Age"
              id="age"
              type="number"
              min={0}           ← Works! Forwarded automatically
              max={120}         ← Works! Forwarded automatically
              step={1}          ← Works! Forwarded automatically
            />

          Example 3: With validation attributes
            <Input
              label="Email"
              id="email"
              type="email"
              required          ← Works! Forwarded automatically
              pattern="[^@]+@[^@]+\.[^@]+"  ← Works! Forwarded automatically
            />

          We NEVER need to modify the Input component!
          Any valid input attribute will work automatically!

          COMMON PROPS THAT GET FORWARDED:
          --------------------------------
          - type (text, email, password, number, etc.)
          - name (form field name)
          - value (controlled component value)
          - onChange (change handler)
          - onBlur (blur handler)
          - onFocus (focus handler)
          - placeholder (placeholder text)
          - required (validation)
          - minLength / maxLength (validation)
          - min / max (for numbers)
          - step (for numbers)
          - pattern (regex validation)
          - disabled (disable input)
          - readOnly (make input read-only)
          - autoComplete (browser autocomplete)
          - autoFocus (focus on mount)
          - className (custom CSS classes - can add more!)
          - style (inline styles)
          - ... and ANY other valid input attribute!

          PROP MERGING BEHAVIOR:
          ----------------------
          If we set a prop both explicitly AND in ...props, the LAST one wins.

          Example:
            <input
              id="explicit"
              {...props}    // If props has id: "from-props"
            />
            // Result: id="from-props" (props override explicit)

            <input
              {...props}    // If props has id: "from-props"
              id="explicit"
            />
            // Result: id="explicit" (explicit overrides props)

          In our case, we put id BEFORE ...props:
            <input id={id} {...props} />

          So if someone passes id in props, it would override our id.
          But that's okay! It gives flexibility if needed.

          ===================================================================== */}
      <input id={id} {...props} />

      {/* =====================================================================
          ERROR MESSAGE DISPLAY
          =====================================================================

          CONDITIONAL RENDERING WITH && OPERATOR:
          ----------------------------------------
          We only show the error message if the 'error' prop is truthy.

          How it works:
            {error && <p>{error}</p>}

          If error is FALSY (false, null, undefined, ''):
            - React evaluates: false && <p>...</p>
            - Result: false (nothing rendered)
            - No error message appears

          If error is TRUTHY (any non-empty string):
            - React evaluates: "Error message" && <p>...</p>
            - Result: <p>Error message</p>
            - Error message appears

          USAGE EXAMPLES:
          ---------------
          Example 1: No error
            <Input
              label="Email"
              id="email"
              error={false}    ← error is false
            />
            // No error message rendered

          Example 2: With error
            <Input
              label="Email"
              id="email"
              error="Please enter a valid email."  ← error is a string
            />
            // Renders: <p>Please enter a valid email.</p>

          Example 3: Conditional error (common pattern)
            <Input
              label="Email"
              id="email"
              error={emailIsInvalid && "Please enter a valid email."}
            />

            If emailIsInvalid is false:
              error = false && "..." = false
              → No error rendered

            If emailIsInvalid is true:
              error = true && "..." = "Please enter a valid email."
              → Error rendered

          WHY USE error PROP INSTEAD OF PASSING BOOLEAN?
          -----------------------------------------------
          We could have done:
            <Input
              label="Email"
              id="email"
              isInvalid={emailIsInvalid}
              errorMessage="Please enter a valid email."
            />

          But our approach is BETTER:
            <Input
              label="Email"
              id="email"
              error={emailIsInvalid && "Please enter a valid email."}
            />

          Why?
          ----
          ✓ ONE prop instead of two
          ✓ Condition and message in one place (where component is used)
          ✓ More flexible (parent decides when to show error)
          ✓ Cleaner component API

          ALTERNATIVE PATTERNS:
          ---------------------
          Pattern 1: Separate boolean and message (more verbose)
            <Input
              label="Email"
              id="email"
              isInvalid={emailIsInvalid}
              errorMessage="Please enter a valid email."
            />

            // In component:
            {isInvalid && <p>{errorMessage}</p>}

          Pattern 2: Pass error object (for complex cases)
            <Input
              label="Email"
              id="email"
              error={{
                isInvalid: emailIsInvalid,
                message: "Please enter a valid email.",
                severity: "error"
              }}
            />

            // In component:
            {error?.isInvalid && (
              <p className={error.severity}>
                {error.message}
              </p>
            )}

          Pattern 3: Our approach (simplest)
            <Input
              label="Email"
              id="email"
              error={emailIsInvalid && "Please enter a valid email."}
            />

            // In component:
            {error && <p>{error}</p>}

          For most cases, our approach is the best balance of simplicity
          and flexibility!

          CSS STYLING:
          ------------
          The 'control-error' class is defined in the project's CSS.
          It typically:
            - Makes text red
            - Adds spacing above/below
            - Uses smaller font size
            - Shows error icon (if CSS includes it)

          The error message styling is consistent across all uses of this
          component, ensuring a uniform UX!

          ===================================================================== */}
      <div className="control-error">
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

// =============================================================================
// COMPONENT REUSABILITY - BEST PRACTICES
// =============================================================================
//
// This Input component demonstrates EXCELLENT reusability practices:
//
// 1. SINGLE RESPONSIBILITY
//    ------------------------
//    Does ONE thing: Renders a labeled input with error handling
//    Doesn't handle validation, state management, or business logic
//    That's the parent component's job!
//
// 2. COMPOSABLE
//    -----------
//    Can be used in ANY form, with ANY validation strategy
//    Works with state, refs, FormData - doesn't care!
//
// 3. CONFIGURABLE
//    ------------
//    Accepts any prop needed for an input
//    No hard-coded values (all via props)
//
// 4. CONSISTENT
//    -----------
//    All inputs using this component have the same structure
//    Same error display pattern
//    Same CSS classes
//
// 5. MAINTAINABLE
//    ------------
//    To change error styling for ALL inputs, modify ONE component
//    To add a feature (e.g., hint text), add it in ONE place
//
// 6. TESTABLE
//    ---------
//    Easy to test in isolation
//    Test once, confident it works everywhere
//
// 7. SCALABLE
//    ---------
//    Need 50 inputs in a form? No problem!
//    Just use <Input /> 50 times with different props
//
// =============================================================================
// WHEN TO CREATE REUSABLE COMPONENTS?
// =============================================================================
//
// CREATE A COMPONENT WHEN:
// ------------------------
// ✓ Same JSX structure appears 2+ times
// ✓ Same behavior needed in multiple places
// ✓ You want consistency across similar elements
// ✓ Code is becoming difficult to maintain
// ✓ You're copying/pasting JSX
//
// DON'T OVER-ENGINEER:
// --------------------
// ✗ Don't create components for truly unique, one-off elements
// ✗ Don't create components too early (wait for duplication)
// ✗ Don't make components too abstract (hard to understand)
//
// RULE OF THREE:
// --------------
// If you use the same code 3 times, consider extracting a component.
//
// =============================================================================
// PROPS FORWARDING PATTERNS
// =============================================================================
//
// PATTERN 1: Forward specific props (explicit)
// ---------------------------------------------
// export default function Input(props) {
//   return (
//     <input
//       type={props.type}
//       name={props.name}
//       value={props.value}
//       onChange={props.onChange}
//     />
//   );
// }
//
// Pros: ✓ Very explicit, easy to understand
// Cons: ✗ Must update component for every new prop
//       ✗ Verbose
//       ✗ Not flexible
//
// PATTERN 2: Forward all props (simple spread)
// --------------------------------------------
// export default function Input(props) {
//   return <input {...props} />;
// }
//
// Pros: ✓ Very simple
//       ✓ Forwards everything automatically
// Cons: ✗ Can't use props for component logic (e.g., label, error)
//       ✗ Might forward props that shouldn't go to input
//
// PATTERN 3: Destructure + rest + spread (BEST - what we use!)
// -------------------------------------------------------------
// export default function Input({ label, id, error, ...props }) {
//   return (
//     <>
//       <label htmlFor={id}>{label}</label>
//       <input id={id} {...props} />
//       {error && <p>{error}</p>}
//     </>
//   );
// }
//
// Pros: ✓ Use some props for component logic (label, id, error)
//       ✓ Forward remaining props automatically
//       ✓ Flexible and maintainable
//       ✓ Prevents invalid props from reaching input
// Cons: ✗ Slightly more complex (but worth it!)
//
// This is the RECOMMENDED pattern for wrapper components!
//
// =============================================================================
// USAGE EXAMPLES
// =============================================================================
//
// Example 1: Basic email input
// -----------------------------
// <Input
//   label="Email"
//   id="email"
//   type="email"
//   name="email"
//   value={email}
//   onChange={(e) => setEmail(e.target.value)}
// />
//
// Example 2: Password with validation
// ------------------------------------
// <Input
//   label="Password"
//   id="password"
//   type="password"
//   name="password"
//   value={password}
//   onChange={(e) => setPassword(e.target.value)}
//   onBlur={() => setTouched(true)}
//   error={touched && password.length < 6 && "Password too short"}
// />
//
// Example 3: Number input with constraints
// -----------------------------------------
// <Input
//   label="Age"
//   id="age"
//   type="number"
//   name="age"
//   value={age}
//   onChange={(e) => setAge(e.target.value)}
//   min={0}
//   max={120}
//   required
// />
//
// Example 4: Text input with built-in validation
// -----------------------------------------------
// <Input
//   label="Username"
//   id="username"
//   type="text"
//   name="username"
//   value={username}
//   onChange={(e) => setUsername(e.target.value)}
//   pattern="[a-zA-Z0-9]+"
//   minLength={3}
//   maxLength={20}
//   required
//   error={usernameError}
// />
//
// Example 5: Controlled input with blur validation
// -------------------------------------------------
// <Input
//   label="Email"
//   id="email"
//   type="email"
//   name="email"
//   value={enteredValues.email}
//   onChange={(event) => handleInputChange('email', event.target.value)}
//   onBlur={() => handleInputBlur('email')}
//   error={emailIsInvalid && "Please enter a valid email."}
// />
//
// =============================================================================
