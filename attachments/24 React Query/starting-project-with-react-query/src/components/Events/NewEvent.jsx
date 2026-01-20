/**
 * ============================================================================
 * NewEvent Component - LESSON 417: Changing Data with Mutations
 * ============================================================================
 *
 * This component demonstrates how to use useMutation for sending data
 * (POST requests) with Tanstack Query.
 *
 * ============================================================================
 * WHY useMutation INSTEAD OF useQuery?
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "To send data, to send a post request as we plan to do it here, you would
 * instead use useMutation."
 *
 * INSTRUCTOR QUOTE:
 * "Just to be clear, you could also send post requests with useQuery because
 * after all, you're writing the logic for sending the requests on your own
 * anyways. But this useMutation hook is optimized for such data changing
 * queries."
 *
 * KEY DIFFERENCE - When requests are sent:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  useQuery:                                                              │
 * │    - Sends request AUTOMATICALLY when component renders                 │
 * │    - Good for fetching data to display                                  │
 * │    - Response data is cached                                            │
 * │                                                                          │
 * │  useMutation:                                                           │
 * │    - Sends request ONLY when you call mutate()                          │
 * │    - Good for creating/updating/deleting data                           │
 * │    - Response typically not cached                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "This useMutation hook is optimized for such data changing queries, for
 * example, simply by making sure that those requests are not sent instantly
 * when this component renders as it by default is the case with useQuery.
 * But that instead requests are only sent when you want to send them, for
 * example, from inside this handleSubmit function."
 *
 * ============================================================================
 */

import { Link, useNavigate } from 'react-router-dom';

/**
 * IMPORTING useMutation FROM TANSTACK QUERY
 *
 * INSTRUCTOR QUOTE:
 * "And for this, we should again import something from React Query as before.
 * And that something now is a different hook. It's not useQuery anymore
 * because you only use useQuery to get data."
 */
import { useMutation } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

/**
 * IMPORTING THE MUTATION FUNCTION
 *
 * INSTRUCTOR QUOTE:
 * "So here we should import createNewEvent from and then going up and going
 * up util http.js and then set createNewEvent as a value for this mutation
 * function here."
 */
import { createNewEvent } from '../../util/http.js';

export default function NewEvent() {
  const navigate = useNavigate();

  /**
   * ============================================================================
   * THE useMutation HOOK - FOR SENDING/CHANGING DATA
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "So useMutation it is, and we should therefore call it in this new event
   * component function. And just like useQuery, useMutation takes a
   * configuration object."
   *
   * CONFIGURATION OPTIONS:
   *
   * mutationFn (required):
   *   INSTRUCTOR QUOTE:
   *   "Now here we must set a mutation function now, just as we had to set a
   *   Query function for the useQuery."
   *
   * mutationKey (optional):
   *   INSTRUCTOR QUOTE:
   *   "We can also set a mutation key here. But you don't necessarily need to
   *   do this because the idea with mutations typically isn't to cache their
   *   response data because they are primarily about changing something on
   *   your backend, not about getting and storing data in your frontend."
   *
   * WHAT useMutation RETURNS:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  mutate    - Function to trigger the mutation (MOST IMPORTANT!)        │
   * │  isPending - true while request is in progress                         │
   * │  isError   - true if request failed                                    │
   * │  error     - Error object with details if request failed               │
   * │  data      - Response data (if needed)                                 │
   * │  reset     - Function to reset mutation state                          │
   * └─────────────────────────────────────────────────────────────────────────┘
   *
   * INSTRUCTOR QUOTE:
   * "Just as before with useQuery, useMutation will return an object and we
   * can destructure this object to get access to some useful properties."
   *
   * INSTRUCTOR QUOTE (about mutate):
   * "This object also has a mutate property, which is extremely important
   * because this is now a function which you can call anywhere in this
   * component to actually send this request."
   *
   * INSTRUCTOR QUOTE:
   * "useMutation, unlike useQuery does not automatically send this request
   * when this component here is rendered but instead only when you tell it
   * to send that request, which you do with help of that mutate function."
   *
   * WHY NO WRAPPER FUNCTION NEEDED:
   * INSTRUCTOR QUOTE:
   * "And even though this createNewEvent function needs some input data, we
   * don't have to wrap it with an anonymous function because I'll show you
   * how you can pass data to that function in just a second."
   *
   * The data passed to mutate() is automatically forwarded to mutationFn!
   */
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
  });

  /**
   * FORM SUBMIT HANDLER - TRIGGERING THE MUTATION
   *
   * INSTRUCTOR QUOTE:
   * "And it's of course here in handleSubmit where I wanna send that request.
   * Here I can call mutate and then in this case, pass my form data to mutate."
   *
   * How data flows from form to backend:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  1. User fills form and clicks Create                                  │
   * │  2. EventForm's handleSubmit collects data and calls onSubmit(data)    │
   * │  3. Our handleSubmit receives formData                                 │
   * │  4. We call mutate({ event: formData })                                │
   * │  5. useMutation calls createNewEvent({ event: formData })              │
   * │  6. createNewEvent sends POST request to backend                       │
   * └─────────────────────────────────────────────────────────────────────────┘
   *
   * INSTRUCTOR QUOTE:
   * "Now I actually have to change the form data a little bit to have the
   * right format for the backend, here in this demo app I'll wrap it in an
   * object where I have an event property which holds my form data as a value."
   *
   * INSTRUCTOR QUOTE:
   * "And of course, the exact shape of data you want to send here depends on
   * the shape of data you are getting in your application and the shape of
   * data your backend wants. Here this will make sure that I'm sending the
   * data exactly as required to my backend."
   */
  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {/**
         * ===================================================================
         * CONDITIONAL RENDERING BASED ON MUTATION STATE
         * ===================================================================
         *
         * INSTRUCTOR QUOTE:
         * "We can get more information out of this object returned by
         * useMutation. For example, there also is an isPending property,
         * which will be true if the request is currently on its way and
         * false otherwise."
         *
         * INSTRUCTOR QUOTE:
         * "And for that, I'll start by going to that event form. And in
         * there I first of all wanna check if we are in this pending state,
         * in which case I simply wanna output the text submitting here as
         * a little loading indicator."
         *
         * INSTRUCTOR QUOTE:
         * "I only wanna show these buttons on the other hand if we are not
         * waiting for a response. So if not isPending, I wanna show these
         * buttons."
         */}
        {isPending && 'Submitting...'}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>

      {/**
       * =====================================================================
       * ERROR HANDLING FOR MUTATIONS
       * =====================================================================
       *
       * INSTRUCTOR QUOTE:
       * "There also is an isError property just as you know it from useQuery
       * and an error property which would contain error details. And we can
       * now use that information to output different content down there,
       * render different JSX code if we are waiting for a response or if we
       * have an error."
       *
       * INSTRUCTOR QUOTE:
       * "I also want to show an error message if we got an error, maybe here
       * below the event form but still in the modal."
       *
       * INSTRUCTOR QUOTE:
       * "And with that, we save that, and I now try to send an invalid
       * request again, for example, by entering nothing at all, you see I
       * get this error message here."
       */}
      {isError && (
        <ErrorBlock
          title="Failed to create event"
          message={
            error.info?.message ||
            'Failed to create event. Please check your inputs and try again later.'
          }
        />
      )}
    </Modal>
  );
}
