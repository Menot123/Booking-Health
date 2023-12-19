import React from 'react'
import { useSelector, useDispatch } from 'react-redux'


const Home = () => {

    const dispatch = useDispatch()
    const language = useSelector(state => state.language.value)

    return (
        <>
            <div>Home</div>
            <div>Current language: {language}</div>

        </>
    )
}

export default Home