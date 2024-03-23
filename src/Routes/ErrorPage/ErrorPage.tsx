import './errorpage.scss'
import { NavLink } from 'react-router-dom'

const ErrorPage = () => {
	return (
		<div className="errorPage">

			<div className='centererror'>
				<h5 className='uppercase fontwhite'>404 Page not found</h5>
				<h1 className='fontyellow'> OOPS,</h1> 
				<h2>Are we lost in space?</h2>
				<h2>Let's get <NavLink to='/'><span className='uppercase'>back</span></NavLink></h2>
			</div>
		</div>
	)
}

export default ErrorPage