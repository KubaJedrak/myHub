import { useContext } from "react";
import { ListContext } from "../../context/ListContext"
import VerifyPrompt from "../utility/prompts/VerifyPrompt";
import delete_icon from "../../icons/delete_icon.svg"

export const ListsDisplay = () => {

  const {data, popUpData, togglePopup} = useContext(ListContext)
  const {passListID, displayPopup, passListToDeleteID} = useContext(ListContext)
  
  const handleDeleteList = (e) => {
    const listID = data[e.target.parentNode.value].docID
    passListToDeleteID(listID)
    displayPopup()
  }

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