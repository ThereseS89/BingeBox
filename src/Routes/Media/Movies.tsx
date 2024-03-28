import { useState, useEffect } from "react";
import { getMovies } from "../../APIFunctions/getMovies";
import { Movie } from "../../types";
import { posterImage, unavailable } from "../../constants/imageconfig";
import { layoutState } from "../../Utils/atoms";
import {  useRecoilValue } from "recoil";
import LayoutSort from "../../Components/layoutSort";
import '../Media/media.scss'
import { useMediaClickHandler } from "../../Utils/regularUtils";
import InfiniteScroll from 'react-infinite-scroll-component';

const Movies = () => {
	const [movies, setMovies ] = useState<Movie[]>([])
	const layout = useRecoilValue(layoutState)
	const handleMediaClick = useMediaClickHandler()
	const [page, setPage ] = useState(1)

	async function fetchData() {
		const moviesList = await getMovies(page);
		
		const movieType = moviesList.map((type: object) => ({
			...type,
			media_type: 'movie'
		}));
		setMovies(movieType);
		
	}

	
	useEffect(() => {
			fetchData()				
    }, []);


	const fetchNextPage = async () => {
		const nextPage = page + 1
		setPage(nextPage)
		const moviesList = await getMovies(nextPage);
		const nextPageMovies = moviesList.map((movie: object) => ({
				...movie,
				media_type: 'movie'
			}))
		setMovies(prevMovies => [ ...prevMovies, ...nextPageMovies])
			
	}

	return (
		<div className="media">
			<h3 className="uppercase barlowCon">Filmer</h3>
			<div><LayoutSort /></div>
			<InfiniteScroll
				dataLength={movies.length} 
				next={fetchNextPage}
				hasMore={true}
				loader={<h4>Loading...</h4>}
				endMessage={
				<p style={{ textAlign: 'center', color: 'white' }}>
				<b>Yay! You have seen it all</b>
				</p>
			} >
			<div className="media-container">
			{movies !== null && movies.map((movie) => ( 

				<div 
					className={layout ? 'poster-div' : 'poster-div-small'}
					key={movie.id}
					onClick={() => handleMediaClick(movie, movie.id, movie.media_type)}>
					<h5 className="fontwhite">{movie.title}</h5>

							<img 
							className="movie-img" 
							src={movie.poster_path ? posterImage + movie.poster_path : unavailable} 
							alt={movie.title} /> 
							
							<div className='fontyellow media-card-text'>
								<p className='uppercase'>{movie.media_type}</p>
								<p>{movie.release_date.substring(0,4)} </p>
							</div>

				</div>))}
			</div>
			</InfiniteScroll>

			
			
		</div>
	)
}

export default Movies