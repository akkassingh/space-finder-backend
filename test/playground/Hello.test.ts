import { APIGateway } from 'aws-sdk';
import { APIGatewayProxyEvent } from 'aws-lambda';

import { handler } from '../../services/SpacesTable/Update';


const event: APIGatewayProxyEvent = {
    queryStringParameters: {
        spaceId: '6ddae0a5-bda4-485b-86bb-5a8aec5cf3d2'
    },
    body: {
        location: 'Sparta'
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