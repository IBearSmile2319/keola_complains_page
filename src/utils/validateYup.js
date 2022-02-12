import * as yup from 'yup'

export const ComplaisSchema1 = yup.object().shape({
    fullName: yup.string().required("Este campo es requerido"),
    typeID: yup.string().required("Este campo es requerido"),
    social: yup.string().required("Este campo es requerido"),
    NDocumentID: yup.number().required("Este campo es requerido").positive().integer(),
    address: yup.string().required("Este campo es requerido"),
    phone: yup.number().required("Este campo es requerido").positive().integer(),
    appt: yup.string().required("Este campo es requerido"),
    province: yup.string().required("Este campo es requerido"),
    city: yup.string().required("Este campo es requerido"),
    email: yup.string().required("Este campo es requerido").email("Este campo debe ser un email!"),
    // // manifest
    paymentReceipt: yup.string().required("Este campo es requerido"),
    npaymentReceipt: yup.number().required("Este campo es requerido").positive().integer(),
    sede: yup.string().required("Este campo es requerido"),
    // file:  yup.string().required("Este campo es requerido"),
    detailProduct: yup.string().required("Este campo es requerido"),
    detailComplain: yup.string().required("Este campo es requerido"),
    ProveedorAction: yup.string().required("Este campo es requerido"),
})
export const ComplaisSchema2 = yup.object().shape({
    fullName: yup.string().required("Este campo es requerido"),
    typeID: yup.string().required("Este campo es requerido"),
    social: yup.string().required("Este campo es requerido"),
    NDocumentID: yup.number().required("Este campo es requerido").positive().integer(),
    address: yup.string().required("Este campo es requerido"),
    phone: yup.number().required("Este campo es requerido").positive().integer(),
    appt: yup.string().required("Este campo es requerido"),
    province: yup.string().required("Este campo es requerido"),
    city: yup.string().required("Este campo es requerido"),
    email: yup.string().required("Este campo es requerido").email("Este campo debe ser un email!"),

    legalGuardianName: yup.string().required("Este campo es requerido"),
    legalGuardianNumberID: yup.number().required("Este campo es requerido").positive().integer(),
    legalGuardianEmail: yup.string().required("Este campo es requerido").email("Este campo debe ser un email!"),
    legalGuardianPhone: yup.number().required("Este campo es requerido").positive().integer(),
    legalGuardianAddress: yup.string().required("Este campo es requerido"),
    // // manifest
    paymentReceipt: yup.string().required("Este campo es requerido"),
    npaymentReceipt: yup.number().required("Este campo es requerido").positive().integer(),
    sede: yup.string().required("Este campo es requerido"),
    // file:  yup.string().required("Este campo es requerido"),
    detailProduct: yup.string().required("Este campo es requerido"),
    detailComplain: yup.string().required("Este campo es requerido"),
    ProveedorAction: yup.string().required("Este campo es requerido"),
})