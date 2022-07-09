import React from 'react';
import './styles/gamewon.css';

function GameWon({ newGame, score }) {
  return (
    <div className="large-winner">
      <div className="start winner">
        <h2>WINNER!</h2>
        <div>Congratulations!</div>
        <div>You achieved a time of {`${score[0]}:${score[1]}`}</div>
        <button onClick={newGame}>New Game</button>
      </div>
    </div>
  );
}

export default GameWon;
