import { useEffect } from 'react';

const Timer = ({ seconds, setSeconds, minutes, setMinutes, timerStatus }) => {
  useEffect(() => {
    if (seconds === 60) {
      setMinutes(minutes + 1);
      setSeconds(0);
    }
  }, [seconds, minutes]);

  const timeConverter = () => {
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

  return <div className="timer">{timeConverter()}</div>;
};

export default Timer;
