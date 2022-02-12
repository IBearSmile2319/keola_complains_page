import React, { useState } from 'react'
import ContainInputs from './components/ContainInputs'
import SubTitle from './components/ContainInputs/SubTitle'
import './Form.css'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'

import InputComplains from './components/InputComplains'
import SelectComplains from './components/SelectComplains'
import { ComplaisSchema1, ComplaisSchema2 } from '../../utils/validateYup'
import TextAreaComplains from './components/TextAreaComplains'
import Modal from './components/Modal'
import { fetchApi } from '../../hooks/fetch'




const Form2 = () => {
    const [change, setChange] = useState({
        personType: 0,
        isMinor: false,
        complainType: 0,
        service: 0,
    })
    const [modal, setModal] = useState(false)
    const [modalText, setModalText] = useState("")

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(!change.isMinor ? ComplaisSchema1 : ComplaisSchema2)
    })

    const onSubmit = async (form) => {
        const Form = {
            claimantConsumerManifestRequestDTO: {
                manifestType: change.complainType,
                wellHired: change.service,
                proofOfPayment: form.paymentReceipt,
                voucherNumber: form.npaymentReceipt ? `${form.npaymentReceipt}` : form.npaymentReceipt,
                branchOffice: form.sede,
                filePath: form.file ? form.file : "",
                detailsProductOrService: form.detailProduct,
                detailOfClaimOrComplaint: form.detailComplain,
                actionsTakenByTheProvider: form.ProveedorAction,
            },
            claimantConsumerIdentifierRequestDTO: {
                personType: change.personType,
                nameAndLastName: form.fullName,
                identificationDocument: form.typeID,
                documentNumber: form.NDocumentID ? `${form.NDocumentID}` : form.NDocumentID,
                bunisseName: form.social,
                directions: form.address,
                phone: form.phone ? `${form.phone}` : form.phone,
                departament: form.appt,
                province: form.province,
                district: form.city,
                email: form.email,
                younger: change.isMinor,
                proxyname: form.legalGuardianName,//? form.legalGuardianName : null,
                proxyDocumentNumber: form.legalGuardianNumberID ? `${form.legalGuardianNumberID}` : form.legalGuardianNumberID,
                proxyEmail: form.legalGuardianEmail, //? form.legalGuardianEmail : null,
                proxyPhone: form.legalGuardianPhone ? `${form.legalGuardianPhone}` : form.legalGuardianNumberID,
                proxyAddrees: form.legalGuardianAddress,//? form.legalGuardianAddress : null,
            }
        }
        console.log(Form)
        const data = await fetchApi("http://45.66.156.160:98/api/ClaimantConsumerManifest", Form)
        if (data.status === 1) {
            setModal(true)
            console.log(data.description)
            setModalText(data.objModel)
        }
    }

    return (
        <>
            <form className="complain-main__form"
                onSubmit={handleSubmit(onSubmit)}
                onKeyPress={e => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        return
                    }
                }}
            >
                <ContainInputs title="Identificación del reclamante:">
                    {/* datos personales */}
                    <SubTitle title="Datos personales:">
                        <div className="complain-main__form-container-item">

                            <label>
                                <input type="radio" defaultChecked name="personType" value="0" onClick={() => setChange({ ...change, personType: 0 })} />
                                <span>Persona Natural</span>
                                <input type="radio" name="personType" value="1" onClick={() => setChange({ ...change, personType: 1 })} />
                                <span>Persona juridica</span>
                            </label>
                            <span></span>
                            <span></span>
                            <InputComplains
                                title="Nombre y Apellidos::"
                                register={register}
                                placeholder="Nombres y apellidos..."
                                required={true}
                                label="fullName"
                                errors={errors}
                            />
                            <SelectComplains
                                label="Doc. Indentidad:"
                                {...register("typeID")}
                            />
                            <span></span>
                            <InputComplains
                                title="Social:"
                                label="social"
                                placeholder="Razon social..."
                                register={register}
                                required={true}
                                errors={errors}
                            />
                            <InputComplains
                                title="Número de documento:"
                                placeholder="N° Documento..."
                                register={register}
                                required={true}
                                label="NDocumentID"
                                errors={errors}
                            />
                        </div>
                        <span></span>
                    </SubTitle>
                    {/* Datos de domicilio */}
                    <SubTitle title="Datos de domicilio">
                        <div className="complain-main__form-container-item">
                            <InputComplains
                                title="Dirección:"
                                register={register}
                                placeholder="Dirección..."
                                required={true}
                                label="address"
                                errors={errors}
                            />
                            <InputComplains
                                title="Departamento:"
                                register={register}
                                placeholder="Departamento..."
                                required={true}
                                label="appt"
                                errors={errors}
                            />
                            <span></span>
                            <InputComplains
                                title="Provincia:"
                                register={register}
                                placeholder="Provincia..."
                                required={true}
                                label="province"
                                errors={errors}
                            />
                            <InputComplains
                                title="Ciudad:"
                                register={register}
                                placeholder="Ciudad..."
                                required={true}
                                label="city"
                                errors={errors}
                            />
                            <span></span>
                            <InputComplains

                                title="Teléfono:"
                                register={register}
                                placeholder="Teléfono..."
                                required={true}
                                label="phone"
                                errors={errors}
                            />
                            <InputComplains
                                title="Email:"
                                register={register}
                                placeholder="Email..."
                                required={true}
                                label="email"
                                errors={errors}
                            />
                            <span></span>
                            <label>
                                <h3>¿Eres menor de Edad? </h3>
                                <input type="radio" name="isMinor" value={true} onClick={() => setChange({ ...change, isMinor: true })} />
                                <span>Si</span>
                                <input type="radio" defaultChecked name="isMinor" value={false} onClick={() => setChange({ ...change, isMinor: false })} />
                                <span>No</span>
                            </label>
                        </div>
                    </SubTitle>
                    {/* Datos del acudiente legal */}
                    {change.isMinor &&
                        <SubTitle title="Datos del Padre, Madre, Tutor:">
                            <div className="complain-main__form-container-item">
                                <InputComplains
                                    title="Nombre y Apellidos:"
                                    register={register}
                                    placeholder="Nombres y apellidos..."
                                    label="legalGuardianName"

                                // errors={errors}
                                />
                                <InputComplains
                                    title="Número de documento:"
                                    placeholder="N° Documento..."
                                    register={register}
                                    label="legalGuardianNumberID"
                                    errors={errors}

                                />
                                <span></span>
                                <InputComplains
                                    title="Email:"
                                    register={register}
                                    placeholder="Email..."
                                    label="legalGuardianEmail"
                                    errors={errors}
                                />
                                <InputComplains
                                    title="Teléfono:"
                                    register={register}
                                    placeholder="Teléfono..."
                                    label="legalGuardianPhone"
                                    errors={errors}

                                />
                                <span></span>
                                <InputComplains
                                    title="Dirección:"
                                    register={register}
                                    placeholder="Dirección..."
                                    label="legalGuardianAddress"

                                />
                            </div>
                        </SubTitle>
                    }
                    {/* Manifiesto del consumidor reclamante */}
                    <SubTitle title="Manifiesto del consumidor reclamante">
                        <div className="complain-main__form-container-item">
                            <label>
                                <h3>Tipo: </h3>
                                <input type="radio" defaultChecked name="complainType" value="Reclamo" onClick={() => setChange({ ...change, complainType: 0 })} />
                                <span>Reclamo</span>
                                <input type="radio" name="complainType" value="Queja" onClick={() => setChange({ ...change, complainType: 1 })} />
                                <span>Queja</span>
                            </label>
                            <label>
                                <h3>Bien Contratado: </h3>
                                <input type="radio" defaultChecked name="service" value="Producto" onClick={() => setChange({ ...change, service: 0 })} />
                                <span>Producto</span>
                                <input type="radio" name="service" value="Servicio" onClick={() => setChange({ ...change, service: 1 })} />
                                <span>Servicio</span>
                            </label>
                            <span></span>
                            <InputComplains
                                title="Comprobante de pago:"
                                label="paymentReceipt"
                                placeholder="Comprobante de pago..."
                                register={register}
                                required={true}
                                errors={errors}
                            />
                            <InputComplains
                                title="Número de factura:"
                                label="npaymentReceipt"
                                placeholder="N° Factura..."
                                register={register}
                                required={true}
                                errors={errors}
                            />
                            <span></span>
                            <InputComplains
                                title="Sede/Sucursal"
                                label="sede"
                                placeholder="Sede/Sucursal..."
                                register={register}
                                required={true}
                                errors={errors}
                            />
                        </div>
                        <div className="complain-main__form-container-item-2">

                            <TextAreaComplains
                                title="Detalle del Producto o Servicio:"
                                placeholder="Detalle del Producto o Servicio..."
                                label="detailProduct"
                                register={register}
                                errors={errors}
                                required={true}
                            />
                            <span></span>
                            <TextAreaComplains
                                title="Detalle de la Reclamación o Queja:"
                                placeholder="Detalle de la Reclamación o Queja..."
                                label="detailComplain"
                                register={register}
                                errors={errors}
                                required={true}
                            />
                            <span></span>
                            <TextAreaComplains
                                title="Acciones tomadas por el Proveedor:"
                                placeholder="Acciones tomadas..."
                                label="ProveedorAction"
                                register={register}
                                errors={errors}
                                required={true}
                            />
                            <span></span>
                        </div>
                    </SubTitle>
                </ContainInputs>
                <div className="complain-main__form-container-item-2">
                    <button
                        type="submit"
                    >
                        Enviar
                    </button>
                </div>
            </form >

            <Modal
                isOpen={modal}
                onRequestClose={() => setModal(false)}
                title="¡Su reclamo fue enviado!"
                text={modalText}
            />
        </>
    )
}

export default Form2