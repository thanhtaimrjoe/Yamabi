import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC4A8SCgtmFiQ6OffN9Ge2op8LJa1Dd6Y0",
  authDomain: "yama-98f64.firebaseapp.com",
  databaseURL:
    "https://yama-98f64-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "yama-98f64",
  storageBucket: "yama-98f64.appspot.com",
  messagingSenderId: "179953566723",
  appId: "1:179953566723:web:a8aab0ccc3db9942ae3a36",
  measurementId: "G-61D2S9EE71",
};

export const app = initializeApp(firebaseConfig);
