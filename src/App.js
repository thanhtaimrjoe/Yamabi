import { Routes, Route } from "react-router-dom";
import routes from "./routes";

function App() {
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
