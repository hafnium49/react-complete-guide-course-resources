/**
 * ============================================================================
 * SHARE MEAL PAGE - LESSONS 459-464 & 467: Form, Image Picker, Server Actions & Loading State
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
 * LESSON 463 - INTRODUCING SERVER ACTIONS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now when it comes to handling form submissions, we could do that as we do
 * it in most React projects. We can go to the component that contains the
 * form and then we could add the onSubmit prop and define a function that
 * should be executed when the form is submitted. There, we could then prevent
 * the browser default, manually collect all the data, and send that data to
 * a backend."
 *
 * INSTRUCTOR QUOTE:
 * "But again, here we already are on the backend, at least kind of. We have
 * a full stack application that has both backend and frontend. And that's
 * why Next.js gives us a more powerful and convenient pattern than manually
 * handling the form submission and collecting the data and sending it to
 * a server."
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
 * SERVER COMPONENT VS CLIENT COMPONENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now this form here in this page component file, it's part of a server
 * component. This again is a server component because we have no use client
 * directive at the top."
 *
 * WHY SERVER COMPONENT FOR A FORM?
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ✓ Forms work without JavaScript (progressive enhancement)             │
 * │  ✓ Can define Server Actions directly in the component                 │
 * │  ✓ Reduced JavaScript bundle size                                       │
 * │                                                                          │
 * │  SOLUTION FOR INTERACTIVE PARTS (Lesson 460):                           │
 * │  ✓ Interactive parts (ImagePicker) are separate Client Components      │
 * │  ✓ This page stays a Server Component for optimal performance          │
 * └─────────────────────────────────────────────────────────────────────────┘
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
 * │      └── <form action={shareMeal}>  → Connected to Server Action        │
 * │          ├── Row       → Name + Email (side by side)                    │
 * │          ├── Title     → Meal title input                               │
 * │          ├── Summary   → Short description input                        │
 * │          ├── Textarea  → Detailed instructions                          │
 * │          ├── ImagePicker → Custom image upload (Client Component)       │
 * │          └── Button    → Submit button                                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @returns {JSX.Element} The share meal form page
 */
export default function ShareMealPage() {
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
        <form className={classes.form} action={shareMeal}>
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
 * LESSONS 459-464 & 467 - SHARE MEAL FORM SUMMARY
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
 * │  app/meals/share/page.js (this file - Server Component)               │
 * │  └── import MealsFormSubmit from '@/components/meals/meals-form-submit'│
 * │  └── <MealsFormSubmit /> inside the form                              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * COMING NEXT:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  • Add form validation and error handling                             │
 * │  • Display validation errors to users                                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
