// =============================================================================
// REACT CONTEXT IN CLASS-BASED COMPONENTS
// =============================================================================
// Context provides a way to pass data through the component tree without
// having to pass props down manually at every level ("prop drilling").
//
// In FUNCTIONAL components, we use the useContext() hook.
// In CLASS-BASED components, we use a different approach:
//   1. static contextType = MyContext;   (access ONE context)
//   2. <MyContext.Consumer>              (can access multiple contexts)
//
// This file creates the Context object that will hold our users data.
// =============================================================================

// =============================================================================
// WHAT IS CONTEXT?
// =============================================================================
//
//   Without Context (Prop Drilling):
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │  App (has users data)                                                   │
//   │    └── UserFinder (passes users to Users)                               │
//   │          └── Users (passes user to User)                                │
//   │                └── User (finally uses the data!)                        │
//   └─────────────────────────────────────────────────────────────────────────┘
//
//   With Context (Direct Access):
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │  App (provides users via Context)                                       │
//   │    └── UserFinder (accesses users directly via this.context!)           │
//   │          └── Users                                                      │
//   │                └── User                                                 │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// Context is great for:
// - Theme settings (dark/light mode)
// - User authentication state
// - Language/locale preferences
// - Any "global" data needed by many components
//
// =============================================================================

import React from 'react';

// =============================================================================
// CREATING CONTEXT with React.createContext()
// =============================================================================
// React.createContext() creates a Context object.
//
// The argument is the DEFAULT value. This default is used when a component
// that consumes this context is not wrapped in a Provider.
//
// It's good practice to define the shape of your context here, even if
// the actual values come from the Provider. This helps with:
// - IDE autocompletion
// - Documentation
// - Fallback if Provider is missing
// =============================================================================
const UsersContext = React.createContext({
  // Default value: an empty users array
  // This shape matches what we'll provide in the Provider
  users: []
});

// =============================================================================
// CONTEXT ARCHITECTURE
// =============================================================================
//
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │                      CONTEXT FLOW                                       │
//   ├─────────────────────────────────────────────────────────────────────────┤
//   │                                                                         │
//   │   1. CREATE: React.createContext()                                      │
//   │      └── Creates the Context object (UsersContext)                      │
//   │                                                                         │
//   │   2. PROVIDE: <UsersContext.Provider value={...}>                       │
//   │      └── Wraps components that need access (done in App.js)             │
//   │      └── Sets the actual value to be shared                             │
//   │                                                                         │
//   │   3. CONSUME: Access the provided value                                 │
//   │      ├── Functional: useContext(UsersContext)                           │
//   │      └── Class-based: static contextType = UsersContext                 │
//   │                       then use this.context                             │
//   │                                                                         │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// =============================================================================

// =============================================================================
// TWO WAYS TO CONSUME CONTEXT IN CLASS-BASED COMPONENTS
// =============================================================================
//
// METHOD 1: static contextType (SIMPLER, but limited to ONE context)
// ─────────────────────────────────────────────────────────────────────────────
//
//   class UserFinder extends Component {
//     static contextType = UsersContext;  // Connect to the context
//
//     componentDidMount() {
//       const users = this.context.users;  // Access via this.context
//     }
//   }
//
// PROS:
//   - Clean and simple syntax
//   - this.context is available in all lifecycle methods
//   - Feels "native" to class-based components
//
// CONS:
//   - Can only connect to ONE context per component!
//   - If you need multiple contexts, use the Consumer pattern instead
//
// ─────────────────────────────────────────────────────────────────────────────
//
// METHOD 2: Context.Consumer (MORE FLEXIBLE, can use multiple contexts)
// ─────────────────────────────────────────────────────────────────────────────
//
//   render() {
//     return (
//       <UsersContext.Consumer>
//         {(ctx) => {
//           // ctx.users is available here
//           return <p>{ctx.users.length} users</p>;
//         }}
//       </UsersContext.Consumer>
//     );
//   }
//
// PROS:
//   - Can use multiple contexts (nest Consumers)
//   - Works in both functional and class-based components
//
// CONS:
//   - More verbose syntax (render props pattern)
//   - Context only available in the render method
//
// ─────────────────────────────────────────────────────────────────────────────
//
// RECOMMENDATION: Use static contextType when you only need one context.
// It's cleaner and gives you access to context in ALL lifecycle methods,
// not just render().
//
// =============================================================================

// =============================================================================
// COMPARISON: FUNCTIONAL vs CLASS-BASED CONTEXT USAGE
// =============================================================================
//
// Functional Component:
// ─────────────────────────────────────────────────────────────────────────────
//   import { useContext } from 'react';
//   import UsersContext from '../store/users-context';
//
//   const UserFinder = () => {
//     const ctx = useContext(UsersContext);  // Can call multiple times!
//     const users = ctx.users;
//     // ...
//   };
//
// Class-based Component:
// ─────────────────────────────────────────────────────────────────────────────
//   import UsersContext from '../store/users-context';
//
//   class UserFinder extends Component {
//     static contextType = UsersContext;  // Can only set ONE!
//
//     componentDidMount() {
//       const users = this.context.users;  // Access anywhere via this.context
//     }
//   }
//
// KEY DIFFERENCE:
// - useContext() can be called multiple times for different contexts
// - static contextType can only connect to ONE context
//
// =============================================================================

export default UsersContext;
