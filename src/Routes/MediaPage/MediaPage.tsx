import { FaStar } from "react-icons/fa"
import { useRecoilState } from "recoil"

const MediaPage = () => {
	const [ myList, setMyList ] = useRecoilState(myListState)
	const [ watchedMedia, setwatchedMedia ] = useRecoilState(watchedMediaState)

	return (

		<div className="card">
                <img></img>
                <h4>INCEPTION</h4>
                <div className="info-container">
                    <p>Thriller</p><p>2H 57MIN</p> <p>13+</p><p>2012</p>
                </div>
                <div className="utils-container">
                    <div><span>plus</span><span>bock</span></div>
                    <div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                </div>
                <p>{}</p>
                <div className="actorInfo-container"><p>SKÅDESPELARE</p><p>Leonordo Dicaprio, Olle Jönsson, Leonardo Dicaprio</p></div>
            </div>
	)
}

export default MediaPage