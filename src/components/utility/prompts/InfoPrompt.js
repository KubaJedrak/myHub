import React from 'react'

export default function InfoPrompt(popUpData) {
  const {title, message, acceptFunc} = popUpData.data

  return (
    <article>
      <h3 className="info-prompt--header">{title}</h3>
      <p className="info-prompt--message">{message}</p>

      <button 
        className="btn btn-prompt btn-accept"
        onClick={acceptFunc}
      >Okay</button>
    </article>
  )
}
