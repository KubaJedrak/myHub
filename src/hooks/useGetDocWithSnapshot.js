import { useState, useEffect, useCallback } from "react"
import { collection, onSnapshot, doc } from "firebase/firestore";
import { db } from '../firebase/config'


export const useGetDocWithSnapshot = () => {

  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)

  const [data, setData] = useState(null)

  const getDocWithSnapshot = useCallback((collectionName, docName) => {
    setError(null)
    setIsPending(true)

    try {
      const unsubscribe = onSnapshot(doc(db, collectionName, docName), (doc) => {
        setData(doc.data())
      })
    
      // Abort controller
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }    

    } catch {
      // Abort Controller
      if (!isCancelled) {
        setError(error.message)
        setIsPending(false)
      }
    }

    return data
  }, [error, isCancelled])

  useEffect( () => {
    return () => {
      setIsCancelled(true)
    }
  }, [])

  return {getDocWithSnapshot}
}