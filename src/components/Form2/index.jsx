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
    const [errModal, setErrModal] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(!change.isMinor ? ComplaisSchema1 : ComplaisSchema2)
    })

    const onSubmit = async (form) => {
        const formData = new FormData();
        // formData.append("claimantConsumerManifestRequestDTO.id", 1)
        formData.append("claimantConsumerManifestRequestDTO.manifestType", change.complainType) //int
        formData.append("claimantConsumerManifestRequestDTO.wellHired", change.service) // int
        formData.append("claimantConsumerManifestRequestDTO.proofOfPayment", form.paymentReceipt)
        formData.append("claimantConsumerManifestRequestDTO.voucherNumber", form.npaymentReceipt ? `${form.npaymentReceipt}` : form.npaymentReceipt)
        formData.append("claimantConsumerManifestRequestDTO.branchOffice", form.sede)
        // formData.append("claimantConsumerManifestRequestDTO.filePath", "1")

        formData.append("claimantConsumerManifestRequestDTO.detailsProductOrService", form.detailProduct)
        formData.append("claimantConsumerManifestRequestDTO.detailOfClaimOrComplaint", form.detailComplain)
        formData.append("claimantConsumerManifestRequestDTO.actionsTakenByTheProvider", form.ProveedorAction)

        formData.append("claimantConsumerManifestRequestDTO.file", form.file[0])

        // formData.append("claimantConsumerIdentifierRequestDTO.id", 1)
        formData.append("claimantConsumerIdentifierRequestDTO.personType", change.personType)
        formData.append("claimantConsumerIdentifierRequestDTO.nameAndLastName", form.fullName)
        formData.append("claimantConsumerIdentifierRequestDTO.identificationDocument", form.typeID)
        formData.append("claimantConsumerIdentifierRequestDTO.documentNumber", form.NDocumentID ? `${form.NDocumentID}` : form.NDocumentID)
        formData.append("claimantConsumerIdentifierRequestDTO.bunisseName", form.social)
        formData.append("claimantConsumerIdentifierRequestDTO.directions", form.address)
        formData.append("claimantConsumerIdentifierRequestDTO.phone", form.phone ? `${form.phone}` : form.phone)
        formData.append("claimantConsumerIdentifierRequestDTO.departament", form.appt)
        formData.append("claimantConsumerIdentifierRequestDTO.province", form.province)
        formData.append("claimantConsumerIdentifierRequestDTO.district", form.city)
        formData.append("claimantConsumerIdentifierRequestDTO.email", form.email)
        formData.append("claimantConsumerIdentifierRequestDTO.younger", change.isMinor)
        formData.append("claimantConsumerIdentifierRequestDTO.proxyname", form.legalGuardianName ? form.legalGuardianName : null)
        formData.append("claimantConsumerIdentifierRequestDTO.proxyDocumentNumber", form.legalGuardianNumberID ? `${form.legalGuardianNumberID}` : null)
        formData.append("claimantConsumerIdentifierRequestDTO.proxyEmail", form.legalGuardianEmail? form.legalGuardianEmail: null)// ? form.legalGuardianEmail : "")
        formData.append("claimantConsumerIdentifierRequestDTO.proxyPhone", form.legalGuardianPhone? form.legalGuardianPhone: null)// ? form.legalGuardianPhone : "")
        formData.append("claimantConsumerIdentifierRequestDTO.proxyAddrees", form.legalGuardianAddress ? form.legalGuardianAddress : null)
        console.log(form)
        const data = await fetchApi("http://45.66.156.160:98/api/ClaimantConsumerManifest", formData)
        console.log(data)
        if (data.status === 1) {
            setErrModal(false)
            setModal(true)
            console.log(data.description)
            setModalText(data.objModel)
        } else {
            setErrModal(true)
            setModal(true)
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
                                values={["DNI", "RUC", "Pasaporte"]}
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
                                    errors={errors}
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
                                    errors={errors}
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
                            <SelectComplains
                                label="Doc. Indentidad:"
                                {...register("paymentReceipt")}
                                values={["FACTURA", "BOLETA", "TICKET", "RECIBO", "OTRO"]}
                                required={true}
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

                            {/* para cuando ya este el guardado de archivos en el backend */}
                            <InputComplains
                                title="archivo:"
                                label="file"
                                type="file"
                                placeholder="Archivo..."
                                required={true}
                                register={register}
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
            {!errModal ?
                <Modal
                    isOpen={modal}
                    onRequestClose={() => setModal(false)}
                    title="¡Su reclamo fue enviado!"
                    texts={[
                        "Gracias por enviarnos tu inconveniente, trataremos de resolverlo,",
                        "en la brevedad posible.",
                        "¡Muchas gracias!",
                        "Guarda este codigo para poder consultar el estado de tu reclamo:",

                    ]}
                    text={modalText}
                />
                :
                <Modal
                    isOpen={modal}
                    onRequestClose={() => setModal(false)}
                    title="¡No pudimos procesar su solicitud!"
                    texts={["Por favor, intente nuevamente.", "¡Muchas gracias!"]}
                    errors={errModal}
                    text={modalText}
                />
            }
        </>
    )
}

export default Form2