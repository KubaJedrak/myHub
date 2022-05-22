import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
// import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA1NVy0C5zafdLT0nRpau30IlR6vI3dqd0",
  authDomain: "myhub-e728b.firebaseapp.com",
  projectId: "myhub-e728b",
  storageBucket: "myhub-e728b.appspot.com",
  messagingSenderId: "65242684718",
  appId: "1:65242684718:web:a88a75572eb933a82a2ebf"
};

// init firebaseapp
const app = initializeApp(firebaseConfig)

// init services
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut }