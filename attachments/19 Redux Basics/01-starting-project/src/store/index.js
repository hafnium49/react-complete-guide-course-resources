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
 * LESSON 318 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. NEVER mutate the existing state in Redux
 * 2. Understanding reference vs primitive values in JavaScript
 * 3. Why mutation seems to work but causes hidden bugs
 * 4. Always return brand new state objects
 * 5. Avoiding accidental mutation with objects and arrays
 * 6. Immutable update patterns for Redux state
 *
 * LESSON 319 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Identifying potential problems as Redux apps grow
 * 2. Problem #1: Action type identifiers - typos and clashing names
 * 3. Problem #2: Large state objects and long reducer functions
 * 4. Problem #3: State immutability with nested objects/arrays
 * 5. Traditional solution: Constants for action types (export/import)
 * 6. Traditional solution: Splitting reducers into smaller ones
 * 7. Modern solution: Redux Toolkit - makes everything easier
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
 * ============================================================================
 * CRITICAL: NEVER MUTATE STATE IN REDUX! (Lesson 318)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "You should never, super important, never mutate the state, the existing state.
 * You should never change the existing state. Instead, always override it by
 * returning a brand new state object."
 *
 * WHY CAN'T WE JUST MODIFY THE EXISTING STATE? (Lesson 318):
 * ==========================================================
 * INSTRUCTOR QUOTE:
 * "Why do we need to return a new piece of data here? Why can't we just use the
 * state which we're getting as an argument, access counter and increment it
 * like this, instead of returning?"
 *
 * DANGEROUS PATTERN - DO NOT DO THIS! (Lesson 318):
 * =================================================
 * // WRONG! This mutates the existing state
 * if (action.type === 'increment') {
 *   state.counter++;        // MUTATION!
 *   return state;           // Returns the SAME object, just modified
 * }
 *
 * // ALSO WRONG! Still mutates even though we return a "new" object
 * if (action.type === 'increment') {
 *   state.counter++;        // MUTATION!
 *   return {                // This looks new, but state was already mutated
 *     counter: state.counter,
 *     showCounter: state.showCounter
 *   };
 * }
 *
 * IT SEEMS TO WORK, BUT IT'S WRONG (Lesson 318):
 * ==============================================
 * INSTRUCTOR QUOTE:
 * "Well, if we do that and we reload, everything works. So it's not easy to see
 * that this is wrong, but it is, even though it works. This is something you
 * absolutely must not do when working with Redux."
 *
 * ===========================================================================
 * REFERENCE VS PRIMITIVE VALUES IN JAVASCRIPT (Lesson 318)
 * ===========================================================================
 *
 * See: https://academind.com/tutorials/reference-vs-primitive-values/
 *
 * PRIMITIVE VALUES:
 * =================
 * - Numbers, strings, booleans, undefined, null
 * - Stored directly in the stack memory
 * - When you copy them, you get an independent copy
 *
 * Example:
 *   let a = 5;
 *   let b = a;   // b gets a COPY of 5
 *   b = 10;      // Changing b doesn't affect a
 *   console.log(a); // Still 5
 *
 * REFERENCE VALUES:
 * =================
 * - Objects and arrays
 * - Stored in heap memory
 * - Variables hold a POINTER (reference) to the memory location
 * - When you copy them, you copy the POINTER, not the data!
 *
 * Example:
 *   let person = { name: 'Max' };
 *   let newPerson = person;       // newPerson gets the SAME pointer!
 *   newPerson.name = 'Anna';      // Modifying through newPerson...
 *   console.log(person.name);     // 'Anna' - BOTH point to same object!
 *
 * WHY THIS MATTERS FOR REDUX (Lesson 318):
 * ========================================
 * INSTRUCTOR QUOTE:
 * "And because objects and arrays are reference values in JavaScript, it's easy
 * to accidentally override and change the existing state."
 *
 * When you do state.counter++, you're modifying the SAME object that Redux
 * is tracking. Even if you return a "new" object afterward, the original
 * state has already been changed in memory.
 *
 * CONSEQUENCES OF STATE MUTATION (Lesson 318):
 * ============================================
 * INSTRUCTOR QUOTE:
 * "This can lead to bugs, unpredictable behavior and it can make debugging
 * your application harder as well. So even though it doesn't lead to a bug
 * here, it can have unwanted and unexpected side effects in bigger applications
 * where your state gets out of sync. And suddenly the UI is not reflecting
 * your state correctly anymore."
 *
 * Problems caused by mutation:
 * - Redux can't detect changes properly
 * - Time-travel debugging breaks
 * - Component re-renders may not trigger
 * - State history becomes corrupted
 * - Very hard to debug - "it works" until it mysteriously doesn't
 *
 * THE SIMPLE RULE (Lesson 318):
 * ============================
 * INSTRUCTOR QUOTE:
 * "And hence the simple rule is: never mutate your state like this. Always
 * return a brand new object where you copy any nested objects or arrays if
 * you have any, and create brand new values as we're doing it here."
 *
 * CORRECT PATTERN - ALWAYS DO THIS:
 * =================================
 * if (action.type === 'increment') {
 *   return {                       // Return a BRAND NEW object
 *     counter: state.counter + 1,  // Create NEW value (doesn't mutate)
 *     showCounter: state.showCounter
 *   };
 * }
 *
 * NESTED OBJECTS AND ARRAYS (Lesson 318):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "And especially when you have a state with nested objects and arrays, it's
 * easy to accidentally mutate your existing state. And therefore you should
 * be super careful that you do this in an immutable way."
 *
 * For nested data, you must copy at each level:
 *
 * // WRONG - mutates nested object!
 * if (action.type === 'updateUser') {
 *   state.user.name = 'New Name';  // MUTATION!
 *   return { ...state };
 * }
 *
 * // CORRECT - creates new objects at each level
 * if (action.type === 'updateUser') {
 *   return {
 *     ...state,
 *     user: {
 *       ...state.user,
 *       name: 'New Name'
 *     }
 *   };
 * }
 *
 * COPYING TECHNIQUES IN JAVASCRIPT:
 * =================================
 * For arrays:
 *   - [...array]              // Spread operator (shallow copy)
 *   - array.slice()           // Creates a shallow copy
 *   - array.concat(newItem)   // Returns new array with item added
 *   - array.filter(...)       // Returns new filtered array
 *   - array.map(...)          // Returns new mapped array
 *
 * For objects:
 *   - { ...object }           // Spread operator (shallow copy)
 *   - Object.assign({}, obj)  // Creates a shallow copy
 *
 * WARNING: These are SHALLOW copies! Nested objects still share references.
 *
 * WHY EMPHASIZE THIS NOW? (Lesson 318):
 * =====================================
 * INSTRUCTOR QUOTE:
 * "Now, at this point it might look a little bit too early to emphasize it
 * like this, because this is a fairly simple state here, but it is super
 * important, easy to mess up, and something you should know right from the
 * start which is why I am emphasizing it here."
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
   *
   * =========================================================================
   * IMMUTABLE UPDATE PATTERN (Lesson 318)
   * =========================================================================
   *
   * Notice how we update the counter:
   *   counter: state.counter + 1
   *
   * NOT like this (WRONG!):
   *   state.counter++;  // This MUTATES the existing state
   *   return state;
   *
   * The expression state.counter + 1 creates a NEW number value without
   * modifying the original. Numbers are primitive values, so + 1 produces
   * a completely new number, leaving state.counter unchanged.
   *
   * INSTRUCTOR QUOTE:
   * "By updating our state like this, we create a brand new object where we
   * don't change anything."
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
 *
 * ============================================================================
 * LESSON 318 - NEVER MUTATE STATE! SUMMARY
 * ============================================================================
 *
 * THE GOLDEN RULE OF REDUX (Lesson 318):
 * ======================================
 * INSTRUCTOR QUOTE:
 * "You should never, super important, never mutate the state, the existing state.
 * You should never change the existing state. Instead, always override it by
 * returning a brand new state object."
 *
 * WHY IS THIS SO IMPORTANT? (Lesson 318):
 * =======================================
 * 1. REDUX RELIES ON REFERENCE EQUALITY:
 *    - Redux checks if state changed by comparing object references
 *    - If you mutate and return same object, Redux may not detect changes
 *    - Components may not re-render properly
 *
 * 2. TIME-TRAVEL DEBUGGING BREAKS:
 *    - Redux DevTools stores snapshots of state
 *    - Mutations corrupt the history
 *    - You can't "go back in time" properly
 *
 * 3. HIDDEN BUGS (Lesson 318):
 *    INSTRUCTOR QUOTE:
 *    "This can lead to bugs, unpredictable behavior and it can make debugging
 *    your application harder as well."
 *
 * REFERENCE VS PRIMITIVE VALUES REFRESHER:
 * ========================================
 * See: https://academind.com/tutorials/reference-vs-primitive-values/
 *
 * PRIMITIVES (Numbers, Strings, Booleans):
 * - Stored directly in memory
 * - Copying creates independent value
 *   let a = 5;
 *   let b = a;  // b is now 5, independent of a
 *   b = 10;     // a is still 5
 *
 * REFERENCE TYPES (Objects, Arrays):
 * - Variables store POINTERS to memory location
 * - Copying copies the POINTER, not the data!
 *   let obj = { name: 'Max' };
 *   let obj2 = obj;        // SAME object!
 *   obj2.name = 'Anna';    // Both obj.name and obj2.name are 'Anna'!
 *
 * WHY MUTATIONS ARE DANGEROUS IN REDUX (Lesson 318):
 * ==================================================
 * INSTRUCTOR QUOTE:
 * "And because objects and arrays are reference values in JavaScript, it's easy
 * to accidentally override and change the existing state."
 *
 * When you write:
 *   state.counter++;   // This modifies the ORIGINAL state object!
 *   return state;      // Returns the SAME object reference
 *
 * Redux might think nothing changed because the reference is identical!
 *
 * CORRECT IMMUTABLE PATTERNS:
 * ===========================
 *
 * FOR SIMPLE VALUES:
 * ------------------
 * WRONG:   state.counter++; return state;
 * CORRECT: return { counter: state.counter + 1, ...otherProps };
 *
 * FOR OBJECTS:
 * ------------
 * WRONG:   state.user.name = 'New'; return state;
 * CORRECT: return { ...state, user: { ...state.user, name: 'New' } };
 *
 * FOR ARRAYS:
 * -----------
 * WRONG (push):    state.items.push(newItem); return state;
 * CORRECT (concat): return { ...state, items: state.items.concat(newItem) };
 * CORRECT (spread): return { ...state, items: [...state.items, newItem] };
 *
 * WRONG (splice):   state.items.splice(index, 1); return state;
 * CORRECT (filter): return { ...state, items: state.items.filter((_, i) => i !== index) };
 *
 * WRONG (direct):   state.items[0].completed = true; return state;
 * CORRECT (map):    return {
 *                    ...state,
 *                    items: state.items.map((item, i) =>
 *                      i === 0 ? { ...item, completed: true } : item
 *                    )
 *                  };
 *
 * MUTATING VS NON-MUTATING ARRAY METHODS:
 * =======================================
 *
 * | MUTATES (Avoid!)     | DOESN'T MUTATE (Safe!) |
 * |----------------------|------------------------|
 * | push()               | concat()               |
 * | pop()                | slice()                |
 * | shift()              | filter()               |
 * | unshift()            | map()                  |
 * | splice()             | [...spread]            |
 * | sort()               | toSorted()             |
 * | reverse()            | toReversed()           |
 *
 * IT WORKS, BUT IT'S WRONG (Lesson 318):
 * ======================================
 * INSTRUCTOR QUOTE:
 * "Well, if we do that and we reload, everything works. So it's not easy to see
 * that this is wrong, but it is, even though it works."
 *
 * The danger: Mutations may APPEAR to work in simple cases, but will cause
 * mysterious bugs as your app grows. Issues include:
 * - Components not re-rendering
 * - Stale data appearing
 * - DevTools showing incorrect state
 * - Tests passing but app failing
 *
 * NESTED STATE IS TRICKY (Lesson 318):
 * ====================================
 * INSTRUCTOR QUOTE:
 * "And especially when you have a state with nested objects and arrays, it's
 * easy to accidentally mutate your existing state. And therefore you should
 * be super careful that you do this in an immutable way."
 *
 * EXAMPLE - DEEPLY NESTED STATE:
 * const state = {
 *   users: [
 *     { id: 1, profile: { name: 'Max', settings: { theme: 'dark' } } }
 *   ]
 * };
 *
 * // To change the theme, you must copy at EVERY level:
 * return {
 *   ...state,
 *   users: state.users.map(user =>
 *     user.id === 1
 *       ? {
 *           ...user,
 *           profile: {
 *             ...user.profile,
 *             settings: {
 *               ...user.profile.settings,
 *               theme: 'light'
 *             }
 *           }
 *         }
 *       : user
 *   )
 * };
 *
 * Note: This is verbose! Redux Toolkit (next lesson) makes this much easier.
 *
 * WHY EMPHASIZE THIS NOW? (Lesson 318):
 * =====================================
 * INSTRUCTOR QUOTE:
 * "Now, at this point it might look a little bit too early to emphasize it
 * like this, because this is a fairly simple state here, but it is super
 * important, easy to mess up, and something you should know right from the
 * start which is why I am emphasizing it here."
 *
 * KEY TAKEAWAYS (Lesson 318):
 * ==========================
 * 1. NEVER write: state.property = newValue
 * 2. NEVER write: state.array.push(item)
 * 3. ALWAYS return a brand new object: { ...spread, changes }
 * 4. ALWAYS copy nested objects/arrays at each level
 * 5. Use non-mutating array methods: concat, filter, map, slice
 * 6. Test thoroughly - mutations can hide for a long time
 *
 * ============================================================================
 * LESSON 319 - REDUX CHALLENGES & INTRODUCTION TO REDUX TOOLKIT
 * ============================================================================
 *
 * WHAT WE'VE LEARNED SO FAR (Lesson 319):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "So by now we learned a lot about the important basics of Redux and how we
 * use it. Now the more complex our projects become the more complex it can
 * get to use Redux correctly."
 *
 * INSTRUCTOR QUOTE:
 * "Now I wanted to show you the core foundation first so that you understand
 * how it works but now I want to dive into an approach that's a bit easier
 * to set up and maintain."
 *
 * ============================================================================
 * PROBLEM #1: ACTION TYPE IDENTIFIERS (Lesson 319)
 * ============================================================================
 *
 * THE TYPO PROBLEM (Lesson 319):
 * ==============================
 * INSTRUCTOR QUOTE:
 * "One potential issue can be our action types. These identifiers, I mentioned
 * it before, you of course have to avoid typos. If you dispatch an action, you
 * have to make sure that you don't mistype the identifier here otherwise it of
 * course won't be handled by the reducer or won't be handled correctly."
 *
 * EXAMPLES OF ACTION TYPE PROBLEMS:
 * ---------------------------------
 * In our current code, we use string identifiers like:
 *   - 'increment'
 *   - 'decrement'
 *   - 'increase'
 *   - 'toggle'
 *
 * What if someone types:
 *   dispatch({ type: 'incremnt' });  // Typo! Missing 'e'
 *   dispatch({ type: 'INCREMENT' }); // Case mismatch!
 *   dispatch({ type: 'inc' });       // Wrong identifier!
 *
 * None of these would be handled by the reducer - they'd just fall through
 * to the default case and return unchanged state. NO ERROR WOULD BE THROWN!
 *
 * SCALING PROBLEMS (Lesson 319):
 * ==============================
 * INSTRUCTOR QUOTE:
 * "Now that's not a problem in a small app like this but in bigger applications
 * with a lot of developers working on the app and with a lot of different
 * actions it's super easy to imagine that you could mess up one of these
 * identifiers."
 *
 * CLASHING IDENTIFIERS (Lesson 319):
 * ==================================
 * INSTRUCTOR QUOTE:
 * "You could even have clashing identifiers there so clashing identifier names."
 *
 * Example: Two developers might independently create actions with the same name:
 *   - User feature: { type: 'reset' }    // Resets user state
 *   - Cart feature: { type: 'reset' }    // Resets cart state
 *
 * Both actions would trigger BOTH reducers unintentionally!
 *
 * DESIRED SOLUTION (Lesson 319):
 * ==============================
 * INSTRUCTOR QUOTE:
 * "So therefore having some way of defining those identifiers once and then
 * reusing them would be nice."
 *
 * ============================================================================
 * PROBLEM #2: LARGE STATE OBJECTS & LONG REDUCERS (Lesson 319)
 * ============================================================================
 *
 * THE DATA GROWTH PROBLEM (Lesson 319):
 * =====================================
 * INSTRUCTOR QUOTE:
 * "Another potential problem is the amount of data which we manage here. The
 * more data we have the more different pieces of state we have, the bigger
 * our state objects get."
 *
 * COPY EVERYTHING PATTERN (Lesson 319):
 * =====================================
 * INSTRUCTOR QUOTE:
 * "And that means that we need to copy a lot of state when we update the
 * counter we still need to copy and keep all the other state properties."
 *
 * Current simple state:
 * const initialState = {
 *   counter: 0,
 *   showCounter: true,
 * };
 *
 * Imagine a real application state:
 * const initialState = {
 *   user: { id, name, email, preferences, settings, ... },
 *   products: [ ...hundreds of products ],
 *   cart: { items, totals, shipping, ... },
 *   orders: [ ...order history ],
 *   ui: { modals, notifications, loading states, ... },
 *   filters: { search, category, price range, ... },
 *   // ... potentially dozens more properties
 * };
 *
 * Every action would need to spread ALL of this!
 *
 * UNMAINTAINABLE REDUCER FILES (Lesson 319):
 * ==========================================
 * INSTRUCTOR QUOTE:
 * "And it also means that this reducer function gets longer and longer and
 * all of a sudden we might have an unmaintainable big Redux file."
 *
 * SAME PROBLEM AS REACT CONTEXT (Lesson 319):
 * ===========================================
 * INSTRUCTOR QUOTE:
 * "And you might recall that I brought this up as one potential disadvantage
 * of React Context. If we put everything into one context provider file.
 * Now we can end up with the same problem with the Redux but thankfully
 * there are solutions for that with Redux."
 *
 * ============================================================================
 * PROBLEM #3: STATE IMMUTABILITY COMPLEXITY (Lesson 319)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Another potential problem we could be facing is the state immutability
 * which we have to respect. I talked about it in the last lecture. We have
 * to ensure that we always return a brand new state snapshot and that we
 * don't accidentally change the existing state anywhere."
 *
 * NESTED DATA IS ESPECIALLY PROBLEMATIC (Lesson 319):
 * ===================================================
 * INSTRUCTOR QUOTE:
 * "And especially if you have more complex data with nested objects and
 * arrays it's easy to mess this up and accidentally change some nested
 * data even though you didn't want to."
 *
 * INSTRUCTOR QUOTE:
 * "So it would be great if we would have some help with that as well. And
 * if we could ensure that we don't accidentally manipulate nested data or
 * anything like that."
 *
 * Example of accidentally mutating nested state:
 *
 * // WRONG - This mutates nested state!
 * if (action.type === 'updateUserEmail') {
 *   state.user.email = action.email;  // MUTATION!
 *   return { ...state };  // Spread doesn't help - user object was already changed
 * }
 *
 * // CORRECT but verbose:
 * if (action.type === 'updateUserEmail') {
 *   return {
 *     ...state,
 *     user: {
 *       ...state.user,
 *       email: action.email
 *     }
 *   };
 * }
 *
 * ============================================================================
 * TRADITIONAL SOLUTION #1: ACTION TYPE CONSTANTS (Lesson 319)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "For example, for ensuring that we have unique identifiers and we don't
 * miss type we could create constants, let's say a constant named increments
 * which stores this identifier, and we then export this constant."
 *
 * HOW IT WOULD WORK:
 * ==================
 *
 * // In store/index.js - define and export constants:
 * export const INCREMENT = 'increment';
 * export const DECREMENT = 'decrement';
 * export const INCREASE = 'increase';
 * export const TOGGLE = 'toggle';
 *
 * // In reducer - use constants instead of strings:
 * if (action.type === INCREMENT) {  // Not 'increment'
 *   return { ... };
 * }
 *
 * // In component - import and use constants:
 * import { INCREMENT } from '../store/index';
 *
 * const incrementHandler = () => {
 *   dispatch({ type: INCREMENT });  // Not 'increment'
 * };
 *
 * INSTRUCTOR QUOTE:
 * "And we check that constants value here and we then import and use that
 * constant in the counter component so that here we use the type increment
 * and we just import increments."
 *
 * BENEFITS OF CONSTANTS:
 * ======================
 * 1. Typos cause compile errors, not silent failures
 * 2. IDE autocomplete works
 * 3. Single source of truth for action names
 * 4. Easier refactoring
 *
 * INSTRUCTOR QUOTE:
 * "That is something we could do to fix this issue. And these are approaches
 * which we typically used in the past with Redux."
 *
 * ============================================================================
 * TRADITIONAL SOLUTION #2: SPLIT REDUCERS (Lesson 319)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "There also are solutions for splitting your reducer into multiple smaller
 * reducers so that you don't get this large super big file."
 *
 * EXAMPLE - SPLIT BY FEATURE:
 * ===========================
 *
 * // store/reducers/userReducer.js
 * const userReducer = (state, action) => {
 *   // Only handles user-related actions
 * };
 *
 * // store/reducers/cartReducer.js
 * const cartReducer = (state, action) => {
 *   // Only handles cart-related actions
 * };
 *
 * // store/index.js - Combine reducers
 * import { combineReducers, createStore } from 'redux';
 * import userReducer from './reducers/userReducer';
 * import cartReducer from './reducers/cartReducer';
 *
 * const rootReducer = combineReducers({
 *   user: userReducer,
 *   cart: cartReducer
 * });
 *
 * const store = createStore(rootReducer);
 *
 * ============================================================================
 * TRADITIONAL SOLUTION #3: IMMUTABILITY LIBRARIES (Lesson 319)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And there also our solutions and third-party packages which allow you to
 * automatically copy state and ensure that you don't accidentally edit it."
 *
 * EXAMPLE - IMMER LIBRARY:
 * ========================
 * Libraries like Immer let you "mutate" a draft state, and it produces
 * an immutable update behind the scenes:
 *
 * import produce from 'immer';
 *
 * // This LOOKS like mutation but is actually immutable:
 * const nextState = produce(state, draft => {
 *   draft.user.email = action.email;  // Looks like mutation
 *   draft.cart.items.push(newItem);   // Looks like mutation
 * });
 * // nextState is a brand new object with the changes
 *
 * ============================================================================
 * THE MODERN SOLUTION: REDUX TOOLKIT (Lesson 319)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "But we actually don't need to dive into those various solutions anymore.
 * Instead there is another library called Redux Toolkit."
 *
 * WHAT IS REDUX TOOLKIT? (Lesson 319):
 * ====================================
 * INSTRUCTOR QUOTE:
 * "And you can just Google for Redux Toolkit to find its official page.
 * It's actually developed by the same person or the same team as React Redux
 * and Redux itself."
 *
 * INSTRUCTOR QUOTE:
 * "And Redux Toolkit simply as an extra package which makes working with
 * Redux more convenient and easier."
 *
 * IS IT REQUIRED? (Lesson 319):
 * ============================
 * INSTRUCTOR QUOTE:
 * "You don't have to use it, unlike Redux and react Redux which we installed
 * before, you don't have to install and use Redux toolkit but if you use it,
 * certain things will get easier."
 *
 * WHAT REDUX TOOLKIT SOLVES:
 * ==========================
 *
 * | Problem                    | Manual Solution         | Redux Toolkit Solution    |
 * |----------------------------|-------------------------|---------------------------|
 * | Action type typos          | Export constants        | Auto-generated types      |
 * | Large reducer files        | combineReducers         | createSlice               |
 * | State immutability         | Immer library           | Immer built-in            |
 * | Boilerplate code           | Lots of setup           | Minimal configuration     |
 * | Action creators            | Manual functions        | Auto-generated            |
 * | Store configuration        | Manual setup            | configureStore            |
 *
 * WHY LEARN CORE REDUX FIRST? (Lesson 319):
 * =========================================
 * INSTRUCTOR QUOTE:
 * "Now I wanted to show you the core foundation first so that you understand
 * how it works but now I want to dive into an approach that's a bit easier
 * to set up and maintain."
 *
 * Understanding core Redux concepts:
 * - Makes debugging easier
 * - Helps understand what Redux Toolkit does under the hood
 * - Useful when working with legacy codebases
 * - Gives you the foundation to make informed decisions
 *
 * NEXT STEP (Lesson 319):
 * =======================
 * INSTRUCTOR QUOTE:
 * "And therefore, in the next lecture we're going to get started with
 * Redux Toolkit."
 *
 * KEY TAKEAWAYS (Lesson 319):
 * ==========================
 * 1. As Redux apps grow, three main problems emerge:
 *    - Action type management (typos, clashes)
 *    - Large state objects and long reducers
 *    - State immutability complexity
 *
 * 2. Traditional solutions exist (constants, combineReducers, Immer)
 *    but require manual setup and additional code
 *
 * 3. Redux Toolkit is the modern, recommended solution that:
 *    - Is developed by the same team as Redux
 *    - Solves all three problems automatically
 *    - Makes Redux code cleaner and easier to maintain
 *    - Is optional but highly recommended
 *
 * NEXT STEPS (Upcoming Lessons):
 * ==============================
 * - Installing Redux Toolkit
 * - Using createSlice to define state, reducers, and actions together
 * - Using configureStore for simpler store setup
 * - Automatic immutable updates with built-in Immer
 */
