/**
 * ============================================================================
 * pages/new-meetup/index.js - LESSON 486 & 488: THE NEW MEETUP PAGE
 * ============================================================================
 *
 * LESSON 486: Created this page file using the folder approach
 * LESSON 488: Filled this page with the NewMeetupForm component
 *
 * ============================================================================
 * 🎓 LESSON 488: ADDING THE NEW MEETUP FORM
 * ============================================================================
 *
 * From the instructor:
 * "So for this NewMeetup component we again create a function here, a component
 * function like the NewMeetupPage function. And of course, as before we need
 * to export this so that NextJS is able to find this and then we can render
 * our content here."
 *
 * In this lesson we:
 * 1. Import the pre-built NewMeetupForm component
 * 2. Create a handler function to receive form data
 * 3. Pass the handler to NewMeetupForm via the onAddMeetup prop
 * 4. (For now) Console.log the submitted data
 *
 * ============================================================================
 * 📁 LESSON 486 RECAP: FOLDER APPROACH
 * ============================================================================
 *
 * TWO WAYS TO CREATE THIS PAGE:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  OPTION 1: FILE APPROACH                                                 │
 * │  pages/new-meetup.js    →  Route: /new-meetup                           │
 * │                                                                          │
 * │  OPTION 2: FOLDER APPROACH (USED HERE)                                   │
 * │  pages/new-meetup/index.js  →  Route: /new-meetup                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🎨 CSS MODULES (MENTIONED IN THIS LESSON)
 * ============================================================================
 *
 * From the instructor:
 * "...which renders a form with some controls, with some styles attached
 * using CSS modules here for styling. I'll come back to that in a second,
 * that is supported by NextJS out of the box, which is really convenient."
 *
 * CSS Modules are a styling approach where:
 * • CSS class names are automatically scoped to the component
 * • Prevents global CSS conflicts
 * • Files are named: ComponentName.module.css
 * • NextJS supports this out of the box - no configuration needed!
 *
 * ============================================================================
 * ⚛️ THE NewMeetupForm COMPONENT (QUICK RECAP)
 * ============================================================================
 *
 * From the instructor:
 * "Now our content in this case should be the NewMeetupForm component
 * which I prepared in advance, which renders a form with some controls..."
 *
 * The NewMeetupForm component:
 * • Renders input fields for title, image URL, address, description
 * • Uses useRef hooks to collect input values (not useState)
 * • Expects an onAddMeetup prop (a callback function)
 * • Calls onAddMeetup(meetupData) when form is submitted
 *
 * ============================================================================
 * 🔗 PROPS AND CALLBACKS (COMMUNICATION PATTERN)
 * ============================================================================
 *
 * From the instructor:
 * "And then here we get that data. We extract that data, the user entered,
 * with help of Refs which is a built-in React feature, has nothing to do
 * with NextJS. And then we basically call a function which we expect to get
 * on the onAddMeetup prop. And to that function we then pass the collected
 * meetup data."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  DATA FLOW: CHILD → PARENT COMMUNICATION                                 │
 * │                                                                          │
 * │  [NewMeetupPage]                                                        │
 * │       │                                                                  │
 * │       │  passes: onAddMeetup={addMeetupHandler}                         │
 * │       ▼                                                                  │
 * │  [NewMeetupForm]                                                        │
 * │       │                                                                  │
 * │       │  User fills form and clicks submit                              │
 * │       │                                                                  │
 * │       │  calls: props.onAddMeetup(meetupData)                           │
 * │       ▼                                                                  │
 * │  [NewMeetupPage.addMeetupHandler]                                       │
 * │       │                                                                  │
 * │       │  receives: enteredMeetupData                                    │
 * │       │  currently: logs to console                                     │
 * │       │  later: sends to API, redirects, etc.                           │
 * │       ▼                                                                  │
 * │  [Future: API Route / Database]                                         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔑 FUNCTION POINTER vs FUNCTION CALL
 * ============================================================================
 *
 * From the instructor:
 * "We can add our addMeetupHandler function or however you want to name it
 * and then pass a pointer to this function to the onAddMeetup prop - a pointer
 * and not the result of executing it. So no parentheses here, because this
 * function should be executed eventually from inside that component, when
 * the form is submitted as it turns out."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  CORRECT vs INCORRECT                                                    │
 * │                                                                          │
 * │  ✅ CORRECT (function pointer):                                         │
 * │  <NewMeetupForm onAddMeetup={addMeetupHandler} />                       │
 * │  → Passes the function itself                                           │
 * │  → Will be called LATER when form submits                               │
 * │                                                                          │
 * │  ❌ INCORRECT (function call):                                          │
 * │  <NewMeetupForm onAddMeetup={addMeetupHandler()} />                     │
 * │  → Calls the function IMMEDIATELY during render                         │
 * │  → Passes the RESULT (undefined) to the prop                            │
 * │  → Form submission won't work!                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🧪 TESTING THE FORM
 * ============================================================================
 *
 * From the instructor:
 * "And with that out of the way, if we go back again we can visit
 * localhost:3000/new-meetup and we see this form again... If we enter this
 * data and we click Add Meetup we see this object logged to the console.
 * So handling form submission works."
 *
 * To test:
 * 1. Run: npm run dev
 * 2. Visit: http://localhost:3000/new-meetup
 * 3. Fill in the form fields
 * 4. Open browser DevTools (F12) → Console tab
 * 5. Click "Add Meetup" button
 * 6. See the meetup data object logged
 *
 * ============================================================================
 * ⚠️ CURRENT LIMITATIONS (TO BE FIXED IN LATER LESSONS)
 * ============================================================================
 *
 * From the instructor:
 * "Obviously we're not doing anything with that data. At this point, we're
 * not navigating away and we are going to do all these things later but this
 * again just shows us how we can use pages and also mix regular React
 * components into those pages."
 *
 * Current limitations:
 * • Data is only logged, not saved to database
 * • No navigation after form submission
 * • No header/layout around the page
 * • Page takes up entire width (no proper styling)
 *
 * From the instructor:
 * "And then, with that, that's a great start but now we're already facing
 * a couple of issues here. We've got a lot of missing functionality, of course.
 * And for example, we also have no way for navigating between pages and we
 * have no general layout around our pages. Every page takes up the entire width.
 * We get no header above them. And that is probably something we want to change."
 *
 * ============================================================================
 * 🔜 FUTURE IMPROVEMENTS (UPCOMING LESSONS)
 * ============================================================================
 *
 * • Add navigation between pages (Link component)
 * • Add layout with header (Layout component)
 * • Send data to API route for database storage
 * • Redirect to home page after successful submission
 * • Add MongoDB database connection
 *
 * ============================================================================
 */

