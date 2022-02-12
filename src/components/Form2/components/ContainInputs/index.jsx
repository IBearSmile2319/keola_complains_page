import React from 'react'
import './ContainInputs.css'
const ContainInputs = ({ children, title }) => {

    return (

        <div className="complain-main__form-label">
            <div className="complain-main__form-title">
                <h2>{title}</h2>
            </div>
            {children}
        </div>
    )
}

export default ContainInputs