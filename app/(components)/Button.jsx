import React from 'react'

function Button({type="submit",text,className}) {
  return (
    <button type={type} className={`${className}`}>{text}</button>
  )
}

export default Button