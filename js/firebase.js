// Firebase Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { 
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

import { 
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCb4wbWGWSqaMFE5zYItWmUYBpXYKDGicw",
    authDomain: "stylesphere-81dfe.firebaseapp.com",
    projectId: "stylesphere-81dfe",
    storageBucket: "stylesphere-81dfe.firebasestorage.app",
    messagingSenderId: "545255416631",
    appId: "1:545255416631:web:d4b82393bb70e92e05b0b2"
  };
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  doc,
  setDoc,
  getDoc
};
