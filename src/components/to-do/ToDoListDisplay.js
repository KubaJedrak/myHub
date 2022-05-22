import { useEffect, useState } from "react";
import  delete_icon from "../../icons/delete_icon.svg"
import { useSetDocument } from "../../hooks/useSetDocument"
import { setDoc } from "firebase/firestore";

export const ToDoListDisplay = (parentData) => {

  const { setDocument } = useSetDocument()

  let data = parentData.data
  console.log(data);

  const [focusedList, setFocusedList] = useState(undefined)
  const [listContent, setListContent] = useState(undefined)
  const [listTasks, setListTasks] = useState(undefined)
  const [listReady, setListReady] = useState(false)

  const handleClick = (e) => {
    setFocusedList(e.target.innerText)
  }

  const handleDeleteList = (e) => {
    console.log(e.target.previousSibling.innerText);
    console.log(data);

    const listToRemove = data.findIndex( list => list.title === e.target.previousSibling.innerText)
    data.splice(listToRemove, 1)
    console.log(data);

    // setDocument("taskLists", )


    // DO I NEED TO USE the .push() function to get the key first?
  }

  const setContent = async () => {
    let listData = data.find (list => list.title === focusedList)
    // console.log("FocusedList:", focusedList);
    // console.log("List Data:", listData);
    setListContent(listData)
    // console.log("List Content:", listContent);
    // console.log("List Tasks:", listTasks);
  }  

  useEffect( () => {
    setContent()
  }, [focusedList, setContent])

  useEffect( () => {
    if (listContent) {
      setListTasks(listContent.tasks)
      setListReady(true)
    }
  }, [listContent])

  return (
    <div>

      <div className="task-lists">
        <h3> Available Lists: </h3>
        <ul>
          {data.map( (list, index) => {
            return <li key={list.title}>
              <p onClick={handleClick}>{list.title}</p>
              <img src={delete_icon} alt="list delete button" onClick={handleDeleteList}/>
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
                  <img src={delete_icon} alt="task delete button" />
                </>
              } )}
            </ul>
          </div>
        </div>}
      {!listContent && <p>No list selected</p>}

    </div>
  )
}