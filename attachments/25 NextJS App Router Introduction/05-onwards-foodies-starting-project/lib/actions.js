/**
 * ============================================================================
 * SERVER ACTIONS FILE - LESSONS 464, 466 & 468: Server Actions, Data Storage & Validation
 * ============================================================================
 *
 * LESSON 464 - WHY SEPARATE SERVER ACTIONS INTO THEIR OWN FILE?
 *
 * INSTRUCTOR QUOTE:
 * "So this is how we can add a Server action. There also is another way of
 * adding it though. You can add it in a component like this, but this will
 * only work if the component in which you are adding it is not a client
 * component."
 *
 * PROBLEM WITH SERVER ACTIONS IN COMPONENT FILES:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  SCENARIO: You have a form component that needs:                        │
 * │  • useState for form validation feedback                                │
 * │  • A Server Action to handle submission                                 │
 * │                                                                          │
 * │  PROBLEM:                                                               │
 * │  • useState requires 'use client' at the top of the file               │
 * │  • Server Actions cannot be in files with 'use client'                  │
 * │  • ❌ You get an error!                                                  │
 * │                                                                          │
 * │  INSTRUCTOR QUOTE:                                                      │
 * │  "If you had use client here at the top because somewhere else in the  │
 * │  component you might be using some client-only feature, you would get  │
 * │  an error that you are not allowed to have server actions in a client  │
 * │  component file."                                                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * THE SOLUTION: SEPARATE FILES FOR SERVER ACTIONS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "In addition, you also might not want to have your server-side form
 * submission handling logic in the same file as your JSX code. You might
 * want to separate that. And for those reasons, you can also store server
 * actions in separate files."
 *
 * BENEFITS OF SEPARATING SERVER ACTIONS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. COMPATIBILITY WITH CLIENT COMPONENTS                                │
 * │     • Can be imported into 'use client' files                          │
 * │     • Avoids the "can't mix client/server" error                       │
 * │                                                                          │
 * │  2. CODE ORGANIZATION                                                   │
 * │     • Separates server logic from UI code                               │
 * │     • Easier to find and maintain server-side code                      │
 * │     • Can group related actions together                                │
 * │                                                                          │
 * │  3. REUSABILITY                                                         │
 * │     • Same action can be used by multiple components                    │
 * │     • Easy to share across different pages                              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * FILE-LEVEL 'use server' VS FUNCTION-LEVEL 'use server'
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "What's important in that file though is that it has that Use Server
 * directive at the top. So now not inside of a function, but instead at
 * the top of a file."
 *
 * COMPARISON:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FUNCTION-LEVEL 'use server' (Lesson 463):                              │
 * │                                                                          │
 * │  // In a Server Component file (page.js)                                │
 * │  async function shareMeal(formData) {                                   │
 * │    'use server';  // ← Inside the function                              │
 * │    // ... server code                                                   │
 * │  }                                                                      │
 * │                                                                          │
 * │  ────────────────────────────────────────────────────────────────────── │
 * │                                                                          │
 * │  FILE-LEVEL 'use server' (Lesson 464 - THIS FILE):                      │
 * │                                                                          │
 * │  'use server';  // ← At top of file                                     │
 * │                                                                          │
 * │  export async function shareMeal(formData) {                            │
 * │    // No 'use server' needed here!                                      │
 * │    // ... server code                                                   │
 * │  }                                                                      │
 * │                                                                          │
 * │  export async function anotherAction() {                                │
 * │    // Also a Server Action automatically!                               │
 * │  }                                                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "When adding it at the top of a file like this, all the functions you
 * might define in that file will be treated as Server Actions."
 *
 * ============================================================================
 * WHY THIS WORKS WITH CLIENT COMPONENTS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, you would not get an error when doing that, and that might sound
 * strange, but the problem before was simply that you were defining client
 * and server-side code in the same file, and the build process that's used
 * by NextJS is essentially not able to separate that in a clean way."
 *
 * THE TECHNICAL REASON:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  PROBLEM (same file):                                                   │
 * │  • Next.js bundler can't cleanly separate client/server code           │
 * │  • Server code could accidentally end up in client bundle              │
 * │  • Security risk: database queries, API keys could be exposed!         │
 * │                                                                          │
 * │  SOLUTION (separate files):                                             │
 * │  • 'use server' file is GUARANTEED to only run on server               │
 * │  • 'use client' file is bundled for the browser                        │
 * │  • When you import a Server Action, only a REFERENCE is passed         │
 * │  • The actual code stays on the server                                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "Therefore server-side code could accidentally end up on the client side,
 * which could pose security issues and cause other problems as well. That's
 * why for technical reasons, you can't mix both in the same file, but you
 * can absolutely import a server action from another file and then use it
 * in such a client component."
 *
 * ============================================================================
 * FILE NAMING CONVENTIONS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Therefore, here, I'll actually go back to that root lib folder, and add
 * an actions.js file in there, though the file name does not matter. It
 * doesn't have to be named actions.js, it could be any name."
 *
 * COMMON NAMING PATTERNS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  lib/actions.js        ← Generic actions file (THIS PROJECT)           │
 * │  lib/meal-actions.js   ← Actions for specific feature                   │
 * │  app/meals/actions.js  ← Colocated with the route                       │
 * │  actions/meals.js      ← Dedicated actions folder                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
'use server';

/**
 * ============================================================================
 * LESSON 466 - IMPORTS FOR DATA STORAGE AND NAVIGATION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "With that done, we can go back to our Server Action and there, instead
 * of console logging that meal, we can call saveMeal. So we can call this
 * function on which we just worked."
 *
 * saveMeal FUNCTION (from lib/meals.js):
 * - Generates a slug from the title
 * - Sanitizes instructions (XSS protection)
 * - Saves the image to public/images folder
 * - Inserts the meal record into the database
 */
