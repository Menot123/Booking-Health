import React from 'react'
import './ManageClinic.scss'
import { FormattedMessage } from 'react-intl'
import Select from 'react-select'


function ManageSpecialty() {

    const handleOnchangeSelectInput = (e, type) => {
        switch (type) {
            case 'price':
                // setSelectPrice(e)
                // setDoctorInfo((preState) => ({ ...preState, price: e.value }))
                break;

            default:
            // code block
        }
    }

    return (
        <div className='manage-specialty-container'>
            <h4 className='text-center mt-3 text-uppercase'><FormattedMessage id='admin-manage-doctor.add-info-doctor' /></h4>
            <div className='manage-specialty-content p-3'>
                <div className='row'>
                    <div className='col-4'>
                        <label ><FormattedMessage id='admin-manage-doctor.select-doctor' /></label>
                        <Select
                            value={''}
                            options={''}
                            placeholder={<FormattedMessage id='admin-manage-doctor.select-doctor' />}
                            onChange={''}
                        />
                    </div>

                    <div className='col-4'>
                        <label ><FormattedMessage id='admin-manage-doctor.select-clinic' /></label>
                        <Select
                            value={''}
                            options={''}
                            placeholder={<FormattedMessage id='admin-manage-doctor.select-clinic' />}
                            onChange={(e) => handleOnchangeSelectInput(e, 'clinic')}

                        />
                    </div>

                    <div className='col-4 '>
                        <label ><FormattedMessage id='admin-manage-doctor.medical-examination-price' /></label>
                        <Select
                            value={''}
                            options={''}
                            placeholder={<FormattedMessage id='admin-manage-doctor.medical-examination-price' />}
                            onChange={(e) => handleOnchangeSelectInput(e, 'price')}
                        />
                    </div>



                    {/* <MdEditor
                        style={{ height: '400px' }}
                        renderHTML={text => mdParser.render(text)}
                        value={markdown.textMarkdown}
                        onChange={(e) => handleChangeMarkdown(e)}
                    /> */}

                    <div>
                        <button className='btn btn-primary mt-3'
                            onClick={() => 'handleSaveDoctorInfo()'}
                        ><FormattedMessage id='admin-manage-doctor.save-info' /></button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ManageSpecialty