import React, { forwardRef } from 'react'

const SelectComplains = forwardRef(({ onChange, onBlur, name, label, values }, ref) => {
    return (
        <div className="selected-main-form">
            <h2>{label}</h2>
            <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
                {values.map((value, index) =>
                    <option key={index} value={value}>{value}</option>

                )}
                {/* // <option select value="DNI">DNI</option>
                // <option value="RUC">RUC</option>
                // <option value="Pasaporte">Pasaporte</option> */}
            </select>
        </div>
    )
})

export default SelectComplains