import app from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  appId: process.env.REACT_APP_APPID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
  constructor() {
    const initialzedApp = app.initializeApp(firebaseConfig);
    const database = getDatabase(initialzedApp);

    this.auth = app.auth();
  }
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  logOut = () => {
    this.auth.signOut();
  };

  updateUser = (updatedName, photoURL) => {
    const auth = getAuth();
    console.log("running");

    try {
      if (updatedName) {
        updateProfile(auth.currentUser, {
          displayName: updatedName,
        });
      } else if (photoURL) {
        updateProfile(auth.currentUser, {
          photoURL,
        });
      } else {
        updateProfile(auth.currentUser, {
          displayName: updatedName,
          photoURL,
        });
      }
    } catch (err) {
      console.log(err);
    }
    return auth.currentUser;
  };
}

export default Firebase;
