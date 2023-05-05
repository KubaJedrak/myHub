import './UserProfile.css';

import { useAuthContext } from '../../hooks/useAuthContext';
import { UserProfileDisplay } from './UserProfileDisplay';
import { useNavigate } from "react-router-dom"


import { doc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config"
import { useEffect, useState } from 'react';

export const UserProfile = () => {

  const navigate = useNavigate()
  const {user} = useAuthContext()

  const [userInfo, setUserInfo] = useState(user)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)


  // fetch user data
  useEffect(() => {
    if (user) {   // IF condition to prevent errors for unlogged users
      try {
        const unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
          const docData = doc.data()
          setData(docData)
        })
        return () => unsubscribe()
  
      } catch (err) {
        setError(err)
        console.log(err);
      }
    }
  }, [user])

  return (
    <div>
      {user && <>
        <div>
        {data && <UserProfileDisplay data={data} />}
        </div>        
      </>}
      {!user && <p>Sorry, you cannot see this page.</p>}
    </div>
  )
}