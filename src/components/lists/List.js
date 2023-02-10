import { useEffect, useState, useRef, useContext } from "react";

import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import VerifyPrompt from "../utility/VerifyPrompt";
import {Item} from "./Item"

import delete_icon from "../../icons/delete_icon.svg"
import edit_icon from "../../icons/edit_icon.svg"
import add_icon from "../../icons/save_icon.svg"
import save_icon from "../../icons/save_icon.svg"
import arrow_left_icon from "../../icons/arrow_left_icon.svg"
import { ListContext } from "../../context/ListContext";


// TO DO: 
  // 1. add prompts where needed
  // 2. FIX THE WEIRD DISPLAY BUG ON EDIT MODE ITEM REMOVAL?
  
export const List = (listID) => {
  
  const { data, error } = useContext(ListContext)
  const { toggleDisplay } = useContext(ListContext)
  const {updateDocument, error: updateError, isPending: updateIsPending} = useUpdateDocument()
  
  const _ = require('lodash');
  const id = listID.value
  const list = data.find( el => el.docID === id)

  const [title, setTitle] = useState(list.title)
  const [items, setItems] = useState(list.items)
  const [docID, setDocID] = useState(list.docID)   // can I just skip the set functions?
  const [originalTitle, setOriginalTitle] = useState(title)
  const [originalItems, setOriginalItems] = useState(items)
  const [newItem, setNewItem] = useState("")
  const [editMode, setEditMode] = useState(false)

  const editModeToggleButtonRef = useRef(null)

  // ------- LIST FUNCTIONS: ------- 

  // --- Toggle Edit State: --- 
  const handleEditListButton = (e) => {

    restoreStates()

    if (!editMode) {
      setEditMode(true)
      e.target.classList.toggle('button-active')
    } 

    if (editMode ) {

      setItems(originalItems)
      
      // TO DO -  ADD CONDITION HERE (to prevent display of discarded changes)

      // TO DO - throw prompt to confirm changes!

      setEditMode(false) 
      e.target.classList.toggle('button-active')
    }
  }

  // --- Title: --- 
  const handleTitleChange = (e) => {
    const newTitle = e.target.value
    setTitle(newTitle)
  }

  // --- New Item in the Array: ---
  const handleNewItem =(e) => {
    setNewItem(e.target.value)
  }

  const addNewItem = () => {
    setItems([...items, newItem])
    setNewItem("")
  }

  // --- Delete item from the Array: ---
  const deleteItem = (e, id) => {
    console.log(id);
    console.log(e.target.id);
    let deepItems = _.cloneDeep(items)
    deepItems.splice(e.target.id, 1)
    console.log(deepItems);
    setItems(deepItems)
  }

  useEffect(() => {
    console.log(items, title);
  }, [items, title])

  // --- Save to Firebase // Discard Changes: --- 
  
  const restoreStates = () => {
    setNewItem("")
    setItems(originalItems)
    setTitle(originalTitle)
  }

  const saveChanges = () => {
    // TO DO    -> THROW PROMPT BEFORE TRIGERRING BELOW

    // DONE THIS WAY TO PREVENT UNNECESSARY FIREBASE FILE UPDATES - does this make sense? 
    // Or should I simply update both of the below at once, no matter the updated info?
    if (items !== originalItems) {
      updateDocument("lists", docID, "items", items)
    }
    if (items !== originalTitle) {
      updateDocument("lists", docID, "title", title)
    }
    restoreStates()
    setEditMode(false)
    // change back the CSS state of the icon to inactive
    editModeToggleButtonRef.current.classList.toggle('button-active')
  }

  const discardChanges = () => {
    restoreStates()
    setEditMode(false)
    editModeToggleButtonRef.current.classList.toggle('button-active')
  }


  // ---------------------------

  return (
    <div className="list">
      <img src={arrow_left_icon} onClick={toggleDisplay} alt="go back to lists button"/>

      <div className="list-ctrl-buttons">
        {/* TOGGLE LIST EDIT MODE: */}
        <img 
          src={edit_icon} 
          alt="list edit button" 
          className="icon icon-medium button" 
          onClick={handleEditListButton}
          ref={editModeToggleButtonRef}
        />         
        <img src={delete_icon} alt="list delete button" className="icon icon-medium" />
      </div>

      {data && title && (
        <div className="list-container">
          {/* TITLE CHANGE INPUT */}
          {!editMode && <h3 className="list-title title-medium">{title}</h3>}
          {editMode && <input 
            type="text" 
            className="edit-mode--input list-input" 
            value={title}
            onChange={handleTitleChange}
          />}

          {editMode && <article className="list-info">You can now modify the list. Press Enter once finished modifying each list position.</article>}

          <ul className="list-table">

            {/* DISPLAY OF CURRENT LIST */}
            {!editMode && <>
              {items.map((item, index) => {
                return (
                  <li key={index} id={index} className="list-position-container">
                    <p className="list-position">{item}</p>
                  </li>
                )
              })}
            </>}

            {/* EDITABLE VERSION OF CURRENT LIST */}
            {editMode && <>
              {items && <article>{items} WTF</article>}
              {items.map((item, index) => {
                return (
                  <div key={index} value={index}>
                    <Item item={item} index={index} data={items}/>
                    <img src={delete_icon} alt="item delete button" className="icon icon-small" onClick={deleteItem} id={index} />
                  </div>
                )
              })}
              <div>
                <input
                  type="text"
                  value={newItem}
                  onChange={handleNewItem}
                />
                <img src={add_icon} alt="item edit save button" className="icon icon-small" onClick={addNewItem} />
              </div>
            </>}
          </ul>
          {editMode && <button className="btn btn-list-submit" onClick={saveChanges}>Save Changes</button>}
          {editMode && <button className="btn btn-list-submit" onClick={discardChanges}>Discard Changes</button>}
        </div>
      )}
      {/* {processing && <Loader />} */}
      {!data && <p>Oopsie! No data available</p>}
    </div>
  )
}
