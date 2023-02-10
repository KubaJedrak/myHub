import React from 'react'

export default function VerifyPrompt(popUpData) {
  const {title, message, acceptFunc, declineFunc} = popUpData.data

  return (
    <article>
      <h3 className="verify-prompt--header">{title}</h3>
      <p className="verify-prompt--message">{message}</p>

      <button 
        className="btn btn-prompt btn-yes"
        onClick={acceptFunc}
      >Yes</button>
      <button 
        className="btn btn-prompt btn-no"
        onClick={declineFunc}
      >No</button>
    </article>
  )
}
