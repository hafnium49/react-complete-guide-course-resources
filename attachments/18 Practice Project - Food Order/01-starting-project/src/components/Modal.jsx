/**
 * ============================================================================
 * MODAL COMPONENT - REUSABLE DIALOG OVERLAY
 * ============================================================================
 *
 * This component creates a reusable modal dialog using the native HTML
 * <dialog> element and React Portals.
 *
 * KEY LEARNING OBJECTIVES:
 * ========================
 * 1. Using the native HTML <dialog> element for modals
 * 2. Using React Portals to render outside the component tree
 * 3. Using useRef to access DOM elements
 * 4. Using useEffect for side effects (opening/closing modal)
 * 5. Creating reusable, composable components
 *
 * WHY USE <dialog> ELEMENT?
 * =========================
 * The native <dialog> element provides:
 * - Built-in accessibility features
 * - Proper focus management
 * - Keyboard handling (Escape to close)
 * - Backdrop styling with ::backdrop pseudo-element
 * - No need for third-party modal libraries
 *
 * WHY USE PORTALS?
 * ================
 * Portals let you render children into a different part of the DOM.
 *
 * Problem without portals:
 * - Modal is rendered inside a deeply nested component
 * - CSS z-index issues with parent containers
 * - Modal might be clipped by overflow:hidden ancestors
 *
 * Solution with portals:
 * - Modal renders directly under document.body (in #modal div)
 * - No z-index conflicts with parent components
 * - Always appears on top of everything
 *
 * USAGE:
 * ======
 * <Modal open={isOpen} onClose={handleClose} className="cart">
 *   <h2>Modal Title</h2>
 *   <p>Modal content here</p>
 *   <button onClick={handleClose}>Close</button>
 * </Modal>
 */

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/**
 * MODAL COMPONENT
 * ===============
 * A reusable modal/dialog component.
 *
 * @param {Object} props
 * @param {ReactNode} props.children - Content to display inside the modal
 * @param {boolean} props.open - Whether the modal should be open
 * @param {Function} props.onClose - Callback when modal is closed
 * @param {string} props.className - Additional CSS class(es) for styling
 */
export default function Modal({ children, open, onClose, className = '' }) {
  /**
   * useRef FOR DOM ACCESS
   * =====================
   * We need direct access to the <dialog> element to call its
   * native methods: showModal() and close().
   *
   * useRef creates a persistent reference that:
   * - Survives re-renders (same object every time)
   * - Doesn't cause re-renders when changed
   * - Gives us .current property pointing to the DOM element
   *
   * After the component renders, dialog.current will be the
   * actual <dialog> DOM element.
   */
  const dialog = useRef();

  /**
   * useEffect FOR OPENING/CLOSING
   * =============================
   * This effect synchronizes the modal's open/closed state with the
   * native <dialog> element.
   *
   * WHY USE useEffect?
   * ------------------
   * We need to call DOM methods (showModal, close) AFTER the component
   * renders, which is exactly what useEffect is for.
   *
   * showModal() vs show():
   * ----------------------
   * - showModal(): Opens as modal (with backdrop, traps focus)
   * - show(): Opens as non-modal (no backdrop, doesn't trap focus)
   *
   * We use showModal() because we want:
   * - A dimmed backdrop behind the modal
   * - Focus trapped inside the modal
   * - Escape key to close
   *
   * CLEANUP FUNCTION:
   * -----------------
   * The return function runs when:
   * - Component unmounts
   * - Before re-running the effect (if dependencies change)
   *
   * We call close() to ensure the modal is properly closed.
   * This prevents issues if the modal is open when the component unmounts.
   *
   * DEPENDENCY ARRAY: [open]
   * ------------------------
   * The effect re-runs whenever 'open' changes.
   * - open becomes true → showModal() is called
   * - open becomes false → cleanup runs, close() is called
   */
  useEffect(() => {
    // Store current ref in variable for cleanup function
    const modal = dialog.current;

    if (open) {
      modal.showModal();
    }

    // Cleanup: close the modal
    return () => modal.close();
  }, [open]);

  /**
   * RENDER WITH PORTAL
   * ==================
   * createPortal(element, container) renders the element into the
   * specified container, regardless of where this component is in
   * the React tree.
   *
   * PORTAL TARGET:
   * --------------
   * document.getElementById('modal') finds the <div id="modal"> element
   * that we added to index.html.
   *
   * <body>
   *   <div id="modal"></div>  ← Portal target
   *   <div id="root"></div>   ← Main React app
   * </body>
   *
   * This ensures the modal is rendered at the top level of the DOM,
   * outside of any overflow:hidden or z-index containers.
   */
  return createPortal(
    /**
     * DIALOG ELEMENT
     * ==============
     * The native HTML <dialog> element provides built-in modal behavior.
     *
     * ref={dialog}:
     * - Connects our useRef to this DOM element
     * - Allows us to call dialog.current.showModal() etc.
     *
     * className={`modal ${className}`}:
     * - Always includes "modal" class for base styling
     * - Adds any additional classes passed as prop (e.g., "cart")
     * - Template literal allows combining multiple classes
     *
     * onClose={onClose}:
     * - Native <dialog> fires "close" event when closed
     * - This happens when:
     *   - User presses Escape key
     *   - Our code calls dialog.close()
     * - We pass this event to the parent so it can update its state
     *
     * IMPORTANT NOTE ON onClose:
     * --------------------------
     * We conditionally pass onClose in Cart.jsx:
     * onClose={progress === 'cart' ? handleCloseCart : null}
     *
     * This prevents the close handler from firing when switching
     * from cart modal to checkout modal (which would close the
     * checkout modal immediately).
     */
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {/*
        CHILDREN CONTENT
        ================
        Whatever content is passed between <Modal> tags will be
        rendered inside the dialog.

        This makes Modal a "wrapper" or "container" component that
        provides structure while being flexible about content.
      */}
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS
 * ============================================================================
 *
 * NATIVE <dialog> ELEMENT:
 * ========================
 * Modern browsers support the <dialog> element which provides:
 * - showModal(): Opens modal with backdrop
 * - show(): Opens non-modal dialog
 * - close(): Closes the dialog
 * - open attribute: Boolean for open state
 * - ::backdrop pseudo-element for styling the overlay
 *
 * REACT PORTALS:
 * ==============
 * createPortal(element, container) renders React elements into a
 * different DOM container.
 *
 * Benefits:
 * - Escape z-index stacking contexts
 * - Avoid overflow:hidden clipping
 * - Cleaner DOM structure
 * - Events still bubble through React tree
 *
 * useRef FOR DOM ACCESS:
 * ======================
 * useRef is perfect for:
 * - Accessing DOM elements directly
 * - Storing mutable values that don't cause re-renders
 * - Keeping values that persist across renders
 *
 * useEffect FOR SIDE EFFECTS:
 * ===========================
 * useEffect runs after render, perfect for:
 * - DOM manipulation
 * - Subscriptions
 * - Data fetching
 * - Synchronizing with external systems
 *
 * COMPOSABLE DESIGN:
 * ==================
 * This Modal is highly reusable because:
 * - It accepts children (any content works)
 * - It accepts className (any styling works)
 * - It's controlled by props (parent decides open/close)
 * - It notifies parent of close events
 *
 * Used by: Cart.jsx, Checkout.jsx
 */
