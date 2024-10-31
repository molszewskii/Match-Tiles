import React from 'react'

interface ButtonProps<T = void>{
    label: string;
    className?: string;
    onClick?: (arg?:T) => void;
}

export const Button:React.FC<ButtonProps> = ({label,className,onClick}) => {
  return (
    <button className={className} onClick={()=> onClick && onClick()}>
        {label}
    </button>
  )
}
