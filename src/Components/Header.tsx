import './Stylesheets/header.scss'
import { useRecoilState } from 'recoil'
import { showNavState } from '../Utils/atoms'
import { NavLink } from 'react-router-dom'

const Header = () => {
	const [showNav, setShowNav] = useRecoilState<boolean>(showNavState)

	const handleClickNav = () => {
		if (!showNav) {
		setShowNav(true)
		
		} else {
			setShowNav(false)
		}
		console.log(showNav)
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
			<NavLink to="/myPage"><div className='user-container'><p>T</p></div></NavLink>
			
		</header>
	)
}

export default Header