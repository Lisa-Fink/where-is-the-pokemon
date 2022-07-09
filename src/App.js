import { useState } from 'react';
import './App.css';
import Heading from './Components/Heading';
import Photo from './Components/Photo';
import Start from './Components/Start';
import Timer from './Components/Timer';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timerStatus, setTimerStatus] = useState(false);

  const startTimer = () => setTimerStatus(true);
  const stopTimer = () => setTimerStatus(false);
  const resetTimer = () => setSeconds(0);

  const [charsClicked, setCharsClicked] = useState([]);

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

      {timerStatus ? (
        <Photo charsClicked={charsClicked} setCharsClicked={setCharsClicked} />
      ) : (
        <Start startTimer={startTimer} />
      )}
    </div>
  );
}

export default App;
