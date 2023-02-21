import { createContext, useState, useEffect } from 'react'
import { doc, collection, query, where, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from '../firebase/config'
import { useAuthContext } from '../hooks/useAuthContext'


export const ListContext = createContext();

export const ListContextProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [displayModeEnabled, setDisplayModeEnabled] = useState(true)
  const [createModeEnabled, setCreateModeEnabled] = useState(false)
  const [singleModeEnabled, setSingleModeEnabled] = useState(false)
  const [listID, setListID] = useState(null)

  const [deleteApproved, setDeleteApproved] = useState(false)
  const [listToDelete, setListToDelete] = useState(null)
  const [togglePopup, setTogglePopup] = useState(false)

  const [error, setError] = useState(null)
  const {user} = useAuthContext()

  // fetch data from Firebase
  useEffect(() => {
    if (user) {   // IF condition to prevent errors for unlogged users
      try{
        let items = []
        const dbRef = collection(db, "lists")
        const q = query(dbRef, where("userID", "==", user.uid) )
        const unsubscribe = onSnapshot (q, (querySnapshot) => {
          items = [] // do not remove - it prevents display refresh from not trigerring
          querySnapshot.forEach( item => {
            items.push(item.data())
          });
          setData(items)
        })
        return () => unsubscribe()
  
      } catch (err) {
        setError(err)
        throw new Error(err)
      }
    }
  }, [user])  

  // data edit functions:
  const deleteList = (listToDelete) => {
    try {
      deleteDoc(doc(db, "lists", listToDelete))
    } 
    catch(er) {
      throw new Error (er)
    }
  }

  const passListID = (id) => {
    setListID(id)
  }

  const acceptFunc = () => {
    setDeleteApproved(true)
    toggleDisplay()
    setTogglePopup(false)
  }

  const declineFunc = () => {
    setTogglePopup(false)
    setListToDelete(null)
  }

  const passListToDeleteID = (id) => {
    setListToDelete(id)
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
      setListToDelete(null)
    }
  }, [deleteApproved, listToDelete]) 

  // ---

  const toggleDisplay = () => {
    setCreateModeEnabled(false)
    setSingleModeEnabled(false)
    setDisplayModeEnabled(true)
    setListID(null)
  }
  const toggleSingle = () => {
    setDisplayModeEnabled(false)
    setCreateModeEnabled(false)
    setSingleModeEnabled(true)
  }
  const toggleCreate = () => {
    setDisplayModeEnabled(false)
    setSingleModeEnabled(false)
    setCreateModeEnabled(true)
    setListID(null)
  }

  const displayPopup = () => {
    setTogglePopup(true)
  }

  const hidePopup = () => {
    setTogglePopup(false)
  }

  // file to be provided via context
  const dataPack = {
    data,
    error,
    listID,
    displayModeEnabled,
    singleModeEnabled,
    createModeEnabled,
    toggleDisplay,
    toggleSingle,
    toggleCreate,
    passListID,
    deleteList,
    displayPopup,
    hidePopup,
    passListToDeleteID,
    togglePopup,
    listToDelete,
    deleteApproved,
    popUpData
  }

  return (
    <>
      {user && (
        <ListContext.Provider value={dataPack}>
          {children}
        </ListContext.Provider>
      )}
      {!user && <p>Please log in to access available lists</p>}
    </>
  );
} 
