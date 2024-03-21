import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { Movie } from "../../types"
import './search.scss'
import { posterImage, unavailable } from "../../constants/imageconfig"
import { getSearchResults } from "../../APIFunctions/search"
import { useRecoilState } from "recoil"
import { isClickedState, layoutState } from "../../Utils/atoms"
import { useNavigate } from "react-router-dom"
import LayoutSort from "../../Components/layoutSort"

const Search = () => {
	const [searching, setSearching] = useState(false);
	const [matchedMedia, setMatchedMedia ] = useState<Movie[]>([])
	const [isClicked, setIsClicked ] = useRecoilState(isClickedState)
	const [layout, setLayout ] = useRecoilState(layoutState)

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
			<LayoutSort/>
			
			<div className="input-container">
				<h5 className="search-text">Sök</h5>
					<input 
						onBlur={handleBlur}
						onChange={handleSearch} 
						placeholder="Vad letar du efter?">
					</input><FaSearch className="search-icon" />
			</div>
			{searching ? <h5>Resultat:</h5> : <h5>Populära sökningar</h5> }
			<div className="media-container">
				
				{matchedMedia.map((media) => (
					<div className={ layout ? 'poster-div' : 'poster-div-small'} key={media.id} onClick={() => handleMediaClick(media)}>	<h5>{media.title || media.name}</h5>
						<img className="movie-img" src={media.poster_path ? posterImage + media.poster_path : unavailable ||posterImage + media.profile_path} />
						
						<p>{media.media_type}</p>
					</div>
				))}

			</div> 
		</div>
	)
}

export default Search