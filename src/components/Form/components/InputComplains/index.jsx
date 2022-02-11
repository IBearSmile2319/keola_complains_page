import React, { useState } from 'react'
import './InputComplains.css'
const InputComplains = ({
  label,
  name,
  placeholder,
  type,
  value,
  required,
  // states
  setForm,
  form,
 
}) => {
  const onChange = ({ target }) => {
    const { name, value } = target
    setForm({
      ...form,
      [name]: value
    })
  }


  return (
    <div className="input-complain">
      <label className="input-complain__title">
        {label}
      </label>
      <div className="input-complain__input">
        <input
          type={type}
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          required={required}
        />
        {form[name]?.length === 0 ?
          <span>
            <i className="fa-solid fa-pencil"></i>
          </span> :
          <span
          className="input-complain__input-delete"
          onClick={() => setForm({ ...form, [name]: "" })}>
            <i className="fa-solid fa-eraser"></i>
          </span>
        }
      </div>
      {/* {err[name] && <div className="input-complain__error">{err[name]}</div>} */}
      {/* {rules && message ? <div className="input-complain__message">{message}</div> : null} */}
    </div>
  )
}

export default InputComplains