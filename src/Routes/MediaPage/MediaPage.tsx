import { useState, useEffect } from "react"
import {  FaHeart, FaPlus,  } from "react-icons/fa"
import { PiCheckFat, PiCheckFatFill } from "react-icons/pi"
import { useRecoilState } from "recoil"
import { watchedMediaState, myListState } from "../../Utils/atoms"
import { landscapeImage, posterImage  } from "../../constants/imageconfig"
import './mediapage.scss'
import { useLocation } from "react-router-dom"
import { postMediaMyList } from "../../APIFunctions/postMediaToList"

const MediaPage = () => {
	const [ myList, setMyList ] = useRecoilState(myListState)
	const [ watchedMedia, setwatchedMedia ] = useRecoilState(watchedMediaState)
	const [savedToList, setSavedToList] = useState<boolean>(false)
	const [watched, setWatched ] = useState<boolean>(false)
	const [	windowSize , setWindowSize ] = useState(window.innerWidth)
	
	// Hämtar id från min navigate - från homepage vid click på en bild
	const location = useLocation()
	const selectedMedia = location.state ? location.state.media : null
	console.log('SELECTEDMEDIA:' , selectedMedia)
	
	useEffect(() => {
		function calculateWindowSize() {
			setWindowSize(window.innerWidth)
			console.log('windowsize:' , windowSize)
		}
		window.addEventListener('resize', calculateWindowSize)

		return () => {
			window.removeEventListener('resize' , calculateWindowSize)
		}
	}, [])

	const ImageSize = windowSize > 900 ? posterImage : landscapeImage;


	const handleMarkAsWatched = (media) => {
		if(!watched) {
			setWatched(true)
			setwatchedMedia((oldList) => [...oldList, media])
			console.log('du markerade den som sedd')
			
		} else {
			setWatched(false)
			console.log('du tog bort den som sedd')
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
		if(!savedToList) {
			setSavedToList(true)
			setMyList((oldList) => [...oldList, media])

			console.log('Mylist:', myList)

			addToMyList(media)
		
		console.log('Du sparade din film till din lista')
		} else {
			setSavedToList(false)
			console.log('Du tog bort film från lista')
		}	
	}

	useEffect(() => {
		console.log('Updated myList:', myList);
		console.log('Updated watchedMedia:', watchedMedia);
	}, [myList, watchedMedia]);
	

	return (
		<div className="card-container">

			<div className="card">
					<img 
						className="card-img" 
						src={windowSize > 900 ? ImageSize+selectedMedia?.poster_path : ImageSize+selectedMedia?.backdrop_path  }/>
					
					<h3 className='uppercase'>{selectedMedia?.title || selectedMedia?.name}</h3>
					<div className="info-container">
						<h6>{selectedMedia?.Genre}</h6><h6>{selectedMedia?.Duration}</h6> <h6>{selectedMedia?.PremiereYear}</h6>
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
						{/* <div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div> */}
					</div>
					<p>{selectedMedia?.overview}</p>
					<div className="actorInfo-container"><p className="fontyellow uppercase barlowCon ">Skådespelare</p><h6>{selectedMedia?.Actors}</h6>
					</div>
			</div>
		</div>
	)
}

export default MediaPage