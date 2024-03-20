import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
//import { getUserId } from './auth'
const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
import pkg from 'aws-sdk';
const { CognitoIdentityServiceProvider } = pkg;
const cognito = new CognitoIdentityServiceProvider({ region: 'eu-north-1' });

export const handler = async (event) => {
	const authorizationHeader = event.headers.authorization;
    const AccessToken = authorizationHeader ? authorizationHeader.split(' ')[1] : null;
	const user = await cognito.getUser({ AccessToken: AccessToken}).promise();
    const userId = user.Username

	console.log(userId)
	if (!userId) {
        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Missing userId query parameter" }),
        };
    }

	const command = {
		TableName: 'MyListTable',
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