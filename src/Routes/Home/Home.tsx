
import "../Home/home.scss"

const Home = () => {
	return (
		<div className="container">
			
			<div className="card">
				<img></img>
				<h4>INCEPTION</h4>
				<div className="info-container">
					<p>Thriller</p><p>2H 57MIN</p> <p>13+</p><p>2012</p>
				</div>
				<div className="utils-container">
					<div><span>plus</span><span>bock</span></div>
					<div className="stars">stjärnor</div>
				</div>
				<p>Ut justo. Suspendisse potenti.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi</p>
				<div className="actorInfo-container"><p>SKÅDESPELARE</p><p>Leonordo Dicaprio, Olle Jönsson, Leonardo Dicaprio</p></div>
			</div>
		</div>
	)
}

export default Home