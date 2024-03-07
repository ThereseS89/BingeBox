
import { useRecoilState } from "recoil"
import { isLoggedInState, showNavState } from "../Utils/atoms"
import { NavLink } from "react-router-dom"
import './Stylesheets/hamburgermenu.scss'


const HamburgerMenu = () => {
	const [isLoggedIn, setIsloggedIn] = useRecoilState<boolean>(isLoggedInState) 
	const [showNav, setShowNav] = useRecoilState<boolean>(showNavState)
	

	return (
		<div className={showNav ? 'hamburger-menu' : 'hidden'}>
			<ul>
				<li className="uppercase"><NavLink to="/search">Sök</NavLink></li>
				<li className="uppercase"><NavLink to="">Tv-serier</NavLink></li>
				<li className="uppercase"><NavLink to="">Populärt Just nu</NavLink></li>
				<li className="uppercase"><NavLink to="">Genrer</NavLink></li>
				<li className="uppercase"><NavLink to="">Om Oss</NavLink></li>
				{!isLoggedIn ? <li className="uppercase position-bottom"><NavLink to="">logga in</NavLink></li> : <li className="uppercase">Min sida</li>}
				
			</ul>
		</div>

	)
}

export default HamburgerMenu