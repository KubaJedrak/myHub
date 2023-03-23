import { auth, createUserWithEmailAndPassword } from "../firebase/config";
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
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
      },
      userID: response.user.uid,
      preferences: {
        isCityShown: false,
        isUserNameShown: false
      }
    })
  }
  
  const signup = async (email, password, userName) => {
    setError(null)
    setIsPending(true)
      
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      const secondResponse = await createUserProfile(userName, response)

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