import React from 'react'
import '../../App.css';
//import PropTypes from 'prop-types'
import gitLogo from './footer-images/GitHub-Mark-Light-64px.png'

console.log(gitLogo)

const Footer = () => {
    return (
        <div className="Footer">
            <div className="Footer-logo">
                <h2>VIZ IT</h2>
            </div>  
            <div className="Footer-info">
                <center><img className="gitLogo" src={gitLogo} alt="Logo" /></center>
                <a href="https://github.com/mrmanago/VisApp" target="_blank" rel="noreferrer">Viz It git</a>
                <p>Team:</p>
                <ul>
                    <li><a href="https://github.com/gittyaulia" target="_blank" rel="noreferrer">Andini</a></li>
                    <li><a href="https://github.com/mrmanago" target="_blank" rel="noreferrer">Marissa</a></li>
                    <li><a href="https://github.com/nicoleram" target="_blank" rel="noreferrer">Nicole</a></li>
                    <li><a href="https://github.com/pocolpaolo10" target="_blank" rel="noreferrer">Paolo</a></li>
                    <li> <a href="https://github.com/yangabiceps" target="_blank" rel="noreferrer">Yanislav</a></li>
                </ul>    
                <center><p>Created by Group 28, Copyright © 2021 VIZ IT</p></center>
            </div>
        </div>
    )
}

export default Footer