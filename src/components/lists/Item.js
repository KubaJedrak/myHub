import { useState, useEffect, useRef } from "react"

import add_icon from "../../icons/save_icon.svg"
import close_icon from "../../icons/close_icon.svg"
import delete_icon from "../../icons/delete_icon.svg"


export const Item = ({item, index, data, deleteItem}) => {

  console.log(deleteItem);

  const [listItem, setListItem] = useState(item)
  const [editMode, setEditMode] = useState(false)
  const [newItemValue, setNewItemValue] = useState("")

  const toggleEditMode = () => {
    if (!editMode) {
      setEditMode(true)
    }
  }

  // Change/Delete Item 
  const handleItemChange = (e) => {
    setNewItemValue(e.target.value)
  }

  const deleteItemFunc = (e) => {
    console.log(e.target.id);
    deleteItem(e.target.id)

    console.log(data);

    // TO DO - STILL DOES NOT UPDATE STATE AT THE RIGHT TIME EVEN IF THE CHANGE DOES HAPPEN PROPERLY ????
  }

  const discardChanges = () => {
    setEditMode(false)
    clearStates()
  }

  // Save changes to List Item
  const saveChanges = () => { 
    const tempData = data

    if (newItemValue !== "") {
      tempData[index] = newItemValue    
      setListItem(newItemValue)
      setEditMode(false)
    } else {
      // TO DO - display a prompt?
    }

    clearStates()
  }

  // Clear all pertinent states
  const clearStates = () => {
    setNewItemValue("")
  }

  // MISC - TO DO: add key press detection
  const onKeyPressed = (e) => {
    console.log(e.key);
  }


  return (
    
    <li key={index} className="list-position-container" >

      {!editMode && (
        <div key={index}>
          <p onClick={toggleEditMode}>{listItem}</p>          
          <img src={delete_icon} alt="item delete button" className="icon icon-small" onClick={deleteItemFunc} id={index} />
        </div>
      )}

      {editMode && (
        <div key={index} >
          <input 
            type="text"
            placeholder={listItem}
            value={newItemValue}
            onChange={handleItemChange}
          />
          <img src={add_icon} alt="item edit save button" className="icon icon-small" onClick={saveChanges} />
          <img src={close_icon} alt="item edit cancel button" className="icon icon-small" onClick={discardChanges} />
        </div>
      )}
    </li>
  )
}
