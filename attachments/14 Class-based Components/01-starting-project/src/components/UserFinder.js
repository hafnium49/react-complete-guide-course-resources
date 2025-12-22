// =============================================================================
// COMPONENT LIFECYCLE & SIDE EFFECTS
// =============================================================================
// This file introduces the COMPONENT LIFECYCLE concept and demonstrates how
// useEffect in functional components relates to lifecycle methods in class-based
// components. This is the FUNCTIONAL version - we'll convert it to class-based
// to learn about lifecycle methods.
// =============================================================================

// =============================================================================
// THE COMPONENT LIFECYCLE
// =============================================================================
// Every React component goes through a lifecycle:
//
// 1. MOUNTING    - Component is created and inserted into the DOM
// 2. UPDATING    - Component re-renders due to state/props changes
// 3. UNMOUNTING  - Component is removed from the DOM
//
// Class-based components have special methods to hook into these phases:
//
// ┌─────────────────────────────────────────────────────────────────────────┐
// │                    LIFECYCLE METHODS OVERVIEW                           │
// ├─────────────────────────────────────────────────────────────────────────┤
// │                                                                         │
// │  componentDidMount()     → Called ONCE when component is first mounted  │
// │                            (inserted into DOM)                          │
// │                                                                         │
// │  componentDidUpdate()    → Called EVERY TIME component re-renders       │
// │                            (after state or props change)                │
// │                                                                         │
// │  componentWillUnmount()  → Called ONCE right before component is        │
// │                            removed from DOM (cleanup)                   │
// │                                                                         │
// └─────────────────────────────────────────────────────────────────────────┘
//
// =============================================================================

// =============================================================================
// useEffect vs LIFECYCLE METHODS - The Equivalents
// =============================================================================
//
// FUNCTIONAL (useEffect)                    CLASS-BASED (Lifecycle Methods)
// ─────────────────────────────────────────────────────────────────────────────
//
// useEffect(() => {                         componentDidMount() {
//   // runs on mount                          // runs on mount
// }, []);  ← empty array!                   }
//
// ─────────────────────────────────────────────────────────────────────────────
//
// useEffect(() => {                         componentDidUpdate(prevProps, prevState) {
//   // runs when deps change                  if (this.state.x !== prevState.x) {
// }, [dep1, dep2]);                             // runs when state.x changes
//                                            }
//                                          }
//
// ─────────────────────────────────────────────────────────────────────────────
//
// useEffect(() => {                         componentWillUnmount() {
//   return () => {                            // cleanup before unmount
//     // cleanup function                   }
//   };
// }, []);
//
// =============================================================================

import { Fragment, useState, useEffect } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';

// -----------------------------------------------------------------------------
// DUMMY_USERS moved here from Users.js
// -----------------------------------------------------------------------------
// The Users component will now receive users via props, making it more
// reusable and allowing us to filter the users in this parent component.
// -----------------------------------------------------------------------------
const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

// =============================================================================
// FUNCTIONAL COMPONENT with useEffect
// =============================================================================
// This is the starting point. We'll convert this to a class-based component
// to learn how lifecycle methods work.
// =============================================================================
const UserFinder = () => {
  // ---------------------------------------------------------------------------
  // Multiple state slices (functional component style)
  // ---------------------------------------------------------------------------
  // In class-based components, these would be combined into one state object:
  // this.state = { filteredUsers: DUMMY_USERS, searchTerm: '' };
  // ---------------------------------------------------------------------------
  const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  // ---------------------------------------------------------------------------
  // useEffect - The functional component way to handle side effects
  // ---------------------------------------------------------------------------
  // This useEffect has [searchTerm] as a dependency, which means:
  // - It runs ONCE when component mounts (initial render)
  // - It runs AGAIN whenever searchTerm changes
  //
  // CLASS-BASED EQUIVALENT:
  // This is equivalent to using BOTH:
  // 1. componentDidMount() - for the initial run
  // 2. componentDidUpdate() - for subsequent runs when searchTerm changes
  //
  // In a class-based component, you'd write:
  //
  //   componentDidMount() {
  //     // Filter users on initial mount
  //     this.setState({
  //       filteredUsers: DUMMY_USERS.filter(user =>
  //         user.name.includes(this.state.searchTerm)
  //       )
  //     });
  //   }
  //
  //   componentDidUpdate(prevProps, prevState) {
  //     // Only run if searchTerm actually changed
  //     if (prevState.searchTerm !== this.state.searchTerm) {
  //       this.setState({
  //         filteredUsers: DUMMY_USERS.filter(user =>
  //           user.name.includes(this.state.searchTerm)
  //         )
  //       });
  //     }
  //   }
  //
  // As you can see, useEffect is more concise!
  // ---------------------------------------------------------------------------
  useEffect(() => {
    setFilteredUsers(
      DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
    );
  }, [searchTerm]); // ← Dependency array: effect re-runs when searchTerm changes

  // ---------------------------------------------------------------------------
  // Event handler
  // ---------------------------------------------------------------------------
  // In a class-based component, this would be a method:
  //   searchChangeHandler(event) { ... }
  // And you'd need to bind 'this': onChange={this.searchChangeHandler.bind(this)}
  // ---------------------------------------------------------------------------
  const searchChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  // ---------------------------------------------------------------------------
  // JSX Return
  // ---------------------------------------------------------------------------
  // Fragment allows returning multiple elements without a wrapper div.
  // In class-based components, this would be inside the render() method.
  // ---------------------------------------------------------------------------
  return (
    <Fragment>
      <div className={classes.finder}>
        <input type='search' onChange={searchChangeHandler} />
      </div>
      {/* Users now receives filtered users via props */}
      <Users users={filteredUsers} />
    </Fragment>
  );
};

// =============================================================================
// NEXT STEP: Converting to Class-Based Component
// =============================================================================
// To convert this to a class-based component, we'll need to:
//
// 1. Import Component instead of useState/useEffect
// 2. Create a class that extends Component
// 3. Add constructor with this.state = { filteredUsers, searchTerm }
// 4. Replace useEffect with lifecycle methods:
//    - componentDidMount() for initial setup
//    - componentDidUpdate() for reacting to state changes
// 5. Add render() method with the JSX
// 6. Bind event handlers or use arrow functions
//
// The key insight is that useEffect with dependencies combines the
// functionality of componentDidMount AND componentDidUpdate!
// =============================================================================

export default UserFinder;
