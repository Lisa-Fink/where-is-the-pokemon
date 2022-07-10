import React, { useEffect, useState, useRef } from 'react';
import { getDocs, collection, setDoc, doc, addDoc } from 'firebase/firestore';
import './styles/gamewon.css';

function GameWon({ newGame, score, db, name }) {
  const [rank, setRank] = useState(false);
  const [highScoreArr, setHighScoreArr] = useState([]);

  const renderCount = useRef(1);

  const getHighScores = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'highscore'));
      const scores = [];
      snapshot.forEach((doc) => {
        scores.push({
          min: doc.data().min,
          sec: doc.data().sec,
          name: doc.data().name,
          id: doc.id,
        });
      });
      scores.sort((a, b) => a.min * 60 + a.sec - (b.min * 60 + b.sec));
      return scores;
    } catch (e) {
      console.log('error retrieving high scores: ', e);
    }
  };

  const getRank = () => {
    const scoreConverted = score[0] * 60 + score[1];
    // loops through highscores from 2nd to last to first
    for (let i = highScoreArr.length - 1; i >= 0; i--) {
      let highScoreConverted = highScoreArr[i].min * 60 + highScoreArr[i].sec;
      if (scoreConverted >= highScoreConverted) {
        // return the rank number below highScoreConverted
        setRank(i + 2);
        return;
      }
      if (i === 0 && scoreConverted < highScoreConverted) {
        setRank(1);
      }
    }
  };

  const checkHighScores = () => {
    if (highScoreArr.length < 10) {
      getRank();
      return;
    }
    const scoreConverted = score[0] * 60 + score[1];
    const lastScoreConverted = highScoreArr[9].min * 60 + highScoreArr[9].sec;
    if (scoreConverted < lastScoreConverted) {
      getRank();
    }
  };

  const setHighScore = async () => {
    const scoreObj = {
      name: name,
      min: score[0],
      sec: score[1],
    };
    if (highScoreArr.length < 10) {
      try {
        const docRef = await addDoc(collection(db, 'highscore'), {
          ...scoreObj,
        });
      } catch (e) {
        console.log('error adding new high score: ', e);
      }
    } else {
      try {
        const docRef = await setDoc(
          doc(db, 'highscore', highScoreArr[9].id),
          {
            min: score[0],
            sec: score[1],
            name: name,
          },
          { merge: true }
        );
      } catch (e) {
        console.log('error changing high score: ', e);
      }
    }
    const newHighScores = [...highScoreArr, scoreObj].sort(
      (a, b) => a.min * 60 + a.sec - (b.min * 60 + b.sec)
    );
    newHighScores.length > 10 && newHighScores.pop();
    setHighScoreArr(newHighScores);
  };

  useEffect(() => {
    // processScore();
    if (renderCount.current === 1) {
      const process = async () => {
        const scores = await getHighScores();
        setHighScoreArr(scores);
      };
      process();
    }
  }, []);

  useEffect(() => {
    if (renderCount.current === 1) {
      renderCount.current = 2;
      return;
    }

    if (renderCount.current > 1 && JSON.stringify(highScoreArr) !== '[]') {
      // the first time getting the highscore arr
      if (renderCount.current === 2) {
        renderCount.current = 3;
        checkHighScores();
        return;
      }
    }
  }, [JSON.stringify(highScoreArr)]);

  useEffect(() => {
    if (renderCount.current !== 1 && rank !== false) {
      setHighScore();
    }
  }, [rank]);

  const rankDiv = rank ? (
    <div className="rank">Rank {rank}</div>
  ) : (
    <div data-secret="If you can read this then you know that you were defeated by Team Rocket"></div>
  );

  const highScoreList = highScoreArr.map((hscore, index) => {
    const min = hscore.min < 10 ? `0${hscore.min}` : hscore.min;
    const sec = hscore.sec < 10 ? `0${hscore.sec}` : hscore.sec;
    return (
      <div key={hscore.id} className="highscore-row">
        <div>{index + 1}</div>
        <div>{hscore.name}</div>
        <div>
          {min}:{sec}
        </div>
      </div>
    );
  });

  return (
    <div className="large-winner">
      <div className="start winner">
        <h2>WINNER!</h2>
        <div>Congratulations {name}!</div>
        <div>You achieved a time of {`${score[0]}:${score[1]}`}</div>
        {rankDiv}
        <div id="highscore-title">TOP 10</div>
        <div className="highscore-list">
          <div className="highscore-row">
            <div>Rank</div>
            <div>Name</div>
            <div>Time</div>
          </div>
          {highScoreList}
        </div>
        <button onClick={newGame}>New Game</button>
      </div>
    </div>
  );
}

export default GameWon;
