// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUb7uoLx8Gh6tAgBD6ucnaBivPsuQidQY",
  authDomain: "app-prueba-df3e7.firebaseapp.com",
  projectId: "app-prueba-df3e7",
  storageBucket: "app-prueba-df3e7.firebasestorage.app",
  messagingSenderId: "506380476412",
  appId: "1:506380476412:web:e246ca807e3ab084c85c79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getDatabase(app)
export const auth= getAuth(app)

export {app,db}