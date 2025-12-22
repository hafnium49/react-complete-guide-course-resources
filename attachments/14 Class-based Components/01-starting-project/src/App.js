// =============================================================================
// APP COMPONENT - Component Lifecycle Demo
// =============================================================================
// This app now uses UserFinder which demonstrates:
// 1. useEffect in functional components
// 2. Component lifecycle methods in class-based components
//    - componentDidMount()
//    - componentDidUpdate()
//    - componentWillUnmount()
// =============================================================================

import UserFinder from './components/UserFinder';

function App() {
  return (
    <div>
      {/* ---------------------------------------------------------------------
          UserFinder contains:
          - A search input for filtering users
          - Uses useEffect to filter users when search term changes
          - Passes filtered users to Users component via props

          The UserFinder component is currently FUNCTIONAL.
          The next step is to convert it to a CLASS-BASED component
          to learn about lifecycle methods!
      --------------------------------------------------------------------- */}
      <UserFinder />
    </div>
  );
}

export default App;
