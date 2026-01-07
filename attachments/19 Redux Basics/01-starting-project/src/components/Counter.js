/**
 * ============================================================================
 * COUNTER COMPONENT - READING & DISPATCHING REDUX STATE (Lessons 313-320)
 * ============================================================================
 *
 * This component demonstrates how to:
 * - Read data from a Redux store using useSelector (Lesson 313)
 * - Dispatch actions to modify Redux state using useDispatch (Lesson 314)
 * - Alternative: Using connect() for class-based components (Lesson 315)
 * - Attaching payload data to actions (Lesson 316)
 * - Working with multiple state properties (Lesson 317)
 *
 * LESSON 320 - REDUX TOOLKIT createSlice (STORE-SIDE CHANGES):
 * ============================================================
 * Lesson 320 introduces Redux Toolkit's createSlice in the store.
 * Key changes happened in store/index.js:
 * - Replaced manual reducer function with createSlice
 * - Can now "mutate" state directly (Immer handles immutability)
 * - No more if/else checks for action types
 *
 * COMPONENT CHANGES COMING IN LESSON 321:
 * ======================================
 * Currently, this component still dispatches actions the old way:
 *   dispatch({ type: 'increment' })
 *
 * In the next lesson, we'll use auto-generated action creators:
 *   dispatch(counterActions.increment())
 *
 * This eliminates string-based action types and potential typos!
 *
 * LESSON 313 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Importing useSelector from 'react-redux'
 * 2. Understanding useSelector vs useStore hooks
 * 3. Passing a selector function to useSelector
 * 4. Automatic subscription to Redux store updates
 * 5. Automatic cleanup when component unmounts
 * 6. Alternative: connect() function for class components
 *
 * LESSON 314 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Importing useDispatch from 'react-redux'
 * 2. useDispatch returns a dispatch function (no arguments needed)
 * 3. Creating handler functions for increment/decrement
 * 4. Dispatching actions as objects with a 'type' property
 * 5. Action type values MUST match identifiers in the reducer
 * 6. Wiring up buttons with onClick to dispatch actions
 *
 * LESSON 315 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Class-based components cannot use hooks
 * 2. Using connect() function from react-redux as alternative
 * 3. connect() is a Higher-Order Component (HOC)
 * 4. mapStateToProps - maps Redux state to component props
 * 5. mapDispatchToProps - maps dispatch functions to props
 * 6. The connect()() double-call pattern
 * 7. Both approaches (hooks vs connect) manage subscriptions automatically
 *
 * LESSON 316 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Actions often need more than just a 'type' property
 * 2. Adding extra payload properties to action objects
 * 3. Dispatching actions with payloads: { type: '...', amount: 10 }
 * 4. Property names must match between dispatch and reducer
 * 5. Common payload naming conventions (amount, payload, value, etc.)
 *
 * LESSON 317 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Managing multiple state properties in Redux
 * 2. Using multiple useSelector calls for different state pieces
 * 3. Dispatching toggle action to change visibility state
 * 4. Conditional rendering based on Redux state
 * 5. Understanding Redux state replacement vs merging
 * 6. Local state (useState) vs global state (Redux) considerations
 *
 * LESSON 318 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. NEVER mutate existing state in Redux reducers
 * 2. Understanding reference vs primitive values in JavaScript
 * 3. Why mutation seems to work but causes hidden bugs
 * 4. Always return brand new state objects from reducers
 * 5. Avoiding accidental mutation with objects and arrays
 *
 * NOTE: Lesson 318 concepts apply to the REDUCER code in store/index.js.
 * Components dispatch actions, but the immutability rules are enforced
 * in the reducer. See store/index.js for detailed Lesson 318 comments.
 *
 * LESSON 319 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Identifying potential problems as Redux apps grow
 * 2. Problem: Action type string identifiers are error-prone
 * 3. Problem: Typos in action types cause silent failures
 * 4. Traditional solution: Export/import constants for action types
 * 5. Modern solution: Redux Toolkit auto-generates action types
 *
 * NOTE: See store/index.js for complete Lesson 319 coverage including
 * all three problems (action types, large reducers, immutability) and
 * their solutions. This file focuses on the component-side action type issue.
 *
 * WHY LEARN ABOUT CLASS-BASED COMPONENTS? (Lesson 315)
 * =====================================================
 * INSTRUCTOR QUOTE:
 * "Now, even though it's not the focus of this course because it's not the
 * common way of writing components, I wanna briefly talk about class-based
 * components instead of functional components. Because whilst nowadays we
 * typically do use functional components only, there still are a lot of
 * projects out there that do use class-based components instead. And there
 * of course also are simply people who prefer that, and there is nothing
 * wrong with class-based components."
 */

import classes from './Counter.module.css';

