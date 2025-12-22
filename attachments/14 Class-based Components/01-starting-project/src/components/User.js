// =============================================================================
// CLASS-BASED COMPONENTS IN REACT
// =============================================================================
// This file demonstrates how to convert a functional component to a class-based
// component. Class-based components were the primary way to build React components
// before React 16.8 introduced Hooks.
// =============================================================================

// -----------------------------------------------------------------------------
// STEP 1: Import Component from React
// -----------------------------------------------------------------------------
// To make a class work as a React component, we must import and extend 'Component'
// from React. This is NOT needed for functional components, only for class-based.
// The Component class provides important functionality like:
// - The render() method capability
// - Access to this.props
// - Access to this.state (covered in later lessons)
// - Lifecycle methods (componentDidMount, componentDidUpdate, etc.)
import { Component } from 'react';

import classes from './User.module.css';

// -----------------------------------------------------------------------------
// STEP 2: Define the class using the 'class' keyword
// -----------------------------------------------------------------------------
// The 'class' keyword is a built-in JavaScript feature (ES6+), NOT a React concept.
// Syntax: class ClassName extends Component { ... }
//
// 'extends Component' means our User class INHERITS from React's Component class.
// This inheritance is what gives our class the ability to:
// - Be recognized as a React component
// - Access this.props automatically
// - Use lifecycle methods
// - Manage state (covered later)
class User extends Component {
  // ===========================================================================
  // componentWillUnmount() - UNMOUNTING PHASE
  // ===========================================================================
  // Called ONCE right before the component is removed from the DOM.
  // This is the perfect place to:
  // - Cancel HTTP requests
  // - Remove event listeners
  // - Clear timers (clearTimeout, clearInterval)
  // - Clean up subscriptions
  //
  // FUNCTIONAL EQUIVALENT:
  //   useEffect(() => {
  //     return () => {
  //       // This cleanup function runs before unmount
  //       console.log('User will unmount!');
  //     };
  //   }, []);
  //
  // WHY IS THIS IMPORTANT?
  // The User component is rendered inside the Users list, which is
  // conditionally rendered based on showUsers state. When "Hide Users"
  // is clicked, all User components are REMOVED from the DOM, and
  // componentWillUnmount is called for EACH User instance.
  //
  // Try clicking "Hide Users" and check the console - you'll see
  // "User will unmount!" logged THREE times (once for each user).
  // ===========================================================================
  componentWillUnmount() {
    console.log('User will unmount!');
    // In a real app, you might:
    // - clearTimeout(this.timer);
    // - this.subscription.unsubscribe();
    // - window.removeEventListener('resize', this.handleResize);
  }

  // ---------------------------------------------------------------------------
  // OPTIONAL: Constructor method
  // ---------------------------------------------------------------------------
  // You CAN add a constructor for initialization work:
  //
  // constructor(props) {
  //   super(props); // MUST call super(props) first!
  //   // initialization work here...
  // }
  //
  // In this simple component, we don't need a constructor since we have no
  // initialization work to do. The constructor becomes important when you
  // need to initialize state (covered in the next lesson).
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // STEP 3: Add the render() method
  // ---------------------------------------------------------------------------
  // The render() method is REQUIRED in every class-based component.
  // React will call this method automatically when:
  // - The component is first mounted
  // - The component's state or props change
  //
  // Think of render() as the equivalent to the return statement in a
  // functional component. Whatever you return here gets rendered to the DOM.
  //
  // IMPORTANT: render() must return JSX (or null).
  render() {
    // -------------------------------------------------------------------------
    // STEP 4: Access props using this.props
    // -------------------------------------------------------------------------
    // In functional components: props are passed as a parameter → props.name
    // In class-based components: props are accessed via this.props → this.props.name
    //
    // The 'this.props' property is available because we extended Component.
    // It contains all the props data passed to this component.
    // -------------------------------------------------------------------------
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

// =============================================================================
// ORIGINAL FUNCTIONAL COMPONENT (for comparison)
// =============================================================================
// Notice how the functional component is more concise - this is one of the
// main reasons why functional components have become more popular.
// However, both approaches produce the exact same result!
// =============================================================================
// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

// =============================================================================
// KEY TAKEAWAYS:
// =============================================================================
// 1. Class-based and functional components can work TOGETHER in the same app.
//    - Users.js (functional) renders User.js (class-based) - no problem!
//    - A class-based component can also render functional components.
//
// 2. In reality, you'll typically stick to ONE approach throughout a project.
//    Mixing is usually done when:
//    - Working on existing codebases with legacy class-based components
//    - Gradually migrating from class-based to functional components
//
// 3. For new projects, functional components with Hooks are preferred because:
//    - Less boilerplate code
//    - Easier to read and understand
//    - Hooks provide all the features class components have (and more)
// =============================================================================

export default User;
