import { movieDbToken } from "../constants/constants";
export async function getMovies(page: number) {
	const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${movieDbToken}`
	}
  };
  
  try {
	const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-SV&page=${page}sort_by=popularity.desc`, options)
	if (!response.ok) {
		throw new Error('Failed to fetch movies')
	}

	const responseData = await response.json();
	console.log(responseData)
	if (!responseData.results || !Array.isArray(responseData.results)) {
		throw new Error('Invalid response Data')
	}

	return responseData.results
  } catch (error) {
	console.error('Error fetching trending movies: ', error)
	return []
  }
  
}

export async function getTopRatedMovies() {
	const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${movieDbToken}`
	}
  };
  
  try {
	const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US', options)
	if (!response.ok) {
		throw new Error('Failed to fetch toprated movies')
	}

	const responseData = await response.json();
	console.log(responseData)
	if (!responseData.results || !Array.isArray(responseData.results)) {
		throw new Error('Invalid response Data')
	}

	return responseData.results
  } catch (error) {
	console.error('Error fetching trending movies: ', error)
	return []
  }
  
}