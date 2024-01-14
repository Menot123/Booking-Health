import React from 'react'
import './ManageDoctors'
import Select from 'react-select'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

function ManageDoctors() {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <div className='manage-doctors-container'>
            <h4 className='text-center mt-3 text-uppercase'>Thêm thông tin bác sĩ</h4>
            <div className='manage-doctor-content p-3'>
                <div className='row'>
                    <div className='col-4'>
                        <label >Chọn bác sĩ</label>
                        <Select
                            options={options}
                            placeholder='Chọn bác sĩ'
                        />
                    </div>
                    <div className='col-8 form-group'>
                        <label htmlFor='input-info-doctor'>Thông tin giới thiệu</label>
                        <input className='form-control' id='input-info-doctor' />
                    </div>

                    <div className='col-4 my-3'>
                        <label >Giá khám bệnh</label>
                        <Select
                            options={options}
                            placeholder='Giá khám bệnh'
                        />
                    </div>

                    <div className='col-4 my-3'>
                        <label >Phương thức thanh toán</label>
                        <Select
                            options={options}
                            placeholder='Phương thức thanh toán'
                        />
                    </div>

                    <div className='col-4 my-3'>
                        <label >Tỉnh thành</label>
                        <Select
                            options={options}
                            placeholder='Tỉnh thành'
                        />
                    </div>

                    <div className='col-4 mb-3'>
                        <label htmlFor='input-info-name-clinic'>Tên phòng khám</label>
                        <input className='form-control' id='input-info-name-clinic' />
                    </div>

                    <div className='col-4 mb-3'>
                        <label htmlFor='input-info-address'>Địa chỉ phòng khám</label>
                        <input className='form-control' id='input-info-address' />

                    </div>

                    <div className='col-4 mb-3'>
                        <label htmlFor='input-info-note'>Ghi chú</label>
                        <input className='form-control' id='input-info-note' />

                    </div>

                    <div className='col-4 mb-3'>
                        <label >Chọn chuyên khoa</label>
                        <Select
                            options={options}
                            placeholder='Chọn chuyên khoa'
                        />
                    </div>

                    <div className='col-4 mb-3'>
                        <label >Chọn phòng khám</label>
                        <Select
                            options={options}
                            placeholder='Chọn phòng khám'
                        />
                    </div>

                    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} />

                </div>

            </div>

        </div>
    )
}

export default ManageDoctors