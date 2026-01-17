/**
 * ============================================================================
 * AUTHENTICATION ROUTES - SIGNUP & LOGIN (Lesson 388)
 * ============================================================================
 *
 * This file defines the backend API endpoints for user authentication:
 * - POST /signup - Create a new user account
 * - POST /login  - Authenticate existing user
 *
 * INSTRUCTOR QUOTE:
 * "This dummy backend API learns some new tricks and does now enforce user
 * authentication and support user creation and login."
 *
 * ============================================================================
 * THE AUTHENTICATION FLOW (Lesson 388)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "It all starts with sending a request with user credentials. So with an
 * email and a password, for example, to that backend server. That backend
 * server is then able to validate those credentials or create a new user
 * if that's what we're doing."
 *
 * FLOW DIAGRAM:
 *
 * SIGNUP:
 * React App                                   Backend API
 *    |                                            |
 *    |------ POST /signup { email, password } --->|
 *    |                                            | 1. Validate email format
 *    |                                            | 2. Check if email exists
 *    |                                            | 3. Validate password length
 *    |                                            | 4. Hash password
 *    |                                            | 5. Store user
 *    |                                            | 6. Create JWT token
 *    |<---- { user, token } ---------------------|
 *    |                                            |
 *
 * LOGIN:
 * React App                                   Backend API
 *    |                                            |
 *    |------ POST /login { email, password } ---->|
 *    |                                            | 1. Find user by email
 *    |                                            | 2. Compare password hash
 *    |                                            | 3. Create JWT token
 *    |<---- { token } ---------------------------|
 *    |                                            |
 *
 * INSTRUCTOR QUOTE:
 * "If the credentials are valid, if we did provide a valid email password
 * combination, then the server will send us back a response that basically
 * gives us permission to access certain protected resources."
 *
 * ============================================================================
 */

const express = require('express');
const { add, get } = require('../data/user');
const { createJSONToken, isValidPassword } = require('../util/auth');
const { isValidEmail, isValidText } = require('../util/validation');

const router = express.Router();

/**
 * ============================================================================
 * SIGNUP ROUTE - POST /signup (Lesson 388)
 * ============================================================================
 *
 * Creates a new user account and returns a JWT token.
 *
 * IMPORTANT: After signup, the user is automatically logged in because
 * we return a token. This provides a seamless user experience - no need
 * to sign up and then separately log in.
 *
 * REQUEST BODY:
 * {
 *   "email": "user@example.com",
 *   "password": "password123"
 * }
 *
 * SUCCESS RESPONSE (201):
 * {
 *   "message": "User created.",
 *   "user": { "id": "...", "email": "user@example.com" },
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 *
 * ERROR RESPONSE (422):
 * {
 *   "message": "User signup failed due to validation errors.",
 *   "errors": { "email": "Invalid email.", "password": "..." }
 * }
 */
router.post('/signup', async (req, res, next) => {
  const data = req.body;
  let errors = {};

  // Validation Step 1: Check email format
  if (!isValidEmail(data.email)) {
    errors.email = 'Invalid email.';
  } else {
    // Validation Step 2: Check if email already exists
    try {
      const existingUser = await get(data.email);
      if (existingUser) {
        errors.email = 'Email exists already.';
      }
    } catch (error) {
      // User not found - this is good, email is available
    }
  }

  // Validation Step 3: Check password length (min 6 characters)
  if (!isValidText(data.password, 6)) {
    errors.password = 'Invalid password. Must be at least 6 characters long.';
  }

  // If any validation errors, return 422 with error details
  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'User signup failed due to validation errors.',
      errors,
    });
  }

  // Create user and generate token
  try {
    // add() hashes the password before storing (see data/user.js)
    const createdUser = await add(data);

    // Create JWT token for immediate authentication after signup
    const authToken = createJSONToken(createdUser.email);

    // Return user info and token
    // The token is what the frontend will store and attach to future requests
    res
      .status(201)
      .json({ message: 'User created.', user: createdUser, token: authToken });
  } catch (error) {
    next(error);
  }
});

/**
 * ============================================================================
 * LOGIN ROUTE - POST /login (Lesson 388)
 * ============================================================================
 *
 * Authenticates a user with email/password and returns a JWT token.
 *
 * INSTRUCTOR QUOTE:
 * "When a user signs up or logs in, what I'm doing in the end is I'm creating
 * such a JSON token as it's called, a JSON Web Token."
 *
 * REQUEST BODY:
 * {
 *   "email": "user@example.com",
 *   "password": "password123"
 * }
 *
 * SUCCESS RESPONSE (200):
 * {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 *
 * ERROR RESPONSES:
 * - 401: User not found (generic "Authentication failed" for security)
 * - 422: Password doesn't match
 *
 * SECURITY NOTE:
 * We return a generic error for "user not found" (401) to prevent
 * email enumeration attacks. Attackers shouldn't be able to determine
 * which emails are registered.
 */
router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let user;
  try {
    // Step 1: Find user by email
    user = await get(email);
  } catch (error) {
    // User not found - return generic error (security best practice)
    return res.status(401).json({ message: 'Authentication failed.' });
  }

  // Step 2: Verify password using bcrypt compare
  const pwIsValid = await isValidPassword(password, user.password);
  if (!pwIsValid) {
    return res.status(422).json({
      message: 'Invalid credentials.',
      errors: { credentials: 'Invalid email or password entered.' },
    });
  }

  // Step 3: Create and return JWT token
  // This token is what the frontend will store and use for future requests
  const token = createJSONToken(email);
  res.json({ token });
});

module.exports = router;
