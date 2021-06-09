import React from 'react'
import SideNav, { /*Toggle, Nav,*/ NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import visualizeIcon from '../Navbar/NavbarIcons/visualizeIcon.png'
import infoIcon from '../Navbar/NavbarIcons/infoIcon.png'

import './react-sidenav.css';

const Navbar = () => {
    return (
        <SideNav
    onSelect={(selected) => {
        // Add your code here
    }}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="home">
    <NavItem eventKey="visualize">
            <NavIcon>
                <a href="#Visualize">
                <img className="visualizeIcon" src={visualizeIcon} alt="visualizeIcon" />
                </a>
            </NavIcon>
            <NavText>
                Visualize
            </NavText>
        </NavItem>
        <NavItem eventKey="info">
            <NavIcon>
            <a href="#Info">
            <img className="infoIcon" src={infoIcon} alt="infoIcon" />
            </a>
            </NavIcon>
            <NavText>
                Info
            </NavText>
        </NavItem>
    </SideNav.Nav>
</SideNav>
    )
}

export default Navbar
