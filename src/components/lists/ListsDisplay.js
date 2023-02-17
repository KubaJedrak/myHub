import { useEffect, useState, useContext } from "react";
import { ListContext } from "../../context/ListContext"
import VerifyPrompt from "../utility/VerifyPrompt";
import delete_icon from "../../icons/delete_icon.svg"

export const ListsDisplay = () => {

  const {data} = useContext(ListContext)
  const {deleteList, passListID} = useContext(ListContext)
  const [togglePopup, setTogglePopup] = useState(false)
  const [deleteApproved, setDeleteApproved] = useState(false)
  const [listToDelete, setListToDelete] = useState(null)
  
  const handleDeleteList = (e) => {
    const listID = data[e.target.parentNode.value].docID
    setListToDelete(listID)
    setTogglePopup(true)
  }

  const acceptFunc = () => {
    setDeleteApproved(true)
    setTogglePopup(false)
  }

  const declineFunc = () => {
    setTogglePopup(false)
  }

  const popUpData = {
    title: "Warning",
    message: "Are you sure you want to remove this list?",
    acceptFunc,
    declineFunc
  }

  useEffect( () => {
    if (deleteApproved) {
      deleteList(listToDelete)
      setDeleteApproved(false)
    }
  }, [deleteApproved, deleteList, listToDelete]) 

  // --------------------------

  const goToSingleList = (e) => {
    const {docID} = data[e.target.parentNode.value]
    passListID(docID)
  }
  
  return (
    <div> 
      {data.length > 0 && (
        <div className="lists">
          <h3> Available Lists: </h3>
          <ul>
            {data.map( (list, index) => {
              return (
                <li key={index} value={index}>
                  <p onClick={goToSingleList}>{list.title}</p>
                  <img src={delete_icon} alt="list delete button" onClick={handleDeleteList} />
                </li>
              )
            } )}
          </ul> 
        </div>
      )}
      {data.length === 0 && <p>No lists available</p>}
      {togglePopup && <VerifyPrompt data={popUpData} />}
    </div>
  )
}