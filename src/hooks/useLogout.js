import { useState, useEffect } from 'react'
import { auth, db, signOut } from "../firebase/config";
import { useAuthContext } from './useAuthContext'
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const {dispatch} = useAuthContext()
  

  const navigate = useNavigate()

  const logout = async () => {
    setError(null)
    setIsPending(true)    

    try {
      // sign out
      await signOut(auth)
      
      // action dispatch to AuthContext
      dispatch({type: "LOGOUT"})

      // update state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      } 

      navigate("/")


    } catch (err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect( () => {
    return () => setIsCancelled(true)
  }, [])

  return { logout, error, isPending}
}