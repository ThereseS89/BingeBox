//import responses from '../common/API_Responses'
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
	
    const params = new URLSearchParams(event.rawQueryString);
    const userId = params.get('userId');
    const listType = params.get('listType');

try {
	const {Items} = await dynamo.send(
		new QueryCommand({
			TableName: 'userListTable',
			KeyConditionExpression: 'userId = :userId AND listType = :listType',
			ExpressionAttributeValues: {
				':userId': userId,
				':listType': listType
			}
		})
	)
	return {
		statusCode: 200,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ message: "successfull", items: Items }),
	};
} catch (err) {
	return {
		statusCode: err.statusCode,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ message: err.message }),
	}
}
}
