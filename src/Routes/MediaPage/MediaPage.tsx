import { useState, useEffect } from "react"
import {  FaHeart, FaPlus, FaStar } from "react-icons/fa"
import { PiCheckFat, PiCheckFatFill } from "react-icons/pi"
import { useRecoilState } from "recoil"
import { watchedMediaState, myListState } from "../../Utils/atoms"
import { movieData, tvshowData } from "../../assets/data/testdata";
// import { myListMovie } from "../../types"
//import { Movie } from "../../types"
import './mediapage.scss'
import { useLocation } from "react-router-dom"

const mediaData = [...movieData, ...tvshowData]

const MediaPage = () => {
	const [ myList, setMyList ] = useRecoilState(myListState)
	const [ watchedMedia, setwatchedMedia ] = useRecoilState(watchedMediaState)
	const [savedToList, setSavedToList] = useState<boolean>(false)
	const [watched, setWatched ] = useState<boolean>(false)
	
	// Hämtar id från min navigate - från homepage vid click på en bild
	const location = useLocation()
	const selectedMedia = location.state ? location.state.media : null
	console.log('SELECTEDMEDIA:' , selectedMedia)
	

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

	const handleSaveToList = (media) => {
		if(!savedToList) {
			setSavedToList(true)
			setMyList((oldList) => [...oldList, media])
			console.log('Mylist:', myList)
		
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
					<img className="card-img" src={selectedMedia?.Image}/>
					<h4>{selectedMedia?.Name}</h4>
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
						<div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
					</div>
					<p>{selectedMedia?.ShortDescription}</p>
					<div className="actorInfo-container"><p className="fontyellow uppercase barlowCon ">Skådespelare</p><h6>{selectedMedia?.Actors}</h6>
					</div>
			</div>
		</div>
	)
}

export default MediaPage