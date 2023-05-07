import { useEffect, useState } from "react"
import { getStorage, ref, uploadBytes } from "firebase/storage";

import { StringInput, CheckboxInputSingle, ImageInput } from "../utility/basic-modules/Inputs"
import { ContainerSmall, ContainerMedium, ContainerBig, ContainerWide } from "../utility/basic-modules/Containers"
import { SubmitButton } from "../utility/basic-modules/Buttons"
import { useUpdateDocument } from "../../hooks/useUpdateDocument"



export const UserProfileDisplay = ({ data }) => {

  const { city, firstName, lastName, userName } = data.userData
  const preferences = data.preferences
  const userID = data.userID

  const storage = getStorage()

  const [cityInfo, setCityInfo] = useState(city)
  const [firstNameInfo, setFirstNameInfo] = useState(firstName)
  const [lastNameInfo, setLastNameInfo] = useState(lastName)
  const [userNameInfo, setUserNameInfo] = useState(userName)

  const [profileImage, setProfileImage] = useState(null)
  const [profileImageRef, setProfileImageRef] = useState("")

  const [isUserShown, setIsUserShown] = useState(preferences.isUserShown)
  const [isCityShown, setIsCityShown] = useState(preferences.isCityShown)

  const [didUserDataChange, setDidDataChange] = useState(false)
  const [didPreferencesChange, setDidPreferencesChange] = useState(false)
  const [didProfileImageChange, setDidProfileImageChange] = useState(false)

  const { updateDocument, error: updateError, isPending: updateIsPending } = useUpdateDocument()


  // --- String inputs: ---
  const handleCityChange = (e) => {
    setCityInfo(e.target.value)
    setDidDataChange(true)
  }

  const handleFirstNameChange = (e) => {
    setFirstNameInfo(e.target.value)
    setDidDataChange(true)
  }

  const handleLastNameChange = (e) => {
    setLastNameInfo(e.target.value)
    setDidDataChange(true)
  }

  const handleUserNameChange = (e) => {
    setUserNameInfo(e.target.value)
    setDidDataChange(true)
  }

  // --- Checkbox inputs: ---
  const handleCityShownChange = () => {
    setIsCityShown(!isCityShown)
    setDidPreferencesChange(true)
  }

  const handleUserShownChange = () => {
    setIsUserShown(!isUserShown)
    setDidPreferencesChange(true)
  }

      
  // --- Image input: ---
  const handleProfileImage = () => {
    
    setProfileImageRef(ref(storage, `profile-images/profile-image-${userID}`))  
    setProfileImage()

    setDidProfileImageChange(true)

    // uploadBytes(storageRef, file).then((snapshot) => {
    //   console.log('Uploaded a blob or file!');
  }

  // --- Update Function: ---
  const updateUserInfoInDB = () => {

    const preferences = {
      isCityShown,
      isUserShown
    }

    const userData = {
      city: cityInfo,
      firstName: firstNameInfo,
      lastName: lastNameInfo,
      userName: userNameInfo
    }
      
    // --- update checks: ---
    switch (true) {
      case didUserDataChange:
        updateDocument("users", userID, "userData", userData)
        setDidDataChange(false)
      case didPreferencesChange:
        updateDocument("users", userID, "preferences", preferences)
        setDidPreferencesChange(false)
      case didProfileImageChange:
        uploadBytes(profileImageRef, profileImage).then(console.log("Image uploaded"))
        setDidProfileImageChange(false)
      default:
        break;
    }
  }

  return (
    <ContainerBig>
      <h1 width="100%">User: {userName}</h1>

      <ContainerWide>
        <ImageInput functionPassed={handleProfileImage} />
        <ContainerSmall>          
        
        </ContainerSmall>
      </ContainerWide>

      <ContainerMedium>
        <p>Please enter you personal information (if you want to make it visible on the website)</p>
        <p>Entering your city information automatically sets your location to that city for the purposes of weather forcasts.</p>
        <StringInput value={cityInfo} func={handleCityChange} inputType={"Please enter your city"} />
        <StringInput value={firstNameInfo} func={handleFirstNameChange} inputType={"Please enter your first name"} />
        <StringInput value={lastNameInfo} func={handleLastNameChange} inputType={"Please enter your last name"} />
        <StringInput value={userNameInfo} func={handleUserNameChange} inputType={"Please enter your user name"} />
      </ContainerMedium>

      {/* CHECK BOXES */}
      <ContainerMedium>
        <p>Please select the data you want to make visible on the website</p>
        <CheckboxInputSingle
          legend="Show your city information on the website?"
          value={isCityShown}
          functionPassed={handleCityShownChange}
        />
        <CheckboxInputSingle
          legend="Show your name and surname on the website?"
          value={isUserShown}
          functionPassed={handleUserShownChange}
        />
      </ContainerMedium>

      <SubmitButton func={updateUserInfoInDB} />

    </ContainerBig>
  )
}