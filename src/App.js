import React from "react";
import routes from "./routes";
import { Routes, Route } from "react-router-dom";

function App(props) {
  const showContents = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route key={index} path={route.path} element={route.element()} />
        );
      });
    }
    return <Routes>{result}</Routes>;
  };

  return <div>{showContents(routes)}</div>;
}

export default App;
