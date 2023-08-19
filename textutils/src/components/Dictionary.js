import React, { useState } from 'react';

const Dictionary = () => {
  const [input, setInput] = useState('');
  const [wordData, setWordData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
      const data = await response.json();
      setWordData(data[0]); // Assume the first result is what we want
    } catch (error) {
      console.error('Error fetching word data:', error);
    }
  };

  return (
    <div>
      <div className='mt-5 d-flex justify-content-center'>
        <input className="w-25 form-control" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Enter a word" 
        />
        <button className="btn btn-primary mx-1" onClick={fetchData}>Get Details</button>
      </div>
      <div className='mt-5 d-flex justify-content-center'>
      {wordData && (
        <div>
          <h2>{wordData.word} <span>({wordData?.phonetic})</span></h2>
          
          <audio controls src={wordData.phonetics[0]?.audio}>Your browser does not support the audio element.</audio>
          
          {wordData.meanings[0]?.synonyms[0] && (
            <div>
                <h3>Meanings:</h3>
            <div>
              <strong>{wordData.meanings[0]?.partOfSpeech}</strong>
              <ul>
                  {wordData?.meanings[0]?.definitions[0]?.definition && (<li>{wordData?.meanings[0]?.definitions[0]?.definition}</li>)}
                  {wordData?.meanings[0]?.definitions[1]?.definition && (<li>{wordData?.meanings[0]?.definitions[1]?.definition}</li>)}
              </ul>
            </div>
            </div>
          )}
          

          {wordData.meanings[0]?.synonyms[0] && (
            <div>
            <h3>Synonyms:</h3>
            <div>
              <ul>
                  {wordData.meanings[0]?.synonyms[0] && (<li>
                      {wordData.meanings[0]?.synonyms[0]}
                  </li>)}
                  {wordData.meanings[0]?.synonyms[1] && (<li>
                      {wordData.meanings[0]?.synonyms[1]}
                  </li>)}
                  {wordData.meanings[0]?.synonyms[2] && (<li>
                      {wordData.meanings[0]?.synonyms[2]}
                  </li>)}
                  {wordData.meanings[0]?.synonyms[3] && (<li>
                      {wordData.meanings[0]?.synonyms[3]}
                  </li>)}
              </ul>
            </div>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
};

export default Dictionary;
