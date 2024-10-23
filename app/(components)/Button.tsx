import React from 'react'

interface ButtonProps{
  type?: "submit" | "reset" | "button",
  text:string,
  className: any
}

function Button({type="submit",text,className}:ButtonProps) {
  return (
    <button type={type} className={`${className}`}>{text}</button>
  )
}

export default Button