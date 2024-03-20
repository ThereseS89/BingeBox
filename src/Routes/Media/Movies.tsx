import { useState, useEffect } from "react";
import { getMovies } from "../../APIFunctions/getMovies";
import { Movie } from "../../types";
import { posterImage, unavailable } from "../../constants/imageconfig";
import { isClickedState } from "../../Utils/atoms";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const Movies = () => {
	const [movies, setMovies ] = useState<Movie[]>([])
	const [ isClicked, setIsClicked ] = useRecoilState(isClickedState)

	useEffect(() => {
		
		async function fetchData() {
		const moviesList = await getMovies();

			setMovies(moviesList)
			console.log('movies:',movies)
		}
		fetchData()
	}, []);

	const navigate = useNavigate()
	const handleMediaClick = (media) => {
			
		if (!isClicked) {
			setIsClicked(true)
			navigate('../')
			navigate(`mediaPage/${media.id}`, { state: { media: media } });
			console.log('movie', media)

		} else {
			setIsClicked(false)
		}

	}

	return (
		<>
			
			<div className="media-container">
			{movies !== null && movies.map((movie) => ( 

				<div 
					className='poster-div' 
					key={movie.id}
					onClick={() => handleMediaClick(movie)}>
					<h5 className="fontwhite">{movie.title}</h5>

							<img 
							className="movie-img" 
							src={movie.poster_path ? posterImage + movie.poster_path : unavailable} 
							alt={movie.title} /> 
							
							<div className='fontyellow media-card-text'>
								<p className='uppercase'>{movie.media_type}</p>
								<p>{movie.release_date} </p>
							</div>

				</div>))}
			</div>
		</>
	)
}

export default Movies