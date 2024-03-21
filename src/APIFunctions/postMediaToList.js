import { url } from "../constants/constants";

export async function postMediaWatchedList(media) {
	try {
		const token = localStorage.getItem('token')
		if (!token) {
			throw new Error('JWT token not found in local Storage.')
		}
		const response = await fetch(
			url + 'bingebox/watchedlists', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify({
					items: [media]
	
				}),
		});
		
		if (!response.ok){
			throw new Error('Failed to add media to watchedList');
		}
			const data = await response.json();
			console.log(data);
			return data 
		
	} catch(error) {
		console.error('Error posting data:', error.message);
	}
}



export async function postMediaMyList(media) {
	try {
		const token = localStorage.getItem('token')
		if (!token) {
			throw new Error('JWT token not found in local Storage.')
		}

		const response = await fetch(
		url + 'bingebox/mylists', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				items: [media]

			}),
			
		});
			console.log('DU la till denna:',media)
		if (!response.ok){
			throw new Error('Failed to add new media to myList');
		}
			const data = await response.json();
			console.log(data);
			return data 
		
	} catch(error) {
		console.error('Error posting data:', error.message);
		throw error;
	}
}