import { useState } from "react"
import { useLogin } from '../hooks/useLogin'

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {login} = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit} className="login-form">
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
        <button className="button" >Log In</button>
      </form>
    </div>
  )
}