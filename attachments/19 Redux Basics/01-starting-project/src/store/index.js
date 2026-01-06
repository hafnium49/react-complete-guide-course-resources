/**
 * ============================================================================
 * REDUX STORE CONFIGURATION (Lesson 311)
 * ============================================================================
 *
 * This file contains the Redux store setup for our React application.
 *
 * LESSON 311 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Creating a store folder in src (common convention)
 * 2. Setting up index.js for Redux logic
 * 3. Importing createStore from Redux
 * 4. Creating a reducer function with default state
 * 5. Handling different action types (INCREMENT, DECREMENT)
 * 6. Creating the Redux store
 * 7. Exporting the store for use in React components
 *
 * LESSON 316 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Understanding why actions need more than just a type
 * 2. Adding extra data (payload) to action objects
 * 3. Extracting payload data in the reducer (e.g., action.amount)
 * 4. Matching property names between dispatch and reducer
 * 5. Flexibility in naming payload properties
 *
 * WHY CREATE A STORE FOLDER? (Lesson 311)
 * ========================================
 * INSTRUCTOR QUOTE:
 * "I will create a new folder in the source folder and I'll name it, store.
 * This is not something you have to do. It's just a common convention.
 * To store your Redux related code files, in a store folder, in the source folder."
 *
 * FILE NAMING:
 * ============
 * INSTRUCTOR QUOTE:
 * "And then they are all, just create an index.js file. This file name is also
 * up to you, into which I'll put my Redux-logic here."
 *
 * The index.js name is convenient because it allows importing from the folder
 * directly: import store from './store' (instead of './store/index')
 */

import { createStore } from 'redux';

/**
 * IMPORTING FROM REDUX (Lesson 311)
 * ==================================
 * INSTRUCTOR QUOTE:
 * "We wanna create a new store. And for that, we need to import something from Redux.
 * Now, since we're back in React, our import statements again, look like this now.
 * And here we can import Redux from Redux, or we can also pull out specific things
 * from the Redux library, with this import syntax. And we can then, for example,
 * import the createStore function."
 *
 * Two ways to import from Redux:
 * 1. import Redux from 'redux'; // Then use Redux.createStore()
 * 2. import { createStore } from 'redux'; // Destructured import (cleaner)
 *
 * We use the destructured import syntax to pull out just what we need.
 */

/**
 * COUNTER REDUCER FUNCTION (Lesson 311)
 * =====================================
 * The reducer is a pure function that takes the current state and an action,
 * and returns a new state based on that action.
 *
 * INSTRUCTOR QUOTE:
 * "And that then is a function, which gets the existing state as a first argument.
 * And then the action it wants dispatched, as a second argument."
 *
 * REDUCER RULES:
 * ==============
 * 1. Must be a pure function (same inputs = same outputs)
 * 2. Should not mutate the existing state
 * 3. Should return a new state object
 * 4. Must handle the initial state (via default parameter)
 *
 * DEFAULT STATE (Lesson 311):
 * ===========================
 * INSTRUCTOR QUOTE:
 * "Now, we can give this state a default value, so that when the reducer is
 * executed for the first time, we have an initial state. And here I'll stick
 * to the exact same state we used before. Counter set to zero, in an object."
 *
 * The default value { counter: 0 } is used when:
 * - The store is first created
 * - Redux calls the reducer with undefined state to get initial state
 *
 * @param {Object} state - The current state (defaults to { counter: 0 })
 * @param {Object} action - The dispatched action with a 'type' property
 * @returns {Object} - The new state after applying the action
 */
