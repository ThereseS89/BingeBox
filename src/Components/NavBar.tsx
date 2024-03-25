import { FaHome } from "react-icons/fa"
import { FaTv } from "react-icons/fa6"
import { FaSearch } from "react-icons/fa"
import { IoPerson } from "react-icons/io5"
import { RiMovie2Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import './Stylesheets/navbar.scss'
import { isLoggedInState } from "../Utils/atoms";


const NavBar = () => {
	const isLoggedIn = useRecoilValue(isLoggedInState)
	return (
		<div className="navbar">
			<ul>
				
				<NavLink to='/' className="uppercase fontgreen"><FaHome className="icon"/><p>Hem</p></NavLink>
				<NavLink to='/movies' className="uppercase fontgreen"><RiMovie2Line className="icon"/><p>Filmer</p></NavLink>
				<NavLink to='/tvshows' className="uppercase fontgreen"><FaTv className="icon"/><p>Tv-serier</p></NavLink>
				<NavLink to='/search' className="uppercase fontgreen"><FaSearch className="icon"/><p>Sök</p></NavLink>
				<NavLink to={isLoggedIn ? '/mypage' : '/login'} className="uppercase fontgreen">
					<IoPerson className="icon" /><p>Min sida</p></NavLink>
			</ul>
			
		</div>
	)
}

export default NavBar