/**
 * IMPORTING HOOKS FROM REACT-REDUX (Lessons 313 & 314)
 * =====================================================
 * useSelector (Lesson 313):
 * - Custom hook to read/select state from Redux store
 * - Automatically subscribes component to store updates
 *
 * useDispatch (Lesson 314):
 * - Custom hook to get the dispatch function
 * - Allows dispatching actions to modify Redux state
 *
 * INSTRUCTOR QUOTE (Lesson 314):
 * "Well, there is another hook which we can use, the useDispatch hook."
 */
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  /**
   * USING useSelector TO READ REDUX STATE (Lesson 313)
   * ===================================================
   * Pass a selector function that receives state and returns
   * the specific piece of state you need.
   *
   * React Redux automatically:
   * - Sets up subscription to the store
   * - Re-renders component when selected data changes
   * - Clears subscription on unmount
   */
  const counter = useSelector((state) => state.counter);

  /**
   * =========================================================================
   * USING MULTIPLE useSelector CALLS (Lesson 317)
   * =========================================================================
   *
   * INSTRUCTOR QUOTE:
   * "We can use this multiple times to retrieve different pieces of data from
   * the state. And here I'm then interested in my showCounter piece of data,
   * and I'll store that in a show constant. The constant name of course is up
   * to you."
   *
   * MULTIPLE SUBSCRIPTIONS (Lesson 317):
   * ====================================
   * INSTRUCTOR QUOTE:
   * "Now again, that will then always update and the component will be
   * re-evaluated whenever that data which we're accessing here changes."
   *
   * Key points about multiple useSelector calls:
   * - Each call subscribes to a specific piece of state
   * - Component re-renders when ANY subscribed state changes
   * - More granular subscriptions = better performance (only re-render when needed)
   * - Can use as many useSelector calls as needed
   *
   * WHY NOT ONE BIG SELECTOR? (Lesson 317):
   * ======================================
   * You could do: const state = useSelector(state => state);
   * But this would re-render on ANY state change, even unrelated ones.
   * Selecting specific pieces is more efficient.
   */
  const show = useSelector((state) => state.showCounter);

  /**
   * USING useDispatch TO GET THE DISPATCH FUNCTION (Lesson 314)
   * ============================================================
   * INSTRUCTOR QUOTE:
   * "When we call useDispatch here, we don't pass any argument to it,
   * but instead, this gives us back a dispatch function which you can execute."
   *
   * "So dispatch here is a function, a function which we can call, which will
   * dispatch an action against our Redux store."
   *
   * KEY POINTS:
   * ===========
   * - useDispatch() takes NO arguments
   * - Returns the store's dispatch function
   * - We use this dispatch function to send actions to the reducer
   * - The reducer then processes the action and returns new state
   */
  const dispatch = useDispatch();

  /**
   * INCREMENT HANDLER (Lesson 314)
   * ==============================
   * INSTRUCTOR QUOTE:
   * "So therefore now, I'll add two new functions here in this counter component.
   * The increment handler and the decrement handler. So two new functions which
   * will wire up to the buttons."
   *
   * DISPATCHING AN ACTION (Lesson 314):
   * ===================================
   * INSTRUCTOR QUOTE:
   * "And in the increment handler, we want to use this dispatch function and
   * execute it to dispatch a new action and then do what we learned. An action
   * is an object with a type property."
   *
   * ACTION TYPE MUST MATCH REDUCER (Lesson 314):
   * ============================================
   * INSTRUCTOR QUOTE:
   * "And then the value for type should be one of the identifiers we use in
   * our Redux store reducer. So here in the reducer function, we handle the
   * action type increment and the action type decrement. So we should dispatch
   * one of these two identifiers. Of course, exactly these identifiers, without
   * any typos or changes."
   *
   * IMPORTANT: The string 'increment' here MUST match exactly what the reducer
   * expects. If we wrote 'INCREMENT' or 'Increment', the reducer wouldn't
   * recognize it and would return unchanged state!
   *
   * =========================================================================
   * POTENTIAL PROBLEM: ACTION TYPE STRINGS (Lesson 319)
   * =========================================================================
   *
   * INSTRUCTOR QUOTE:
   * "One potential issue can be our action types. These identifiers, I mentioned
   * it before, you of course have to avoid typos. If you dispatch an action, you
   * have to make sure that you don't mistype the identifier here otherwise it of
   * course won't be handled by the reducer or won't be handled correctly."
   *
   * THE PROBLEM WITH STRINGS:
   * ========================
   * Using hardcoded strings like 'increment' is risky because:
   *
   * 1. TYPOS ARE SILENT:
   *    dispatch({ type: 'incremnt' });  // Typo - NO error thrown!
   *    // The reducer just returns unchanged state silently
   *
   * 2. NO AUTOCOMPLETE:
   *    IDE can't help you - you're just typing a string
   *
   * 3. REFACTORING IS HARD:
   *    If you rename 'increment' to 'add', you must find every dispatch()
   *    call manually across all components
   *
   * INSTRUCTOR QUOTE:
   * "Now that's not a problem in a small app like this but in bigger applications
   * with a lot of developers working on the app and with a lot of different
   * actions it's super easy to imagine that you could mess up one of these
   * identifiers."
   *
   * TRADITIONAL SOLUTION - CONSTANTS (Lesson 319):
   * ==============================================
   * INSTRUCTOR QUOTE:
   * "For example, for ensuring that we have unique identifiers and we don't
   * miss type we could create constants... and we then export this constant."
   *
   * // In store/index.js:
   * export const INCREMENT = 'increment';
   *
   * // In this component:
   * import { INCREMENT } from '../store/index';
   * dispatch({ type: INCREMENT });  // Now typos cause compile errors!
   *
   * MODERN SOLUTION - REDUX TOOLKIT (Lesson 319):
   * =============================================
   * Redux Toolkit auto-generates action types AND action creators,
   * so you never write string identifiers manually. Coming in next lesson!
   */
  const incrementHandler = () => {
    dispatch({ type: 'increment' });
  };

  /**
   * DECREMENT HANDLER (Lesson 314)
   * ==============================
   * INSTRUCTOR QUOTE:
   * "And then here in the decrement handler I'll dispatch an object with a
   * type property with a value of decrement."
   *
   * Same pattern as increment - dispatch an action object with a type
   * property that matches what the reducer handles.
   */
  const decrementHandler = () => {
    dispatch({ type: 'decrement' });
  };

  /**
   * =========================================================================
   * INCREASE HANDLER WITH PAYLOAD (Lesson 316)
   * =========================================================================
   *
   * WHY ACTIONS NEED PAYLOADS (Lesson 316):
   * =======================================
   * INSTRUCTOR QUOTE:
   * "Now, when building more realistic applications, oftentimes, you have
   * actions where just the type is not enough. Where the action, which we
   * dispatch and which reaches the Reducer often needs to carry extra data."
   *
   * EXAMPLE - ADDING A THIRD BUTTON (Lesson 316):
   * =============================================
   * INSTRUCTOR QUOTE:
   * "For example, here in this counter application, let's say, we also want
   * to have a third button, an increase by five button, which adds not one,
   * but five to the counter."
   *
   * WHY NOT HARDCODE IN REDUCER? (Lesson 316):
   * ==========================================
   * INSTRUCTOR QUOTE:
   * "Now, one straightforward way of achieving this would be to add another
   * action in the Reducer function that always adds five. But I want to have
   * a more flexible action here, an action where I define the value I want
   * to add to counter, when I dispatch the action and not in the Reducer
   * function."
   *
   * Benefits of using payloads:
   * - More flexible - same action type can handle different values
   * - Reusable - "increase by 5", "increase by 10", etc. use the same action
   * - Scalable - don't need new action types for each possible value
   *
   * ATTACHING EXTRA DATA TO ACTIONS (Lesson 316):
   * =============================================
   * INSTRUCTOR QUOTE:
   * "This is actually not too difficult to achieve. All we have to do is add
   * an extra property to this action here... For example, an extra amount
   * property. And this property name is entirely up to you."
   *
   * PROPERTY NAMING (Lesson 316):
   * ============================
   * INSTRUCTOR QUOTE:
   * "And I could use any identifier here. I could name this value or number
   * or anything like that. But I'll go with amount because that's most
   * descriptive in my opinion."
   *
   * ACTION STRUCTURE WITH PAYLOAD:
   * ==============================
   * {
   *   type: 'increase',   // REQUIRED - identifies the action
   *   amount: 10          // PAYLOAD - extra data for the reducer
   * }
   *
   * The 'amount' property name here MUST match what the reducer expects!
   * In our reducer: action.amount
   *
   * INSTRUCTOR QUOTE:
   * "Of course, we do have to make sure though, that we use the amount property
   * name here, because that's the name, the property name I'm gonna use when
   * dispatching this action."
   */
  const increaseHandler = () => {
    dispatch({ type: 'increase', amount: 10 });
  };

  /**
   * =========================================================================
   * TOGGLE COUNTER HANDLER (Lesson 317)
   * =========================================================================
   *
   * DISPATCHING THE TOGGLE ACTION (Lesson 317):
   * ===========================================
   * INSTRUCTOR QUOTE:
   * "Now we also support this new toggle action type and hence back in counter.js
   * in the toggleCounterHandler, we should dispatch such an action. We dispatch
   * a new action object where the type is toggle."
   *
   * LOCAL STATE VS REDUX FOR THIS FEATURE (Lesson 317):
   * ===================================================
   * INSTRUCTOR QUOTE:
   * "Now for this, of course, we could use useState. So we could set up some
   * local state in this component which we manage with useState, not with Redux.
   * And that would be the proper way of doing it because showing or hiding the
   * counter is something which only is interesting to this component, not to
   * any other part of the application."
   *
   * INSTRUCTOR QUOTE:
   * "But the same could be set about our counter. We are only using the counter
   * in this component here. So the counter technically also is local state but
   * this is just a simple demo to get started."
   *
   * When to use Redux vs useState:
   * - useState: For truly component-local state (recommended for toggle visibility)
   * - Redux: For state shared across multiple components
   * - In this demo: Using Redux to learn the concepts
   */
  const toggleCounterHandler = () => {
    dispatch({ type: 'toggle' });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {/*
        DISPLAYING THE REDUX STATE (Lesson 313)
        ========================================
        The counter variable contains the current value from Redux store.
        It will automatically update whenever the store state changes.

        =====================================================================
        CONDITIONAL RENDERING BASED ON REDUX STATE (Lesson 317)
        =====================================================================

        INSTRUCTOR QUOTE:
        "So now here with show extracted, we now can render this div here
        conditionally by checking if show and only rendering the div if show
        is truthy, like this."

        The pattern: {show && <div>...</div>}
        - If show is true: renders the div
        - If show is false: renders nothing (short-circuit evaluation)

        TESTING (Lesson 317):
        ====================
        INSTRUCTOR QUOTE:
        "If we now save this and reload, if we click Toggle Counter, it's gone,
        if I click this again, it's there again. I can still increase it even
        if it's hidden but it only shows up when, well, when I click Toggle Counter."

        KEY INSIGHT (Lesson 317):
        ========================
        The counter VALUE persists even when hidden! Clicking increment/decrement
        while hidden still updates the counter in Redux - you just can't see it
        until you toggle visibility back on.
      */}
      {show && <div className={classes.value}>{counter}</div>}

      {/*
        INCREMENT/DECREMENT BUTTONS (Lesson 314)
        ========================================
        INSTRUCTOR QUOTE:
        "Now for dispatching actions, I first of all, want to have two new
        buttons here which allow me to dispatch actions for incrementing
        and decrementing. So here I'll add a new div. And in that div I'll
        just add two buttons. The first one says increment, the second one
        says decrement."

        WIRING UP THE BUTTONS (Lesson 314):
        ===================================
        INSTRUCTOR QUOTE:
        "Now we need to wire up those two functions to the buttons. So this
        first button we add an onClick prop and point at the increment handler.
        And on the second button we do the same for the decrement handler."

        TESTING (Lesson 314):
        =====================
        INSTRUCTOR QUOTE:
        "And if we do that and save this, if we now click increment, you see
        the counter increases and if you click decrement, it decreases.
        So now we're able to use what we learned about Redux in this react demo,
        in this react component here."
      */}
      {/*
        INCREASE BY 10 BUTTON (Lesson 316)
        ===================================
        INSTRUCTOR QUOTE:
        "For example, here in this counter application, let's say, we also want
        to have a third button, an increase by five button, which adds not one,
        but five to the counter."

        Note: The instructor uses "increase by five" as an example, but the
        concept applies to any value. We're using 10 here to demonstrate
        that the payload value can be anything.

        TESTING (Lesson 316):
        ====================
        INSTRUCTOR QUOTE:
        "And if I now save this and I click Increase by 5, you see it increases
        by five. And if I click it again, it increases by five. And decrement
        decreases by one, so that's still working."
      */}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={increaseHandler}>Increase by 10</button>
      </div>

      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

/**
 * ============================================================================
 * SUMMARY - LESSONS 313 & 314 COMBINED WORKFLOW
 * ============================================================================
 *
 * READING STATE (Lesson 313):
 * ===========================
 * 1. Import useSelector from 'react-redux'
 * 2. Call useSelector with a selector function
 * 3. Use the returned value in your JSX
 *
 * DISPATCHING ACTIONS (Lesson 314):
 * =================================
 * 1. Import useDispatch from 'react-redux'
 * 2. Call useDispatch() to get the dispatch function
 * 3. Create handler functions that call dispatch({ type: 'actionType' })
 * 4. Wire up buttons/events to these handler functions
 *
 * COMPLETE PATTERN:
 * =================
 * import { useSelector, useDispatch } from 'react-redux';
 *
 * const MyComponent = () => {
 *   // Read state
 *   const value = useSelector(state => state.value);
 *
 *   // Get dispatch function
 *   const dispatch = useDispatch();
 *
 *   // Handler that dispatches action
 *   const handleClick = () => {
 *     dispatch({ type: 'someAction' });
 *   };
 *
 *   return <button onClick={handleClick}>{value}</button>;
 * };
 *
 * DATA FLOW:
 * ==========
 *
 *   Component                    Redux Store
 *   ---------                    -----------
 *       |                             |
 *       |   1. dispatch(action)       |
 *       | --------------------------> |
 *       |                             |
 *       |   2. Reducer processes      |
 *       |      action, returns        |
 *       |      new state              |
 *       |                             |
 *       |   3. useSelector gets       |
 *       |      updated state          |
 *       | <-------------------------- |
 *       |                             |
 *       |   4. Component re-renders   |
 *       |      with new data          |
 *
 * ACTION OBJECT STRUCTURE:
 * ========================
 * {
 *   type: 'actionType'  // REQUIRED - identifies the action
 *   payload: data       // OPTIONAL - additional data for the action
 * }
 *
 * COMMON MISTAKES TO AVOID:
 * =========================
 * 1. Typo in action type - 'increment' vs 'INCREMENT' vs 'Increment'
 *    Solution: Use constants for action types (covered later)
 *
 * 2. Forgetting to call dispatch - just having dispatch({ type: '...' })
 *    without putting it in a function won't work
 *
 * 3. Calling useDispatch conditionally or in loops
 *    Hooks must be called at the top level of the component
 *
 * NEXT STEPS (Upcoming Lessons):
 * ==============================
 * - Adding payloads to actions for dynamic values
 * - Working with more complex state
 * - Using Redux Toolkit to simplify Redux code
 *
 * ============================================================================
 * LESSON 315 - CLASS-BASED COMPONENTS & THE connect() FUNCTION
 * ============================================================================
 *
 * HOOKS VS connect() (Lesson 315):
 * ================================
 * INSTRUCTOR QUOTE:
 * "In the functional component we used hooks. useDispatch and useSelector,
 * but hooks are not usable in class-based components."
 *
 * "React Redux also exports a connect function, which is a function that helps
 * you connect class-based components to Redux. Actually, you could also use it
 * on functional components, but for functional components, using these hooks
 * is simply more convenient."
 *
 * THE connect() FUNCTION (Lesson 315):
 * ====================================
 * INSTRUCTOR QUOTE:
 * "When we export our counter, we don't export the counter component like this.
 * Instead we call connect and now connect when executed, will actually return
 * a new function as a value, which we then execute again. And then we pass our
 * component to that returned function as our argument."
 *
 * "So this can look strange, but connect is a so-called higher order component.
 * We execute the connect function. It then returns a new function, and we execute
 * this returned, this new function as well. And to this returned function, we
 * pass counter."
 *
 * mapStateToProps (Lesson 315):
 * =============================
 * INSTRUCTOR QUOTE:
 * "The first function is a function that maps Redux state to props, which will
 * be received in this component then. Hence we call this function mapStateToProps.
 * That's not a name you must use, but a convention which you will see in a lot
 * of projects."
 *
 * "This is a function which receives the Redux state, and then this returns an
 * object where the keys will be available as props in the receiving component."
 *
 * "And that's of course, similar to what we do with useSelector. Here we also
 * get the state and drill into the state to get the counter, and then store
 * that in a counter const. That's basically the equivalent when not doing it
 * with hooks, but with the connect function."
 *
 * mapDispatchToProps (Lesson 315):
 * ================================
 * INSTRUCTOR QUOTE:
 * "The second argument is another function, which is typically called
 * mapDispatchToProps. It's the equivalent to useDispatch. Now the idea is
 * to store dispatch functions in props. So that in the counter component,
 * we have certain props which we can execute as a function, which will then
 * when executed dispatch an action to the Redux store."
 *
 * "For this mapDispatchToProps receives the dispatch function as an argument
 * automatically, just like mapStateToProps. The mapDispatchToProps function
 * will be executed for you by Redux."
 *
 * AUTOMATIC SUBSCRIPTION MANAGEMENT (Lesson 315):
 * ===============================================
 * INSTRUCTOR QUOTE:
 * "And when using connect, react Redux will still set up a subscription and
 * manage a subscription for you. It will do all of that. It's just an
 * alternative to using the useDispatch and useSelector hooks."
 *
 * CLASS-BASED COMPONENT EXAMPLE (Lesson 315):
 * ===========================================
 *
 * // Imports needed for class-based approach:
 * // import { Component } from 'react';
 * // import { connect } from 'react-redux';
 *
 * // mapStateToProps - Maps Redux state to component props
 * // Equivalent to useSelector
 * const mapStateToProps = (state) => {
 *   return {
 *     counter: state.counter  // this.props.counter will be available
 *   };
 * };
 *
 * // mapDispatchToProps - Maps dispatch functions to component props
 * // Equivalent to useDispatch
 * const mapDispatchToProps = (dispatch) => {
 *   return {
 *     increment: () => dispatch({ type: 'increment' }),
 *     decrement: () => dispatch({ type: 'decrement' })
 *   };
 * };
 *
 * // Class-based component
 * class Counter extends Component {
 *   incrementHandler() {
 *     this.props.increment();  // Calls the mapped dispatch function
 *   }
 *
 *   decrementHandler() {
 *     this.props.decrement();  // Calls the mapped dispatch function
 *   }
 *
 *   toggleCounterHandler() {}
 *
 *   render() {
 *     return (
 *       <main className={classes.counter}>
 *         <h1>Redux Counter</h1>
 *         <div className={classes.value}>{this.props.counter}</div>
 *         <div>
 *           <button onClick={this.incrementHandler.bind(this)}>Increment</button>
 *           <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
 *         </div>
 *         <button onClick={this.toggleCounterHandler.bind(this)}>Toggle Counter</button>
 *       </main>
 *     );
 *   }
 * }
 *
 * // Export with connect() - Higher-Order Component pattern
 * export default connect(mapStateToProps, mapDispatchToProps)(Counter);
 *
 * BINDING METHODS IN CLASS COMPONENTS (Lesson 315):
 * ==================================================
 * INSTRUCTOR QUOTE:
 * "Now, to make sure that everything works because JavaScript works the way it
 * does, we need to call bind here on the increment and decrement handler bindings
 * in JSX, and bind this to make sure that the 'this' keyword inside of these
 * methods refers to the class."
 *
 * COMPARISON: HOOKS vs connect()
 * ==============================
 *
 * | Feature                  | Hooks Approach          | connect() Approach        |
 * |--------------------------|-------------------------|---------------------------|
 * | Component Type           | Functional only         | Functional or Class       |
 * | Reading State            | useSelector(fn)         | mapStateToProps           |
 * | Dispatching              | useDispatch()           | mapDispatchToProps        |
 * | Subscription             | Automatic               | Automatic                 |
 * | Syntax Complexity        | Simpler                 | More verbose              |
 * | Export                   | export default Comp     | export default connect()()|
 * | Accessing in Component   | const val = useSelector | this.props.val            |
 *
 * INSTRUCTOR RECOMMENDATION (Lesson 315):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "And obviously that's a bit shorter and easier, I would say. But if you're
 * working with class-based components, you can't use hooks, and then this is
 * your equivalent."
 *
 * "Again, class-based components are not the focus of this course, but they do
 * exist, they are valid, they are still getting used in a lot of projects, and
 * therefore you should know how to connect those to Redux as well. Nonetheless,
 * we will stick to functional components."
 *
 * ============================================================================
 * LESSON 316 - ACTION PAYLOADS SUMMARY
 * ============================================================================
 *
 * WHY PAYLOADS MATTER:
 * ====================
 * - Simple actions (type only) are limited to hardcoded behavior
 * - Payloads make actions flexible and reusable
 * - Same action type can handle many different values
 *
 * ACTION WITH PAYLOAD STRUCTURE:
 * ==============================
 * {
 *   type: 'actionType',     // REQUIRED - identifies what action to perform
 *   payload: data,          // OPTIONAL - additional data for the reducer
 *   // OR use specific property names:
 *   amount: 10,
 *   value: 'something',
 *   item: { ... }
 * }
 *
 * DISPATCHING WITH PAYLOAD:
 * ========================
 * // In component:
 * const increaseHandler = () => {
 *   dispatch({ type: 'increase', amount: 10 });
 * };
 *
 * HANDLING PAYLOAD IN REDUCER:
 * ============================
 * // In reducer:
 * if (action.type === 'increase') {
 *   return {
 *     counter: state.counter + action.amount  // Use the payload!
 *   };
 * }
 *
 * COMMON MISTAKES TO AVOID (Lesson 316):
 * ======================================
 * 1. Property name mismatch:
 *    - Dispatch: { type: 'increase', amount: 10 }
 *    - Reducer: action.value  // WRONG! Should be action.amount
 *
 * 2. Forgetting to use the payload:
 *    - Reducer returns state.counter + 1 instead of state.counter + action.amount
 *
 * DATA FLOW WITH PAYLOADS:
 * ========================
 *
 *   Component                              Reducer
 *   ---------                              -------
 *       |                                     |
 *       |  dispatch({                         |
 *       |    type: 'increase',                |
 *       |    amount: 10         ───────────>  | if (action.type === 'increase')
 *       |  })                                 |   return { counter: state.counter
 *       |                                     |              + action.amount }
 *       |                                     |
 *       |  <─────────────────────────────────  | New state returned
 *       |                                     |
 *       |  Component re-renders               |
 *       |  with updated counter               |
 *
 * NEXT STEPS (Upcoming Lessons):
 * ==============================
 * - Working with multiple state properties
 * - Handling more complex state shapes
 * - Redux Toolkit to simplify Redux code
 *
 * ============================================================================
 * LESSON 317 - WORKING WITH MULTIPLE STATE PROPERTIES SUMMARY
 * ============================================================================
 *
 * OVERVIEW (Lesson 317):
 * ======================
 * INSTRUCTOR QUOTE:
 * "So that now also works and that is how we can manage multiple different
 * pieces of data in our state. Of course, this data is still kind of connected,
 * we have the counter and then the state whether we wanna show it or not but
 * it's two totally different values which are changed in totally different ways.
 * So therefore, that is how we can manage multiple pieces of data."
 *
 * LOCAL STATE VS REDUX STATE (Lesson 317):
 * ========================================
 * INSTRUCTOR QUOTE:
 * "Now for this, of course, we could use useState... And that would be the
 * proper way of doing it because showing or hiding the counter is something
 * which only is interesting to this component."
 *
 * Decision guide:
 * | Scenario                          | Use           |
 * |-----------------------------------|---------------|
 * | State only needed in one component| useState      |
 * | State shared across components    | Redux         |
 * | Simple UI toggles                 | useState      |
 * | Authentication/user data          | Redux         |
 * | Form input values                 | useState      |
 * | Shopping cart items               | Redux         |
 *
 * STEPS TO ADD NEW STATE IN REDUX (Lesson 317):
 * =============================================
 *
 * 1. ADD TO INITIAL STATE (in store/index.js):
 *    const initialState = {
 *      counter: 0,
 *      showCounter: true  // NEW!
 *    };
 *
 * 2. UPDATE ALL RETURN STATEMENTS (CRITICAL!):
 *    // EVERY return must include ALL properties!
 *    if (action.type === 'increment') {
 *      return {
 *        counter: state.counter + 1,
 *        showCounter: state.showCounter  // MUST INCLUDE!
 *      };
 *    }
 *
 * 3. ADD NEW ACTION TYPE:
 *    if (action.type === 'toggle') {
 *      return {
 *        counter: state.counter,
 *        showCounter: !state.showCounter
 *      };
 *    }
 *
 * 4. USE MULTIPLE useSelector IN COMPONENT:
 *    const counter = useSelector(state => state.counter);
 *    const show = useSelector(state => state.showCounter);
 *
 * 5. DISPATCH NEW ACTION:
 *    const toggleHandler = () => {
 *      dispatch({ type: 'toggle' });
 *    };
 *
 * 6. USE IN JSX (conditional rendering):
 *    {show && <div>{counter}</div>}
 *
 * CRITICAL CONCEPT: STATE REPLACEMENT (Lesson 317):
 * =================================================
 * INSTRUCTOR QUOTE:
 * "Redux won't merge your changes with the existing state. It instead takes
 * what you return and replaces the existing state with it."
 *
 * // WRONG - showCounter will be LOST!
 * return { counter: state.counter + 1 };
 *
 * // CORRECT - All properties preserved
 * return {
 *   counter: state.counter + 1,
 *   showCounter: state.showCounter
 * };
 *
 * MULTIPLE useSelector PATTERN (Lesson 317):
 * ==========================================
 * // Read different pieces of state
 * const counter = useSelector(state => state.counter);
 * const show = useSelector(state => state.showCounter);
 *
 * Benefits:
 * - Each selector subscribes to specific state
 * - Component only re-renders when relevant state changes
 * - More granular = better performance
 *
 * CONDITIONAL RENDERING PATTERN (Lesson 317):
 * ===========================================
 * {show && <div className={classes.value}>{counter}</div>}
 *
 * How it works:
 * - show = true:  renders the div
 * - show = false: short-circuit, renders nothing
 *
 * KEY INSIGHT (Lesson 317):
 * ========================
 * The counter value persists even when not visible:
 * - Toggle hides the display
 * - Increment/decrement still works
 * - Toggle back shows the updated value
 *
 * COMPLETE DATA FLOW (Lesson 317):
 * ================================
 *
 *   Component                              Redux Store
 *   ---------                              -----------
 *       |                                      |
 *       | 1. dispatch({ type: 'toggle' })      |
 *       | -----------------------------------> |
 *       |                                      |
 *       |                          2. Reducer:
 *       |                             if (action.type === 'toggle')
 *       |                               return {
 *       |                                 counter: state.counter,
 *       |                                 showCounter: !state.showCounter
 *       |                               }
 *       |                                      |
 *       | 3. useSelector gets new showCounter  |
 *       | <----------------------------------- |
 *       |                                      |
 *       | 4. Component re-renders              |
 *       |    {show && <div>...}                |
 *       |    now shows/hides based on          |
 *       |    new showCounter value             |
 *
 * ============================================================================
 * LESSON 318 - NEVER MUTATE STATE (COMPONENT PERSPECTIVE)
 * ============================================================================
 *
 * IMPORTANT: The immutability rules from Lesson 318 apply to the REDUCER,
 * not to component code. Components dispatch actions but don't directly
 * mutate state.
 *
 * WHY COMPONENTS ARE SAFE (Lesson 318):
 * =====================================
 * When a component calls:
 *   dispatch({ type: 'increment' })
 *
 * It's just sending a MESSAGE to Redux. The component doesn't have direct
 * access to modify state. The reducer receives this action and must return
 * a NEW state object.
 *
 * THE DANGEROUS CODE IS IN THE REDUCER (Lesson 318):
 * ==================================================
 * INSTRUCTOR QUOTE:
 * "You should never, super important, never mutate the state, the existing state."
 *
 * // WRONG (in reducer):
 * if (action.type === 'increment') {
 *   state.counter++;   // MUTATION! Changes the existing state object
 *   return state;      // Returns the SAME object
 * }
 *
 * // CORRECT (in reducer):
 * if (action.type === 'increment') {
 *   return {           // Returns a NEW object
 *     counter: state.counter + 1,
 *     showCounter: state.showCounter
 *   };
 * }
 *
 * WHAT COMPONENTS DO (Lesson 318):
 * ================================
 * Components simply:
 * 1. READ state via useSelector (non-mutating)
 * 2. DISPATCH actions to request state changes
 *
 * They never directly modify state, so the immutability burden falls
 * on the reducer code.
 *
 * WHY IT MATTERS FOR COMPONENTS (Lesson 318):
 * ===========================================
 * INSTRUCTOR QUOTE:
 * "This can lead to bugs, unpredictable behavior and it can make debugging
 * your application harder as well."
 *
 * If the reducer mutates state:
 * - Components may not re-render when state "changes"
 * - useSelector may return stale values
 * - The UI gets out of sync with the data
 *
 * This appears to the component developer as mysterious bugs where the
 * component doesn't update even though actions are being dispatched.
 *
 * SEE store/index.js FOR COMPLETE LESSON 318 DOCUMENTATION:
 * =========================================================
 * - The golden rule of Redux immutability
 * - Reference vs primitive values explained
 * - Correct immutable update patterns
 * - Mutating vs non-mutating array methods table
 * - Why mutations seem to work but cause hidden bugs
 * - Handling deeply nested state immutably
 *
 * ============================================================================
 * LESSON 319 - REDUX CHALLENGES (COMPONENT PERSPECTIVE)
 * ============================================================================
 *
 * THE ACTION TYPE PROBLEM IN COMPONENTS (Lesson 319):
 * ===================================================
 * INSTRUCTOR QUOTE:
 * "If you dispatch an action, you have to make sure that you don't mistype
 * the identifier here otherwise it of course won't be handled by the reducer
 * or won't be handled correctly."
 *
 * Look at all our dispatch calls in this component:
 *   dispatch({ type: 'increment' })
 *   dispatch({ type: 'decrement' })
 *   dispatch({ type: 'increase', amount: 10 })
 *   dispatch({ type: 'toggle' })
 *
 * Each string is a potential point of failure:
 * - What if someone types 'incremment' instead of 'increment'?
 * - What if another developer uses 'INCREMENT' (different case)?
 * - What if you need to rename an action type across the whole app?
 *
 * SCALING THE PROBLEM (Lesson 319):
 * =================================
 * INSTRUCTOR QUOTE:
 * "Now that's not a problem in a small app like this but in bigger applications
 * with a lot of developers working on the app and with a lot of different
 * actions it's super easy to imagine that you could mess up one of these
 * identifiers."
 *
 * In a real application, you might have:
 * - Dozens of components
 * - Each dispatching multiple different actions
 * - Multiple developers working on different features
 * - Action types like 'users/setLoading', 'cart/addItem', 'auth/logout'
 *
 * CLASHING ACTION TYPES (Lesson 319):
 * ===================================
 * INSTRUCTOR QUOTE:
 * "You could even have clashing identifiers there so clashing identifier names."
 *
 * Example scenario:
 * - UserProfile component: dispatch({ type: 'reset' })  // Reset user form
 * - ShoppingCart component: dispatch({ type: 'reset' }) // Reset cart
 *
 * Both actions trigger BOTH reducers accidentally!
 *
 * TRADITIONAL SOLUTION - EXPORT/IMPORT CONSTANTS (Lesson 319):
 * ============================================================
 * INSTRUCTOR QUOTE:
 * "For example, for ensuring that we have unique identifiers and we don't
 * miss type we could create constants."
 *
 * // In store/index.js:
 * export const INCREMENT = 'increment';
 * export const DECREMENT = 'decrement';
 * export const INCREASE = 'increase';
 * export const TOGGLE = 'toggle';
 *
 * // In this component:
 * import { INCREMENT, DECREMENT, INCREASE, TOGGLE } from '../store';
 *
 * dispatch({ type: INCREMENT });  // If you typo INCREMENT, build fails!
 *
 * INSTRUCTOR QUOTE:
 * "And we then import and use that constant in the counter component so that
 * here we use the type increment and we just import increments."
 *
 * BENEFITS OF USING CONSTANTS:
 * ============================
 * 1. IDE autocomplete helps you find the right constant
 * 2. Typos cause compile-time errors (INCREMNT is undefined!)
 * 3. Single source of truth - rename in one place
 * 4. Namespacing: USER_INCREMENT vs CART_INCREMENT
 *
 * THE MODERN SOLUTION - REDUX TOOLKIT (Lesson 319):
 * =================================================
 * INSTRUCTOR QUOTE:
 * "But we actually don't need to dive into those various solutions anymore.
 * Instead there is another library called Redux Toolkit."
 *
 * Redux Toolkit eliminates action type strings entirely:
 *
 * // With Redux Toolkit, instead of:
 * dispatch({ type: 'increment' })
 *
 * // You'll write:
 * dispatch(counterActions.increment())
 *
 * - No string to typo
 * - Full IDE autocomplete
 * - Type-safe with TypeScript
 * - Action type auto-generated under the hood
 *
 * INSTRUCTOR QUOTE:
 * "Redux Toolkit simply as an extra package which makes working with Redux
 * more convenient and easier. You don't have to use it... but if you use it,
 * certain things will get easier."
 *
 * SEE store/index.js FOR COMPLETE LESSON 319 DOCUMENTATION:
 * =========================================================
 * - All three Redux problems explained in detail
 * - Traditional solutions (constants, combineReducers, Immer)
 * - Redux Toolkit benefits comparison table
 * - Why we learned core Redux first
 *
 * KEY TAKEAWAYS (Lesson 319):
 * ==========================
 * 1. String action types are error-prone (typos, clashes, refactoring)
 * 2. Constants help but add boilerplate
 * 3. Redux Toolkit solves this automatically with action creators
 * 4. Redux Toolkit is developed by the same team as Redux
 * 5. Optional but highly recommended for production apps
 *
 * NEXT STEPS (Upcoming Lessons):
 * ==============================
 * - Installing Redux Toolkit
 * - createSlice for actions + reducers in one place
 * - configureStore for simpler store setup
 * - Dispatching auto-generated action creators
 */
