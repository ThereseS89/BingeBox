import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Movies from "./Movies"
import TvShows from "./TvShows"

const Media = () => {
	const [ showMovies, setShowMovies ] = useState(false)
	const [ showTvShows, setTvShows ] = useState(true)
	const navigate = useNavigate()

	const handlebuttonClick = () => {
		if(!showMovies) {
			setShowMovies(true)
			navigate('/media/movies')
			console.log(showMovies)
		} else {
			setShowMovies(false)
		}
	} 

	return (
		<>
		<button onClick={handlebuttonClick}>Filmer</button> <button onClick={handlebuttonClick}>Tv-Serier</button>
			{!showMovies ? <Movies/> : <TvShows/>}
		
		</>
	)
}

export default Media