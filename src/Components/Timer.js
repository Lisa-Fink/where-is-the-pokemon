import { useEffect, useState } from 'react';

const Timer = ({
  seconds,
  setSeconds,
  minutes,
  setMinutes,
  timerStatus,
  startTimer,
}) => {
  const timeConverter = () => {
    if (seconds === 60) {
      setMinutes(minutes + 1);
      setSeconds(0);
    }
    return `${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`;
  };

  useEffect(() => {
    let interval;
    if (timerStatus) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!timerStatus && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerStatus, seconds]);
  return (
    <div className="timer">
      {timeConverter()}
      <button onClick={startTimer}>Start</button>
    </div>
  );
};

export default Timer;
