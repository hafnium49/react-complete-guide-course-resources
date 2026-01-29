/**
 * ============================================================================
 * SHARE MEAL PAGE - LESSONS 459-464, 467 & 469: Form, Server Actions & Form State
 * ============================================================================
 *
 * LESSON 459 - CREATING THE MEAL SUBMISSION FORM
 *
 * INSTRUCTOR QUOTE:
 * "So attached you find my share meal page component in this Page.js file,
 * and you can simply replace your share Page.js file with that."
 *
 * PURPOSE OF THIS PAGE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  This page allows users to submit their own meals to the community.    │
 * │                                                                          │
 * │  FORM COLLECTS:                                                         │
 * │  • Creator's name and email                                             │
 * │  • Meal title                                                           │
 * │  • Short summary                                                        │
 * │  • Detailed instructions                                                │
 * │  • Meal image (via ImagePicker component - Lesson 460)                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * LESSON 469 - WHY THIS PAGE IS NOW A CLIENT COMPONENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "With that though, we got everything set up that needs to be set up, but
 * we'll now get an error if we try to load the page because useFormState,
 * since it in the end again deals with updating the client, needs to be
 * executed in a client component and therefore we should add use client
 * here in our shareMeal page component file."
 *
 * INSTRUCTOR QUOTE:
 * "We could again try to outsource this into some nested component, but
 * here I'll stick to this component, add use client and save that."
 *
 * WHY 'use client' IS NOW REQUIRED:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  useFormState hook requires a Client Component because:                │
 * │  • It manages client-side state (the form response)                    │
 * │  • It needs to re-render the component when state changes              │
 * │  • It's about updating the UI based on Server Action responses         │
 * │                                                                          │
 * │  TRADE-OFF:                                                             │
 * │  • Page is now a Client Component (more JS to browser)                 │
 * │  • But we get inline error handling (much better UX!)                  │
 * │  • Server Action still runs on the server (secure)                     │
 * │  • Could outsource to nested component if needed                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * TRADITIONAL REACT VS SERVER ACTIONS (Lesson 463)
 * ============================================================================
 *
 * TRADITIONAL REACT VS SERVER ACTIONS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  TRADITIONAL REACT APPROACH:                                            │
 * │  1. Add onSubmit handler to form                                        │
 * │  2. Call event.preventDefault()                                         │
 * │  3. Manually collect data from inputs (useState or refs)                │
 * │  4. Send data via fetch() to an API endpoint                            │
 * │  5. Handle response and update UI                                       │
 * │                                                                          │
 * │  SERVER ACTIONS APPROACH (Next.js):                                     │
 * │  1. Define function with 'use server' directive                         │
 * │  2. Assign function to form's action prop                               │
 * │  3. Function automatically receives FormData                            │
 * │  4. Function runs on server - can directly access DB                    │
 * │  5. Next.js handles the request/response automatically                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
'use client';

import { useFormState } from 'react-dom';
/**
 * ============================================================================
 * LESSON 469 - useFormState HOOK
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Well, we can use it with help of another hook, another hook provided by
 * React dom, the useFormState hook. So not useFormStatus, which we had before,
 * but useFormState. Sounds similar but is a different hook."
 *
 * useFormState vs useFormStatus:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  useFormStatus (Lesson 467):                                            │
 * │  • Returns { pending, data, method, action }                           │
 * │  • Tracks whether form is currently submitting                         │
 * │  • Used for loading indicators / disable buttons                       │
 * │  • Must be INSIDE the form                                              │
 * │                                                                          │
 * │  useFormState (Lesson 469):                                             │
 * │  • Returns [state, formAction]                                          │
 * │  • Manages state based on Server Action responses                       │
 * │  • Used for displaying validation errors                                │
 * │  • Wraps around the Server Action                                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "This hook also must be imported from React dom like this."
 *
 * WHY react-dom (NOT react)?
 * • Form handling is DOM-specific (browsers have forms)
 * • Both useFormStatus and useFormState live in react-dom
 * • Core React hooks (useState, useEffect) are in 'react'
 *
 * ============================================================================
 */

