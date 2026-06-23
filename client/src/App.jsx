import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ResumeUploader from "./components/ResumeUploader";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div
                className="
                  min-h-screen
                  bg-slate-950
                  text-white
                  p-8
                "
              >
                <Navbar/>
                <ResumeUploader />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;