import app from "firebase/compat/app";
import "firebase/compat/auth";
import {
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  limitToFirst,
  getDatabase,
  query,
  ref as DbRef,
  set,
  onValue,
  update,
} from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseUrl: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  appId: process.env.REACT_APP_APPID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
  constructor() {
    const myapp = app.initializeApp(firebaseConfig);

    this.auth = getAuth();
    this.database = getDatabase(myapp, process.env.REACT_APP_DATABASE_URL);
  }
  doCreateUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(this.auth, email, password);

  doSignInWithEmailAndPassword = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(this.auth, email, password);
      return res.user;
    } catch (err) {
      return err;
    }
  };

  logOut = () => {
    this.auth.signOut();
  };

  updateUser = (updatedName, photoURL) => {
    try {
      if (updatedName) {
        updateProfile(this.auth.currentUser, {
          displayName: updatedName,
        });
      } else if (photoURL) {
        updateProfile(this.auth.currentUser, {
          photoURL,
        });
      } else {
        updateProfile(this.auth.currentUser, {
          displayName: updatedName,
          photoURL,
        });
      }
    } catch (err) {
      console.log(err);
    }
    return this.auth.currentUser;
  };

  updateProfilePic = async (picture) => {
    // Get current username
    const user = this.auth.currentUser;

    // Create a Storage Ref w/ uid
    const storage = getStorage();
    const storageRef = ref(storage, user.uid);

    // 'file' comes from the Blob or File API
    const response = await uploadBytes(storageRef, picture);
    return response;
  };

  getProfilePicUrl = async (picturename) => {
    const storage = getStorage();
    const res = await getDownloadURL(ref(storage, picturename));
    return res;
  };

  updateAdditionalUserDetails = async (parameters) => {
    const user = this.auth.currentUser;
    const { uid } = user;
    const { updatedHobbies, updatedAbout } = parameters;

    const getUser = DbRef(this.database, "users/" + uid);
    onValue(getUser, (snapshot) => {
      if (snapshot.exists()) {
        let updates = {};
        if (updatedHobbies !== null) {
          updates["hobbies"] = updatedHobbies;
        }
        if (updatedAbout !== null) {
          updates["about"] = updatedAbout;
        }

        const updatedProp = update(
          DbRef(this.database, "users/" + uid),
          updates
        );
      } else {
        //   console.log("create new user");
        set(DbRef(this.database, "users/" + user.uid), {
          username: user.displayName,
          email: user.email,
          profile_picture: user.photoURL,
          hobbies: updatedHobbies ? updatedHobbies : null,
          about: updatedAbout ? updatedAbout : null,
        });
      }
    });
  };
}


export default Firebase;
