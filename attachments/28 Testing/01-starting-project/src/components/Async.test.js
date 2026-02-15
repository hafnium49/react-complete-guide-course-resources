/**
 * ============================================================================
 * src/components/Async.test.js — LESSON 577
 * ============================================================================
 *
 * TESTING ASYNCHRONOUS COMPONENTS
 *
 * Components that fetch data asynchronously present a unique testing
 * challenge. On the initial render, the data has not arrived yet — the
 * component displays an empty state. Only after the HTTP response arrives
 * and triggers a state update does the component re-render with content.
 *
 * This means the standard synchronous queries (getBy..., getAllBy...) will
 * FAIL when used to look for the fetched content, because they inspect the
 * DOM at the exact instant they are called — during the initial empty render.
 *
 * SYNCHRONOUS vs ASYNCHRONOUS QUERIES:
 *
 *   getAllByRole('listitem')
 *     → Looks for list items RIGHT NOW. If none exist yet (because the
 *       fetch hasn't completed), it throws immediately.
 *
 *   findAllByRole('listitem')
 *     → Returns a PROMISE. React Testing Library re-evaluates the DOM
 *       periodically, waiting for matching elements to appear. The promise
 *       resolves once the elements are found, or rejects after a timeout.
 *
 * The default timeout for find queries is 1 second. If the async operation
 * takes longer, you can increase it via a third argument:
 *
 *   findAllByRole('listitem', {}, { timeout: 3000 })
 *
 * The second argument is the same options object used by getByRole (for
 * exact matching, accessible name filtering, etc.).
 *
 * ASYNC TEST FUNCTIONS:
 *
 * Because findAllByRole returns a promise, the test function must be
 * declared as async and the query must be awaited. Jest automatically
 * waits for the returned promise to resolve before evaluating the test
 * result — no special configuration needed.
 *
 * getAll vs findAll — SINGULAR vs PLURAL:
 *
 * When you expect MULTIPLE matching elements, use the "All" variants:
 *   - getAllByRole / findAllByRole → return an ARRAY of elements
 *   - getByRole / findByRole → return a SINGLE element (throw if >1 match)
 *
 * Since the API returns multiple posts, each rendered as an <li>, we need
 * findAllByRole to collect the entire array of list items.
 *
 * IMPORTANT CAVEAT (addressed in the next lesson):
 *
 * This test originally sent a REAL HTTP request to JSONPlaceholder every
 * time it ran — see lesson 578 below for the mocking solution.
 *
 * ============================================================================
 * LESSON 578: MOCKING HTTP REQUESTS WITH jest.fn()
 * ============================================================================
 *
 * WHY MOCK?
 *
 * Sending real HTTP requests from tests is problematic for several reasons:
 *
 *   1. NETWORK TRAFFIC — Tests run frequently during development. If every
 *      test run hits a real server, you hammer it with requests (especially
 *      when you have hundreds of tests).
 *
 *   2. SIDE EFFECTS — Components that send POST/PUT/DELETE requests could
 *      insert, modify, or delete real data on the server during testing.
 *      Tests should never cause real-world side effects.
 *
 *   3. RELIABILITY — If the server is temporarily down, slow, or rate-
 *      limiting, your tests fail for reasons unrelated to your code. Tests
 *      should fail only when YOUR code is broken.
 *
 *   4. SPEED — Network round-trips add latency. Mock functions resolve
 *      instantly, keeping the test suite fast.
 *
 * THE KEY PRINCIPLE — DON'T TEST CODE YOU DIDN'T WRITE:
 *
 * The built-in fetch() function is provided by the browser. We trust the
 * browser vendors to implement it correctly — testing whether fetch
 * successfully sends an HTTP request is not our job. What IS our job is
 * testing how our component BEHAVES based on the response it receives.
 * Mocking lets us control that response and verify the component's
 * reaction to it.
 *
 * TWO APPROACHES TO AVOIDING REAL REQUESTS:
 *
 *   A. Replace the function with a mock (what we do here) — the request
 *      is never sent at all. We control the resolved value directly.
 *
 *   B. Send requests to a dedicated test server — a real request is sent,
 *      but to a safe, isolated environment. More realistic but slower and
 *      more complex to set up.
 *
 * HOW MOCKING WORKS:
 *
 * 1. Override window.fetch with jest.fn() — this creates a mock function
 *    that replaces the real fetch for the duration of the test.
 *
 * 2. Use .mockResolvedValueOnce() to define what the mock should return
 *    when called. This sets the value the promise resolves to — we
 *    structure it to mimic the real fetch Response object.
 *
 * 3. The component calls fetch() as usual, but now it receives our
 *    controlled response instead of making a network request.
 *
 * jest.fn() vs A PLAIN FUNCTION:
 *
 * You could override window.fetch with a regular function, but jest.fn()
 * adds extra capabilities: tracking how many times the function was called,
 * what arguments it received, setting different return values for successive
 * calls, and more. These features become valuable in more advanced tests.
 *
 * MIMICKING THE fetch() RESPONSE SHAPE:
 *
 * The real fetch() returns a Response object with a .json() method that
 * itself returns a promise. Our mock must replicate this structure:
 *
 *   { json: async () => [{ id: 'p1', title: 'First post' }] }
 *
 * The component's .then(response => response.json()) chain works
 * identically whether it receives a real Response or our mock — it just
 * calls .json() and awaits the result.
 *
 * ============================================================================
 */

import { render, screen } from '@testing-library/react';
import Async from './Async';

describe('Async component', () => {
  // Save the original fetch so we can restore it after each test. Without
  // this cleanup, the mocked fetch leaks open handles that prevent Jest's
  // worker process from exiting gracefully.
  const originalFetch = window.fetch;

  afterEach(() => {
    window.fetch = originalFetch;
  });

  test('renders posts if request succeeds', async () => {
    // ── ARRANGE ──

    // Override the browser's built-in fetch with a Jest mock function.
    // This prevents any real HTTP request from being sent. The mock lives
    // on the window object because calling fetch() in component code is
    // equivalent to calling window.fetch().
    window.fetch = jest.fn();

    // Define what the mock should return when called. mockResolvedValueOnce
    // sets the value the promise resolves to for the NEXT call to this mock.
    // We replicate the shape of a real fetch Response: an object with a
    // json() method that returns a promise resolving to our test data.
    // The async keyword on the json function ensures it returns a promise,
    // matching the behavior of the real Response.json().
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', title: 'First post' }],
    });

    render(<Async />);

    // ── ACT ──
    // No explicit action needed — useEffect fires the (now mocked) fetch
    // automatically after the initial render.

    // ── ASSERT ──
    // findAllByRole waits for list items to appear in the DOM. The mock
    // resolves instantly (no network delay), so this is much faster than
    // the real request was. The 'listitem' role matches <li> elements.
    const listItemElements = await screen.findAllByRole('listitem');

    // Verify at least one list item rendered. Since our mock returns an
    // array with one post, we expect exactly one <li>. Using
    // .not.toHaveLength(0) keeps the assertion flexible — it passes as
    // long as the array is non-empty.
    expect(listItemElements).not.toHaveLength(0);
  });
});
