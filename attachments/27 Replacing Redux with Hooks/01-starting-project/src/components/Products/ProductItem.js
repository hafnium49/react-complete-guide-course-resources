/**
 * ============================================================================
 * src/components/Products/ProductItem.js - LESSONS 554, 555, 556, 561 & 563
 * ============================================================================
 *
 * PRODUCT ITEM — DISPATCHING ACTIONS TO THE REDUX STORE:
 *
 * This component renders a single product card with a "Favorite" /
 * "Un-Favorite" toggle button. It demonstrates the WRITE side of Redux:
 * while Products.js and Favorites.js READ from the store (useSelector),
 * this component WRITES to it by dispatching actions (useDispatch).
 *
 * useDispatch returns the store's dispatch function. When the user
 * clicks the favorite button, toggleFavHandler calls dispatch with
 * the toggleFav action creator, passing the product's id. This sends
 * the action to the reducer, which flips the isFavorite flag.
 *
 * The product data (id, title, description, isFav) arrives via props
 * from the parent Products page. Only the dispatch mechanism comes
 * from Redux — the component doesn't directly read store state.
 *
 * ============================================================================
 * LESSON 555: TEMPORARILY REMOVING REDUX DISPATCH
 * ============================================================================
 *
 * Since we've removed the Redux store from the app, we must also remove
 * the useDispatch and toggleFav imports from this component. Without a
 * Redux store, calling useDispatch would throw an error.
 *
 * The favorite button still renders but the toggle handler is temporarily
 * a no-op. The Context provider doesn't yet expose a function for
 * modifying the products list — that will be added in the next lesson.
 *
 * ============================================================================
 * LESSON 556: WIRING UP THE CONTEXT'S TOGGLE FUNCTION
 * ============================================================================
 *
 * The no-op handler is replaced with a real toggle function from the
 * Context. useContext(ProductsContext) provides the toggleFav function
 * that the ProductsProvider now exposes.
 *
 * The pattern mirrors how useDispatch + action creator worked in Redux,
 * but simplified: instead of dispatch(toggleFav(id)), we call
 * toggleFav(id) directly. The function lives in the context Provider
 * and handles the state update internally via setProductsList.
 *
 * ============================================================================
 * LESSON 561: DISPATCHING VIA THE CUSTOM HOOK STORE
 * ============================================================================
 *
 * useContext is replaced by useStore. This component only needs the
 * dispatch function (second element of the returned array), not the
 * state itself — product data still arrives via props from Products.js.
 *
 * dispatch('TOGGLE_FAV', props.id) looks up the TOGGLE_FAV action
 * function registered in products-store.js, calls it with the current
 * globalState and the product id as payload, merges the result into
 * globalState, and notifies all listeners to re-render.
 *
 * The string 'TOGGLE_FAV' must match the key used in the actions
 * object inside products-store.js's configureStore function.
 *
 * ============================================================================
 * LESSON 563: OPTIMIZING WITH shouldListen AND React.memo
 * ============================================================================
 *
 * Without optimization, every ProductItem re-renders whenever ANY
 * product's favorite status changes — even items whose props haven't
 * changed. This happens because useStore() registers a listener by
 * default, and dispatch notifies ALL listeners.
 *
 * Two changes fix this:
 *
 *   1. useStore(false): Passing false for the shouldListen parameter
 *      tells the hook NOT to register this component as a listener.
 *      The component can still dispatch actions, but it won't be
 *      notified of state changes — it doesn't need to be, because
 *      its display data comes from props, not from the store.
 *
 *   2. React.memo: Wrapping the component in React.memo prevents
 *      re-renders when props haven't changed. Since Products.js
 *      (the parent) re-renders on store changes and passes fresh
 *      props to each ProductItem, only the item whose isFav prop
 *      actually changed will re-render. The other items receive
 *      the same props and are skipped by memo's shallow comparison.
 *
 * Together, these reduce re-renders from N (all items) to 1 (only
 * the toggled item) when a single favorite is changed.
 *
 * ============================================================================
 */

import React from 'react';

import Card from '../UI/Card';
import './ProductItem.css';
// LESSON 561: Import the custom hook from the generic store module.
// This replaces useContext + ProductsContext from the Context approach.
import useStore from '../../hooks-store/store';

// LESSON 563: React.memo wraps the component to skip re-renders when props
// haven't changed. Combined with useStore(false), this ensures only the
// single item whose isFav prop changed re-renders — not the entire list.
const ProductItem = React.memo(props => {
  // LESSON 561: useStore() returns [globalState, dispatch]. We only need
  // dispatch here (to trigger the TOGGLE_FAV action), so we skip the first
  // element with a comma and destructure just the second.
  // LESSON 563: Passing false opts out of listener registration. This
  // component doesn't read from the store — it only dispatches — so there
  // is no reason to re-render when globalState changes.
  const [, dispatch] = useStore(false);

  // LESSON 561: dispatch takes two arguments: the action identifier string
  // (matching a key in the actions map from products-store.js) and the
  // payload (the product id). This replaces the Context's toggleFav(props.id)
  // and Redux's dispatch(toggleFav(props.id)).
  const toggleFavHandler = () => {
    dispatch('TOGGLE_FAV', props.id);
  };

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className="product-item">
        <h2 className={props.isFav ? 'is-fav' : ''}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? 'button-outline' : ''}
          onClick={toggleFavHandler}
        >
          {props.isFav ? 'Un-Favorite' : 'Favorite'}
        </button>
      </div>
    </Card>
  );
});

export default ProductItem;
