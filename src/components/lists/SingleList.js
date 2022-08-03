import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import { useGetDocument } from "../../hooks/useGetDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

import VerifyPrompt from "../utility/VerifyPrompt";

import delete_icon from "../../icons/delete_icon.svg"
import edit_icon from "../../icons/edit_icon.svg"
import close_icon from "../../icons/close_icon.svg"
import arrow_left_icon from "../../icons/arrow_left_icon.svg"

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/config"

import { useNavigate } from "react-router-dom";
import { List } from "../utility/List";

export const SingleList = () => {

  const [data, setData] = useState(null)
  const [originalData, setOriginalData] = useState(null)

  const [title, setTitle] = useState("")

  const [currentTargetID, setCurrentTargetID] = useState(null)
  const [currentTargetVal, setCurrentTargetVal] = useState("")
  const [editEnabled, setEditEnabled] = useState(false)

  const [editMode, setEditMode] = useState(false)

  // const [itemContent, setItemContent] = useState("")
  const [tempItems, setTempItems] = useState(null)

  const navigate = useNavigate()
  const {getDocument, error: fetchError, isPending: fetchIsPending} = useGetDocument()
  const {updateDocument, error: updateError, isPending: updateIsPending} = useUpdateDocument()

  const params = useParams()
  const docID = params.id // 'id' corresponds to the name specified in the App.js file

  const handleEditList = () => {
    if (editMode) setEditMode(false)     // thats all
    if (!editMode) setEditMode(true)     // leave as is or revert to close only?
  }

  // const handleEditItem = (e) => {
  //   setCurrModItemIndex(e.target.parentNode.id);
  //   setCurrModItemVal(data.items[e.target.parentNode.id])
  //   setItemContent(data.items[e.target.parentNode.id])
  //   setItemEditInProgress(true)
  // }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)    
  }

  const handleToggleEdit = () => {
    if (editEnabled) setEditEnabled(false)
    if (!editEnabled) setEditEnabled(true)

    console.log("Edit Enabled:", editEnabled);
  }

  const handleTarget = (e) => {
    // console.log(e.target.parentNode.id);
    // setCurrentTargetID(e.target.parentNode.id)
    // setCurrentTargetVal(data.items[e.target.parentNode.id])

    console.log(e.target.id);
    setCurrentTargetID(e.target.id)
    setCurrentTargetVal(data.items[e.target.id])

    const tempData = data.items.filter( element => element.id !== currentTargetID)
    setTempItems(tempData)

    console.log(tempData);
  } 

  const handleUpdateItem = (e) => {

    const tempItems = data.items

    tempItems[currentTargetID] = e.target.value

    console.log("ID:", currentTargetID);
    console.log("Current items:", data.items);

  }

  // const updateItem = (e) => {
  //   e.preventDefault()

  //   let tempData = data
  //   let tempItems = data.items
  //   tempItems[currModItemIndex] = itemContent
  //   tempData.items = tempItems

  //   console.log(data);

  //   // setData(tempData)
  //   setDataItems(tempItems)
  //   setItemEditInProgress(false)

  //   // ADD EXIT ON "ESC" PRESS (NOT HERE)
  // }

  
  
  const handleDeleteItem = (e) => {
    const tempData = data
    let tempItems = data.items
    const index = e.target.parentNode.id
    
    console.log(index);


    tempItems.splice(index, 1)
    console.log(tempItems);
    tempData.items = tempItems

    console.log(tempData);

    setData(tempData)  
  }

  const saveChanges = () => {

    // console.log(items);

    // more code here
    // updateDocument("lists", docID, "items", items)

    setEditMode(false)
  }

  const discardChanges = () => {
    // add prompt
    setData(originalData)
    setEditMode(false)    
  }

  const deleteList = () => {

    try {
      // deleteDoc(doc(db, "lists", docID))
      // splice the array
    } 
    catch {
      throw Error
    }

    // navigate("/lists")
  }

  const goToLists = () => {
    navigate("/lists")
  }

  useEffect( () => {
    async function fetchData() {    
      const fetchedData = await getDocument("lists", docID)
      setData(fetchedData)
      setTitle(fetchedData.title)
      setOriginalData(fetchedData)
    }

    fetchData()
  }, [])

  // useEffect( () => {
  //   console.log("Data changed somehow:");
  //   console.log("data:", data);
  //   console.log("-----------------");
  // })

  // FINISH THE EDIT MODE AND DELETE FUNCTIONS

  return (

    <div className="box-container single-list-display">
      <img src={arrow_left_icon} alt="go back to lists button" onClick={goToLists} />
      <List data={data} />
    </div>

    
  )

  // return (
  //   <div>

  //     {fetchIsPending && <p>Loading...</p>}
  //     {fetchError && <p>{fetchError}</p>}

  //     {data && (
  //       <div>

  //         

  //         {/* TOGGLE LIST EDIT MODE: */}
  //         {!editMode && <img src={edit_icon} alt="list edit button" onClick={handleEditList} />}
  //         {editMode && <img src={close_icon} alt="list edit mode exit button" onClick={discardChanges} />}
          
  //         <img src={delete_icon} alt="list delete button" onClick={deleteList} />

  //         {/* LIST TITLE */}
  //         <div>
  //           <div>
  //             {!editMode && <h4>{data.title}</h4>}
  //             {editMode && (
  //               <input type="text" onChange={handleTitleChange} value={title} />
  //             )}  
  //           </div>       
  //         </div>

  //         {/* Show list NOT in edit mode */}
  //         {!editMode && (
  //           <ul>
  //             {data.items.map( (element, index) => {
  //               return (
  //                 <li key={index} id={index}>
  //                   {element}
  //                 </li>
  //               )
  //             })}
  //           </ul>
  //         )}

  //         {/* Show list IN EDIT MODE */}
  //         {editMode && (
  //           <div>
  //             <ul>
  //               {data.items.map( (element, index) => {
  //                 return (
  //                   <li key={index} id={index} onClick={handleToggleEdit}>
  //                     {!editEnabled && <p>{element}</p>}
  //                     {editEnabled && <input type="text" // currentTargetID === index && 
  //                       placeholder={element} 
  //                       value={currentTargetVal} 
  //                       onClick={handleTarget} 
  //                       onChange={handleUpdateItem} 
  //                     />}
  //                   </li>
  //                 )
  //               })}

  //               {/* {!currentTargetID && (<div>
                                    
  //                   {data.items.map( (element, index) => {
  //                     return (
  //                       <li key={index} id={index} onClick={handleTarget}>
  //                         {element}
  //                       </li>
  //                     )}
  //                   )}
  //                 </div>
  //               )}

  //               {currentTargetID && tempItems.map((element, index) => {
  //                 return (
  //                   <li key={index} id={index}>{element}</li>
  //                 )}
  //               )} */}

  //             </ul>
  //                                    {/* ADD NEW POSITIONS */}
  //             <button className="button confirm-button" onClick={saveChanges}>Save changes</button>
  //           </div>
  //         )}         
  //       </div>
  //     )}
  //   </div>
  // )
}