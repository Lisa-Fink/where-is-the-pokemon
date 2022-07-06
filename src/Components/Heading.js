import React from 'react';
import Timer from './Timer';
import gengar from '../pokemon/gengar.webp';
import bulb from '../pokemon/bulbasaur.webp';
import geo from '../pokemon/geo.webp';
import horsea from '../pokemon/horsea.webp';
import ivy from '../pokemon/ivysaur.webp';
import jiggly from '../pokemon/jiggly.webp';
import mime from '../pokemon/mime.webp';

function Heading({ score, chars }) {
  const charsArr = [
    { name: 'Gengar', img: gengar },
    { name: 'Bulbasaur', img: bulb },
    { name: 'Geodude', img: geo },
    { name: 'Horsea', img: horsea },
    { name: 'Ivysaur', img: ivy },
    { name: 'Jigglypuff', img: jiggly },
    { name: 'Mr. Mime', img: mime },
  ];
  const charpics = charsArr.map((char) => {
    return (
      <img
        src={char.img}
        alt={`thumbnail of ${char.name}`}
        className={chars.includes(char.name) ? 'found' : 'unfound'}
      />
    );
  });
  return (
    <div className="heading">
      <h1>Where is The Pokemon?</h1>
      <div>{charpics}</div> <div>{score} / 7</div>
    </div>
  );
}

export default Heading;
