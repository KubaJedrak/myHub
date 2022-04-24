import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useSignup } from "../../hooks/useSignup";

export const Signup = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")  
  const [city, setCity] = useState("")
  const { signup } = useSignup() 
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password, displayName, city)   
    navigate("/")
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

