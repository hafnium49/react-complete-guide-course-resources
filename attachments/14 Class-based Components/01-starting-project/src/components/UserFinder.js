// =============================================================================
// LIFECYCLE METHODS IN ACTION
// =============================================================================
// This file demonstrates the THREE most important lifecycle methods:
// 1. componentDidMount()    - Initial setup (HTTP requests, subscriptions)
// 2. componentDidUpdate()   - React to state/props changes
// 3. componentWillUnmount() - Cleanup (shown in User.js)
//
// We've converted the functional component to class-based to show how
// useEffect maps to these lifecycle methods.
// =============================================================================

// =============================================================================
// THE COMPONENT LIFECYCLE DIAGRAM
// =============================================================================
//
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │                         COMPONENT LIFECYCLE                             │
//   ├─────────────────────────────────────────────────────────────────────────┤
//   │                                                                         │
//   │   1. MOUNTING (Component is created and inserted into DOM)              │
//   │      └── constructor() → render() → componentDidMount()                 │
//   │                                                                         │
//   │   2. UPDATING (State or props change triggers re-render)                │
//   │      └── render() → componentDidUpdate(prevProps, prevState)            │
//   │                                                                         │
//   │   3. UNMOUNTING (Component is removed from DOM)                         │
//   │      └── componentWillUnmount()                                         │
//   │                                                                         │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// =============================================================================

// =============================================================================
// MENTAL MODEL COMPARISON
// =============================================================================
//
// useEffect Mental Model:
// "When THIS dependency changes, run THIS code"
// - You think about WHAT data triggers the effect
// - Dependencies automatically prevent unnecessary runs
// - Simple and declarative
//
// Lifecycle Methods Mental Model:
// "WHEN is this method called, and WHAT should I do?"
// - You think about WHEN in the lifecycle to run code
// - YOU must add if-checks to prevent unnecessary updates
// - More explicit control, but more boilerplate
//
// =============================================================================

