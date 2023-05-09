import { auth, createUserWithEmailAndPassword } from "../firebase/config";
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'


export const useSignup = () => {

  const {dispatch} = useAuthContext() 

  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)

  const createUserProfile = async (userName, response) => {
    await setDoc(doc(db, "users", response.user.uid), {
      userData: {
        firstName: "",
        lastName: "",
        userName: userName,
        city: "",
        profileImageURL: ""
      },
      userID: response.user.uid,
      preferences: {
        isCityShown: false,
        isUserNameShown: false
      },
      createdOnDate: new Date(),
      lastUpdatedOnDate: new Date()
    })
  }
  
  const signup = async (email, password, userName) => {

    setError(null)
    setIsPending(true)
      
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      const secondResponse = await createUserProfile(userName, response)
      dispatch( {type: 'SIGNUP', payload: response.user} )  

      if (!response) {
        throw new Error('Could not complete sign up')
      }
      
      // Abort controller
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }    
    } 
    catch(error) {
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