import { url } from "../constants/constants";
export async function handleLoginAuth(email, password) {

	const response = await fetch(url + 'bingebox/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},

		body: JSON.stringify({ email, password }),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message);
	}

	return response.json()
}

