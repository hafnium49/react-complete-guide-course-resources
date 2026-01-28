/**
 * ============================================================================
 * MEALS FORM SUBMIT COMPONENT - LESSON 467: Form Submission Loading State
 * ============================================================================
 *
 * LESSON 467 - ENHANCING USER EXPERIENCE DURING FORM SUBMISSION
 *
 * INSTRUCTOR QUOTE:
 * "So now that we're able to save meals, it's time to further enhance the
 * user experience here. And for example, as you saw before, it takes quite
 * some time until we are redirected after adding our data."
 *
 * INSTRUCTOR QUOTE:
 * "Now that will typically be a bit faster in production, but still, it
 * would be nice to get some feedback as a user whilst the data is being
 * submitted to see that everything's fine and a request is on its way."
 *
 * THE PROBLEM:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  BEFORE (No loading feedback):                                          │
 * │                                                                          │
 * │  1. User clicks "Share Meal" button                                     │
 * │  2. Button looks the same (no visual change)                            │
 * │  3. User waits... nothing seems to happen                               │
 * │  4. User might click again (duplicate submissions!)                     │
 * │  5. Eventually redirected to /meals                                     │
 * │                                                                          │
 * │  USER EXPERIENCE: "Did it work? Is it broken?"                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * THE SOLUTION:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  AFTER (With loading feedback):                                         │
 * │                                                                          │
 * │  1. User clicks "Share Meal" button                                     │
 * │  2. Button changes to "Submitting..." and becomes disabled              │
 * │  3. User sees the request is being processed                            │
 * │  4. User can't click again (prevents duplicates)                        │
 * │  5. Redirected to /meals                                                │
 * │                                                                          │
 * │  USER EXPERIENCE: Clear feedback that action is in progress!            │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * WHY A SEPARATE COMPONENT?
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "However, if you add that hook, you'll see that you'll get an error because
 * this hook requires a client component in order to work, which makes sense
 * because it is about updating the client side UI based on any ongoing requests."
 *
 * INSTRUCTOR QUOTE:
 * "Now therefore, we would have to add use client here and we could do that,
 * wouldn't be a problem, everything would work. But we also might not want
 * to turn this entire page into a client component just because we want to
 * conditionally update this button."
 *
 * REASONS FOR SEPARATE COMPONENT:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. KEEP PAGE AS SERVER COMPONENT                                       │
 * │     • share/page.js stays a Server Component                           │
 * │     • Only this small button becomes a Client Component                 │
 * │     • Minimal JavaScript sent to browser                                │
 * │                                                                          │
 * │  2. useFormStatus MUST BE INSIDE THE FORM                               │
 * │                                                                          │
 * │     INSTRUCTOR QUOTE:                                                   │
 * │     "In addition, this hook here will actually only give us the status  │
 * │     of a form if it's inside of that form for which it should give us   │
 * │     the status."                                                        │
 * │                                                                          │
 * │     <form action={shareMeal}>                                           │
 * │       ...inputs...                                                      │
 * │       <MealsFormSubmit />  ← Hook works here (inside form)              │
 * │     </form>                                                             │
 * │                                                                          │
 * │  3. REUSABILITY                                                         │
 * │     • Can be used in other forms too                                    │
 * │     • Encapsulates loading logic in one place                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 'use client' DIRECTIVE
 * ============================================================================
 *
 * This component MUST be a Client Component because:
 * 1. useFormStatus is a React hook (hooks require client-side React)
 * 2. It updates the UI based on form submission state
 * 3. It needs to react to user interactions
 *
 * INSTRUCTOR QUOTE:
 * "This hook requires a client component in order to work, which makes sense
 * because it is about updating the client side UI based on any ongoing requests."
 */
'use client';

/**
 * ============================================================================
 * useFormStatus HOOK
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And to do that, we can use another special hook called useFormStatus.
 * And this hook must be imported, useFormStatus from react-dom, so not from
 * React, not from NextJS, but from react-dom."
 *
 * WHY react-dom (NOT react)?
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  react        → Core React library (components, hooks like useState)   │
 * │  react-dom    → React DOM-specific features (forms, portals, etc.)     │
 * │                                                                          │
 * │  Form handling is DOM-specific (browsers have forms, servers don't),   │
 * │  so useFormStatus lives in react-dom.                                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "Yes, React, but again, a feature that really only works when using Next."
 *
 * NOTE: While useFormStatus is from React 19, it only works effectively
 * with frameworks like Next.js that support Server Actions. In vanilla
 * React apps without a server framework, you wouldn't have Server Actions
 * to track.
 *
 * WHAT useFormStatus RETURNS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  const { pending, data, method, action } = useFormStatus();            │
 * │                                                                          │
 * │  pending  → boolean: true if form is submitting, false otherwise       │
 * │  data     → FormData object being submitted (or null)                  │
 * │  method   → HTTP method string ('get' or 'post')                       │
 * │  action   → Reference to the action function being executed            │
 * │                                                                          │
 * │  We only need 'pending' for our use case.                               │
 * └─────────────────────────────────────────────────────────────────────────┘
 */
