import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import './App.css';

function SingerButton({ singer, key }) {
  const singerNames = ['first', 'second', 'third', 'fourth'];
  const singerLabels = ['FIRST SINGER', 'SECOND SINGER', 'THIRD SINGER', 'FOURTH SINGER'];
  return (
    <Link key={key} to={`/singer/${singerNames[singer.id - 1]}`}>
      <div className={`button ${singer.color}`}>{singerLabels[singer.id - 1]}</div>
    </Link>
  );
}

function LyricsInput({ value, handleChange }) {
  return (
    <div className="inputLyrics">
      <input
        type="text"
        value={value}
        className="typeLyrics"
        id="typeLyrics"
        placeholder="Add lyrics..."
        onChange={handleChange}
      />
    </div>
  );
}

function LyricsDisplay({ lyrics }) {
  return (
    <div className="inputtedLyrics">
      <div className="typedlyrics">
        {lyrics.map((lyric, index) => (
          <div key={index} className={`phrase ${lyric.singer.color}`}>
            {lyric.value}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const key = useRef(0);

  const initialSingers = [
    { id: 1, color: 'pink' },
    { id: 2, color: 'purple' },
    { id: 3, color: 'violet' },
    { id: 4, color: 'blue' }
  ];

  const [singers, setSingers] = useState(initialSingers);
  const [phrase, setPhrase] = useState('');
  const [lyrics, setLyrics] = useState([]);
  
  const singerNames = ['first', 'second', 'third', 'fourth'];
  
  let { name } = useParams();
  
  let id = singerNames.indexOf(name) + 1;

  const handleChange = (e) => {
    e.preventDefault();
    setPhrase(e.target.value);
  }

  const updateLyrics = () => {
    if (!id) return;

    setLyrics((prevLyrics) => {
      const updatedLyrics = [...prevLyrics];

      if (updatedLyrics.length > 0 && updatedLyrics[updatedLyrics.length - 1].singer.id === id) {
        if (phrase) {
          updatedLyrics[updatedLyrics.length - 1].value = phrase;
        } else {
          updatedLyrics.pop(); 
        }
      } else if (phrase) {
        updatedLyrics.push({
          singer: singers[id - 1],
          value: phrase
        });
      }

      return updatedLyrics;
    });
  };

  useEffect(() => {
    setPhrase('');
  }, [id]);

  useEffect(updateLyrics, [phrase]);

  return (
    <div className="App">
      <h1> COMPLETE THE LYRICS </h1>
      <div className="btnSelect">
        {singers.map((singer) => (
          <SingerButton key={singer.id} singer={singer} />  
        ))}
      </div>
      <LyricsInput value={phrase} handleChange={handleChange} />
      <LyricsDisplay lyrics={lyrics} />
    </div>
  ); 
} 

export default App; 