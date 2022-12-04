import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/main/Main";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Signin from "./components/signin/Signin";
import Details from "./components/taDetails/details";

function App() {

  return (
    <Router>

      <Routes>
        <Route path="/" element={<Signin />} />
        <Route
          path="/main"
          element={
            <>
              <ProtectedRoute><Main /> </ProtectedRoute> 
            </>
          }
        />
        <Route path="/ta/:id" element={
          <>
            <ProtectedRoute><Details /> </ProtectedRoute>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
