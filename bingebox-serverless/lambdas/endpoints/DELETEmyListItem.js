import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb"

const client = new DynamoDBClient({})
const dynamo = DynamoDBDocumentClient.from(client)

export const handler = async (event) => {
	console.log('event:', event);
	const params = new URLSearchParams(event.rawQueryString);
    const userId = params.get('userId');
	const mediaId = params.get('mediaId');

    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json",
    };

    try {
        // Hämta den befintliga listan från DynamoDB-tabellen
        const getListResponse = await dynamo.send(
            new GetCommand({
                TableName: 'MyListTable',
                Key: {
                    "userId": userId,
                }
            })
        );

        const existingList = getListResponse.Item ? getListResponse.Item.myList : [];

        // Hitta indexet för objektet som ska tas bort från myList
        const indexToRemove = existingList.findIndex(item => item.mediaId === mediaId);

        if (indexToRemove !== -1) {
            // Ta bort objektet från listan
            existingList.splice(indexToRemove, 1);

            // Uppdatera myList i tabellen med den uppdaterade listan
            await dynamo.send(
                new UpdateCommand({
                    TableName: 'MyListTable',
                    Key: {
                        "userId": userId,
                    },
                    UpdateExpression: "SET myList = :myList", 
                    ExpressionAttributeValues: {
                        ":myList": existingList,
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