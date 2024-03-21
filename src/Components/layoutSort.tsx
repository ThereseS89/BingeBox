import { useState } from "react"
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
		console.log(layout)
			
	}

	return (
		<div className="layout">
			<p>Ändra layout till:</p> <button className="layout-button" onClick={handleLayout}>{layout ? 'small' : 'large'}</button> 
		</div>
	)
}

export default LayoutSort