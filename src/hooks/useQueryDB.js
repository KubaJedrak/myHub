
import { useState, useCallback, useEffect } from "react"


import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/config'

export function useQueryDB() {

  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)

  const [data, setData] = useState(null)

  const queryDB = useCallback((collectionName, queryType, queryValue) => {
    setError(null)
    setIsPending(true)

    try {
      let items = []
      const dbRef = collection(db, collectionName)
      const q = query(dbRef, where(queryType, "==", queryValue) )
      const unsubscribe = onSnapshot (q, (querySnapshot) => {
        querySnapshot.forEach( item => {
          items.push(item.data())
        })
        setData(items)
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
  }, [data, error, isCancelled])

  useEffect( () => {
    return () => setIsCancelled(true)
  }, [])

  // unsubscribe()

  return {queryDB}
}
