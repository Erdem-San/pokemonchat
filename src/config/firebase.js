// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx2ePhbPmfehHTLvI7hmHlzlSzw3FP3LI",
  authDomain: "chat-bd4f3.firebaseapp.com",
  projectId: "chat-bd4f3",
  storageBucket: "chat-bd4f3.firebasestorage.app",
  messagingSenderId: "415291273540",
  appId: "1:415291273540:web:6e10c0c785072813432711",
  measurementId: "G-JQFEZ2SZG7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export { db };