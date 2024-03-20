import { createBrowserRouter } from "react-router-dom";
import Root from "./Root"
import Home from "./Home/Home"
import Search from "./Search/Search"
import Login from "./Login/Login"
import MyPage from "./MyPage/MyPage"
import ErrorPage from "./ErrorPage/ErrorPage"
import MediaPage from "./MediaPage/MediaPage"
import AboutUs from "./AboutUs/AboutUs"
import Media from "./Media/Media";
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
				path: "/media",
				element: <Media/>,
				children: [
					{
						path: "/media/movies",
						element: <Movies/>
					},
					{
						path: "/media/tvshows",
						element: <TvShows/>
					}
				]
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
				element: <MediaPage />
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