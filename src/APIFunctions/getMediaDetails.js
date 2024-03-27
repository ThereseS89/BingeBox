import { movieDbToken } from "../constants/constants";

export async function getMediaDetails(id, mediaType) {
	const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${movieDbToken}`
	}
  };
  
  try {
	const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}&language=en-SV`, options)
	if (!response.ok) {
		throw new Error('Failed to fetch trending movies')
	}

	const responseData = await response.json();
	console.log(responseData)
	if (!responseData) {
		throw new Error('Invalid response Data')
	}

	return responseData
  } catch (error) {
	console.error('Error fetching trending movies: ', error)
	return []
  }
  
}

export async function getMediaActors(id, mediaType) {
	const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${movieDbToken}`
	}
  };
  
  try {
	const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?language=en-US`, options)
	if (!response.ok) {
		throw new Error('Failed to fetch actors')
	}

	const responseData = await response.json();
	console.log(responseData)
	if (!responseData) {
		throw new Error('Invalid response Data')
	}

	return responseData
  } catch (error) {
	console.error('Error fetching trending movies: ', error)
	return []
  }
  
}