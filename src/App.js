import { Counter } from "./Counter";
import Navbar from "./components/layout/Navbar";
import Signup from "./components/auth/Signup";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="mx-auto App lg:container">
      <Navbar />

      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
