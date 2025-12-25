// =============================================================================
// HEADER COMPONENT - Simple Branding Header
// =============================================================================
//
// This is a simple presentational component that displays:
//   - The application logo
//   - The application title
//
// It has no state or complex logic - just renders the header UI.
//
// =============================================================================

import logoImg from '../assets/logo.jpg';

export default function Header() {
  return (
    <header>
      {/*
        LOGO IMAGE
        ----------
        We import the image and use it as the src.
        This is handled by Vite's asset bundling.

        The alt text describes the image for:
          - Screen readers (accessibility)
          - When image fails to load
          - SEO purposes
      */}
      <img src={logoImg} alt="A form and a pencil" />

      {/*
        APPLICATION TITLE
        -----------------
        Simple heading identifying this as a React Forms demo.
      */}
      <h1>React Forms</h1>
    </header>
  );
}
