import { useState } from 'react';
import './App.css';
import Heading from './Components/Heading';
import Photo from './Components/Photo';
import Timer from './Components/Timer';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timerStatus, setTimerStatus] = useState(false);

  const startTimer = () => setTimerStatus(true);
  const stopTimer = () => setTimerStatus(false);
  const resetTimer = () => setSeconds(0);

  const [score, setScore] = useState(0);
  const [chars, setChars] = useState([]);

  return (
    <div className="App">
      <Heading score={score} chars={chars} />
      <Timer
        seconds={seconds}
        setSeconds={setSeconds}
        minutes={minutes}
        setMinutes={setMinutes}
        timerStatus={timerStatus}
        startTimer={startTimer}
      />
      <Photo />
    </div>
  );
}

export default App;
