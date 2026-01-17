/**
 * ============================================================================
 * EVENTS ROUTES - PROTECTED VS UNPROTECTED ROUTES (Lesson 388)
 * ============================================================================
 *
 * This file demonstrates the key concept of PROTECTED vs UNPROTECTED routes.
 * Some routes require authentication, others don't.
 *
 * INSTRUCTOR QUOTE:
 * "It's also worth noting that not all backend routes are protected. There
 * are certain routes which don't require authentication. For example, if you
 * want to get a list of all events then for this API that's possible without
 * being logged in. But if you want to create a new event or if you want to
 * update an event then you must be authenticated."
 *
 * ============================================================================
 * ROUTE PROTECTION SUMMARY
 * ============================================================================
 *
 * | Route              | Method | Protected? | Reason                       |
 * |--------------------|--------|------------|------------------------------|
 * | /events            | GET    | NO         | Anyone can view events       |
 * | /events/:id        | GET    | NO         | Anyone can view event detail |
 * | /events            | POST   | YES        | Only logged-in users create  |
 * | /events/:id        | PATCH  | YES        | Only logged-in users update  |
 * | /events/:id        | DELETE | YES        | Only logged-in users delete  |
 *
 * ============================================================================
 * HOW ROUTE PROTECTION WORKS (Lesson 388)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Some routes are protected by some extra middleware in front of them,
 * some extra middleware that checks whether the incoming request has a
 * valid token attached. And if it doesn't then an error response would
 * be sent back."
 *
 * The magic happens with `router.use(checkAuth)`:
 * - Routes defined BEFORE this line = UNPROTECTED (no auth needed)
 * - Routes defined AFTER this line = PROTECTED (valid token required)
 *
 * ============================================================================
 */

const express = require('express');

const { getAll, get, add, replace, remove } = require('../data/event');
const { checkAuth } = require('../util/auth');
const {
  isValidText,
  isValidDate,
  isValidImageUrl,
} = require('../util/validation');

const router = express.Router();

/**
 * ============================================================================
 *                    UNPROTECTED ROUTES (NO AUTH REQUIRED)
 * ============================================================================
 *
 * These routes are defined BEFORE router.use(checkAuth), so they don't
 * require authentication. Anyone can access them.
 *
 * INSTRUCTOR QUOTE:
 * "If you want to get a list of all events then for this API that's
 * possible without being logged in."
 */

/**
 * GET /events - Fetch all events (PUBLIC)
 *
 * No authentication required - anyone can view the list of events.
 */
router.get('/', async (req, res, next) => {
  console.log(req.token); // Will be undefined for unauthenticated requests
  try {
    const events = await getAll();
    res.json({ events: events });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /events/:id - Fetch single event by ID (PUBLIC)
 *
 * No authentication required - anyone can view event details.
 */
router.get('/:id', async (req, res, next) => {
  try {
    const event = await get(req.params.id);
    res.json({ event: event });
  } catch (error) {
    next(error);
  }
});

/**
 * ============================================================================
 *                    AUTHENTICATION MIDDLEWARE BARRIER
 * ============================================================================
 *
 * CRITICAL: This line is what separates public routes from protected routes!
 *
 * router.use(checkAuth) applies the authentication middleware to ALL routes
 * defined AFTER this point. The checkAuth middleware:
 * 1. Checks for Authorization header
 * 2. Validates the JWT token
 * 3. If invalid/missing, returns 401 error
 * 4. If valid, attaches decoded token to req.token and proceeds
 *
 * INSTRUCTOR QUOTE:
 * "In future requests from the frontend to the backend I can run those
 * requests through some extra middleware as it's called. So through some
 * extra check on my backend to validate whether those requests do include
 * a valid token."
 */
router.use(checkAuth);

/**
 * ============================================================================
 *                    PROTECTED ROUTES (AUTH REQUIRED)
 * ============================================================================
 *
 * These routes are defined AFTER router.use(checkAuth), so they require
 * a valid JWT token in the Authorization header.
 *
 * INSTRUCTOR QUOTE:
 * "But if you want to create a new event or if you want to update an event
 * then you must be authenticated."
 *
 * HOW TO ACCESS PROTECTED ROUTES:
 * Include Authorization header: "Bearer <your-jwt-token>"
 *
 * Example request:
 * POST /events
 * Headers: {
 *   "Content-Type": "application/json",
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 */

/**
 * POST /events - Create new event (PROTECTED)
 *
 * Requires valid JWT token. Only authenticated users can create events.
 */
router.post('/', async (req, res, next) => {
  // req.token contains the decoded JWT payload (set by checkAuth middleware)
  console.log(req.token); // { email: "user@example.com", iat: ..., exp: ... }
  const data = req.body;

  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = 'Invalid title.';
  }

  if (!isValidText(data.description)) {
    errors.description = 'Invalid description.';
  }

  if (!isValidDate(data.date)) {
    errors.date = 'Invalid date.';
  }

  if (!isValidImageUrl(data.image)) {
    errors.image = 'Invalid image.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Adding the event failed due to validation errors.',
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: 'Event saved.', event: data });
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /events/:id - Update existing event (PROTECTED)
 *
 * Requires valid JWT token. Only authenticated users can update events.
 */
router.patch('/:id', async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = 'Invalid title.';
  }

  if (!isValidText(data.description)) {
    errors.description = 'Invalid description.';
  }

  if (!isValidDate(data.date)) {
    errors.date = 'Invalid date.';
  }

  if (!isValidImageUrl(data.image)) {
    errors.image = 'Invalid image.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Updating the event failed due to validation errors.',
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: 'Event updated.', event: data });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /events/:id - Delete event (PROTECTED)
 *
 * Requires valid JWT token. Only authenticated users can delete events.
 */
router.delete('/:id', async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: 'Event deleted.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
