import { auth, createUserWithEmailAndPassword } from "../firebase/config";
import { useState, useEffect } from 'react'


export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  
  const signup = async (email, password, displayName, city) => {
    setError(null)
    setIsPending(true)
      
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      // console.log(response, response.user)

      if (!response) {
        throw new Error('Could not complete sign up')
      }

      // add display setName
      await response.user.updateProfile( {displayName} )

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