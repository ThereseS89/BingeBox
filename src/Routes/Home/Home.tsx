import {movieData} from "../../assets/data/testdata";
import { tvshowData } from "../../assets/data/testdata.js";
import  aquaman  from "../../assets/imgs/Aquaman.jpeg"

import "../Home/home.scss"

const Home = () => {
	console.log(movieData, 'MOVIEDATA', tvshowData, 'TVSHOW')
	movieData.forEach((movie) => {
		console.log('image:' , movie.Image)
	})


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
				
				{movieData.map((movie, index) => (
				<div key={index} >
					<img className="movie-img" src={movie.Image} alt={movie.Name} />
				</div>
				))}
			</div>
			
			
			<h5 className="uppercase">Tv-serier</h5>	
			<div className="media-container">
				
				{tvshowData.map((tvshow, index) => (
				<div key={index} >
					<img className="movie-img" src={tvshow.Image}></img>
				</div>
				))}
				
			</div>

			<h5 className="uppercase">Populärt</h5>
			<div className="media-container">
				
				
				{tvshowData.map((tvshow, index) => (
				<div key={index} >
					<img className="movie-img" src={tvshow.Image}></img>
				</div>
				))}
			</div>	
			
		</div>
	)
}

export default Home