// import { collection, addDoc } from "firebase/firestore"; 
import { useState, useEffect } from 'react'
import { useAuthContext} from '../../hooks/useAuthContext'
import { useSetDocument } from '../../hooks/useSetDocument'

console.log(typeof addDocument);

export function ToDoCreate () {

  const {user} = useAuthContext()
  const {setDocument} = useSetDocument()

  // state of progress
  const [taskList, setTaskList] = useState(null)
  const [newTask, setNewTask] = useState("")

  const handleNewTask = (e) => {
    e.preventDefault()
    setNewTask(e.target.value)
  }

  // const updateFirebase = () => {

  // }

  const handleSubmit = async (e) => {
    console.log("new task: ", newTask, "|", "task list: ", taskList)
    e.preventDefault() 
    setTaskList( [...taskList, newTask] )   
    console.log("new task list: ", taskList);
  }

  useEffect( () => {
    try {
      const payload = {
        id: user.uid,
        tasks: taskList
      }
      setDocument("taskLists", user.uid, payload )
      setNewTask("")
    } 
    
    catch (e) {
      console.error("Error setting document: ", e);
    }
  }, [taskList])

  console.log(taskList);

  return (
    <div>
      <h3> Temporary Title - Create </h3>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" value={newTask} onChange={handleNewTask} />
        </label>
        
        {/* <label>
          <select>

          </select>
        </label> */}
        
        <button>Add</button>
      </form>
    </div>
  )
}