const counterReducer = (state = { counter: 0 }, action) => {
  /**
   * HANDLING DIFFERENT ACTIONS (Lesson 311)
   * =======================================
   * INSTRUCTOR QUOTE:
   * "And in the function body of the counterReducer function, we now wanna
   * handle different actions, increment and decrement and then return
   * different state snapshots."
   *
   * Each action type results in a different state transformation:
   * - 'increment': Increase counter by 1
   * - 'decrement': Decrease counter by 1
   * - Unknown actions: Return unchanged state
   */

  /**
   * INCREMENT ACTION
   * ================
   * INSTRUCTOR QUOTE:
   * "So here we can check, if action.type is equal to increment, in which case
   * I wanna return a new object, where the counter is set equal to state counter
   * plus one."
   *
   * IMPORTANT: We return a NEW object, not modify the existing state!
   * This is crucial for Redux to detect state changes.
   */
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }

  /**
   * DECREMENT ACTION
   * ================
   * INSTRUCTOR QUOTE:
   * "Else, I check if action.type is equal to decrement. In which case I wanna
   * return an object, where the counter is set to state.counter minus one."
   */
  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
    };
  }

  /**
   * =========================================================================
   * INCREASE ACTION WITH PAYLOAD (Lesson 316)
   * =========================================================================
   *
   * WHY PAYLOADS ARE NEEDED (Lesson 316):
   * =====================================
   * INSTRUCTOR QUOTE:
   * "Now, when building more realistic applications, oftentimes, you have
   * actions where just the type is not enough. Where the action, which we
   * dispatch and which reaches the Reducer often needs to carry extra data."
   *
   * SIMPLE ACTIONS VS ACTIONS WITH PAYLOADS:
   * ========================================
   * - Simple action: { type: 'increment' }
   *   → Reducer knows exactly what to do (add 1)
   *
   * - Action with payload: { type: 'increase', amount: 10 }
   *   → Reducer uses the extra 'amount' data to determine the increment
   *
   * INSTRUCTOR QUOTE:
   * "And in the reducer function we then wanna add, not always one, but instead
   * we wanna use a value provided by the action. So to add some value which is
   * attached to that increase action."
   *
   * EXTRACTING PAYLOAD DATA (Lesson 316):
   * =====================================
   * INSTRUCTOR QUOTE:
   * "We could then simply access action.amount here. Because the action is an
   * object and if that object has an amount property set on it, we can read
   * that value with action.amount."
   *
   * IMPORTANT: The property name used when DISPATCHING (e.g., 'amount')
   * MUST match the property name used when READING in the reducer (action.amount).
   *
   * INSTRUCTOR QUOTE:
   * "Of course, we do have to make sure though, that we use the amount property
   * name here, because that's the name, the property name I'm gonna use when
   * dispatching this action."
   *
   * PAYLOAD PROPERTY NAMING FLEXIBILITY (Lesson 316):
   * ================================================
   * INSTRUCTOR QUOTE:
   * "And I could use any identifier here. I could name this value or number
   * or anything like that. But I'll go with amount because that's most
   * descriptive in my opinion."
   *
   * Common payload property names:
   * - amount: for numeric values
   * - payload: generic convention in Redux
   * - value, data, item: other common choices
   *
   * The key is CONSISTENCY between dispatch and reducer!
   */
  if (action.type === 'increase') {
    return {
      counter: state.counter + action.amount,
    };
  }

  /**
   * DEFAULT CASE - RETURN UNCHANGED STATE
   * =====================================
   * INSTRUCTOR QUOTE:
   * "Or, if we make it into neither of these if statements, I'll return the
   * unchanged state. So the state, which I get here, I returned that without
   * any changes in that case."
   *
   * This is important because:
   * 1. Redux dispatches an internal initialization action
   * 2. Other parts of the app might dispatch actions we don't handle
   * 3. We should always return a valid state
   */
  return state;
};

/**
 * CREATING THE REDUX STORE (Lesson 311)
 * =====================================
 * INSTRUCTOR QUOTE:
 * "Now you did learn that createStore wants a pointer at a Reducer function
 * as a parameter."
 *
 * "So now, we can use this counterReducer function and point at that function
 * here, in our store. When we call createStore, this now creates our Redux store."
 *
 * The store is the central hub that:
 * - Holds the application state
 * - Allows access to state via getState()
 * - Allows state updates via dispatch(action)
 * - Registers listeners via subscribe(listener)
 *
 * NOTE: createStore is technically deprecated in favor of Redux Toolkit's
 * configureStore, but it still works and is useful for learning core concepts.
 */
const store = createStore(counterReducer);

/**
 * WHY NOT SUBSCRIBE HERE? (Lesson 311)
 * ====================================
 * INSTRUCTOR QUOTE:
 * "Now previously, we did now subscribe here and dispatch from inside this file
 * and that's now not what we wanna do here. Instead now, I wanna connect my
 * React app to this Redux store. So that the components of that app can
 * dispatch and listen. And that's the new part."
 *
 * In a React app:
 * - We DON'T manually subscribe in this file
 * - We DON'T dispatch from this file
 * - Instead, React components will connect to the store
 * - react-redux library handles subscriptions automatically
 */

