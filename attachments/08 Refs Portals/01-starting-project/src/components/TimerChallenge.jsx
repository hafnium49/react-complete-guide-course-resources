import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

// let timer; // the reason why this won't work is that this variable will be re-initialized on every re-render

export default function TimerChallenge( { title, targetTime } ) {
    const timer = useRef(); // the reason why this will work is that this ref will persist across re-renders
    const dialog = useRef();

    // const [timerStarted, setTimerStarted] = useState(false);
    // const [timerExpired, setTimerExpired] = useState(false);

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) {
      clearInterval(timer.current);
      // setTimeRemaining(targetTime * 1000); // potential risk of infinite loop
      dialog.current.open();
    }

    function handleStart() {
        // Start timer logic to be implemented
        timer.current = setInterval(() => {
            setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
        }, 10);
        // setTimerStarted(true);
    }

    function handleStop() {
        // Stop timer logic to be implemented
        dialog.current.open();
        clearTimeout(timer.current);
    }

    function handleReset() {
        setTimeRemaining(targetTime * 1000);
    }
  return (
    <>
    <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset} />
    <section className="challenge">
      <h2>{title}</h2>
      {/* {timerExpired && <p>You lost</p>} */}
      <p className="challenge-time">
        {targetTime} seconds{targetTime > 1 ? "s" : ""} to complete
      </p>
      <p>
        <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
        </button>
      </p>
      <p className={timerIsActive ? "active" : undefined}>
        {timerIsActive ? "Time is runnining..." : "Timer inactive"}
      </p>
    </section>
    </>
  );
}