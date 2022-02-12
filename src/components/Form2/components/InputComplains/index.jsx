import React from 'react'
import './InputComplains.css'
const InputComplains = ({
  register,
  required,
  title,
  label,
  placeholder,
  errors,
}) => {

  return (
    <div className="input-complain">
      <label className="input-complain__title">
        {title}
      </label>
      <div className="input-complain__input">
        <input
          {...register(label,{required:required?required:false})}
          placeholder={placeholder}
        />
        <span>
          <i className="fa-solid fa-pencil"></i>
        </span>
      </div>
      { errors ? errors[label] && <span className="complain-main__msg-error"><i className="fa-solid fa-anchor"></i> { errors[label].message?.includes("number") ? "Solo se permiten numeros!" : errors[label].message  }</span> : null }
    </div>
  )
}

export default InputComplains