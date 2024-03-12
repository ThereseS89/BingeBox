import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb"
import { nanoid } from "nanoid"
//import responses from "../common/API_Responses"

const client = new DynamoDBClient({})
const dynamo = DynamoDBDocumentClient.from(client)

export const handler = async (event) => {
    console.log('event:', event)
    const requestBody = JSON.parse(event.body);
    const userId = requestBody.userId; 
    const listType = requestBody.listType;

    try {
        
        if (!userId || !listType) {
            throw new Error("Missing userId or listType in request body.");
        }

        if (!requestBody.items || !Array.isArray(requestBody.items)) {
            throw new Error("Invalid request body. 'items' array is missing or invalid.");
        }


        // Skapa det nya objektet med det genererade id:t och de andra attributen
        const newItem = {
            id: nanoid(),
            Name: requestBody.Name || '',
            Genre: requestBody.Genre || '',
            Duration: requestBody.Duration || '',
            PremiereYear: requestBody.PremiereYear || '',
            ShortDescription: requestBody.ShortDescription || '',
            Actors: requestBody.Actors || [''],
            Image: requestBody.Image || '',
            userId: userId,
            listType: listType
        };

        // Skicka upp det nya objektet till DynamoDB-tabellen
        await dynamo.send(
                new PutCommand({
                TableName: 'userListTable',
                Item: newItem 
                })
            );

    return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "successfull", items: newItem }),
        };
    } catch (err) {
        return {
            statusCode: err.statusCode,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: err.message }),
        }
    }
       
    
}