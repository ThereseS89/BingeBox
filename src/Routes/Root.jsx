import { Outlet } from "react-router-dom"
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import HomeOverlay from "../Components/HomeOverlay"
import {useState, useEffect} from "react"
import '../../src/index.scss'


const Root = () => {
	const [isOverlayVisible, setIsOverlayVisible]= useState(true)
	
	useEffect(() => {
		setIsOverlayVisible(true);

		const timeout = setTimeout(() => {
			setIsOverlayVisible(false);
		}, 5000 )
		return () => clearTimeout(timeout)
	}, []);
	
	return (
		<>
		{isOverlayVisible ? <HomeOverlay isOverlay={true}/> : null }
		{!isOverlayVisible ? <Header /> : null }
		<main>
			
			<Outlet />
		</main>
		{!isOverlayVisible ? <Footer /> : null }
		</>
	)
}

export default Root