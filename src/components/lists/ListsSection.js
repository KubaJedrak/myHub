import { Link } from "react-router-dom"
import { useState, useEffect, useCallback } from "react"

import { ListCreate } from "./ListCreate"
import { ListsDisplay } from "./ListsDisplay"

import { useAuthContext} from '../../hooks/useAuthContext'
import { useQueryDB } from "../../hooks/useQueryDB"

import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase/config'

export const ListsSection = () => {

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
   
  const {user} = useAuthContext()
  // const {queryDB, isPending, error} = useQueryDB()

  // get query data from Firebase
  const getData = useCallback( async () => {

    try {
      let items = []
      const dbRef = collection(db, "lists")
      const q = query(dbRef, where("userID", "==", user.uid) )
      const unsubscribe = onSnapshot (q, (querySnapshot) => {
        querySnapshot.forEach( item => {
          items.push(item.data())
        })
        setData(items)
      })
    } catch {
      setError(error.message)
    }
  }, [error, user.uid])

  useEffect( () => {
    getData()
  }, [getData])

  return (    
    <div>

      <Link to="/lists/create">Create New List</Link>

      {data && <ListsDisplay lists={data} />}
      {!data && <p>Loading...</p>}
      {error && <p>{error}</p>}

    </div>
  )
}