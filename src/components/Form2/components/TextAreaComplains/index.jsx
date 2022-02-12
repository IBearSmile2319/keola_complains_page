import React from 'react'

const TextAreaComplains = ({ 
    title, 
    label, 
    register,
    required, 
    errors,
    placeholder
}) => {
    return (
        <label>
            <h3>{title}</h3>
            <textarea
                cols="30"
                rows="3"
                {...register(label, {required:required?required:false})}
                placeholder={placeholder}
            >
            </textarea>
            { errors ? errors[label] && <span className="complain-main__msg-error"><i className="fa-solid fa-anchor"></i> { errors[label].message?.includes("number") ? "Solo se permiten numeros!" : errors[label].message  }</span> : null }
        </label>
    )
}

export default TextAreaComplains