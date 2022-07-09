import React from 'react';
import photo from '../img1.jpg';
import './styles/photo.css';
import { initializeApp, firebase } from 'firebase/app';
import { getDocs, collection, getFirestore, doc } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

function Photo({ charsClicked, setCharsClicked }) {
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
      console.log(locations);
      return locations;
    } catch (e) {
      console.log('error retrieving data: ', e);
    }
  };
  const checkLocations = async (e) => {
    console.log(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    const locations = await getLocations();
    console.log('locations in check', locations);
    const checkX = locations.filter((obj) => Math.abs(obj.x - x) <= 20);
    if (checkX.length) {
      const checkY = checkX.filter((obj) => Math.abs(obj.y - y) <= 20);
      if (checkY.length) {
        // need to do something if more than 1 is in range
        console.log(checkY[0].name);
        return checkY[0].name;
      }
    }

    return false;
  };

  const processClick = async (e) => {
    const success = await checkLocations(e);
    // if successful and successful wasn't already clicked
    if (success && !charsClicked.includes(success)) {
      console.log('success', 'charsArr: ', charsClicked, success);
      setCharsClicked([...charsClicked, success]);
    }
  };

  return (
    <div>
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
