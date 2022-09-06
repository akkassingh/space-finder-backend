import { APIGatewayProxyEvent } from "aws-lambda";
import { S3 } from "aws-sdk";

const s3Client = new S3();


async function handler(event: any, context: any) {
    const buckets = await s3Client.listBuckets().promise();
    console.log('Got an event:');
    console.log(event);
    if (isAuthorized(event)) {
        return {
            statusCode: 200,
            // body: `buckets: ${JSON.stringify(buckets.Buckets)} `
            body: JSON.stringify('You are authorized')
        }   
    } else {
        return {
            statusCode: 401,
            // body: `buckets: ${JSON.stringify(buckets.Buckets)} `
            body: JSON.stringify('You are NOT authorized')
        }
    }
}

function isAuthorized(event: APIGatewayProxyEvent){
    const groups = event.requestContext.authorizer?.claims['cognito:groups'];
    if (groups) {
        return (groups as string).includes('admins')
    } else {
        return false
    }
}

export { handler }