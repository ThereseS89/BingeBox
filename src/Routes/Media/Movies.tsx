import { useState, useEffect } from "react";
import { getMovies } from "../../APIFunctions/getMovies";
import { Movie } from "../../types";
import { posterImage, unavailable } from "../../constants/imageconfig";
import { isClickedState, clickedMediaState, actorsState, layoutState } from "../../Utils/atoms";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { getMediaDetails, getMediaActors } from "../../APIFunctions/getMediaDetails";
import LayoutSort from "../../Components/layoutSort";


const Movies = () => {
	const [movies, setMovies ] = useState<Movie[]>([])
	const [ isClicked, setIsClicked ] = useRecoilState(isClickedState)
	const [ selectedMedia, setSelectedMedia ] = useRecoilState(clickedMediaState)
	const [actors, setActors] = useRecoilState(actorsState)
	const [layout, setLayout ] = useRecoilState(layoutState)

	useEffect(() => {
		
		async function fetchData() {
		const moviesList = await getMovies();
		const movieType = moviesList.map(type => ({
			...type,
			mediaType: 'movie'
		}))

			setMovies(movieType)
			console.log('movies:',movies)
		}
		fetchData()
	}, []);

	const navigate = useNavigate()
	const handleMediaClick = async (media, id, mediaType ) => {
		console.log('Media typ:' ,mediaType, id)
		const mediaDetails = await getMediaDetails(id, mediaType)	
		setSelectedMedia(mediaDetails)
		const actorDetails = await getMediaActors(id, mediaType )
			
			setActors(actorDetails)
			console.log('ACTORS:', actors)
			
		if (!isClicked) {
			setIsClicked(true)
			
			navigate(`/mediaPage/${media.id}`);
			console.log('movie', media)

		} else {
			setIsClicked(false)
		}

	}

	return (
		<>
		<LayoutSort />
			
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
								<p>{movie.release_date} </p>
							</div>

				</div>))}
			</div>
		</>
	)
}

export default Movies