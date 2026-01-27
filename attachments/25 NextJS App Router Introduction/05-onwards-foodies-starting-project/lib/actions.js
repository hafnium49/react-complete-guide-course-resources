/**
 * ============================================================================
 * SERVER ACTIONS FILE - LESSON 464: Storing Server Actions Separately
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
   * TEMPORARY: LOG TO CONSOLE
   *
   * This log appears in the TERMINAL (server-side), not in the browser.
   * This proves the code is running on the server.
   *
   * TODO (NEXT LESSON): Replace with actual database storage
   *
   * INSTRUCTOR QUOTE:
   * "But with that, it's now finally time to make sure that we're not just
   * logging the meal, but that we're actually storing it in a database,
   * and that we store the image on the file system."
   */
  console.log(meal);
}

/**
 * ============================================================================
 * LESSON 464 - SERVER ACTIONS SEPARATION SUMMARY
 * ============================================================================
 *
 * WHAT WE LEARNED:
 *
 * 1. WHY SEPARATE SERVER ACTIONS?
 *
 *    INSTRUCTOR QUOTE:
 *    "You can add it in a component like this, but this will only work if
 *    the component in which you are adding it is not a client component."
 *
 *    TWO MAIN REASONS:
 *    • Can't have 'use server' in files with 'use client'
 *    • Better code organization (separation of concerns)
 *
 * 2. FILE-LEVEL 'use server' DIRECTIVE
 *
 *    INSTRUCTOR QUOTE:
 *    "When adding it at the top of a file like this, all the functions you
 *    might define in that file will be treated as Server Actions."
 *
 *    • Put 'use server' at TOP of file (not inside functions)
 *    • ALL exported functions become Server Actions
 *    • No need for 'use server' inside individual functions
 *
 * 3. EXPORTING AND IMPORTING
 *
 *    INSTRUCTOR QUOTE:
 *    "There it now must be exported so that it can be used in other files."
 *
 *    // In actions.js:
 *    export async function shareMeal(formData) { ... }
 *
 *    // In page.js:
 *    import { shareMeal } from '@/lib/actions';
 *
 * 4. WORKS WITH CLIENT COMPONENTS
 *
 *    INSTRUCTOR QUOTE:
 *    "You can absolutely import a server action from another file and then
 *    use it in such a client component."
 *
 *    The key insight: importing is fine, defining in same file is not.
 *
 * ARCHITECTURE OVERVIEW:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  lib/actions.js ('use server' at top)                                  │
 * │  └── export async function shareMeal() { ... }                         │
 * │                                                                          │
 * │  app/meals/share/page.js (Server Component OR Client Component)        │
 * │  └── import { shareMeal } from '@/lib/actions';                        │
 * │  └── <form action={shareMeal}>                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * COMING NEXT:
 * • Store meal data in the database
 * • Save uploaded image to file system
 *
 * ============================================================================
 */
