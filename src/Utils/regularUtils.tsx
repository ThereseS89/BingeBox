
import { Movie } from "../types"

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

	



