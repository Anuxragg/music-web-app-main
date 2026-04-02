/* eslint-disable react/prop-types */
import { GoHome } from "react-icons/go";
import { MdOutlineExplore } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { TbPlaylist } from "react-icons/tb";
import { NavListContainerStyled, NavListStyled, UserPlaylistContainerStyled, UserPlaylistHeadingStyled, UserPlayListWrapperStyled, UserPlaylistStyled } from "./navList.styled";

export default function NavList({ menuOpen = false, collapsed = false, currentView, setCurrentView }) {

    const navListItems = [
        { icon: <GoHome />, text: 'Home' },
        { icon: <MdOutlineExplore />, text: 'Explore' },
        { icon: <MdOutlineFavoriteBorder />, text: 'Favorites' },
    ];

    const handleNavClick = (viewName) => {
        setCurrentView(viewName);
    };

    return (
        <>
            <NavListContainerStyled $menuOpen={menuOpen} $collapsed={collapsed}>
                {navListItems.map((item, index) => (
                    <NavListStyled
                        key={index}
                        $collapsed={collapsed}
                        $isActive={currentView === item.text}
                        onClick={() => handleNavClick(item.text)}
                    >
                        <span className="react-icon">
                            {item.icon}
                        </span>
                        <p>{item.text}</p>
                    </NavListStyled>
                ))}
            </NavListContainerStyled>

            <UserPlaylistContainerStyled $menuOpen={menuOpen} $collapsed={collapsed}>
                <UserPlaylistHeadingStyled>
                    <p>Your Playlist</p>
                </UserPlaylistHeadingStyled>

                <UserPlayListWrapperStyled>
                    {['userPlaylist1', 'userPlaylist2', 'userPlaylist3'].map(ele => {
                        return (
                            <UserPlaylistStyled key={ele}>
                                <span className="react-icon"><TbPlaylist /></span>
                                <p>{ele}</p>
                            </UserPlaylistStyled>
                        )
                    })}
                </UserPlayListWrapperStyled>
            </UserPlaylistContainerStyled>
        </>
    )
}