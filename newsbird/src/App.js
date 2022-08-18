import "./App.css";
import Navbar from "./components/Navbar";
import React, { useState } from "react";
import News from "./components/News";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <News
                bg="light"
                apiKey={apiKey}
                key="general"
                category="general"
                country="in"
              />
            }
          />
          <Route
            exact
            path="sports"
            element={
              <News
                bg="primary"
                apiKey={apiKey}
                key="sports"
                category="sports"
                country="in"
              />
            }
          />
          <Route
            exact
            path="business"
            element={
              <News
                bg="secondary"
                apiKey={apiKey}
                key="business"
                category="business"
                country="in"
              />
            }
          />
          <Route
            exact
            path="health"
            element={
              <News
                bg="success"
                apiKey={apiKey}
                key="health"
                category="health"
                country="in"
              />
            }
          />
          <Route
            exact
            path="technology"
            element={
              <News
                bg="info"
                apiKey={apiKey}
                key="technology"
                category="technology"
                country="in"
              />
            }
          />
          <Route
            exact
            path="science"
            element={
              <News
                bg="warning"
                apiKey={apiKey}
                key="science"
                category="science"
                country="in"
              />
            }
          />
          <Route
            exact
            path="entertainment"
            element={
              <News
                bg="danger"
                apiKey={apiKey}
                key="entertainment"
                category="entertainment"
                country="in"
              />
            }
          />
        </Route>
        <Route
          exact
          path="search/:id"
          element={<News apiKey={apiKey} />}
        ></Route>
      </Routes>
    </>
  );
};
export default App;
