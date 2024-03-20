import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { Movie } from "../../types"
import './search.scss'
import { posterImage } from "../../constants/imageconfig"
import { getSearchResults } from "../../APIFunctions/search"
import { useRecoilState } from "recoil"
import { isClickedState } from "../../Utils/atoms"
import { useNavigate } from "react-router-dom"

const Search = () => {
	const [searching, setSearching] = useState(false);
	const [matchedMedia, setMatchedMedia ] = useState<Movie[]>([])
	const [isClicked, setIsClicked ] = useRecoilState(isClickedState)

	const handleSearch = async (event: { target: { value: string} }) => {
		const searchString = event.target.value.toLowerCase();

			if (searchString === '') {
				setMatchedMedia([])
				setSearching(false)
				return;
			}

			try {
				setSearching(true)
				const searchResults = await getSearchResults(searchString);
				setMatchedMedia(searchResults)
				setSearching(false)
			} catch (error) {
				console.error('Fel vid sökning:' , error)
				console.log(matchedMedia)
				setMatchedMedia([])
				setSearching(false)

			}
		}
		
		

	const handleBlur = () => {
		setSearching(false)
	}

	const navigate = useNavigate()
	const handleMediaClick = (media) => {
			
		if (!isClicked) {
			setIsClicked(true)
			navigate(`/mediaPage/${media.id}`, { state: { media: media } });
			console.log('movie', media)

		} else {
			setIsClicked(false)
		}
	}

	return (
		<div className="search-page">
			
			<div className="input-container">
				<h5 className="search-text">Sök</h5>
					<input 
						onBlur={handleBlur}
						onChange={handleSearch} 
						placeholder="Vad letar du efter?">
					</input><FaSearch className="search-icon" />
			</div>
			{searching ? <h5>Resultat:</h5> : <h5>Populära sökningar</h5> }
			<div className="search-result-container">
				
				{matchedMedia.map((media) => (
					<div key={media.id} onClick={() => handleMediaClick(media)}>
						<img className="movie-img" src={posterImage+media.poster_path} />
						<p>{media.title || media.name}</p>
						<p>{media.media_type}</p>
					</div>
				))}

			</div> 
		</div>
	)
}

export default Search