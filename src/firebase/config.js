import app from "firebase/compat/app";
import "firebase/compat/auth";
import { getDoc, getFirestore, updateDoc } from "firebase/firestore";
import {
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

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
    this.database = getFirestore();
  }

  // create a new user
  doCreateUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(this.auth, email, password);

  // sign in a user
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
  // update user
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

  // update profile pic of the user

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

  // get profile pic from firebase storage

  getProfilePicUrl = async (picturename) => {
    const storage = getStorage();
    const res = await getDownloadURL(ref(storage, picturename));
    return res;
  };

  // update the additional details of the user to the firestore database

  updateAdditionalUserDetails = async (parameters) => {
    const user = this.auth.currentUser;
    const { uid } = user;
    const { updatedHobbies, updatedAbout } = parameters;

    // if no user yet, create new doc for him/her
    const userRef = doc(this.database, "users", uid);
    if (userRef) {
      if (updatedHobbies) {
        await updateDoc(userRef, {
          hobbies: updatedHobbies,
        });
      }
      if (updatedAbout) {
        await updateDoc(userRef, {
          about: updatedAbout,
        });
      }
    } else {
      await setDoc(doc(this.database, "users", uid), {
        name: user.displayName,
        email: user.email,
        about: updatedAbout ? updatedAbout : null,
        hobbies: updatedHobbies ? updatedHobbies : null,
      });
    }

    // return the user document file
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return { updatedUser: docSnap.data() };
    } else {
      // doc.data() will be undefined in this case
      return "No such document!";
    }
  };

  // get user document from firestore
  getUserDataFile = async (uid) => {
    const userRef = doc(this.database, "users", uid);
    // return the user document file
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return { userFile: docSnap.data() };
    } else {
      // doc.data() will be undefined in this case
      return "No such document!";
    }
  };
}


export default Firebase;
