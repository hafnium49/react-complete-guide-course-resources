/**
 * ============================================================================
 * EVENT FORM COMPONENT (Lessons 358, 373, 375 - Pre-built + Prepopulation + Form)
 * ============================================================================
 *
 * EVOLUTION OF THIS FILE:
 * =======================
 * Lesson 358: Pre-built component with basic form inputs
 * Lesson 373: Added defaultValue props for prepopulation in edit mode
 * Lesson 375: Replaced <form> with <Form> component for actions (CURRENT)
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
 */
import { useNavigate, Form } from 'react-router-dom';

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
         * CANCEL BUTTON:
         * ==============
         * type="button" prevents form submission.
         * onClick triggers programmatic navigation via useNavigate.
         */}
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        {/**
         * SAVE BUTTON (Lesson 375):
         * =========================
         * Default type is "submit" - triggers form submission.
         *
         * With <Form> component (Lesson 375):
         * ==================================
         * When clicked, React Router:
         * 1. Prevents browser's default form submission
         * 2. Creates a Request object with all form data
         * 3. Calls the action function registered for this route
         * 4. Passes the Request to the action via { request } parameter
         *
         * The action can then:
         * - Extract data via request.formData()
         * - Send HTTP request to backend
         * - Return redirect() to navigate after success
         */}
        <button>Save</button>
      </div>
    </Form>
  );
}

export default EventForm;
