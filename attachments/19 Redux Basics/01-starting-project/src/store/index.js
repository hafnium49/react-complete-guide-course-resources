/**
 * ============================================================================
 * REDUX STORE CONFIGURATION (Lessons 311-321)
 * ============================================================================
 *
 * This file contains the Redux store setup using Redux Toolkit's createSlice
 * and configureStore.
 *
 * LESSON 311-319 - CORE REDUX FOUNDATIONS:
 * ========================================
 * See previous lessons for: createStore, reducers, action types, payloads,
 * multiple state properties, immutability rules, and Redux challenges.
 *
 * LESSON 320 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Installing Redux Toolkit: npm install @reduxjs/toolkit
 * 2. Redux Toolkit INCLUDES Redux - can uninstall plain 'redux' package
 * 3. Importing createSlice from @reduxjs/toolkit
 * 4. createSlice vs createReducer (createSlice is more powerful)
 * 5. Creating a slice with: name, initialState, reducers
 * 6. Slice reducers automatically receive current state
 * 7. "Mutating" state is ALLOWED in createSlice (Immer handles immutability)
 * 8. Accessing action.payload for extra data in reducer methods
 * 9. No more manual if/else checks for action types
 *
 * LESSON 321 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Using the return value of createSlice (the slice object)
 * 2. Accessing counterSlice.reducer to get the combined reducer
 * 3. The problem: createStore only accepts ONE reducer
 * 4. Solution: configureStore from @reduxjs/toolkit
 * 5. configureStore takes a configuration object, not a reducer directly
 * 6. The reducer property (singular) - Redux wants ONE main reducer
 * 7. Value can be a single reducer OR a map of reducers (object)
 * 8. configureStore merges multiple reducers behind the scenes
 * 9. How to dispatch actions with createSlice (teaser)
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

/**
 * ============================================================================
 * IMPORTS (Lesson 321)
 * ============================================================================
 *
 * REMOVING createStore (Lesson 321):
 * ==================================
 * INSTRUCTOR QUOTE:
 * "So first of all we can get rid of our old counterReducer here, we don't need
 * that anymore. So let's remove it to make this a bit more readable."
 *
 * We no longer need createStore from 'redux' because Redux Toolkit provides
 * configureStore which is more powerful and easier to use.
 *
 * IMPORTING configureStore (Lesson 321):
 * ======================================
 * INSTRUCTOR QUOTE:
 * "Now with standard Redux, there is a combineReducers function which we could
 * use for that but we can also ditch Redux here and instead import another
 * function from reduxjs/toolkit which will make that a bit easier. We can
 * import the configureStore function."
 *
 * configureStore advantages over createStore:
 * - Automatically sets up Redux DevTools
 * - Automatically adds middleware (like redux-thunk)
 * - Makes merging multiple reducers easier
 * - Configuration object instead of function arguments
 */
import { createSlice, configureStore } from '@reduxjs/toolkit';

/**
 * ============================================================================
 * IMPORTING FROM REDUX TOOLKIT (Lesson 320)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Here at the top and the index JS file we can import something from
 * @reduxjs/toolkit. And that's something is the create slice function."
 *
 * WHY createSlice? (Lesson 320):
 * =============================
 * INSTRUCTOR QUOTE:
 * "There also is a create reducer function which would also allow us to create
 * a reducer with certain enhancements, but create slice is even more powerful
 * than create reducer. And it will simplify a couple of aspects in one go."
 *
 * createSlice provides:
 * - Automatic action creators (no more manual dispatch({ type: '...' }))
 * - Built-in Immer for immutable updates (can "mutate" state directly)
 * - Grouped reducers for related state (slices)
 * - Auto-generated action type strings
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
 * CREATING A SLICE WITH createSlice (Lesson 320)
 * ============================================================================
 *
 * WHAT IS A SLICE? (Lesson 320):
 * ==============================
 * INSTRUCTOR QUOTE:
 * "Now, what we do with create slice is we are preparing a slice of our global
 * state. And when we have different pieces of state which are not directly
 * related, let's say an authentication status and the counter status, we could
 * create different slices potentially also in different files to make our code
 * maintainable."
 *
 * A "slice" groups together:
 * - A piece of state (initialState)
 * - The reducers that modify that state
 * - Auto-generated action creators
 *
 * SLICE CONFIGURATION (Lesson 320):
 * =================================
 * createSlice requires an object with:
 * 1. name: A unique identifier for this slice
 * 2. initialState: The starting state values
 * 3. reducers: An object of reducer methods
 *
 * INSTRUCTOR QUOTE:
 * "Now every slice needs a name and identifier of that piece of state so to say.
 * And here I'll name this counter but the name is up to you. It doesn't have
 * to be this name here, it can be any name you want."
 */
