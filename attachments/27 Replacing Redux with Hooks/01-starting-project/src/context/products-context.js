/**
 * ============================================================================
 * src/context/products-context.js - LESSONS 555 & 556
 * ============================================================================
 *
 * APPROACH 1: REPLACING REDUX WITH THE CONTEXT API
 *
 * This file creates a React Context that serves the same purpose as the
 * Redux store — providing application-wide state to any component that
 * needs it, without prop drilling.
 *
 * TWO EXPORTS FROM THIS FILE:
 *
 *   1. ProductsContext (named export): The context object created by
 *      React.createContext(). Components use this with useContext() to
 *      READ the current context value (the products list).
 *
 *   2. ProductsProvider (default export): A wrapper component that:
 *      - Manages the products array as local state via useState
 *      - Wraps its children in <ProductsContext.Provider>
 *      - Passes the products state as the context value
 *
 * HOW THIS REPLACES REDUX:
 *
 *   Redux:   createStore(reducer) → <Provider store={store}>
 *   Context: useState(initialData) → <ProductsContext.Provider value={...}>
 *
 *   Redux:   useSelector(state => state.shop.products)
 *   Context: useContext(ProductsContext).products
 *
 * The product data (id, title, description, isFavorite) that was
 * previously hardcoded in the Redux reducer's initialState is now
 * managed directly in this component's useState.
 *
 * WHY A WRAPPER COMPONENT:
 *
 * Rather than exporting just the context object and having consumers
 * set up the Provider themselves, we export a ready-to-use component
 * (ProductsProvider) that encapsulates the state logic. This keeps the
 * state management in one place and makes the Provider easy to drop
 * into index.js — just like Redux's <Provider> was.
 *
 * WHY useState FOR THE PRODUCTS LIST:
 *
 * The products array needs to be reactive — when a product's favorite
 * status changes, all consuming components must re-render. useState
 * gives us exactly this: updating the state via setProductsList triggers
 * a re-render of ProductsProvider, which passes a new value to the
 * context Provider, which in turn re-renders all consumers.
 *
 * CONTEXT VALUE SHAPE:
 *
 * The value passed to the Provider is an object { products: productsList }
 * rather than the raw array. This allows adding more fields to the context
 * later (e.g., a toggleFavorite function) without changing every consumer.
 *
 * ============================================================================
 * LESSON 556: ADDING TOGGLE FAVORITE TO THE CONTEXT
 * ============================================================================
 *
 * The context now provides WRITE access in addition to READ access. A
 * toggleFavorite function is defined inside the Provider and passed as
 * part of the context value object under the key "toggleFav".
 *
 * This mirrors what the Redux reducer's TOGGLE_FAV case did: find the
 * product by id, flip its isFavorite boolean, and return a new array
 * (immutable update). The key difference is that instead of dispatching
 * an action to a reducer, consuming components call the function directly
 * from the context.
 *
 * The toggleFavorite function uses the FUNCTION FORM of setProductsList
 * (prevState => newState) rather than passing a new value directly. This
 * ensures we always operate on the most up-to-date state, which matters
 * when multiple rapid toggles could overlap.
 *
 * The default value in createContext also gets a dummy toggleFav function
 * with an id parameter. This serves IDE autocompletion — editors can see
 * the expected shape and parameter names without needing the Provider.
 *
 * ============================================================================
 */

import React, { useState } from 'react';

// LESSON 555: Create the context object with a default shape. The default
// value is only used if a component reads the context without a Provider
// ancestor — mainly useful for IDE autocompletion and type hints.
// LESSON 556: toggleFav added to the default so IDEs can autocomplete the
// function signature. The id parameter documents what the real function expects.
export const ProductsContext = React.createContext({
  products: [],
  toggleFav: id => {}
});

// LESSON 555: The Provider component manages the products state and makes it
// available to the entire component tree via context. This replaces Redux's
// createStore + <Provider store={store}>.
const ProductsProvider = props => {
  // LESSON 555: The same product data that was in the Redux reducer's
  // initialState is now managed here with useState. The state is the single
  // source of truth for products — updating it re-renders all consumers.
  const [productsList, setProductsList] = useState([
    {
      id: 'p1',
      title: 'Red Scarf',
      description: 'A pretty red scarf.',
      isFavorite: false
    },
    {
      id: 'p2',
      title: 'Blue T-Shirt',
      description: 'A pretty blue t-shirt.',
      isFavorite: false
    },
    {
      id: 'p3',
      title: 'Green Trousers',
      description: 'A pair of lightly green trousers.',
      isFavorite: false
    },
    {
      id: 'p4',
      title: 'Orange Hat',
      description: 'Street style! An orange hat.',
      isFavorite: false
    }
  ]);

  // LESSON 556: This function replicates the logic from the old Redux reducer's
  // TOGGLE_FAV case. It finds the product by id, flips its isFavorite flag, and
  // returns a brand-new array — the same immutable update pattern Redux required.
  const toggleFavorite = productId => {
    // LESSON 556: The function form of setState (prevProducts => ...) guarantees
    // we work with the latest state. If we used productsList directly, rapid
    // toggles could read stale state and produce incorrect results.
    setProductsList(prevProducts => {
      const prodIndex = prevProducts.findIndex(p => p.id === productId);
      // LESSON 556: Create a shallow copy of the array, then replace the target
      // product with a new object that has the flipped isFavorite value. This
      // immutable update ensures React detects the change and re-renders consumers.
      const newFavStatus = !prevProducts[prodIndex].isFavorite;
      const updatedProducts = [...prevProducts];
      updatedProducts[prodIndex] = {
        ...prevProducts[prodIndex],
        isFavorite: newFavStatus
      };
      return updatedProducts;
    });
  };

  return (
    // LESSON 556: The value now includes both the products array for reading
    // and the toggleFav function for writing. Any consuming component can call
    // toggleFav(productId) to flip a product's favorite status — replacing
    // the Redux pattern of dispatch(toggleFav(id)).
    <ProductsContext.Provider
      value={{ products: productsList, toggleFav: toggleFavorite }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
