import React, { useState } from "react";

export default function TextArea(props) {
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

  const [text, setText] = useState("");
  const [origingalText, setoriginaltext] = useState("");

  return (
    <div>
      <h1>{props.heading}</h1>
      <div className="mb-3">
        <textarea
          className="form-control"
          value={text}
          onChange={handleOnChange}
          id="myBox"
          rows="8"
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
    </div>
  );
}
