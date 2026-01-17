/**
 * ============================================================================
 * AUTHENTICATION PAGE - LOGIN & SIGNUP (Lesson 388)
 * ============================================================================
 *
 * This page displays the authentication form for login/signup.
 * It's part of the starting project and will be connected to routing
 * and actions in subsequent lessons.
 *
 * ============================================================================
 * HOW AUTHENTICATION WILL WORK (Lesson 388)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "It all starts with sending a request with user credentials. So with an
 * email and a password, for example, to that backend server."
 *
 * FLOW:
 * 1. User visits /auth page (this page)
 * 2. User enters email + password in AuthForm
 * 3. Form submits to backend (/signup or /login)
 * 4. Backend validates and returns JWT token
 * 5. React app stores the token
 * 6. User is redirected (e.g., to events page)
 *
 * ============================================================================
 * WHAT WE'LL IMPLEMENT (Lesson 388)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "On the client side, in the React app we have to store that token,
 * attach it to future outgoing requests, and use that token as an indicator
 * whether a user is logged in or not because we might want to update the UI
 * too, for example, show a logout button if we are logged in."
 *
 * TODO in upcoming lessons:
 * - Add this page to the router (/auth route)
 * - Create action function to handle form submission
 * - Send credentials to backend API
 * - Store received token (localStorage or state)
 * - Redirect after successful auth
 * - Update UI based on auth state
 *
 * ============================================================================
 */

import AuthForm from '../components/AuthForm';

/**
 * AuthenticationPage Component
 *
 * Simple wrapper component that renders the AuthForm.
 * The actual auth logic (action function) will be added in later lessons.
 */
function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;