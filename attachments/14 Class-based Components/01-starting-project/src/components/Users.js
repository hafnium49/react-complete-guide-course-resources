// =============================================================================
// STATE IN CLASS-BASED COMPONENTS
// =============================================================================
// This file demonstrates how to manage STATE in class-based components.
// Before React 16.8 (Hooks), class-based components were the ONLY way to
// manage state. Understanding this is crucial for working with legacy codebases.
// =============================================================================

// -----------------------------------------------------------------------------
// IMPORTANT: No useState import needed!
// -----------------------------------------------------------------------------
// In class-based components, we CANNOT use React Hooks (useState, useEffect, etc.)
// Hooks are EXCLUSIVELY for functional components.
// Instead, we import Component and use this.state and this.setState()
// -----------------------------------------------------------------------------
import { Component } from 'react';

import User from './User';
import classes from './Users.module.css';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

class Users extends Component {
  // ===========================================================================
  // THE CONSTRUCTOR - State Initialization
  // ===========================================================================
  // The constructor is automatically called when React instantiates this class
  // (i.e., when React encounters <Users /> in JSX).
  // This is where we initialize our state.
  // ===========================================================================
  constructor() {
    // -------------------------------------------------------------------------
    // CRITICAL: Must call super() first!
    // -------------------------------------------------------------------------
    // When extending another class (Component), you MUST call super() in the
    // constructor before doing anything else. This calls the parent class's
    // constructor and sets up the inheritance properly.
    //
    // Error if omitted: "Must call super constructor in derived class"
    // -------------------------------------------------------------------------
    super();

    // -------------------------------------------------------------------------
    // STATE IN CLASS COMPONENTS: Always an Object!
    // -------------------------------------------------------------------------
    // KEY DIFFERENCE from functional components:
    //
    // Functional components (useState):
    //   - State can be ANYTHING: boolean, string, number, array, object
    //   - Multiple useState calls for multiple pieces of state
    //   - const [showUsers, setShowUsers] = useState(true);
    //   - const [otherState, setOtherState] = useState('hello');
    //
    // Class-based components (this.state):
    //   - State is ALWAYS an object
    //   - ALL state pieces are grouped into ONE object
    //   - No matter if they're related or not
    // -------------------------------------------------------------------------
    this.state = {
      showUsers: true,
      // -----------------------------------------------------------------------
      // Example: Multiple state properties in one object
      // -----------------------------------------------------------------------
      // If you need more state, simply add more properties:
      more: 'Test',
      // You can also have nested objects, arrays, etc:
      // nestedState: { foo: 'bar' },
      // arrayState: [1, 2, 3],
      // -----------------------------------------------------------------------
    }; // Only one state object per class component
  }

  // ===========================================================================
  // CLASS METHODS - Event Handlers
  // ===========================================================================
  // In class-based components, event handlers are defined as class methods.
  // NOT inside the render() method (though technically possible, it wouldn't
  // behave correctly due to `this` binding issues).
  //
  // This is the standard way to define a method in a class.
  // ===========================================================================
  toggleUsersHandler() {
    // -------------------------------------------------------------------------
    // WRONG WAY to update state (NEVER do this!):
    // -------------------------------------------------------------------------
    // this.state.showUsers = false; // ❌ NEVER mutate state directly!
    // This won't trigger a re-render and React won't know the state changed.
    // -------------------------------------------------------------------------

    // -------------------------------------------------------------------------
    // CORRECT WAY: Use this.setState()
    // -------------------------------------------------------------------------
    // this.setState() is provided by the Component class we inherit from.
    // It takes either an object OR a function that returns an object.
    //
    // IMPORTANT: setState() MERGES the new state with existing state!
    // This is DIFFERENT from useState's setter which REPLACES the entire state.
    //
    // Example of merging behavior:
    //   Current state: { showUsers: true, more: 'Test' }
    //   this.setState({ showUsers: false })
    //   Result: { showUsers: false, more: 'Test' }  ← 'more' is preserved!
    //
    // With useState, you'd have to manually merge:
    //   setMyState(prev => ({ ...prev, showUsers: false }))
    // -------------------------------------------------------------------------

    // -------------------------------------------------------------------------
    // Using the FUNCTION form of setState (when new state depends on old state)
    // -------------------------------------------------------------------------
    // Just like useState's setter, if your new state depends on the previous
    // state, you should use a function that receives the current state.
    //
    // The function receives current state (curState) and must return an OBJECT
    // (not just a value like with useState).
    //
    // useState version:     setShowUsers(curState => !curState)        // returns boolean
    // Class-based version:  this.setState(curState => ({ showUsers: !curState.showUsers })) // returns object
    // -------------------------------------------------------------------------
    this.setState((curState) => {
      return { showUsers: !curState.showUsers };
    }); // Merges with existing state

    // Alternative: Direct object (only use when NOT depending on previous state)
    // this.setState({ showUsers: false });
  }