const counterSlice = createSlice({
  /**
   * SLICE NAME (Lesson 320):
   * ========================
   * INSTRUCTOR QUOTE:
   * "Now every slice needs a name and identifier of that piece of state so to say."
   *
   * The name is used to generate action type strings automatically.
   * For example: 'counter/increment', 'counter/decrement', etc.
   */
  name: 'counter',

  /**
   * INITIAL STATE (Lesson 320):
   * ===========================
   * INSTRUCTOR QUOTE:
   * "Next you need to set up an initial state. And here I wanna set my initial
   * state equal to that object or I therefore just point at initial state."
   *
   * Using ES6 shorthand: initialState is equivalent to initialState: initialState
   */
  initialState,

  /**
   * REDUCERS OBJECT (Lesson 320):
   * =============================
   * INSTRUCTOR QUOTE:
   * "And then we also need to add reducers. Reducers is again, an object, a map
   * you could say, of all the reducers this slice needs, this state slice needs."
   *
   * INSTRUCTOR QUOTE:
   * "Now here in this object, you can now simply add methods with any names of
   * your choice, though those names will become important later."
   *
   * Each method:
   * - Automatically receives the current state as first parameter
   * - Optionally receives the action as second parameter (for payloads)
   * - Is called based on which action is dispatched
   */
  reducers: {
    /**
     * INCREMENT REDUCER (Lesson 320):
     * ===============================
     * INSTRUCTOR QUOTE:
     * "Every method here will then automatically receive the latest state.
     * These methods will be called for you by Redux, and they will receive
     * the current state."
     *
     * =========================================================================
     * "MUTATING" STATE IN createSlice - IT'S SAFE! (Lesson 320)
     * =========================================================================
     *
     * INSTRUCTOR QUOTE:
     * "Now in these methods here in the reducers map we now also can do something
     * else than we did before. Now, here we are allowed to mutate the state.
     * So here we can set state.counter++ for example, for incrementing it."
     *
     * WHY IS THIS SAFE? (Lesson 320):
     * ==============================
     * INSTRUCTOR QUOTE:
     * "Now this was forbidden before and I emphasized that it is forbidden. I also
     * did emphasize it because here it seems to be allowed. But the important part
     * is the word seems. We still must not manipulate the existing state but the
     * good thing is when using Redux toolkit and its functions like create slice,
     * we can't accidentally manipulate the existing state."
     *
     * HOW IMMER WORKS BEHIND THE SCENES (Lesson 320):
     * ===============================================
     * INSTRUCTOR QUOTE:
     * "Because Redux toolkit internally uses another package, called imgur [Immer],
     * which will detect code like this and which will automatically clone the
     * existing state, create a new state object, keep all the state which we're
     * not editing, and override the state which we are editing in an immutable way."
     *
     * THE DEVELOPER EXPERIENCE (Lesson 320):
     * =====================================
     * INSTRUCTOR QUOTE:
     * "So we still have immutable code here even though it doesn't look like it
     * because of this internally used package and therefore we as a developer
     * have a much easier time working with Redux because we don't have to create
     * a copy manually and keep all the code we're not changing, instead, we just
     * change the code we wanna change and internally it's translated into
     * immutable code."
     *
     * NO NEED TO RETURN IN SIMPLE CASES:
     * - When "mutating" state, you don't need to return anything
     * - Immer handles creating the new state automatically
     * - You CAN still return a new state object if you prefer
     */
    increment(state) {
      state.counter++;
    },

    /**
     * DECREMENT REDUCER (Lesson 320):
     * ===============================
     * INSTRUCTOR QUOTE:
     * "Therefore in decrement we execute state.counter--"
     *
     * Notice:
     * - No need to copy showCounter (Immer preserves it automatically)
     * - No need to return a new object
     * - Much cleaner than the manual approach!
     */
    decrement(state) {
      state.counter--;
    },

    /**
     * INCREASE REDUCER WITH PAYLOAD (Lesson 320):
     * ===========================================
     * INSTRUCTOR QUOTE:
     * "And here for increase we now need a payload. We now need extra data.
     * So how does that work?"
     *
     * ACCEPTING THE ACTION PARAMETER (Lesson 320):
     * ============================================
     * INSTRUCTOR QUOTE:
     * "Now when using Redux toolkit we of course, can still have reducers that
     * listen to actions that have an extra payload, extra data. Because these
     * were user functions here, don't just receive the state. They also still
     * do get the action."
     *
     * INSTRUCTOR QUOTE:
     * "We just don't need to accept it in the other two reducers because we don't
     * need to do anything with the action in there. But now here if we need some
     * data that's attached to the action, then we can still accept it as a
     * parameter and use it in the reducer function in the reducer method."
     *
     * ACCESSING THE PAYLOAD (Lesson 320):
     * ===================================
     * INSTRUCTOR QUOTE:
     * "So they are for now I can set state counter equal to state counter plus
     * action.amount."
     *
     * WHY action.amount (NOT action.payload) IN LESSON 320:
     * ====================================================
     * Currently, Counter.js still dispatches actions the OLD way:
     *   dispatch({ type: 'increase', amount: 10 })
     *
     * So we access the value via action.amount to match the dispatch.
     *
     * IN LESSON 321 (action.payload):
     * ==============================
     * When we switch to using auto-generated action creators:
     *   dispatch(counterActions.increase(10))
     *
     * The value 10 automatically becomes action.payload, and we'll update
     * this reducer to use action.payload instead of action.amount.
     */
    increase(state, action) {
      state.counter = state.counter + action.amount;
    },

    /**
     * TOGGLE COUNTER REDUCER (Lesson 320):
     * ====================================
     * INSTRUCTOR QUOTE:
     * "Now for a toggle counter we don't need the actual payload here we just
     * get the state, and set state.show counter equal to not state.show counter
     * to invert this value."
     *
     * Notice: We don't need the action here, so we only accept state.
     */
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

/**
 * ============================================================================
 * COMPARISON: OLD REDUCER vs createSlice (Lesson 320)
 * ============================================================================
 *
 * OLD WAY (Manual reducer with if checks):
 * ========================================
 * const counterReducer = (state = initialState, action) => {
 *   if (action.type === 'increment') {
 *     return {
 *       counter: state.counter + 1,
 *       showCounter: state.showCounter,  // Must copy everything!
 *     };
 *   }
 *   if (action.type === 'decrement') { ... }
 *   return state;
 * };
 *
 * NEW WAY (createSlice):
 * =====================
 * const counterSlice = createSlice({
 *   name: 'counter',
 *   initialState,
 *   reducers: {
 *     increment(state) { state.counter++; },  // So much simpler!
 *     decrement(state) { state.counter--; },
 *   }
 * });
 *
 * BENEFITS:
 * - No manual if/else or switch statements
 * - No need to copy unchanged properties
 * - Can "mutate" state directly (Immer handles immutability)
 * - Auto-generated action creators (covered in next lesson)
 * - Much less boilerplate code
 */

/**
 * ============================================================================
 * USING THE SLICE WITH configureStore (Lesson 321)
 * ============================================================================
 *
 * USING THE RETURN VALUE OF createSlice (Lesson 321):
 * ===================================================
 * INSTRUCTOR QUOTE:
 * "Now to use our slice, we first of all need to use the return value of calling
 * createSlice because here we get back our counterSlice, now this name is up to
 * you, but it's a slice of our global state, the slice which is responsible for
 * working with our counter."
 *
 * The slice object (counterSlice) contains:
 * - reducer: The generated reducer function (use this for store creation)
 * - actions: Auto-generated action creators (covered later in this lesson)
 * - name: The slice name ('counter')
 *
 * REGISTERING THE SLICE WITH THE STORE (Lesson 321):
 * ==================================================
 * INSTRUCTOR QUOTE:
 * "Now we wanna register this with our store."
 *
 * ACCESSING counterSlice.reducer (Lesson 321):
 * ============================================
 * INSTRUCTOR QUOTE:
 * "And now here to createStore, we could pass our counterSlice.reducer. With that
 * we get access to the reducers set up in the slice even though it .reducer, it's
 * basically a big reducer with a couple of if statements that trigger those
 * different reducer methods depending on the action type and we would be good to go."
 *
 * THE PROBLEM WITH MULTIPLE SLICES (Lesson 321):
 * ==============================================
 * INSTRUCTOR QUOTE:
 * "But if we have bigger applications with multiple state slices, we would face a
 * problem if we try to do it like this, because there can only be one reducer
 * passed to create store and when we have multiple slices, we have multiple
 * reducers which we access with .reducer on the different slices."
 *
 * Example of the problem:
 *   const counterSlice = createSlice({ ... });  // counterSlice.reducer
 *   const authSlice = createSlice({ ... });     // authSlice.reducer
 *   // createStore only accepts ONE reducer - which one do we pass?
 *
 * TRADITIONAL SOLUTION - combineReducers (Lesson 321):
 * ====================================================
 * INSTRUCTOR QUOTE:
 * "Now with standard Redux, there is a combineReducers function which we could
 * use for that..."
 *
 * MODERN SOLUTION - configureStore (Lesson 321):
 * ==============================================
 * INSTRUCTOR QUOTE:
 * "...but we can also ditch Redux here and instead import another function from
 * reduxjs/toolkit which will make that a bit easier. We can import the
 * configureStore function."
 *
 * INSTRUCTOR QUOTE:
 * "ConfigureStore like createStore creates a store but it makes merging multiple
 * reducers into one reducer easier thereafter."
 *
 * ============================================================================
 * configureStore CONFIGURATION OBJECT (Lesson 321)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So here we can now call configureStore, and to configureStore, we now pass an
 * object not a reducer function but an object. It's a configuration object
 * expected by configureStore."
 *
 * WHY "reducer" (SINGULAR) NOT "reducers" (PLURAL)? (Lesson 321):
 * ==============================================================
 * INSTRUCTOR QUOTE:
 * "A configuration object where we then set a reducer property and that's an
 * expected property by configureStore. Reducer singular and not reducers plural
 * because still, no matter if we use createStore or configureStore, Redux wants
 * one main reducer function, which is responsible for the global state."
 *
 * SINGLE REDUCER VALUE (Lesson 321):
 * ==================================
 * INSTRUCTOR QUOTE:
 * "However, with configureStore, the value for reducer can be a single reducer
 * so we can for example use counterSlice.reducer to use the reducer from that
 * counterSlice which combines all those reducer methods to find in that slice.
 * We can use that as a global main reducer and here that would make sense because
 * this is the only state slice we have and therefore, the only reducer we have."
 *
 * MAP OF REDUCERS (FOR MULTIPLE SLICES) (Lesson 321):
 * ===================================================
 * INSTRUCTOR QUOTE:
 * "...but if we had multiple state slices in a bigger application something we're
 * going to see later, then alternatively as a value for this reducer key, we could
 * also set an object and in that object, we can set up any keys of our choice, so
 * any property names of our choice and the values of those properties would then
 * be different reducer functions."
 *
 * INSTRUCTOR QUOTE:
 * "So we would create a map of reducers you could say, and this map is then set as
 * a value for the main reducer and behind the scenes configureStore will emerge
 * all those reducers into one big reducer. So it will merge them for us."
 *
 * EXAMPLE - Single reducer (what we're using now):
 * ================================================
 * const store = configureStore({
 *   reducer: counterSlice.reducer  // Single reducer for single slice
 * });
 *
 * EXAMPLE - Map of reducers (for multiple slices):
 * ================================================
 * const store = configureStore({
 *   reducer: {
 *     counter: counterSlice.reducer,  // state.counter
 *     auth: authSlice.reducer,        // state.auth
 *     cart: cartSlice.reducer         // state.cart
 *   }
 * });
 *
 * With a map of reducers:
 * - configureStore merges them into one big reducer automatically
 * - Each key becomes a property in the global state
 * - Access via: state.counter, state.auth, state.cart
 *
 * WHY WE USE SINGLE REDUCER HERE (Lesson 321):
 * ============================================
 * INSTRUCTOR QUOTE:
 * "And that's an alternative we can use, not an alternative we will use here
 * though because here we only have one reducer so we can direct the assign, that
 * reducer from the counterSlice as our main reducer for configureStore."
 */
const store = configureStore({
  reducer: counterSlice.reducer,
});

/**
 * ============================================================================
 * HOW DO WE DISPATCH ACTIONS? (Lesson 321 - TEASER)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now the question is, how do we dispatch actions? Because we don't have our
 * own, if checks, we don't know what the identifiers for our actions should be.
 * We just have these method names but how do we now know what to dispatch?"
 *
 * This is answered in the next part of the lesson - we'll use the auto-generated
 * action creators from counterSlice.actions!
 *
 * Preview:
 *   export const counterActions = counterSlice.actions;
 *
 *   // In component:
 *   dispatch(counterActions.increment())
 *   dispatch(counterActions.increase(10))  // payload becomes action.payload
 */

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
