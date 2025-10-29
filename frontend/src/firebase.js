import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkbFPk6ovllfxelvP1Vq5gDWSOvTy7jPs",
  authDomain: "ecommerce-75f9f.firebaseapp.com",
  projectId: "ecommerce-75f9f",
  storageBucket: "ecommerce-75f9f.firebasestorage.app",
  messagingSenderId: "851769111877",
  appId: "1:851769111877:web:337f47c7700d9d91dbfa2c",
  measurementId: "G-NJPYRX5VRF"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const db=getFirestore(app);
export default app;

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Send user data to backend
    await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.displayName,
        email: user.email
      }),
    });

    console.log("User signed in:", user);
    window.location.href = "/"; // Redirect to home page after successful sign-in
  } catch (error) {
    console.error("Error during Google sign-in:", error);
  }
};

export { auth, signInWithGoogle };




