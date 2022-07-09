import { useEffect, useState } from 'react';
import './App.css';
import Heading from './Components/Heading';
import Photo from './Components/Photo';
import Start from './Components/Start';
import Timer from './Components/Timer';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timerStatus, setTimerStatus] = useState(false);
  const [gameStatus, setGameStatus] = useState('start');

  const startTimer = () => setTimerStatus(true);
  const stopTimer = () => setTimerStatus(false);
  const resetTimer = () => setSeconds(0);

  const startGame = () => {
    startTimer();
    setGameStatus('playing');
  };

  const newGame = () => {
    resetTimer();
    setCharsClicked([]);
    startGame();
  };

  const [score, setScore] = useState([]);
  const [charsClicked, setCharsClicked] = useState([]);

  useEffect(() => {
    if (charsClicked.length === 7) {
      const time = winner();
      setScore(time);
    }
  }, [charsClicked]);

  const winner = () => {
    const time = [minutes, seconds];
    stopTimer();
    setGameStatus('win');
    return time;
  };

  return (
    <div className="App">
      <Heading
        charsClicked={charsClicked}
        seconds={seconds}
        setSeconds={setSeconds}
        minutes={minutes}
        setMinutes={setMinutes}
        timerStatus={timerStatus}
        startTimer={startTimer}
      />

      {gameStatus !== 'start' ? (
        <Photo
          charsClicked={charsClicked}
          setCharsClicked={setCharsClicked}
          gameStatus={gameStatus}
          newGame={newGame}
          score={score}
        />
      ) : (
        <Start startGame={startGame} />
      )}
    </div>
  );
}

export default App;
