import './Stylesheets/header.scss'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isLoggedInState, showNavState } from '../Utils/atoms'
import { NavLink } from 'react-router-dom'
import { IoPerson } from "react-icons/io5"

const Header = () => {
	const [showNav, setShowNav] = useRecoilState<boolean>(showNavState)
	const isLoggedIn = useRecoilValue<boolean>(isLoggedInState)

	const handleClickNav = () => {
		if (!showNav) {
		setShowNav(true)
		
		} else {
			setShowNav(false)
		}
	}

	return (
		<header>
			<div onClick={handleClickNav}
				className='nav-hamburger'>

				<div className={!showNav ? 'line' : 'line rotate'}></div>
				<div className={!showNav ? 'line' : 'opacity'}></div>
				<div className={!showNav ? 'line' : 'line rotateB'}></div>

			</div>
			<NavLink to="/"><h4>Binge<span>Box</span></h4></NavLink>
			<NavLink to={!isLoggedIn ? '/login' : '/myPage'}><div className='user-container'><span><IoPerson className='person-icon'/></span></div></NavLink>
			
		</header>
	)
}

export default Header