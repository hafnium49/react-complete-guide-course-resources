/**
 * ============================================================================
 * MODAL COMPONENT - REUSABLE DIALOG OVERLAY (Lesson 292)
 * ============================================================================
 *
 * This component creates a reusable modal dialog using the native HTML
 * <dialog> element and React Portals.
 *
 * LESSON 292 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Using the native HTML <dialog> element for modals
 * 2. Using React Portals to render outside the component tree
 * 3. Using useRef to access DOM elements
 * 4. Using useEffect for side effects (opening/closing modal)
 * 5. Creating reusable, composable components
 *
 * PROJECT PROGRESSION (End of Lesson 291):
 * ========================================
 * The instructor sets up this lesson:
 * "The next step now is to make sure that when we click this cart button,
 * we open up a modal and we show some cart data in that modal."
 *
 * WHY BUILD A REUSABLE MODAL? (Lesson 292)
 * ========================================
 * The instructor explains:
 * "And for that of course we'll need a modal, a component that opens as an
 * overlay on the screen, and I'll build that as a standalone reusable UI
 * component so that we could also use the modal in other places of the app.
 * And we will indeed also use it in one other place later."
 *
 * Used by: Cart.jsx (cart modal), Checkout.jsx (checkout modal)
 *
 * WHY USE <dialog> ELEMENT? (Lesson 292)
 * ======================================
 * The instructor explains:
 * "Now in this modal component function, I want to return built-in dialogue
 * element, which is great for displaying overlays like this, because it
 * handles a lot of the complexity for you."
 *
 * The native <dialog> element provides:
 * - Built-in accessibility features
 * - Proper focus management
 * - Keyboard handling (Escape to close)
 * - Backdrop styling with ::backdrop pseudo-element
 * - No need for third-party modal libraries
 *
 * WHY USE PORTALS? (Lesson 292)
 * =============================
 * The instructor explains the portal concept:
 * "But I wanna output it with help of that portal feature React offers
 * so that we can use this modal component from anywhere in our component
 * tree. But we'll always inject the dialogue when it's visible in a
 * specific area of the Real DOM that we as a developer control upfront."
 *
 * "And I wanna inject it into this div here, with an ID of modal. That's
 * where I wanna inject those dialogue elements when we create and open
 * them with the modal component."
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

/**
 * IMPORTS (Lesson 292)
 * ====================
 * The instructor imports the necessary hooks and portal function:
 *
 * useEffect: For running side effects when the 'open' prop changes
 * "I'll use useEffect here also to, again, practice working with that to,
 * in the end, interact with that native dialogue element whenever the
 * open prop value changes."
 *
 * useRef: For getting a reference to the native dialog element
 * "To do this, we need to get access to the dialogue element. And as you
 * learned, that's something which we can do with help of refs."
 *
 * createPortal: From react-dom to render outside the component tree
 * "We can easily create such a portal with help of the create portal
 * function that's imported from React-dom."
 */
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/**
 * MODAL COMPONENT (Lesson 292)
 * ============================
 * The instructor explains creating this component:
 * "So I'll add my modal JSX file here, and in there I want to export
 * my modal component function."
 *
 * CHILDREN PROP (Lesson 292):
 * ---------------------------
 * The instructor explains:
 * "Now my idea with this modal component then, essentially is that it
 * can be wrapped around any content of our choice to put that content
 * into the dialogue. And therefore I'll accept and destructure the
 * children prop and pass that between the dialogue elements."
 *
 * OPEN PROP (Lesson 292):
 * -----------------------
 * The instructor explains:
 * "In addition here, I wanna make sure that this modal component can
 * be controlled with help of an open prop that can be set on my custom
 * modal component that should control whether the dialogue is open or not."
 *
 * className DEFAULT VALUE (Lesson 292):
 * -------------------------------------
 * The instructor explains:
 * "Now theoretically this could then lead to undefined being added as a
 * className if className is not set. And therefore I'll give this a
 * default value of an empty string, so that we basically don't add any
 * text here if className should not be set from outside."
 *
 * @param {Object} props
 * @param {ReactNode} props.children - Content to display inside the modal
 * @param {boolean} props.open - Whether the modal should be open
 * @param {Function} props.onClose - Callback when modal is closed
 * @param {string} props.className - Additional CSS class(es) for styling
 */
