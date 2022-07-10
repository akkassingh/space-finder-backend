import { Stack, StackProps } from 'aws-cdk-lib';
import { Runtime, Code, Function as LambdaFunction } from 'aws-cdk-lib/aws-lambda';
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from 'constructs';
import { join } from 'path';
import { GenericTable } from './GenericTable';
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";;

export class SpaceStack extends Stack {

    private api = new RestApi(this, 'spaceAPi');
    private spacesTable = new GenericTable(
        'SpacesTable',
        'spaceId',
        this
    )

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props)


        const helloLambda = new LambdaFunction(this, 'helloLambda', {
            runtime: Runtime.NODEJS_16_X,
            code: Code.fromAsset(join(__dirname, '..', 'services', 'hello')),
            handler: 'hello.main'
        })

        const helloLambdaNodeJs = new NodejsFunction(this, 'helloLambdaNodeJs', {
            entry: (join(__dirname, '..', 'services', 'node-lambda', 'hello.ts')),
            handler: 'handler'
        })

        const helloLambdaWebpack = new LambdaFunction(this, 'helloLambdaWebpack', {
            runtime: Runtime.NODEJS_14_X,
            code: Code.fromAsset(join(__dirname, '..', 'build', 'nodeHelloLambda')),
            handler: 'nodeHelloLambda.handler'
        })


        // Hello API lambda Integration:
        const helloLambdaIntegration = new LambdaIntegration(helloLambda);
        const helloLambdaResource = this.api.root.addResource('hello');
        helloLambdaResource.addMethod('GET', helloLambdaIntegration);
    }

}