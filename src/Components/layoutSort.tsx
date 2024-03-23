import { useRecoilState } from "recoil"
import { layoutState } from "../Utils/atoms"
import './Stylesheets/layoutSort.scss';

const LayoutSort = () => {	
	const [layout, setLayout ] = useRecoilState(layoutState)

	const handleLayout = () => {

		if (layout) {
			setLayout(false)
		} else {
			
			setLayout(true)
		} 
			
	}

	return (
		<div className="layout">
			<div className="position"> <button className="layout-button border" onClick={handleLayout}>{layout ? 'liten' : 'stor'}</button> </div>
		</div>
	)
}

export default LayoutSort