
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
				<li onClick={handleLinkClick} className="uppercase"><NavLink to="/search" className="fontyellow">Sök</NavLink></li>
				<li onClick={handleLinkClick} className="uppercase"><NavLink to="/" className="fontyellow">Hem</NavLink></li>
				<li onClick={handleLinkClick} className="uppercase"><NavLink to="" className="fontyellow">Populärt Just nu</NavLink></li>
				<li onClick={handleLinkClick} className="uppercase"><NavLink to="" className="fontyellow">Genrer</NavLink></li>
				<li onClick={handleLinkClick} className="uppercase fontyellow"><NavLink to="/aboutUs" className="fontyellow">Om Oss</NavLink></li>
				{!isLoggedIn ? <li className="uppercase position-bottom fontyellow"><NavLink to="" className="fontyellow">logga in</NavLink></li> : <li className="uppercase font">Min sida</li>}
				
			</ul>
		</div>

	)
}

export default HamburgerMenu