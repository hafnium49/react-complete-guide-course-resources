import { useState, useEffect } from 'react';

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  // Effect for auto-timeout so that multiple timers are not set
  useEffect(() => {
    console.log('Setting timeout');
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      console.log('Clearing timeout');
      clearTimeout(timer); // Cleanup on unmount or timeout change.
    };
  }, [timeout, onTimeout]);

  // Effect for countdown interval
  useEffect(() => {
    console.log('Setting interval');
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100); // Triggered twice due to strict mode in attachments/13 Demo Project - React Quiz/01-starting-project/src/main.jsx

    return () => {
      console.log('Clearing interval');
      clearInterval(interval); // Cleanup on unmount or timeout change. In case strict mode triggers twice.
    };
  }, []); // 

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={mode}
    />
  );
}