import ImagePicker from '@/components/meals/image-picker';
/**
 * ============================================================================
 * IMPORTING FORM SUBMIT COMPONENT (LESSON 467)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And therefore, I will not add it here, and therefore remove it, and instead
 * add a new component, a new component here in the meals folder in the
 * components folder, let's say that could be named meals-form-submit."
 *
 * WHY A SEPARATE COMPONENT?
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. useFormStatus requires 'use client' directive                      │
 * │  2. This page remains a Server Component                               │
 * │  3. Only the submit button becomes a Client Component                  │
 * │  4. Minimizes JavaScript sent to browser                               │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "However, if you add that hook, you'll see that you'll get an error because
 * this hook requires a client component in order to work, which makes sense
 * because it is about updating the client side UI based on any ongoing requests."
 */
import MealsFormSubmit from '@/components/meals/meals-form-submit';
import classes from './page.module.css';
/**
 * ============================================================================
 * IMPORTING SERVER ACTION (LESSON 464)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And with that server action outsourced here, we can now go back to the
 * share meal page and still use it as an action here on the forum by simply
 * importing it. So by adding this import."
 *
 * WHY IMPORT INSTEAD OF DEFINE INLINE?
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  INLINE DEFINITION (Lesson 463):                                       │
 * │  • Works in Server Components only                                     │
 * │  • Cannot use if component needs 'use client'                          │
 * │  • Mixes server logic with UI code                                     │
 * │                                                                          │
 * │  IMPORTING (Lesson 464):                                               │
 * │  • Works in BOTH Server and Client Components                          │
 * │  • Better code organization                                             │
 * │  • Server Action can be reused across multiple components              │
 * │  • Clear separation of concerns                                         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "You can absolutely import a server action from another file and then
 * use it in such a client component."
 *
 * NOTE: The shareMeal function is defined in lib/actions.js with 'use server'
 * at the FILE level, making all exported functions Server Actions.
 */
import { shareMeal } from '@/lib/actions';

/**
 * SHARE MEAL PAGE COMPONENT
 *
 * COMPONENT STRUCTURE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  <Fragment>                                                             │
 * │  ├── <header>          → Page title and description                     │
 * │  │   ├── <h1>          → "Share your favorite meal"                     │
 * │  │   └── <p>           → Subtitle text                                  │
 * │  │                                                                       │
 * │  └── <main>            → Form container                                 │
 * │      └── <form action={formAction}>  → Connected via useFormState       │
 * │          ├── Row       → Name + Email (side by side)                    │
 * │          ├── Title     → Meal title input                               │
 * │          ├── Summary   → Short description input                        │
 * │          ├── Textarea  → Detailed instructions                          │
 * │          ├── ImagePicker → Custom image upload (Client Component)       │
 * │          ├── Error     → Validation error message (if any)              │
 * │          └── Button    → Submit button                                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @returns {JSX.Element} The share meal form page
 */
