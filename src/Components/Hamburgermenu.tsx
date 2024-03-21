
import { useRecoilState } from "recoil"
import { isLoggedInState, showNavState } from "../Utils/atoms"
import { NavLink } from "react-router-dom"
import './Stylesheets/hamburgermenu.scss'


const HamburgerMenu = () => {
	const [isLoggedIn, setIsloggedIn] = useRecoilState<boolean>(isLoggedInState) 
	const [showNav, setShowNav] = useRecoilState<boolean>(showNavState)
	const handleLinkClick = () => {
		setShowNav(false)
	}

	return (
		<div className={showNav ? 'hamburger-menu' : 'hidden'}>
			<ul>
				
				<li 
					onClick={handleLinkClick} 
					className="uppercase">
						<NavLink to="/" className="fontyellow">Hem</NavLink>
				</li>

				<li 
					onClick={handleLinkClick} 
					className="uppercase">
						<NavLink 
							to="/search" 
							className="fontyellow">Sök</NavLink>
				</li>

				<li 
					onClick={handleLinkClick} 
					className="uppercase">
						<NavLink 
							to="/movies" 
							className="fontyellow">Filmer</NavLink>
				</li>

				<li 
					onClick={handleLinkClick} 
					className="uppercase">
						<NavLink 
							to="/tvshows" 
							className="fontyellow">Tv-serier</NavLink>
				</li>

				{/* <li onClick={handleLinkClick} 
					className="uppercase fontyellow">
						<NavLink 
							to="/aboutUs" 
							className="fontyellow">Om BingeBox</NavLink>
				</li> */}

				{!isLoggedIn ? 
				<li 
					onClick={handleLinkClick} 
					className="uppercase position-bottom fontyellow">
						<NavLink 
							to="/login" 
							className="fontyellow">logga in</NavLink>
				</li> : 
				<li className="uppercase font" 
					onClick={handleLinkClick}>Min sida</li>}
				
			</ul>
		</div>

	)
}

export default HamburgerMenu