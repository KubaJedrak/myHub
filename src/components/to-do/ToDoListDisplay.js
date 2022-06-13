import { useEffect, useState, useCallback } from "react";
import  delete_icon from "../../icons/delete_icon.svg"
import  edit_icon from "../../icons/edit_icon.svg"
import { useSetDocument } from "../../hooks/useSetDocument"
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
// import {  } from "firebase/database";

export const ToDoListDisplay = (parentData) => {

  let lists = parentData.lists

  const [allLists, setAllLists] = useState(null)
  const [focusedList, setFocusedList] = useState(undefined)
  const [listContent, setListContent] = useState(undefined)
  const [listTasks, setListTasks] = useState(undefined)
  const [listReady, setListReady] = useState(false)

  const handleClick = (e) => {
    setFocusedList(e.target.innerText)
  }

  const handleDeleteList = (e) => {
    const db = getFirestore();

    const listToRemove = lists.findIndex( list => list.title === e.target.previousSibling.innerText)
    const listID = lists[listToRemove].docID

      deleteDoc(doc(db, "taskLists", listID)) // needs a getFirestore, NOT a getDatabase
        .then(
          console.log("List deleted successfully. Current lists: ", lists)
        )
        .catch(
          console.log("Deletion failed")
        )
      let newLists = lists.splice(listToRemove, 1)
      console.log(newLists);
      setAllLists(newLists)
      console.log(allLists);
      setListReady(false)
      setFocusedList(null)
  }

  const handleEditList = () => {

  }

  const handleDeleteTask = (e) => {

    setListReady(false)
    console.log(listTasks);

    const db = getFirestore();

    const taskToRemove = lists.findIndex( list => list.title === e.target.previousSibling.innerText)
    const tempArray = listTasks
    tempArray.splice(taskToRemove, 1)

    console.log(tempArray);

    setListTasks(tempArray)
  } // ^ UPDATES STATES BUT "UNFOCUSES" LIST 

  const setContent = useCallback(
    () => {
      let listData = lists.find (list => list.title === focusedList)
      setListContent(listData)
    }, [lists, focusedList]
  )

  // change focused list
  useEffect( () => {
    setContent()
  }, [focusedList, setContent])

  // display focused list's tasks
  useEffect( () => {
    if (listContent) {
      setListTasks(listContent.tasks)
      setListReady(true)
    }
  }, [listContent])

  // listen to changes in all lists array
  useEffect( () => {
    setAllLists(lists)
    console.log(allLists);
  }, [allLists])

  useEffect( () => {
    if (listTasks) {
      setListReady(true)
    }
  }, [listTasks])

  return (
    <div>

      <div className="task-lists">
        <h3> Available Lists: </h3>
        <ul>
          {lists.map( (list, index) => {
            return <li key={index}>
              <p onClick={handleClick}>{list.title}</p>
              <img src={delete_icon} alt="list delete button" onClick={handleDeleteList} />
              <img src={edit_icon} alt="list edit button" onClick={handleEditList} />
            </li>
          } )}
        </ul> 
      </div>

      {listReady && <div>
          <div>
            <h4>{listContent.title}</h4>
            <ul>
              {listTasks.map( (element, index) => {
                return <>
                  <li key={index}>{element}</li>
                  <img src={delete_icon} alt="task delete button" onClick={handleDeleteTask} />
                </>
              } )}
            </ul>
          </div>
        </div>}
      {!listContent && <p>No list selected</p>}

    </div>
  )
}