export default function ShareMealPage() {
  /**
   * ================================================================
   * LESSON 469 - useFormState HOOK USAGE
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And then this hook here works a little bit like the useState hook that's
   * built into React because this hook is responsible for managing the state
   * of this page or of this component, which uses a forum that will be
   * submitted with help of Server Actions."
   *
   * HOOK ARGUMENTS:
   *
   * INSTRUCTOR QUOTE:
   * "useFormState needs two arguments. And the first argument is the actual
   * Server Action that should be triggered when the form is submitted, in
   * this case shareMeal. The second argument you pass to useFormState is the
   * initial state of this component."
   *
   * ARGUMENTS EXPLAINED:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  ARGUMENT 1: shareMeal (Server Action)                              │
   * │  • The function to execute when form is submitted                   │
   * │  • Must accept (prevState, formData) - new signature!               │
   * │  • Returns response objects that become the new state               │
   * │                                                                      │
   * │  ARGUMENT 2: { message: null } (Initial State)                      │
   * │  • The state before any submission has occurred                     │
   * │  • Shape should match what the Server Action returns                │
   * │  • Used for first render before any response received               │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * INSTRUCTOR QUOTE:
   * "So the initial value that should be used if we haven't received a response
   * from this action yet, and that could be anything you want, for example,
   * null or an object where you have a message field that holds a value of null.
   * To reassemble the shape of that response, we will eventually send back."
   *
   * RETURN VALUE:
   *
   * INSTRUCTOR QUOTE:
   * "Then useFormState will give you an array with exactly two elements, which
   * might sound familiar because the default useState hook provided by React
   * also gives you two elements."
   *
   * INSTRUCTOR QUOTE:
   * "We get the current state, the current response you could say, of this page
   * here, of this component here. So the latest response returned by this Server
   * Action in the end or this initial state if no response has been received yet.
   * And we get another formAction here, which we should actually set as a value
   * for this action prop on the form now."
   *
   * RETURN VALUE EXPLAINED:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  [state, formAction] = useFormState(shareMeal, initialState)        │
   * │                                                                      │
   * │  state:                                                              │
   * │  • Current state (either initial or latest Server Action response)  │
   * │  • In our case: { message: null } or { message: 'Invalid input.' } │
   * │  • Updates automatically when Server Action returns                 │
   * │                                                                      │
   * │  formAction:                                                         │
   * │  • A wrapped version of shareMeal                                   │
   * │  • Must be used as the form's action prop                           │
   * │  • Allows useFormState to intercept and manage responses            │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * WHY formAction INSTEAD OF shareMeal?
   *
   * INSTRUCTOR QUOTE:
   * "And this must be done so that useFormState can basically step in and
   * manage that state for this component. And that state depends on the
   * execution of that Server Action and its response. And that's why
   * useFormState kind of needs to act as a man in the middle, you could say."
   */
  const [state, formAction] = useFormState(shareMeal, { message: null });

  return (
    <>
      {/**
       * PAGE HEADER SECTION
       *
       * Contains the page title with highlighted text and a subtitle.
       * Uses the gradient highlight effect for "favorite meal" text.
       */}
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>

      {/**
       * ================================================================
       * MAIN FORM SECTION WITH SERVER ACTION (LESSON 463)
       * ================================================================
       *
       * THE action PROP:
       *
       * INSTRUCTOR QUOTE:
       * "And this feature then exists because you can now take such a Server
       * Action and assign this Server Action function as a value for the
       * action prop on a function. So here, I'm setting shareMeal as a
       * value on that action prop of that form here."
       *
       * INSTRUCTOR QUOTE:
       * "And that's of course something you might have never seen before,
       * because normally, the action prop is set to the path to which the
       * request should be sent if you are relying on the browser's built-in
       * form handling capabilities."
       *
       * TRADITIONAL action PROP VS SERVER ACTION:
       * ┌─────────────────────────────────────────────────────────────────┐
       * │  TRADITIONAL HTML:                                              │
       * │  <form action="/api/submit">  ← URL path for POST request      │
       * │                                                                 │
       * │  NEXT.JS SERVER ACTION:                                        │
       * │  <form action={shareMeal}>    ← Function reference             │
       * └─────────────────────────────────────────────────────────────────┘
       *
       * WHAT HAPPENS ON SUBMIT:
       *
       * INSTRUCTOR QUOTE:
       * "That's a pattern that's supported by Next and React here that will
       * ensure that when this form is submitted, Next.js will, behind the
       * scenes, create a request and send it to this Next.js server that's
       * serving the website so that this function gets triggered, and you
       * can then handle the form submission there, but on the server."
       *
       * FORM SUBMISSION FLOW:
       * ┌─────────────────────────────────────────────────────────────────┐
       * │  1. User clicks "Share Meal" button                            │
       * │  2. Browser collects all form data into FormData object        │
       * │  3. Next.js intercepts the submission (no page reload!)        │
       * │  4. Next.js sends request to the Next.js server                │
       * │  5. shareMeal() function executes ON THE SERVER                │
       * │  6. FormData is passed as the first argument                   │
       * │  7. Response is sent back to the client                        │
       * └─────────────────────────────────────────────────────────────────┘
       *
       * INSTRUCTOR QUOTE:
       * "So it looks like that default browser behavior, which normally
       * would be to send the request automatically and therefore reload
       * the page was prevented."
       */}
      <main className={classes.main}>
        {/**
         * ================================================================
         * LESSON 469 - FORM ACTION CHANGE
         * ================================================================
         *
         * INSTRUCTOR QUOTE:
         * "So instead of setting share meal as a value for action down here,
         * I'm now setting this formAction, which I'm getting back from
         * useFormState as a value for the action down there."
         *
         * WHY formAction INSTEAD OF shareMeal?
         * ┌─────────────────────────────────────────────────────────────────┐
         * │  BEFORE (Lesson 464):                                          │
         * │  <form action={shareMeal}>                                      │
         * │  • Form directly calls shareMeal                               │
         * │  • No way to get response back to component                    │
         * │                                                                 │
         * │  AFTER (Lesson 469):                                           │
         * │  <form action={formAction}>                                     │
         * │  • formAction wraps shareMeal                                  │
         * │  • useFormState intercepts the response                        │
         * │  • state is updated with the response                          │
         * │  • Component re-renders with new state                         │
         * └─────────────────────────────────────────────────────────────────┘
         */}
        <form className={classes.form} action={formAction}>
          {/**
           * ROW 1: NAME AND EMAIL (SIDE BY SIDE)
           *
           * Uses flexbox via .row class to display inputs horizontally.
           * Both fields are required for meal attribution.
           *
           * NAME INPUT ATTRIBUTES:
           * - htmlFor/id: Links label to input for accessibility
           * - name: Used by FormData to identify the field (CRITICAL!)
           * - required: Browser-level validation
           */}
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>

          {/**
           * MEAL TITLE INPUT
           *
           * The display name for the meal that appears on the meals grid.
           * Extracted via: formData.get('title')
           */}
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>

          {/**
           * SHORT SUMMARY INPUT
           *
           * Brief description shown on meal cards in the grid.
           * Extracted via: formData.get('summary')
           */}
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>

          {/**
           * INSTRUCTIONS TEXTAREA
           *
           * Multi-line input for detailed cooking instructions.
           * Extracted via: formData.get('instructions')
           *
           * NOTE: Newlines (\n) are stored and later converted to <br />
           */}
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>

          {/**
           * IMAGE PICKER COMPONENT (LESSON 460)
           *
           * INSTRUCTOR QUOTE (Lesson 463):
           * "Now, for this to work, we have to make sure that we pass the
           * appropriate name to our ImagePicker component. And at the moment,
           * I'm not doing that."
           *
           * INSTRUCTOR QUOTE:
           * "So here I'll set the label to 'Your image' and the name to
           * 'image', let's say. And with that, we make sure that we can
           * extract that image with help of formData.get."
           *
           * PROPS:
           * - label: Text shown above the picker
           * - name: The input's name attribute → formData.get('image')
           */}
          <ImagePicker label="Your image" name="image" />

          {/**
           * ================================================================
           * LESSON 469 - ERROR MESSAGE DISPLAY
           * ================================================================
           *
           * INSTRUCTOR QUOTE:
           * "With that, we can then use this state here, which will essentially
           * be either this year or any response we got back from ShareMeal to
           * output data in this component."
           *
           * INSTRUCTOR QUOTE:
           * "Now, in this case, I know that state will therefore either be an
           * object with a message that's a string or it'll be an object with
           * a message that's null. So we can use it down here at the end of
           * the form right before the submit button, let's say, to output an
           * error message."
           *
           * CONDITIONAL RENDERING:
           *
           * INSTRUCTOR QUOTE:
           * "For that, we can check if state.message is truthy, which means we
           * have a message. And in that case I wanna output it here between my
           * paragraph tags."
           *
           * STATE VALUES AND WHAT RENDERS:
           * ┌─────────────────────────────────────────────────────────────────┐
           * │  STATE VALUE              │  WHAT RENDERS                       │
           * │  ────────────────────────│────────────────────────────────── │
           * │  { message: null }        │  Nothing (initial state)           │
           * │  { message: 'Invalid...' }│  <p>Invalid...</p> (error!)        │
           * └─────────────────────────────────────────────────────────────────┘
           *
           * USER EXPERIENCE IMPROVEMENT:
           * ┌─────────────────────────────────────────────────────────────────┐
           * │  BEFORE (Lesson 468 - throwing error):                         │
           * │  • User submits invalid form                                   │
           * │  • Entire page replaced with error.js                          │
           * │  • All form input is LOST                                      │
           * │  • User must start over                                        │
           * │                                                                 │
           * │  AFTER (Lesson 469 - useFormState):                            │
           * │  • User submits invalid form                                   │
           * │  • Error message appears on SAME page                          │
           * │  • All form input is PRESERVED                                 │
           * │  • User can fix and resubmit                                   │
           * └─────────────────────────────────────────────────────────────────┘
           *
           * INSTRUCTOR QUOTE:
           * "Now of course we could make it pop more. We could make sure that
           * it stands out, that it's more descriptive and you can do all these
           * things. You can, for example, tweak that message here, which in
           * the end is the message that's showing up on the screen."
           */}
          {state.message && <p>{state.message}</p>}

          {/**
           * ================================================================
           * FORM ACTIONS - SUBMIT BUTTON (LESSON 467)
           * ================================================================
           *
           * INSTRUCTOR QUOTE:
           * "So now that we're able to save meals, it's time to further enhance
           * the user experience here. And for example, as you saw before, it
           * takes quite some time until we are redirected after adding our data."
           *
           * THE PROBLEM (Before Lesson 467):
           * ┌─────────────────────────────────────────────────────────────────┐
           * │  1. User clicks "Share Meal" button                            │
           * │  2. Button looks the same (no visual change)                   │
           * │  3. User waits... nothing seems to happen                      │
           * │  4. User might click again (duplicate submissions!)            │
           * │  5. Eventually redirected to /meals                            │
           * │                                                                 │
           * │  USER EXPERIENCE: "Did it work? Is it broken?"                 │
           * └─────────────────────────────────────────────────────────────────┘
           *
           * THE SOLUTION (Lesson 467):
           * ┌─────────────────────────────────────────────────────────────────┐
           * │  MealsFormSubmit component uses useFormStatus hook to:         │
           * │  • Show "Submitting..." text during form submission            │
           * │  • Disable button to prevent duplicate submissions             │
           * │  • Provide visual feedback that action is in progress          │
           * └─────────────────────────────────────────────────────────────────┘
           *
           * INSTRUCTOR QUOTE:
           * "Now therefore, we would have to add use client here and we could
           * do that, wouldn't be a problem, everything would work. But we also
           * might not want to turn this entire page into a client component
           * just because we want to conditionally update this button."
           *
           * WHY MealsFormSubmit MUST BE INSIDE THE FORM:
           *
           * INSTRUCTOR QUOTE:
           * "In addition, this hook here will actually only give us the status
           * of a form if it's inside of that form for which it should give us
           * the status."
           *
           * INSTRUCTOR QUOTE:
           * "And with that, we can go back to our form and replace this vanilla
           * button here with our meals-form-submit button, this component we
           * just worked on."
           */}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}

/**
 * ============================================================================
 * LESSONS 459-464, 467 & 469 - SHARE MEAL FORM SUMMARY
 * ============================================================================
 *
 * LESSON 459 - FORM STRUCTURE:
 *
 * 1. SERVER COMPONENT FORMS
 *    - Forms can exist in Server Components
 *    - Standard HTML form behavior works without JS
 *    - Client interactivity requires separate Client Components
 *
 * 2. FORM FIELDS (all have name attributes for FormData extraction):
 *
 *    ┌─────────────────────────────────────────────────────────────────────┐
 *    │  FIELD         │  name ATTR     │  EXTRACTED WITH                   │
 *    │  ─────────────│───────────────│───────────────────────────────── │
 *    │  Creator name  │  "name"        │  formData.get('name')            │
 *    │  Creator email │  "email"       │  formData.get('email')           │
 *    │  Meal title    │  "title"       │  formData.get('title')           │
 *    │  Summary       │  "summary"     │  formData.get('summary')         │
 *    │  Instructions  │  "instructions"│  formData.get('instructions')   │
 *    │  Image         │  "image"       │  formData.get('image')           │
 *    └─────────────────────────────────────────────────────────────────────┘
 *
 * LESSON 460 - IMAGE PICKER INTEGRATION:
 *    - ImagePicker is a Client Component (uses onClick, useState, useRef)
 *    - Embedded in Server Component page via "islands architecture"
 *
 * LESSON 463 - SERVER ACTIONS (INLINE):
 *
 * 3. WHAT ARE SERVER ACTIONS?
 *
 *    INSTRUCTOR QUOTE:
 *    "This feature exists in React, by the way, not just in Next.js, but
 *    like server components, it doesn't really work in Vanilla React apps.
 *    Instead, you need a framework like Next to unlock this feature and
 *    use it."
 *
 *    SERVER ACTIONS ARE:
 *    ┌─────────────────────────────────────────────────────────────────────┐
 *    │  • Functions marked with 'use server' directive                    │
 *    │  • Must be async functions                                          │
 *    │  • Execute ONLY on the server                                       │
 *    │  • Can be assigned to form's action prop                           │
 *    │  • Automatically receive FormData from form submission             │
 *    │  • Can directly access databases, file systems, etc.               │
 *    └─────────────────────────────────────────────────────────────────────┘
 *
 * LESSON 464 - SERVER ACTIONS (SEPARATE FILE):
 *
 * 4. WHY MOVE SERVER ACTIONS TO SEPARATE FILES?
 *
 *    INSTRUCTOR QUOTE:
 *    "If you had use client here at the top because somewhere else in the
 *    component you might be using some client-only feature, you would get
 *    an error that you are not allowed to have server actions in a client
 *    component file."
 *
 *    TWO MAIN REASONS:
 *    ┌─────────────────────────────────────────────────────────────────────┐
 *    │  1. COMPATIBILITY: Can import into 'use client' files              │
 *    │  2. ORGANIZATION: Separates server logic from UI code              │
 *    └─────────────────────────────────────────────────────────────────────┘
 *
 * 5. FILE-LEVEL VS FUNCTION-LEVEL 'use server'
 *
 *    INLINE (Lesson 463):              SEPARATE FILE (Lesson 464):
 *    ─────────────────────             ────────────────────────────
 *    async function action() {         'use server';  // ← At top
 *      'use server'; // ← Inside
 *      // ...                          export async function action() {
 *    }                                   // No directive needed!
 *                                      }
 *
 *    INSTRUCTOR QUOTE:
 *    "When adding it at the top of a file like this, all the functions you
 *    might define in that file will be treated as Server Actions."
 *
 * 6. BENEFITS OF SERVER ACTIONS
 *
 *    ┌─────────────────────────────────────────────────────────────────────┐
 *    │  ✓ No need to create API routes                                    │
 *    │  ✓ No need to manually collect form data                           │
 *    │  ✓ No need for fetch() calls                                        │
 *    │  ✓ FormData automatically provided                                 │
 *    │  ✓ Direct database/file system access                              │
 *    │  ✓ Page doesn't reload on submission                               │
 *    │  ✓ Works even without JavaScript (progressive enhancement)        │
 *    └─────────────────────────────────────────────────────────────────────┘
 *
 * ARCHITECTURE AFTER LESSON 464:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  lib/actions.js ('use server' at top)                                  │
 * │  └── export async function shareMeal() { ... }                         │
 * │                                                                          │
 * │  app/meals/share/page.js (this file)                                   │
 * │  └── import { shareMeal } from '@/lib/actions';                        │
 * │  └── <form action={shareMeal}>                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * LESSON 467 - FORM SUBMISSION LOADING STATE:
 *
 * 7. useFormStatus HOOK
 *
 *    INSTRUCTOR QUOTE:
 *    "And to do that, we can use another special hook called useFormStatus.
 *    And this hook must be imported, useFormStatus from react-dom, so not from
 *    React, not from NextJS, but from react-dom."
 *
 *    KEY POINTS:
 *    ┌─────────────────────────────────────────────────────────────────────┐
 *    │  • Imported from 'react-dom' (not 'react')                         │
 *    │  • Returns { pending, data, method, action }                       │
 *    │  • pending is true during form submission                          │
 *    │  • MUST be used inside the form it tracks                          │
 *    │  • Requires 'use client' directive                                 │
 *    └─────────────────────────────────────────────────────────────────────┘
 *
 * 8. WHY SEPARATE MealsFormSubmit COMPONENT?
 *
 *    INSTRUCTOR QUOTE:
 *    "Now therefore, we would have to add use client here and we could do that,
 *    wouldn't be a problem, everything would work. But we also might not want
 *    to turn this entire page into a client component just because we want to
 *    conditionally update this button."
 *
 *    BENEFITS:
 *    ┌─────────────────────────────────────────────────────────────────────┐
 *    │  • This page stays a Server Component                              │
 *    │  • Only the submit button is a Client Component                    │
 *    │  • Minimizes JavaScript sent to browser                            │
 *    │  • Encapsulates loading logic for reuse                            │
 *    └─────────────────────────────────────────────────────────────────────┘
 *
 * ARCHITECTURE AFTER LESSON 467:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  components/meals/meals-form-submit.js ('use client')                  │
 * │  └── useFormStatus() from react-dom                                    │
 * │  └── Shows "Submitting..." and disables button when pending           │
 * │                                                                          │
 * │  app/meals/share/page.js (this file - was Server Component)           │
 * │  └── import MealsFormSubmit from '@/components/meals/meals-form-submit'│
 * │  └── <MealsFormSubmit /> inside the form                              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * LESSON 469 - useFormState FOR ERROR HANDLING:
 *
 * 9. useFormState HOOK (from react-dom)
 *
 *    INSTRUCTOR QUOTE:
 *    "Well, we can use it with help of another hook, another hook provided
 *    by React dom, the useFormState hook. So not useFormStatus, which we
 *    had before, but useFormState. Sounds similar but is a different hook."
 *
 *    USAGE:
 *    const [state, formAction] = useFormState(shareMeal, { message: null });
 *
 *    KEY POINTS:
 *    ┌─────────────────────────────────────────────────────────────────────┐
 *    │  • Takes Server Action + initial state as arguments                │
 *    │  • Returns [currentState, wrappedFormAction]                       │
 *    │  • formAction must be used as form's action prop                   │
 *    │  • state updates when Server Action returns a response             │
 *    └─────────────────────────────────────────────────────────────────────┘
 *
 * 10. SERVER ACTION SIGNATURE CHANGE
 *
 *    INSTRUCTOR QUOTE:
 *    "The second parameter will still be that submitted data, but the first
 *    parameter will be the previous state."
 *
 *    BEFORE: shareMeal(formData)
 *    AFTER:  shareMeal(prevState, formData)
 *
 * 11. RETURNING INSTEAD OF THROWING
 *
 *    INSTRUCTOR QUOTE:
 *    "In Server Actions, you are not limited to redirecting or throwing
 *    errors. Instead, you can also return values. You can return response
 *    objects to be precise."
 *
 *    return { message: 'Invalid input.' };
 *
 * 12. THIS PAGE IS NOW A CLIENT COMPONENT
 *
 *    INSTRUCTOR QUOTE:
 *    "We'll now get an error if we try to load the page because useFormState,
 *    since it in the end again deals with updating the client, needs to be
 *    executed in a client component."
 *
 *    'use client' added at top of file
 *
 * ARCHITECTURE AFTER LESSON 469:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  app/meals/share/page.js (this file - NOW Client Component!)           │
 * │  └── 'use client' at top                                               │
 * │  └── useFormState(shareMeal, { message: null })                        │
 * │  └── <form action={formAction}>  ← Note: formAction, not shareMeal    │
 * │  └── {state.message && <p>{state.message}</p>}                        │
 * │                                                                          │
 * │  lib/actions.js ('use server')                                         │
 * │  └── shareMeal(prevState, formData)  ← New signature!                  │
 * │  └── Returns { message: '...' } on error                               │
 * │  └── redirect('/meals') on success                                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * COMPLETE useFormState FLOW:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. Component renders with initial state { message: null }             │
 * │  2. User fills out form                                                │
 * │  3. User clicks "Share Meal"                                           │
 * │  4. formAction is called (wraps shareMeal)                             │
 * │  5. shareMeal(prevState, formData) executes on server                  │
 * │  6a. If VALID: saveMeal() → redirect('/meals')                        │
 * │  6b. If INVALID: return { message: 'Invalid input.' }                 │
 * │  7. useFormState receives response, updates state                      │
 * │  8. Component re-renders with new state                                │
 * │  9. Error message displays (form input preserved!)                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * COMING NEXT:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ✓ Cache revalidation (revalidatePath) - DONE in Lesson 471            │
 * │  ✓ Production image storage limitation - Explained in Lesson 472       │
 * │  • Image optimization with Next.js Image component                     │
 * │  • Static & Dynamic metadata                                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
