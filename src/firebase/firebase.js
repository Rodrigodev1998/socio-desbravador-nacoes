
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvmaLL9IJu7dm1--9VHDhHp7zMjs2Q8B0",
  authDomain: "socio-desbravador-nacoes.firebaseapp.com",
  projectId: "socio-desbravador-nacoes",
  storageBucket: "socio-desbravador-nacoes.firebasestorage.app",
  messagingSenderId: "314295533284",
  appId: "1:314295533284:web:e28f456b4135700f63b6f1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };