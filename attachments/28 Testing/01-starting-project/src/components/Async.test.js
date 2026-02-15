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
 * This test currently sends a REAL HTTP request to JSONPlaceholder every
 * time it runs. This is problematic for several reasons — network
 * dependency, test speed, and side effects. The next lesson introduces
 * mocking to solve this.
 *
 * ============================================================================
 */

import { render, screen } from '@testing-library/react';
import Async from './Async';

describe('Async component', () => {
  // This test verifies that list items appear after the fetch completes.
  // The async keyword allows us to use await inside the test body. Jest
  // treats the returned promise as the test lifecycle — the test does not
  // finish until the promise resolves (or rejects, causing a failure).
  test('renders posts if request succeeds', async () => {
    // ── ARRANGE ──
    render(<Async />);

    // ── ACT ──
    // No explicit action needed. Rendering the component triggers useEffect,
    // which fires the fetch automatically. The act of fetching IS the action.

    // ── ASSERT ──
    // findAllByRole returns a promise that resolves once one or more elements
    // with the 'listitem' role appear in the DOM. The 'listitem' role
    // corresponds to <li> elements. By awaiting this promise, we let React
    // Testing Library retry the query until the fetch completes and the
    // component re-renders with the post data.
    const listItemElements = await screen.findAllByRole('listitem');

    // Verify that the array of list items is not empty. If the fetch failed
    // or the component did not render the posts, this array would have a
    // length of 0. The .not.toHaveLength(0) assertion confirms at least one
    // post was rendered.
    expect(listItemElements).not.toHaveLength(0);
  });
});
