import { url } from "../constants/constants";
export const getMyList = async () => {
	try {
		const token = localStorage.getItem('token')
		if (!token) {
			throw new Error('JWT token not found in local Storage.')
		}
		const response = await fetch(
			url + 'bingebox/mylists', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
			}
		);

		if (!response.ok){
			throw new Error('Failed to fetch data');
		}
		const data = await response.json();
		console.log(data);
		return data 

	}catch(error) {
		console.error('Error fetching data:', error.message);
	}
	
	
}

const getWatchedList = async () => {
	try {
		const response = await fetch(
			""
		);

		if (!response.ok){
			throw new Error('Failed to fetch data');
		}
		const data = await response.json();
		console.log(data);
		return data 

	}catch(error) {
		console.error('Error fetching data:', error.message);
	}
}

export default { getMyList, getWatchedList }

