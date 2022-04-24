import { auth, signInWithEmailAndPassword } from "../firebase/config";
import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)
    
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)  
      console.log(response.user);
      dispatch( {type: 'LOGIN', payload: response.user} )  
      setIsPending(false)
    } 
    catch(error) {
      setError(error)
      setIsPending(false)
    }
  }

  return { login, error, isPending }
}
