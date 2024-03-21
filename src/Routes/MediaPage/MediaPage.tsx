import { useState, useEffect } from "react"
import { FaHeart, FaPlus,  } from "react-icons/fa"
import { PiCheckFat, PiCheckFatFill } from "react-icons/pi"
import { useRecoilState } from "recoil"
import { watchedMediaState, myListState, savedToListState, clickedMediaState, actorsState } from "../../Utils/atoms"
import { landscapeImage, posterImage  } from "../../constants/imageconfig"
import './mediapage.scss'
import { postMediaMyList, postMediaWatchedList } from "../../APIFunctions/postMediaToList"
import {  useLocation } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa";
import {deleteMylistMedia} from "../../APIFunctions/deleteMedia"


const MediaPage = () => {
	const [ myList, setMyList ] = useRecoilState(myListState)
	const [ watchedMedia, setwatchedMedia ] = useRecoilState(watchedMediaState)
	const [savedToList, setSavedToList] = useRecoilState<boolean>(savedToListState)
	const [watched, setWatched ] = useState<boolean>(false)
	const [	windowSize , setWindowSize ] = useState(window.innerWidth)
	const [actors, setActors] = useRecoilState(actorsState)
	const [ selectedMedia, setSelectedMedia ] = useRecoilState(clickedMediaState)
	const [type, setType ] = useState(false)
	const location = useLocation()
	const [id, setId ] = useState(null)
	

	console.log('SELECTEDMEDIA:' , selectedMedia)

	useEffect(() => {
		const idfromPath = location.pathname.split("/")[1];
		console.log('ID', idfromPath)
		setId(idfromPath)

		function calculateWindowSize() {
			setWindowSize(window.innerWidth)
			console.log('windowsize:' , windowSize)
		}
		window.addEventListener('resize', calculateWindowSize)

		return () => {
			window.removeEventListener('resize' , calculateWindowSize)
		}
	}, [location])

	const ImageSize = windowSize > 1000 ? posterImage : landscapeImage;


	const handleMarkAsWatched = (media) => {
		const updatedMedia = { ...media};
		if(!updatedMedia.watched) {
			setWatched(true)
			updatedMedia.watched = true;
			setwatchedMedia((list) => list ? [...list, media] : [media])
			console.log('du markerade den som sedd')
			addToWatched(media)
			
		} else {
			updatedMedia.watched = false
			setWatched(false)
			console.log('du tog bort den som sedd')
		}
	}

	async function removeFromMyList(mediaId) {

		try {
			const mediaItem = await deleteMylistMedia(mediaId)
			console.log('Du tog bort denna:', mediaId )
		} catch (error) {
			console.error('Något gick fel, media inte borttagen')
		}
	}


	async function addToWatched(media) {
		try {
			const mediaItem = await postMediaWatchedList(media)
			console.log('mediaItem:',mediaItem)
		} catch (error) {
			console.error('failed to add media to watchedList', error.message)
		}
	}


	

	
	async function addToMyList(media) {
		try {
			const response = await postMediaMyList(media);
			console.log(response)
			
		} catch (error) {
			console.error('failed to add media to myList', error.message)
		}
	}

	const handleSaveToList = (media) => {
		const updatedMedia = { ...media};
		if(!savedToList) {
			updatedMedia.savedToList = true
			setSavedToList(true)
			//setMyList((oldList) => [...oldList, updatedMedia])

			console.log('Mylist:', myList)

			//addToMyList(updatedMedia)
		
		console.log('Du sparade din film till din lista', savedToList)
		} else {
			setSavedToList(false)
			updatedMedia.savedToList = false
			setMyList((oldList) => oldList.filter(item => item.id !== media.id ));
			console.log('Du tog bort film från lista', savedToList)
			removeFromMyList(media.id)

			
			
			

			
		}	
	}

	useEffect(() => {
		console.log('Updated myList:', myList);
		console.log('Updated watchedMedia:', watchedMedia);
		console.log('actors:', actors)
		console.log('savedToList?' , savedToList)

		if (selectedMedia?.seasons) {
			setType(true) 

		} else {
			setType(false)
		}
		console.log(type)
	}, [myList, watchedMedia, selectedMedia, actors]);

	
	const goBack = () => {
		window.history.go(-1)
	}
	
	

	return (
		<div className="card-container">
			<h5 onClick={goBack} className="fontgreen"><FaArrowLeft/> Tillbaka</h5>
			<div className="card">

					<img 
						className="card-img" 
						src={windowSize > 1000 ? ImageSize+selectedMedia?.poster_path  : ImageSize+selectedMedia?.backdrop_path }/>
					
					<h3 className='uppercase'>{selectedMedia?.title || selectedMedia?.name}</h3>
					<h4>{type ? selectedMedia?.seasons.length : selectedMedia?.tagline} </h4>{type ?<h5>Säsonger</h5> : null}
					<div className="info-container">
						{selectedMedia?.genres.map((genre) => (
							<h6 key={genre.id}>{genre.name}</h6>
						))}
						<h6>{selectedMedia?.runtime || selectedMedia?.episode_run_time} MIN</h6> <h6>{selectedMedia?.PremiereYear || selectedMedia?.first_air_date}</h6>
					</div>

					<div className="utils-container">
						<div className="utils-container-addto">
							<span className="fontgreen" onClick={() => handleSaveToList(selectedMedia)}>
								{ !savedToList ? <FaPlus/> : <FaHeart />}
							</span>

							<span className="fontgreen" onClick={() => handleMarkAsWatched(selectedMedia)}>
								{ !watched ? <PiCheckFat/> : <PiCheckFatFill/> } 
							</span>

						</div>
						
					</div> 

					<p>{selectedMedia?.overview}</p>
					<div className="actorInfo-container"><p className="fontyellow uppercase barlowCon ">Skådespelare</p>
					
					{Array.isArray(actors.cast) && actors.cast.map((actor) =>
						(<h6 className="fontgreen" key={actor.name}>{actor.name}</h6> ))}
					
					</div> 
			</div>
		</div>
	)
}

export default MediaPage