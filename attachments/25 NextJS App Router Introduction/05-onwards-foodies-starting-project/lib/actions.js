/**
 * ============================================================================
 * SERVER ACTIONS FILE - LESSONS 464, 466, 468, 469, 471 & 472: Server Actions, Validation & Cache Revalidation
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
 * LESSON 471 - CACHE REVALIDATION IMPORT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And that function is called revalidatePath. This function tells NextJS
 * to revalidate the cache that belongs to a certain route path."
 *
 * revalidatePath FUNCTION (from next/cache):
 * - Built-in Next.js function for cache invalidation
 * - Tells Next.js to throw away cached data for specific routes
 * - Essential for showing fresh data after mutations (add/edit/delete)
 *
 * WHY WE NEED THIS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  PROBLEM (Lesson 470):                                                  │
 * │  • npm run build pre-renders and caches all pages                       │
 * │  • New meals are saved to database but cached page shows old data       │
 * │  • Users don't see their newly added meals!                             │
 * │                                                                          │
 * │  SOLUTION (Lesson 471):                                                 │
 * │  • Call revalidatePath() after saving new data                          │
 * │  • Next.js throws away the cached version of that page                  │
 * │  • Next request will fetch fresh data and re-render                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 */
import { revalidatePath } from 'next/cache';

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
 * ============================================================================
 * LESSON 469 - FUNCTION SIGNATURE CHANGE FOR useFormState
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "With that though, we also need to tweak the shareMeal action though,
 * because when passing it as a value to useFormState, it must have a different
 * shape than it did before. It should no longer just accept that form data.
 * Instead, it should now actually accept two parameters."
 *
 * INSTRUCTOR QUOTE:
 * "The second parameter will still be that submitted data, but the first
 * parameter will be the previous state. So either that initial state that
 * we set up here or any other previous responses that might have been
 * generated. I don't care about it here, but still we need to accept it
 * because form data is now the second argument we get, not the first."
 *
 * FUNCTION SIGNATURE CHANGE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  BEFORE (Lesson 468):                                                   │
 * │  export async function shareMeal(formData) {                            │
 * │    // formData is the only parameter                                    │
 * │  }                                                                      │
 * │                                                                          │
 * │  AFTER (Lesson 469 - for useFormState):                                 │
 * │  export async function shareMeal(prevState, formData) {                 │
 * │    // prevState: previous state/response (from useFormState)            │
 * │    // formData: the actual form data (now SECOND parameter!)            │
 * │  }                                                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * WHY THIS SIGNATURE CHANGE IS REQUIRED:
 * - useFormState needs to pass the previous state to the action
 * - This enables the action to know what was returned previously
 * - The formData is now passed as the SECOND argument
 * - If you forget this, you'll try to call .get() on the state object!
 *
 * @param {Object} prevState - Previous state from useFormState (or initial state)
 * @param {FormData} formData - Form data automatically provided by the form
 * @returns {Object} Response object with message property (on validation error)
 */