/**
 * EXPORTING THE STORE (Lesson 311)
 * ================================
 * INSTRUCTOR QUOTE:
 * "For this, I'll start by exporting this store, which we created here, as the
 * default export of this file, so that we can use it outside of this index.js file."
 *
 * We export the store so it can be:
 * 1. Provided to the React app (via Provider component)
 * 2. Used by any component that needs access to Redux state
 *
 * NEXT STEP - PROVIDING THE STORE (Lesson 311):
 * =============================================
 * INSTRUCTOR QUOTE:
 * "And now I want to connect my React application to that store. For this, we
 * need to provide this store to the React app. And since, remember, we only
 * have one Redux store, we only need to provide our store once, the only store
 * we have."
 *
 * This will be done in the main index.js file using the Provider component
 * from react-redux (covered in the next lesson).
 */
export default store;

/**
 * ============================================================================
 * SUMMARY - LESSON 311 WORKFLOW
 * ============================================================================
 *
 * 1. CREATE STORE FOLDER:
 *    - Create src/store/ folder (convention, not required)
 *    - Create index.js inside it
 *
 * 2. IMPORT createStore:
 *    import { createStore } from 'redux';
 *
 * 3. CREATE REDUCER:
 *    - Define function with (state, action) parameters
 *    - Set default state value: state = { counter: 0 }
 *    - Handle action types with if/else or switch
 *    - Return new state objects (never mutate!)
 *    - Return unchanged state for unknown actions
 *
 * 4. CREATE STORE:
 *    const store = createStore(counterReducer);
 *
 * 5. EXPORT STORE:
 *    export default store;
 *
 * KEY DIFFERENCES FROM VANILLA REDUX:
 * ===================================
 * | Vanilla Redux (Node.js)     | Redux with React              |
 * |-----------------------------|-------------------------------|
 * | store.subscribe(fn)         | react-redux handles this      |
 * | store.dispatch(action)      | useDispatch() hook            |
 * | store.getState()            | useSelector() hook            |
 * | Manual subscription mgmt    | Automatic via Provider        |
 *
 * NEXT STEPS (Upcoming Lessons):
 * ==============================
 * - Provide the store to React app using <Provider>
 * - Use useSelector() to read state in components
 * - Use useDispatch() to dispatch actions from components
 *
 * ============================================================================
 * LESSON 316 - ACTION PAYLOADS IN THE REDUCER
 * ============================================================================
 *
 * WHY PAYLOADS ARE NEEDED:
 * ========================
 * - Simple actions with only 'type' are inflexible
 * - Payloads allow passing dynamic values to the reducer
 * - One action type can handle many different scenarios
 *
 * EXAMPLE: INCREMENT VS INCREASE
 * ==============================
 *
 * INCREMENT (no payload):
 * ----------------------
 * Action:  { type: 'increment' }
 * Reducer: return { counter: state.counter + 1 }  // Always +1
 *
 * INCREASE (with payload):
 * -----------------------
 * Action:  { type: 'increase', amount: 10 }
 * Reducer: return { counter: state.counter + action.amount }  // Flexible!
 *
 * ACCESSING PAYLOAD IN REDUCER:
 * ============================
 * The action parameter contains all properties from the dispatched object:
 *
 * // When dispatched:   dispatch({ type: 'increase', amount: 10 })
 * // In reducer:        action.type === 'increase'
 * //                    action.amount === 10
 *
 * INSTRUCTOR QUOTE:
 * "We could then simply access action.amount here. Because the action is an
 * object and if that object has an amount property set on it, we can read
 * that value with action.amount."
 *
 * PAYLOAD NAMING CONVENTIONS:
 * ==========================
 * The property name is YOUR choice. Common conventions:
 *
 * 1. Descriptive names (recommended for clarity):
 *    { type: 'increase', amount: 10 }
 *    { type: 'addUser', user: { name: 'John' } }
 *    { type: 'setFilter', filterValue: 'active' }
 *
 * 2. Generic 'payload' property (Redux Toolkit convention):
 *    { type: 'increase', payload: 10 }
 *    { type: 'addUser', payload: { name: 'John' } }
 *
 * IMPORTANT: Whatever name you choose, it MUST match between:
 * - The dispatched action: dispatch({ type: 'x', amount: 10 })
 * - The reducer access: action.amount
 */
