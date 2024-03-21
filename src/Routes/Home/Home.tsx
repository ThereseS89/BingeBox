
import { getTrendingMedia } from '../../APIFunctions/getTrendingMedia.js'
import { useEffect } from "react";
import { posterImage } from "../../constants/imageconfig";
import { useRecoilState } from "recoil";
import {isClickedState, } from "../../Utils/atoms"
import { useNavigate } from "react-router-dom";
import { movieDataState, clickedMediaState, actorsState, layoutState } from "../../Utils/atoms";
import { unavailable } from "../../constants/imageconfig";
import "../Home/home.scss"
import { getMediaDetails, getMediaActors } from '../../APIFunctions/getMediaDetails.js';
import LayoutSort from '../../Components/layoutSort.js';


const Home = () => {
	const [ isClicked, setIsClicked ] = useRecoilState(isClickedState)
	const [ trendingMediaDataState, setTrendingMediaDataState] = useRecoilState(movieDataState)
	const [ selectedMedia, setSelectedMedia ] = useRecoilState(clickedMediaState)
	const [actors, setActors] = useRecoilState(actorsState)
	const [layout, setLayout ] = useRecoilState(layoutState)


	useEffect(() => {
		
		async function fetchData() {
		const trendingMediaData = await getTrendingMedia();

			setTrendingMediaDataState(trendingMediaData)
		}
		fetchData()
	},[]);

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
			navigate(`/mediaPage/${media.id}`, { state: { media: media } });
			console.log('movie', media)

		} else {
			setIsClicked(false)
		}

	}
	


	return (
		<div className="home">
			{/* <div className="banner">
				
				<div className="banner-img-container">
					<img src={aquaman} />
				</div>
				<div className="dot-indicators flex">
							<button></button>
							<button></button>
							<button></button>
				</div> 
			</div> */}

			
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
			
			
			{/* <h5 className="uppercase">Tv-serier</h5>	
			<div className="media-container">
				{tvshowData !== null && tvshowData.map((tvshow) => (
				<div className="poster-div" onClick={() => handleMediaClick(tvshow)} key={tvshow.id} >
					<img className="movie-img" src={urlImage+tvshow.poster_path} /> <p>{tvshow.name}</p> 
				</div>
				))}
				
			</div>

			<h5 className="uppercase">Populärt</h5>
			<div className="media-container">
			{tvshowData !== null && tvshowData.map((popmedia) => (
				<div className="poster-div" onClick={() => handleMediaClick(popmedia)} key={popmedia.id} >
					<img className="movie-img" src={urlImage+popmedia.poster_path}></img>
				</div>
				))}
			</div>	 */}
			
		</div>
	)
}

export default Home