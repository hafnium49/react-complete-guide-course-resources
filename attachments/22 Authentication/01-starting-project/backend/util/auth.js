/**
 * ============================================================================
 * AUTHENTICATION UTILITIES - TOKEN CREATION & VALIDATION (Lesson 388)
 * ============================================================================
 *
 * This file contains the core authentication logic for the backend API.
 * It implements token-based authentication using JSON Web Tokens (JWT).
 *
 * INSTRUCTOR QUOTE:
 * "The idea behind authentication tokens is that on the server after a user
 * was authenticated, so after a user sent a valid pair of credentials, for
 * example, we create but don't store a permission token which is basically
 * a string that is created according to some algorithm and that includes
 * some information."
 *
 * ============================================================================
 * WHY TOKENS INSTEAD OF SERVER-SIDE SESSIONS? (Lesson 388)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Server side sessions are a great way of solving authentication or of
 * enabling authentication but they do require a tight coupling between
 * backend and frontend because the backend must store information about
 * the client. And with React apps you are often talking to decoupled
 * backend APIs which are not closely coupled to a client and which don't
 * store any client site information."
 *
 * KEY DIFFERENCE:
 * | Approach          | Storage          | Best For                    |
 * |-------------------|------------------|-----------------------------|
 * | Server Sessions   | Server stores ID | Full-stack, tightly coupled |
 * | Auth Tokens (JWT) | Client stores    | Decoupled React + API       |
 *
 * ============================================================================
 * HOW TOKEN-BASED AUTHENTICATION WORKS (Lesson 388)
 * ============================================================================
 *
 * 1. Client sends credentials (email + password) to backend
 * 2. Backend validates credentials
 * 3. If valid, backend CREATES a token (doesn't store it)
 * 4. Backend sends token back to client
 * 5. Client stores token and attaches it to future requests
 * 6. Backend validates token on protected routes
 *
 * INSTRUCTOR QUOTE:
 * "The special thing about that token is that its validity can only be
 * checked and proven by the backend that created that token because the
 * token is created with help of some private key which is only known by
 * the backend."
 *
 * ============================================================================
 * WHY A SIMPLE "YES" RESPONSE ISN'T ENOUGH (Lesson 388)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "If a server responds with a yes and in future requests from the client
 * to the server, we then simply append that information that we got a yes
 * in the past. That of course is not enough because we could simply fake
 * that. We could simply say that we have permission so the server must
 * reply with something else than a yes or no, something that can be
 * validated on the server and that proves that we really got permission
 * from the server in the past."
 *
 * ============================================================================
 */

/**
 * Third-party packages for JWT and password handling:
 *
 * - jsonwebtoken: Creates and verifies JSON Web Tokens
 *   INSTRUCTOR QUOTE: "That token is created with help of a third party
 *   package, and it's a very simple piece of code that I'm executing here."
 *
 * - bcryptjs: Securely compares hashed passwords
 */
const { sign, verify } = require('jsonwebtoken');
const { compare } = require('bcryptjs');
const { NotAuthError } = require('./errors');

/**
 * ============================================================================
 * THE PRIVATE KEY - CRITICAL FOR TOKEN SECURITY (Lesson 388)
 * ============================================================================
 *
 * This key is used to SIGN tokens when creating them and to VERIFY tokens
 * when validating them. Only the backend knows this key.
 *
 * INSTRUCTOR QUOTE:
 * "Under the hood I'm using that third party package for creating a token
 * that is created with help of a private key that's only known by the backend.
 * Of course, in reality, you would have a safer key than that simple key,
 * and you would probably not include it in your code base, but this is just
 * a dummy backend which we're using as a demo."
 *
 * SECURITY NOTE: In production:
 * - Use a long, random, cryptographically secure key
 * - Store in environment variables (not in code)
 * - Never expose in client-side code or version control
 */
const KEY = 'supersecret';

/**
 * ============================================================================
 * CREATE JSON WEB TOKEN (Lesson 388)
 * ============================================================================
 *
 * Creates a new JWT containing the user's email, signed with the private key.
 *
 * INSTRUCTOR QUOTE:
 * "When a user signs up or logs in, what I'm doing in the end is I'm creating
 * such a JSON token as it's called, a JSON Web Token."
 *
 * INSTRUCTOR QUOTE:
 * "That token is in the end just some string created according to some
 * algorithm and signed with that key."
 *
 * TOKEN STRUCTURE (JWT has 3 parts separated by dots):
 * header.payload.signature
 *
 * - Header: Algorithm & token type
 * - Payload: Data (email) + expiration time
 * - Signature: Encrypted with the KEY (proves authenticity)
 */
