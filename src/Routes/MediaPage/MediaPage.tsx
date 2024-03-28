import { useState, useEffect } from "react"
import { FaHeart, FaPlus,  } from "react-icons/fa"
import { PiCheckFat, PiCheckFatFill } from "react-icons/pi"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { watchedMediaState, myListState, savedToListState, clickedMediaState, actorsState, isLoggedInState, savedToWatchedState } from "../../Utils/atoms"
import { landscapeImage, posterImage  } from "../../constants/imageconfig"
import './mediapage.scss'
import {  useLocation } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa";
import { addToWatched, addToMyList, removeFromMyList, removeFromWatchedList } from "../../Utils/regularUtils"
import { SelectedMedia } from "../../types"


const MediaPage = (media: SelectedMedia) => {
	const isLoggedIn = useRecoilValue<boolean>(isLoggedInState) 
	const setMyList = useSetRecoilState(myListState)
	const setwatchedMedia = useSetRecoilState(watchedMediaState)
	const [savedToList, setSavedToList] = useRecoilState(savedToListState)
	const [watched, setWatched ] = useRecoilState(savedToWatchedState)
	const [	windowSize , setWindowSize ] = useState(window.innerWidth)
	const actors = useRecoilValue(actorsState)
	const [selectedMedia, setSelectedMedia] = useRecoilState(clickedMediaState)
	const [type, setType ] = useState(false)
	const location = useLocation()
	const [ showMessagelist, setshowMessagelist ] = useState(false) 
	const [ showMessage, setshowMessage ] = useState(false) 
	const [isWatched, setIsWatched ] = useState(false)
	

	useEffect(() => {
		console.log('selectedMedia', selectedMedia)
		setIsWatched(watched[media.id] || false)
		function calculateWindowSize() {
			setWindowSize(window.innerWidth)
		}
		window.addEventListener('resize', calculateWindowSize)

		return () => {
			window.removeEventListener('resize' , calculateWindowSize)
		}
		
	}, [location, media.id])

	const ImageSize = windowSize > 1000 ? posterImage : landscapeImage;
	

	const handleMarkAsWatched = (media: SelectedMedia) => {
		
		
		if(!isWatched) {
			
			setWatched({ ...watched, [media.id]: true });
			addToWatched(media)
			setwatchedMedia(list => [...list, media])
			setshowMessage(true)
			setTimeout(() => {
				setshowMessage(false);
						}, 1500);
			
		} else {
			setWatched({ ...watched, [media.id]: false });
			removeFromWatchedList(media.id)
			setwatchedMedia((oldList) => oldList.filter(item => item.id !== media.id ));
		}
		setIsWatched(!isWatched)
	}

	const handleSaveToList = (media: SelectedMedia) => {
		
		const isSaved = savedToList[selectedMedia.id]
		console.log('isSaved?' , isSaved)
		if(!isSaved) {
			setSavedToList({ ...savedToList, [selectedMedia.id]: true})
			addToMyList(media)
			setMyList(prevList => [...prevList, media])
			
			
			setshowMessagelist(true)
			setTimeout(() => {
				setshowMessagelist(false);
						}, 1500);
		
		} else {
			setSavedToList({ ...savedToList, [selectedMedia.id]: false})
			setMyList((oldList) => oldList.filter(item => item.id !== media.id ));
			removeFromMyList(media.id)
		}	

		
	}

	useEffect(() => {
		if (selectedMedia) {
			const updateMedia = {
				...selectedMedia,
				media_type: selectedMedia.seasons ? 'tv' : 'movie'
			};
			setSelectedMedia(updateMedia)
			setType(selectedMedia.seasons ? true : false) 
		}
		
	}, []);

	
	const goBack = () => {
		window.history.go(-1)
	}
	

	return (
		<div className="card-container">

			<div onClick={goBack} className="flex fontgreen uppercase cursor back">
				<FaArrowLeft className="arrow"/> <p> Tillbaka</p>
			</div>
			
			<div className="card">

					<img 
						className="card-img" 
						src={windowSize > 1000 ? ImageSize+selectedMedia?.poster_path  : ImageSize+selectedMedia?.backdrop_path }/>
					
					<h3 className='uppercase'>{selectedMedia?.title || selectedMedia?.name}</h3>

					<div className="flex">
						<h5>{type ? selectedMedia?.seasons.length : selectedMedia?.tagline} </h5>{type ?<h5>Säsonger</h5> : null}
					</div>
					<div className="info-container">
						
						<div className="genre-container">
						{selectedMedia?.genres.map((genre) => (
							<h6 key={genre.id}>{genre.name}</h6>
						))}
						</div>

						<h6>{selectedMedia?.runtime || selectedMedia?.episode_run_time} MIN</h6> <h6>{selectedMedia?.media_type}</h6>
						<h6>{selectedMedia?.PremiereYear || selectedMedia?.first_air_date || selectedMedia?.release_date}</h6>
					</div>

					<div className={!isLoggedIn ? 'hidden' : 'utils-container'}>
						<div className="utils-container-addto">

							<span className="fontgreen" onClick={() => handleSaveToList(selectedMedia)}>
								{ savedToList[selectedMedia.id] ? <FaHeart /> : <FaPlus/>}
							</span>
							<p className={ showMessagelist ? '' : 'hidden'}>Sparad till din lista!</p>

							<span className="fontgreen" onClick={() => handleMarkAsWatched(selectedMedia)}>
								{ watched[selectedMedia.id] ? <PiCheckFatFill/> : <PiCheckFat/>} 
							</span>
							
							<p className={ showMessage ? '' : 'hidden'}>Du har markerat den som sedd!</p>

						</div>
						
					</div> 

					<p>{selectedMedia?.overview}</p>

					<div className="actorInfo-container ">
						<p className="fontyellow uppercase barlowCon ">Skådespelare</p>
						<div className="flex">
						{Array.isArray(actors) && actors.map((actor) =>
							(<h6 className="fontgreen" key={actor.name}>{actor.name}</h6> ))}
						</div>
					
					</div> 
			</div>
		</div>
	)
}

export default MediaPage