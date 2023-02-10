import { ListContextProvider } from "../../context/ListContext"
import { ListsSection } from "./ListsSection"

export const ListsWrapper = () => {
  return (
    <ListContextProvider>
      <ListsSection />
    </ListContextProvider>
  )
}
