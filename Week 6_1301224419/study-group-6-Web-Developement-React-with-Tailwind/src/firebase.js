// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, updateDoc, addDoc, getDocs, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBNT5EqyRAb7h_yjhgrfG7OIDdCsa8Nfa8",
    authDomain: "gdgoc-54927.firebaseapp.com",
    projectId: "gdgoc-54927",
    storageBucket: "gdgoc-54927.firebasestorage.app",
    messagingSenderId: "1012689497070",
    appId: "1:1012689497070:web:144343f6ecf558a503fcff",
    measurementId: "G-6J0LV7N8V1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, doc, getDoc, updateDoc, addDoc, getDocs, deleteDoc };
