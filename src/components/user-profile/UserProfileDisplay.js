import { useEffect, useState } from "react"
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { StringInput, CheckboxInputSingle, ImageInput } from "../utility/basic-modules/Inputs"
import { ContainerSmall, ContainerMedium, ContainerBig, ContainerWide } from "../utility/basic-modules/Containers"
import { SubmitButton } from "../utility/basic-modules/Buttons"
import { useUpdateDocument } from "../../hooks/useUpdateDocument"



export const UserProfileDisplay = ({ data }) => {
  
  const storage = getStorage()

  const { city, firstName, lastName, userName } = data.userData
  const preferences = data.preferences
  const userID = data.userID

  const [cityInfo, setCityInfo] = useState(city)
  const [firstNameInfo, setFirstNameInfo] = useState(firstName)
  const [lastNameInfo, setLastNameInfo] = useState(lastName)
  const [userNameInfo, setUserNameInfo] = useState(userName)

  const [profileImage, setProfileImage] = useState(null)
  const [profileImageRef, setProfileImageRef] = useState("")
  const [profileImageURL, setProfileImageURL] = useState("")
  const [profileImageUpdated, setProfileImageUpdated] = useState(false)

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
  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0])
    setProfileImageRef(ref(storage, `profile-images/user-${userID}`))  
    setDidProfileImageChange(true)
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
      userName: userNameInfo,
    }
      
    // --- update checks: ---
    switch (true) {
      case didUserDataChange:
        updateDocument("users", userID, "userData", userData)
        setDidDataChange(false)
      case didPreferencesChange: // eslint-disable-line
        updateDocument("users", userID, "preferences", preferences)
        setDidPreferencesChange(false)
      case didProfileImageChange: // eslint-disable-line
        uploadBytes(profileImageRef, profileImage)
        setDidProfileImageChange(false)
        setProfileImageUpdated(true)


      default: // eslint-disable-line
        break;
    }
  }

  useEffect(() => {
    setTimeout( () => {
      getDownloadURL(ref(storage, `profile-images/user-${userID}`))
      .then((url) => {
        setProfileImageURL(url)
      })  
      .then(setProfileImageUpdated(false))
      .catch((error) => {console.log(error);})
    }, 800)
  }, [profileImageUpdated])

  return (
    <ContainerBig>
      <h1 width="100%">User: {userName}</h1>

      <ContainerWide>
        <h5>Please select your profile image</h5>
        <input 
          type="file"
          onChange={handleProfileImageChange} 
        />
        <ContainerSmall>          
          {profileImageURL.length > 0 && 
            <>
              <p>Current profile image:</p>
              <img src={profileImageURL} width="100px" height="100px" />
            </>
          }
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