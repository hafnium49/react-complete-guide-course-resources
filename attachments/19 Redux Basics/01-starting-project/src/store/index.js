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
 * LESSON 317 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Working with multiple state properties in Redux
 * 2. Extracting initial state into a constant for readability
 * 3. CRITICAL: Redux REPLACES state, it does NOT merge changes
 * 4. Must include ALL state properties in every return statement
 * 5. Adding new state properties (showCounter)
 * 6. Adding new action types (toggle)
 * 7. Using multiple useSelector calls in components
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
 * ============================================================================
 * INITIAL STATE CONSTANT (Lesson 317)
 * ============================================================================
 *
 * EXTRACTING INITIAL STATE FOR READABILITY (Lesson 317):
 * ======================================================
 * INSTRUCTOR QUOTE:
 * "And to keep this a bit more readable, I'll extract that and store that in
 * a constant named initialState like this and assign initialState here then
 * just to make this a bit easier to read."
 *
 * Why extract initial state?
 * - Cleaner reducer function signature
 * - Easier to see all initial values at a glance
 * - Can be reused if needed (e.g., for reset functionality)
 * - Better organization as state grows more complex
 *
 * ADDING showCounter (Lesson 317):
 * ================================
 * INSTRUCTOR QUOTE:
 * "When we start besides having a counter which has a value of zero, I wanna
 * have a showCounter field which has a value of true or false, that's up to you."
 *
 * This demonstrates managing MULTIPLE pieces of state in Redux:
 * - counter: The numeric value being counted
 * - showCounter: Whether to display the counter (boolean)
 */
const initialState = {
  counter: 0,
  showCounter: true,
};

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
 * @param {Object} state - The current state (defaults to initialState)
 * @param {Object} action - The dispatched action with a 'type' property
 * @returns {Object} - The new state after applying the action
 */
