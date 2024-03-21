import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb"

const client = new DynamoDBClient({})
const dynamo = DynamoDBDocumentClient.from(client)
import pkg from 'aws-sdk';
const { CognitoIdentityServiceProvider } = pkg;
const cognito = new CognitoIdentityServiceProvider({ region: 'eu-north-1' });

export const handler = async (event) => {
    console.log('event:', event)
    const requestBody = JSON.parse(event.body);
    const authorizationHeader = event.headers.authorization;
    const AccessToken = authorizationHeader ? authorizationHeader.split(' ')[1] : null;
    console.log('requestBody', requestBody )
    
    try {
        const user = await cognito.getUser({ AccessToken: AccessToken}).promise();
        const userId = user.Username
        console.log('user:', user)
        console.log('userId: ', userId)
        
        if (userId !== undefined) {
            console.log(userId !== undefined)
            const newItem = {
                mediaId: requestBody.items[0].id || '',
                name: requestBody.items[0].title || requestBody.items[0].name || '',
                premiereYear: requestBody.items[0].release_date || '',
                shortDescription: requestBody.items[0].overview || '',
                imageposter: requestBody.items[0].poster_path || '',
                imagelandscape: requestBody.items[0].backdrop_path || '',
            };

            const getListResponse = await dynamo.send(
                new GetCommand({
                    TableName: 'MyListTable',
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
                TableName: 'MyListTable',
                Key: {
                    'userId': userId,
                },
                UpdateExpression: "SET myList = :myList",
                ExpressionAttributeValues: {
                    ":myList": updatedList
                },
                ReturnValues: "UPDATED_NEW"
            })
        );
        console.log('uppdaterade listan: ', updateList)
           
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "successfull", items: updateList }),
        };
        } else {
            throw new Error('Användaren inte autentierad')
        }
    
    } catch (err) {
        return {
            statusCode: err.statusCode,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: err.message }),
        }
    }
       
    
}