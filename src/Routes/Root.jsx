import { Outlet } from "react-router-dom"
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import HomeOverlay from "../Components/HomeOverlay"
import {useState, useEffect} from "react"
import '../../src/index.scss'
import NavBar from "../Components/NavBar"

const Root = () => {
	const [isOverlayVisible, setIsOverlayVisible]= useState(true)
	const [ overlayHasShowned, setOverlayhasShowned ] = useState(false)
	
	
	useEffect(() => {
		if (!overlayHasShowned) {
			setIsOverlayVisible(true);
			setOverlayhasShowned(true)

			const timeout = setTimeout(() => {
				setIsOverlayVisible(false);
			}, 5000 )
			return () => clearTimeout(timeout)
		}

	}, []);

	
	
	return (
		<>
		{isOverlayVisible ? <HomeOverlay isOverlay={true}/> : null }
		{!isOverlayVisible ? <Header /> : null }
		<main>
			
	
			<Outlet />
		</main>
		<NavBar/>
		{!isOverlayVisible ? <Footer /> : null }
		</>
	)
}

export default Root