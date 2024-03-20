export async function getSearchResults(searchString) {
const options = {
	method: 'GET',
	headers: {
	accept: 'application/json',
	Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWI2NWI4YWVmYWVmYmE3Nzk3MzIxMDk3MjYwNWRkOSIsInN1YiI6IjY1ZDlhMTFkNDJkODM3MDE3YjlhMjM3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UH2BRGQIiJzm5RjjkD2SrdvptU7WTTcJb0xWJcURppI'
	}
}

	try {
		const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${searchString}&include_adult=false&language=sv-EU&page=1`, options)

		if (!response.ok) {
			throw new Error('Failed to search media')
		}
	
		const responseData = await response.json();
		console.log('responsedata:' , responseData)
		if (!responseData.results || !Array.isArray(responseData.results)) {
			throw new Error('Invalid response Data')
		}
	
		return responseData.results
	} catch (error) {
		console.error('Error fetching searchResult ', error)
		return []
	}

}