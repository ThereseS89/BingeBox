import { movieData } from "../../assets/data/testdata";
import { tvshowData } from "../../assets/data/testdata.js";
import  aquaman  from "../../assets/imgs/Aquaman.jpeg"
// import { getTrendingMovies } from '../../APIFunctions/getMovies.js'
// import { getTrendingTvShows } from "../../APIFunctions/getTvshows";
// import { useEffect, useState } from "react";
//import { Movie, Movietest } from '../../types'
// import { urlImage } from "../../constants/constants";
import { useRecoilState } from "recoil";
import {isClickedState, clickedMediaState} from "../../Utils/atoms"
import { useNavigate } from "react-router-dom";

import "../Home/home.scss"



const Home = () => {
	const [ isClicked, setIsClicked ] = useRecoilState(isClickedState)
	
	//const [clickedMedia, setClickedMedia ] = useRecoilState(clickedMediaState)
	//const [clickedMedia, setIsClickedMedia] = useRecoilState<Movie[]>(isClickedMediaState)
	// const [movieDatai, setMovieDatai] = useState<Movie[] | null>(null)
	// const [TVData, setTVData] = useState<Movie[] | null>(null)

	// useEffect(() => {
		
	// 	async function fetchData() {
	// 	const trendingMovieData = await getTrendingMovies();
	// 	const trendigTVData = await getTrendingTvShows()
			
			
	// 		console.log('DATA:', trendingMovieData, movieDatai)
	// 		setMovieDatai(trendingMovieData)
	// 		setTVData(trendigTVData)
	// 	}
	// 	fetchData()
	// },[]);
	const navigate = useNavigate()
	const handleMediaClick = (media) => {
		
		if (!isClicked) {
			setIsClicked(true)
			navigate(`mediaPage/${media.id}`, { state: { media: media } });
			console.log('movie', media)

		} else {
			setIsClicked(false)
		}

	}


	return (
		<div className="home">
			<div className="banner">
				<div className="banner-img-container">
					<img src={aquaman} />
				</div>
				<div className="dot-indicators flex">
							<button></button>
							<button></button>
							<button></button>
				</div>
			</div>

			<h5 className="uppercase">Filmer</h5>

			<div className="media-container">
				{ /* {movieDatai !== null }*/}
				{movieData.map((movie) => ( 
				
					<div onClick={()=> handleMediaClick(movie)} key={movie.id}>
						<img className="movie-img" src={movie.Image} alt={movie.Name} /> 
					</div>
			
				))}
			</div>
			
			
			<h5 className="uppercase">Tv-serier</h5>	
			<div className="media-container">
				{/* TVData !== null && TVData */}
				{tvshowData.map((tvshow) => (
				<div onClick={() => handleMediaClick(tvshow)} key={tvshow.id} >
					<img className="movie-img" src={tvshow.Image}></img>
				</div>
				))}
				
			</div>

			<h5 className="uppercase">Populärt</h5>
			<div className="media-container">
				
				
				{tvshowData.map((popmedia) => (
				<div onClick={() => handleMediaClick(popmedia)} key={popmedia.id} >
					<img className="movie-img" src={popmedia.Image}></img>
				</div>
				))}
			</div>	
			
		</div>
	)
}

export default Home