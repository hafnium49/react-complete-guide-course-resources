/**
 * ============================================================================
 * MEALS FORM SUBMIT BUTTON - LESSON 476 Section Summary Reference
 * ============================================================================
 *
 * This component demonstrates the useFormStatus hook, one of the key concepts
 * covered in the Next.js App Router section.
 *
 * ============================================================================
 * useFormStatus HOOK
 * ============================================================================
 *
 * From the instructor (Lesson 476):
 * "You also learned about the useFormStatus hook, which can be used to find
 * out whether a form is currently being submitted or not, which can then be
 * used to update the UI accordingly."
 *
 * The useFormStatus hook provides:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  { pending }  - Boolean: true while form is submitting                  │
 * │  { data }     - FormData being submitted (if any)                       │
 * │  { method }   - HTTP method (GET/POST)                                  │
 * │  { action }   - The action function being called                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * WHY A SEPARATE COMPONENT?
 * ============================================================================
 *
 * useFormStatus MUST be used in a component that is a CHILD of the <form>.
 * It cannot be used in the same component that renders the form.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ❌ WRONG - Won't work:                                                 │
 * │                                                                          │
 * │  function ShareMealPage() {                                             │
 * │    const { pending } = useFormStatus();  // ← Doesn't work here!       │
 * │    return <form>...</form>;                                             │
 * │  }                                                                      │
 * │                                                                          │
 * │  ✅ CORRECT - Works:                                                    │
 * │                                                                          │
 * │  function ShareMealPage() {                                             │
 * │    return (                                                             │
 * │      <form>                                                             │
 * │        <MealsFormSubmit />  ← Status hook used INSIDE child component  │
 * │      </form>                                                            │
 * │    );                                                                   │
 * │  }                                                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 'use client' REQUIREMENT
 * ============================================================================
 *
 * This component must be a CLIENT COMPONENT because:
 * 1. useFormStatus is a React hook (hooks require client-side React)
 * 2. We need to reactively update the UI when pending state changes
 *
 * ============================================================================
 * UX IMPROVEMENT
 * ============================================================================
 *
 * This pattern provides important user feedback:
 *
 * BEFORE SUBMIT:     [ Share Meal ]     ← Button enabled
 *                          ↓
 * USER CLICKS:       [ Submitting... ]  ← Button disabled, text changes
 *                          ↓
 * AFTER COMPLETE:    (Redirected to /meals page)
 *
 * This prevents:
 * - Double submissions (button disabled during submit)
 * - User confusion (clear visual feedback that something is happening)
 *
 * ============================================================================
 * RELATED FILES
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Parent Form      │  app/meals/share/page.js                           │
 * │  Server Action    │  lib/actions.js (shareMeal function)               │
 * │  useFormState     │  app/meals/share/page.js                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

'use client';

import { useFormStatus } from 'react-dom';

/**
 * Submit button that shows loading state during form submission.
 *
 * Must be rendered as a CHILD of a <form> element for useFormStatus to work.
 */
export default function MealsFormSubmit() {
  /**
   * useFormStatus tells us if the parent form is currently submitting.
   *
   * From the instructor:
   * "useFormStatus can be used to find out whether a form is currently
   * being submitted or not, which can then be used to update the UI."
   */
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? 'Submitting...' : 'Share Meal'}
    </button>
  );
}
