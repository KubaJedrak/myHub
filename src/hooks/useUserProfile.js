
import { useAuthContext } from "./useAuthContext"


export const useUserProfile = () => {
  
  const {user} = useAuthContext()
  console.log(user);

  const userData = {}


  return userData
}