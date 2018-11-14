import * as dynamoDblib from "../libs/dynamodb-lib";
import {success,failure} from "../libs/response-lib";
import {processEvent} from "../utils/preprocess";
import {projectConstants} from "../utils/constants";

export async function main(event,context,callback) {

    const projectInfo = processEvent(event);
    const items = processEvent(projectInfo.body);

    let exp = "SET ";
    let values = {};
    for (var key in items){
        exp += key+" = :"+key+",";
        values[":"+key]=items[key];
    }
    exp = exp.substring(0,exp.length-1);

    const params = {

        TableName: projectConstants.PROJECT_TABLE,

        Key: {
            projectKey: projectConstants.PARTITION_KEY,
            projectName: projectInfo.pathParameters.id
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