import AWS from 'aws-sdk';
import {failure, success} from "../libs/response-lib";

export async function main(event,context,callback) {

    AWS.config.update({region: "eu-west-2"});

    const lambda = new AWS.Lambda();

    let createUserParams={
        body:{
            "userName":"user6",
            "skill":"JavaScript",
            "isAdmin":false
        }
    };

    let getUserParams={
        pathParameters:{
            id:"user6"
        }
    };

    let listUserParams={
        "body":{
            "userKey":"User"
        }
    }

    const invokeParams = {
        FunctionName: "projectManagement-dev-listUser",
        InvocationType: "RequestResponse",
        Payload: JSON.stringify(listUserParams)
    };

    lambda.invoke(invokeParams,function (error, data) {
        if (error) {
            console.error(JSON.stringify(error));
            return callback(null,failure({status:false}));
        } else if (data) {
            console.log(data);
            console.log(typeof data);
            return callback(null,success(JSON.parse(data.Payload).body));
        }

    });


}