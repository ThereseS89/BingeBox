import { myListState, watchedMediaState, savedToListState, savedToWatchedState } from '../../Utils/atoms';
import { useEffect, } from 'react';
import { getMyList, getWatchedList } from '../../APIFunctions/getLists';
import { NavLink } from 'react-router-dom';
import './mypage.scss';
import { posterImage, landscapeImage } from '../../constants/imageconfig';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useMediaClickHandler } from '../../Utils/regularUtils.js';

const MyPage = () => {
	
	const [myList, setMyList] = useRecoilState(myListState);
	const [watchedMedia, setwatchedMedia] = useRecoilState(watchedMediaState)
	const setSavedToList = useSetRecoilState<boolean>(savedToListState)
	const setWatched = useSetRecoilState<boolean>(savedToWatchedState)
	const handleMediaClick = useMediaClickHandler()


	useEffect(() => {
		async function fetchData() {
			const apiData = await getMyList();
			const data = await getWatchedList()
	
				setMyList(apiData.myList[0].myList);
				setwatchedMedia(data.watchedList[0].watchedList)
		}
		fetchData();
		
	}, []);
	
	return (
		<div className="mypage">
			<div className='user-container'><h2>T</h2></div>

			<div className="my-list">
				<h5 className="uppercase">Min lista</h5>
				<div className="media-container">
				
				{myList && myList.map((media) => {
					setSavedToList(myList.find(item => item.id === media.id) ? true : false);
					return (
					<div 
						className="poster-div" 
						key={media.id} 
						onClick={() => handleMediaClick(media, media.id, media.media_type)}>

						<img 
							className="movie-img" 
							src={landscapeImage + media.imageposter} />

						<p className='fontwhite'>{media.title || media.name}</p>
					</div>
				)})}
					
				</div>
			</div>

			<div className='seen-media'>

				<div className='container'>
					<h5 className='uppercase'>Sedda Filmer</h5>	
				</div>

				{!watchedMedia ? 
					<div> 
						<p className='fontwhite barlowCon'>Dags att se lite film! Kolla in populära filmer och Tv-serier <NavLink className='fontgreen' to="/">Här</NavLink>
						</p>
					</div> 
					:
				<div className='media-container'>   
				{watchedMedia && watchedMedia.map(media => {
					setWatched(watchedMedia.find(item => item.id === media.id) ? true : false);
					return (
					<div 
						className='poster-div' 
						key={media.id} 
						onClick={() => handleMediaClick(media, media.id, media.media_type)}>

						<img 
							src={posterImage + media.imageposter}	className="movie-img" />

						<p className='fontwhite'>{media.title || media.name}</p>

					</div>)})} 
				</div>
				}
				
			</div>
			
		</div>
	)
}

export default MyPage