import { url } from "../constants/constants"

export const deleteMylistMedia = async (mediaId: string)  => {
	try {
		const token = localStorage.getItem('token')
		if (!token) {
			throw new Error('JWT token not found in local Storage.')
		}
		const response = await fetch(
			url + 'bingebox/mylists',
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					'Authorization': `Bearer ${token}`,
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET, DELETE, PUT, POST, OPTIONS",
				},
				body: JSON.stringify({mediaId: mediaId})
			}
		)
		console.log('mediaId:' , response)

		if (response.ok) {
			console.log("media deleted successfully")
		} else {
			console.error("Failed to delete media")
		}
	} catch (error) {
		console.error("Error when deleting media:", error)
	}
}


export const deleteWatchedMedia = async (mediaId: string) => {
	try {
		const token = localStorage.getItem('token')
		if (!token) {
			throw new Error('JWT token not found in local Storage.')
		}
		const response = await fetch(
			url + 'bingebox/watchedlists',
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					'Authorization': `Bearer ${token}`,
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET, DELETE, PUT, POST, OPTIONS",
				},
				body: JSON.stringify({mediaId: mediaId})
			}
		)

		if (response.ok) {
			console.log("Media deleted successfully")
		} else {
			console.error("Failed to delete media")
		}
	} catch (error) {
		console.error("Error when deleting media:", error)
	}
}

