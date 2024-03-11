import { FaSearch } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import { myListState, watchedMediaState } from '../../Utils/atoms';
import { searchFunction } from '../../Utils/regularUtils';
import { Media } from '../../types';
import { useState } from 'react';
import './mypage.scss';
const MyPage = () => {

	const myList = useRecoilValue(myListState)
	const watchedMedia = useRecoilValue(watchedMediaState)
	const [showSearch, setShowSearch ] = useState<boolean>(false)
	const [matchedMedia, setMatchedMedia ] = useState<Media[]>([])
	const handleClick = () => {
		if(!showSearch) {
			setShowSearch(true)
		} else {
			setShowSearch(false)
		}
	}

	const handleSearch = (event: { target: { value: string} }) => {
		const searchString = event.target.value.toLowerCase();
		const search = searchFunction(watchedMedia, searchString)
		setMatchedMedia(search)
	}
	
	return (
		<div className="mypage">
			<div className='user-container'><h2>T</h2></div>
			<div className="my-list">
				<h5 className="uppercase">Min lista</h5>
				<div className="media-container">
					{myList.map((media) => ( 
					<div  key={media.id}>
						<img className="movie-img" src={media.Image}  />
					</div>
					))}
				</div>
			</div>

			<div className='seen-media'>

				<div className='container'>
					<h5 className='uppercase'>Sedda Filmer</h5>
					<div>
						{!showSearch ? null : <input onChange={handleSearch}/>} <FaSearch className="search-icon" onClick={handleClick} />
					</div>
				</div>

				<div className='media-container'>
				{matchedMedia ? matchedMedia.map(media => (
					<div key={media.id} >
						<img src={media.Image} className="movie-img"  />
					</div>

					)) :

					watchedMedia.map(media  => ( 
					<div key={media.id}>
						<img src={media.Image} className="movie-img"  />
					</div>
					))}

				</div>
			</div>
			
		</div>
	)
}

export default MyPage