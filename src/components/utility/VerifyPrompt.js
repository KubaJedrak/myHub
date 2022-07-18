import React from 'react'

import { useState } from 'react'

export default function VerifyPrompt(parentData) {

  const data = parentData.data
  const title = data.title
  const message = data.message
  const acceptFunc = data.acceptFunc
  const declineFunc = data.declineFunc

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
