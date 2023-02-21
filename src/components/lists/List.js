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
  
  const { data, error, popUpData: popUpDataDelete, togglePopup } = useContext(ListContext)
  const { toggleDisplay, displayPopup, passListToDeleteID } = useContext(ListContext)
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
  const [toggleEditPopup, setToggleEditPopup] = useState(false)
  const [toggleDiscardPopup, setToggleDiscardPopup] = useState(false)


  const editModeToggleButtonRef = useRef(null)

  // ------- LIST FUNCTIONS: ------- 

  // --- Toggle Edit State: --- 
  const handleEditListButton = (e) => {


    if (!editMode) {
      setEditMode(true)
      e.target.classList.toggle('button-active')
    } 

    if (editMode ) {
      restoreStates()

      setItems(originalItems)
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
    let deepItems = _.cloneDeep(items)
    deepItems.splice(e.target.id, 1)
    setItems(deepItems)
  }

  // --- Save to Firebase // Discard Changes: --- 
  
  const restoreStates = () => {
    setNewItem("")
    setItems(originalItems)
    setTitle(originalTitle)
  }

  const saveChanges = () => {
    // TO DO    -> THROW PROMPT BEFORE TRIGERRING BELOW

    if (items != originalItems) { // do not deep equal
      updateDocument("lists", docID, "items", items)
    }
    if (title != originalTitle) {
      updateDocument("lists", docID, "title", title)
    }
    setEditMode(false)
    setOriginalItems(items)
    setOriginalTitle(title)
    // change back the CSS state of the icon to inactive
    editModeToggleButtonRef.current.classList.toggle('button-active')
  }

  const discardChanges = () => {
    restoreStates()
    setEditMode(false)
    editModeToggleButtonRef.current.classList.toggle('button-active')
  }

  // --- Delete List: ---
  const handleDeleteList = (e) => {
    passListToDeleteID(id)
    displayPopup()
  }

  // Func to pass to Item.js to delete that item
  const updateItem = (id, value) => {
    const tempItems = _.cloneDeep(items)
    tempItems[id] = value
    setItems(tempItems)
  }

  // --- Pop-Up Stuff: ---
  const showPopupEdit = () => {
    setToggleEditPopup(true)
  }
  
  const acceptEditFunc = () => {
    saveChanges()
    setToggleEditPopup(false)
  }

  const declineEditFunc = () => {
    setToggleEditPopup(false)
  }

  const popUpDataEdit = {
    title: "Please Confirm",
    message: "Are you sure you want to change this list?",
    acceptFunc: acceptEditFunc,
    declineFunc: declineEditFunc
  }

  // --- 

  const showPopupDiscard = () => {
    setToggleDiscardPopup(true)
  }
  
  const acceptDiscardFunc = () => {
    discardChanges()
    setToggleDiscardPopup(false)
  }

  const declineDiscardFunc = () => {
    setToggleDiscardPopup(false)
  }

  const popUpDataDiscard = {
    title: "Please Confirm",
    message: "Are you sure you want to discard changes made?",
    acceptFunc: acceptDiscardFunc,
    declineFunc: declineDiscardFunc
  }

  // ---------------------------

  return (
    <div className="list">

      <div className="list-ctrl-buttons">
        {/* TOGGLE LIST EDIT MODE: */}
        <img 
          src={arrow_left_icon} 
          onClick={toggleDisplay} 
          alt="go back to lists button"
          className="icon icon-medium"
        />
        <img 
          src={edit_icon} 
          alt="list edit button" 
          className="icon icon-medium button" 
          onClick={handleEditListButton}
          ref={editModeToggleButtonRef}
        />         
        <img 
          src={delete_icon} 
          alt="list delete button" 
          className="icon icon-medium"
          onClick={handleDeleteList} 
        />
      </div>

      {data && title && (
        <div className="list-container">         

          {/* DISPLAY MODE */}
          {!editMode && (
            <>
              <h3 className="list-title title-medium">{title}</h3>
              <ul className="list-table">
                {items.map((item, index) => {
                  return (
                    <li key={index} id={index} className="list-position-container">
                      <p className="list-position">{item}</p>
                    </li>
                  )
                })}
              </ul>
            </>
          )}

          {/*  --------------------  */}

          {/* EDIT MODE */}         
          {editMode && (
            <>
              {/* TITLE CHANGE INPUT */}
              <input 
                type="text" 
                className="edit-mode--input list-input" 
                value={title}
                onChange={handleTitleChange}
              />
              <article className="list-info">You can now modify the list. Press Enter once finished modifying each list position.</article>
              <ul className="list-table">
                {/* EDITABLE VERSION OF CURRENT LIST */}
                  {items.map((item, index) => {
                    return (
                      <li key={index} value={index}>
                        <Item item={item} value={index} updateItem={updateItem} />
                        <img src={delete_icon} alt="item delete button" className="icon icon-small" onClick={deleteItem} id={index} />
                      </li>
                    )
                  })}
              </ul>
              {/* ADD NEW ITEM: */}
              <div>
                <input
                  type="text"
                  value={newItem}
                  onChange={handleNewItem}
                />
                <img src={add_icon} alt="item edit save button" className="icon icon-small" onClick={addNewItem} />
              </div>
              {/* BUTTONS: */}
              {editMode && <button className="btn btn-list-submit" onClick={showPopupEdit}>Save Changes</button>}
              {editMode && <button className="btn btn-list-submit" onClick={showPopupDiscard}>Discard Changes</button>}
            </>
          )}          
        </div>
      )}
      {/* {processing && <Loader />} */}
      {!data && <p>Oopsie! No data available</p>}

      {togglePopup && <VerifyPrompt data={popUpDataDelete} />}
      {toggleEditPopup && <VerifyPrompt data={popUpDataEdit} />}
      {toggleDiscardPopup && <VerifyPrompt data={popUpDataDiscard} />}      
    </div>
  )
}
