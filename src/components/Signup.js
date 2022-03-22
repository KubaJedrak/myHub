import { useState, useEffect } from 'react'
import { useSignup } from "../hooks/useSignup";

export const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")  
  const [city, setCity] = useState("")
  const { signup, isPending, error } = useSignup() 
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    signup(email, password, displayName)
  }
  
  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => {setEmail(e.target.value)}}
            placeholder="Your email address"
          />  
        </label>
        <label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => {setPassword(e.target.value)}}
            placeholder="Your password"
          />
        </label>
        <label>
          <input 
            type="text" 
            value={displayName} 
            onChange={(e) => {setDisplayName(e.target.value)}}
            placeholder="Your name"
          />
        </label>
        <label>
          <input 
            type="text" 
            value={city} 
            onChange={(e) => {setCity(e.target.value)}}
            placeholder="Your city"
          />          
        </label>
        <button className="button">Register</button>
      </form>
    </div>
  )
}

