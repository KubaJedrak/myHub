import {useState, useEffect} from 'react'
import {db} from '../firebase/config'

export const useTest = () => {

  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  
  const test = async (a, b) => {
    setError(null)
    setIsPending(true)

    try {
      setTimeout( () => {console.log("Test pinged")}, 2000)
      setTimeout( () => {console.log(a, b)}, 3000)
      console.log("PING")
    }
    catch(error) {
      console.log(error.message)
    }
  }

  return {test, isPending, error}
}