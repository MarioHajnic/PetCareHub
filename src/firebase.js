import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage"




const firebaseConfig = {
    apiKey: "AIzaSyBWQGzaxrHiKZw58V_d4HtdM9Esx-bzbPo",
    authDomain: "petcare-hub-48834.firebaseapp.com",
    projectId: "petcare-hub-48834",
    storageBucket: "petcare-hub-48834.appspot.com",
    messagingSenderId: "844731366478",
    appId: "1:844731366478:web:32f5d9c82badbe83a9171f",
    measurementId: "G-QWJ39R8NKK"
}


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app)