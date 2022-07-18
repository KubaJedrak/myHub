import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import { useGetDocument } from "../../hooks/useGetDocument";
import VerifyPrompt from "../utility/VerifyPrompt";

import delete_icon from "../../icons/delete_icon.svg"
import edit_icon from "../../icons/edit_icon.svg"


export const SingleList = () => {

  const [data, setData] = useState(null)
  const [editMode, setEditMode] = useState(false)

  const {getDocument, error, isPending} = useGetDocument()

  const params = useParams()
  const docID = params.id // 'id' corresponds to the name specified in the App.js file

  const handleEditList = () => {
    setEditMode(true)
  }

  const handleEditItem = () => {

  }
  
  const handleDeleteItem = () => {

  }


  useEffect( () => {
    async function fetchData() {    
      const fetchedData = await getDocument("lists", docID)
      setData(fetchedData)
    }

    fetchData()
  }, [])

  // FINISH THE EDIT MODE AND DELETE FUNCTIONS

  return (
    <div>

      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {data && (
        <div>
          <div>
            <h4>{data.title}</h4>
            <img src={edit_icon} alt="list edit button" onClick={handleEditList} />
          </div>
          <ul>
            {data.items.map( (element, index) => {
              return (
                <>
                <li key={index}>{element}</li>
                <img src={edit_icon} alt="item edit button" onClick={handleEditItem} />
                <img src={delete_icon} alt="item delete button" onClick={handleDeleteItem} />
                </>
              )
            })}
          </ul>
        </div>
      )}


    </div>
  )
}