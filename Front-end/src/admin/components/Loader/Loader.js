import PuffLoader from "react-spinners/PuffLoader";

import React from 'react'

function Loader(props) {

    const override = {
        display: "block",
        margin: "0 auto",
    };

    return (
        <PuffLoader
            color={'#32d7fc'}
            loading={props.loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
}

export default Loader