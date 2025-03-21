// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, updateDoc, addDoc, getDocs, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "your_api_key",
    authDomain: "your_auth_domain",
    projectId: "your_project_id",
    storageBucket: "your_storage_bucket",
    messagingSenderId: "your_messaging_sender_id",
    appId: "yout_app_id",
    measurementId: "your_measurement_id"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, doc, getDoc, updateDoc, addDoc, getDocs, deleteDoc };
