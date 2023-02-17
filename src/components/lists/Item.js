import { useState } from "react"
import add_icon from "../../icons/save_icon.svg"
import close_icon from "../../icons/close_icon.svg"

export const Item = ({ item, value, updateItem }) => {

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

  // Save/Discard changes to List Item
  const saveChanges = () => { 
    updateItem(value, newItemValue)
    setEditMode(false)
    clearStates()
  }

  const discardChanges = () => {
    setEditMode(false)
    clearStates()
  }

  // Clear all pertinent states
  const clearStates = () => {
    setNewItemValue("")
  }

  return (

    <div key={value} className="list-position-container" >
      {!editMode && (
        <div key={value}>
          <p onClick={toggleEditMode}>{item}</p>          
        </div>
      )}

      {editMode && (
        <div key={value} >
          <input 
            type="text"
            placeholder={item}
            value={newItemValue}
            onChange={handleItemChange}
          />
          <img src={add_icon} alt="item edit save button" className="icon icon-small" onClick={saveChanges} />
          <img src={close_icon} alt="item edit cancel button" className="icon icon-small" onClick={discardChanges} />
        </div>
      )}
    </div>

  )
}
