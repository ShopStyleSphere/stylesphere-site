// Firebase Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Firebase config (REPLACE with your real values)
const firebaseConfig = {
  apiKey: "AIzaSyCb4wbWGWSqaMFE5zYItWmUYBpXYKDGicw",
  authDomain: "stylesphere-81dfe.firebaseapp.com",
  projectId: "stylesphere-81dfe",
  storageBucket: "stylesphere-81dfe.firebasestorage.app",
  messagingSenderId: "545255416631",
  appId: "1:545255416631:web:d4b82393bb70e92e05b0b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Register user + save in Firestore
export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      role: "client",
      points: 0,
      level: "Bronze",
      wallet: 0,
      createdAt: new Date()
    });

    alert("Account created ✅");
  } catch (error) {
    alert(error.message);
  }
}

// Login user
export async function loginUser(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful ✅");
    window.location.href = "client-dashboard.html";
  } catch (error) {
    alert(error.message);
  }
}
