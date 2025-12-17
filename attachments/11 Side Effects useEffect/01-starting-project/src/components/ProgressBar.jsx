import { useEffect, useState } from 'react';

export default function ProgressBar({ timer }) {
    const [remainingTime, setRemainingTime] = useState(timer); // 3 seconds in milliseconds

    useEffect(() => {
    const interval = setInterval(() => {
        console.log('Interval tick');
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 10);
    }, 10);

    return () => {
        clearInterval(interval); // Cleanup on unmount in order to prevent inifinite intervals which can impact performance
    };
    }, []);
    return      <progress value={remainingTime} max={timer} />
    }