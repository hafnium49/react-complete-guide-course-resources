/**
 * ============================================================================
 * APPLICATION ENTRY POINT WITH REDUX PROVIDER (Lesson 329)
 * ============================================================================
 *
 * PROVIDING THE STORE TO REACT (Lesson 329):
 * ==========================================
 * INSTRUCTOR QUOTE:
 * "With the store exported, we need to provide us to the application for it
 * to have an effect. And we can do this in the index JS file where we set up
 * our route component where we render our route application component."
 *
 * INSTRUCTOR QUOTE:
 * "There, we can import provider, the provider component from React Redux and
 * wrap that around app. So wrap provider around app like this, and provide
 * our store."
 *
 * WHY USE Provider?
 * =================
 * Provider is a React component from react-redux that makes the Redux store
 * available to any nested components that need to access Redux state or
 * dispatch actions.
 *
 * Without Provider:
 * - Components cannot use useSelector or useDispatch
 * - Redux state is not connected to React
 *
 * With Provider:
 * - All child components can access Redux via hooks
 * - State changes trigger re-renders automatically
 *
 * IMPORT STRUCTURE (Lesson 329):
 * ==============================
 * INSTRUCTOR QUOTE:
 * "Now for that of course we also need to import our store, so import store
 * from ./store/index. So from that index JS file and set the store prop of
 * provider equal to that imported store."
 *
 * INSTRUCTOR QUOTE:
 * "That's how we provide our Redux store to the entire application, so to all
 * components that make up our application."
 */
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * RENDERING WITH PROVIDER (Lesson 329):
 * =====================================
 * INSTRUCTOR QUOTE:
 * "Wrap provider around app like this, and provide our store."
 *
 * The Provider component:
 * - Wraps the entire application (App component)
 * - Receives the store via the store prop
 * - Uses React Context internally to make store accessible
 *
 * INSTRUCTOR QUOTE:
 * "And with that provided, we can now utilize Redux inside of these different
 * components."
 *
 * Now any component in the tree can:
 * - Use useSelector() to read from store
 * - Use useDispatch() to dispatch actions
 */
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
