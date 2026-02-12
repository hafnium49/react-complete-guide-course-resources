/**
 * ============================================================================
 * src/App.js - LESSON 564 (BONUS: MULTIPLE STATE SLICES)
 * ============================================================================
 *
 * APP LAYOUT — INTEGRATING THE COUNTER COMPONENT:
 *
 * The Counter component is rendered OUTSIDE of any Route, so it appears on
 * every page (both the Products list and the Favorites list). This visually
 * demonstrates that two independent state slices (products and counter) can
 * coexist and update independently.
 *
 * Toggling a product's favorite status does not affect the counter value,
 * and incrementing/decrementing the counter does not affect any product.
 * However, both slices live in the SAME globalState object and both are
 * managed by the SAME useStore hook — they are independent at the data
 * level but unified at the infrastructure level.
 *
 * CROSS-SLICE RE-RENDERS:
 *
 * One caveat: because dispatch notifies ALL registered listeners (every
 * component that called useStore(true)), a counter action causes products-
 * related components to re-render too, and vice versa. React.memo on
 * ProductItem (with shouldListen=false) mitigates this for the product
 * list, but the Counter component will re-render on every dispatch. For
 * a small app this is negligible; for larger apps, more selective listener
 * mechanisms (like Redux's useSelector with equality checks) would be
 * needed.
 *
 * ============================================================================
 */

import React from 'react';
import { Route } from 'react-router-dom';

import Navigation from './components/Nav/Navigation';
import ProductsPage from './containers/Products';
import FavoritesPage from './containers/Favorites';
// The Counter component consumes the counter slice of the global store.
// It is rendered on every page to prove that multiple slices work side by side.
import Counter from './containers/Counter';

const App = props => {
  return (
    <React.Fragment>
      <Navigation />
      <main>
        {/* Routed pages — each accesses the products slice of the store */}
        <Route path="/" component={ProductsPage} exact />
        <Route path="/favorites" component={FavoritesPage} />
        {/* Counter is always visible — it accesses the counter slice */}
        <Counter />
      </main>
    </React.Fragment>
  );
};

export default App;
