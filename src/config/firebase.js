import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCh_mouNOwCRaAhnW8Sz2hkojWJ2qxy4jE",
    authDomain: "redux-firebase-8d1bb.firebaseapp.com",
    projectId: "redux-firebase-8d1bb",
    storageBucket: "redux-firebase-8d1bb.appspot.com",
    messagingSenderId: "307665034539",
    appId: "1:307665034539:web:6241f65d60687a0986b96e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app