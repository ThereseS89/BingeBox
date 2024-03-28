import './Stylesheets/header.scss'
import {  useRecoilValue } from 'recoil'
import { isLoggedInState} from '../Utils/atoms'
import { NavLink } from 'react-router-dom'
import { IoPerson } from "react-icons/io5"

const Header = () => {

	const isLoggedIn = useRecoilValue<boolean>(isLoggedInState)


	return (
		<header>
			<NavLink to="/"><h4>Binge<span>Box</span></h4></NavLink>
			<NavLink to={!isLoggedIn ? '/login' : '/myPage'}><div className='user-container'><span><IoPerson className='person-icon'/></span></div></NavLink>
			
		</header>
	)
}

export default Header