
import { useState, useEffect } from "react";
import { getTvShows } from "../../APIFunctions/getTvShows";
import { Movie } from "../../types";
import { posterImage, unavailable } from "../../constants/imageconfig";
import { layoutState } from "../../Utils/atoms";
import { useRecoilValue } from "recoil";
import LayoutSort from "../../Components/layoutSort";
import '../Media/media.scss'
import { useMediaClickHandler } from "../../Utils/regularUtils";
import InfiniteScroll from 'react-infinite-scroll-component'

const TvShows = () => {
	const [tvShows, setTvshows ] = useState<Movie[]>([])
	const layout = useRecoilValue(layoutState)
	const handleMediaClick = useMediaClickHandler()
	const [page, setPage ] = useState(1)


	async function fetchData() {
		const tvShowList = await getTvShows(page);

		// Lägger till en media_type
		const tvShowType = tvShowList.map((show: object) => ({
			...show,
			media_type: 'tv'

		})) 

			setTvshows(tvShowType)
		}


	useEffect(() => {
		fetchData()
	}, []);



	const fetchNextPage = async () => {
		const nextPage = page + 1
		setPage(nextPage)
	
			const tvShowList = await getTvShows(nextPage);
			const tvShowType = tvShowList.map((show: object) => ({
					...show,
					media_type: 'tv'
				}))

			setTvshows(tvShowType)

	}


	return (
		<div className="media">
			<h3 className="uppercase barlowCon">TV-Serier</h3>
		<div><LayoutSort /></div>
		<InfiniteScroll
				dataLength={tvShows.length} 
				next={fetchNextPage}
				hasMore={true}
				loader={<h4>Loading...</h4>}
				endMessage={
				<p style={{ textAlign: 'center', color: 'white' }}>
				<b>Yay! You have seen it all</b>
				</p>
			} >
			<div className="media-container">
				
			{tvShows !== null && tvShows.map((tv) => ( 
				
				<div 
					className={layout ? 'poster-div' : 'poster-div-small'}
					key={tv.id}
					onClick={() => handleMediaClick(tv, tv.id, tv.media_type)}>
					<h5 className="fontwhite">{tv.name}</h5>

							<img 
							className="movie-img" 
							src={tv.poster_path ? posterImage + tv.poster_path : unavailable} 
							alt={tv.title} /> 
							
							<div className='fontyellow media-card-text'>
								<p className='uppercase'>{tv.media_type}</p>
								<p>{tv.first_air_date.substring(0,4)} </p>
							</div>

				</div>))}
				</div>
			</InfiniteScroll>
			
		</div>
	)
}

export default TvShows