//import { FaSearch } from 'react-icons/fa';
//import { useRecoilValue } from 'recoil';
import { myListState, watchedMediaState } from '../../Utils/atoms';
import { useEffect, } from 'react';
import { getMyList, getWatchedList } from '../../APIFunctions/getLists';
//import { searchFunction } from '../../Utils/regularUtils';
import { NavLink } from 'react-router-dom';
//import { useState } from 'react';
import './mypage.scss';
import { posterImage, landscapeImage } from '../../constants/imageconfig';
import { useRecoilState } from 'recoil';
const MyPage = () => {
	
	const [myList, setMyList] = useRecoilState(myListState);
	const [watchedMedia, setwatchedMedia] = useRecoilState(watchedMediaState)


	useEffect(() => {
		async function fetchData() {
			const apiData = await getMyList();
			const data = await getWatchedList()
			console.log('APIDAT:', apiData)
			console.log(apiData.myList[0].myList)
	
				setMyList(apiData.myList[0].myList);
				setwatchedMedia(data.watchedList[0].watchedList)
			console.log('data:', data)
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
				
				{myList && myList.map((media) => (
					<div className="poster-div" key={media.id}>
						<img className="movie-img" src={landscapeImage + media.imageposter} />
						<p className='fontwhite'>{media.title || media.name}</p>
					</div>
				))}
					
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
					</div> :
				<div className='media-container'>   
				{watchedMedia && watchedMedia.map(media => (
					<div className='poster-div' key={media.id} >
						<img src={posterImage + media.imageposter} className="movie-img" />
						<p className='fontwhite'>{media.title || media.name}</p>
					</div>))} 
				</div>
				}
				
			</div>
			
		</div>
	)
}

export default MyPage