import { useFormStatus } from 'react-dom';

/**
 * MEALS FORM SUBMIT BUTTON COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "And therefore, I will not add it here, and therefore remove it, and instead
 * add a new component, a new component here in the meals folder in the
 * components folder, let's say that could be named meals-form-submit."
 *
 * USAGE:
 * This component must be placed INSIDE a <form> element to work correctly.
 * It reads the submission status of its parent form.
 *
 * @returns {JSX.Element} A submit button that shows loading state
 */
export default function MealsFormSubmit() {
  /**
   * DESTRUCTURING THE PENDING STATE
   *
   * INSTRUCTOR QUOTE:
   * "Now as mentioned, this status thing here is an object with various
   * properties, and therefore, we can actually use object destructuring
   * here to pull out that one property I am interested in here. And that's
   * the pending property."
   *
   * INSTRUCTOR QUOTE:
   * "And this then gives you a status object, which, for example, has a
   * pending property, which is true if there is an ongoing request and
   * false otherwise."
   *
   * PENDING STATE TIMELINE:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  1. Form is idle                    → pending = false              │
   * │  2. User clicks submit button       → pending = true               │
   * │  3. Server Action is executing      → pending = true               │
   * │  4. Server Action completes         → pending = false              │
   * │  5. (redirect happens or error)                                    │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  const { pending } = useFormStatus();

  /**
   * CONDITIONAL BUTTON RENDERING
   *
   * INSTRUCTOR QUOTE:
   * "Well and then meals-form-submit should return a button which says
   * Share Meal. So what I had on this button here before as well, but
   * actually it shouldn't always say that. Instead, I wanna output some
   * conditional content here and check if pending is truthy, in which
   * case I want to output the text Submitting, and otherwise I'll output
   * the text Share Meal."
   *
   * INSTRUCTOR QUOTE:
   * "In addition, I want to disable the button if we are submitting. So
   * I'll set the disabled prop to pending, so that we do disable the
   * button if the surrounding form is being submitted and we enable it,
   * if that's not the case."
   *
   * WHY DISABLE THE BUTTON?
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  PREVENTS DUPLICATE SUBMISSIONS:                                    │
   * │                                                                      │
   * │  Without disabled:                                                  │
   * │  • User clicks button multiple times while waiting                  │
   * │  • Multiple Server Action calls are triggered                       │
   * │  • Multiple meals get created (oops!)                               │
   * │                                                                      │
   * │  With disabled:                                                     │
   * │  • Button is unclickable during submission                          │
   * │  • Only one Server Action call is made                              │
   * │  • One meal gets created (correct!)                                 │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * BUTTON STATES:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  STATE     │  pending  │  disabled  │  TEXT                        │
   * │  ─────────│──────────│────────────│────────────────────────────── │
   * │  Idle      │  false    │  false     │  "Share Meal"                │
   * │  Submitting│  true     │  true      │  "Submitting..."             │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  return (
    <button disabled={pending}>
      {pending ? 'Submitting...' : 'Share Meal'}
    </button>
  );
}

/**
 * ============================================================================
 * LESSON 467 - FORM SUBMISSION LOADING STATE SUMMARY
 * ============================================================================
 *
 * WHAT WE LEARNED:
 *
 * 1. useFormStatus HOOK
 *
 *    INSTRUCTOR QUOTE:
 *    "And to do that, we can use another special hook called useFormStatus."
 *
 *    • Imported from 'react-dom' (not 'react')
 *    • Returns { pending, data, method, action }
 *    • pending is true during form submission
 *
 * 2. MUST BE INSIDE THE FORM
 *
 *    INSTRUCTOR QUOTE:
 *    "This hook here will actually only give us the status of a form if it's
 *    inside of that form for which it should give us the status."
 *
 *    <form>
 *      <ComponentWithUseFormStatus />  ← Works!
 *    </form>
 *
 *    <ComponentWithUseFormStatus />    ← Won't work (outside form)
 *    <form>...</form>
 *
 * 3. REQUIRES CLIENT COMPONENT
 *
 *    INSTRUCTOR QUOTE:
 *    "This hook requires a client component in order to work, which makes
 *    sense because it is about updating the client side UI."
 *
 *    • Add 'use client' directive at top of file
 *    • Keep it in a separate component to minimize Client Components
 *
 * 4. IMPROVES USER EXPERIENCE
 *
 *    INSTRUCTOR QUOTE:
 *    "And if I click Share Meal, you now see this button changes, and
 *    therefore we get a better feedback."
 *
 *    • Shows visual feedback during submission
 *    • Prevents duplicate submissions via disabled state
 *    • Makes the app feel more responsive
 *
 * USAGE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  // In your form page (can be Server Component):                       │
 * │  import MealsFormSubmit from '@/components/meals/meals-form-submit';  │
 * │                                                                          │
 * │  <form action={serverAction}>                                          │
 * │    ...form fields...                                                   │
 * │    <MealsFormSubmit />                                                 │
 * │  </form>                                                                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
