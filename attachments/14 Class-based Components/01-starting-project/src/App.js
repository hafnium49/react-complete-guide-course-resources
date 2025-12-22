// =============================================================================
// APP COMPONENT - Context Provider Setup
// =============================================================================
// This app demonstrates how to use React Context with class-based components.
//
// Context allows us to share data across the component tree without passing
// props through every level (avoiding "prop drilling").
//
// Key changes in this file:
// 1. Import the UsersContext we created
// 2. Move DUMMY_USERS data here (it will be provided via context)
// 3. Wrap UserFinder with <UsersContext.Provider>
// =============================================================================

// =============================================================================
// WHY MOVE DUMMY_USERS TO APP.JS?
// =============================================================================
//
// Previously, DUMMY_USERS was defined inside UserFinder.js.
// Now we're moving it to App.js because:
//
// 1. In a real app, this data would come from a server/API
// 2. App.js is typically where you fetch or receive "global" data
// 3. The data is then SHARED via Context to any component that needs it
// 4. This is a more realistic data flow pattern
//
// Think of it like this:
//   - App.js is the "data source" (Provider)
//   - UserFinder.js is the "data consumer" (uses static contextType)
//
// =============================================================================

import UserFinder from './components/UserFinder';
import UsersContext from './store/users-context';

// =============================================================================
// DATA THAT WILL BE PROVIDED VIA CONTEXT
// =============================================================================
// This data would typically come from:
// - An HTTP request to your backend
// - A database
// - Local storage
// - etc.
//
// For this demo, we use dummy data.
// =============================================================================
const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

// =============================================================================
// APP COMPONENT
// =============================================================================
function App() {
  // ---------------------------------------------------------------------------
  // Create the context value object
  // ---------------------------------------------------------------------------
  // This object will be passed to ALL components that consume UsersContext.
  // It matches the shape we defined in users-context.js:
  //   { users: [] }
  //
  // You can add more properties here as needed (functions, other data, etc.)
  // ---------------------------------------------------------------------------
  const usersContext = {
    users: DUMMY_USERS
  };

  // ---------------------------------------------------------------------------
  // THE PROVIDER PATTERN
  // ---------------------------------------------------------------------------
  // <UsersContext.Provider value={...}> wraps components that need access.
  //
  // ANY component inside this Provider can access the context value.
  // They don't need to receive it as props - they can read it directly!
  //
  // The "value" prop is REQUIRED on the Provider.
  // This is the actual data that will be shared.
  // ---------------------------------------------------------------------------

  return (
    // =========================================================================
    // CONTEXT PROVIDER
    // =========================================================================
    // Everything inside <UsersContext.Provider> can access the context.
    //
    // The value prop contains the data we're sharing:
    // - usersContext.users = array of user objects
    //
    // Components access this via:
    // - FUNCTIONAL: const ctx = useContext(UsersContext); ctx.users
    // - CLASS-BASED: this.context.users (after setting static contextType)
    // =========================================================================
    <UsersContext.Provider value={usersContext}>
      {/* ---------------------------------------------------------------------
          UserFinder is now INSIDE the Provider, so it can access the context.

          Notice: We're NOT passing users as a prop!
          Instead, UserFinder will access users via this.context.users

          This is the power of Context - no prop drilling needed.
      --------------------------------------------------------------------- */}
      <UserFinder />
    </UsersContext.Provider>
  );
}

// =============================================================================
// CONTEXT PROVIDER HIERARCHY
// =============================================================================
//
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │  <UsersContext.Provider value={usersContext}>                           │
//   │    │                                                                    │
//   │    │  ┌─────────────────────────────────────────────────────────────┐  │
//   │    │  │ <UserFinder>                                                │  │
//   │    │  │   static contextType = UsersContext;                        │  │
//   │    │  │   this.context.users → ['Max', 'Manuel', 'Julie']          │  │
//   │    │  │                                                             │  │
//   │    │  │   ┌─────────────────────────────────────────────────────┐  │  │
//   │    │  │   │ <Users>                                             │  │  │
//   │    │  │   │   Receives filteredUsers as props                   │  │  │
//   │    │  │   │   (UserFinder filters context data first)           │  │  │
//   │    │  │   └─────────────────────────────────────────────────────┘  │  │
//   │    │  └─────────────────────────────────────────────────────────────┘  │
//   │    │                                                                    │
//   └────┴────────────────────────────────────────────────────────────────────┘
//
// Notice: UserFinder accesses context, then passes filtered data to Users.
// This is a common pattern - not every component needs direct context access.
//
// =============================================================================

// =============================================================================
// IMPORTANT: PROVIDER VALUE UPDATES
// =============================================================================
//
// If the Provider's value changes, ALL consuming components will re-render!
//
// For example, if we changed DUMMY_USERS to come from state:
//
//   const [users, setUsers] = useState(DUMMY_USERS);
//   const usersContext = { users, setUsers };  // Include setter function too!
//
//   <UsersContext.Provider value={usersContext}>
//
// Now if setUsers is called anywhere:
// 1. App re-renders with new users
// 2. New value is passed to Provider
// 3. ALL components consuming UsersContext re-render with new data
//
// This makes Context great for "global" state that many components need.
//
// =============================================================================

export default App;
