import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb"
import { nanoid } from "nanoid"
//import responses from "../common/API_Responses"

const client = new DynamoDBClient({})
const dynamo = DynamoDBDocumentClient.from(client)

export const handler = async (event) => {
    console.log('event:', event)
    const requestBody = JSON.parse(event.body);
    const params = new URLSearchParams(event.rawQueryString);
    const userId = params.get('userId');
    
    try {
        if (!userId) {
            throw new Error("Missing userId in request body.");
        }

        if (!requestBody.items) {
            throw new Error("Invalid request body. 'items' array is missing or invalid.");
        }

        const mediaId = nanoid()
        // Skapa det nya objektet med det genererade id:t och de andra attributen
        const newItem = {
            mediaId: mediaId,
            Name: requestBody.items[0].Name || '',
            Genre: requestBody.items[0].Genre || '',
            Duration: requestBody.items[0].Duration || '',
            PremiereYear: requestBody.items[0].PremiereYear || '',
            ShortDescription: requestBody.items[0].ShortDescription || '',
            Actors: requestBody.items[0].Actors || [''],
            Image: requestBody.items[0].Image || '',
        };

        const getListResponse = await dynamo.send(
            new GetCommand({
                TableName: 'WatchedListTable',
                Key: {
                    'userId': userId,
                }
            })
        )

        const existingList = getListResponse.Item ? getListResponse.Item.myList : [];

        const updatedList = existingList ? existingList : [];

        updatedList.push(newItem);

        // Skicka upp det nya objektet till DynamoDB-tabellen
        const updateList = await dynamo.send(
            new UpdateCommand({
                TableName: 'WatchedListTable',
                Key: {
                    'userId': userId,
                },
                UpdateExpression: "SET myList = :myList",
                ExpressionAttributeValues: {
                    ":myList": existingList
                },
                ReturnValues: "UPDATED_NEW"
            })
        );

    return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "successfull", items: updateList }),
        };
    } catch (err) {
        return {
            statusCode: err.statusCode,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: err.message }),
        }
    }
       
    
}