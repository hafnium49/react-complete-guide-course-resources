import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

// let timer; // the reason why this won't work is that this variable will be re-initialized on every re-render

export default function TimerChallenge( { title, targetTime } ) {
    const timer = useRef(); // the reason why this will work is that this ref will persist across re-renders
    const dialog = useRef();

    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);

    function handleStart() {
        // Start timer logic to be implemented
        timer.current = setTimeout(() => {
            setTimerExpired(true);
            dialog.current.showModal();
        }, targetTime * 1000);
        setTimerStarted(true);
    }

    function handleStop() {
        // Stop timer logic to be implemented
        clearTimeout(timer.current);
    }
  return (
    <>
    {timerExpired && <ResultModal ref={dialog} targetTime={targetTime} result={"lost"} />}
    <section className="challenge">
      <h2>{title}</h2>
      {/* {timerExpired && <p>You lost</p>} */}
      <p className="challenge-time">
        {targetTime} seconds{targetTime > 1 ? "s" : ""} to complete
      </p>
      <p>
        <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
        </button>
      </p>
      <p className={timerStarted ? "active" : undefined}>
        {timerStarted ? "Time is runnining..." : "Timer inactive"}
      </p>
    </section>
    </>
  );
}