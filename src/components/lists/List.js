import { useEffect, useState, useRef } from "react";
import cloneDeep from 'lodash/cloneDeep'

import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import VerifyPrompt from "../utility/VerifyPrompt";
import {Item} from "./Item"

import delete_icon from "../../icons/delete_icon.svg"
import edit_icon from "../../icons/edit_icon.svg"
import add_icon from "../../icons/save_icon.svg"
import save_icon from "../../icons/save_icon.svg"


// TO DO: 
  // 1. add prompts where needed
  // 2. fix input click bugs
  // 3. add another data pull from server on update??? // add listener??
  // 4. investigate how to replace JS-y code with refs // other REACT solution ????

export const List = (parentData) => {

  const passedData = parentData.data

  const [data, setData] = useState(null)
  const [title, setTitle] = useState("")
  const [items, setItems] = useState(null)
  const [originalTitle, setOriginalTitle] = useState(null)
  const [originalItems, setOriginalItems] = useState(null)

  const [newItem, setNewItem] = useState("")
  const [newItems, setNewItems] = useState(null)

  const editModeToggleButtonRef = useRef(null)

  // const newItemRef = useRef(null)

  const [editMode, setEditMode] = useState(false)

  const [currItemTargetID, setCurrItemTargetID] = useState(null)
  const [currItemTargetVal, setCurrItemTargetVal] = useState("")

  const {updateDocument, error: updateError, isPending: updateIsPending} = useUpdateDocument()

  // ------- LIST FUNCTIONS: ------- 
  // --- Toggle Edit State: --- 

  const handleEditListButton = (e) => {

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

  // --- Items: --- 

  // const handleUpdateItem = (e) => {


  //   if (e.keyCode === 13) {
  //     saveItemChanges()
  //   }    

  //   if (e.keyCode === 27) {
  //     discardItemChanges()
  //   }
  // }

  // 


  // ADD NEW ITEM TO THE LIST ARRAY
  const updateNewItem =(e) => {
    setNewItem(e.target.value)
    console.log(newItem);
  }

  const addNewItem = () => {
    setItems([...items, newItem])
    setNewItem("")
  }

  // DELETE EXISTING ITEM FROM LIST array
  const deleteItem = (id) => {
    const tempData = items
    tempData.splice(id, 1)
  }

  // SAVE CHANGES TO FIREBASE
  const saveChanges = () => {
    data.title = title //

    // TO DO    -> THROW PROMPT BEFORE TRIGERRING BELOW

    if (items !== originalItems) {
      updateDocument("lists", data.docID, "items", items)
    }

    if (items !== originalTitle) {
      updateDocument("lists", data.docID, "title", data.title)
    }

    setEditMode(false)
    console.log(editModeToggleButtonRef);
    console.log(editModeToggleButtonRef.current);

    editModeToggleButtonRef.current.classList.toggle('button-active')
  }

  // --- Init State Updates : --- 

  useEffect( () => {
    setData(passedData)
    if (passedData) {
      setTitle(passedData.title)
      setItems(passedData.items)
      setOriginalTitle(cloneDeep(passedData.title))
      setOriginalItems(cloneDeep(passedData.items))
    }
  }, [passedData])

  // ---------------------------

  return (
    <div className="list">

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
              {items.map((item, index) => {
                return (
                  <Item item={item} index={index} data={items} deleteItem={deleteItem} />
                )
              })}
              <div>
                <input
                  type="text"
                  value={newItem}
                  onChange={updateNewItem}
                />
                <img src={add_icon} alt="item edit save button" className="icon icon-small" onClick={addNewItem} />
              </div>
            </>}
          </ul>
          {editMode && <button className="btn btn-list-submit" onClick={saveChanges} >Save Changes</button>}
        </div>
      )}
      {/* {processing && <Loader />} */}
      {!data && <p>No data available</p>}
    </div>
  )
}
