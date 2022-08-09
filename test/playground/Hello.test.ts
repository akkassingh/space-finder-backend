import { APIGateway } from 'aws-sdk';
import { APIGatewayProxyEvent } from 'aws-lambda';

import { handler } from '../../services/SpacesTable/Create';


const event: APIGatewayProxyEvent = {
    body: {
        name: 'Delhi',
        location: 'Mughal City'
    }
} as any; 

// const event: APIGatewayProxyEvent = {
//     queryStringParameters: {
//         location: 'London'
//     }
// } as any;

const result = handler(event, {} as any).then((apiResult) => {
    const items = JSON.parse(apiResult.body);
    console.log(123);
})