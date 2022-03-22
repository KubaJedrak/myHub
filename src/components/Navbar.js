
import { Link } from 'react-router-dom' 
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

export const Navbar = () => {

  const {user} = useAuthContext()
  const {logout} = useLogout()

  return (
    <nav className="navbar">

      {!user && <>        
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
      </>
      }
      {user && <button className="button" onClick={logout}>Log Out</button>}



    </nav>
  )
}