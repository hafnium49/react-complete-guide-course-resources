// =============================================================================
// USING CONTEXT IN CLASS-BASED COMPONENTS
// =============================================================================
// This file demonstrates how to CONSUME React Context in a class-based
// component using the `static contextType` property.
//
// KEY CONCEPT: In class-based components, you CANNOT use the useContext() hook!
// Instead, you use one of two approaches:
//   1. static contextType = MyContext  (what we use here - simpler)
//   2. <MyContext.Consumer>            (more flexible, can use multiple contexts)
//
// We'll use static contextType because it's cleaner and gives us access to
// context in ALL lifecycle methods (not just render).
// =============================================================================

// =============================================================================
// STATIC CONTEXTTYPE - THE KEY TO CLASS-BASED CONTEXT
// =============================================================================
//
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │  static contextType = UsersContext;                                     │
//   ├─────────────────────────────────────────────────────────────────────────┤
//   │                                                                         │
//   │  What "static" means:                                                   │
//   │  - It's a CLASS-level property, not an INSTANCE property               │
//   │  - It belongs to the class itself, not to individual objects           │
//   │  - React reads this to know which context to connect                   │
//   │                                                                         │
//   │  What happens when you set it:                                          │
//   │  - React automatically finds the nearest Provider for this context     │
//   │  - It stores the Provider's value in this.context                      │
//   │  - this.context is available in ALL lifecycle methods                  │
//   │                                                                         │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// =============================================================================

// =============================================================================
// LIMITATION: ONLY ONE CONTEXT PER CLASS!
// =============================================================================
//
//   ❌ CANNOT do this in class-based components:
//   ─────────────────────────────────────────────────────────────────────────
//   static contextType = UsersContext;
//   static contextType = ThemeContext;  // ERROR! This overwrites the first one!
//
//   ✅ In FUNCTIONAL components, you CAN use multiple contexts:
//   ─────────────────────────────────────────────────────────────────────────
//   const usersCtx = useContext(UsersContext);   // First context
//   const themeCtx = useContext(ThemeContext);   // Second context ✓
//
//   This is one reason why functional components with hooks are preferred!
//
//   WORKAROUND for class-based components needing multiple contexts:
//   Use <Context.Consumer> components (render props pattern) instead.
//
// =============================================================================

