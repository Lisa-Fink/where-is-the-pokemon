import photo from '../img1.jpg';
import './styles/photo.css';
import { initializeApp } from 'firebase/app';
import { getDocs, collection, getFirestore, doc } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';
import GameWon from './GameWon';

function Photo({ charsClicked, setCharsClicked, gameStatus, newGame, score }) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const getLocations = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'locations'));
      const locations = [];
      snapshot.forEach((doc) => {
        locations.push({
          x: doc.data().x,
          y: doc.data().y,
          name: doc.data().name,
        });
      });
      return locations;
    } catch (e) {
      console.log('error retrieving data: ', e);
    }
  };
  const checkLocations = async (e) => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    console.log('x:', x, 'y:', y);
    const locations = await getLocations();
    for (const obj of locations) {
      // obj.x and obj.y are arrays containing 4 values for x and y outlining a
      // box around the character.
      // checks if clicked x is right of the left line, and left of the right line
      if ((x > obj.x[0]) | (x > obj.x[2]) && (x < obj.x[1]) | (x < obj.x[3])) {
        //checks if clicked y is below the top line and above the bottom line
        if (
          (y > obj.y[0]) | (y > obj.y[1]) &&
          (y < obj.y[2]) | (y < obj.y[3])
        ) {
          return obj.name;
        }
      }
    }
    // need to do something if more than 1 is in range
    return false;
  };

  const processClick = async (e) => {
    const success = await checkLocations(e);
    // if successful and successful wasn't already clicked
    if (success && !charsClicked.includes(success)) {
      setCharsClicked([...charsClicked, success]);
    }
  };

  return (
    <div>
      {gameStatus === 'win' && <GameWon newGame={newGame} score={score} />}
      <img
        src={photo}
        alt="big pokemon pic"
        className="bigpokemon"
        onClick={processClick}
      />
    </div>
  );
}

export default Photo;
