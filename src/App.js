import { useEffect, useState } from 'react';
import './App.css';
import Heading from './Components/Heading';
import Photo from './Components/Photo';
import Start from './Components/Start';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timerStatus, setTimerStatus] = useState(false);
  const [gameStatus, setGameStatus] = useState('start');

  const startTimer = () => setTimerStatus(true);
  const stopTimer = () => setTimerStatus(false);
  const resetTimer = () => {
    setSeconds(0);
    setMinutes(0);
  };

  const startGame = () => {
    startTimer();
    setGameStatus('playing');
    if (name === '') {
      setName('Pokemon Trainer');
    }
  };

  const newGame = () => {
    resetTimer();
    setCharsClicked([]);
    startGame();
  };

  const [name, setName] = useState('');
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
      />

      {gameStatus !== 'start' ? (
        <Photo
          charsClicked={charsClicked}
          setCharsClicked={setCharsClicked}
          gameStatus={gameStatus}
          newGame={newGame}
          score={score}
          name={name}
        />
      ) : (
        <Start startGame={startGame} setName={setName} name={name} />
      )}
    </div>
  );
}

export default App;
