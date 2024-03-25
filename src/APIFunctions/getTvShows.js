

export async function getTvShows(page) {
	const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWI2NWI4YWVmYWVmYmE3Nzk3MzIxMDk3MjYwNWRkOSIsInN1YiI6IjY1ZDlhMTFkNDJkODM3MDE3YjlhMjM3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UH2BRGQIiJzm5RjjkD2SrdvptU7WTTcJb0xWJcURppI', 
	}
  };
  
  try {
	const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-SV&page=${page}sort_by=popularity.desc`, options)
	if (!response.ok) {
		throw new Error('Failed to fetch tvshows')
	}

	const responseData = await response.json();
	console.log(responseData)
	if (!responseData.results || !Array.isArray(responseData.results)) {
		throw new Error('Invalid response Data')
	}

	return responseData.results
  } catch (error) {
	console.error('Error tvshows: ', error)
	return []
  }
  
}