function createJSONToken(email) {
  // sign() creates the token with:
  // - Payload: { email } - the data we want to include
  // - KEY: Our private secret key for signing
  // - Options: { expiresIn: '1h' } - token expires after 1 hour
  return sign({ email }, KEY, { expiresIn: '1h' });
}

/**
 * ============================================================================
 * VALIDATE JSON WEB TOKEN (Lesson 388)
 * ============================================================================
 *
 * Verifies that a token was created by this backend and hasn't been tampered with.
 *
 * INSTRUCTOR QUOTE:
 * "In future requests from the client to the backend we attach that token
 * to those requests, and the backend is able to take a look at that token,
 * validate it and see if it is a token that was created by that backend."
 *
 * INSTRUCTOR QUOTE:
 * "And when I validate that token I am again taking that key into account."
 *
 * HOW VALIDATION WORKS:
 * 1. verify() decodes the token using the same KEY
 * 2. If the signature doesn't match (tampered or wrong key), throws error
 * 3. If token is expired, throws error
 * 4. If valid, returns the decoded payload (email, etc.)
 */
function validateJSONToken(token) {
  return verify(token, KEY);
}

/**
 * Compares a plain text password with a hashed password.
 * Uses bcrypt's secure comparison (timing-attack resistant).
 */
function isValidPassword(password, storedPassword) {
  return compare(password, storedPassword);
}

/**
 * ============================================================================
 * AUTHENTICATION MIDDLEWARE - ROUTE PROTECTION (Lesson 388)
 * ============================================================================
 *
 * This middleware is the "gatekeeper" that protects routes requiring auth.
 *
 * INSTRUCTOR QUOTE:
 * "In future requests from the frontend to the backend I can run those
 * requests through some extra middleware as it's called. So through some
 * extra check on my backend to validate whether those requests do include
 * a valid token."
 *
 * INSTRUCTOR QUOTE:
 * "I am validating this with help of a middleware I wrote myself which
 * simply funnels the incoming request on the backend through a couple of
 * checks where in the end I check whether a valid JSON token was attached."
 *
 * HOW IT'S USED:
 * - Place this middleware BEFORE routes that need protection
 * - Unprotected routes come BEFORE this middleware in the route file
 * - Protected routes come AFTER this middleware
 *
 * INSTRUCTOR QUOTE:
 * "Some routes are protected by some extra middleware in front of them,
 * some extra middleware that checks whether the incoming request has a
 * valid token attached. And if it doesn't then an error response would
 * be sent back."
 *
 * EXPECTED HEADER FORMAT:
 * Authorization: Bearer <token>
 *
 * Example: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */
function checkAuthMiddleware(req, res, next) {
  // Skip OPTIONS requests (CORS preflight requests)
  if (req.method === 'OPTIONS') {
    return next();
  }

  // Check 1: Does the request have an Authorization header?
  if (!req.headers.authorization) {
    console.log('NOT AUTH. AUTH HEADER MISSING.');
    return next(new NotAuthError('Not authenticated.'));
  }

  // Check 2: Is the Authorization header in correct format? (Bearer <token>)
  const authFragments = req.headers.authorization.split(' ');

  if (authFragments.length !== 2) {
    console.log('NOT AUTH. AUTH HEADER INVALID.');
    return next(new NotAuthError('Not authenticated.'));
  }

  // Extract the token (second part after "Bearer ")
  const authToken = authFragments[1];

  // Check 3: Is the token valid?
  try {
    const validatedToken = validateJSONToken(authToken);
    // Attach decoded token to request for use in route handlers
    req.token = validatedToken;
  } catch (error) {
    console.log('NOT AUTH. TOKEN INVALID.');
    return next(new NotAuthError('Not authenticated.'));
  }

  // All checks passed - proceed to the protected route
  next();
}

exports.createJSONToken = createJSONToken;
exports.validateJSONToken = validateJSONToken;
exports.isValidPassword = isValidPassword;
exports.checkAuth = checkAuthMiddleware;
