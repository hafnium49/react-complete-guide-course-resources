/**
 * ============================================================================
 * src/containers/Products.js - LESSON 554
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
 */

import React from 'react';
// LESSON 554: useSelector reads from the Redux store. It will be replaced
// by useContext or a custom hook when we migrate away from Redux.
import { useSelector } from 'react-redux';

import ProductItem from '../components/Products/ProductItem';
import './Products.css';

const Products = props => {
  // LESSON 554: Selects the full products array from the "shop" slice.
  // state.shop is the key defined in combineReducers in index.js.
  const productList = useSelector(state => state.shop.products);
  return (
    <ul className="products-list">
      {productList.map(prod => (
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
