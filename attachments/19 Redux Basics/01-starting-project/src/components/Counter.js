/**
 * ============================================================================
 * COUNTER COMPONENT - READING & DISPATCHING REDUX STATE (Lessons 313 & 314)
 * ============================================================================
 *
 * This component demonstrates how to:
 * - Read data from a Redux store using useSelector (Lesson 313)
 * - Dispatch actions to modify Redux state using useDispatch (Lesson 314)
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
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
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
 */
