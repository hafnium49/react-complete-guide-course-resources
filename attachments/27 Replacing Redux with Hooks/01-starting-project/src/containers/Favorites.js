/**
 * ============================================================================
 * src/containers/Favorites.js - LESSONS 554 & 556
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
 */

import React, { useContext } from 'react';

import FavoriteItem from '../components/Favorites/FavoriteItem';
import './Products.css';
// LESSON 556: Import the context object to replace the Redux useSelector hook.
// This is the same context that Products.js and ProductItem.js already consume.
import { ProductsContext } from '../context/products-context';

const Favorites = props => {
  // LESSON 556: useContext replaces useSelector. Instead of selecting from
  // state.shop.products, we read the products array from the context. The
  // .filter() call is identical — it derives the favorites subset by keeping
  // only products where isFavorite is true.
  const favoriteProducts = useContext(ProductsContext).products.filter(
    p => p.isFavorite
  );
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
