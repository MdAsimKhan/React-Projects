import "./App.css";
import Navbar from "./components/Navbar";
import TextArea from "./components/TextArea";
import Alert from "./components/Alert";
import Dictionary from "./components/Dictionary";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <BrowserRouter>
        <Navbar title="TextUtils" />
        <div className="container">
          <Alert alert={alert} />
        </div>
        <div className="container my-3">
          <Routes>
            <Route
              path="/"
              element={
                <TextArea
                  showAlert={showAlert}
                  heading="Enter Text to Analyse"
                />
              }
            />
            <Route path="/lookup" element={<Dictionary/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
