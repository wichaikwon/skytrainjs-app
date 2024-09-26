import React from 'react'

interface InputProps {
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
  onClick?: () => void
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder = '', type = 'text', className = '', onClick }) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      className={`w-full p-4 ${className}`}
      onChange={onChange}
      onClick={onClick}
    />
  )
}

export default Input
