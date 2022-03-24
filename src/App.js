import Navbar from "./components/layout/Navbar";
import Signup from "./components/auth/Signup";
import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Homepage from "./components/home/Homepage";
import Login from "./components/auth/Login";
import Profile from "./components/layout/Profile";
import EditProfile from "./components/layout/EditProfile";
import { useSelector } from "react-redux";
import { FirebaseContext } from "./firebase";
import Picture from "./components/layout/Picture";

function App() {
  return (
    <Router>
      <div className="App ">
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/profile"
            element={
              <RequireAuth redirectTo="/login">
                <FirebaseContext.Consumer>
                  {(firebase) => <Profile firebase={firebase} />}
                </FirebaseContext.Consumer>
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/edit_profile"
            element={
              <RequireAuth redirectTo="/login">
                <FirebaseContext.Consumer>
                  {(firebase) => <EditProfile firebase={firebase} />}
                </FirebaseContext.Consumer>
              </RequireAuth>
            }
          />
          <Route path="/pictures/:slug" element={<Picture />} />
        </Routes>
      </div>
    </Router>
  );
}
function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default App;
