/**
 * ============================================================================
 * AUTHENTICATION PAGE - LOGIN & SIGNUP (Updated in Lesson 391)
 * ============================================================================
 *
 * This page displays the authentication form for login/signup.
 * The action function handles form submission and sends requests to the backend.
 *
 * ============================================================================
 * HOW AUTHENTICATION WORKS (Lesson 388)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "It all starts with sending a request with user credentials. So with an
 * email and a password, for example, to that backend server."
 *
 * FLOW:
 * 1. User visits /auth page (this page)
 * 2. User enters email + password in AuthForm
 * 3. Form submits → action function is triggered
 * 4. Action sends request to backend (/signup or /login)
 * 5. Backend validates and returns JWT token (or error)
 * 6. React app handles response (redirect on success, show errors on failure)
 *
 * ============================================================================
 * THE ACTION FUNCTION (Lesson 391)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "In the auth, we of course must add an action to our route here, an action
 * that is triggered when this form is submitted."
 *
 * INSTRUCTOR QUOTE:
 * "That action will be triggered whenever this authForm is submitted, because
 * it is on the same route as this authForm is on."
 *
 * The action function:
 * 1. Extracts form data (email, password)
 * 2. Determines mode (login vs signup) from URL query params
 * 3. Sends POST request to appropriate backend endpoint
 * 4. Handles response (errors or success redirect)
 *
 * ============================================================================
 * BACKEND ROUTES (Lesson 391)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "On this dummy backend API, which I'm providing to you, there is a route
 * which allows us to create users. We got this signup route here."
 *
 * | Endpoint  | Method | Purpose                      |
 * |-----------|--------|------------------------------|
 * | /signup   | POST   | Create new user, return token|
 * | /login    | POST   | Authenticate user, return token|
 *
 * ============================================================================
 */

import { json, redirect } from 'react-router-dom';

import AuthForm from '../components/AuthForm';

/**
 * AuthenticationPage Component
 *
 * Simple wrapper component that renders the AuthForm.
 * The action function below handles the form submission.
 */
function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

/**
 * ============================================================================
 * ACTION FUNCTION - HANDLES FORM SUBMISSION (Lesson 391)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "I'll export an async function called action, as we did it multiple times
 * in the Routing section. And that action will be triggered whenever this
 * authForm is submitted."
 *
 * This action is registered on the /auth route in App.js and is automatically
 * called by React Router when the <Form> component in AuthForm submits.
 *
 * ============================================================================
 * PARAMETER: { request }
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "In this action here, we of course must get access to the form data that
 * was submitted. And we do that with help of the request object, that's part
 * of that data package that we get as a parameter in this action function."
 *
 * The request object contains:
 * - request.formData() - Method to get submitted form data
 * - request.url - The URL that was used to submit the form
 *
 * ============================================================================
 */
