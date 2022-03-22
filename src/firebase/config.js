import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
// import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCxDi7laaZSD76uUns2kPlWSakRL1weqF4",
  authDomain: "myhub-1b6b9.firebaseapp.com",
  projectId: "myhub-1b6b9",
  storageBucket: "myhub-1b6b9.appspot.com",
  messagingSenderId: "731150066819",
  appId: "1:731150066819:web:8ef1b74e0c2b16d6ea27b6"
};

// init firebaseapp
const app = initializeApp(firebaseConfig)

// init services
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut }