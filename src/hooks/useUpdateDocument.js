import { useState, useEffect } from "react"
import { doc, updateDoc } from "firebase/firestore"; 
import { db } from '../firebase/config'

export const useUpdateDocument = () => {

  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false) 

  const updateDocument = async (collection, docName, updatedPos, updatedData) => {
    setError(null)
    setIsPending(true) 

    let updateConf = null

    try {
      const docRef = doc( db, collection, docName )
      updateConf = await updateDoc(docRef, {
        [updatedPos]: updatedData,
        lastUpdatedOnDate: new Date()
      })
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
      return updateConf
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

  return { updateDocument, error, isPending }
}