import mobileLogo from "../assets/imgs/Logomobile.png"
import './Stylesheets/homeOverlay.scss'

interface homeOverlayProps {
	isOverlay: boolean;
}

const HomeOverlay: React.FC<homeOverlayProps> = ({isOverlay}) => {
	return isOverlay ? (
		
		<div className="overlay">
			<div>
				<img src= {mobileLogo} />
			</div>
		</div>
	) : null

}

export default HomeOverlay