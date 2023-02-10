import { useContext, useEffect } from "react"
import { ListsDisplay } from "../lists/ListsDisplay"
import { ListCreate } from "./ListCreate"
import { List } from "./List"
import { ListContext } from "../../context/ListContext"

export const ListsSection = () => {

  const { data, error, listID, passListID } = useContext(ListContext)
  const { displayModeEnabled, singleModeEnabled, createModeEnabled } = useContext(ListContext)
  const { toggleSingle, toggleCreate} = useContext(ListContext)

  useEffect(() => {
    if (listID) {     // NEED TO CLEAR THIS ON RETURN FROM LIST MODULE 
      // (otherwise doesnt allow to access the same element again until another is selected)
      toggleSingle()
    }
  }, [listID])

  return (
    <div>
      <button onClick={toggleCreate}>Create New List</button>
      {data && (
        <>
          {displayModeEnabled && <ListsDisplay lists={data} />}
          {singleModeEnabled && <List value={listID} />} 
          {createModeEnabled && <ListCreate />}
          {/* ADD EDIT MODE OPTION AND ICON TO ABOVE? */}
        </>
      )}
      {!data && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  )
}