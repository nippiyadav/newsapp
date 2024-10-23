import React from 'react'

interface ButtonProps{
  type?: "submit" | "reset" | "button",
  text:string,
  className: string
}

function Button({type="submit",text,className}:ButtonProps) {
  return (
    <button type={type} className={`${className}`}>{text}</button>
  )
}

export default Button