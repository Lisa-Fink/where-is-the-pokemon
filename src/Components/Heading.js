import React, { useEffect } from 'react';
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
      <div>{charpics}</div> <div id="score">{score} / 7</div>
      <Timer
        seconds={seconds}
        setSeconds={setSeconds}
        minutes={minutes}
        setMinutes={setMinutes}
        timerStatus={timerStatus}
      />
    </div>
  );
}

export default Heading;
