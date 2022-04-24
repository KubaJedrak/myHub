import { auth, createUserWithEmailAndPassword } from "../firebase/config";
import { doc, setDoc } from 'firebase/firestore'

import { useState, useEffect } from 'react'

import { db } from '../firebase/config'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)


  const createUserProfile = async (name, city, response) => {
    await setDoc(doc(db, "users", response.user.uid), {
      firstName: name,
      // lastName: null,
      city: city,
      userID: response.user.uid,
      preferences: {}
    })
  }
  
  const signup = async (email, password, name, city) => {
    setError(null)
    setIsPending(true)
      
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      const secondResponse = createUserProfile(name, city, response)
      console.log(secondResponse) //???

      if (!response) {
        throw new Error('Could not complete sign up')
      }

      // add display setName
      // await response.user.updateProfile( {displayName} )
      
      // Abort controller
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }    
    } 
    catch(error) {
      // Abort Controller
      if (!isCancelled) {
        setError(error.message)
        setIsPending(false)
      }
    }
  }
  
  useEffect( () => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}