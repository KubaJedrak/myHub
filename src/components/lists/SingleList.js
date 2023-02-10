import { useContext } from "react";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { List } from "./List";
import { ListContext } from "../../context/ListContext";
import arrow_left_icon from "../../icons/arrow_left_icon.svg"

export const SingleList = () => {

  const { data } = useContext(ListContext)
  // const navigate = useNavigate()
  // const params = useParams()
  // const docID = params.id // 'id' corresponds to the name specified in the App.js file

  return (

    <div className="box-container single-list-display">
      <img src={arrow_left_icon} alt="go back to lists button"/>
      <List data={data} />
    </div>
  )
}