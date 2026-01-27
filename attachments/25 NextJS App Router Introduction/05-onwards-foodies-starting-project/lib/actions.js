/**
 * ============================================================================
 * SERVER ACTIONS FILE - LESSONS 464 & 466: Server Actions & Data Storage
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
 * LESSONS 464 & 466 - SERVER ACTIONS SUMMARY
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
 * COMPLETE FLOW AFTER LESSON 466:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  USER ACTION:                                                           │
 * │  1. Fills out form on /meals/share                                     │
 * │  2. Clicks "Share Meal" button                                          │
 * │                                                                          │
 * │  SERVER ACTION (shareMeal):                                             │
 * │  3. Extracts form data into meal object                                 │
 * │  4. Calls saveMeal(meal):                                               │
 * │     a. Generates slug from title                                        │
 * │     b. Sanitizes instructions (XSS)                                     │
 * │     c. Saves image to public/images/                                    │
 * │     d. Inserts record into SQLite                                       │
 * │  5. Calls redirect('/meals')                                            │
 * │                                                                          │
 * │  RESULT:                                                                │
 * │  6. User sees /meals page with their new meal in the list!             │
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
 * │           ▼                                                              │
 * │  lib/meals.js                                                           │
 * │  └── saveMeal(meal) → writes image + inserts DB record                 │
 * │           │                                                              │
 * │           ▼                                                              │
 * │  redirect('/meals') → user sees their new meal!                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * COMING NEXT:
 * • Add loading state during form submission
 * • Add form validation and error handling
 *
 * ============================================================================
 */
