import { useState, useEffect } from "react"
import { doc, getDoc, onSnapshot } from "firebase/firestore"; 
import { db } from '../firebase/config'

export const useGetDocument = () => {

  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false) 

  const getDocument = async (collection, docName) => {
    setError(null)
    setIsPending(true) 

    let docSnap = null

    try {
      const docRef = doc( db, collection, docName )
      docSnap = await getDoc(docRef)
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
      return docSnap.data()
    }
    catch(error) {
      if (!isCancelled) {
        setError(error.message)
        setIsPending(false)
      }
    }

    // unsubscribe()
  }

  useEffect( () => {
    return () => setIsCancelled(true)
  }, [])

  return { getDocument, error, isPending }
}