export async function action({ request }) {
  /**
   * ============================================================================
   * STEP 1: EXTRACT FORM DATA (Lesson 391)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "We can do that by calling request.formData, this method. And we await this,
   * and this gives us a data object, which we can then use to search for the
   * email and the password that was entered."
   *
   * The formData() method returns a FormData object that contains the values
   * from all form inputs with a 'name' attribute.
   */
  const data = await request.formData();

  /**
   * INSTRUCTOR QUOTE:
   * "Therefore, we can construct a authData object, where the email is retrieved
   * with help of data.get('email'). This get method exists on this data object,
   * that is returned by formData."
   *
   * The 'email' and 'password' keys match the 'name' attributes on the
   * input elements in AuthForm.js:
   * - <input name="email" ... />
   * - <input name="password" ... />
   */
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  /**
   * ============================================================================
   * STEP 2: DETERMINE MODE (LOGIN VS SIGNUP) (Lesson 391)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Now of course, we wanna send different requests, based on the mode this
   * form is in, if we are in login, or signup mode. So therefore, we also must
   * take a look at this query parameter, in our action."
   *
   * WHY WE CAN'T USE useSearchParams:
   *
   * INSTRUCTOR QUOTE:
   * "Now, thankfully, it's all quite straightforward to get hold of that, even
   * though we can't use the useSearchParams here. That won't work, because
   * we're not in a component here."
   *
   * SOLUTION: Use the built-in URL constructor
   *
   * INSTRUCTOR QUOTE:
   * "But we can use the built-in URL constructor, which is provided by the
   * browser, and pass our request.url to it, to then access the searchParams
   * object on that URL object, that's instantiated here."
   *
   * NOTE: This is a browser-native API, not a React Router feature.
   * new URL(string) parses a URL string and gives access to its parts.
   */
  const searchParams = new URL(request.url).searchParams;

  /**
   * INSTRUCTOR QUOTE:
   * "And then, on that searchParams object, we can also call get, and extract
   * the mode here. We can also say that if it's undefined, we maybe wanna use
   * signup as a default, or login, or whatever you want. Here I'll go for login."
   *
   * The || 'login' provides a fallback if mode is null/undefined
   * (e.g., if someone visits /auth without any query params)
   */
  const mode = searchParams.get('mode') || 'login';

  /**
   * ============================================================================
   * STEP 3: VALIDATE MODE (Lesson 391)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Now of course, users might deliberately enter some unsupported mode here,
   * like abc. And to defend against that, we can simply check if mode is not
   * equal to login, and mode is not equal to signup."
   *
   * INSTRUCTOR QUOTE:
   * "If that's the case, we could throw a new error response, to be precise,
   * and import the json function from react-router-dom."
   *
   * WHY THROW AN ERROR RESPONSE?
   * - Throwing a Response object triggers React Router's error handling
   * - The closest errorElement will be rendered
   * - This prevents sending requests to invalid backend endpoints
   */
  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  /**
   * ============================================================================
   * STEP 4: SEND REQUEST TO BACKEND (Lesson 391)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "The URL is localhost:8080. And then we wanna send the request to either
   * /signup, or /login, based on which mode we are in, because /signup, and
   * /login, are the two routes supported by the dummy backend."
   *
   * INSTRUCTOR QUOTE:
   * "Now conveniently, mode is login or signup. So we can simply append the
   * mode here, after this URL."
   *
   * URL CONSTRUCTION:
   * - mode = 'login'  → http://localhost:8080/login
   * - mode = 'signup' → http://localhost:8080/signup
   */
  const response = await fetch('http://localhost:8080/' + mode, {
    /**
     * INSTRUCTOR QUOTE:
     * "We need to configure this request, and for example, set the method to
     * post, because on the backend, both signup, and login, expect to get
     * post requests."
     */
    method: 'POST',

    /**
     * INSTRUCTOR QUOTE:
     * "We also wanna set the headers, and add the content type header here,
     * which should be set to application json, so that on the backend the
     * sent data is extracted correctly."
     *
     * NOTE: The instructor emphasized this must be 'headers' (plural), not
     * 'header'. A typo here would cause the backend to fail parsing the data.
     */
    headers: {
      'Content-Type': 'application/json',
    },

    /**
     * INSTRUCTOR QUOTE:
     * "And speaking of that data, that should also be added with that body
     * field here, where we have to convert it to json format, with JSON
     * stringify, and where I simply convert my authData."
     *
     * The body must be a string (JSON format), not a JavaScript object.
     */
    body: JSON.stringify(authData),
  });

  /**
   * ============================================================================
   * STEP 5: HANDLE RESPONSE - VALIDATION ERRORS (Lesson 391)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "We could check if the response status code is equal to 422, which means
   * we have some validation errors, or if it's equal to 401, which will also
   * be sent back from the backend, in certain situations. For example, if we
   * try to log in with invalid credentials."
   *
   * BACKEND ERROR CODES:
   * | Status | Meaning                                        |
   * |--------|------------------------------------------------|
   * | 422    | Validation error (invalid email, short password)|
   * | 401    | Authentication failed (wrong credentials)       |
   *
   * INSTRUCTOR QUOTE:
   * "In those cases, if we get these error codes from the backend, I want to
   * return some data, to my route component, to the authForm in the end, so
   * that I can show an error message there."
   *
   * WHY RETURN (NOT THROW)?
   * Returning the response allows the component to access the error data
   * via useActionData() and display it in the form. Throwing would render
   * the error page instead.
   */
  if (response.status === 422 || response.status === 401) {
    return response;
  }

  /**
   * ============================================================================
   * STEP 6: HANDLE RESPONSE - OTHER ERRORS (Lesson 391)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "If I make it past this check, I also wanna check if the response is maybe
   * not okay, if we have any other error, in which case, I wanna throw an error
   * response, so that my closest error element is rendered on the screen."
   *
   * response.ok is true for status codes 200-299, false otherwise.
   * This catches unexpected errors like 500 (server error).
   */
  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  /**
   * ============================================================================
   * STEP 7: EXTRACT AND STORE THE TOKEN (Updated in Lesson 394)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "So for managing that token, we can start by going to the authentication
   * page, and there we got the action that sends the authentication request to
   * the backend. And it would be in that action, where we can extract the token
   * from the response, and where we then can store it."
   *
   * INSTRUCTOR QUOTE:
   * "For that, we can convert that response to a JavaScript object, by awaiting
   * response.json, to parse the response body. This gives me a resData object
   * that can be used."
   *
   * The backend response contains:
   * {
   *   message: "User created successfully." (or "Login successful."),
   *   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  // JWT token
   * }
   */
  const resData = await response.json();

  /**
   * INSTRUCTOR QUOTE:
   * "And on this response data object, I have a token property and that token
   * should now be stored locally."
   *
   * Extract the token from the response object
   */
  const token = resData.token;

  /**
   * ============================================================================
   * STORING THE TOKEN IN localStorage (Lesson 394)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And now the question just is, where should we store it? Well, we can store
   * it in localStorage, which is a built-in storage mechanism provided by the
   * browser, where we can store simple key-value pairs."
   *
   * INSTRUCTOR QUOTE:
   * "So here I could call localStorage.setItem. And this set item method takes
   * a key of your choice, so here maybe token. And the value you wanna store
   * under that key, and that's the token value."
   *
   * WHY localStorage?
   * - Built-in browser API (no extra dependencies)
   * - Persists across page refreshes and browser sessions
   * - Simple key-value storage
   * - Data survives until explicitly cleared
   *
   * SECURITY NOTE:
   * Storing tokens in localStorage is convenient but has security implications.
   * It's vulnerable to XSS attacks. For production apps, consider:
   * - HttpOnly cookies (more secure but requires backend cooperation)
   * - Session storage (cleared when browser closes)
   * - In-memory storage with refresh tokens
   *
   * For this course demo, localStorage is sufficient.
   */
  localStorage.setItem('token', token);

  /**
   * ============================================================================
   * REDIRECT AFTER STORING TOKEN (Lesson 394)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And then thereafter, I can redirect."
   *
   * Now that the token is stored, redirect to the home page.
   * The token will be available for future requests to protected resources.
   */
  return redirect('/');
}