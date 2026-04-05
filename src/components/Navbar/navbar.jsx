/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import appLogo from '../../media/m-app-logo.png'
import NavList from './nav-list/navList';
import { NavContainerStyled, NavHeadStyled, AppLogoContainerStyled, AppNameContainerStyled, HamburgerMenuStyled, HamburgerLineStyled, EdgeHandleStyled, SidebarToggleStyled } from './navbar.styled'

const AppleSidebarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2.5" ry="2.5" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="13" y1="9" x2="17" y2="9" />
        <line x1="13" y1="12" x2="17" y2="12" />
        <line x1="13" y1="15" x2="17" y2="15" />
    </svg>
);

export default function Navbar({ currentView, setCurrentView }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(true);
    const [isDraggingEdge, setIsDraggingEdge] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogoClick = () => {
        setCurrentView('Home');
    };

    useEffect(() => {
        if (!isDraggingEdge) return;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - dragStartX;

            if (collapsed && deltaX > 28) {
                setCollapsed(false);
                setDragStartX(e.clientX);
            }

            if (!collapsed && deltaX < -28) {
                setCollapsed(true);
                setDragStartX(e.clientX);
            }
        };

        const handleMouseUp = () => {
            setIsDraggingEdge(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDraggingEdge, dragStartX, collapsed]);

    const handleEdgeDragStart = (e) => {
        if (window.innerWidth <= 480) return;
        if (e.button !== 0 && e.button !== 2) return;
        e.preventDefault();
        setDragStartX(e.clientX);
        setIsDraggingEdge(true);
    };

    return (
        <NavContainerStyled
            $menuOpen={menuOpen}
            $collapsed={collapsed}
        >
            <NavHeadStyled $collapsed={collapsed}>
                <SidebarToggleStyled 
                    onClick={() => setCollapsed(!collapsed)} 
                    $collapsed={collapsed}
                    title={collapsed ? "Show Sidebar" : "Hide Sidebar"}
                >
                    <AppleSidebarIcon />
                </SidebarToggleStyled>
                
                <AppLogoContainerStyled onClick={handleLogoClick}>
                    <img src={appLogo} alt="logo" className='main-logo' />
                </AppLogoContainerStyled>
                <AppNameContainerStyled onClick={handleLogoClick} $collapsed={collapsed}>
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
                collapsed={collapsed}
                currentView={currentView}
                setCurrentView={setCurrentView}
            />
            <EdgeHandleStyled onMouseDown={handleEdgeDragStart} onContextMenu={(e) => e.preventDefault()} />
        </NavContainerStyled>
    )
}