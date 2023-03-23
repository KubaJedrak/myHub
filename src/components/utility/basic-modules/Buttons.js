

export const AcceptButton = ({func}) => {

  return(
    <button
      onClick={func}
    >

    </button>
  )
}

export const DeclineButton = ({func}) => {

  return(
    <button
      onClick={func}
    >

    </button>
  )
}

export const SubmitButton = ({func}) => {
  return(
    <button className="button button-submit"
      onClick={func}
    >
      Save Changes
    </button>
  )
}