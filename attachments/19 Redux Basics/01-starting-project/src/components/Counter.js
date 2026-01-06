/**
 * ============================================================================
 * COUNTER COMPONENT - READING & DISPATCHING REDUX STATE (Lessons 313, 314 & 315)
 * ============================================================================
 *
 * This component demonstrates how to:
 * - Read data from a Redux store using useSelector (Lesson 313)
 * - Dispatch actions to modify Redux state using useDispatch (Lesson 314)
 * - Alternative: Using connect() for class-based components (Lesson 315)
 * - Attaching payload data to actions (Lesson 316)
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

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {/*
        DISPLAYING THE REDUX STATE (Lesson 313)
        ========================================
        The counter variable contains the current value from Redux store.
        It will automatically update whenever the store state changes.
      */}
      <div className={classes.value}>{counter}</div>

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
 */
