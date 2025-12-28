// =============================================================================
// HEADER COMPONENT
// =============================================================================
// A simple header component that displays the app logo and title.
//
// This component is not directly related to form actions, but it provides
// a consistent header for the application.
// =============================================================================

import logoImg from '../assets/logo.jpg';

export default function Header() {
  return (
    <header>
      <img src={logoImg} alt="A form and a pencil" />
      <h1>React Forms</h1>
    </header>
  );
}
