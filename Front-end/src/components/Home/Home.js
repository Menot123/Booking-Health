import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { translateToEn, translateToVi } from '../../redux/slices/languageSlice'


const Home = () => {

    const dispatch = useDispatch()
    const language = useSelector(state => state.language.value)

    return (
        <>
            <div>Home</div>
            <div>Current language: {language}</div>
            <button className='btn btn-primary mx-3' onClick={() => dispatch(translateToEn())}>EN</button>
            <button className='btn btn-primary' onClick={() => dispatch(translateToVi())}>VI</button>
        </>
    )
}

export default Home