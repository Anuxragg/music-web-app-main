/* eslint-disable react/prop-types */
import { useState } from 'react';
import appLogo from '../../media/m-app-logo.png'
import NavList from './nav-list/navList';
import { NavContainerStyled, NavHeadStyled, AppLogoContainerStyled, AppNameContainerStyled, HamburgerMenuStyled, HamburgerLineStyled } from './navbar.styled'

export default function Navbar({ currentView, setCurrentView }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogoClick = () => {
        setCurrentView('Home');
    };

    return (
        <NavContainerStyled $menuOpen={menuOpen}>
            <NavHeadStyled>
                <AppLogoContainerStyled onClick={handleLogoClick}>
                    <img src={appLogo} alt="logo" className='main-logo' />
                </AppLogoContainerStyled>
                <AppNameContainerStyled onClick={handleLogoClick}>
                    <p>VOCALZ</p>
                    <p>MUSIC</p>
                </AppNameContainerStyled>
                <HamburgerMenuStyled onClick={toggleMenu} $menuOpen={menuOpen}>
                    <HamburgerLineStyled $menuOpen={menuOpen}></HamburgerLineStyled>
                    <HamburgerLineStyled $menuOpen={menuOpen}></HamburgerLineStyled>
                    <HamburgerLineStyled $menuOpen={menuOpen}></HamburgerLineStyled>
                </HamburgerMenuStyled>
            </NavHeadStyled>
            <NavList
                menuOpen={menuOpen}
                currentView={currentView}
                setCurrentView={setCurrentView}
            />
        </NavContainerStyled>
    )
}