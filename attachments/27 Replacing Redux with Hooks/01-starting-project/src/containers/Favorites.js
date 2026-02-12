/**
 * ============================================================================
 * src/containers/Favorites.js - LESSONS 554, 556 & 561
 * ============================================================================
 *
 * FAVORITES PAGE — DERIVED DATA FROM THE REDUX STORE:
 *
 * This page displays only the products marked as favorites. It uses
 * useSelector with a selector that FILTERS the products array inline,
 * returning only items where isFavorite is true.
 *
 * This is an example of deriving data from the store: the store holds
 * ALL products, and this component computes the favorites subset on
 * each render. There is no separate "favorites" array in the store —
 * the favorite status is a property of each product, and the filtering
 * happens at the point of consumption.
 *
 * This demonstrates why Redux (and later, Context) needs to be shared
 * across pages: the same product data with the same favorite statuses
 * must be accessible from both the Products page and this Favorites
 * page. Without global state, keeping them in sync would require
 * lifting state up to a common ancestor and passing it through props.
 *
 * ============================================================================
 * LESSON 556: REPLACING useSelector WITH useContext
 * ============================================================================
 *
 * The final Redux consumer is migrated to Context. useSelector and the
 * react-redux import are removed, replaced by useContext reading from
 * ProductsContext.
 *
 * The filtering logic remains the same — .filter(p => p.isFavorite) —
 * but instead of selecting from state.shop.products, we read from
 * the context's products property. The context provides the same
 * products array that the Redux store used to hold.
 *
 * With this change, every component that previously depended on Redux
 * now uses the Context API instead. The react-redux package is no
 * longer imported anywhere in the project.
 *
 * ============================================================================
 * LESSON 561: REPLACING useContext WITH THE CUSTOM HOOK STORE
 * ============================================================================
 *
 * useContext + ProductsContext is replaced by useStore(). The state
 * object returned by useStore contains the same products array, now
 * at state.products (the key registered in products-store.js).
 *
 * The filtering logic is unchanged — .filter(p => p.isFavorite) still
 * derives the favorites subset from the full products array. The only
 * difference is the source: useStore's globalState instead of the
 * Context's value object.
 *
 * With this change, all three consumer components (Products, ProductItem,
 * Favorites) now use the custom hook store. Neither Redux nor the
 * Context API is imported by any component anymore.
 *
 * ============================================================================
 */

import React from 'react';

import FavoriteItem from '../components/Favorites/FavoriteItem';
import './Products.css';
// LESSON 561: Import the custom hook from the generic store module.
// This replaces useContext + ProductsContext from the Context approach.
import useStore from '../hooks-store/store';

const Favorites = props => {
  // LESSON 561: useStore() returns [globalState, dispatch]. We only need
  // state here. state.products is the shared array, and .filter() derives
  // the favorites subset — the same filtering logic used in every previous
  // approach (Redux selector, Context consumer).
  const [state] = useStore();
  const favoriteProducts = state.products.filter(p => p.isFavorite);

  let content = <p className="placeholder">Got no favorites yet!</p>;
  if (favoriteProducts.length > 0) {
    content = (
      <ul className="products-list">
        {favoriteProducts.map(prod => (
          <FavoriteItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            description={prod.description}
          />
        ))}
      </ul>
    );
  }
  return content;
};

export default Favorites;
