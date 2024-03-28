
import { getTrendingMedia } from '../../APIFunctions/getTrendingMedia'
import { useEffect, useState } from "react";
import { posterImage, unavailable } from "../../constants/imageconfig";
import { useRecoilState, useRecoilValue } from "recoil";
import { movieDataState, layoutState } from "../../Utils/atoms";
import "../Home/home.scss"
import { useMediaClickHandler } from '../../Utils/regularUtils.js';
import LayoutSort from '../../Components/layoutSort';

import InfiniteScroll from 'react-infinite-scroll-component';


const Home = () => {
	const handleMediaClick = useMediaClickHandler()
	const [ trendingMediaDataState, setTrendingMediaDataState] = useRecoilState(movieDataState)
	const layout = useRecoilValue(layoutState)
	const [page, setPage ] = useState(1)

	console.log('before fetch')
	useEffect(() => {
		
		async function fetchData() {
		const trendingMediaData = await getTrendingMedia(page);

			setTrendingMediaDataState(trendingMediaData)
		}
		fetchData()
	},[]);
	console.log('after fetch')

	const fetchNextPage = async () => {
		const nextPage = page + 1
		setPage(nextPage)
		const nextPages = await getTrendingMedia(nextPage);
		setTrendingMediaDataState(nextPages)
			
	}

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
			
			<InfiniteScroll
				dataLength={trendingMediaDataState.length} 
				next={fetchNextPage}
				hasMore={true}
				loader={<h4 style={{color: 'white'}}>Loading...</h4>}
				endMessage={
				<p style={{ textAlign: 'center', color: 'white' }}>
				<b>Yay! You have seen it all</b>
				</p>
			} >
			</InfiniteScroll>
			</div>
			
			
		</div>
	)
}

export default Home