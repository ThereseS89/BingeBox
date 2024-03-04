
import { useRecoilState } from "recoil"
import { isLoggedInState, showNavState } from "../Utils/atoms"
import './Stylesheets/hamburgermenu.scss'


const HamburgerMenu = () => {
	const [isLoggedIn, setIsloggedIn] = useRecoilState<boolean>(isLoggedInState) 
	const [showNav, setShowNav] = useRecoilState<boolean>(showNavState)
	

	return (
		<div className={showNav ? 'hamburger-menu' : 'hidden'}>
			<ul>
				<li className="uppercase">Filmer</li>
				<li className="uppercase">Tv-serier</li>
				<li className="uppercase">Populärt Just nu</li>
				<li className="uppercase">Genrer</li>
				<li className="uppercase">Om Oss</li>
				{!isLoggedIn ? <li className="uppercase">logga in</li> : <li className="uppercase">Min sida</li>}
				
			</ul>
		</div>

	)
}

export default HamburgerMenu