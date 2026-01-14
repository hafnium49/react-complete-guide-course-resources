/**
 * ============================================================================
 * EVENT FORM COMPONENT (Lessons 358, 373, 375, 377, 378 - Form + Validation)
 * ============================================================================
 *
 * EVOLUTION OF THIS FILE:
 * =======================
 * Lesson 358: Pre-built component with basic form inputs
 * Lesson 373: Added defaultValue props for prepopulation in edit mode
 * Lesson 375: Replaced <form> with <Form> component for actions
 * Lesson 377: Added useNavigation for submission state feedback
 * Lesson 378: Added useActionData for validation error display (CURRENT)
 *
 * PRE-BUILT COMPONENT (Lesson 358):
 * =================================
 * INSTRUCTOR QUOTE:
 * "You will see that there I already added some components, which we'll use
 * throughout this section, in which you, of course, can explore. In the end,
 * these are all relatively straightforward components with some default
 * styling provided."
 *
 * This component provides a reusable form for both creating and editing events.
 * It demonstrates useNavigate for programmatic navigation.
 *
 * ============================================================================
 * LESSON 373: PREPOPULATING FORM FIELDS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "But now in the event form, we need to get access to the event data to
 * prepopulate these input fields here."
 *
 * INSTRUCTOR QUOTE:
 * "And that of course is done with help of the default value property. We
 * can add this to input elements in HTML and react to set the initial value
 * for such an input."
 *
 * INSTRUCTOR QUOTE:
 * "And this initial value now should be equal to event.title. Now event
 * could be undefined though, so it might be a good idea to add a question
 * mark to make sure that we only try to access this title property if
 * event is not null or undefined."
 *
 * ============================================================================
 * WHY defaultValue INSTEAD OF value? (Lesson 373)
 * ============================================================================
 *
 * Using defaultValue vs value:
 *
 * | Attribute     | Behavior                                          |
 * |---------------|---------------------------------------------------|
 * | defaultValue  | Sets initial value, user can freely edit          |
 * | value         | Controlled input, requires onChange + state       |
 *
 * INSTRUCTOR QUOTE:
 * "Default value property. We can add this to input elements in HTML and
 * react to set the initial value for such an input."
 *
 * defaultValue is the right choice because:
 * - We want to show the existing value as starting point
 * - User should be able to edit without needing onChange handlers
 * - No state management needed for simple prepopulation
 *
 * ============================================================================
 * useNavigate HOOK (React Router Feature)
 * ============================================================================
 *
 * Unlike <Link> which renders clickable links, useNavigate provides a function
 * for programmatic navigation - useful for:
 * - Navigating after form submissions
 * - Conditional navigation based on logic
 * - Cancel buttons that go back
 *
 * Usage:
 * ------
 * const navigate = useNavigate();
 *
 * // Navigate to a path
 * navigate('/events');
 *
 * // Navigate relatively (like Link's relative prop)
 * navigate('..');    // Go up one level
 * navigate('edit');  // Go to child route
 *
 * // Navigate with options
 * navigate('/events', { replace: true });  // Replace history entry
 *
 * ============================================================================
 * CANCEL HANDLER - RELATIVE NAVIGATION
 * ============================================================================
 *
 * The cancelHandler uses navigate('..') to go "back" one level:
 *
 * If current URL is /events/new:
 *   navigate('..') → /events
 *
 * If current URL is /events/e1/edit:
 *   navigate('..') → /events/e1
 *
 * This is similar to how relative paths work with <Link> (Lesson 356).
 *
 * ============================================================================
 * PROPS - Prepared for Later Lessons
 * ============================================================================
 *
 * @param {string} method - HTTP method ('POST' for new, 'PATCH' for edit)
 *                          Will be used in form actions (later lessons)
 *
 * @param {Object} event - Existing event data for edit mode
 *                         Used to pre-populate form fields
 *                         Will be undefined for NewEventPage
 *
 * USAGE:
 * ======
 * // In NewEventPage:
 * <EventForm method="POST" />
 *
 * // In EditEventPage:
 * <EventForm method="PATCH" event={existingEvent} />
 *
 * ============================================================================
 * FORM FIELDS
 * ============================================================================
 *
 * The form collects:
 * - title: Event title (text input)
 * - image: Event image URL (url input)
 * - date: Event date (date picker)
 * - description: Event description (textarea)
 *
 * All fields have 'name' attributes which will be used with:
 * - FormData API for extracting values
 * - React Router form actions (later lessons)
 *
 * ============================================================================
 * LESSON 375: REACT ROUTER'S <Form> COMPONENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Next, you should replace the form element with the special form component
 * which is provided by react-router-dom."
 *
 * INSTRUCTOR QUOTE:
 * "So you should import form from react-router-dom and then replace the
 * opening and the closing form tag with that form tag. It's the same tag,
 * but with a capital F at the beginning."
 *
 * WHY USE <Form> INSTEAD OF <form>? (Lesson 375):
 * ===============================================
 * INSTRUCTOR QUOTE:
 * "Now this form tag will make sure that the browser default of sending a
 * request to the backend will be omitted but it will take that request that
 * would've been sent and give it to your action."
 *
 * INSTRUCTOR QUOTE:
 * "And that's pretty useful because that request will contain all the data
 * that was submitted as part of the form."
 *
 * COMPARISON:
 * ===========
 * | Element  | Behavior                                              |
 * |----------|-------------------------------------------------------|
 * | <form>   | Browser sends request to backend (full page reload)   |
 * | <Form>   | React Router intercepts, passes to action function    |
 *
 * ============================================================================
 * THE method PROPERTY (Lesson 375)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Therefore, what you should do here is you should add the method property
 * and set this to post for example, though, this form component also supports
 * other HTTP methods like delete or patch, but here I'll choose post."
 *
 * INSTRUCTOR QUOTE:
 * "But this request and that's important, will not be sent to the backend
 * automatically, but instead to your action. And it will include all the
 * form data if you use this special form component."
 *
 * SUPPORTED METHODS:
 * ==================
 * - method="post"   → For creating new resources
 * - method="patch"  → For updating existing resources
 * - method="delete" → For deleting resources
 * - method="put"    → For replacing resources
 *
 * ============================================================================
 * IMPORTANCE OF name ATTRIBUTES (Lesson 375)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "For that, you should go to that form and make sure that all your inputs
 * have the name attribute because those names will later be used for
 * extracting the data."
 *
 * INSTRUCTOR QUOTE:
 * "So these names here must be set on all your inputs and text areas."
 *
 * The name attribute values are used when extracting data:
 * - data.get('title')       → Gets value from input name="title"
 * - data.get('image')       → Gets value from input name="image"
 * - data.get('date')        → Gets value from input name="date"
 * - data.get('description') → Gets value from textarea name="description"
 *
 * ============================================================================
 * LESSON 377: SUBMISSION STATE FEEDBACK WITH useNavigation
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Instead, I wanna use a hook that sounds familiar to useNavigate, but works
 * totally different, the useNavigation hook."
 *
 * INSTRUCTOR QUOTE:
 * "And that's a hook we already saw in action before. It's provided by React
 * Router and gives us access to a navigation object."
 *
 * WHY WE NEED THIS (Lesson 377):
 * ==============================
 * INSTRUCTOR QUOTE:
 * "And it would be nice to get some feedback and maybe also to disable the
 * save button so that users don't try to submit the same form multiple times."
 *
 * WHAT useNavigation PROVIDES (Lesson 377):
 * =========================================
 * INSTRUCTOR QUOTE:
 * "And we can extract various pieces of information from that object. For
 * example, all the data that was submitted. But we can also find out what
 * the current state of the currently active transition is."
 *
 * INSTRUCTOR QUOTE:
 * "And we have a transition from one route to another if we click a link.
 * But we also have a transition if we submit a form. And therefore, we also
 * get information about the current data submission process and whether it
 * completed already."
 *
 * useNavigate vs useNavigation:
 * =============================
 * | Hook           | Purpose                                              |
 * |----------------|------------------------------------------------------|
 * | useNavigate    | Returns a FUNCTION to navigate programmatically      |
 * | useNavigation  | Returns an OBJECT with current navigation STATE      |
 *
 * navigation.state VALUES (Lesson 377):
 * =====================================
 * | State       | Meaning                                               |
 * |-------------|-------------------------------------------------------|
 * | 'idle'      | No navigation or submission in progress               |
 * | 'loading'   | A route is being loaded (loader is running)           |
 * | 'submitting'| A form is being submitted (action is running)         |
 *
 * ============================================================================
 * LESSON 378: DISPLAYING VALIDATION ERRORS WITH useActionData
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "We can go to the event form component, which is in the end rendered by the
 * new event page component here. And in that event form component I can use
 * another provided by a react-router-dom."
 *
 * INSTRUCTOR QUOTE:
 * "And that's the use action data hook, which almost sounds like use loader
 * data, which is no coincidence because it does basically the same thing."
 *
 * useLoaderData vs useActionData:
 * ===============================
 * | Hook           | Gets data from                                      |
 * |----------------|-----------------------------------------------------|
 * | useLoaderData  | The closest route's LOADER function                 |
 * | useActionData  | The closest route's ACTION function                 |
 *
 * INSTRUCTOR QUOTE:
 * "It gives us access to the data returned by our action, in this case, not
 * by the loader, but by the action and it gives us access to the closest
 * action."
 *
 * WHY THIS WORKS IN A CHILD COMPONENT (Lesson 378):
 * =================================================
 * INSTRUCTOR QUOTE:
 * "So I can use this in this component here even though it's not the page
 * component because it's rendered by the page component for which this action
 * was defined where I return that response."
 *
 * AUTOMATIC RESPONSE PARSING (Lesson 378):
 * ========================================
 * INSTRUCTOR QUOTE:
 * "And if I return a response in an action this response is automatically
 * parsed by React router for me, just as it is the case for loaders."
 *
 * BACKEND VALIDATION ERROR FORMAT:
 * ================================
 * INSTRUCTOR QUOTE:
 * "And therefore here, this data is the data I return on my back-end in case
 * of validation errors. And that would be an object with a general message
 * and a nested errors object, which has different keys for the different
 * inputs with more detailed error messages."
 *
 * Expected data structure from backend when validation fails:
 * {
 *   message: "General error message",
 *   errors: {
 *     title: "Title is required",
 *     image: "Invalid image URL",
 *     date: "Date is required",
 *     description: "Description is required"
 *   }
 * }
 *
 * ============================================================================
 */
