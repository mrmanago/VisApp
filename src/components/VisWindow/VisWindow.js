import React from 'react'
import Visualization from "../Visualization/Visualization"
import DataLoader from "../DataLoader";
//import PropTypes from 'prop-types'

const VisWindow = () => {

    return (
        <div>
            <DataLoader />
            <Visualization />
        </div>
    )
}

export default VisWindow