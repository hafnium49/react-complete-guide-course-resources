import { useEffect } from 'react';

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    console.log('DeleteConfirmation mounted');
    const timer = setTimeout(() => {
      onConfirm();
      // console.log('DeleteConfirmation mounted');
    }, 3000);

    return () => {
      console.log('DeleteConfirmation unmounted');
      clearTimeout(timer);

    };
  }, []);
  // Setting timer is not needed here, but necessary to cleasn it up when component unmounts
  

  // console.log('Timer started for DeleteConfirmation');
  // setTimeout(() => {
  //   onConfirm();
  //   // console.log('DeleteConfirmation mounted');
  // }, 3000);
  // // always renders immediately, side effect happens after render because it is always a part of DOM tree
  // // What if you click cancel?


  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
    </div>
  );
}
