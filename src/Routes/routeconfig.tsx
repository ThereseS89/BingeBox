import { createBrowserRouter } from "react-router-dom";
import Root from "./Root"
import Home from "./Home/Home"
import Search from "./Search/Search"
import Login from "./Login/Login"
import MyPage from "./MyPage/MyPage"
import ErrorPage from "./ErrorPage/ErrorPage"
import MediaPage from "./MediaPage/MediaPage"
import AboutUs from "./AboutUs/AboutUs"
import Movies from "./Media/Movies";
import TvShows from "./Media/TvShows";



const router = createBrowserRouter([

	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/",
				element: <Home />
			},
			{
				path: "/movies",
				element: <Movies/>
			},
			{
				path: "/tvshows",
				element: <TvShows/>
			},
			{
				path: "/search",
				element: <Search />
			},
			{
				path: "/login",
				element: <Login />
			},
			{
				path: "/myPage",
				element: <MyPage />
			},
			{
				path: "/mediaPage/:id",
				element: <MediaPage adult={false} backdrop_path={""} belongs_to_collection={null} budget={0} genres={[]} homepage={""} id={""} imdb_id={""} media_type={""} original_language={""} original_title={""} overview={""} popularity={0} poster_path={""} production_companies={[]} production_countries={[]} release_date={""} revenue={0} runtime={0} spoken_languages={[]} status={""} tagline={""} title={""} video={false} vote_average={0} vote_count={0} seasons={""} PremiereYear={""} first_air_date={""} episode_run_time={""} mediaId={""} imageposter={""} name={""} original_name={""} genre_ids={[]} mediaType={""} profile_path={""} />
			},
			{
				path: "/aboutUs",
				element: <AboutUs />
			}
		],
		errorElement: <ErrorPage />
	}
])

export default router