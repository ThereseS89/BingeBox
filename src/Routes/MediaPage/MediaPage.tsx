import { useState, useEffect } from "react"
import { FaHeart, FaPlus,  } from "react-icons/fa"
import { PiCheckFat, PiCheckFatFill } from "react-icons/pi"
import { useRecoilState, useRecoilValue } from "recoil"
import { watchedMediaState, myListState, savedToListState, clickedMediaState, actorsState, isLoggedInState, savedToWatchedState } from "../../Utils/atoms"
import { landscapeImage, posterImage  } from "../../constants/imageconfig"
import './mediapage.scss'
import { postMediaMyList, postMediaWatchedList } from "../../APIFunctions/postMediaToList"
import {  useLocation } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa";
import {deleteMylistMedia , deleteWatchedMedia} from "../../APIFunctions/deleteMedia"


const MediaPage = () => {
	const isLoggedIn = useRecoilValue<boolean>(isLoggedInState) 
	const [myList, setMyList] = useRecoilState(myListState)
	const [ watchedMedia , setwatchedMedia ]  = useRecoilState(watchedMediaState)
	const [savedToList, setSavedToList] = useRecoilState(savedToListState)
	const [watched, setWatched ] = useRecoilState(savedToWatchedState)
	const [	windowSize , setWindowSize ] = useState(window.innerWidth)
	const [actors, setActors] = useRecoilState(actorsState)
	const selectedMedia = useRecoilValue(clickedMediaState)
	const [type, setType ] = useState(false)
	const location = useLocation()
	const [ showMessagelist, setshowMessagelist ] = useState(false) 
	const [ showMessage, setshowMessage ] = useState(false) 
	

	useEffect(() => {
		

		function calculateWindowSize() {
			setWindowSize(window.innerWidth)
		}
		window.addEventListener('resize', calculateWindowSize)

		return () => {
			window.removeEventListener('resize' , calculateWindowSize)
		}
		
	}, [location])

	const ImageSize = windowSize > 1000 ? posterImage : landscapeImage;


	const handleMarkAsWatched = (media) => {
		const isSavedw = watched[media.id];
		
		if(!isSavedw) {
			
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
	}

	async function removeFromMyList(mediaId) {

		try {
			await deleteMylistMedia(mediaId)
		} catch (error) {
			console.error('Något gick fel, media inte borttagen')
		}
	}

	async function removeFromWatchedList(mediaId) {

		try {
			await deleteWatchedMedia(mediaId)
		} catch (error) {
			console.error('Något gick fel, media inte borttagen')
		}
	}


	async function addToWatched(media) {
		try {
			await postMediaWatchedList(media)
		} catch (error) {
			console.error('failed to add media to watchedList', error.message)
		}
	}
	
	async function addToMyList(media) {
		try {
			await postMediaMyList(media);
			
		} catch (error) {
			console.error('failed to add media to myList', error.message)
		}
	}

	const handleSaveToList = (media) => {
		
		const isSaved = savedToList[media.id]
		if(!isSaved) {
			setSavedToList({ ...savedToList, [media.id]: true})
			addToMyList(media)
			setMyList(prevList => [...prevList, media])
			
			
			setshowMessagelist(true)
			setTimeout(() => {
				setshowMessagelist(false);
						}, 1500);
		
		} else {
			setSavedToList({ ...savedToList, [media.id]: false})
			setMyList((oldList) => oldList.filter(item => item.id !== media.id ));
			removeFromMyList(media.id)
		}	

		
	}

	useEffect(() => {
		if (selectedMedia?.seasons) {
			setType(true) 
		} else {
			setType(false)
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

						<h6>{selectedMedia?.runtime || selectedMedia?.episode_run_time} MIN</h6> 
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