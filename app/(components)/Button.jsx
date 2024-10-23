import React from 'react'

function Button({type="submit",text,className}) {
  return (
    <button className={`${className}`}>{text}</button>
  )
}

export default Button