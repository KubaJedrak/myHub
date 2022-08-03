import { useEffect, useState } from "react";
import cloneDeep from 'lodash/cloneDeep'

import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import VerifyPrompt from "../utility/VerifyPrompt";

import delete_icon from "../../icons/delete_icon.svg"
import edit_icon from "../../icons/edit_icon.svg"
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
  const [originalTitle, setOriginalTitle] = useState(null)
  const [originalItems, setOriginalItems] = useState(null)

  const [editMode, setEditMode] = useState(false)

  const [currItemTargetID, setCurrItemTargetID] = useState(null)
  const [currItemTargetVal, setCurrItemTargetVal] = useState("")

  const {updateDocument, error: updateError, isPending: updateIsPending} = useUpdateDocument()

  // ------- LIST FUNCTIONS: ------- 
  // --- Toggle Edit State: --- 

  const handleEditList = (e) => {

    if (!editMode) {
      setEditMode(true)
      e.target.classList.toggle('button-active')
    } 

    if (editMode) {

      // throw prompt!!!! TO DO!

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

  const handleItemFocus = (e) => {

    const grandparentNode = e.target.parentNode.parentNode
    const firstChild = e.target.parentNode.firstChild
    const lastChild = e.target.parentNode.lastChild
    let previousFocus = null

    // -- Update Focus: -- 
    if (currItemTargetID) {
      previousFocus = currItemTargetID
    }
    setCurrItemTargetID(e.target.parentNode.parentNode.id)

    // -- Change Visibility of Children: -- 
    if (previousFocus !== null) {
      grandparentNode.children[previousFocus].firstChild.style.display = ""
      grandparentNode.children[previousFocus].lastChild.style.display = "none"
    }

    // JS-y version:
    if (lastChild.style.display === "none" ) {
      firstChild.style.display = "none"
      lastChild.style.display = "inline-block"
    } 
  }

  const handleItemChange = (e) => {
    setCurrItemTargetVal(e.target.value)
  }

  const handleUpdateItem = (e) => {
    const listPositionChildren = e.target.parentNode.parentNode.parentNode.children // Yeah, I did that >.>

    if (e.keyCode === 13) {
      saveItemChanges(listPositionChildren)
    }    

    if (e.keyCode === 27) {
      discardItemChanges(listPositionChildren)
    }
  }

  const saveItemChanges = (node) => {
    const tempItems = data.items 
    tempItems[currItemTargetID] = currItemTargetVal

    setCurrItemTargetVal("")
    node[currItemTargetID].firstChild.style.display = ""
    node[currItemTargetID].lastChild.style.display = "none"
  }

  const discardItemChanges = (node) => {
    setCurrItemTargetVal("")
    node[currItemTargetID].firstChild.style.display = ""
    node[currItemTargetID].lastChild.style.display = "none"
  }

  const saveChanges = () => {
    data.title = title //

    // TO DO    -> THROW PROMPT BEFORE TRIGERRING BELOW

    if (data.items !== originalItems) {
      updateDocument("lists", data.docID, "items", data.items)
    }

    if (data.title !== originalTitle) {
      updateDocument("lists", data.docID, "title", data.title)
    }

    setEditMode(false)
  }

  // --- Init State Updates : --- 

  useEffect( () => {
    setData(passedData)
    if (passedData) {
      setTitle(passedData.title)
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
          onClick={handleEditList}
        />         
        <img src={delete_icon} alt="list delete button" className="icon icon-medium" />

      </div>

      {data && title && (
        <div className="list-container">
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
              {data.items.map((item, index) => {
                return (
                  <li key={index} id={index} className="list-position-container">
                    <p className="list-position">{item}</p>
                  </li>
                )
              })}
            </>}

            {/* EDITABLE VERSION OF CURRENT LIST */}
            {editMode && <>
              {data.items.map((item, index) => {
                return (
                  <li key={index} id={index} className="list-position-container" onClick={handleItemFocus}>
                    <p 
                      className="list-position"
                    >{item}</p>
                    
                    {/* Save button bugs out on numerous clicks --> investigate */}
                    <div style={{display: "none"}}>     
                      <input 
                        type="text"
                        placeholder={item}
                        value={currItemTargetVal}
                        onChange={handleItemChange}
                        onKeyDown={handleUpdateItem}     
                        tabIndex="0"
                        id={index}           
                      />
                      <img src={save_icon} alt="item save button" className="icon icon-small" /> 
                    </div>
                  </li>
                )
              })}
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
