//import { FaSearch } from 'react-icons/fa';
//import { useRecoilValue } from 'recoil';
//import { myListState, watchedMediaState } from '../../Utils/atoms';
import { useEffect, useState } from 'react';
import { getMyList } from '../../APIFunctions/getLists';
//import { searchFunction } from '../../Utils/regularUtils';
import { Movie, myList} from '../../types';
//import { useState } from 'react';
import './mypage.scss';
import { posterImage } from '../../constants/imageconfig';
const MyPage = () => {

	const [myList, setMyList] = useState<myList[]>([]);
	//const watchedMedia = useRecoilValue(watchedMediaState)
	//const [showSearch, setShowSearch ] = useState<boolean>(false)
	//const [matchedMedia, setMatchedMedia ] = useState<Media[]>([])
	// const handleClick = () => {
	// 	if(!showSearch) {
	// 		setShowSearch(true)
	// 	} else {
	// 		setShowSearch(false)
	// 	}
	// }

	useEffect(() => {
		async function fetchData() {
			const apiData = await getMyList();
			console.log(apiData.myList)
			
			
				setMyList(apiData.myList[0].myList);
			
			
		}
		fetchData();
		
	}, []);

	useEffect(() => {
		console.log('myList:', myList);
	}, [myList]);
	
	



	
	return (
		<div className="mypage">
			<div className='user-container'><h2>T</h2></div>
			<div className="my-list">
				<h5 className="uppercase">Min lista</h5>
				<div className="media-container">
				
				{myList.map((listItem) => (
  
				<div key={listItem.items}>
				{listItem.items.map((media, mediaIndex) => (
					<div key={mediaIndex}>
						<img className="movie-img" src={posterImage + media.poster_path} />
						<p>{media.title}</p>
					</div>
				))}
				</div>
				))}
						
			
				
					
						
					
						
					
				</div>
			</div>

			<div className='seen-media'>

				<div className='container'>
					<h5 className='uppercase'>Sedda Filmer</h5>
					
				</div>

				<div className='media-container'>
				{/* {matchedMedia ? matchedMedia.map(media => (
					<div key={media.id} >
						<img src={media.Image} className="movie-img"  />
					</div>

					)) : */}

					{/* {watchedMedia.map(media  => ( 
					<div key={media.id}>
						<img src={media.Image} className="movie-img"  />
					</div>
					))} */}

				</div>
			</div>
			
		</div>
	)
}

export default MyPage