import { Fragment, Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';

// =============================================================================
// IMPORT ERROR BOUNDARY
// =============================================================================
// ErrorBoundary is a class-based component that catches JavaScript errors
// in its child components. We wrap components that might throw errors with it.
//
// Key points:
// - Error Boundaries MUST be class-based (no functional equivalent exists!)
// - They catch errors in render, lifecycle methods, and constructors
// - They do NOT catch errors in event handlers (use try-catch for those)
// =============================================================================
import ErrorBoundary from './ErrorBoundary';

// =============================================================================
// IMPORT THE CONTEXT
// =============================================================================
// We need to import the Context object to:
// 1. Set it as our static contextType
// 2. This connects our class to the context system
// =============================================================================
import UsersContext from '../store/users-context';

// =============================================================================
// NOTICE: DUMMY_USERS IS GONE!
// =============================================================================
// Previously, we had:
//   const DUMMY_USERS = [
//     { id: 'u1', name: 'Max' },
//     { id: 'u2', name: 'Manuel' },
//     { id: 'u3', name: 'Julie' },
//   ];
//
// Now this data comes from Context (provided by App.js).
// We access it via this.context.users instead of the local constant.
//
// This simulates a more realistic scenario where data is:
// - Fetched at the app level (App.js)
// - Shared via Context to components that need it
// - Components don't need to know WHERE the data comes from
// =============================================================================

// =============================================================================
// CLASS-BASED COMPONENT with Context
// =============================================================================
class UserFinder extends Component {
  // ===========================================================================
  // STATIC CONTEXTTYPE - CONNECT TO CONTEXT
  // ===========================================================================
  // This single line connects this class to UsersContext!
  //
  // After setting this:
  // - React finds the nearest <UsersContext.Provider> in the component tree
  // - The Provider's value is stored in this.context
  // - You can access this.context anywhere in the class
  //
  // FUNCTIONAL EQUIVALENT:
  //   const ctx = useContext(UsersContext);  // ctx = this.context
  //
  // The "static" keyword means this is a property of the CLASS itself,
  // not of individual instances. React reads it to set up the context connection.
  // ===========================================================================
  static contextType = UsersContext;

  // ===========================================================================
  // ALTERNATIVE SYNTAX (same result)
  // ===========================================================================
  // You could also set contextType outside the class:
  //
  //   class UserFinder extends Component { ... }
  //   UserFinder.contextType = UsersContext;  // Same effect!
  //
  // The static syntax inside the class is cleaner and more common.
  // ===========================================================================

  // ===========================================================================
  // CONSTRUCTOR - Initialize State
  // ===========================================================================
  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: '',
    };
  }

  // ===========================================================================
  // componentDidMount() - USE CONTEXT DATA
  // ===========================================================================
  // Now we use this.context.users instead of DUMMY_USERS!
  //
  // this.context contains whatever value was passed to the Provider:
  //   <UsersContext.Provider value={{ users: DUMMY_USERS }}>
  //
  // So this.context = { users: [...] }
  // And this.context.users = the array of user objects
  //
  // IMPORTANT: this.context is available here because we set static contextType.
  // Without that, this.context would be undefined!
  // ===========================================================================
  componentDidMount() {
    // -------------------------------------------------------------------------
    // BEFORE (with local DUMMY_USERS):
    //   this.setState({ filteredUsers: DUMMY_USERS });
    //
    // AFTER (with Context):
    //   this.setState({ filteredUsers: this.context.users });
    //
    // The data now comes from the Provider, not a local constant!
    // -------------------------------------------------------------------------
    this.setState({ filteredUsers: this.context.users });
  }

  // ===========================================================================
  // componentDidUpdate() - STILL USES CONTEXT
  // ===========================================================================
  // We also use this.context.users here for filtering.
  //
  // The context is available in ALL lifecycle methods:
  // - constructor (but not recommended - use componentDidMount instead)
  // - componentDidMount ✓
  // - componentDidUpdate ✓
  // - componentWillUnmount ✓
  // - render ✓
  //
  // This is an advantage of static contextType over <Context.Consumer>,
  // which only gives you access to context in the render method.
  // ===========================================================================
  componentDidUpdate(prevProps, prevState) {
    // -------------------------------------------------------------------------
    // Same logic as before, but with this.context.users
    // -------------------------------------------------------------------------
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        // BEFORE: DUMMY_USERS.filter(...)
        // AFTER:  this.context.users.filter(...)
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  // ===========================================================================
  // Event Handler
  // ===========================================================================
  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  // ===========================================================================
  // RENDER METHOD
  // ===========================================================================
  render() {
    // -------------------------------------------------------------------------
    // You can also access this.context in render():
    //   console.log('Context users:', this.context.users);
    // -------------------------------------------------------------------------
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type='search' onChange={this.searchChangeHandler.bind(this)} />
        </div>
        {/* -------------------------------------------------------------------
            ERROR BOUNDARY WRAPPER
            -------------------------------------------------------------------
            We wrap <Users> with <ErrorBoundary> because Users might throw
            an error (when the users array is empty after filtering).

            Without ErrorBoundary:
            - Error crashes the entire application
            - User sees a blank screen or error message

            With ErrorBoundary:
            - Error is caught by componentDidCatch()
            - ErrorBoundary shows fallback UI ("Something went wrong!")
            - Rest of the application continues to work

            WHY WE CAN'T USE TRY-CATCH HERE:
            ─────────────────────────────────────────────────────────────────
            You might think: "Why not just wrap this in try-catch?"

              try {
                return <Users users={...} />;  // ❌ Doesn't work!
              } catch (error) {
                return <p>Error!</p>;
              }

            This doesn't work because:
            1. JSX is declarative - errors happen DURING rendering
            2. By the time the error occurs, the try-catch is gone
            3. The error bubbles up through React's render tree, not JS call stack

            Error Boundaries are React's solution for catching render errors!
        ------------------------------------------------------------------- */}
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

// =============================================================================
// SUMMARY: CONTEXT IN CLASS-BASED COMPONENTS
// =============================================================================
//
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │  STEP 1: Create Context (users-context.js)                              │
//   │    const UsersContext = React.createContext({ users: [] });             │
//   ├─────────────────────────────────────────────────────────────────────────┤
//   │  STEP 2: Provide Context (App.js)                                       │
//   │    <UsersContext.Provider value={{ users: DUMMY_USERS }}>               │
//   │      <UserFinder />                                                     │
//   │    </UsersContext.Provider>                                             │
//   ├─────────────────────────────────────────────────────────────────────────┤
//   │  STEP 3: Consume Context (this file)                                    │
//   │    static contextType = UsersContext;  // Connect to context            │
//   │    this.context.users                  // Access the data               │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// =============================================================================

// =============================================================================
// COMPARISON: useContext vs static contextType
// =============================================================================
//
//   Functional Component:
//   ─────────────────────────────────────────────────────────────────────────
//   import { useContext } from 'react';
//   import UsersContext from '../store/users-context';
//
//   const UserFinder = () => {
//     const ctx = useContext(UsersContext);
//     // Can call useContext multiple times for different contexts!
//     const theme = useContext(ThemeContext);  // ✓ Works!
//   };
//
//   Class-based Component:
//   ─────────────────────────────────────────────────────────────────────────
//   import UsersContext from '../store/users-context';
//
//   class UserFinder extends Component {
//     static contextType = UsersContext;
//     // Can ONLY have ONE contextType!
//     // static contextType = ThemeContext;  // ❌ Overwrites the first!
//
//     someMethod() {
//       const users = this.context.users;  // Access via this.context
//     }
//   }
//
// KEY DIFFERENCES:
// 1. useContext can be called multiple times (multiple contexts)
// 2. static contextType only works with ONE context
// 3. Both give you access to the same context value
// 4. This is why functional components are generally preferred today!
//
// =============================================================================

// =============================================================================
// ORIGINAL FUNCTIONAL COMPONENT (for reference)
// =============================================================================
// const UserFinder = () => {
//   const usersCtx = useContext(UsersContext);  // ← The hook way!
//   const [filteredUsers, setFilteredUsers] = useState(usersCtx.users);
//   const [searchTerm, setSearchTerm] = useState('');
//
//   useEffect(() => {
//     setFilteredUsers(
//       usersCtx.users.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm, usersCtx.users]);
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

export default UserFinder;
