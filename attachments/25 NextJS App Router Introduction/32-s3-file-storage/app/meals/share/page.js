/**
 * ============================================================================
 * SHARE MEAL PAGE - LESSON 474: Metadata Limitation for Client Components
 * ============================================================================
 *
 * This page uses 'use client' because it needs React hooks (useFormState)
 * for form handling and state management.
 *
 * ============================================================================
 * IMPORTANT: CLIENT COMPONENTS CANNOT EXPORT METADATA!
 * ============================================================================
 *
 * In Next.js App Router, the metadata export pattern:
 *
 *   export const metadata = { title: '...', description: '...' };
 *
 * ONLY works in SERVER COMPONENTS (the default).
 *
 * Since this file has 'use client' at the top, it's a CLIENT COMPONENT,
 * and cannot export metadata directly.
 *
 * ============================================================================
 * WORKAROUND: Create a Separate Layout File
 * ============================================================================
 *
 * To add metadata for this page, create a layout file in the same directory:
 *
 *   app/meals/share/layout.js
 *   ─────────────────────────
 *   export const metadata = {
 *     title: 'Share a Meal',
 *     description: 'Share your favorite recipes with the community.',
 *   };
 *
 *   export default function ShareMealLayout({ children }) {
 *     return children;  // No additional wrapping needed
 *   }
 *
 * The layout is a SERVER component by default, so it CAN export metadata.
 * This metadata will apply to all pages under /meals/share/.
 *
 * ============================================================================
 * CURRENT BEHAVIOR
 * ============================================================================
 *
 * Without metadata defined here or in a layout, this page INHERITS metadata
 * from the closest parent that has metadata:
 *
 *   /meals/share → Falls back to root layout metadata
 *   Browser tab shows: "NextLevel Food"
 *
 * If you want "Share a Meal" as the title, create the layout file above.
 *
 * ============================================================================
 * WHY 'use client' IS NEEDED HERE
 * ============================================================================
 *
 * This page needs client-side interactivity for:
 * - useFormState hook for form submission state
 * - Real-time form validation feedback
 * - Image picker preview functionality
 *
 * These features require JavaScript to run in the browser, hence 'use client'.
 *
 * ============================================================================
 * DOCS REFERENCE:
 * https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 * ============================================================================
 */

'use client';

import { useFormState } from 'react-dom';

import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { shareMeal } from '@/lib/actions';
import MealsFormSubmit from '@/components/meals/meals-form-submit';

export default function ShareMealPage() {
  const [state, formAction] = useFormState(shareMeal, { message: null });

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
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
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Your image" name="image" />
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
