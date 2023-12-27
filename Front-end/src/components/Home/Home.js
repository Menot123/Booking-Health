import React from 'react'
import { useSelector, useDispatch } from 'react-redux'


const Home = () => {

    const dispatch = useDispatch()
    const language = useSelector(state => state.language.value)

    return (
        <>
            <div className='container home-container'>
                <div>Home</div>
                <div>Current language: {language}</div>
            </div>

        </>
    )
}

export default Home