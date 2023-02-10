import { useState } from 'react'
import { useAuthContext} from '../../hooks/useAuthContext'
import { useSetDocument } from '../../hooks/useSetDocument'
import { getDatabase, ref, child, push } from "firebase/database"
import { useNavigate } from "react-router-dom";
import  delete_icon from "../../icons/delete_icon.svg"


export const ListCreate = () => {

  const navigate = useNavigate()
  const _ = require('lodash');

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
  const handleSubmit = () => {
    const db = getDatabase();
    let newPostKey = push(child(ref(db), 'lists')).key; // replace with addDoc() // (new) docRef ???

    const payload = {
      docID: newPostKey,
      userID: user.uid,
      title: listTitle,
      items
    }
    setDocument("lists", newPostKey, payload)
    setListTitle("")
    setItems([])
    navigate("/lists")
  }

  const handleDeleteTask = (e) => {
    let deepItems = _.cloneDeep(items)
    deepItems.splice(e.target.parentNode.value, 1)
    setItems(deepItems)
  }

  return (
    <div>
      {/* REPLACE THE TITLE BELOW WITH A MODULE LATER? */}
      <h3> Create a new list </h3>

      <form>
        <label>
          <input type="text" value={listTitle} onChange={handleListTitle} required />
        </label>
      </form>

      {items && <div>
        <ul>
          {items.map( (task, index) => {
            return (
              <li key={index} value={index}>
                <p>{task}</p>
                <img src={delete_icon} alt="list delete button" onClick={handleDeleteTask}/>
              </li>)
          })}
        </ul>
      </div>}

      <form onSubmit={handleAddNewTask}>
        <label>
          <input type="text" value={newTask} onChange={handleNewTask} required />
        </label>       
        <button>Add Position</button>
      </form>

      <button type="submit" onClick={handleSubmit}>Add List</button>
    </div>
  )
}