import { saveMeal } from '@/lib/meals';

/**
 * REDIRECT FUNCTION FROM NEXT.JS
 *
 * INSTRUCTOR QUOTE:
 * "Now to provide a better user experience, we might want to redirect the
 * user once the meal data has been submitted. And for that we can go back
 * to our actions and here after saveMeal. We can call redirect and import
 * that from next navigation."
 *
 * INSTRUCTOR QUOTE:
 * "This redirect function will do what its name implies. It will redirect
 * the user to a different page. For that, you have to pass a path to redirect,
 * and that of course should be the path of the page you wanna redirect the
 * user to. So for example, to /meals."
 *
 * HOW redirect() WORKS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  redirect('/meals')                                                     │
 * │                                                                          │
 * │  1. Server Action completes (meal saved)                                │
 * │  2. redirect() is called                                                │
 * │  3. Server sends redirect response to browser                           │
 * │  4. Browser navigates to /meals                                         │
 * │  5. User sees the meals page with their new meal!                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * NOTE: redirect() throws an error internally to stop execution,
 * so no code after redirect() will run. This is intentional!
 */
import { redirect } from 'next/navigation';

/**
 * ============================================================================
 * LESSON 468 - SERVER-SIDE VALIDATION HELPER FUNCTION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And you should now probably do that for all those fields. And then over
 * here I'll actually add a helper function, isInvalidText, could be a fitting
 * name, where I expect to get some text and where I return the result of this
 * check so that I return true if the text we got is either false, or it's an
 * empty string after trimming it."
 *
 * WHY THIS HELPER FUNCTION?
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Instead of repeating the same validation logic for each field:        │
 * │                                                                          │
 * │  VERBOSE (without helper):                                               │
 * │  if (!meal.title || meal.title.trim() === '') { ... }                   │
 * │  if (!meal.summary || meal.summary.trim() === '') { ... }               │
 * │  if (!meal.instructions || meal.instructions.trim() === '') { ... }     │
 * │                                                                          │
 * │  CLEAN (with helper):                                                    │
 * │  if (isInvalidText(meal.title) || isInvalidText(meal.summary) || ...)   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * WHAT THIS FUNCTION CHECKS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  INPUT                  │  RETURNS  │  REASON                           │
 * │  ──────────────────────│──────────│─────────────────────────────────── │
 * │  undefined              │  true     │  Field wasn't in form data        │
 * │  null                   │  true     │  Explicitly null value            │
 * │  ''                     │  true     │  Empty string                     │
 * │  '   '                  │  true     │  Only whitespace (trimmed = '')   │
 * │  'Hello'                │  false    │  Valid text input                 │
 * │  '  Hello  '            │  false    │  Valid text (whitespace trimmed) │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @param {string} text - The text value to validate
 * @returns {boolean} true if text is invalid (falsy or empty after trim)
 */
function isInvalidText(text) {
  return !text || text.trim() === '';
}

