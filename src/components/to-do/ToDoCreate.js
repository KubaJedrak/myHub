import { useState, useEffect } from 'react'
import { useAuthContext} from '../../hooks/useAuthContext'
import { useSetDocument } from '../../hooks/useSetDocument'
import { collection, addDoc } from "firebase/firestore"; 
import { getDatabase, ref, child, push } from "firebase/database"
import { db } from '../../firebase/config'

import  delete_icon from "../../icons/delete_icon.svg"

export const ToDoCreate = () => {

  const {user} = useAuthContext()
  const {setDocument} = useSetDocument()

  // state of progress
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [taskListName, setTaskListName] = useState("")

  // update current new task in state
  const handleNewTask = (e) => {
    e.preventDefault()
    setNewTask(e.target.value)
    console.log(newTask);
  }

  const handleAddNewTask = (e) => {
    e.preventDefault()
    setTasks([...tasks, newTask])
    setNewTask("")
    console.log(tasks);
  }

  // update task list name
  const handleTaskListName = (e) => {
    e.preventDefault()
    setTaskListName(e.target.value)
    console.log(taskListName);

  }

  // update task LIST in state
  const handleSubmit = async (e) => {
    // e.preventDefault(); 
    const db = getDatabase();

    let newPostKey = push(child(ref(db), 'taskLists')).key;

    const payload = {
      docID: newPostKey,
      userID: user.uid,
      title: taskListName,
      tasks: tasks
    }

    console.log(payload);

    setDocument("taskLists", newPostKey, payload)

    setTaskListName("")
    setTasks([])
  }

  const handleDeleteTask = (e) => {
    console.log(e.target.previousSibling.innerText);

    const taskToRemove = tasks.findIndex( task => task === e.target.previousSibling.innerText)
    tasks.splice(taskToRemove, 1)
    console.log(tasks);
  }

  return (
    <div>
      <h3> Temporary Title - Create </h3>

      <form>
        <label>
          <input type="text" value={taskListName} onChange={handleTaskListName} />
        </label>
      </form>

      <ul>
        {tasks && tasks.map( (task, index) => {
          return <li key={index}>
          <p>{task}</p>
          <img src={delete_icon} alt="task delete button" onClick={handleDeleteTask}/>
        </li>
        })}
      </ul>

      <form onSubmit={handleAddNewTask}>
        <label>
          <input type="text" value={newTask} onChange={handleNewTask} />
        </label>       
        <button>Add Task</button>
      </form>

      <button type="submit" onClick={handleSubmit}>Add List</button>
    </div>
  )
}
