
import { useState, useEffect } from "react";
import { getTvShows } from "../../APIFunctions/getTvShows";
import { Movie } from "../../types";
import { posterImage, unavailable } from "../../constants/imageconfig";
import { isClickedState, clickedMediaState, layoutState } from "../../Utils/atoms";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { getMediaDetails } from "../../APIFunctions/getMediaDetails";
import LayoutSort from "../../Components/layoutSort";


const TvShows = () => {
	const [tvShows, setTvshows ] = useState<Movie[]>([])
	const [ isClicked, setIsClicked ] = useRecoilState(isClickedState)
	const [ selectedMedia, setSelectedMedia ] = useRecoilState(clickedMediaState)
	const [layout, setLayout ] = useRecoilState(layoutState)

	useEffect(() => {
		
		async function fetchData() {
		const tvShowList = await getTvShows();
		const tvShowType = tvShowList.map(show => ({
			...show,
			media_type: 'tv'
		}))

			setTvshows(tvShowType)
			console.log('tvshows:', tvShows)
		}
		fetchData()
	}, []);

	const navigate = useNavigate()
	const handleMediaClick = async (media, id, mediaType) => {
		console.log('Media typ:' ,mediaType, id)
		const mediaDetails = await getMediaDetails(id, mediaType)	
		setSelectedMedia(mediaDetails)
		if (!isClicked) {
			setIsClicked(true)
			navigate(`/mediaPage/${media.id}`, { state: { media: media } });
			console.log('tvshow', media)

		} else {
			setIsClicked(false)
		}

	}

	return (
		<>
			<LayoutSort />
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
								<p>{tv.first_air_date} </p>
							</div>

				</div>))}
			</div>
		</>
	)
}

export default TvShows