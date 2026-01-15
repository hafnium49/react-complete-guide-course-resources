/**
 * ============================================================================
 * NEWSLETTER PAGE COMPONENT (Lesson 380 - useFetcher Demo)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Then I added the newsletter.js file which should go into the pages folder
 * which also renders this newsletter signup component wrapped into this page
 * content component."
 *
 * INSTRUCTOR QUOTE:
 * "And where I defined dummy action. That doesn't really do anything but that
 * does extract the provided email and we could then send it to some backend
 * server."
 *
 * INSTRUCTOR QUOTE:
 * "But here we're not doing anything with it because we don't need to do
 * anything with it for this demo."
 *
 * ============================================================================
 * THE NEWSLETTER ROUTE AND ITS ACTION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "In app js, I also added a new route and therefore you'll find the updated
 * app js file attached. I added this newsletter route on the same level as my
 * homepage route essentially."
 *
 * INSTRUCTOR QUOTE:
 * "And this route renders the newsletter page component which I just showed
 * you and has the newsletter action attached to it."
 *
 * ROUTE STRUCTURE:
 * ================
 * {
 *   path: 'newsletter',
 *   element: <NewsletterPage />,
 *   action: newsletterAction,
 * }
 *
 * ============================================================================
 * WHY THIS PAGE EXISTS FOR THE useFetcher DEMO
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, I did add these components and this route because there is a new feature
 * I wanna show you, as mentioned."
 *
 * INSTRUCTOR QUOTE:
 * "And for that, it's important to understand that we have this newsletter
 * signup form, both on the newsletter page as well as on every other page
 * because it is included here in the main navigation."
 *
 * The NewsletterSignup component appears in TWO places:
 * 1. Here on this page (directly)
 * 2. In MainNavigation (shown on ALL pages)
 *
 * This creates the challenge that useFetcher solves:
 * - The form in MainNavigation needs to trigger THIS action
 * - But it shouldn't navigate to this page
 * - useFetcher allows triggering the action without navigation
 *
 * ============================================================================
 * THE ACTION FUNCTION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And where I defined dummy action. That doesn't really do anything but that
 * does extract the provided email."
 *
 * INSTRUCTOR QUOTE:
 * "Because actually my newsletter action does return an object with a message
 * property. So that's what I'm checking for here."
 *
 * The action returns { message: 'Signup successful!' } which is used by:
 * - useFetcher's data property
 * - The useEffect in NewsletterSignup to show the alert
 *
 * ============================================================================
 */
import NewsletterSignup from '../components/NewsletterSignup';
import PageContent from '../components/PageContent';

/**
 * NEWSLETTER PAGE COMPONENT:
 * ==========================
 * A dedicated page for newsletter signup.
 *
 * INSTRUCTOR QUOTE:
 * "Then I added the newsletter.js file which should go into the pages folder
 * which also renders this newsletter signup component wrapped into this page
 * content component."
 *
 * This page shows the same NewsletterSignup component that's also in
 * the navigation, demonstrating that:
 * - On this page, the form could use regular <Form> since the action is here
 * - But in navigation, useFetcher is needed to avoid unwanted navigation
 */
function NewsletterPage() {
  return (
    <PageContent title="Join our awesome newsletter!">
      <NewsletterSignup />
    </PageContent>
  );
}

export default NewsletterPage;

/**
 * ============================================================================
 * LESSON 380: NEWSLETTER ACTION FUNCTION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And where I defined dummy action. That doesn't really do anything but that
 * does extract the provided email and we could then send it to some backend
 * server."
 *
 * INSTRUCTOR QUOTE:
 * "But here we're not doing anything with it because we don't need to do
 * anything with it for this demo."
 *
 * WHY THIS ACTION IS IMPORTANT FOR THE DEMO:
 * ==========================================
 * 1. It's the target action for the NewsletterSignup form
 * 2. It returns { message: 'Signup successful!' }
 * 3. useFetcher's data property receives this return value
 * 4. The useEffect in NewsletterSignup checks for data.message
 * 5. If present, it shows the alert with the message
 *
 * INSTRUCTOR QUOTE:
 * "Because actually my newsletter action does return an object with a message
 * property. So that's what I'm checking for here."
 *
 * HOW useFetcher USES THIS ACTION:
 * ================================
 * In NewsletterSignup.jsx:
 * <fetcher.Form method="post" action="/newsletter">
 *
 * This triggers THIS action function, and the returned object is
 * accessible via fetcher.data.
 *
 * ============================================================================
 */
export async function action({ request }) {
  /**
   * EXTRACTING FORM DATA:
   * =====================
   * Same pattern as other actions - extract data from the request.
   * The email comes from: <input name="email" />
   */
  const data = await request.formData();
  const email = data.get('email');

  /**
   * PLACEHOLDER FOR REAL BACKEND LOGIC:
   * ===================================
   * INSTRUCTOR QUOTE:
   * "That doesn't really do anything but that does extract the provided email
   * and we could then send it to some backend server. But here we're not doing
   * anything with it because we don't need to do anything with it for this demo."
   *
   * In a real application, you would:
   * - Validate the email format
   * - Send the email to a backend server
   * - Handle errors (validation, network, etc.)
   */
  // send to backend newsletter server ...
  console.log(email);

  /**
   * RETURN MESSAGE FOR FETCHER:
   * ===========================
   * INSTRUCTOR QUOTE:
   * "Because actually my newsletter action does return an object with a message
   * property. So that's what I'm checking for here."
   *
   * This return value is accessible via useFetcher:
   * - fetcher.data === { message: 'Signup successful!' }
   *
   * The useEffect in NewsletterSignup checks:
   * if (state === 'idle' && data && data.message)
   *
   * And then displays: window.alert(data.message)
   */
  return { message: 'Signup successful!' };
}

/**
 * ============================================================================
 * LESSON 380: HOW THE ACTION GETS TRIGGERED
 * ============================================================================
 *
 * SCENARIO 1: User on /newsletter page submits form
 * =================================================
 * - The form is on the same route as the action
 * - Could use regular <Form> or fetcher.Form
 * - Either way, this action is triggered
 *
 * SCENARIO 2: User on /events page submits form (from navigation)
 * ===============================================================
 * - The form uses: <fetcher.Form action="/newsletter">
 * - The action="/newsletter" explicitly targets THIS action
 * - fetcher.Form ensures NO navigation occurs
 * - User stays on /events after successful submission
 *
 * INSTRUCTOR QUOTE:
 * "On this form here we can add the action attribute and for example, point
 * at /newsletter because I know that I wanna trigger the action of that
 * newsletter route but I wanna make sure that I don't load that route's
 * component."
 *
 * INSTRUCTOR QUOTE:
 * "I don't wanna load the element that belongs to this route."
 *
 * ============================================================================
 */
