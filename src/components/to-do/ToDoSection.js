import { ToDoList } from "./ToDoListDisplay"
import { ToDoCreate } from "./ToDoCreate"
import { ToDoListDisplay } from "./ToDoListDisplay"

import { useAuthContext} from '../../hooks/useAuthContext'

import { useState, useCallback, useEffect } from "react"
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase/config'
// import { Link } from "react-router-dom"

export const ToDoModule = () => {

  const [data, setData] = useState(undefined)
  const [lists, setLists] = useState([])
  const [dataReceived, setDataReceived] = useState(false)
   
  const {user} = useAuthContext()

  const queryDB = useCallback( async () => {
    let taskLists = []
    const dbRef = collection(db, "taskLists")
    const q = query(dbRef, where("userID", "==", user.uid) )

    const unsubscribe = onSnapshot (q, (querySnapshot) => {
      const lists = []
      console.log(querySnapshot.docs);
      taskLists = []
      querySnapshot.forEach( doc => {
        taskLists.push(doc.data())
      })
      setLists(taskLists)
      console.log(taskLists);
    })

    setDataReceived(false)
    setData(taskLists)
    setDataReceived(true)
    console.log("PING", lists);
  }, [ user.uid ])

  useEffect( () => {
    queryDB()
      .catch(console.error)
  }, []) // do NOT add queryDB to dependency unless its a callback!

  useEffect( () => {

  }, [data])

  return (    
    <div>

      {dataReceived && <ToDoListDisplay lists={lists} />}
      {!dataReceived && <p>Loading...</p>}

      <ToDoCreate />
      
    </div>
  )
}