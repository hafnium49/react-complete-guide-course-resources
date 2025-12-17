import { useState, useEffect } from 'react';

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  // Effect for auto-timeout
  useEffect(() => {
    console.log('Setting timeout');
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      console.log('Clearing timeout');
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  // Effect for countdown interval
  useEffect(() => {
    console.log('Setting interval');
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);

    return () => {
      console.log('Clearing interval');
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={mode}
    />
  );
}