/**
 * ============================================================================
 * SHARE MEAL SERVER ACTION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So that simply now allows us to go back to that Share page and grab that
 * share meal function here, and cut it from there, and instead move it into
 * this Actions file."
 *
 * INSTRUCTOR QUOTE:
 * "There it now must be exported so that it can be used in other files, and
 * you can and should now remove use server in here because we already got
 * that at the top of the file."
 *
 * CHANGES FROM THE INLINE VERSION (Lesson 463):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  BEFORE (in page.js):                                                   │
 * │  async function shareMeal(formData) {                                   │
 * │    'use server';  ← Was needed inside function                          │
 * │    // ...                                                               │
 * │  }                                                                      │
 * │                                                                          │
 * │  AFTER (in actions.js):                                                 │
 * │  export async function shareMeal(formData) {  ← Added 'export'          │
 * │    // No 'use server' needed - file-level directive handles it          │
 * │    // ...                                                               │
 * │  }                                                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @param {FormData} formData - Form data automatically provided by the form
 */
export async function shareMeal(formData) {
  /**
   * EXTRACTING FORM DATA
   *
   * The formData.get() method extracts values by their input name attribute.
   *
   * MAPPING:
   * - formData.get('title')       → <input name="title">
   * - formData.get('summary')     → <input name="summary">
   * - formData.get('instructions') → <textarea name="instructions">
   * - formData.get('image')       → <input name="image"> (File object)
   * - formData.get('name')        → <input name="name">
   * - formData.get('email')       → <input name="email">
   */
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  /**
   * ================================================================
   * LESSON 468 - SERVER-SIDE VALIDATION
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "One other thing you should typically do when handling user data and form
   * submissions is validate the values you are getting. And at the moment,
   * we're not performing any validation at all in our server action here."
   *
   * WHY CLIENT-SIDE VALIDATION ISN'T ENOUGH:
   *
   * INSTRUCTOR QUOTE:
   * "Now, we do have some validation, because in that form, I'm using those
   * built-in special attributes. Those required props here, to be precise,
   * to make sure that we can't submit an empty form... But it's not enough,
   * because I can disable that by going through the DevTools and removing
   * that."
   *
   * INSTRUCTOR QUOTE:
   * "Now of course, many users won't know about that, but some do, and in
   * that case, those users could submit invalid values to my backend."
   *
   * CLIENT-SIDE vs SERVER-SIDE VALIDATION:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  CLIENT-SIDE (required attribute in HTML):                          │
   * │  ✗ Can be bypassed via browser DevTools                            │
   * │  ✗ Can be bypassed by disabling JavaScript                         │
   * │  ✗ Can be bypassed by sending direct HTTP requests                 │
   * │  ✓ Good for UX - gives immediate feedback                          │
   * │                                                                      │
   * │  SERVER-SIDE (this validation):                                     │
   * │  ✓ Cannot be bypassed by users                                     │
   * │  ✓ Validates data before database insertion                        │
   * │  ✓ Protects data integrity                                          │
   * │  ✓ ESSENTIAL for security                                           │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * INSTRUCTOR QUOTE:
   * "So, here we could, for example, check if meal.title, once we trim it
   * to remove excess whitespace on the left and right, we could check if
   * that's then equal to an empty string, which would mean that it's an
   * invalid value. We could also check if meal.title maybe even doesn't
   * exist. So if it's false, so if it wasn't part of the submitted data
   * at all."
   *
   * VALIDATION RULES:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  FIELD           │  VALIDATION                                      │
   * │  ────────────────│────────────────────────────────────────────────  │
   * │  title           │  Must exist and not be empty after trim         │
   * │  summary         │  Must exist and not be empty after trim         │
   * │  instructions    │  Must exist and not be empty after trim         │
   * │  creator         │  Must exist and not be empty after trim         │
   * │  creator_email   │  Must exist, not empty, AND contain @           │
   * │  image           │  Must exist AND have size > 0                   │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * INSTRUCTOR QUOTE (on email validation):
   * "And we also might wanna check whether that maybe exists, but is an
   * invalid email address, so, I'll also check if meal.creator_email does
   * not include an @ symbol by adding an exclamation mark here at the
   * beginning."
   *
   * INSTRUCTOR QUOTE (on image validation):
   * "And last but not least, I want to check the image that we got. I wanna
   * check if maybe we don't have an image. So, if it's undefined, or if
   * that image here has a size that's equal to zero, which means it's some
   * kind of invalid file."
   */
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    /**
     * THROWING AN ERROR FOR INVALID INPUT
     *
     * INSTRUCTOR QUOTE:
     * "And in all those cases I wanna make it into this if block, and then
     * do what? Well, then we could throw an error. So, we could throw an
     * error where we say invalid input."
     *
     * WHAT HAPPENS WHEN WE THROW:
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │  1. Error is thrown from the Server Action                         │
     * │  2. Next.js catches the error                                      │
     * │  3. Next.js looks for nearest error.js file                        │
     * │  4. Error boundary renders the error UI                            │
     * │  5. User sees error page (app/meals/share/error.js)                │
     * └─────────────────────────────────────────────────────────────────────┘
     *
     * TRADE-OFF - THROWING vs RETURNING ERROR STATE:
     *
     * INSTRUCTOR QUOTE:
     * "Throwing an error as we do it here works, but it also means that we
     * destroy the entire input of the user. So, we throw away everything
     * they entered. And that's not necessarily a great user experience."
     *
     * INSTRUCTOR QUOTE:
     * "It would be better if we would stay on this page and just output
     * some error message somewhere on this page, above the form or below
     * the form, for example. And that's therefore what we'll implement next."
     *
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │  CURRENT APPROACH (throw error):                                   │
     * │  ✗ User loses all form input                                       │
     * │  ✗ Redirects to error page                                         │
     * │  ✗ User must start over                                            │
     * │  ✓ Simple to implement                                             │
     * │                                                                      │
     * │  BETTER APPROACH (coming next lesson):                             │
     * │  ✓ User keeps form input                                           │
     * │  ✓ Stays on same page                                              │
     * │  ✓ Shows error message inline                                      │
     * │  → Requires useFormState (React 19) or similar                     │
     * └─────────────────────────────────────────────────────────────────────┘
     */
    throw new Error('Invalid input');
  }

  /**
   * ================================================================
   * LESSON 466 - SAVE MEAL TO DATABASE AND FILE SYSTEM
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "With that done, we can go back to our Server Action and there, instead
   * of console logging that meal, we can call saveMeal. So we can call this
   * function on which we just worked."
   *
   * INSTRUCTOR QUOTE:
   * "Now saveMeal will return a promise, so we can also add async here
   * and then use await here."
   *
   * WHAT saveMeal() DOES:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  1. Generates slug from title (slugify)                             │
   * │  2. Sanitizes instructions (XSS protection)                         │
   * │  3. Extracts file extension from uploaded image                     │
   * │  4. Creates unique filename using slug                              │
   * │  5. Writes image to public/images/{slug}.{ext}                     │
   * │  6. Stores image PATH (not file) in meal object                     │
   * │  7. Inserts meal record into SQLite database                        │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  await saveMeal(meal);

  /**
   * ================================================================
   * LESSON 466 - REDIRECT AFTER SUCCESSFUL SUBMISSION
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Now to provide a better user experience, we might want to redirect
   * the user once the meal data has been submitted. And for that we can
   * go back to our actions and here after saveMeal. We can call redirect
   * and import that from next navigation."
   *
   * INSTRUCTOR QUOTE:
   * "This redirect function will do what its name implies. It will redirect
   * the user to a different page. For that, you have to pass a path to
   * redirect, and that of course should be the path of the page you wanna
   * redirect the user to. So for example, to /meals."
   *
   * USER EXPERIENCE FLOW:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  1. User fills out the form and clicks "Share Meal"                │
   * │  2. Form data is sent to this Server Action                         │
   * │  3. saveMeal() processes and stores the data                        │
   * │  4. redirect('/meals') navigates user to meals page                │
   * │  5. User sees their new meal in the list!                           │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * INSTRUCTOR QUOTE:
   * "But if I do all that and I then click Share Meal, initially, still
   * nothing happens. We'll take care of that soon. But after a short while,
   * we are redirected and I see my new meal here, so that all works."
   *
   * NOTE: The slight delay before redirect is because:
   * - Image needs to be written to disk
   * - Database INSERT needs to complete
   * - We'll add loading UI in a future lesson
   */
  redirect('/meals');
}

