import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    Form,
    FormGroup,
} from 'reactstrap';
import './ModalRemedy.scss'
import { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

function ModalRemedy(props) {

    const [emailPatient, setEmailPatient] = useState('')
    const [imgRemedy, setImgRemedy] = useState(null)

    useEffect(() => {
        setEmailPatient(props?.emailPatient)
    }, [props?.emailPatient])

    const handleChangeInputEmail = (e) => {
        setEmailPatient(e.target.value)
    }


    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }

    const handleChangeFile = async (e) => {
        let dataFile = e.target.files
        let img = dataFile[0]
        if (img) {
            let imgBase64 = await getBase64(img)
            let objUrl = URL.createObjectURL(img)
            setImgRemedy(imgBase64)
        }
    }

    const handleSendRemeDy = () => {
        props.sendRemedy(emailPatient, imgRemedy)
    }

    return (
        <div>
            {props.isSendingEmail
                ?
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
                : ''
            }
            <Modal
                isOpen={props.isOpenModal}
                toggle={props.handleCloseModal}
                className={'modal-booking'}
                backdrop={true}
                size='lg'
                centered={true}
            >
                <ModalHeader toggle={props.handleCloseModal}><FormattedMessage id="doctor-manage-patients.modal-title" /></ModalHeader>
                <ModalBody>
                    <div className='modal-content-body p-3 d-flex'>

                        <div className='email-patient'>
                            <label htmlFor='input-email'><FormattedMessage id="doctor-manage-patients.modal-email-patient" /></label>
                            <input className='form-control' id='input-email' type='text' value={emailPatient} onChange={(e) => handleChangeInputEmail(e)} />
                        </div>

                        <div className='upload-remedy'>
                            <label htmlFor='input-remedy'><FormattedMessage id="doctor-manage-patients.modal-remedy" /></label>
                            <input className='form-control' id='input-remedy' type='file' onChange={(e) => handleChangeFile(e)} />
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => handleSendRemeDy()}>
                        <FormattedMessage id="doctor-manage-patients.btn-confirm" />
                    </Button>
                    <Button color="secondary" onClick={props.handleCloseModal}>
                        <FormattedMessage id="doctor-manage-patients.modal-cancel" />
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ModalRemedy