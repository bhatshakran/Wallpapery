import Navbar from "./components/layout/Navbar";
import Signup from "./components/auth/Signup";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/home/Homepage";
import Login from "./components/auth/Login";

function App() {
  return (
    <div className="mx-auto App lg:container">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
