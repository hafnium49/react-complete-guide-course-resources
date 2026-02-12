/**
 * ============================================================================
 * src/containers/Products.js - LESSONS 554, 555 & 561
 * ============================================================================
 *
 * PRODUCTS PAGE — READING FROM THE REDUX STORE:
 *
 * This page component displays ALL products from the Redux store.
 *
 * useSelector is a React-Redux hook that extracts data from the Redux
 * store. The selector function receives the entire store state and
 * returns the specific slice needed — here, state.shop.products.
 *
 * The "shop" key comes from combineReducers in index.js, where the
 * product reducer was registered under that name. So state.shop gives
 * us everything the product reducer manages, and .products is the
 * array of product objects within that reducer's state.
 *
 * When the store updates (e.g., a product's isFavorite changes),
 * useSelector automatically re-renders this component with the new
 * data. No manual subscription management needed.
 *
 * This useSelector call will be replaced by a Context-based approach
 * when Redux is removed.
 *
 * ============================================================================
 * LESSON 555: READING FROM CONTEXT INSTEAD OF REDUX
 * ============================================================================
 *
 * useSelector is replaced by useContext. Instead of selecting from a
 * Redux store via state.shop.products, we now read from the
 * ProductsContext object, accessing its products property.
 *
 * The useContext hook subscribes this component to the context: whenever
 * the ProductsProvider updates its state (and therefore the context
 * value), this component automatically re-renders — the same behavior
 * useSelector provided with Redux.
 *
 * ============================================================================
 * LESSON 561: READING FROM THE CUSTOM HOOK STORE
 * ============================================================================
 *
 * useContext is replaced by the custom useStore hook. useStore() returns
 * [globalState, dispatch]. This component only needs to READ state, so
 * we destructure just the first element.
 *
 * The products array lives at state.products because that's the key
 * used in products-store.js when calling initStore with the initial
 * state object { products: [...] }.
 *
 * Unlike Context (which re-renders ALL consumers on ANY value change),
 * this custom store re-renders consumers by explicitly calling each
 * registered setState — which is functionally similar but avoids the
 * Context API's structural limitations.
 *
 * ============================================================================
 */

import React from 'react';

import ProductItem from '../components/Products/ProductItem';
import './Products.css';
// LESSON 561: Import the custom hook from the generic store module.
// useStore provides access to the shared globalState and dispatch function.
import useStore from '../hooks-store/store';

const Products = props => {
  // LESSON 561: useStore() returns [globalState, dispatch]. We only need the
  // state here (no dispatching), so we extract just the first element.
  // state.products is the array seeded by configureStore in products-store.js.
  const [state] = useStore();
  return (
    <ul className="products-list">
      {state.products.map(prod => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
