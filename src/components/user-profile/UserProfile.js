import './UserProfile.css';

import { useAuthContext } from '../../hooks/useAuthContext';
import { UserProfileDisplay } from './UserProfileDisplay';

import { doc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config"
import { useEffect, useState } from 'react';

export const UserProfile = () => {

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const {user} = useAuthContext()
  const userID = user.uid

  // fetch user data
  useEffect(() => {
    if (user) {   // IF condition to prevent errors for unlogged users
      try {
        const unsubscribe = onSnapshot(doc(db, "users", userID), (doc) => {
          const docData = doc.data()
          setData(docData)
        })
        return () => unsubscribe()
  
      } catch (err) {
        setError(err)
        console.log(err);
      }
    }
  }, [user, userID])

  return (
    <div>
      <div>
        {data && <UserProfileDisplay data={data} />}
      </div>
      {!user && <p>Sorry, you cannot see this page.</p>}
    </div>
  )
}