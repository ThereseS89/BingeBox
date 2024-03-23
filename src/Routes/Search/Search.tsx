import {  useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { Movie } from "../../types"
import './search.scss'
import { posterImage, unavailable } from "../../constants/imageconfig"
import { getSearchResults } from "../../APIFunctions/search"
import {  useRecoilValue } from "recoil"
import {  layoutState  } from "../../Utils/atoms"
import { useMediaClickHandler } from "../../Utils/regularUtils"
import LayoutSort from "../../Components/layoutSort"
import { getTopRatedMovies } from "../../APIFunctions/getMovies"

const Search = () => {
	const [searching, setSearching] = useState(false);
	const [showResult, setShowResult ] = useState(false);
	const [matchedMedia, setMatchedMedia ] = useState<Movie[]>([])
	const layout = useRecoilValue(layoutState)
	const [ topRated, setTopRated ] = useState<Movie[]>([])
	const handleMediaClick = useMediaClickHandler()
	const [showTopRated, setShowTopRated ] = useState(false)

	useEffect(() => {
		async function fetchData() {
			const topratedMovies = await getTopRatedMovies()
		
			const movieType = topratedMovies.map(type => ({
				...type,
				media_type: 'movie'
			}))
	
				setTopRated(movieType)
		}
			fetchData()
		
	}, [setTopRated])
	


	const handleSearch = async (event: { target: { value: string} }) => {
		const searchString = event.target.value.toLowerCase();

			if (searchString === '') {
				setMatchedMedia([])
				setSearching(false)
				setShowResult(false)
				return;
			} 
				
			try {
				setShowResult(true)
				setSearching(true)
				const searchResults = await getSearchResults(searchString);
				setMatchedMedia(searchResults)
				setSearching(false)

			} catch (error) {
				console.error('Fel vid sökning:' , error)
				setMatchedMedia([])
				setSearching(false)

			} 
		}
		
	const handleBlur = () => {
		setSearching(false)
	}

	function handlebuttonClick() {
		if (!showTopRated) {
			setShowTopRated(true)

		} else {
			setShowTopRated(false)
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

			<h5>Utforska</h5> <LayoutSort/>
			<button onClick={handlebuttonClick}>Top Rated</button>

			<div className={showTopRated ? "media-container" : 'hidden'}>
			
			{topRated && topRated.map((media) =>

				<div 
					className={ layout ? 'poster-div' : 'poster-div-small'} 
					key={media.id} 
					onClick={() => handleMediaClick(media, media.id, media.media_type)}>	
					<h5>{media.title || media.name}</h5>
					<img 
						className="movie-img" 
						src={media.poster_path ? posterImage + media.poster_path : unavailable || posterImage + media.profile_path} />
						<p>{media.media_type}</p>
				</div>
			)}
			</div>		
			
			<div className={showResult ? "media-container" : 'hidden'}>

				{matchedMedia.map((media) => (
					<div 
						className={ layout ? 'poster-div' : 'poster-div-small'} 
						key={media.id} 
						onClick={() => handleMediaClick(media, media.id, media.media_type)}>	
						<h5>{media.title || media.name}</h5>
						<img 
							className="movie-img" 
							src={media.poster_path ? posterImage + media.poster_path : unavailable ||posterImage + media.profile_path} />
						
						<p>{media.media_type}</p>
					</div>
				))}
			
			</div> 
		</div>
	)
}

export default Search