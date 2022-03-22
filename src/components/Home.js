

import { testComp } from './testComp'
import { useAuthContext} from '../hooks/useAuthContext'


export const Home = () => {

  const { user } = useAuthContext()




  return (
    <div className="Home">
      <h1>Home</h1>
      {user && <h3>User ID: {user.uid}</h3>}
      {!user && <h3 color='red'>Sorry, you can't see this content</h3>}
    </div>
  )
}