import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IntlProvider } from 'react-intl'
import Vietnamese from '../languages/vi.json'
import English from '../languages/en.json'


// export const Context = React.createContext()

// let local = navigator.language

// let lang;
// if (local === 'en-US') {
//     lang = English
// } else {
//     lang = Vietnamese
// }

const Wrapper = (props) => {
    const dispatch = useDispatch()
    const locale = useSelector(state => state.language.value)
    const message = useSelector(state => state.language.message)

    // const [locale, setLocale] = useState(language)
    // const [message, setMessage] = useState(Vietnamese)

    // const selectLang = (e) => {
    //     const newLocale = e.target.value
    //     setLocale(newLocale)
    //     if (newLocale === 'en') {
    //         setMessage(English)
    //     } else {
    //         setMessage(Vietnamese)
    //     }
    // }

    return (
        <IntlProvider messages={message} locale={locale}>
            {props.children}
        </IntlProvider>
    )
}

export default Wrapper