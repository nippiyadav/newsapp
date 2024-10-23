import React from 'react'

interface ButtonProps{
  type?: "submit" | "reset" | "button",
  text:string,
  className: string,
  spin:boolean
}

function Button({type="submit",text,className,spin}:ButtonProps) {
  return (
    <button type={type} className={`${className}`}>
      {spin? (<>Loading...</>):(<>{text}</>)}
      </button>
  )
}

export default Button