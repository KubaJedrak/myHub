import { ToDoList } from "./ToDoListDisplay"
import { ToDoCreate } from "./ToDoCreate"
import { ToDoListDisplay } from "./ToDoListDisplay"

import { useAuthContext} from '../../hooks/useAuthContext'

import { useState, useCallback, useEffect } from "react"
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config'
import { Link } from "react-router-dom"

export const ToDoModule = () => {

  const [data, setData] = useState(undefined)
  const [tasks, setTasks] = useState(undefined)
  const [dataReceived, setDataReceived] = useState(false)
   
  const {user} = useAuthContext()

  const queryDB = useCallback( async () => {
    let taskLists = []
    const dbRef = collection(db, "taskLists")
    const q = query(dbRef, where("userID", "==", user.uid) )
    const querySnapshot = await getDocs(q)
    console.log(querySnapshot);
     
    querySnapshot.forEach( (doc) => {
      taskLists.push(doc.data())
    })
    setData(taskLists)
    setDataReceived(true)
    // console.log(taskLists);
    // console.log(data[0].tasks)
  }, [ data, user.uid ])

  useEffect( () => {
    queryDB()
      .catch(console.error)
  }, []) // do NOT add queryDB to dependency!

  useEffect( () => {

  }, [data])

  return (    
    <div>

      {dataReceived && <ToDoListDisplay data={data} />}
      {!dataReceived && <p>Loading...</p>}

      <ToDoCreate data={data} />
      
    </div>
  )
}