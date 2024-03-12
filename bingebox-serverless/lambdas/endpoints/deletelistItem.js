import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, GetCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb"

const client = new DynamoDBClient({})
const dynamo = DynamoDBDocumentClient.from(client)

export const handler = async (event) => {
    console.log('event:', event)
    const requestBody = JSON.parse(event.body);
    const userId = requestBody.userId; 
    const listType = requestBody.listType;

	let body;
	let statusCode = 200;

	const headers = {
		"Content-Type": "application/json",
	};

    try {
        const mediaId = requestBody.mediaId

		const getItemResponse = await dynamo.send(
			new GetCommand({
				TableName: 'userListTable',
				key: {
					"userId": userId,
					"listType": listType,
					"mediaId": mediaId
				}
			})
		)

		console.log('getItemresponse:' , getItemResponse)

		if (!getItemResponse.Item) {
			// Item not found
			statusCode = 404;
			body = JSON.stringify({ message: "Item not found" });
		} else {
			console.log("Item exists, proceeding with deletion");
	
        // Skicka upp det nya objektet till DynamoDB-tabellen
        await dynamo.send(
            new DeleteCommand({
                TableName: 'userListTable',
                Key: { 
					"userId": userId,
					"listType": listType,
					"mediaId": mediaId}
                },
			)
		)}
		
		body = `deleted mediaItem with id:" ${mediaId}`;

	} catch (error) {
		statusCode = 500;
		body = error.message;
		console.error("Error:", error);
	} finally {
		console.log("Response:", { statusCode, body, headers });
		body = JSON.stringify(body);
	}
	
	return {
		statusCode,
		body,
		headers,
	};
};