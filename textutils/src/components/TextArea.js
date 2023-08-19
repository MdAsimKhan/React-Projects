import React, { useState, useEffect } from 'react';


const TextArea = (props) => {

  const [selectedWord, setSelectedWord] = useState('');
  const [wordData, setWordData] = useState(null);
  const [text, setText] = useState("");
  const [origingalText, setoriginaltext] = useState("");


  const handleUpperCase = () => {
    let newText = text.toUpperCase();
    setText(newText);
    if (text !== "") props.showAlert("Converted to uppercase!", "success");
  };

  const handleLowerCase = () => {
    let newText = text.toLowerCase();
    setText(newText);
    if (text !== "") props.showAlert("Converted to lowercase!", "success");
  };

  const clearText = () => {
    setText("");
    setWordData(null)
    if (text !== "") props.showAlert("Text Cleared!", "success");
  };

  const handleCamelCase = () => {
    let newText = text;
    newText = newText.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
    setText(newText);
    if (text !== "") props.showAlert("Set to Camel Case!", "success");
  };

  const handleSeeOriginal = () => {
    setText(origingalText);
    if (text !== "")
      props.showAlert("This is the original text entered", "success");
  };

  const handleOnChange = (event) => {
    setoriginaltext(event.target.value);
    setText(event.target.value);
  };

  const fetchData = async (word) => {
    console.log("first word", word);
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();
      console.log(data[0]);
      setWordData(data[0]);
      setSelectedWord('');
    } catch (error) {
      console.error('Error fetching word data:', error);
      setSelectedWord('');
    }
};

const wordSearch = () => {
  const ntext = window.getSelection().toString().trim();
  setSelectedWord(ntext);
};

useEffect(() => {
    if (selectedWord) {
        fetchData(selectedWord);
    }
}, [selectedWord]);


  return (
    <div>
      <h1>{props.heading}</h1>
      <div className="mb-3 shadow-lg rounded">
        <textarea
          className="form-control"
          value={text}
          onChange={handleOnChange}
          id="myBox"
          rows="7"
          placeholder="Enter Text Here"
        ></textarea>
      </div>
      <div className="my-2">
        <h2>Text Summary</h2>
        <p>
          {text.trim().split(" ").filter(Boolean).length} words and{" "}
          {text.length} characters
        </p>
      </div>
      <button className="btn btn-primary mx-1 my-1" onClick={handleUpperCase}>
        Convert to Uppercase
      </button>
      <button className="btn btn-primary mx-1 my-1" onClick={handleLowerCase}>
        Convert to Lowercase
      </button>
      <button className="btn btn-primary mx-1 my-1" onClick={wordSearch}>
        Lookup
      </button>
      <button className="btn btn-primary mx-1 my-1" onClick={handleCamelCase}>
        Capitalise Each Word
      </button>
      <button className="btn btn-primary mx-1 my-1" onClick={handleSeeOriginal}>
        See Original
      </button>
      <button className="btn btn-primary mx-1 my-1" onClick={clearText}>
        Clear Text
      </button>
      <p>
        {(0.008 * text.split(" ").filter(Boolean).length).toFixed(2)} minutes
        read
      </p>
      {wordData && (
        <div>
          <h1 className='mb-4 mt-4'>Dictionary Lookup Results</h1>
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
  );
};

export default TextArea;