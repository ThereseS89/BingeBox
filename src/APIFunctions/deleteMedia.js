const deleteMylistMedia = async (mediaId)  => {
	try {
		const response = await fetch(
			'',
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)

		if (response.ok) {
			console.log("media deleted successfully")
		} else {
			console.error("Failed to delete media")
		}
	} catch (error) {
		console.error("Error when deleting media:", error)
	}
}


const deleteWatchedMedia = async (mediaId) => {
	try {
		const response = await fetch(
			``,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
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

export default {deleteWatchedMedia, deleteMylistMedia }
