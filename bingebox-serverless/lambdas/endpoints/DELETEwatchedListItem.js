import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb"

const client = new DynamoDBClient({})
const dynamo = DynamoDBDocumentClient.from(client)

import pkg from 'aws-sdk';
const { CognitoIdentityServiceProvider } = pkg;
const cognito = new CognitoIdentityServiceProvider({ region: 'eu-north-1' });

export const handler = async (event) => {
	const authorizationHeader = event.headers.authorization;
    const AccessToken = authorizationHeader ? authorizationHeader.split(' ')[1] : null;
	const user = await cognito.getUser({ AccessToken: AccessToken}).promise();
    const userId = user.Username
    const mediaId = JSON.parse(event.body).mediaId

    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, DELETE, PUT, POST, OPTIONS",
        "Access-Control-Allow-Header": "Content-Type,Authorization"
    };

    try {
        // Hämta den befintliga listan från DynamoDB-tabellen
        const getListResponse = await dynamo.send(
            new GetCommand({
                TableName: 'WatchedListTable',
                Key: {
                    "userId": userId,
                }
            })
        );

        const existingList = getListResponse.Item ? getListResponse.Item.watchedList : [];

        // Hitta indexet för objektet som ska tas bort från myList
        const indexToRemove = existingList.findIndex(item => item.mediaId === mediaId);

        if (indexToRemove !== -1) {
            // Ta bort objektet från listan
            existingList.splice(indexToRemove, 1);

            // Uppdatera myList i tabellen med den uppdaterade listan
            await dynamo.send(
                new UpdateCommand({
                    TableName: 'WatchedListTable',
                    Key: {
                        "userId": userId,
                    },
                    UpdateExpression: "SET watchedList = :watchedList", 
                    ExpressionAttributeValues: {
                        ":watchedList": existingList,
                    },
                    ReturnValues: "UPDATED_NEW"
                })
            );

        body = `Objektet med mediaId ${mediaId} togs bort från listan`;
		} else {
			statusCode = 404;
			body = 'Objektet med ${mediaId} Hittades inte i listan'
		}

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