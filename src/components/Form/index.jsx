import React, { useState } from 'react'
import { fetchApi } from '../../hooks/fetch'
import ContainInputs from './components/ContainInputs'
import SubTitle from './components/ContainInputs/SubTitle'
import InputComplains from './components/InputComplains'
import Modal from './components/Modal'
import './Form.css'
const values = {
    personType: 0,
    fullName: "",
    typeID: "DNI",
    social: "",
    NDocumentID: "",
    address: "",
    phone: "",
    appt: "",
    province: "",
    city: "",
    email: "",
    isMinor: false,
    legalGuardianName: "",
    legalGuardianTypeID: "DNI",
    legalGuardianEmail: "",
    legalGuardianPhone: "",
    legalGuardianAddress: "",
    // manifest
    complainType: 0,
    service: 0,
    paymentReceipt: "",
    npaymentReceipt: "",
    sede: "",
    file: "",
    detailProduct: "",
    detailComplain: "",
    ProveedorAction: "",
}
const Form = () => {
    const [form, setForm] = useState(values)
    const [modal, setModal] = useState(false)
    const [modalText, setModalText] = useState("")
    const onSubmit = async(e) => {
        e.preventDefault()
        const Form = {
            claimantConsumerManifestRequestDTO: {
                manifestType: form.complainType,
                wellHired: form.service,
                proofOfPayment: form.paymentReceipt,
                voucherNumber: form.npaymentReceipt,
                branchOffice: form.sede,
                filePath: form.file,
                detailsProductOrService: form.detailProduct,
                detailOfClaimOrComplaint: form.detailComplain,
                actionsTakenByTheProvider: form.ProveedorAction,
            },
            claimantConsumerIdentifierRequestDTO: {
                personType: form.personType,
                nameAndLastName: form.fullName,
                identificationDocument: form.typeID,
                documentNumber: form.NDocumentID,
                bunisseName: form.social,
                directions: form.address,
                phone: form.phone,
                departament: form.appt,
                province: form.province,
                district: form.city,
                email: form.email,
                younger: form.isMinor,
                proxyname: form.legalGuardianName,
                proxyDocumentNumber: form.legalGuardianTypeID,
                proxyEmail: form.legalGuardianEmail,
                proxyPhone: form.legalGuardianPhone,
                proxyAddrees: form.legalGuardianAddress,
            }
        }
        console.log(Form)
        // console.log(Form)
        // const data =await fetchApi("http://45.66.156.160:98/api/ClaimantConsumerManifest", Form)
        // setModal(true)
        // if (data.status === 1) {
        //     console.log(data.description)
        //     setModalText(data.objModel)
        //     setForm(values)
        // }
    }


    return (
        <>
            <form className="complain-main__form"
                onSubmit={onSubmit}
                onKeyPress={e => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        return
                    }
                }}>

                <ContainInputs title="Identificación del reclamante:">
                    {/* Datos personales */}
                    <SubTitle title="Datos personales:">
                        <div className="complain-main__form-container-item">
                            <label>
                                <input type="radio" defaultChecked name="personType" value="0" onChange={() => setForm({ ...form, personType: 0 })} />
                                <span>Persona Natural</span>
                                <input type="radio" name="personType" value="1" onChange={() => setForm({ ...form, personType: 1 })} />
                                <span>Persona juridica</span>
                            </label>
                            <span></span>
                            <span></span>
                            <InputComplains
                                label="Nombre y Apellidos:"
                                name="fullName"
                                placeholder="Nombres y apellidos..."
                                type="text"
                                value={form.fullName}
                                setForm={setForm}
                                form={form}
                                required={true}
                            />
                            <div className="selected-main-form">
                                <h2>Doc. Indentidad</h2>
                                <select value={form.typeID} onChange={(e) => setForm({ ...form, typeID: e.target.value })}>
                                    <option select value="DNI">DNI</option>
                                    <option value="RUC">RUC</option>
                                    <option value="Pasaporte">Pasaporte</option>
                                </select>
                            </div>
                            <span></span>
                            <InputComplains
                                label="Social:"
                                name="social"
                                placeholder="Razon social..."
                                type="text"
                                value={form.social}
                                setForm={setForm}
                                form={form}
                                required={true}
                            />
                            <InputComplains
                                label="N° Documento:"
                                name="NDocumentID"
                                placeholder="N° Documento..."
                                type="text"
                                value={form.NDocumentID}
                                setForm={setForm}
                                required={true}
                                form={form}
                            />

                            <span></span>
                        </div>
                    </SubTitle>
                    <SubTitle title="Datos de domicilio">
                        <div className="complain-main__form-container-item">
                            <InputComplains
                                label="Dirección:"
                                name="address"
                                placeholder="Dirección..."
                                type="text"
                                value={form.address}
                                setForm={setForm}
                                required={true}
                                form={form}
                            />
                            <InputComplains
                                label="Teléfono:"
                                name="phone"
                                placeholder="+1 123456789..."
                                type="text"
                                value={form.phone}
                                setForm={setForm}
                                required={true}
                                form={form}
                            />

                            <span></span>
                            <InputComplains
                                label="Departamento:"
                                name="appt"
                                placeholder="Departamento..."
                                type="text"
                                value={form.appt}
                                setForm={setForm}
                                required={true}
                                form={form}
                            />
                            <InputComplains
                                label="Provincia:"
                                name="province"
                                placeholder="Provincia..."
                                type="text"
                                value={form.province}
                                setForm={setForm}
                                required={true}
                                form={form}
                            />
                            <span></span>
                            <InputComplains
                                label="Distrito:"
                                name="city"
                                placeholder="Distrito..."
                                type="text"
                                value={form.city}
                                setForm={setForm}
                                required={true}
                                form={form}
                            />
                            <InputComplains
                                label="Email:"
                                name="email"
                                placeholder="Email..."
                                type="email"
                                value={form.email}
                                setForm={setForm}
                                required={true}
                                form={form}
                            />
                            <span></span>
                            {/* recervado para un checkbox */}
                            <label>
                                <h3>¿Eres menor de Edad? </h3>
                                <input type="radio" name="isMinor" value={true} onChange={() => setForm({ ...form, isMinor: true })} />
                                <span>Si</span>
                                <input type="radio" defaultChecked name="isMinor" value={false} onChange={() => setForm({ ...form, isMinor: false })} />
                                <span>No</span>
                            </label>
                        </div>
                    </SubTitle>
                    {/* Datos del acudiente legal */}
                    {form.isMinor &&
                        <SubTitle title="Datos del Padre, Madre, Tutor:">
                            <div className="complain-main__form-container-item">
                                <InputComplains
                                    label="Nombre y Apellidos:"
                                    name="legalGuardianName"
                                    placeholder="Nombres y apellidos..."
                                    type="text"
                                    value={form.legalGuardianName}
                                    setForm={setForm}
                                    required={false}
                                    form={form}
                                />
                                <div className="selected-main-form">
                                    <h2>Doc. Indentidad</h2>
                                    <select
                                        value={form.legalGuardianTypeID}
                                        onChange={(e) => setForm({ ...form, legalGuardianTypeID: e.target.value })
                                        }>
                                        <option select value="DNI">DNI</option>
                                        <option value="RUC">RUC</option>
                                        <option value="Pasaporte">Pasaporte</option>
                                    </select>
                                </div>

                                <span></span>
                                <InputComplains

                                    label="Email:"
                                    name="legalGuardianEmail"
                                    placeholder="Email..."
                                    type="email"
                                    value={form.legalGuardianEmail}
                                    setForm={setForm}
                                    required={false}
                                    form={form}
                                />
                                <InputComplains
                                    label="Teléfono:"
                                    name="legalGuardianPhone"
                                    placeholder="+1 123456789..."
                                    type="text"
                                    value={form.legalGuardianPhone}
                                    setForm={setForm}
                                    required={false}
                                    form={form}
                                />
                                <span></span>
                                <InputComplains

                                    label="Dirección:"
                                    name="legalGuardianAddress"
                                    placeholder="+51 123456789..."
                                    type="text"
                                    value={form.legalGuardianAddress}
                                    setForm={setForm}
                                    required={false}
                                    form={form}
                                />
                            </div>
                        </SubTitle>
                    }
                    <SubTitle title="Manifiesto del consumidor reclamante">

                        <div className="complain-main__form-container-item">
                            <label>
                                <h3>Tipo: </h3>
                                <input type="radio" defaultChecked name="complainType" value="Reclamo" onChange={() => setForm({ ...form, complainType: 0 })} />
                                <span>Reclamo</span>
                                <input type="radio" name="complainType" value="Queja" onChange={() => setForm({ ...form, complainType: 1 })} />
                                <span>Queja</span>
                            </label>
                            <label>
                                <h3>Bien Contratado: </h3>
                                <input type="radio" defaultChecked name="service" value="Producto" onChange={() => setForm({ ...form, service: 0 })} />
                                <span>Producto</span>
                                <input type="radio" name="service" value="Servicio" onChange={() => setForm({ ...form, service: 1 })} />
                                <span>Servicio</span>
                            </label>
                            <span></span>
                            <InputComplains
                                label="Comprobante de pago:"
                                name="paymentReceipt"
                                placeholder="Comprobante de pago..."
                                type="text"
                                value={form.paymentReceipt}
                                setForm={setForm}
                                required={true}
                                form={form}
                            />
                            <InputComplains
                                label="N°:"
                                name="npaymentReceipt"
                                placeholder="N°..."
                                type="text"
                                value={form.npaymentReceipt}
                                setForm={setForm}
                                required={true}
                                form={form}
                            />
                            <span></span>
                            <InputComplains
                                label="Sede/Sucursal:"
                                name="sede"
                                placeholder="Sede/Sucursal..."
                                type="text"
                                value={form.sede}
                                setForm={setForm}
                                required={true}
                                form={form}

                            />
                        </div>
                        <div className="complain-main__form-container-item-2">
                            <label>
                                <h3>Detalle</h3>
                                <textarea
                                    name="detailComplain"
                                    id=""
                                    cols="30"
                                    rows="5"
                                    value={form.detailComplain}
                                    onChange={(e) => setForm({ ...form, detailComplain: e.target.value })}
                                >

                                </textarea>
                            </label>
                            <span></span>
                            <label>
                                <h3>Pedido:</h3>
                                <textarea
                                    name="detailProduct"
                                    id=""
                                    cols="30"
                                    rows="5"
                                    value={form.detailProduct}
                                    onChange={(e) => setForm({ ...form, detailProduct: e.target.value })}
                                >

                                </textarea>
                            </label>
                            <span></span>
                            <label>
                                <h3>Detalle (opcional):</h3>
                                <textarea
                                    name="ProveedorAction"
                                    id=""
                                    cols="30"
                                    rows="5"
                                    value={form.ProveedorAction}
                                    onChange={(e) => setForm({ ...form, ProveedorAction: e.target.value })}
                                >

                                </textarea>
                            </label>
                            <span></span>
                        </div>
                    </SubTitle>
                </ContainInputs>
                <div className="complain-main__form-container-item-2">
                    <button
                        type="submit"
                        disabled={
                            form.social === "" ||
                                form.NDocumentID === "" ||
                                form.address === "" ||
                                form.phone === "" ||
                                form.appt === "" ||
                                form.province === "" ||
                                form.city === "" ||
                                form.email === "" ||
                                form.paymentReceipt === "" ||
                                form.npaymentReceipt === "" ||
                                form.sede === "" ||
                                form.detailProduct === "" ||
                                form.detailComplain === "" ||
                                form.ProveedorAction === ""
                                ? true
                                : false
                        }
                        className={
                            form.social === "" ||
                                form.NDocumentID === "" ||
                                form.address === "" ||
                                form.phone === "" ||
                                form.appt === "" ||
                                form.province === "" ||
                                form.city === "" ||
                                form.email === "" ||
                                form.paymentReceipt === "" ||
                                form.npaymentReceipt === "" ||
                                form.sede === "" ||
                                form.detailProduct === "" ||
                                form.detailComplain === "" ||
                                form.ProveedorAction === ""
                                ? "disabled" : ""
                        }
                    >Enviar</button>
                    <span></span>
                </div>

            </form>
            <Modal
                isOpen={modal}
                onRequestClose={() => setModal(false)}
                title="¡Su reclamo fue enviado!"
                text={modalText}
            />
        </>
    )
}

export default Form