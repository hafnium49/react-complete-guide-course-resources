/**
 * ============================================================================
 * NEWSLETTER SIGNUP COMPONENT (Lesson 380 - useFetcher Hook)
 * ============================================================================
 *
 * LESSON 380: INTRODUCING useFetcher FOR BACKGROUND ACTIONS
 * =========================================================
 *
 * INSTRUCTOR QUOTE:
 * "There still are a couple of important features offered by React Router you
 * should know. And to introduce the first feature, you'll find a couple of
 * updated code files attached to this lecture."
 *
 * INSTRUCTOR QUOTE:
 * "You'll find an updated main navigation js file where I added a new link
 * and this new newsletter signup component, which is another component you'll
 * find attached newsletters sign up which renders a simple form with a input
 * which could be used by users to sign up for an imaginary newsletter."
 *
 * ============================================================================
 * THE PROBLEM: SHARED COMPONENTS ACROSS MULTIPLE ROUTES
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "It's important to understand that we have this newsletter signup form,
 * both on the newsletter page as well as on every other page because it is
 * included here in the main navigation."
 *
 * INSTRUCTOR QUOTE:
 * "So it's not just on one single page, but on all pages."
 *
 * THE CHALLENGE:
 * ==============
 * INSTRUCTOR QUOTE:
 * "The problem with that is that of course we wanna trigger this action, this
 * newsletterAction, whenever this newsletter form is submitted."
 *
 * INSTRUCTOR QUOTE:
 * "If we are on the newsletter page, that would be quite straightforward to do.
 * All we had to do is go to the newsletter signup component and use React
 * Router's form component here which starts with a capital F. And as you
 * learned that would automatically trigger the action that belongs to the
 * currently active route."
 *
 * WHY REGULAR <Form> DOESN'T WORK (Lesson 380):
 * =============================================
 * INSTRUCTOR QUOTE:
 * "The problem is however, that this form is included on all routes because
 * it's part of the main navigation."
 *
 * INSTRUCTOR QUOTE:
 * "Therefore, we would have to add the action to all routes and that would
 * of course be a lot of code duplication and also clash with other actions
 * that we might need for our routes."
 *
 * | Approach              | Problem                                      |
 * |-----------------------|----------------------------------------------|
 * | Add action to all     | Code duplication, conflicts with other       |
 * | routes                | actions on those routes                      |
 * | Use regular <Form>    | Would transition/navigate to /newsletter     |
 * | Use useFetcher        | Triggers action WITHOUT navigating (SOLUTION)|
 *
 * ============================================================================
 * THE SOLUTION: useFetcher HOOK
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now this is such a common use case that React Router has a solution for it.
 * There is a special hook which you can import from react-router-dom, and that
 * is the useFetcher hook."
 *
 * INSTRUCTOR QUOTE:
 * "The name might be a bit strange but this hook when executed gives you an
 * object. And this object includes a bunch of useful properties and methods."
 *
 * WHAT useFetcher PROVIDES (Lesson 380):
 * ======================================
 * INSTRUCTOR QUOTE:
 * "For example, it gives you another form component which is different from
 * that other form component we used before. It also gives you a submit function
 * which is different from the submit function we got from useSubmit."
 *
 * | Property/Method   | Description                                       |
 * |-------------------|---------------------------------------------------|
 * | fetcher.Form      | Form component that doesn't navigate              |
 * | fetcher.submit    | Submit function that doesn't navigate             |
 * | fetcher.data      | Data returned by the loader/action                |
 * | fetcher.state     | 'idle', 'loading', or 'submitting'                |
 * | fetcher.load      | Function to trigger a loader                      |
 *
 * ============================================================================
 * KEY DIFFERENCE: FETCHER VS REGULAR FORM
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Well, if we use this Fetcher Form component like this, which we can, then
 * this will actually still trigger an action but it will not initialize a
 * route transition."
 *
 * INSTRUCTOR QUOTE:
 * "So Fetcher should basically be used whenever you wanna trigger an action,
 * or also a loader with help of the load function, without actually navigating
 * to the page to which the loader belongs or the page to which the action
 * belongs."
 *
 * COMPARISON:
 * ===========
 * | Feature            | Regular <Form>            | fetcher.Form             |
 * |--------------------|---------------------------|--------------------------|
 * | Triggers action    | Yes                       | Yes                      |
 * | Navigates to route | YES (changes URL)         | NO (stays on same page)  |
 * | Route transition   | YES                       | NO                       |
 * | Use case           | Form submissions that     | Background actions,      |
 * |                    | should redirect           | shared components        |
 *
 * DEMONSTRATION OF THE DIFFERENCE (Lesson 380):
 * =============================================
 * INSTRUCTOR QUOTE:
 * "If I add form here without Fetcher, just to show you what the difference is,
 * you will notice that if I set up this form like this with the default form
 * provided by React Router, if I go to Events and I then enter some email
 * address here, I'm forwarded to the Events page after submitting this.
 * And that's not the behavior I want."
 *
 * INSTRUCTOR QUOTE:
 * "Now, it changes if I use fetcher.Form because as I mentioned with Fetcher,
 * we don't transition, we don't move to a different route."
 *
 * ============================================================================
 * GETTING FEEDBACK FROM FETCHER
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And we can get a feedback by using other properties provided by Fetcher
 * because useFetcher, this useFetcher hook, is basically the tool you should
 * use if you wanna interact with some action or a loader without transitioning."
 *
 * INSTRUCTOR QUOTE:
 * "So if you wanna send your requests behind the scenes, so to say, without
 * triggering any route changes."
 *
 * ACCESSING RETURNED DATA (Lesson 380):
 * =====================================
 * INSTRUCTOR QUOTE:
 * "Because that's the goal or that's where Fetcher wants to help you, this
 * Fetcher object also includes a bunch of properties that help you understand
 * whether your action or loader that you triggered succeeded."
 *
 * INSTRUCTOR QUOTE:
 * "You also get access to any data returned by that loader or action. You get
 * access to that data through that data property here to be precise."
 *
 * STATE VALUES (Lesson 380):
 * ==========================
 * INSTRUCTOR QUOTE:
 * "And you can also get hold of a state object or a state value to be precise
 * which is equal to idle, loading, or submitting which you might know from
 * the useNavigation hook."
 *
 * INSTRUCTOR QUOTE:
 * "But useNavigation was meant to be used with actual route transitions. The
 * state you get from Fetcher instead tells you whether the Fetcher behind the
 * scenes completed its loader or action that was triggered."
 *
 * | State        | Meaning                                               |
 * |--------------|-------------------------------------------------------|
 * | 'idle'       | No action/loader in progress                          |
 * | 'loading'    | A loader is being executed                            |
 * | 'submitting' | An action is being executed                           |
 *
 * ============================================================================
 * USING useEffect FOR FEEDBACK
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "For example, we could bring back useEffect, the regular good old useEffect
 * from React, and trigger a function whenever data and state changed."
 *
 * INSTRUCTOR QUOTE:
 * "So whenever one of these two values changed, and we can check if state is
 * equal to idle, which means we're not executing an action or a loader anymore,
 * and we can check if we got data and if that data got a message property."
 *
 * INSTRUCTOR QUOTE:
 * "Because actually my newsletter action does return an object with a message
 * property. So that's what I'm checking for here."
 *
 * ============================================================================
 * WHEN TO USE useFetcher
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So useFetcher is the tool you should use if you wanna trigger a loader or
 * an action without actually loading the page, the route to which this action
 * or loader belongs."
 *
 * INSTRUCTOR QUOTE:
 * "And it's perfect for scenarios like we have it here where you might have
 * some shared component or a component that's used multiple times on the same
 * page and where you just wanna update or get some data behind the scenes."
 *
 * PERFECT USE CASES FOR useFetcher:
 * =================================
 * 1. Newsletter signup forms in navigation (shown on all pages)
 * 2. Like/favorite buttons that don't need page reload
 * 3. Auto-save functionality
 * 4. Polling for updates without navigation
 * 5. Any form that should stay on the current page
 *
 * ============================================================================
 */
