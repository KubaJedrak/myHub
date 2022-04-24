import { ToDoList } from "./ToDoList"
import { ToDoCreate } from "./ToDoCreate"

import { useAuthContext} from '../../hooks/useAuthContext'
import { useGetDocument } from '../../hooks/useGetDocument'

import { useState, useCallback, useEffect } from "react"

export const ToDoModule = () => {

  const [data, setData] = useState(undefined)
  const [tasks, setTasks] = useState(undefined)
  const [dataReceived, setDataReceived] = useState(false)
   
  const {user} = useAuthContext()
  const {getDocument} = useGetDocument()

  const getData = useCallback( async() => {
    const res = await getDocument("taskLists", user.uid, user.uid)

    setData(res.data())
    setTasks(res.data())
    setDataReceived(true)
  }, [])

  useEffect( () => {
    getData()
    .catch(console.error)
  }, [getData])

  return (    
    <div>
      {dataReceived && <>
        {data && <ToDoList data={tasks} />} 
        {!data && <ToDoCreate />}
      </>}
      {/* {!dataReceived && <Loader />} */}
    </div>
  )
}