const counterReducer = (state = initialState, action) => {
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
   *
   * =========================================================================
   * CRITICAL: REDUX REPLACES STATE, IT DOESN'T MERGE! (Lesson 317)
   * =========================================================================
   *
   * INSTRUCTOR QUOTE:
   * "We still need to set the showCounter property here though because we are
   * returning the overall state object and Redux won't merge your changes with
   * the existing state. It instead takes what you return and replaces the
   * existing state with it."
   *
   * WHY WE MUST INCLUDE showCounter (Lesson 317):
   * =============================================
   * INSTRUCTOR QUOTE:
   * "Now when we increment, we are changing the counter, we don't care about
   * showCounter. We still need to set the showCounter property here though."
   *
   * If we only returned { counter: state.counter + 1 }, the showCounter
   * property would be LOST! The entire state would become just { counter: X }
   * with no showCounter property at all.
   *
   * PRESERVING UNCHANGED VALUES (Lesson 317):
   * =========================================
   * INSTRUCTOR QUOTE:
   * "So for increment, we don't wanna change it, so we will just take the
   * existing showCounter value."
   *
   * Pattern: For properties you don't want to change, copy their current value:
   *   showCounter: state.showCounter
   */
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter, // MUST include! Redux replaces, doesn't merge
    };
  }

  /**
   * DECREMENT ACTION
   * ================
   * INSTRUCTOR QUOTE:
   * "Else, I check if action.type is equal to decrement. In which case I wanna
   * return an object, where the counter is set to state.counter minus one."
   *
   * PRESERVING showCounter (Lesson 317):
   * ====================================
   * INSTRUCTOR QUOTE:
   * "And then we can do the same here... for decrement here."
   *
   * Same pattern as increment - we must include showCounter even though
   * we're not changing it, because Redux replaces the entire state.
   */
  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter, // Preserve existing value
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
  /**
   * PRESERVING showCounter IN INCREASE (Lesson 317):
   * ================================================
   * INSTRUCTOR QUOTE:
   * "And we can do the same here for increase because there we also wanna
   * keep the existing showCounter value."
   */
  if (action.type === 'increase') {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter, // Preserve existing value
    };
  }

  /**
   * =========================================================================
   * TOGGLE ACTION - WORKING WITH MULTIPLE STATE PROPERTIES (Lesson 317)
   * =========================================================================
   *
   * WHY ADD TOGGLE? (Lesson 317):
   * ============================
   * INSTRUCTOR QUOTE:
   * "So when we click this button, the toggleCounterHandler is fired. And then
   * here we wanna dispatch an action which changes some state in Redux which
   * controls whether this counter div is shown or not."
   *
   * ADDING NEW STATE (Lesson 317):
   * =============================
   * INSTRUCTOR QUOTE:
   * "For this, we need to add a new state, a new piece of data to our Redux store.
   * And how do we now do that? Well, to add a new piece of data, we need to go
   * to our reducer in the end and just add it to all these state snapshots
   * which we are producing."
   *
   * ACTION IDENTIFIER CHOICE (Lesson 317):
   * =====================================
   * INSTRUCTOR QUOTE:
   * "But now I will also handle a new action type... I will check for, let's
   * say toggle. Now the identifier just like all these identifiers is up to you.
   * I'll go with toggle."
   *
   * INVERTING BOOLEAN VALUES (Lesson 317):
   * =====================================
   * INSTRUCTOR QUOTE:
   * "Here, we now wanna change showCounter and set it to the opposite of what
   * it was before. If it was true, we wanna set it to false, if it was false,
   * we wanna set it to true. And we can do this by simply adding an exclamation
   * mark and then accessing state.showCounter. This will invert the value."
   *
   * The ! (NOT) operator inverts booleans:
   * - !true  === false
   * - !false === true
   *
   * PRESERVING counter (Lesson 317):
   * ================================
   * INSTRUCTOR QUOTE:
   * "Now for the counter itself, we wanna keep the existing state because we
   * don't wanna change this here for this action. So we just set counter to
   * state.counter."
   */
  if (action.type === 'toggle') {
    return {
      showCounter: !state.showCounter, // Invert the boolean
      counter: state.counter, // Preserve counter value
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
 *
 * ============================================================================
 * LESSON 317 - WORKING WITH MULTIPLE STATE PROPERTIES
 * ============================================================================
 *
 * LOCAL STATE VS GLOBAL STATE (Lesson 317):
 * =========================================
 * INSTRUCTOR QUOTE:
 * "Now for this, of course, we could use useState. So we could set up some
 * local state in this component which we manage with useState, not with Redux.
 * And that would be the proper way of doing it because showing or hiding the
 * counter is something which only is interesting to this component, not to
 * any other part of the application."
 *
 * WHEN TO USE REDUX VS useState:
 * - Use useState for truly local, component-specific state
 * - Use Redux for state shared across multiple components
 * - In demos/learning, we often use Redux for simplicity even when local state would work
 *
 * ADDING NEW STATE PROPERTIES (Lesson 317):
 * =========================================
 * To add new state to Redux:
 * 1. Add the property to your initial state
 * 2. Include it in EVERY return statement in the reducer
 * 3. Create action type(s) to modify it
 * 4. Access it via useSelector in components
 *
 * CRITICAL CONCEPT: REDUX STATE REPLACEMENT (Lesson 317):
 * =======================================================
 * INSTRUCTOR QUOTE:
 * "Redux won't merge your changes with the existing state. It instead takes
 * what you return and replaces the existing state with it."
 *
 * WRONG - Will lose showCounter:
 * if (action.type === 'increment') {
 *   return { counter: state.counter + 1 };
 *   // showCounter is GONE!
 * }
 *
 * CORRECT - Includes all properties:
 * if (action.type === 'increment') {
 *   return {
 *     counter: state.counter + 1,
 *     showCounter: state.showCounter  // Preserved!
 *   };
 * }
 *
 * MULTIPLE STATE PROPERTIES EXAMPLE (Lesson 317):
 * ===============================================
 *
 * const initialState = {
 *   counter: 0,        // Numeric state
 *   showCounter: true  // Boolean state
 * };
 *
 * // In reducer - ALWAYS include all properties!
 * if (action.type === 'increment') {
 *   return {
 *     counter: state.counter + 1,     // Changed
 *     showCounter: state.showCounter  // Unchanged, but MUST be included
 *   };
 * }
 *
 * if (action.type === 'toggle') {
 *   return {
 *     counter: state.counter,         // Unchanged, but MUST be included
 *     showCounter: !state.showCounter // Changed (inverted)
 *   };
 * }
 *
 * ACCESSING MULTIPLE STATE PROPERTIES IN COMPONENTS (Lesson 317):
 * ===============================================================
 * INSTRUCTOR QUOTE:
 * "We can use this [useSelector] multiple times to retrieve different pieces
 * of data from the state."
 *
 * // In component:
 * const counter = useSelector(state => state.counter);
 * const show = useSelector(state => state.showCounter);
 *
 * Each useSelector call:
 * - Subscribes to that specific piece of state
 * - Re-renders component when that data changes
 *
 * CONDITIONAL RENDERING WITH REDUX STATE (Lesson 317):
 * ====================================================
 * INSTRUCTOR QUOTE:
 * "So now here with show extracted, we now can render this div here
 * conditionally by checking if show and only rendering the div if show
 * is truthy, like this."
 *
 * // JSX pattern:
 * {show && <div className={classes.value}>{counter}</div>}
 *
 * TESTING THE FEATURE (Lesson 317):
 * =================================
 * INSTRUCTOR QUOTE:
 * "If we now save this and reload, if we click Toggle Counter, it's gone,
 * if I click this again, it's there again. I can still increase it even
 * if it's hidden but it only shows up when, well, when I click Toggle Counter."
 *
 * Key observations:
 * - Counter value persists even when hidden
 * - Toggle only affects visibility, not the counter value
 * - Each piece of state is independent but managed together
 */
