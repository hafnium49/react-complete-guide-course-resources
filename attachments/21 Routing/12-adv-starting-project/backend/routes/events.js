/**
 * ============================================================================
 * EVENTS ROUTES - BACKEND API (Lessons 365-366 - Loader Timing Demonstration)
 * ============================================================================
 *
 * This is the Express.js backend code that handles event-related API requests.
 * It's NOT React code - it's Node.js/Express code that runs on the server.
 *
 * INSTRUCTOR QUOTE (Lesson 365):
 * "And I actually already mentioned it before. The loader for a page will be
 * called right when we start navigating to that page. So not after the page
 * component has been rendered, but before we actually go there."
 *
 * ============================================================================
 * LESSON 365: DEMONSTRATING LOADER TIMING WITH A TIMEOUT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And you can see that that's the case if you go to the backend API, and
 * there to routes, events.js, and here this very first route, that's the code,
 * the backend code, that's responsible for returning data to the front end."
 *
 * INSTRUCTOR QUOTE:
 * "We don't fully need to understand it, but what we can do here, between this
 * 'const events' line and the 'res.json' line, is that we add a timeout."
 *
 * THE TIMEOUT DEMONSTRATION:
 * ==========================
 * By adding a setTimeout of 1.5 seconds before sending the response, we can
 * observe the loader timing behavior:
 * - Click "Events" link on homepage
 * - Nothing happens visually for 1.5 seconds
 * - Then the page transitions to /events with data already loaded
 *
 * INSTRUCTOR QUOTE:
 * "Because the data fetching is initiated as soon as we initiate the route
 * transition. But by default, React router will actually wait for the data
 * to be fetched, so for the loader to be finished before it then renders
 * the page with the fetched data."
 *
 * ============================================================================
 */
const express = require('express');

const { getAll, get, add, replace, remove } = require('../data/event');
const {
  isValidText,
  isValidDate,
  isValidImageUrl,
} = require('../util/validation');

const router = express.Router();

/**
 * ============================================================================
 * GET ALL EVENTS ROUTE (Lesson 365 - Timeout Demonstration)
 * ============================================================================
 *
 * This is the route that handles GET requests to /events.
 * The frontend's loader function calls this endpoint.
 *
 * ADDING A DELAY FOR DEMONSTRATION (Lesson 365):
 * ==============================================
 * INSTRUCTOR QUOTE:
 * "And here we could set a timeout of let's say one and a half seconds and
 * move that 'res.json' code into the timeout callback function. Now this
 * will simply ensure that the response is only sent back from the backend
 * to the frontend after one and a half seconds."
 *
 * WHAT THIS DEMONSTRATES (Lesson 365):
 * ====================================
 * INSTRUCTOR QUOTE:
 * "If we now go to the terminal where we started the backend server, and we
 * quit that server and restart it, since we changed our backend code, I can
 * go back go to the homepage and click on 'events'. And you will see that at
 * first nothing happens, and only after one and a half seconds we go there."
 *
 * INSTRUCTOR QUOTE:
 * "So here I click, and now we wait. And now we go there."
 *
 * ADVANTAGES OF THIS BEHAVIOR (Lesson 365):
 * =========================================
 * INSTRUCTOR QUOTE:
 * "The advantage of this approach is that you can rely on the data being there
 * once the events page component is being rendered. You don't need to worry
 * about whether the data is there yet or not and therefore you don't need to
 * render a loading state on this event's page component."
 *
 * DISADVANTAGES (Lesson 365):
 * ===========================
 * INSTRUCTOR QUOTE:
 * "The downside, of course, is that we have this delay where it looks to the
 * user as if nothing is happening."
 *
 * SOLUTIONS COMING (Lesson 365):
 * ==============================
 * INSTRUCTOR QUOTE:
 * "And we'll see how we can improve this user experience in a couple of seconds,
 * and actually also later, again, towards the end of the section because React
 * Router gives us various tools for improving that user experience."
 */
router.get('/', async (req, res, next) => {
  try {
    const events = await getAll();
    /**
     * TIMEOUT REMOVED (Lesson 366):
     * =============================
     * INSTRUCTOR QUOTE:
     * "Now with all that done, though, I will go back and remove this Timeout
     * here on the back end and move back to the code we had originally on that
     * back end, because I, now, no longer wanna simulate this."
     *
     * The setTimeout was used in Lesson 365 to demonstrate loader timing.
     * It's now removed to return to normal operation.
     *
     * TO RE-ENABLE THE DEMONSTRATION:
     * ===============================
     * Uncomment the setTimeout below and comment out the direct res.json():
     *
     * setTimeout(() => {
     *   res.json({ events: events });
     * }, 1500);
     *
     * Then restart the backend server to see the loading behavior.
     */
    setTimeout(() => {
      res.json({ events: events });
    }, 2000);
    res.json({ events: events });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const event = await get(req.params.id);
    res.json({ event: event });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
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

router.delete('/:id', async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: 'Event deleted.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
