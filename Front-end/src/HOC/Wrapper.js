import React from 'react'
import { useSelector } from 'react-redux'
import { IntlProvider, injectIntl } from 'react-intl'




const Wrapper = (props) => {
    const locale = useSelector(state => state.language.value)
    const message = useSelector(state => state.language.message)

    return (
        <IntlProvider messages={message} locale={locale} intl={injectIntl}>
            {props.children}
        </IntlProvider>
    )
}

export default Wrapper