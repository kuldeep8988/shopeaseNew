// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCt9lZfZQNWByDX51NIrxZAAGqIO1xbfyk",
  authDomain: "native-f6460.firebaseapp.com",
  projectId: "native-f6460",
  storageBucket: "native-f6460.appspot.com",
  messagingSenderId: "210230815255",
  appId: "1:210230815255:web:1b470a9a1e0c848a274a52",
  measurementId: "G-W5QGD7GQBN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
export { auth, provider };
