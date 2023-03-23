import { useEffect, useState } from "react"
import { StringInput, CheckboxInputSingle } from "../utility/basic-modules/Inputs"
import { ContainerSmall, ContainerMedium, ContainerBig } from "../utility/basic-modules/Containers"
import { SubmitButton } from "../utility/basic-modules/Buttons"

import { useUpdateDocument } from "../../hooks/useUpdateDocument"

export const UserProfileDisplay = ({ data }) => {

  const { city, firstName, lastName, userName } = data.userData
  const preferences = data.preferences
  const userID = data.userID

  const [cityInfo, setCityInfo] = useState(city)
  const [firstNameInfo, setFirstNameInfo] = useState(firstName)
  const [lastNameInfo, setLastNameInfo] = useState(lastName)
  const [userNameInfo, setUserNameInfo] = useState(userName)

  const [isUserShown, setIsUserShown] = useState(preferences.isUserShown)
  const [isCityShown, setIsCityShown] = useState(preferences.isCityShown)

  const [didUserDataChange, setDidUserDataChange] = useState(false)
  const [didPreferencesChange, setDidPreferencesChange] = useState(false)

  const { updateDocument, error: updateError, isPending: updateIsPending } = useUpdateDocument()


  const handleCityChange = (e) => {
    setCityInfo(e.target.value)
    setDidUserDataChange(true)
  }

  const handleFirstNameChange = (e) => {
    setFirstNameInfo(e.target.value)
    setDidUserDataChange(true)
  }

  const handleLastNameChange = (e) => {
    setLastNameInfo(e.target.value)
    setDidUserDataChange(true)
  }

  const handleUserNameChange = (e) => {
    setUserNameInfo(e.target.value)
    setDidUserDataChange(true)
  }

  // ---
  const handleCityShownChange = () => {
    setIsCityShown(!isCityShown)
    setDidPreferencesChange(true)
  }

  const handleUserShownChange = () => {
    setIsUserShown(!isUserShown)
    setDidPreferencesChange(true)
  }

  // ---
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

    switch (true) {
      case didUserDataChange:
        updateDocument("users", userID, "userData", userData)
        break;
      case didPreferencesChange:
        updateDocument("users", userID, "preferences", preferences)
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    console.log(data.preferences, data.userData);

    console.log(typeof isCityShown);
    console.log(typeof isUserShown);
  }, [data])

  return (
    <ContainerBig>
      <h1 width="100%">User: {userName}</h1>

      <ContainerMedium>
        <StringInput value={cityInfo} func={handleCityChange} />
        <StringInput value={firstNameInfo} func={handleFirstNameChange} />
        <StringInput value={lastNameInfo} func={handleLastNameChange} />
        <StringInput value={userNameInfo} func={handleUserNameChange} />
      </ContainerMedium>

      {/* CHECK BOXES */}
      <ContainerMedium>
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