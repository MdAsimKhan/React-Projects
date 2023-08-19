import React, { useState, useEffect } from 'react';

const WordSearch = () => {
  const [selectedWord, setSelectedWord] = useState('');
  const [wordData, setWordData] = useState(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleTextSelect = () => {
      const text = window.getSelection().toString().trim();

      if (text) {
        const range = window.getSelection().getRangeAt(0);
        const rect = range.getBoundingClientRect();

        setPosition({
          top: rect.top,
          left: rect.left
        });
        
        setSelectedWord(text);
      } else {
        setSelectedWord('');
      }
    };

    document.addEventListener('mouseup', handleTextSelect);

    return () => {
      document.removeEventListener('mouseup', handleTextSelect);
    };
  }, []);

  const fetchData = async (word) => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();
      setWordData(data[0]);
    } catch (error) {
      console.error('Error fetching word data:', error);
    }
  };

  return (
    <div>
      {selectedWord && (
        <div 
        style={{ 
          position: 'absolute', 
          top: position.top, 
          left: position.left, 
          zIndex: 1000,
          background: 'white',
          border: '1px solid black',
          padding: '5px',
          borderRadius: '5px',
          boxShadow: '0 0 5px rgba(0,0,0,0.2)'
        }}
      >
        <button onClick={() => fetchData(selectedWord)}>Lookup "{selectedWord}"</button>
      </div>
      )}

      {wordData && (
        <div>
          <h2>{wordData.word} <span>({wordData.phonetic})</span></h2>
          <audio controls src={wordData.phonetics[0]?.audio}>Your browser does not support the audio element.</audio>

          {wordData.meanings[0]?.synonyms?.length > 0 && (
            <div>
              <h3>Meanings:</h3>
              <div>
                <strong>{wordData.meanings[0].partOfSpeech}</strong>
                <ul>
                  <li>{wordData.meanings[0].definitions[0]?.definition}</li>
                  <li>{wordData.meanings[0].definitions[1]?.definition}</li>
                </ul>
              </div>

              <h3>Synonyms:</h3>
              <div>
                <ul>
                  {wordData.meanings[0].synonyms.slice(0, 4).map((synonym, index) => (
                    <li key={index}>{synonym}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WordSearch;
