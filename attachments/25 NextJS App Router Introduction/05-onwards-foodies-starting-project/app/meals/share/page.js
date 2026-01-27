/**
 * ============================================================================
 * SHARE MEAL PAGE - LESSONS 459-463: Form Setup, Image Picker & Server Actions
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
import classes from './page.module.css';

/**
 * ============================================================================
 * SHARE MEAL SERVER ACTION (LESSON 463)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Instead, we can create a function in the component that holds the form,
 * for example, which we could call shareMeal here, though the name is up
 * to you."
 *
 * WHAT IS A SERVER ACTION?
 *
 * INSTRUCTOR QUOTE:
 * "'use server' inside of a function is different because this creates a
 * so-called Server Action, which is a function that's guaranteed to execute
 * on the server, and only there."
 *
 * INSTRUCTOR QUOTE:
 * "So just as components by default are server components which only execute
 * on the server, this is now a function that only executes on a server. But
 * in case of functions, you must explicitly state that it belongs to the
 * server by adding this directive inside of them if you wanna create such
 * a Server Action."
 *
 * 'use server' VS 'use client' COMPARISON:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  DIRECTIVE        │  LOCATION         │  EFFECT                         │
 * │  ────────────────│───────────────────│─────────────────────────────── │
 * │  'use client'     │  Top of FILE      │  Makes component a Client Comp  │
 * │  'use server'     │  Inside FUNCTION  │  Makes function a Server Action │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "In addition, to really turn this into a so-called Server Action, you
 * also must add the 'async' keyword in front of it."
 *
 * SERVER ACTION REQUIREMENTS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. 'use server' directive INSIDE the function body                    │
 * │  2. async keyword in front of the function                              │
 * │  3. Receives FormData object as first parameter                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @param {FormData} formData - Automatically provided by the form submission
 */
async function shareMeal(formData) {
  /**
   * 'use server' DIRECTIVE
   *
   * INSTRUCTOR QUOTE:
   * "And we can then add a special directive in this function, so inside
   * of this function body. And that's the 'use server' directive."
   *
   * THIS DIRECTIVE:
   * - Marks this function as a Server Action
   * - Guarantees this code ONLY runs on the server
   * - Never exposes this code to the client/browser
   * - Enables direct database access, file system operations, etc.
   */
  'use server';

  /**
   * ================================================================
   * EXTRACTING FORM DATA (LESSON 463)
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And this function will then automatically receive that formData that
   * was submitted. So, the data that was gathered by the inputs in the form
   * collected in a formData object, using that formData class that's
   * available in JavaScript."
   *
   * HOW formData.get() WORKS:
   *
   * INSTRUCTOR QUOTE:
   * "This formData object that we're getting will have a get method that
   * allows us to get the value that was entered into a certain input field,
   * and the input field is identified by its name."
   *
   * INSTRUCTOR QUOTE:
   * "So, if I get the value of the input field with the name 'title', I am
   * getting the value of this input field here because this input field
   * has that name, 'title'."
   *
   * MAPPING OF FORM FIELDS TO FORMDATA:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  INPUT ELEMENT               │  EXTRACT WITH                        │
   * │  ──────────────────────────│────────────────────────────────────── │
   * │  <input name="name">        │  formData.get('name')                │
   * │  <input name="email">       │  formData.get('email')               │
   * │  <input name="title">       │  formData.get('title')               │
   * │  <input name="summary">     │  formData.get('summary')             │
   * │  <textarea name="instructions"> │ formData.get('instructions')    │
   * │  <input name="image">       │  formData.get('image')               │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    /**
     * IMAGE FILE EXTRACTION
     *
     * INSTRUCTOR QUOTE:
     * "And get the image from formData.get 'image'. Now, for this to work,
     * we have to make sure that we pass the appropriate name to our
     * ImagePicker component."
     *
     * NOTE: This returns a File object, not a string. The file will be
     * processed and stored in a later lesson.
     */
    image: formData.get('image'),
    /**
     * CREATOR INFORMATION
     *
     * INSTRUCTOR QUOTE:
     * "I'll also get the creator of that meal by accessing formData.get
     * 'name', because I'm getting that name of the person who created
     * that meal from that name input field, so with a name of 'name',
     * so that's why I'm extracting it like this."
     */
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  /**
   * TEMPORARY: LOG TO CONSOLE (LESSON 463)
   *
   * INSTRUCTOR QUOTE:
   * "But what's important to understand here is that you can use this
   * Server Actions feature to create such a function that will be triggered
   * when a form is submitted. And in order to see this in action, we'll not
   * store that data yet, but instead simply log it to the console, like this."
   *
   * WHERE DOES THIS LOG APPEAR?
   *
   * INSTRUCTOR QUOTE:
   * "If I click Share Meal, and I open the developer tools before doing that,
   * you see no log here, but you also see that the page didn't reload...
   * And instead, you'll see some output here on the server side in your
   * terminal, in that terminal where you started the development server."
   *
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  SERVER ACTION OUTPUT LOCATION:                                     │
   * │                                                                      │
   * │  ✗ NOT in browser console (DevTools)                               │
   * │  ✓ IN the terminal running `npm run dev`                           │
   * │                                                                      │
   * │  This proves the code runs on the SERVER, not the client!          │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * TODO (NEXT LESSON): Replace console.log with actual database storage
   */
  console.log(meal);
}

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
           * FORM ACTIONS (SUBMIT BUTTON)
           *
           * When clicked, triggers the form submission which:
           * 1. Collects all form data
           * 2. Calls the shareMeal Server Action
           * 3. Does NOT reload the page
           *
           * FUTURE ENHANCEMENTS (coming in later lessons):
           * - Button will show loading state during submission
           * - Disabled state when form is submitting
           * - Error messages will appear if submission fails
           */}
          <p className={classes.actions}>
            <button type="submit">Share Meal</button>
          </p>
        </form>
      </main>
    </>
  );
}

/**
 * ============================================================================
 * LESSONS 459-463 - SHARE MEAL FORM SUMMARY
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
 * LESSON 463 - SERVER ACTIONS:
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
 * 4. SERVER ACTION SYNTAX
 *
 *    async function shareMeal(formData) {
 *      'use server';  // ← INSIDE the function body
 *      // ... server-side code
 *    }
 *
 *    <form action={shareMeal}>  // ← Assign as action prop
 *
 * 5. BENEFITS OF SERVER ACTIONS
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
 * COMING NEXT:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  • Store meal data in the database                                     │
 * │  • Save uploaded image to file system                                  │
 * │  • Redirect user after successful submission                          │
 * │  • Add form validation and error handling                             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
