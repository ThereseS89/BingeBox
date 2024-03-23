import { useState, useEffect } from "react";
import { getMovies } from "../../APIFunctions/getMovies";
import { Movie } from "../../types";
import { posterImage, unavailable } from "../../constants/imageconfig";
import { layoutState } from "../../Utils/atoms";
import {  useRecoilValue } from "recoil";
import LayoutSort from "../../Components/layoutSort";
import '../Media/media.scss'
import { useMediaClickHandler } from "../../Utils/regularUtils";

const Movies = () => {
	const [movies, setMovies ] = useState<Movie[]>([])
	const layout = useRecoilValue(layoutState)
	const handleMediaClick = useMediaClickHandler()

	useEffect(() => {
		
		async function fetchData() {
		const moviesList = await getMovies();
		const movieType = moviesList.map(type => ({
			...type,
			mediaType: 'movie'
		}))

			setMovies(movieType)
		}
	
		fetchData()
	}, []);	

	return (
		<div className="media">
			<h3 className="uppercase barlowCon">Filmer</h3>
			<div><LayoutSort /></div>
			
			<div className="media-container">
			{movies !== null && movies.map((movie) => ( 

				<div 
					className={layout ? 'poster-div' : 'poster-div-small'}
					key={movie.id}
					onClick={() => handleMediaClick(movie, movie.id, movie.mediaType)}>
					<h5 className="fontwhite">{movie.title}</h5>

							<img 
							className="movie-img" 
							src={movie.poster_path ? posterImage + movie.poster_path : unavailable} 
							alt={movie.title} /> 
							
							<div className='fontyellow media-card-text'>
								<p className='uppercase'>{movie.mediaType}</p>
								<p>{movie.release_date.substring(0,4)} </p>
							</div>

				</div>))}
			</div>
		</div>
	)
}

export default Movies