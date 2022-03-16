import Navbar from "./components/layout/Navbar";
import Signup from "./components/auth/Signup";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Homepage from "./components/home/Homepage";
import Login from "./components/auth/Login";
import Profile from "./components/layout/Profile";

function App() {
  return (
    <Router>
      <div className="mx-auto App lg:container">
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
