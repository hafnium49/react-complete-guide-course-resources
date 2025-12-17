import { useEffect } from 'react';

import ProgressBar from './ProgressBar.jsx';

const TIMER = 3000; // 3 seconds in milliseconds

export default function DeleteConfirmation({ onConfirm, onCancel }) {

  useEffect(() => {
    console.log('DeleteConfirmation mounted');
    
    const timer = setTimeout(() => {
      onConfirm();
      // console.log('DeleteConfirmation mounted');
    }, TIMER);

    return () => {
      console.log('DeleteConfirmation unmounted');
      clearTimeout(timer);

    };
  }, [onConfirm]);
  // Setting timer is not needed here, but necessary to cleasn it up when component unmounts
  // You should add onConfirm to dependency array to avoid stale closure issues
  // Adding a function as a dependency has a risk of causing infinite loops if the function is re-created on every render of the parent component
  // However, in this case, onConfirm is likely stable (not re-created on every render), so it's safe to include it
  

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
      <ProgressBar timer={TIMER} />
    </div>
  );
}
