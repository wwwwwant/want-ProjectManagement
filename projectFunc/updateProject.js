import * as dynamoDblib from "../libs/dynamodb-lib";
import {success,failure} from "../libs/response-lib";

export async function main(event,context,callback) {

    const projectInfo = JSON.parse(event.body);

    let exp = "SET ";
    let values = {};
    for (var key in projectInfo){
        if (key !== "projectId"){
            exp += key+" = :"+key+",";
            values[":"+key]=projectInfo[key];
        }
    }
    exp = exp.substring(0,exp.length-1);

    const params = {

        TableName: "projects",

        Key: {
            projectId: event.pathParameters.id
        },

        /**
         * copy from serverless stack
         */
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        UpdateExpression: exp,
        ExpressionAttributeValues: values,
        // 'ReturnValues' specifies if and how to return the item's attributes,
        // where ALL_NEW returns all attributes of the item after the update; you
        // can inspect 'result' below to see how it works with different settings
        ReturnValues: "ALL_NEW"
    };

    try {
        const res = await dynamoDblib.call("update",params);
        callback(null,success({status:true,"result":res}));
    }catch (e) {
        console.log(e);
        callback(null,failure({status:false}));
    }
}