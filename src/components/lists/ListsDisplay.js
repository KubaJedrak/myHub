import { useEffect, useState } from "react";
import  delete_icon from "../../icons/delete_icon.svg"
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import { Link } from "react-router-dom"

import { db } from "../../firebase/config"

import VerifyPrompt from "../utility/VerifyPrompt";


export const ListsDisplay = (parentData) => {

  const [lists, setLists] = useState(parentData.lists)
  const [togglePopup, setTogglePopup] = useState(false)
  const [deleteApproved, setDeleteApproved] = useState(false)
  const [listToDelete, setListToDelete] = useState(null)
  const [indexToDelete, setIndexToDelete] = useState(null)
  
  const handleDeleteList = (e) => {
    const indexToRemove = lists.findIndex( list => list.title === e.target.previousSibling.innerText)
    const listID = lists[indexToRemove].docID

    console.log(indexToRemove);

    setIndexToDelete(indexToRemove)
    setListToDelete(listID)
    setTogglePopup(true)
  }

  const deleteList = () => {

    try {
      deleteDoc(doc(db, "lists", listToDelete))
      lists.splice(indexToDelete, 1)
    } 
    catch {
      throw Error
    }
  }

  const acceptFunc = () => {
    setDeleteApproved(true)
    setTogglePopup(false)
  }

  const declineFunc = () => {
    setTogglePopup(false)
  }

  const data = {
    title: "test",
    message: "test test test",
    acceptFunc,
    declineFunc
  }

  useEffect( () => {
    if (deleteApproved) {
      deleteList()
      setDeleteApproved(false)
    }
  }, [deleteApproved])

  // KEEP THE EDIT BUTTON AND CHANGE IT TO LINK (TO SINGLELIST.js) WITH EDIT MODE INITIALIZATION?

  return (
    <div> 
      {lists.length > 0 && (
        <div className="lists">
          <h3> Available Lists: </h3>
          <ul>
            {lists.map( (list, index) => {
              return (
                <li key={index}>
                  <Link to={`/lists/${list.docID}`}>
                    <p>{list.title}</p>
                    {/* <img src={edit_icon} alt="list edit button" onClick={handleEditList} /> */}
                  </Link>
                  <img src={delete_icon} alt="list delete button" onClick={handleDeleteList} />
                </li>
              )
            } )}
          </ul> 
        </div>
      )}
      {lists.length === 0 && <p>No lists available</p>}
      {togglePopup && <VerifyPrompt data={data} />}
    </div>
  )
}