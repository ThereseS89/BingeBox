import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
//import { getUserId } from './auth'
const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
	const params = new URLSearchParams(event.rawQueryString);
    const userId = params.get('userId');
	console.log(userId)
	if (!userId) {
        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Missing userId query parameter" }),
        };
    }

	const command = {
		TableName: 'WatchedListTable',
		KeyConditionExpression: 'userId = :userId',
		ExpressionAttributeValues: {
			':userId': userId,
		},
	};

try {
	const {Items} = await dynamo.send(
		new QueryCommand(command)
	)
	return {
		statusCode: 200,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ message: "successfull", myList: Items }),
	};
} catch (err) {
	return {
		statusCode: err.statusCode,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ message: err.message }),
	}
}
}