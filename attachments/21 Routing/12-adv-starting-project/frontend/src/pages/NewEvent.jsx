/**
 * ============================================================================
 * NEW EVENT PAGE COMPONENT (Lessons 360, 374 - Task 1 + EventForm + Actions Intro)
 * ============================================================================
 *
 * EVOLUTION OF THIS FILE:
 * =======================
 * Lesson 360: Basic page with placeholder content (Task 1 solution)
 * Lesson 374: Added EventForm and introduced action concept (CURRENT)
 *
 * TASK 1 SOLUTION (Lesson 360):
 * =============================
 * INSTRUCTOR QUOTE:
 * "And then also my EventsPage, EventDetailPage, NewEventPage, and EditEventPage."
 *
 * INSTRUCTOR QUOTE:
 * "And the same will be done for NewEvent. It's the NewEventPage, like this."
 *
 * ============================================================================
 * LESSON 374: SENDING DATA TO THE BACKEND - INTRODUCTION TO ACTIONS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Okay. Finally, now that we loaded a lot of data in a lot of different ways,
 * and that we now hopefully get the hang of how loading data works with React
 * Router, it's time to also send data to the backend."
 *
 * INSTRUCTOR QUOTE:
 * "Because we, for example, get this edit form here, but we could also be
 * adding a new event. And for that, of course, we wanna display a form here,
 * as well, and then ultimately send the data from that form to this dummy
 * backend which we have here."
 *
 * ============================================================================
 * ADDING THE EVENTFORM (Lesson 374)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, I'll start by displaying the form. For that I'll use that same event
 * form component, here in my new event JS file."
 *
 * INSTRUCTOR QUOTE:
 * "Here we just return event form and include that import to that component,
 * of course."
 *
 * INSTRUCTOR QUOTE:
 * "Now, if we visit new event, we see that same form as we saw before when we
 * clicked edit, but, of course, without any pre-filled data, because this is
 * a new event which we add here."
 *
 * DIFFERENCE BETWEEN NewEvent AND EditEvent:
 * ==========================================
 * | Page         | EventForm props         | Form state              |
 * |--------------|-------------------------|-------------------------|
 * | NewEventPage | No event prop           | Empty fields            |
 * | EditEventPage| event={data.event}      | Pre-filled with data    |
 *
 * ============================================================================
 * THE GOAL: SEND FORM DATA TO BACKEND (Lesson 374)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, we wanna make sure that whenever we click that save button, and we
 * enter in some data here, that data is sent to the backend API."
 *
 * INSTRUCTOR QUOTE:
 * "How can we do that? Well, there are different approaches."
 *
 * ============================================================================
 * THE TRADITIONAL APPROACH (NOT RECOMMENDED WITH REACT ROUTER) - Lesson 374
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "We could add a function here in our new event page component, and give
 * the function a name like Submit Handler, accept an event here, and that
 * event would be the submit event of our form, and we could call prevent
 * default to make sure that the browser does not automatically send a
 * request to the backend."
 *
 * INSTRUCTOR QUOTE:
 * "And then we could extract data from the form with help of two-way binding,
 * or refs, for example."
 *
 * INSTRUCTOR QUOTE:
 * "And, we could then manually send our HTTP request here, maybe manage some
 * loading and error state, and ultimately navigate away from this page, once
 * we're done."
 *
 * INSTRUCTOR QUOTE:
 * "We could navigate away with imperative, and navigation, with help of that
 * use Navigate Hook I mentioned earlier in this section."
 *
 * ============================================================================
 * TRADITIONAL APPROACH CODE EXAMPLE (What we WON'T do):
 * ============================================================================
 *
 * import { useNavigate } from 'react-router-dom';
 * import { useState } from 'react';
 *
 * function NewEventPage() {
 *   const navigate = useNavigate();
 *   const [isSubmitting, setIsSubmitting] = useState(false);
 *   const [error, setError] = useState(null);
 *
 *   async function submitHandler(event) {
 *     event.preventDefault();  // Prevent browser's default form submission
 *
 *     // Extract data using FormData, refs, or state (two-way binding)
 *     const formData = new FormData(event.target);
 *     const eventData = {
 *       title: formData.get('title'),
 *       image: formData.get('image'),
 *       date: formData.get('date'),
 *       description: formData.get('description'),
 *     };
 *
 *     setIsSubmitting(true);
 *     setError(null);
 *
 *     try {
 *       const response = await fetch('http://localhost:8080/events', {
 *         method: 'POST',
 *         headers: { 'Content-Type': 'application/json' },
 *         body: JSON.stringify(eventData),
 *       });
 *
 *       if (!response.ok) {
 *         throw new Error('Failed to create event');
 *       }
 *
 *       // Navigate away after success
 *       navigate('/events');
 *     } catch (err) {
 *       setError(err.message);
 *     } finally {
 *       setIsSubmitting(false);
 *     }
 *   }
 *
 *   return (
 *     <>
 *       {error && <p>{error}</p>}
 *       <EventForm onSubmit={submitHandler} />
 *       {isSubmitting && <p>Submitting...</p>}
 *     </>
 *   );
 * }
 *
 * PROBLEMS WITH TRADITIONAL APPROACH:
 * ===================================
 * 1. Lots of boilerplate code
 * 2. Manual state management (isSubmitting, error)
 * 3. Manual HTTP request handling
 * 4. Manual navigation with useNavigate
 * 5. Manual form data extraction
 *
 * ============================================================================
 * THE BETTER APPROACH: REACT ROUTER ACTIONS (Lesson 374)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "We could do all of that, but as you can probably already tell by the fact
 * that I'm saying could, there is a better approach when using React Router."
 *
 * INSTRUCTOR QUOTE:
 * "Just as we can add loaders to load data, we can also add actions to send
 * data, and that is what we should do here."
 *
 * LOADERS VS ACTIONS - PARALLEL CONCEPTS:
 * =======================================
 * | Feature  | Purpose         | When triggered           | Data flow        |
 * |----------|-----------------|--------------------------|------------------|
 * | loader   | Load/GET data   | Before route renders     | Backend → Client |
 * | action   | Send/POST data  | On form submission       | Client → Backend |
 *
 * BENEFITS OF USING ACTIONS:
 * ==========================
 * 1. Less boilerplate code
 * 2. React Router handles form data extraction
 * 3. Automatic handling of submission state (useNavigation)
 * 4. Automatic error handling with errorElement
 * 5. Cleaner component code (similar to how loaders cleaned up data fetching)
 * 6. Works with React Router's Form component
 *
 * ============================================================================
 * ROUTE SPECIFICITY - IMPORTANT NOTE (Lesson 360)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now one small side note here. If you watch closely, you might actually see
 * and think that if we have a path of /events/new and we have a path of
 * /events something, this route here might actually never get activated
 * because new could also be treated or seen as a value for the eventId here."
 *
 * INSTRUCTOR QUOTE:
 * "So whenever we enter /events/new in the URL bar, React Router could
 * actually load this route instead of this route because it treats new as
 * a value for eventId."
 *
 * REACT ROUTER'S SMART MATCHING (Lesson 360):
 * ===========================================
 * INSTRUCTOR QUOTE:
 * "And therefore, this route would never get activated. This could happen in
 * theory, but actually React Router is smart and understands that this route
 * path is more specific than this route path."
 *
 * INSTRUCTOR QUOTE:
 * "So indeed, if you would visit /events/new, it would prefer this route
 * definition over this route definition."
 *
 * INSTRUCTOR QUOTE:
 * "And that's just something to be aware of that you don't need to worry
 * about accidentally overriding this route definition and that you don't
 * need to worry about the order of route definitions. This route here,
 * /events/new, will win over this route."
 *
 * ============================================================================
 * WHY /events/new WINS OVER /events/:eventId
 * ============================================================================
 *
 * Route definitions:
 *   { path: ':eventId', element: <EventDetailPage /> }
 *   { path: 'new', element: <NewEventPage /> }
 *
 * When visiting /events/new:
 *   - :eventId is DYNAMIC (matches anything)
 *   - 'new' is STATIC (exact match)
 *
 * React Router prefers STATIC over DYNAMIC matches.
 * This is called "route specificity" or "route ranking".
 *
 * So order doesn't matter - 'new' will always win over ':eventId'
 * when the URL segment is literally "new".
 *
 * ============================================================================
 * ROUTE CONFIGURATION
 * ============================================================================
 *
 * {
 *   path: 'events',
 *   element: <EventsRootLayout />,
 *   children: [
 *     { index: true, element: <EventsPage /> },
 *     { path: 'new', element: <NewEventPage /> },
 *     {
 *       path: ':eventId',
 *       id: 'event-detail',
 *       loader: eventDetailLoader,
 *       children: [
 *         { index: true, element: <EventDetailPage /> },
 *         { path: 'edit', element: <EditEventPage /> },
 *       ]
 *     }
 *   ]
 * }
 *
 * URL: http://localhost:3000/events/new
 *
 * ============================================================================
 * NEXT STEPS (Future Lessons):
 * ============================================================================
 *
 * In the following lessons, we will:
 * 1. Learn about React Router's <Form> component
 * 2. Create an action function to handle form submission
 * 3. Register the action in route definitions (like we did with loaders)
 * 4. Use useNavigation to show submission state
 * 5. Handle action errors
 *
 * ============================================================================
 */
