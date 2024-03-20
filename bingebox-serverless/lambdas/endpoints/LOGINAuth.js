import { InitiateAuthCommand, CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import jwt from 'jsonwebtoken';

const cognitoClient = new CognitoIdentityProviderClient({ region: 'eu-north-1' }); 

export const handler = async (event) => {
	console.log('VAD ÄR DETTA: ' , event.body )
	
if (event.body) {
	
	const { email, password } = JSON.parse(event.body);
	try {
		
		console.log('EMAIL:', email, 'PASSWORD:', password);

		const authParams = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: '692c2jhmdptcprfp81h7h0663h',

            AuthParameters: {
                USERNAME: email,
                PASSWORD: password
            }
			
        };console.log('EMAIL:', email, 'PASSWORD:', password)
		const authCommand = new InitiateAuthCommand(authParams);
        const authResponse = await cognitoClient.send(authCommand);

        // Om autentiseringen lyckas, generera ett JWT-token
        if (authResponse.AuthenticationResult) {
            const { AccessToken } = authResponse.AuthenticationResult;
            const decodedToken = jwt.decode(AccessToken);

            return {
                statusCode: 200,
                body: JSON.stringify({ token: AccessToken, userId: decodedToken.sub })
            };
        } else {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'Felaktiga inloggningsuppgifter' })
            };
        }
       
    } catch (error) {
        console.error('Oj då, något gick snett med JSON-parsing efter dekodning:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Något gick fel' })
        };
    }
} else {
    console.log('Ingen body att parse:a. Kontrollera inkommande data.');
}

   
    //const secretKey = process.env.SECRET_KEY; 
	

};
