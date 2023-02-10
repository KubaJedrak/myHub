import { useState } from "react"
import add_icon from "../../icons/save_icon.svg"
import close_icon from "../../icons/close_icon.svg"

export const Item = ({ item, index, data }) => {

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

  const discardChanges = () => {
    setEditMode(false)
    clearStates()
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

  return (
    
    <li key={index} className="list-position-container" >

      {!editMode && (
        <div key={index}>
          <p onClick={toggleEditMode}>{listItem}</p>          
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
