/**
 * ============================================================================
 * SERVER ACTIONS - LESSON 476 Section Summary Reference
 * ============================================================================
 *
 * This file demonstrates SERVER ACTIONS, one of the key Next.js concepts
 * covered in this section.
 *
 * ============================================================================
 * WHAT ARE SERVER ACTIONS?
 * ============================================================================
 *
 * From the instructor (Lesson 476):
 * "You also learned about Server Actions, async functions that either have
 * to use 'use server' directive inside of them or that are stored in a file
 * with 'use server' at the top."
 *
 * Server Actions are async functions that run on the SERVER, even when
 * triggered from client-side form submissions.
 *
 * ============================================================================
 * 'use server' DIRECTIVE
 * ============================================================================
 *
 * The 'use server' directive at the top of this file tells Next.js:
 * "All exported functions in this file are Server Actions"
 *
 * TWO WAYS TO DEFINE SERVER ACTIONS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  METHOD 1: File-level directive (THIS FILE)                             │
 * │  ──────────────────────────────────────────                             │
 * │  'use server';  // At the top of the file                               │
 * │  export async function myAction() { ... }                               │
 * │                                                                          │
 * │  METHOD 2: Function-level directive                                     │
 * │  ────────────────────────────────────                                   │
 * │  export async function myAction() {                                     │
 * │    'use server';  // Inside the function                                │
 * │    ...                                                                  │
 * │  }                                                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * USING SERVER ACTIONS WITH FORMS
 * ============================================================================
 *
 * From the instructor:
 * "The special thing about those Server Actions is that you can assign them
 * as values to the action prop on form elements, either directly or as we're
 * doing it here with help of useFormState."
 *
 * DIRECT USAGE:
 *   <form action={shareMeal}>...</form>
 *
 * WITH useFormState (for handling responses):
 *   const [state, formAction] = useFormState(shareMeal, { message: null });
 *   <form action={formAction}>...</form>
 *   {state.message && <p>{state.message}</p>}
 *
 * ============================================================================
 * revalidatePath - CRITICAL FOR CACHING
 * ============================================================================
 *
 * From the instructor:
 * "NextJS does some pretty aggressive caching and that therefore you should
 * call revalidatePath whenever you change some data to make sure that the
 * latest data is fetched and represented on your pages."
 *
 * ⚠️  IMPORTANT WARNING from the instructor:
 * "You also saw that it can be dangerous if you never test your app in
 * production mode because everything worked in development mode in our app
 * here, but then suddenly the data was missing in production mode."
 *
 * Without revalidatePath:
 *   → New meal saved to database
 *   → User redirected to /meals
 *   → OLD cached data displayed (new meal missing!)
 *
 * With revalidatePath:
 *   → New meal saved to database
 *   → revalidatePath('/meals') clears the cache
 *   → User redirected to /meals
 *   → FRESH data fetched and displayed!
 *
 * ============================================================================
 * RELATED CONCEPTS IN THIS PROJECT
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  useFormState     │  app/meals/share/page.js                           │
 * │  useFormStatus    │  components/meals/meals-form-submit.js             │
 * │  Form Component   │  app/meals/share/page.js                           │
 * │  Data Saving      │  lib/meals.js (saveMeal function)                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

'use server';

import { redirect } from 'next/navigation';

import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';

/**
 * Helper function to validate text inputs.
 * Returns true if the text is empty or only whitespace.
 */
function isInvalidText(text) {
  return !text || text.trim() === '';
}

/**
 * SERVER ACTION: Share a new meal
 *
 * This function is called when the form in app/meals/share/page.js is submitted.
 * Even though it's triggered from a client component, this code runs on the SERVER.
 *
 * @param {Object} prevState - Previous state from useFormState (for error handling)
 * @param {FormData} formData - Form data from the submitted form
 * @returns {Object|void} - Returns error object if validation fails, or redirects on success
 *
 * From the instructor (Lesson 476):
 * "useFormState is a hook provided by react-dom to handle responses returned
 * by the Server action function and then potentially update the UI based on
 * those responses. Like here where we are conditionally showing an error message."
 */
export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  /**
   * Server-side validation
   *
   * Unlike client-side validation, this cannot be bypassed by users
   * since it runs on the server. Always validate on the server!
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
     * Return an error object that will be available in the component
     * via useFormState: const [state, formAction] = useFormState(...)
     * Then: {state.message && <p>{state.message}</p>}
     */
    return {
      message: 'Invalid input.',
    };
  }

  // Save the meal to the database (includes S3 upload for images)
  await saveMeal(meal);

  /**
   * CRITICAL: Revalidate the cached /meals page!
   *
   * From the instructor:
   * "You should call revalidatePath whenever you change some data to make
   * sure that the latest data is fetched and represented on your pages."
   *
   * This tells Next.js: "The data for /meals has changed. Clear the cache
   * so the next request fetches fresh data from the database."
   */
  revalidatePath('/meals');

  // Redirect to the meals page to show the newly added meal
  redirect('/meals');
}