  // ===========================================================================
  // THE RENDER METHOD - Required in every class-based component
  // ===========================================================================
  render() {
    // -------------------------------------------------------------------------
    // You can still define helper variables/constants inside render()
    // -------------------------------------------------------------------------
    const usersList = (
      <ul>
        {DUMMY_USERS.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        {/* -------------------------------------------------------------------
            THE 'this' BINDING PROBLEM
            -------------------------------------------------------------------
            In JavaScript, the value of 'this' depends on HOW a function is called,
            not WHERE it's defined. When we pass a method as an event handler,
            'this' inside the method won't refer to our class instance!

            WRONG (won't work):
              onClick={this.toggleUsersHandler}
              → 'this' inside toggleUsersHandler will be undefined!

            CORRECT (with .bind(this)):
              onClick={this.toggleUsersHandler.bind(this)}
              → .bind(this) ensures 'this' inside the method refers to our class

            This is a JavaScript quirk, NOT a React thing. It's not needed in
            functional components because we don't use 'this' at all there.

            Alternative solutions:
            1. Arrow function: onClick={() => this.toggleUsersHandler()}
            2. Bind in constructor: this.toggleUsersHandler = this.toggleUsersHandler.bind(this);
            3. Arrow function as class property (requires Babel plugin):
               toggleUsersHandler = () => { ... }
        ------------------------------------------------------------------- */}
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {/* -----------------------------------------------------------------
              ACCESSING STATE: this.state.propertyName
              -----------------------------------------------------------------
              In functional components:  showUsers (direct variable)
              In class-based components: this.state.showUsers

              .bind(this) is needed above to ensure 'this' is correct
          ----------------------------------------------------------------- */}
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

// =============================================================================
// ORIGINAL FUNCTIONAL COMPONENT (for comparison)
// =============================================================================
// Notice how much simpler the functional component is:
// - No constructor needed
// - No 'this' keyword or binding issues
// - State can be any type (not required to be an object)
// - Multiple useState calls instead of one state object
// =============================================================================
// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);
//
//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);  // Can return boolean directly
//   };
//
//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );
//
//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>   {/* No .bind(this) needed! */}
//         {showUsers ? 'Hide' : 'Show'} Users   {/* Direct variable access */}
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

// =============================================================================
// SUMMARY: Key Differences - State Management
// =============================================================================
//
// | Aspect              | Functional (Hooks)           | Class-based            |
// |---------------------|------------------------------|------------------------|
// | State type          | Can be anything              | Always an object       |
// | Multiple states     | Multiple useState() calls    | One state object       |
// | Initialize state    | useState(initialValue)       | this.state = {...}     |
// | Read state          | stateVariable                | this.state.property    |
// | Update state        | setStateFunction(newValue)   | this.setState({...})   |
// | Update behavior     | REPLACES entire state        | MERGES with old state  |
// | 'this' binding      | Not needed                   | Required (.bind(this)) |
// | Hooks available     | Yes                          | No                     |
//
// =============================================================================

export default Users;
