import { FaSearch } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { myListState, watchedMediaState } from '../../Utils/atoms';
import './mypage.scss';
const MyPage = () => {

	const [ myList, setMyList ] = useRecoilState(myListState)
	const [ watchedMedia, setwatchedMedia ] = useRecoilState(watchedMediaState)
	

	return (
		<div className="mypage">
			<div className='user-container'><h2>T</h2></div>
			<div className="my-list">
				<h5 className="uppercase">Min lista</h5>
				<div className="media-container">
					{myList.map(() => ( 
					<div  >
						<img className="movie-img"  />
					</div>
					))}
				</div>
			</div>

			<div className='seen-media'>
				<div className='container'><h5 className='uppercase'>Sedda Filmer</h5><FaSearch className="search-icon"/></div>
				<div className='media-container'>
					{watchedMedia.map(() => ( 
					<div >
						<img className="movie-img"  />
					</div>
					))}
				</div>
			</div>
			
		</div>
	)
}

export default MyPage