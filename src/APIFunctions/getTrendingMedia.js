import { movieDbToken } from "../constants/constants";
export async function getTrendingMedia(page) {
	const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${movieDbToken}`
	}
  };
  
  try {
	const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=sv-EU&page=${page}`, options)
	if (!response.ok) {
		throw new Error('Failed to fetch trending movies')
	}

	const responseData = await response.json();
	if (!responseData.results || !Array.isArray(responseData.results)) {
		throw new Error('Invalid response Data')
	}

	return responseData.results
  } catch (error) {
	console.error('Error fetching trending movies: ', error)
	return []
  }
  
}
