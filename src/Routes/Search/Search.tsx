import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { tvshowData, movieData } from "../../assets/data/testdata"
const mediaData = [...tvshowData, ...movieData]
import './search.scss'

const Search = () => {
	
	const [searching, setSearching] = useState(false);
	const [matchedMedia, setMatchedMedia ] = useState<{ Name: string; Genre: string; Duration: string; PremiereYear: number; ShortDescription: string; Actors: string[]; Image: string; }[]>([])
	const searchFunction = (event: { target: { value: string} }) => {
		const searchString: string = event.target.value.toLowerCase();
		const filteredMovies = mediaData.filter((media) => {
			return searchString === '' || media.Name.toLowerCase().includes(searchString) || media.Actors.map(str => str.toLowerCase()).includes(searchString)
		})

		setMatchedMedia(filteredMovies)
		setSearching(true)
	} 

	const handleBlur = () => {
		setSearching(false)
	}

	return (
		<div className="search-page">
			
			<div className="input-container">
				<h5 className="search-text">Sök</h5>
					<input 
						onBlur={handleBlur}
						onChange={searchFunction} 
						placeholder="Vad letar du efter?">
					</input><FaSearch className="search-icon" />
			</div>
			{searching ? <h5>Resultat:</h5> : <h5>Populära sökningar</h5> }
			<div className="search-result-container">
				
				{matchedMedia.map((media, index) => (
					<div key={index}>
						<img className="movie-img" src={media.Image} />
						<p>{media.Name}</p>
					</div>
				))}

			</div> 
		</div>
	)
}

export default Search