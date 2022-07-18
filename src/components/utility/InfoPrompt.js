import React from 'react'

export default function InfoPrompt(promptTitle, promptMessage) {


  const handleAccept = (event) => {

  }



  return (
    <article>
      <h3 className="info-prompt--header">{promptTitle}</h3>
      <p className="info-prompt--message">{promptMessage}</p>

      <button 
        className="btn btn-prompt btn-accept"
        onClick={handleAccept}
      >Okay</button>
    </article>
  )
}
