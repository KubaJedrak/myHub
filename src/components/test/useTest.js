import { createContext, useState, useEffect, useContext, useCallback } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';

import { doc, collection, query, where, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase/config';

export const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const {user} = useAuthContext()

  useEffect(() => {
    try{
      const items = []
      const dbRef = collection(db, "lists")
      const q = query(dbRef, where("userID", "==", user.uid) )
      const unsubscribe = onSnapshot (q, (querySnapshot) => {
        querySnapshot.forEach( item => {
          items.push(item.data())
        })
        setData(items)
      })
      // return () => unsubscribe()

    } catch (error) {
      throw new Error(error)
    }
  }, [])  

  useEffect(() => {
    console.log(data);
  }, [data])

  return (
    <FirebaseContext.Provider value={data}>
      {children}
    </FirebaseContext.Provider>
  );
} 

export default FirebaseProvider;