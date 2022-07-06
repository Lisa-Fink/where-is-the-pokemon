import React from 'react';
import photo from '../img1.jpg';
import './styles/photo.css';

function Photo() {
  return (
    <div>
      <img
        src={photo}
        alt="big pokemon pic"
        className="bigpokemon"
        onClick={(e) =>
          console.log(
            e.pageX - e.target.offsetLeft,
            e.pageY - e.target.offsetTop
          )
        }
      />
    </div>
  );
}

export default Photo;
