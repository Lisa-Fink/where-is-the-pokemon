import React from 'react';
import charsArr from './charArr';
import './styles/start.css';

function Start({ startGame }) {
  const charGrid = charsArr.map((char) => {
    return (
      <div className="char-grid" key={char.name}>
        <img src={char.img} alt={`${char.name} thumbnail`} />
        {char.name}
      </div>
    );
  });
  return (
    <div className="start">
      <h2>Where is The Pokemon?</h2>
      <div>Find These Pokemon</div>
      <div>
        Find them all in a fast enough time to earn a spot on the leaderboard!
      </div>
      <div className="char-container">{charGrid}</div>
      <div className="start-button">
        <button onClick={startGame}>Start Game</button>
      </div>
    </div>
  );
}

export default Start;
