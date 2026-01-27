/**
 * ============================================================================
 * SHARE MEAL PAGE - LESSONS 459 & 460: Form Setup & Image Picker Integration
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
 * INSTRUCTOR QUOTE:
 * "In that page component, you see I'm outputting a header with some dummy
 * text and then a main section with a form and that form then contains a
 * couple of inputs with labels and one special input here at the end, which
 * will work in a couple of minutes."
 *
 * ============================================================================
 * SERVER COMPONENT VS CLIENT COMPONENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now this form here in this page component file, it's part of a server
 * component. This again is a server component because we have no use client
 * directive at the top. Therefore we also can't use any client-side features
 * like the useState hook, for example."
 *
 * WHY SERVER COMPONENT FOR A FORM?
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ✓ Forms work without JavaScript (progressive enhancement)             │
 * │  ✓ Can use Server Actions for form handling (coming in later lessons)  │
 * │  ✓ Reduced JavaScript bundle size                                       │
 * │                                                                          │
 * │  LIMITATIONS:                                                           │
 * │  ✗ Cannot use useState, useEffect, or other hooks                       │
 * │  ✗ Cannot add client-side event handlers (onClick, onChange)            │
 * │  ✗ Some interactive components will need 'use client'                   │
 * │                                                                          │
 * │  SOLUTION (Lesson 460):                                                 │
 * │  ✓ Interactive parts (ImagePicker) are separate Client Components      │
 * │  ✓ This page stays a Server Component for optimal performance          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * FORM BEHAVIOR WITHOUT SERVER ACTIONS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "This form doesn't do anything useful with the request because we would
 * need a route handler or server actions to make this do something."
 *
 * CURRENT STATE (will be enhanced in later lessons):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  NOW:                                                                   │
 * │  • Form submits via default browser behavior                            │
 * │  • No server-side handling yet                                          │
 * │  • Page refreshes on submit                                             │
 * │                                                                          │
 * │  COMING SOON (Lesson 461+):                                             │
 * │  • Server Actions will handle form submission                           │
 * │  • Data will be saved to the database                                   │
 * │  • Image upload will be processed                                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';

/**
 * SHARE MEAL PAGE COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "In that page component, you see I'm outputting a header with some dummy
 * text and then a main section with a form."
 *
 * COMPONENT STRUCTURE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  <Fragment>                                                             │
 * │  ├── <header>          → Page title and description                     │
 * │  │   ├── <h1>          → "Share your favorite meal"                     │
 * │  │   └── <p>           → Subtitle text                                  │
 * │  │                                                                       │
 * │  └── <main>            → Form container                                 │
 * │      └── <form>        → Meal submission form                           │
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
       * MAIN FORM SECTION
       *
       * INSTRUCTOR QUOTE:
       * "And then a main section with a form and that form then contains a
       * couple of inputs with labels."
       *
       * NOTE: This form currently has no action attribute or Server Action.
       * Form handling will be added in Lesson 461 with Server Actions.
       */}
      <main className={classes.main}>
        <form className={classes.form}>
          {/**
           * ROW 1: NAME AND EMAIL (SIDE BY SIDE)
           *
           * Uses flexbox via .row class to display inputs horizontally.
           * Both fields are required for meal attribution.
           *
           * NAME INPUT ATTRIBUTES:
           * - htmlFor/id: Links label to input for accessibility
           * - name: Used by FormData to identify the field
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
           */}
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>

          {/**
           * SHORT SUMMARY INPUT
           *
           * Brief description shown on meal cards in the grid.
           * Should be concise - full details go in instructions.
           */}
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>

          {/**
           * INSTRUCTIONS TEXTAREA
           *
           * Multi-line input for detailed cooking instructions.
           * Uses textarea element for longer content.
           *
           * ATTRIBUTES:
           * - rows="10": Sets visible height to 10 lines
           * - required: Must be filled before submission
           *
           * NOTE: In the database, newlines (\n) are stored and later
           * converted to <br /> tags when displayed (see [mealSlug]/page.js)
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
           * INSTRUCTOR QUOTE:
           * "So I got this IMAGE PICKER placeholder here, and my idea here simply
           * is to display an image picker that can be used by the user to attach
           * an image to the form and to upload an image when the form is submitted."
           *
           * INSTRUCTOR QUOTE:
           * "Now for that, I'll actually build a separate component since this
           * image picker is a bit more complex."
           *
           * WHY A SEPARATE COMPONENT?
           * ┌─────────────────────────────────────────────────────────────────┐
           * │  • ImagePicker needs onClick handlers → requires 'use client'   │
           * │  • This page.js stays as a Server Component                     │
           * │  • Interactive parts are isolated in their own Client Component │
           * │  • Best of both worlds: Server Component page + Client islands  │
           * └─────────────────────────────────────────────────────────────────┘
           *
           * INSTRUCTOR QUOTE (on using ImagePicker):
           * "So back in page.js, in this form here where I have this image picker,
           * we can output the ImagePicker using our own custom ImagePicker
           * component. Of course, for that, you must import it from that
           * components folder."
           *
           * PROPS PASSED:
           * - label: Text shown above the picker ("Your image")
           * - name: The input's name attribute, used when extracting from FormData
           */}
          <ImagePicker label="Your image" name="image" />

          {/**
           * FORM ACTIONS (SUBMIT BUTTON)
           *
           * Right-aligned submit button with gradient styling.
           * Currently triggers default form submission.
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
 * LESSONS 459 & 460 - SHARE MEAL FORM SUMMARY
 * ============================================================================
 *
 * WHAT WE LEARNED:
 *
 * LESSON 459 - FORM STRUCTURE:
 *
 * 1. SERVER COMPONENT FORMS
 *
 *    INSTRUCTOR QUOTE:
 *    "This again is a server component because we have no use client directive
 *    at the top. Therefore we also can't use any client-side features like the
 *    useState hook."
 *
 *    - Forms can exist in Server Components
 *    - Standard HTML form behavior works without JS
 *    - Client interactivity requires separate Client Components
 *
 * 2. FORM FIELDS
 *
 *    ┌─────────────────────────────────────────────────────────────────────┐
 *    │  FIELD         │  TYPE          │  PURPOSE                          │
 *    │  ─────────────│────────────────│────────────────────────────────── │
 *    │  name          │  text          │  Creator's name for attribution   │
 *    │  email         │  email         │  Creator's email (mailto link)    │
 *    │  title         │  text          │  Meal display name                │
 *    │  summary       │  text          │  Short description for cards      │
 *    │  instructions  │  textarea      │  Detailed cooking steps           │
 *    │  image         │  ImagePicker   │  Custom file upload (Lesson 460)  │
 *    └─────────────────────────────────────────────────────────────────────┘
 *
 * LESSON 460 - IMAGE PICKER INTEGRATION:
 *
 * 3. SERVER + CLIENT COMPONENT PATTERN
 *
 *    INSTRUCTOR QUOTE:
 *    "Now for that, I'll actually build a separate component since this
 *    image picker is a bit more complex."
 *
 *    THE "ISLANDS" ARCHITECTURE:
 *    ┌─────────────────────────────────────────────────────────────────────┐
 *    │  page.js (Server Component)                                        │
 *    │  ├── Static header content                                         │
 *    │  ├── Static form inputs                                            │
 *    │  └── <ImagePicker> (Client Component "island")                    │
 *    │       └── Has onClick, useRef, and other client features          │
 *    └─────────────────────────────────────────────────────────────────────┘
 *
 *    BENEFITS:
 *    - Page stays a Server Component (smaller JS bundle)
 *    - Only interactive parts ship JavaScript to the client
 *    - Best of both worlds: SSR benefits + client interactivity
 *
 * 4. USING CLIENT COMPONENTS IN SERVER COMPONENTS
 *
 *    INSTRUCTOR QUOTE:
 *    "So back in page.js, in this form here where I have this image picker,
 *    we can output the ImagePicker using our own custom ImagePicker
 *    component."
 *
 *    - Just import and use like any React component
 *    - The Client Component handles its own hydration
 *    - Props are passed normally from Server to Client
 *
 * UPCOMING LESSONS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  LESSON 461: Introduce Server Actions for form handling                │
 * │  LESSON 462+: Handle image upload and database storage                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
