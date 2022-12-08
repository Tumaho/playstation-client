import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/main/Main";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Signin from "./components/signin/Signin";
import Details from "./components/taDetails/details";
import MainCourses from "./components/courses/allCourses/mainCourse";

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

        <Route path="/courses" element={
          <>
            <ProtectedRoute><MainCourses /> </ProtectedRoute>
          </>
        } />

        {/* <Route path="/course/:id" element={
          <>
            <ProtectedRoute><CourseDetails /> </ProtectedRoute>
          </>
        } /> */}

      </Routes>
    </Router>
  );
}

export default App;
