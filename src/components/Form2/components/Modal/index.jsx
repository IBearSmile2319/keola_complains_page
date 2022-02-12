import React, { useState } from 'react'
import './Modal.css'
const Modal = ({ title, text, isOpen, onRequestClose }) => {
    const [copy,setCopy]= useState("Copiar")
    const handleCopy = () => {
        navigator.clipboard.writeText(text)
        setCopy("¡Copiado!")
    }


    return (
        <div className={`form-modal ${isOpen ? 'is-active' : ''}`}>
            <div className='form-modal__container'>
                <div className='form-modal__header'>
                    <h2>{title}</h2>
                    {/* <span className='close'>&times;</span> */}
                </div>
                <div className='form-modal__body'>
                    <p>Gracias por enviarnos tu inconveniente, trataremos de resolverlo,</p>
                    <p>guarda este codigo.</p>
                    <div
                    className='form-modal__body-copy'
                    >
                        <h2 onClick={handleCopy}>{text}</h2>
                        <span 
                        onClick={handleCopy} 
                        className={`form-modal__body-copy-copy ${copy!=="Copiar" ? 'is-active':''}`}
                        >{copy}</span>
                    </div>
                </div>
                <div className='form-modal__footer'>
                    <button className='btn-cancel'
                        onClick={onRequestClose}
                    >ok!</button>
                </div>
            </div>
        </div>
    )
}

export default Modal