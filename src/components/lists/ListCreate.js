import { useState } from 'react'
import { useAuthContext} from '../../hooks/useAuthContext'
import { useSetDocument } from '../../hooks/useSetDocument'
// import { collection, addDoc } from "firebase/firestore"; 
import { getDatabase, ref, child, push } from "firebase/database"
// import { db } from '../../firebase/config'

import { useNavigate } from "react-router-dom";

import  delete_icon from "../../icons/delete_icon.svg"

export const ListCreate = () => {

  const navigate = useNavigate()

  const {user} = useAuthContext()
  const {setDocument} = useSetDocument()

  const [items, setItems] = useState([])
  const [newTask, setNewTask] = useState("")
  const [listTitle, setListTitle] = useState("")

  // add List Title
  const handleListTitle = (e) => {
    e.preventDefault()
    setListTitle(e.target.value)
  }

  // update currently added task
  const handleNewTask = (e) => {
    e.preventDefault()
    setNewTask(e.target.value)
  }

  // add new task to the list
  const handleAddNewTask = (e) => {
    e.preventDefault()
    setItems([...items, newTask])
    setNewTask("")
  }

  // send the list to firebase db
  const handleSubmit = (e) => {
    const db = getDatabase();
    let newPostKey = push(child(ref(db), 'lists')).key;

    const payload = {
      docID: newPostKey,
      userID: user.uid,
      title: listTitle,
      items: items
    }
    setDocument("lists", newPostKey, payload)
    setListTitle("")
    setItems([])
    navigate("/lists")
  }

  const handleDeleteTask = (e) => {
    console.log("PING");
    console.log(items);
    const indexToRemove = items.findIndex( list => list === e.target.previousSibling.innerText)
    items.splice(indexToRemove, 1)
    console.log(items);
  }

  return (
    <div>
      <h3> Temporary Title - Create </h3>

      <form>
        <label>
          <input type="text" value={listTitle} onChange={handleListTitle} />
        </label>
      </form>

      {items && <div>
        <ul>
          {items.map( (task, index) => {
            return <li key={index}>
            <p>{task}</p>
            <img src={delete_icon} alt="list delete button" onClick={handleDeleteTask}/>
          </li>
          })}
        </ul>
      </div>}

      <form onSubmit={handleAddNewTask}>
        <label>
          <input type="text" value={newTask} onChange={handleNewTask} />
        </label>       
        <button>Add Position</button>
      </form>

      <button type="submit" onClick={handleSubmit}>Add List</button>
    </div>
  )
}
