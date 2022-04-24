import { useState, useEffect } from "react"
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../firebase/config'


export const useSetDocument = () => {
  
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)

  const setDocument = async (collectionName, docName, payload) => {
    setError(null)
    setIsPending(true)

    try {
      setDoc(doc(db, collectionName, docName), payload);

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(error) {
      if (!isCancelled) {
        setError(error.message)
        setIsPending(false)
      }
    }
  }

  useEffect( () => {
    return () => setIsCancelled(true)
  }, [])

  return { setDocument, error, isPending }
  
}
