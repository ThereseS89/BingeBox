import './Stylesheets/header.scss'

const Header = () => {
	return (
		<header>
			<div className='nav-hamburger'>
				<div className='line'></div>
				<div className='line'></div>
				<div className='line'></div>
			</div>
			<h4>Binge<span>Box</span></h4>
			<div className='user-container'><p>T</p></div>
		</header>
	)
}

export default Header