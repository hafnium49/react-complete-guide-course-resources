/**
 * ============================================================================
 * src/store/actions/products.js - LESSON 554
 * ============================================================================
 *
 * REDUX ACTION CREATOR AND ACTION TYPE:
 *
 * This file defines the single action used in this app: TOGGLE_FAV.
 *
 * The TOGGLE_FAV constant is the action type string. Exporting it as a
 * constant (rather than using a raw string) prevents typos — if you
 * misspell the import, you get a build error rather than a silent bug.
 *
 * The toggleFav action creator is a function that takes a product id
 * and returns a plain action object with type and productId. Components
 * call dispatch(toggleFav(id)) to trigger the favorite toggle in the
 * reducer.
 *
 * This file will be removed when Redux is replaced — the dispatching
 * mechanism will be handled by Context and hooks instead.
 *
 * ============================================================================
 */

// LESSON 554: Action type constant — shared between this file and the reducer.
export const TOGGLE_FAV = 'TOGGLE_FAV';

// LESSON 554: Action creator — returns a plain object describing what happened.
// The productId payload tells the reducer which product to toggle.
export const toggleFav = id => {
    return { type: TOGGLE_FAV, productId: id };
};