import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';

import classes from './NewsletterSignup.module.css';

/**
 * NEWSLETTER SIGNUP COMPONENT:
 * ============================
 * A form component that appears in the navigation on ALL pages.
 *
 * Uses useFetcher to:
 * - Submit to /newsletter action WITHOUT navigating
 * - Get feedback on submission status
 * - Display success message via alert
 *
 * This demonstrates the key difference between:
 * - Regular <Form>: Navigates to the action's route
 * - fetcher.Form: Stays on current page
 */
function NewsletterSignup() {
  /**
   * ============================================================================
   * LESSON 380: useFetcher HOOK
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "There is a special hook which you can import from react-router-dom, and
   * that is the useFetcher hook."
   *
   * INSTRUCTOR QUOTE:
   * "The name might be a bit strange but this hook when executed gives you an
   * object. And this object includes a bunch of useful properties and methods."
   *
   * DESTRUCTURING THE FETCHER OBJECT:
   * =================================
   * INSTRUCTOR QUOTE:
   * "So we can actually use object Destructuring to pull out that data property,
   * that data object, which is returned by the action or loader that's being
   * triggered."
   *
   * What we get from useFetcher:
   * - Form: A special form component that doesn't navigate
   * - data: Data returned by the action/loader
   * - state: 'idle', 'loading', or 'submitting'
   */
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  /**
   * ============================================================================
   * LESSON 380: useEffect FOR HANDLING FETCHER COMPLETION
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "For example, we could bring back useEffect, the regular good old useEffect
   * from React, and trigger a function whenever data and state changed."
   *
   * INSTRUCTOR QUOTE:
   * "So whenever one of these two values changed, and we can check if state is
   * equal to idle, which means we're not executing an action or a loader anymore,
   * and we can check if we got data and if that data got a message property."
   *
   * WHY CHECK FOR 'idle' STATE:
   * ===========================
   * - 'idle' means the fetcher is not currently running
   * - Combined with having data, it means the action completed successfully
   * - This is the moment to show feedback to the user
   *
   * WHY CHECK FOR data?.message:
   * ============================
   * INSTRUCTOR QUOTE:
   * "Because actually my newsletter action does return an object with a message
   * property. So that's what I'm checking for here."
   *
   * The Newsletter.jsx action returns: { message: 'Signup successful!' }
   */
  useEffect(() => {
    /**
     * CHECK FOR SUCCESSFUL COMPLETION (Lesson 380):
     * =============================================
     * INSTRUCTOR QUOTE:
     * "And we can check if state is equal to idle, which means we're not
     * executing an action or a loader anymore, and we can check if we got
     * data and if that data got a message property."
     *
     * Both conditions must be true:
     * 1. state === 'idle' - Action has finished
     * 2. data && data.message - Action returned success data
     */
    if (state === 'idle' && data && data.message) {
      /**
       * SHOWING FEEDBACK (Lesson 380):
       * ==============================
       * INSTRUCTOR QUOTE:
       * "And if that's all the case, we could use the built in alert function
       * to say 'Signup successful' or anything like that."
       *
       * INSTRUCTOR QUOTE:
       * "We can actually also just output data.message. That might be even easier."
       *
       * INSTRUCTOR QUOTE:
       * "We could of course also do other things and for example clear the input
       * or do whatever we wanna do."
       *
       * ALTERNATIVE FEEDBACK OPTIONS:
       * =============================
       * - Show a toast notification
       * - Update UI state to show success
       * - Clear the input field
       * - Disable the form temporarily
       */
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    /**
     * ============================================================================
     * LESSON 380: fetcher.Form COMPONENT
     * ============================================================================
     *
     * INSTRUCTOR QUOTE:
     * "Well, if we use this Fetcher Form component like this, which we can, then
     * this will actually still trigger an action but it will not initialize a
     * route transition."
     *
     * WHY fetcher.Form INSTEAD OF <Form> (Lesson 380):
     * ================================================
     * INSTRUCTOR QUOTE:
     * "If I add form here without Fetcher, just to show you what the difference
     * is, you will notice that if I set up this form like this with the default
     * form provided by React Router, if I go to Events and I then enter some
     * email address here, I'm forwarded to the Events page after submitting this.
     * And that's not the behavior I want."
     *
     * INSTRUCTOR QUOTE:
     * "Now, it changes if I use fetcher.Form because as I mentioned with Fetcher,
     * we don't transition, we don't move to a different route."
     *
     * THE action ATTRIBUTE (Lesson 380):
     * ==================================
     * INSTRUCTOR QUOTE:
     * "On this form here we can add the action attribute and for example, point
     * at /newsletter because I know that I wanna trigger the action of that
     * newsletter route but I wanna make sure that I don't load that route's
     * component."
     *
     * INSTRUCTOR QUOTE:
     * "I don't wanna load the element that belongs to this route."
     *
     * HOW action="/newsletter" WORKS:
     * ===============================
     * - Tells fetcher.Form which route's action to trigger
     * - Does NOT navigate to /newsletter
     * - Does NOT load the NewsletterPage component
     * - Only executes the action function and returns data
     */
    <fetcher.Form method="post" action="/newsletter" className={classes.newsletter}>
      {/**
       * the sumbmit is without transitioning to /newsletter page
       */}
      {/**
       * EMAIL INPUT:
       * ============
       * The name="email" attribute is important because the action
       * extracts it using: data.get('email')
       */}
      <input
        type="email"
        name="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;

/**
 * ============================================================================
 * LESSON 380: COMPLETE FLOW WITH useFetcher
 * ============================================================================
 *
 * SCENARIO: User is on /events page and submits newsletter form
 *
 * WITH REGULAR <Form action="/newsletter">:
 * =========================================
 * 1. User fills email on /events page
 * 2. User clicks "Sign up"
 * 3. <Form> triggers POST to /newsletter action
 * 4. NAVIGATES to /newsletter page (UNWANTED!)
 * 5. User is taken away from /events
 *
 * WITH fetcher.Form action="/newsletter">:
 * ========================================
 * 1. User fills email on /events page
 * 2. User clicks "Sign up"
 * 3. fetcher.Form triggers POST to /newsletter action
 * 4. fetcher.state changes to 'submitting'
 * 5. Action executes in background
 * 6. Action returns { message: 'Signup successful!' }
 * 7. fetcher.state changes to 'idle'
 * 8. fetcher.data contains { message: 'Signup successful!' }
 * 9. useEffect detects idle + data.message
 * 10. Alert shows "Signup successful!"
 * 11. User STAYS on /events page (DESIRED!)
 *
 * INSTRUCTOR QUOTE:
 * "So useFetcher is the tool you should use if you wanna trigger a loader or
 * an action without actually loading the page, the route to which this action
 * or loader belongs."
 *
 * ============================================================================
 * COMPARISON: useNavigation vs useFetcher
 * ============================================================================
 *
 * | Aspect           | useNavigation              | useFetcher               |
 * |------------------|----------------------------|--------------------------|
 * | Purpose          | Route transitions          | Background fetches       |
 * | Navigates        | Yes                        | No                       |
 * | state values     | 'idle', 'loading',         | 'idle', 'loading',       |
 * |                  | 'submitting'               | 'submitting'             |
 * | Use case         | Loading indicators for     | Forms that shouldn't     |
 * |                  | page navigation            | navigate, shared         |
 * |                  |                            | components               |
 *
 * INSTRUCTOR QUOTE:
 * "And you can also get hold of a state object or a state value to be precise
 * which you might know from the useNavigation hook. But useNavigation was
 * meant to be used with actual route transitions."
 *
 * ============================================================================
 */