export async function shareMeal(prevState, formData) {
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
     * ================================================================
     * LESSON 469 - RETURNING ERROR RESPONSE INSTEAD OF THROWING
     * ================================================================
     *
     * INSTRUCTOR QUOTE:
     * "So how can we handle validation errors like this in a more elegant
     * way? Well, in Server Actions, as we have it here, you are not limited
     * to redirecting or throwing errors. Instead, you can also return values.
     * You can return response objects to be precise."
     *
     * INSTRUCTOR QUOTE:
     * "So here we could return an object which maybe has a message field
     * which holds a value of invalid input."
     *
     * WHY RETURN INSTEAD OF THROW?
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │  THROWING (Lesson 468):                                            │
     * │  throw new Error('Invalid input');                                 │
     * │  ✗ User loses all form input                                       │
     * │  ✗ Redirects to error.js page                                      │
     * │  ✗ User must start over from scratch                               │
     * │                                                                      │
     * │  RETURNING (Lesson 469):                                           │
     * │  return { message: 'Invalid input.' };                             │
     * │  ✓ User KEEPS all form input                                       │
     * │  ✓ Stays on same page                                              │
     * │  ✓ Error message shown inline                                      │
     * │  ✓ Much better user experience!                                    │
     * └─────────────────────────────────────────────────────────────────────┘
     *
     * RESPONSE OBJECT REQUIREMENTS:
     *
     * INSTRUCTOR QUOTE:
     * "Though the shape of this object is totally up to you, it's just
     * important that it's a serializable object, which means it, for example,
     * shouldn't include any methods because those would get lost whilst being
     * sent to the client. But any simple values like strings, numbers, nested
     * objects or nested arrays, those values all work."
     *
     * SERIALIZABLE (OK):                NON-SERIALIZABLE (NOT OK):
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │  ✓ Strings: "error message"     ✗ Functions: () => {}              │
     * │  ✓ Numbers: 404                 ✗ Methods: { doThing() {} }        │
     * │  ✓ Booleans: true/false         ✗ Classes: new MyClass()           │
     * │  ✓ Arrays: [1, 2, 3]            ✗ Symbols: Symbol('x')             │
     * │  ✓ Objects: { key: 'value' }    ✗ undefined (use null instead)     │
     * │  ✓ null                                                             │
     * └─────────────────────────────────────────────────────────────────────┘
     *
     * This response will be received by useFormState in the component.
     */
    return {
      message: 'Invalid input.',
    };
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
   *
   * ⚠️  LESSON 472 - PRODUCTION IMAGE LIMITATION:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  The image is saved to public/images/, which works in DEVELOPMENT  │
   * │  but NOT in PRODUCTION. In production, the public/ folder is       │
   * │  copied to .next/ at build time, and runtime-added files are       │
   * │  ignored. For production apps, use AWS S3 or similar cloud storage.│
   * │  See lib/meals.js for full details.                                │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  await saveMeal(meal);

  /**
   * ================================================================
   * LESSON 471 - CACHE REVALIDATION
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "So how can we fix this problem of NextJS caching too aggressively?
   * Well, we need to tell NextJS to throw away its cache or parts of its
   * cache whenever we add a new meal."
   *
   * INSTRUCTOR QUOTE:
   * "And of course, this is such a common requirement that there's a
   * built-in method for that, a built-in function provided by NextJS,
   * a function which I wanna execute in my server action right after
   * saving a meal before I redirect."
   *
   * WHY revalidatePath IS NECESSARY:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  WITHOUT revalidatePath:                                           │
   * │  1. User adds new meal → saved to database ✓                       │
   * │  2. User redirected to /meals                                      │
   * │  3. Next.js serves CACHED page from build time                     │
   * │  4. New meal is NOT visible! ✗                                     │
   * │                                                                     │
   * │  WITH revalidatePath:                                              │
   * │  1. User adds new meal → saved to database ✓                       │
   * │  2. revalidatePath('/meals') clears cache for that route           │
   * │  3. User redirected to /meals                                      │
   * │  4. Next.js fetches fresh data and renders                         │
   * │  5. New meal IS visible! ✓                                         │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * revalidatePath SYNTAX:
   *
   * INSTRUCTOR QUOTE:
   * "Now what's important is that, by default, only that path will be
   * revalidated, no nested paths."
   *
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  revalidatePath(path)                                              │
   * │  → Revalidates only that specific page (default mode: 'page')      │
   * │                                                                     │
   * │  revalidatePath(path, 'page')                                      │
   * │  → Same as above - explicit 'page' mode                           │
   * │  → Only that one page is revalidated                               │
   * │                                                                     │
   * │  revalidatePath(path, 'layout')                                    │
   * │  → Revalidates the layout AND all nested pages                    │
   * │  → Use when nested routes depend on same data                     │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * INSTRUCTOR QUOTE:
   * "Alternatively, you can pass a second argument to revalidate path
   * and set this to layout. The default is page, which means that simply
   * this one page for this one path will be revalidated. If you set it
   * to layout, it's the layout that will be revalidated, which as you
   * learned, also wraps nested pages, and therefore, with this, all
   * nested pages would be revalidated as well."
   *
   * INSTRUCTOR QUOTE:
   * "And revalidate simply means that NextJS throws away the cache that
   * is associated with those pages. So, for example, the cached pages
   * themselves."
   *
   * WHY '/meals' IS ENOUGH FOR THIS APP:
   *
   * INSTRUCTOR QUOTE:
   * "Now here, I don't care about any nested pages because the dynamic
   * page here isn't pre-generated anyways in our current setup and the
   * share page doesn't depend on the meals data. So I'm fine with just
   * revalidating /meals."
   *
   * ROUTE ANALYSIS:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  ROUTE              │  NEEDS REVALIDATION?  │  REASON               │
   * │  ──────────────────│───────────────────────│─────────────────────  │
   * │  /meals             │  ✓ YES                │  Shows meal list      │
   * │  /meals/share       │  ✗ NO                 │  Form, no meal data   │
   * │  /meals/[slug]      │  ✗ NO                 │  Not pre-generated    │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * REVALIDATING ENTIRE SITE (if needed):
   *
   * INSTRUCTOR QUOTE:
   * "If you would want to revalidate all the pages of your entire website,
   * you could, by the way, do that by targeting slash and then setting
   * the mode to layout."
   *
   * revalidatePath('/', 'layout');  // Revalidates EVERYTHING
   * → Use sparingly! This clears cache for all pages
   *
   * PROOF THAT IT WORKS:
   *
   * INSTRUCTOR QUOTE:
   * "Well, and with that done, if we now run npm run build again to build
   * all those pages again, they will still be pre-generated and cached,
   * but now that cache should be revalidated and partially cleared once
   * we added a new meal."
   *
   * INSTRUCTOR QUOTE:
   * "In addition, we got these Fetching meals logs back here, which also
   * proves that this is now working as intended."
   */
  revalidatePath('/meals');

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
 * LESSONS 464, 466, 468, 469, 471 & 472 - SERVER ACTIONS SUMMARY
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
 * 9. LESSON 468: THROWING ERRORS (OLD APPROACH)
 *
 *    INSTRUCTOR QUOTE:
 *    "Throwing an error as we do it here works, but it also means that we
 *    destroy the entire input of the user. So, we throw away everything
 *    they entered. And that's not necessarily a great user experience."
 *
 *    → User loses all form data
 *    → Gets redirected to error page
 *    → Must start over
 *
 * LESSON 469 - RETURNING RESPONSES & useFormState:
 *
 * 10. SERVER ACTIONS CAN RETURN VALUES
 *
 *    INSTRUCTOR QUOTE:
 *    "Well, in Server Actions, as we have it here, you are not limited to
 *    redirecting or throwing errors. Instead, you can also return values.
 *    You can return response objects to be precise."
 *
 *    return { message: 'Invalid input.' };
 *    → User KEEPS form input
 *    → Stays on same page
 *    → Error shown inline
 *
 * 11. FUNCTION SIGNATURE CHANGE FOR useFormState
 *
 *    INSTRUCTOR QUOTE:
 *    "The second parameter will still be that submitted data, but the first
 *    parameter will be the previous state."
 *
 *    BEFORE: shareMeal(formData)
 *    AFTER:  shareMeal(prevState, formData)
 *
 * 12. RESPONSE MUST BE SERIALIZABLE
 *
 *    INSTRUCTOR QUOTE:
 *    "It's just important that it's a serializable object, which means it,
 *    for example, shouldn't include any methods because those would get
 *    lost whilst being sent to the client."
 *
 *    ✓ Strings, numbers, booleans, arrays, objects, null
 *    ✗ Functions, methods, classes, symbols
 *
 * LESSON 471 - CACHE REVALIDATION:
 *
 * 13. THE CACHING PROBLEM
 *
 *    INSTRUCTOR QUOTE:
 *    "So how can we fix this problem of NextJS caching too aggressively?
 *    Well, we need to tell NextJS to throw away its cache or parts of its
 *    cache whenever we add a new meal."
 *
 *    → In production, pages are pre-rendered and cached
 *    → New data saved to DB doesn't appear (cache is stale)
 *
 * 14. revalidatePath FUNCTION
 *
 *    INSTRUCTOR QUOTE:
 *    "And that function is called revalidatePath. This function tells NextJS
 *    to revalidate the cache that belongs to a certain route path."
 *
 *    import { revalidatePath } from 'next/cache';
 *    revalidatePath('/meals');  // Clears cache for /meals page
 *
 * 15. REVALIDATION MODES
 *
 *    INSTRUCTOR QUOTE:
 *    "By default, only that path will be revalidated, no nested paths."
 *
 *    ┌─────────────────────────────────────────────────────────────────────┐
 *    │  revalidatePath('/meals')           │  Only /meals page            │
 *    │  revalidatePath('/meals', 'page')   │  Same (explicit)             │
 *    │  revalidatePath('/meals', 'layout') │  /meals + all nested pages   │
 *    │  revalidatePath('/', 'layout')      │  ENTIRE site (use sparingly) │
 *    └─────────────────────────────────────────────────────────────────────┘
 *
 * 16. WHERE TO CALL revalidatePath
 *
 *    INSTRUCTOR QUOTE:
 *    "A function which I wanna execute in my server action right after
 *    saving a meal before I redirect."
 *
 *    await saveMeal(meal);       // 1. Save the data
 *    revalidatePath('/meals');   // 2. Clear the cache
 *    redirect('/meals');         // 3. Redirect user
 *
 * LESSON 472 - PRODUCTION IMAGE STORAGE LIMITATION:
 *
 * 17. IMAGES WORK IN DEVELOPMENT BUT NOT PRODUCTION
 *
 *    INSTRUCTOR QUOTE:
 *    "The problem with this approach just is that this folder is available
 *    during development, but for production, it's actually copied into this
 *    .next folder."
 *
 *    ┌─────────────────────────────────────────────────────────────────────┐
 *    │  DEVELOPMENT: Image saved to public/images/ → Works! ✓             │
 *    │  PRODUCTION:  public/ copied to .next/ at build time               │
 *    │               Runtime files added to public/ are IGNORED ✗         │
 *    └─────────────────────────────────────────────────────────────────────┘
 *
 * 18. OFFICIAL SOLUTION: EXTERNAL FILE STORAGE
 *
 *    INSTRUCTOR QUOTE:
 *    "The official recommendation here is to use a different file storage,
 *    for example, some cloud file storage like Amazon S3 or Cloudflare R2."
 *
 *    For production applications, use AWS S3 or similar cloud storage
 *    instead of the local public/ folder. See lib/meals.js for details.
 *
 * COMPLETE FLOW AFTER LESSON 471:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  USER ACTION:                                                           │
 * │  1. Fills out form on /meals/share                                     │
 * │  2. Clicks "Share Meal" button                                          │
 * │                                                                          │
 * │  SERVER ACTION (shareMeal):                                             │
 * │  3. Receives (prevState, formData) - note new signature!               │
 * │  4. Extracts form data into meal object                                 │
 * │  5. VALIDATES all fields:                                               │
 * │     - Text fields: not empty after trim                                 │
 * │     - Email: must include @                                             │
 * │     - Image: must exist with size > 0                                   │
 * │  6. If invalid → returns { message: '...' } (Lesson 469)               │
 * │     → useFormState receives this response                              │
 * │     → Error message shown inline on page                                │
 * │     → User KEEPS their form input!                                      │
 * │  7. If valid:                                                           │
 * │     → saveMeal(meal)                                                    │
 * │     → revalidatePath('/meals')  ← NEW in Lesson 471!                   │
 * │     → redirect('/meals')                                                │
 * │                                                                          │
 * │  RESULT:                                                                │
 * │  • SUCCESS: User sees /meals page with their new meal (even in prod!)  │
 * │  • ERROR: User stays on form with error message (input preserved)      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ARCHITECTURE OVERVIEW (After Lesson 471):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  app/meals/share/page.js ('use client')                                │
 * │  └── useFormState(shareMeal, initialState)                             │
 * │       │                                                                  │
 * │       ├── Returns [state, formAction]                                   │
 * │       │                                                                  │
 * │       └── <form action={formAction}>  ← Note: formAction, not shareMeal │
 * │                │                                                        │
 * │                ▼                                                        │
 * │  lib/actions.js                                                         │
 * │  └── shareMeal(prevState, formData)                                    │
 * │           │                                                              │
 * │      ┌────┴────┐                                                        │
 * │      │ VALIDATE │                                                       │
 * │      └────┬────┘                                                        │
 * │           │                                                              │
 * │    ┌──────┴──────┐                                                      │
 * │    │             │                                                       │
 * │  INVALID       VALID                                                    │
 * │    │             │                                                       │
 * │    ▼             ▼                                                       │
 * │  return        saveMeal()                                               │
 * │  {message}       │                                                      │
 * │    │             ▼                                                       │
 * │    │        revalidatePath('/meals')  ← NEW! Clears cache              │
 * │    │             │                                                       │
 * │    │             ▼                                                       │
 * │    │        redirect('/meals')                                          │
 * │    │             │                                                       │
 * │    │             ▼                                                       │
 * │    │        Fresh data fetched! (cache was cleared)                     │
 * │    │             │                                                       │
 * │    │             ▼                                                       │
 * │    │        User sees new meal! ✓                                       │
 * │    │                                                                     │
 * │    ▼                                                                     │
 * │  useFormState receives response                                         │
 * │  → state.message is now the error                                       │
 * │  → Component re-renders with error displayed                            │
 * │  → Form input is PRESERVED!                                             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * COMING NEXT:
 * ✓ Production image storage limitation (Lesson 472) - Images work in dev but
 *   not production; need AWS S3 or similar for real apps
 * • Image optimization with Next.js Image component
 * • Static & Dynamic metadata
 *
 * ============================================================================
 */
