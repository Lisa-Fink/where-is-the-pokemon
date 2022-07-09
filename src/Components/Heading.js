import React from 'react';
import Timer from './Timer';
import './styles/heading.css';
import charsArr from './charArr';

function Heading({
  charsClicked,
  seconds,
  setSeconds,
  minutes,
  setMinutes,
  timerStatus,
  startTimer,
}) {
  const charpics = charsArr.map((char) => {
    return (
      <img
        src={char.img}
        alt={`thumbnail of ${char.name}`}
        className={charsClicked.includes(char.name) ? 'found' : 'unfound'}
        id={char.name}
        key={char.name}
      />
    );
  });
  const score = charsClicked.length;
  return (
    <div className="heading">
      <h1>Where is The Pokemon?</h1>
      <div>{charpics}</div> <div>{score} / 7</div>
      {/* <Timer
        seconds={seconds}
        setSeconds={setSeconds}
        minutes={minutes}
        setMinutes={setMinutes}
        timerStatus={timerStatus}
        startTimer={startTimer}
      /> */}
    </div>
  );
}

export default Heading;
