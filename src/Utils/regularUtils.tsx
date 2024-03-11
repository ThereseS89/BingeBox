
import { Media } from "../types"

export const searchFunction = (data: Media[], searchString: string ) => {
	
	const filteredMovies = data.filter((media) => {
		return searchString === '' || media.Name.toLowerCase().includes(searchString) || media.Actors.map(str => str.toLowerCase()).includes(searchString)
	})
	return filteredMovies

	
} 

