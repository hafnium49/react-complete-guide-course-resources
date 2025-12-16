import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
      if (open) {
    dialog.current.showModal();
  } else {
    dialog.current.close();
  }
  }, [open]);
  // populate ref before using using useEffect
  // useEffect only cares about dependencies, not about when it runs. i.e. it runs only once after first render because dependency array is empty

  // // // backdrop needs to be handled manually if using open attribute
  // // dialog.current.showModal();
  // if (open) {
  //   dialog.current.showModal();
  // } else {
  //   dialog.current.close();
  // }
  // // error because ref is undefined on first render

  // useImperativeHandle(ref, () => {
  //   return {
  //     open: () => {
  //       dialog.current.showModal();
  //     },
  //     close: () => {
  //       dialog.current.close();
  //     },
  //   };
  // });

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {open ? children : null}
      {/* What if you click cancel? */}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