import { Fragment, Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';

// -----------------------------------------------------------------------------
// Imagine this data is fetched from a server/database
// -----------------------------------------------------------------------------
const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

// =============================================================================
// CLASS-BASED COMPONENT with Lifecycle Methods
// =============================================================================
class UserFinder extends Component {
  // ===========================================================================
  // CONSTRUCTOR - Initialize State
  // ===========================================================================
  constructor() {
    super(); // MUST call super() first!

    // -------------------------------------------------------------------------
    // State Initialization
    // -------------------------------------------------------------------------
    // Notice: filteredUsers starts as EMPTY array []
    // This simulates a real-world scenario where data is fetched from a server.
    // The data will be loaded in componentDidMount().
    //
    // Functional equivalent:
    //   const [filteredUsers, setFilteredUsers] = useState([]);
    //   const [searchTerm, setSearchTerm] = useState('');
    // -------------------------------------------------------------------------
    this.state = {
      filteredUsers: [], // Empty initially - will be loaded in componentDidMount
      searchTerm: '',
    };
  }

  // ===========================================================================
  // componentDidMount() - MOUNTING PHASE
  // ===========================================================================
  // Called ONCE after the component is first rendered to the DOM.
  // This is the perfect place to:
  // - Send HTTP requests to fetch data
  // - Set up subscriptions
  // - Initialize third-party libraries
  //
  // FUNCTIONAL EQUIVALENT:
  //   useEffect(() => {
  //     // fetch data here...
  //   }, []);  // ← Empty dependency array = runs once on mount
  //
  // KEY POINT: componentDidMount only runs ONCE when the component is first
  // inserted into the DOM. If the component re-renders due to state changes,
  // componentDidMount will NOT run again - componentDidUpdate will.
  // ===========================================================================
  componentDidMount() {
    // -------------------------------------------------------------------------
    // Simulating fetching data from a server
    // -------------------------------------------------------------------------
    // In a real app, you would:
    //   fetch('https://api.example.com/users')
    //     .then(response => response.json())
    //     .then(data => this.setState({ filteredUsers: data }));
    //
    // For this demo, we just load the dummy users:
    // -------------------------------------------------------------------------
    this.setState({ filteredUsers: DUMMY_USERS });
  }

  // ===========================================================================
  // componentDidUpdate() - UPDATING PHASE
  // ===========================================================================
  // Called EVERY TIME the component re-renders (after state or props change).
  //
  // CRITICAL: Receives two arguments:
  //   - prevProps: The props BEFORE the update
  //   - prevState: The state BEFORE the update
  //
  // These allow you to compare previous vs current values to decide
  // whether to run certain logic.
  //
  // FUNCTIONAL EQUIVALENT:
  //   useEffect(() => {
  //     // filter users...
  //   }, [searchTerm]);  // ← Dependency array handles the comparison for you!
  // ===========================================================================
  componentDidUpdate(prevProps, prevState) {
    // -------------------------------------------------------------------------
    // ⚠️ WARNING: INFINITE LOOP PREVENTION ⚠️
    // -------------------------------------------------------------------------
    // componentDidUpdate runs EVERY time the component updates.
    // If you call setState() inside without a condition, you create an
    // INFINITE LOOP:
    //
    //   componentDidUpdate() {
    //     this.setState({ ... });  // ❌ INFINITE LOOP!
    //   }
    //
    // Why? Because:
    // 1. setState() triggers a re-render
    // 2. Re-render calls componentDidUpdate()
    // 3. componentDidUpdate() calls setState()
    // 4. Go to step 1... forever!
    //
    // SOLUTION: Add an IF check to only run when the specific state you
    // care about has changed.
    // -------------------------------------------------------------------------

    // -------------------------------------------------------------------------
    // Compare PREVIOUS state with CURRENT state
    // -------------------------------------------------------------------------
    // Only filter users if searchTerm actually changed.
    // If something else changed (like filteredUsers), skip this logic.
    //
    // Note: Compare prevSTATE, not prevPROPS!
    // - Use prevState when reacting to state changes within this component
    // - Use prevProps when reacting to prop changes from parent component
    // -------------------------------------------------------------------------
    if (prevState.searchTerm !== this.state.searchTerm) {
      // Only runs when searchTerm changed, preventing infinite loop
      this.setState({
        filteredUsers: DUMMY_USERS.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }

    // -------------------------------------------------------------------------
    // WHY useEffect IS NICER
    // -------------------------------------------------------------------------
    // With useEffect, you don't need this if-check because the dependency
    // array handles it automatically:
    //
    //   useEffect(() => {
    //     setFilteredUsers(DUMMY_USERS.filter(...));
    //   }, [searchTerm]);  // React only runs this when searchTerm changes
    //
    // The dependency array is like a built-in if-check!
    // -------------------------------------------------------------------------
  }

  // ===========================================================================
  // Event Handler Method
  // ===========================================================================
  // Updates the searchTerm state when user types in the input.
  // Remember: setState MERGES the new state, so filteredUsers won't be lost.
  // ===========================================================================
  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  // ===========================================================================
  // RENDER METHOD
  // ===========================================================================
  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          {/* Remember to bind 'this' for event handlers! */}
          <input type='search' onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <Users users={this.state.filteredUsers} />
      </Fragment>
    );
  }
}

// =============================================================================
// ORIGINAL FUNCTIONAL COMPONENT (for comparison)
// =============================================================================
// Notice how much simpler useEffect is compared to lifecycle methods:
// - No need to check if state changed (dependency array handles it)
// - One useEffect can replace both componentDidMount AND componentDidUpdate
// - Less code, easier to understand
// =============================================================================
// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');
//
//   // This single useEffect replaces BOTH componentDidMount AND componentDidUpdate!
//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);  // ← Dependency array = automatic if-check
//
//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };
//
//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type='search' onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

// =============================================================================
// SUMMARY: Lifecycle Methods vs useEffect
// =============================================================================
//
// | Lifecycle Method      | useEffect Equivalent              | Purpose        |
// |-----------------------|-----------------------------------|----------------|
// | componentDidMount()   | useEffect(..., [])                | Initial setup  |
// | componentDidUpdate()  | useEffect(..., [deps])            | React to       |
// |   + if-check          |   (deps array is the if-check)    | changes        |
// | componentWillUnmount()| useEffect cleanup function        | Cleanup        |
//
// KEY INSIGHTS:
// 1. useEffect with deps combines componentDidMount + componentDidUpdate
// 2. useEffect's dependency array is like an automatic if-check
// 3. Lifecycle methods require explicit if-checks to prevent infinite loops
// 4. The functional approach is more concise but both achieve the same result
//
// =============================================================================

export default UserFinder;
