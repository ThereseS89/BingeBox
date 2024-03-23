
import { getTrendingMedia } from '../../APIFunctions/getTrendingMedia'
import { useEffect } from "react";
import { posterImage, unavailable } from "../../constants/imageconfig";
import { useRecoilState, useRecoilValue } from "recoil";
import { movieDataState, layoutState } from "../../Utils/atoms";
import "../Home/home.scss"
import { useMediaClickHandler } from '../../Utils/regularUtils.js';
import LayoutSort from '../../Components/layoutSort';


const Home = () => {
	const handleMediaClick = useMediaClickHandler()
	const [ trendingMediaDataState, setTrendingMediaDataState] = useRecoilState(movieDataState)
	const layout = useRecoilValue(layoutState)


	useEffect(() => {
		
		async function fetchData() {
		const trendingMediaData = await getTrendingMedia();

			setTrendingMediaDataState(trendingMediaData)
		}
		fetchData()
	},[]);

	return (
		<div className="home">
			
			<h3 className="uppercase barlowCon">Trendar idag</h3><div className='layout-set'><LayoutSort /></div>
			<div className="media-container">
				
				{trendingMediaDataState !== null && trendingMediaDataState.map((movie) => ( 
				
					<div 
					className={layout ? 'poster-div' : 'poster-div-small'} 
					onClick={()=> handleMediaClick(movie, movie.id, movie.media_type)} 
					key={movie.id}>
						<h5>{movie.title || movie.name}</h5>
						<img 
						className="movie-img" 
						src={movie.poster_path ? posterImage + movie.poster_path : unavailable} 
						alt={movie.title} /> 
						
						<div className='fontyellow media-card-text'>
							<p className='uppercase'>{movie.media_type}</p>
							<p>{movie.release_date || movie.first_air_date} </p>
						</div>

					</div>
			
				))}
			</div>
			
			
			
		</div>
	)
}

export default Home