import { useNavigate, useNavigation, Form, useActionData } from 'react-router-dom';

import classes from './EventForm.module.css';

/**
 * EVENT FORM COMPONENT:
 * =====================
 * Reusable form for creating and editing events.
 *
 * Features:
 * - Cancel button with relative navigation
 * - Form fields for all event properties
 * - Prepared for form actions (later lessons)
 *
 * @param {Object} props
 * @param {string} props.method - HTTP method for submission
 * @param {Object} props.event - Existing event data (for edit mode)
 */
function EventForm({ method, event }) {
  /**
   * useNavigate HOOK:
   * =================
   * Returns a function for programmatic navigation.
   *
   * Unlike <Link> which creates clickable elements,
   * navigate() can be called from event handlers or effects.
   */
  const navigate = useNavigate();

  /**
   * ============================================================================
   * LESSON 377: useNavigation HOOK FOR SUBMISSION STATE
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Instead, I wanna use a hook that sounds familiar to useNavigate, but works
   * totally different, the useNavigation hook."
   *
   * INSTRUCTOR QUOTE:
   * "It's provided by React Router and gives us access to a navigation object."
   *
   * WHAT THE NAVIGATION OBJECT CONTAINS:
   * ====================================
   * INSTRUCTOR QUOTE:
   * "And we can extract various pieces of information from that object. For
   * example, all the data that was submitted. But we can also find out what
   * the current state of the currently active transition is."
   *
   * Properties of the navigation object:
   * | Property   | Type   | Description                                    |
   * |------------|--------|------------------------------------------------|
   * | state      | string | 'idle', 'loading', or 'submitting'             |
   * | formData   | Object | The submitted form data (if submitting)        |
   * | formAction | string | The action URL being submitted to              |
   * | formMethod | string | The HTTP method being used                     |
   * | location   | Object | The location being navigated to                |
   *
   * TRANSITIONS EXPLAINED (Lesson 377):
   * ===================================
   * INSTRUCTOR QUOTE:
   * "And we have a transition from one route to another if we click a link.
   * But we also have a transition if we submit a form. And therefore, we also
   * get information about the current data submission process and whether it
   * completed already."
   */
  const navigation = useNavigation();

  /**
   * ============================================================================
   * LESSON 377: isSubmitting HELPER CONSTANT
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "So here, we can add a helper constant called isSubmitting. And in there,
   * I simply store the result of comparing navigation.state to submitting."
   *
   * INSTRUCTOR QUOTE:
   * "If the current state is submitting, I know that we are currently submitting
   * data so that the action that was triggered is currently still active."
   *
   * STATE CHECK EXPLANATION:
   * ========================
   * navigation.state === 'submitting' is true when:
   * 1. User clicked the Save button
   * 2. <Form> created a request and sent it to the action
   * 3. The action is currently running (awaiting fetch, etc.)
   * 4. The action has NOT yet returned or redirected
   *
   * Once the action completes (returns redirect() or data):
   * - navigation.state changes to 'loading' (if loading new route)
   * - Then changes to 'idle' (when fully settled)
   */
  const isSubmitting = navigation.state === 'submitting';

  /**
   * ============================================================================
   * LESSON 378: useActionData HOOK FOR VALIDATION ERRORS
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "We can go to the event form component, which is in the end rendered by the
   * new event page component here. And in that event form component I can use
   * another provided by a react-router-dom. And that's the use action data hook."
   *
   * INSTRUCTOR QUOTE:
   * "It gives us access to the data returned by our action, in this case, not
   * by the loader, but by the action and it gives us access to the closest
   * action."
   *
   * WHAT DATA CONTAINS:
   * ===================
   * - undefined: If form hasn't been submitted yet, or action didn't return data
   * - Response data: If action returned a response (e.g., validation errors)
   *
   * INSTRUCTOR QUOTE:
   * "So with that, in event form, I get this data object here and if I return
   * a response in an action this response is automatically parsed by React
   * router for me, just as it is the case for loaders."
   *
   * WHY THIS WORKS HERE (Lesson 378):
   * =================================
   * INSTRUCTOR QUOTE:
   * "So I can use this in this component here even though it's not the page
   * component because it's rendered by the page component for which this action
   * was defined where I return that response."
   *
   * Component hierarchy:
   * - NewEventPage (has action registered) → renders EventForm
   * - EventForm can access the action's returned data via useActionData
   */
  const data = useActionData();

  /**
   * CANCEL HANDLER:
   * ===============
   * Navigates back one level using relative path '..'.
   *
   * From /events/new → /events
   * From /events/e1/edit → /events/e1
   *
   * This provides a "go back" behavior without using
   * browser history (navigate(-1) would use history).
   */
  function cancelHandler() {
    navigate('..');
  }

  return (
    /**
     * ================================================================
     * REACT ROUTER'S <Form> COMPONENT (Lesson 375)
     * ================================================================
     *
     * INSTRUCTOR QUOTE:
     * "Next, you should replace the form element with the special form
     * component which is provided by react-router-dom."
     *
     * INSTRUCTOR QUOTE:
     * "So you should import form from react-router-dom and then replace
     * the opening and the closing form tag with that form tag. It's the
     * same tag, but with a capital F at the beginning."
     *
     * KEY BEHAVIOR (Lesson 375):
     * ==========================
     * INSTRUCTOR QUOTE:
     * "Now this form tag will make sure that the browser default of sending
     * a request to the backend will be omitted but it will take that request
     * that would've been sent and give it to your action."
     *
     * INSTRUCTOR QUOTE:
     * "And that's pretty useful because that request will contain all the
     * data that was submitted as part of the form."
     *
     * THE method PROP (Lesson 375):
     * ============================
     * INSTRUCTOR QUOTE:
     * "Therefore, what you should do here is you should add the method
     * property and set this to post for example, though, this form component
     * also supports other HTTP methods like delete or patch."
     *
     * INSTRUCTOR QUOTE:
     * "But this request and that's important, will not be sent to the backend
     * automatically, but instead to your action. And it will include all the
     * form data if you use this special form component."
     *
     * HOW IT WORKS:
     * =============
     * 1. User fills form and clicks Save (submit)
     * 2. <Form> prevents browser's default submission
     * 3. <Form> creates a Request object with form data
     * 4. React Router finds the action for this route
     * 5. Action receives the Request via { request } parameter
     * 6. Action extracts data via request.formData()
     */
    <Form method="post" className={classes.form}>
      {/**
       * ================================================================
       * LESSON 378: VALIDATION ERROR DISPLAY
       * ================================================================
       *
       * INSTRUCTOR QUOTE:
       * "So therefore, here in event form inside of my form, for example,
       * I could check if data is set because it will not be set if we
       * haven't submitted the form yet, for example because that data is
       * coming from an action, you must not forget this."
       *
       * INSTRUCTOR QUOTE:
       * "So I check if I have data, if I submitted the form and the action
       * returns some data. And then I check if I have this errors object,
       * this nested errors object on my data."
       *
       * CONDITIONAL RENDERING EXPLAINED:
       * ================================
       * data && data.errors - Two checks:
       * 1. data must exist (form was submitted and action returned something)
       * 2. data.errors must exist (backend returned validation errors)
       *
       * If both are true, we display the error list.
       */}
      {data && data.errors && (
        /**
         * DISPLAYING ERROR MESSAGES (Lesson 378):
         * =======================================
         * INSTRUCTOR QUOTE:
         * "In which case I want to return or output an unordered list where
         * I then use Object.values, a function built into JavaScript to
         * basically loop through all my keys in this errors object and map
         * my data here, the data that's stored for these different keys
         * to list items."
         *
         * Object.values(data.errors) converts:
         * {
         *   title: "Title is required",
         *   image: "Invalid URL",
         *   date: "Date is required"
         * }
         *
         * Into an array:
         * ["Title is required", "Invalid URL", "Date is required"]
         *
         * Then .map() converts each string into a <li> element.
         *
         * INSTRUCTOR QUOTE:
         * "Every list item receives the special key prop which is expected
         * by React, and I set it equal to the error message I'm having here,
         * and I output the error message."
         */
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {/**
       * ================================================================
       * FORM INPUTS WITH PREPOPULATION (Lesson 373)
       * ================================================================
       *
       * INSTRUCTOR QUOTE:
       * "And that of course is done with help of the default value property.
       * We can add this to input elements in HTML and react to set the
       * initial value for such an input."
       *
       * Each input has:
       * - Accessible label with htmlFor/id pairing
       * - name attribute for form data extraction
       * - required attribute for basic validation
       * - defaultValue for prepopulation in edit mode (Lesson 373)
       *
       * OPTIONAL CHAINING (Lesson 373):
       * ===============================
       * INSTRUCTOR QUOTE:
       * "Now event could be undefined though, so it might be a good idea
       * to add a question mark to make sure that we only try to access
       * this title property if event is not null or undefined."
       *
       * event?.title means:
       * - If event is undefined → returns undefined (input shows empty)
       * - If event exists → returns event.title (input shows value)
       *
       * This allows the same form to work for both:
       * - NewEventPage (event is undefined, inputs are empty)
       * - EditEventPage (event exists, inputs are prepopulated)
       */}
      <p>
        <label htmlFor="title">Title</label>
        {/**
         * TITLE INPUT WITH defaultValue (Lesson 373):
         * ===========================================
         * INSTRUCTOR QUOTE:
         * "And this initial value now should be equal to event.title."
         */}
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ''}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        {/**
         * IMAGE INPUT WITH defaultValue (Lesson 373):
         * ===========================================
         * INSTRUCTOR QUOTE:
         * "And for image, it's event image. For date, it's event date."
         */}
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ''}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        {/**
         * DATE INPUT WITH defaultValue (Lesson 373):
         * ==========================================
         * INSTRUCTOR QUOTE:
         * "And for image, it's event image. For date, it's event date."
         */}
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ''}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        {/**
         * DESCRIPTION TEXTAREA WITH defaultValue (Lesson 373):
         * ====================================================
         * INSTRUCTOR QUOTE:
         * "And down here for description, it's also event description."
         */}
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ''}
        />
      </p>
      <div className={classes.actions}>
        {/**
         * CANCEL BUTTON (Updated in Lesson 377):
         * ======================================
         * type="button" prevents form submission.
         * onClick triggers programmatic navigation via useNavigate.
         *
         * INSTRUCTOR QUOTE (Lesson 377):
         * "We can do the same for the Cancel button, if we want to."
         *
         * Disabled while submitting to prevent users from navigating
         * away during an in-progress submission.
         */}
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        {/**
         * ================================================================
         * SAVE BUTTON WITH SUBMISSION STATE (Lessons 375, 377)
         * ================================================================
         *
         * LESSON 375 - BASIC BEHAVIOR:
         * ============================
         * Default type is "submit" - triggers form submission.
         *
         * With <Form> component:
         * When clicked, React Router:
         * 1. Prevents browser's default form submission
         * 2. Creates a Request object with all form data
         * 3. Calls the action function registered for this route
         * 4. Passes the Request to the action via { request } parameter
         *
         * LESSON 377 - SUBMISSION STATE FEEDBACK:
         * =======================================
         * INSTRUCTOR QUOTE:
         * "And we can use this isSubmitting field here to for example,
         * disable this Save button."
         *
         * DISABLING THE BUTTON (Lesson 377):
         * ==================================
         * INSTRUCTOR QUOTE:
         * "We can disable it by simply setting this to isSubmitting. So if
         * we are submitting, this button is disabled."
         *
         * WHY DISABLE:
         * ============
         * INSTRUCTOR QUOTE:
         * "And it would be nice to get some feedback and maybe also to
         * disable the save button so that users don't try to submit the
         * same form multiple times."
         *
         * CHANGING BUTTON TEXT (Lesson 377):
         * ==================================
         * INSTRUCTOR QUOTE:
         * "We can also change the text of the button and check if we are
         * submitting. In which case, I'll set the text to Submitting and
         * only otherwise, I'll set it to Save."
         *
         * USER FEEDBACK (Lesson 377):
         * ===========================
         * INSTRUCTOR QUOTE:
         * "And if I click Save, you see this changed to Submitting and I
         * now get some feedback that something's going on here which is
         * better than having no feedback at all."
         */}
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;
