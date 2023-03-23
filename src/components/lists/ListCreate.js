import { useState, useContext } from 'react'
import { useAuthContext} from '../../hooks/useAuthContext'
import { ListContext } from '../../context/ListContext'
import { useSetDocument } from '../../hooks/useSetDocument'
import { getDatabase, ref, child, push } from "firebase/database"
import  delete_icon from "../../icons/delete_icon.svg"
import arrow_left_icon from "../../icons/arrow_left_icon.svg"
import VerifyPrompt from "../utility/prompts/VerifyPrompt"
import InfoPrompt from "../utility/prompts/InfoPrompt"


export const ListCreate = () => {
  const _ = require('lodash');

  const {user} = useAuthContext()
  const {setDocument} = useSetDocument()
  const { toggleDisplay, toggleSingle } = useContext(ListContext)

  const [items, setItems] = useState([])
  const [newTask, setNewTask] = useState("")
  const [listTitle, setListTitle] = useState("")
  const [togglePopupCreate, setTogglePopupCreate] = useState(false)
  const [togglePopupDiscard, setTogglePopupDiscard] = useState(false)
  const [togglePopupInfo, setTogglePopupInfo] = useState(false)

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
  }

  const handleDeleteTask = (e) => {
    let deepItems = _.cloneDeep(items)
    deepItems.splice(e.target.parentNode.value, 1)
    setItems(deepItems)
  }

  // --- Pop-Up Stuff: ---
  const showPopupCreate = () => {
    if (items.length > 0) {
      setTogglePopupCreate(true)
    }
    
    if (items.length == 0) {
      setTogglePopupInfo(true)
    }

  }
  
  const acceptFuncCreate = () => {
    handleSubmit()
    setTogglePopupCreate(false)
    toggleDisplay()
  }

  const declineFuncCreate = () => {
    setTogglePopupCreate(false)
  }

  const popUpData = {
    title: "Please Confirm",
    message: "Are you sure you want to create this list?",
    acceptFunc: acceptFuncCreate,
    declineFunc: declineFuncCreate
  }

  // ---

  const showPopupDiscard = () => {
    setTogglePopupDiscard(true)
  }
  
  const acceptDiscardFunc = () => {
    goBack()
    setTogglePopupDiscard(false)
  }

  const declineDiscardFunc = () => {
    setTogglePopupDiscard(false)
  }

  const popUpDataDiscard = {
    title: "Please Confirm",
    message: "Are you sure you want to leave without creating a list?",
    acceptFunc: acceptDiscardFunc,
    declineFunc: declineDiscardFunc
  }

  const goBack = () => {
    setItems([])
    setNewTask("")
    setListTitle("")
    toggleDisplay()
  }

  // ---

  const popUpInfo = {
    title: "Warning",
    message: "You can not create a list without any positions. Please add a position before attempting again.",
    acceptFunc: () => {setTogglePopupInfo(false)}
  }

  return (
    <div>
      
      <img 
          src={arrow_left_icon} 
          onClick={showPopupDiscard} 
          alt="go back to lists button"
          className="icon icon-medium"
      />

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

      <button type="submit" onClick={showPopupCreate}>Add List</button>
      
      {togglePopupCreate && <VerifyPrompt data={popUpData} />}
      {togglePopupDiscard && <VerifyPrompt data={popUpDataDiscard} />}
      {togglePopupInfo && <InfoPrompt data={popUpInfo} />}
      
    </div>
  )
}
