/**
 * ============================================================================
 * src/components/Modal.jsx - LESSONS 519 & 520
 * ============================================================================
 *
 * A portal-based modal dialog. It renders a backdrop overlay and a <dialog>
 * element into the #modal div (defined in index.html, separate from #root).
 * Using createPortal ensures the modal overlays the entire page regardless
 * of where it is rendered in the component tree.
 *
 * The <dialog> element is rendered with the `open` attribute, which makes
 * it visible. Clicking the backdrop triggers the onClose callback.
 *
 * ANIMATION OPPORTUNITY: This component is a key target for animations.
 * Currently, the modal and backdrop appear/disappear instantly. Adding
 * fade-in/fade-out or slide transitions will make the experience much
 * smoother. This is one of the cases where CSS-only animations have
 * limitations (animating elements being removed from the DOM is tricky
 * with pure CSS), which is where Framer Motion will help.
 *
 * ============================================================================
 */

import { createPortal } from 'react-dom';

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <dialog open className="modal">
        <h2>{title}</h2>
        {children}
      </dialog>
    </>,
    document.getElementById('modal')
  );
}
