import { DocumentClient } from "@aws-sdk/client-dynamodb"

const db = new DocumentClient ( {
     region: process.env.AWS_REGION, 
} ); 

module.exports = { db } ; 