import EventForm from '../components/EventForm';

/**
 * NEW EVENT PAGE COMPONENT (Lesson 374):
 * ======================================
 * Form page for creating a new event.
 *
 * INSTRUCTOR QUOTE:
 * "Now, I'll start by displaying the form. For that I'll use that same event
 * form component, here in my new event JS file."
 *
 * INSTRUCTOR QUOTE:
 * "Here we just return event form and include that import to that component,
 * of course."
 *
 * This page:
 * 1. Renders the EventForm component (same form used in EditEventPage)
 * 2. No event prop passed → form fields are empty (not pre-populated)
 * 3. Will use React Router actions to send data (upcoming lessons)
 *
 * DIFFERENCE FROM EditEventPage:
 * ==============================
 * - EditEventPage: <EventForm event={data.event} /> (pre-populated)
 * - NewEventPage: <EventForm /> (empty fields)
 *
 * INSTRUCTOR QUOTE:
 * "Now, if we visit new event, we see that same form as we saw before when
 * we clicked edit, but, of course, without any pre-filled data, because
 * this is a new event which we add here."
 */
function NewEventPage() {
  /**
   * RETURNING THE EVENT FORM (Lesson 374):
   * ======================================
   * INSTRUCTOR QUOTE:
   * "Here we just return event form and include that import to that component,
   * of course."
   *
   * No props passed because:
   * - This is a NEW event (no existing data to display)
   * - EventForm handles undefined event with empty defaultValue
   *   (see EventForm.jsx: defaultValue={event ? event.title : ''})
   *
   * UPCOMING: In future lessons, we'll add an action function to this file
   * to handle form submission, similar to how we added loaders for data fetching.
   */
  return <EventForm />;
}

export default NewEventPage;
