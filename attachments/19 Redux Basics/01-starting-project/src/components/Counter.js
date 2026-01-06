/**
 * ============================================================================
 * COUNTER COMPONENT - READING REDUX STATE (Lesson 313)
 * ============================================================================
 *
 * This component demonstrates how to read data from a Redux store
 * using the useSelector hook from react-redux.
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
 * WHY THIS COMPONENT? (Lesson 313)
 * =================================
 * INSTRUCTOR QUOTE:
 * "Let's say we wanna utilize this provided store not in the app component
 * but in the counter component which I rendered there. That's this counter
 * component in the components folder."
 *
 * "Now that's the component you're seeing on the screen here when you're
 * running your Def server. It shows us basically a container where we wanna
 * output the counter value."
 */

import classes from './Counter.module.css';

/**
 * IMPORTING useSelector FROM REACT-REDUX (Lesson 313)
 * ====================================================
 * INSTRUCTOR QUOTE:
 * "And we again do that with help of the React Redux Library. So from React
 * Redux we again wanna import something and the something which we are
 * importing is a React Hook. A custom hook made by the React Redux team.
 * The useSelector hook."
 *
 * useSelector vs useStore (Lesson 313):
 * =====================================
 * INSTRUCTOR QUOTE:
 * "There also is useStore hook, which we could use as well which gives us
 * direct access to the store but useSelector is a bit more convenient to use
 * because that allows us to then automatically select a part of our state
 * managed by the store. So I will use useSelector here."
 *
 * | Hook        | What it returns           | When to use                    |
 * |-------------|---------------------------|--------------------------------|
 * | useSelector | A specific piece of state | Most cases - get specific data |
 * | useStore    | The entire store object   | Rare - need store.dispatch()   |
 *
 * CLASS COMPONENTS ALTERNATIVE (Lesson 313):
 * ==========================================
 * INSTRUCTOR QUOTE:
 * "Now if we would be using a class-based component and not a functional
 * component as we are here and as we are in the majority of the course,
 * then there also is a connect function which we could use instead.
 * This function can be used as a wrapper around our class component to
 * connect that class component to the store. I'll come back to that later
 * for the moment we'll focus on useSelector."
 */
import { useSelector } from 'react-redux';

const Counter = () => {
  /**
   * USING useSelector TO READ REDUX STATE (Lesson 313)
   * ===================================================
   * INSTRUCTOR QUOTE:
   * "So here in this functional component we can now get access to the data
   * managed in our store by using useSelector. We call this and now we need
   * to pass a function to useSelector."
   *
   * THE SELECTOR FUNCTION (Lesson 313):
   * ====================================
   * INSTRUCTOR QUOTE:
   * "A function which will be executed by React Redux, a function which then
   * basically determines which piece of data we wanna extract from our store."
   *
   * "For this we should pass a function to it, a function which will receive
   * the state managed by Redux and then we return the part of the state which
   * you wanna extract. So here for example, state.counter."
   *
   * HOW IT WORKS:
   * =============
   * 1. We pass an arrow function: (state) => state.counter
   * 2. React Redux calls this function with the current Redux state
   * 3. We return the specific part of state we need (state.counter)
   * 4. useSelector returns that extracted value
   *
   * WHY SELECTOR FUNCTIONS ARE POWERFUL (Lesson 313):
   * ==================================================
   * INSTRUCTOR QUOTE:
   * "Of course at the moment we have a very simple state. Just an object with
   * a counter property. But in bigger applications, you will have more complex
   * states with tons of different properties maybe nested objects and arrays
   * and therefore being able to just get a slice, just a tiny part of that
   * overall state object in a easy way is worth a lot. And that's what
   * useSelector allows us to do."
   *
   * AUTOMATIC SUBSCRIPTION (Lesson 313):
   * ====================================
   * INSTRUCTOR QUOTE:
   * "Now the great thing is that when you use useSelector, React Redux will
   * automatically set up a subscription to the Redux store for this component.
   * So your component will be updated and will receive the latest counter
   * automatically whenever that data changes in the Redux store."
   *
   * "So it's automatically reactive and changes to the Redux store will cause
   * this component function to be re-executed. So you always have the latest
   * counter. That's why useSelector is a very useful hook and why it is the
   * hook we use for getting data out of the store."
   *
   * AUTOMATIC CLEANUP (Lesson 313):
   * ===============================
   * INSTRUCTOR QUOTE:
   * "If you ever would unmount this component, if it would be removed from
   * the DOM for whatever reason, React Redux would also automatically clear
   * the subscription for you. So it manages that subscription for you behind
   * the scenes."
   *
   * This is similar to how useEffect cleanup works - you don't need to
   * manually unsubscribe when the component unmounts.
   */
  const counter = useSelector((state) => state.counter);

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {/*
        DISPLAYING THE REDUX STATE (Lesson 313)
        ========================================
        INSTRUCTOR QUOTE:
        "Now that we got this counter, we can use it down there, to output
        the counter value like this. And if we now save this, we therefore
        now see zero here. And that's how we can get access to data managed
        by Redux."

        The counter variable contains the current value from Redux store.
        It will automatically update whenever the store state changes.
      */}
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

/**
 * ============================================================================
 * SUMMARY - LESSON 313 WORKFLOW
 * ============================================================================
 *
 * 1. IMPORT useSelector:
 *    import { useSelector } from 'react-redux';
 *
 * 2. CALL useSelector WITH A SELECTOR FUNCTION:
 *    const counter = useSelector((state) => state.counter);
 *
 *    The selector function:
 *    - Receives the entire Redux state as a parameter
 *    - Returns the specific piece of state you need
 *    - Is called by React Redux automatically
 *
 * 3. USE THE VALUE IN YOUR JSX:
 *    <div>{counter}</div>
 *
 * AUTOMATIC FEATURES:
 * ===================
 * | Feature              | What React Redux does automatically         |
 * |----------------------|---------------------------------------------|
 * | Subscription         | Sets up store subscription on mount         |
 * | Re-rendering         | Re-renders component when selected data changes |
 * | Cleanup              | Clears subscription on unmount              |
 *
 * SELECTOR FUNCTION EXAMPLES:
 * ===========================
 * // Simple property access
 * const counter = useSelector(state => state.counter);
 *
 * // Nested property access
 * const userName = useSelector(state => state.user.profile.name);
 *
 * // Computed/derived values
 * const doubleCounter = useSelector(state => state.counter * 2);
 *
 * // Array filtering
 * const completedTodos = useSelector(state =>
 *   state.todos.filter(todo => todo.completed)
 * );
 *
 * HOOKS VS CLASS COMPONENTS:
 * ==========================
 * | Approach      | For Component Type | How to use                   |
 * |---------------|--------------------|-----------------------------|
 * | useSelector   | Functional         | Hook inside component       |
 * | connect()     | Class-based        | HOC wrapping component      |
 *
 * NEXT STEPS (Upcoming Lessons):
 * ==============================
 * - Use useDispatch() to dispatch actions and change the counter
 * - Implement increment and decrement functionality
 */
