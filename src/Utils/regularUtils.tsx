/* eslint-disable @typescript-eslint/no-explicit-any */

import { Movie, SelectedMedia } from "../types"
import { useRecoilState, useSetRecoilState } from "recoil"
import { getMediaDetails, getMediaActors } from "../APIFunctions/getMediaDetails"
import { useNavigate } from "react-router-dom"
import { actorsState, clickedMediaState, isClickedState } from "./atoms"
import { postMediaMyList, postMediaWatchedList } from "../APIFunctions/postMediaToList"
import { deleteWatchedMedia, deleteMylistMedia } from "../APIFunctions/deleteMedia"

export function useMediaClickHandler() { 
		const navigate = useNavigate()
		const [ isClicked, setIsClicked ] = useRecoilState(isClickedState)
		const setSelectedMedia = useSetRecoilState(clickedMediaState)
		const setActors = useSetRecoilState(actorsState)
	
	
	const handleMediaClick = async (media: any, id: string, mediaType: string) => {
		console.log('Nu körs handlemediaklick')

		const mediaDetails = await getMediaDetails(id, mediaType)	
		setSelectedMedia(mediaDetails)

		const actorDetails = await getMediaActors(id, mediaType )
		const actorLength = actorDetails.cast.slice(0,5).map((actor: any) => ({ ...actor }));

		console.log('Detta skickas in:', id, mediaType )

		setActors(actorLength);
		console.log('Actors',actorLength)
		
	
			if (!isClicked) {
				setIsClicked(true)
				navigate(`/mediaPage/${media.id}`);
				console.log('tvshow', media)

			} else {
				setIsClicked(false)
			}
	}
	

	return  handleMediaClick 
	
	
}


// sökfunktion
export const searchFunction = (data: Movie[], searchString: string ) => {
	
	const filteredMovies = data.filter((media) => {
		return searchString === '' || media.title.toLowerCase().includes(searchString) || /* media.Actors.map(str => str.toLowerCase()).includes(searchString) ||*/ media.original_title.toLowerCase().includes(searchString) || media.name.toLowerCase().includes(searchString) || media.original_name.toLowerCase().includes(searchString)
	})
	return filteredMovies
} 

// validering
export function isValidEmail(email: string): boolean  {
    const emailPattern =  /^[\w.-]+@\w+[\w.-]+.\w+[\w.-]*$/; 
    return emailPattern.test(email)
}

export async function removeFromMyList(mediaId: string) {

	try {
		await deleteMylistMedia(mediaId)
	} catch (error) {
		console.error('Något gick fel, media inte borttagen')
	}
}

export async function removeFromWatchedList(mediaId: string) {

	try {
		await deleteWatchedMedia(mediaId)
	} catch (error) {
		console.error('Något gick fel, media inte borttagen')
	}
}


export async function addToWatched(media: SelectedMedia) {
	try {
		await postMediaWatchedList(media)
	} catch (error) {
		console.error('failed to add media to watchedList')
	}
}

export async function addToMyList(media: SelectedMedia) {
	try {
		await postMediaMyList(media);
		
	} catch (error) {
		console.error('failed to add media to myList')
	}
}





	