/**
 * ============================================================================
 * LESSONS 464, 466 & 468 - SERVER ACTIONS SUMMARY
 * ============================================================================
 *
 * LESSON 464 - SERVER ACTIONS SEPARATION:
 *
 * 1. WHY SEPARATE SERVER ACTIONS?
 *    • Can't have 'use server' in files with 'use client'
 *    • Better code organization (separation of concerns)
 *
 * 2. FILE-LEVEL 'use server' DIRECTIVE
 *    • Put 'use server' at TOP of file (not inside functions)
 *    • ALL exported functions become Server Actions
 *
 * 3. WORKS WITH CLIENT COMPONENTS
 *    • Can import Server Actions into 'use client' files
 *    • Only a reference is passed, code stays on server
 *
 * LESSON 466 - CALLING DATA FUNCTIONS & REDIRECTING:
 *
 * 4. CALLING saveMeal() FROM SERVER ACTION
 *
 *    INSTRUCTOR QUOTE:
 *    "With that done, we can go back to our Server Action and there, instead
 *    of console logging that meal, we can call saveMeal."
 *
 *    await saveMeal(meal);
 *    → Generates slug, sanitizes data, saves image, inserts into DB
 *
 * 5. REDIRECTING AFTER FORM SUBMISSION
 *
 *    INSTRUCTOR QUOTE:
 *    "Now to provide a better user experience, we might want to redirect
 *    the user once the meal data has been submitted."
 *
 *    import { redirect } from 'next/navigation';
 *    redirect('/meals');  // Navigate to meals page after save
 *
 * LESSON 468 - SERVER-SIDE VALIDATION:
 *
 * 6. WHY CLIENT-SIDE VALIDATION ISN'T ENOUGH
 *
 *    INSTRUCTOR QUOTE:
 *    "Now, we do have some validation, because in that form, I'm using those
 *    built-in special attributes. Those required props here, to be precise...
 *    But it's not enough, because I can disable that by going through the
 *    DevTools and removing that."
 *
 *    CLIENT-SIDE VALIDATION CAN BE BYPASSED:
 *    • Remove 'required' attribute via DevTools
 *    • Disable JavaScript in browser
 *    • Send direct HTTP requests to Server Action
 *
 * 7. THE isInvalidText HELPER FUNCTION
 *
 *    INSTRUCTOR QUOTE:
 *    "I'll actually add a helper function, isInvalidText, could be a fitting
 *    name, where I expect to get some text and where I return the result of
 *    this check so that I return true if the text we got is either false, or
 *    it's an empty string after trimming it."
 *
 *    function isInvalidText(text) {
 *      return !text || text.trim() === '';
 *    }
 *
 * 8. VALIDATION RULES IMPLEMENTED
 *
 *    ┌─────────────────────────────────────────────────────────────────────┐
 *    │  • Text fields: Must exist and not be empty after trim             │
 *    │  • Email: Must also include @ symbol                               │
 *    │  • Image: Must exist and have size > 0                             │
 *    └─────────────────────────────────────────────────────────────────────┘
 *
 * 9. THROWING ERRORS ON INVALID INPUT
 *
 *    INSTRUCTOR QUOTE:
 *    "Throwing an error as we do it here works, but it also means that we
 *    destroy the entire input of the user. So, we throw away everything
 *    they entered. And that's not necessarily a great user experience."
 *
 *    → User loses all form data
 *    → Gets redirected to error page
 *    → Must start over
 *    → Better approach coming in next lesson!
 *
 * COMPLETE FLOW AFTER LESSON 468:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  USER ACTION:                                                           │
 * │  1. Fills out form on /meals/share                                     │
 * │  2. Clicks "Share Meal" button                                          │
 * │                                                                          │
 * │  SERVER ACTION (shareMeal):                                             │
 * │  3. Extracts form data into meal object                                 │
 * │  4. VALIDATES all fields (Lesson 468):                                  │
 * │     - Text fields: not empty after trim                                 │
 * │     - Email: must include @                                             │
 * │     - Image: must exist with size > 0                                   │
 * │  5. If invalid → throws Error → shows error.js page                    │
 * │  6. Calls saveMeal(meal):                                               │
 * │     a. Generates slug from title                                        │
 * │     b. Sanitizes instructions (XSS)                                     │
 * │     c. Saves image to public/images/                                    │
 * │     d. Inserts record into SQLite                                       │
 * │  7. Calls redirect('/meals')                                            │
 * │                                                                          │
 * │  RESULT:                                                                │
 * │  8. User sees /meals page with their new meal in the list!             │
 * │     (Or error page if validation failed)                               │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ARCHITECTURE OVERVIEW:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  app/meals/share/page.js                                               │
 * │  └── <form action={shareMeal}>                                          │
 * │           │                                                              │
 * │           ▼                                                              │
 * │  lib/actions.js                                                         │
 * │  └── shareMeal(formData)                                                │
 * │           │                                                              │
 * │      ┌────┴────┐                                                        │
 * │      │ VALIDATE │ ← Lesson 468                                          │
 * │      └────┬────┘                                                        │
 * │           │                                                              │
 * │    ┌──────┴──────┐                                                      │
 * │    │             │                                                       │
 * │  INVALID       VALID                                                    │
 * │    │             │                                                       │
 * │    ▼             ▼                                                       │
 * │  throw Error   lib/meals.js                                             │
 * │    │           └── saveMeal(meal)                                       │
 * │    │                    │                                               │
 * │    ▼                    ▼                                               │
 * │  error.js         redirect('/meals')                                    │
 * │  (share/)         → user sees meal!                                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * COMING NEXT:
 * • Better error handling (stay on page, show inline errors)
 * • useFormState for returning validation errors
 *
 * ============================================================================
 */
