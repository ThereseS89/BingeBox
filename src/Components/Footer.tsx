import './Stylesheets/footer.scss'

import { FaFacebookF, FaYoutube, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'

const Footer = () => {
	return (
		<footer>
			<div className='socialmedia-container'> 
				<FaFacebookF /> <FaYoutube /><FaInstagram /> <FaXTwitter />
			</div>
			<div className='logo-container'>
				<p className='logotext'>Binge<span>Box</span></p> 
				<p className='year'>2024</p>
			</div>
		</footer>
	)
}

export default Footer