/**
 * Import the NewMeetupForm component
 *
 * From the instructor:
 * "And hence now in this newMeetup index.js file here we can use that component
 * and we can import NewMeetupForm from going up two levels to leave the pages
 * folder, diving into the components folder, Meetups, and then NewMeetupForm."
 *
 * Path breakdown:
 * - We're in: /pages/new-meetup/index.js
 * - Go up 2 levels: ../../ (to project root)
 * - Then: components/meetups/NewMeetupForm
 */
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

/**
 * NewMeetupPage Component - Page for Adding New Meetups
 *
 * This page component renders the NewMeetupForm and handles
 * the form submission via a callback function.
 *
 * URL: http://localhost:3000/new-meetup
 *
 * From the instructor:
 * "So for this NewMeetup component we again create a function here,
 * a component function like the NewMeetupPage function."
 */
function NewMeetupPage() {
  /**
   * FORM SUBMISSION HANDLER
   *
   * This function is called when the user submits the form in NewMeetupForm.
   * The form component passes the collected data as an argument.
   *
   * From the instructor:
   * "We can add our addMeetupHandler function or however you want to name it."
   *
   * @param {Object} enteredMeetupData - The data collected from the form
   * @param {string} enteredMeetupData.title - Meetup title
   * @param {string} enteredMeetupData.image - Image URL
   * @param {string} enteredMeetupData.address - Physical address
   * @param {string} enteredMeetupData.description - Meetup description
   *
   * FUTURE IMPLEMENTATION:
   * This function will eventually:
   * 1. Send data to an API route (POST /api/new-meetup)
   * 2. Wait for the response
   * 3. Redirect to the home page using router.push('/')
   */
  function addMeetupHandler(enteredMeetupData) {
    /**
     * FOR NOW: Just log the data to console
     *
     * From the instructor:
     * "Here, we then get our enteredMeetupData. And we can, for example,
     * for the moment simply log this to the console."
     *
     * Check the browser's Developer Tools console to see this output
     * when you submit the form.
     *
     * Expected console output:
     * {
     *   title: "...",
     *   image: "https://...",
     *   address: "...",
     *   description: "..."
     * }
     */
    console.log(enteredMeetupData);
  }

  /**
   * RENDER THE FORM COMPONENT
   *
   * From the instructor:
   * "And then we can return NewMeetupForm, this component like this if we want to."
   *
   * We pass addMeetupHandler as the onAddMeetup prop.
   *
   * From the instructor:
   * "Now as I just mentioned, in this component we do expect that there will
   * be an onAddMeetup prop which holds a function that we can call. And hence
   * we might want to prepare this function here as well... and then pass a
   * pointer to this function to the onAddMeetup prop."
   *
   * IMPORTANT: Pass the function reference (addMeetupHandler), NOT the result
   * of calling it (addMeetupHandler()). No parentheses!
   */
  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}

/**
 * EXPORT THE PAGE COMPONENT
 *
 * From the instructor:
 * "And of course, as before we need to export this so that NextJS is able
 * to find this and then we can render our content here."
 *
 * Default export is required for NextJS page components.
 */
export default NewMeetupPage;