export default function Modal({ children, open, onClose, className = '' }) {
  /**
   * useRef FOR DOM ACCESS (Lesson 292)
   * ===================================
   * The instructor explains using useRef:
   * "We can use the built-in useRef hook by importing it from React, and
   * by then calling useRef, and then connect this dialogue Ref here to
   * the built-in dialogue element through the built-in Ref prop like this."
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
   * useEffect FOR OPENING/CLOSING (Lesson 292)
   * ==========================================
   * The instructor explains using useEffect:
   * "I'll use useEffect here also to, again, practice working with that
   * to, in the end, interact with that native dialogue element whenever
   * the open prop value changes."
   *
   * "So I'll pass open as a dependency to this dependencies array so
   * that this effect function will rerun whenever open changes."
   *
   * "And then in this effect function, I'll then check if open is true.
   * And if it is true, I want to open this dialogue programmatically."
   *
   * WHY NOT USE THE open ATTRIBUTE? (Lesson 292)
   * --------------------------------------------
   * The instructor explains an important distinction:
   * "Now the built in dialogue element also has an open attribute that
   * can be set, and theoretically we could therefore simply forward that
   * open prop to the open prop of the dialogue. But if we do that, we
   * miss out on certain features."
   *
   * "And most importantly, this dialogue element, when opened
   * programmatically, so not by setting this open prop, automatically
   * displays a backdrop. So a little area behind the overlay that can
   * be used to gray out the other content and to overlay the other
   * content so that we can't interact with it whilst the dialogue is
   * open. And that's why I don't wanna open it by setting the open prop.
   * But why instead I want to open the dialogue programmatically."
   *
   * showModal() vs open attribute:
   * ------------------------------
   * - open attribute: Opens dialog but NO backdrop
   * - showModal(): Opens dialog WITH backdrop (dimmed background)
   *
   * USING showModal() (Lesson 292):
   * -------------------------------
   * The instructor explains:
   * "Now, inside of this effect function, inside of this if block, so
   * only if open is true, we can use this dialogue Ref to call showModal,
   * which is the built in method that can be executed on this dialogue
   * object in the end to show it, to open it programmatically."
   *
   * CLOSING (Lesson 292):
   * ---------------------
   * "And we'll take care about closing it later."
   * The cleanup function calls close() when the effect reruns or unmounts.
   *
   * DEPENDENCY ARRAY: [open]
   * ------------------------
   * The effect re-runs whenever 'open' changes.
   * - open becomes true → showModal() is called
   * - open becomes false → cleanup runs, close() is called
   */
  useEffect(() => {
    /**
     * STORING REF IN TEMPORARY CONSTANT (Lesson 293)
     * ===============================================
     * The instructor explains this important pattern:
     * "It's recommended that you store the value of this ref in some
     * temporary constant here so that you store the current value of the
     * ref at the point of time when this effect function runs."
     *
     * "And I then use that constant both in this if statement and in this
     * cleanup function because this ensures that this cleanup function
     * will use the value that was stored in this constant when the effect
     * function executed."
     *
     * WHY IS THIS IMPORTANT?
     * ----------------------
     * Refs are mutable - dialog.current could change between effect runs.
     * By storing it in a constant:
     * - We capture the exact DOM element at effect execution time
     * - The cleanup function uses the same element reference
     * - No risk of stale or incorrect element references
     */
    const modal = dialog.current;

    if (open) {
      modal.showModal();
    }

    /**
     * CLEANUP FUNCTION (Lesson 293)
     * =============================
     * The instructor explains:
     * "And I then use that constant both in this if statement and in this
     * cleanup function because this ensures that this cleanup function
     * will use the value that was stored in this constant when the effect
     * function executed."
     *
     * This cleanup runs:
     * - When the component unmounts
     * - Before the effect re-runs (when 'open' changes)
     */
    return () => modal.close();
  }, [open]);

  /**
   * RENDER WITH PORTAL (Lesson 292)
   * ================================
   * The instructor explains using createPortal:
   * "We can easily create such a portal with help of the create portal
   * function that's imported from React-dom."
   *
   * "You then simply return, not the dialogue element, but instead a call
   * to React portal where the JSX content that should be portaled somewhere
   * else and that should be rendered by this component is passed as a first
   * argument to create portal."
   *
   * "And then the second argument is some code that selects an element in
   * the Real DOM. And here I'll use document getElementById for that to
   * select the element with an id of modal, which will of course be that
   * div here."
   *
   * PORTAL TARGET (Lesson 292):
   * ---------------------------
   * document.getElementById('modal') finds the <div id="modal"> element
   * that we added to index.html.
   *
   * The instructor references index.html:
   * "And I wanna inject it into this div here, with an ID of modal.
   * That's where I wanna inject those dialogue elements when we create
   * and open them with the modal component."
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
     * DIALOG ELEMENT (Lesson 292)
     * ===========================
     * The instructor explains:
     * "Now in this modal component function, I want to return built-in
     * dialogue element, which is great for displaying overlays like this,
     * because it handles a lot of the complexity for you."
     *
     * ref={dialog}:
     * - Connects our useRef to this DOM element
     * - "connect this dialogue Ref here to the built-in dialogue element
     *   through the built-in Ref prop"
     *
     * className WITH TEMPLATE LITERAL (Lesson 292):
     * ---------------------------------------------
     * The instructor explains the dynamic className:
     * "To finish up this modal component and this dialogue element for now,
     * I'll also add the className prop here to add a class of modal to this
     * dialogue, though I actually want to make this a bit more dynamic."
     *
     * "And I wanna make sure that this modal component can also be styled
     * from outside this component, so that other components can also set
     * a className prop on this modal component, and this value then is
     * merged with this modal class that should always be applied."
     *
     * "And this can be achieved by setting className to a dynamic value,
     * which in the end is a template literal string, where I always have
     * the hard coded modal class, and I then also inject the class name
     * I might be receiving in addition."
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
        CHILDREN CONTENT (Lesson 292)
        =============================
        The instructor explains:
        "Now my idea with this modal component then, essentially is that
        it can be wrapped around any content of our choice to put that
        content into the dialogue. And therefore I'll accept and destructure
        the children prop and pass that between the dialogue elements."

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
 * SUMMARY & KEY CONCEPTS FROM LESSON 292
 * ============================================================================
 *
 * LESSON 292 WORKFLOW:
 * ====================
 * 1. Create Modal.jsx in components folder
 * 2. Return native <dialog> element for built-in modal behavior
 * 3. Use createPortal to render in #modal div in index.html
 * 4. Use useRef to get reference to dialog element
 * 5. Use useEffect to programmatically open with showModal()
 * 6. Accept children prop for flexible content
 * 7. Accept open prop to control visibility
 * 8. Use template literal for dynamic className
 *
 * NATIVE <dialog> ELEMENT (Lesson 292):
 * =====================================
 * The instructor explains the benefit:
 * "I want to return built-in dialogue element, which is great for displaying
 * overlays like this, because it handles a lot of the complexity for you."
 *
 * Modern browsers support the <dialog> element which provides:
 * - showModal(): Opens modal with backdrop
 * - show(): Opens non-modal dialog
 * - close(): Closes the dialog
 * - open attribute: Boolean for open state
 * - ::backdrop pseudo-element for styling the overlay
 *
 * REACT PORTALS (Lesson 292):
 * ===========================
 * The instructor explains:
 * "But I wanna output it with help of that portal feature React offers
 * so that we can use this modal component from anywhere in our component
 * tree. But we'll always inject the dialogue when it's visible in a
 * specific area of the Real DOM that we as a developer control upfront."
 *
 * Benefits:
 * - Escape z-index stacking contexts
 * - Avoid overflow:hidden clipping
 * - Cleaner DOM structure
 * - Events still bubble through React tree
 *
 * WHY showModal() NOT open ATTRIBUTE (Lesson 292):
 * ================================================
 * The instructor emphasizes this important distinction:
 * "This dialogue element, when opened programmatically, so not by setting
 * this open prop, automatically displays a backdrop. So a little area
 * behind the overlay that can be used to gray out the other content."
 *
 * - open attribute: Opens dialog but NO backdrop
 * - showModal(): Opens dialog WITH backdrop
 *
 * useRef FOR DOM ACCESS (Lesson 292):
 * ===================================
 * "We can use the built-in useRef hook by importing it from React, and
 * by then calling useRef, and then connect this dialogue Ref here to
 * the built-in dialogue element through the built-in Ref prop."
 *
 * useEffect FOR SIDE EFFECTS (Lesson 292):
 * ========================================
 * "I'll use useEffect here also to, again, practice working with that
 * to, in the end, interact with that native dialogue element whenever
 * the open prop value changes."
 *
 * COMPOSABLE DESIGN:
 * ==================
 * This Modal is highly reusable because:
 * - It accepts children (any content works)
 * - It accepts className (any styling works)
 * - It's controlled by props (parent decides open/close)
 * - It notifies parent of close events
 *
 * Used by: Cart.jsx (cart modal), Checkout.jsx (checkout modal)
 *
 * WHAT'S NEXT (end of Lesson 292):
 * ================================
 * "And that's therefore it for this modal component for now.
 * As a next step, we can use it to output some cart details."
 */
