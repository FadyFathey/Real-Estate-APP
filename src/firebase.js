// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyC92lo5izhMScasSvzNW04Q_nk3rmck1Hc",
    authDomain: "relator-73467.firebaseapp.com",
    projectId: "relator-73467",
    storageBucket: "relator-73467.appspot.com",
    messagingSenderId: "39853864454",
    appId: "1:39853864454:web:b08bb64717f8a3bb5f7587",
    measurementId: "G-FQR934K6VH"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
