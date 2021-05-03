import React from 'react'
import Granim from 'react-granim'
//import PropTypes from 'prop-types'

const Button = () => {


    return (
        <div className="bloc-logo">
            <canvas id="logo-canvas"></canvas>
            <a href="index.html" className="logo-mask">Granim.js</a>
            <Granim
                element={'#logo-canvas'}
                direction={'radial'}
            ></Granim>
        </div>
    )
}

// let granimInstance = new Granim({
//     element: '#logo-canvas',
//     direction: 'left-right',
//     states: {
//         'default-state': {
//             gradients: [
//                 ['#EB3349', '#F45C43'],
//                 ['#FF8008', '#FFC837'],
//                 ['#4CB8C4', '#3CD3AD'],
//                 ['#24C6DC', '#514A9D'],
//                 ['#FF512F', '#DD2476'],
//                 ['#DA22FF', '#9733EE']
//             ],
//             transitionSpeed: 1
//         }
//     }
// })

export default Button