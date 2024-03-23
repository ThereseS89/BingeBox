
import { Movie } from "../types"
import { useRecoilState, useSetRecoilState } from "recoil"
import { getMediaDetails, getMediaActors } from "../APIFunctions/getMediaDetails"
import { useNavigate } from "react-router-dom"
import { actorsState, clickedMediaState, isClickedState } from "./atoms"

export function useMediaClickHandler() { 
		const navigate = useNavigate()
		const [ isClicked, setIsClicked ] = useRecoilState(isClickedState)
		const setSelectedMedia = useSetRecoilState(clickedMediaState)
		const setActors = useSetRecoilState(actorsState)
	
	
	const handleMediaClick = async (media, id, mediaType) => {

		const mediaDetails = await getMediaDetails(id, mediaType)	
		setSelectedMedia(mediaDetails)

		const actorDetails = await getMediaActors(id, mediaType )

		const actorLength = actorDetails.cast.slice(1,5);
		setActors(actorLength)
	
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


	



