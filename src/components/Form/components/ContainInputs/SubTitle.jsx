import React from 'react'
import './SubTitle.css'
const SubTitle = ({children,title}) => {
    return (
        <div className="complain-main__form-subtitle">
            <h3>{title}</h3>
            {children}
        </div>
    )
}

export default SubTitle