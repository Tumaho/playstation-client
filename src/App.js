import MainCards from "./component/main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Playstation from "./component/playstation/playstation";

function App() {
  return (
    // <MainCards></MainCards>
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MainCards></MainCards>}
        />

        <Route
          path="/PS"
          element={<Playstation></Playstation>}
        />
      </Routes>
    </Router>
  );
}

export default App;
