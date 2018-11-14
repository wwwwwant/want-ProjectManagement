import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";
import {userConstants} from "../utils/constants";
import {processEvent} from "../utils/preprocess";

export async function main(event, context,callback) {

    const userInfo = processEvent(event);
    const queryItem = userInfo.body;

    let exp = "";
    let values = {};
    for (var key in queryItem){
        exp += key+" = :"+key+" and";
        values[":"+key]=queryItem[key];
    }
    exp = exp.substring(0,exp.length-4);
    const params = {
        TableName: userConstants.USER_TABLE,
        // 'KeyConditionExpression' defines the condition for the query
        // - 'userId = :userId': only return items with matching 'userId'
        //   partition key
        // 'ExpressionAttributeValues' defines the value in the condition
        // - ':userId': defines 'userId' to be Identity Pool identity id
        //   of the authenticated user
        KeyConditionExpression: exp,
        ExpressionAttributeValues: values

    };

    try {
        const result = await dynamoDbLib.call("query", params);
        // Return the matching list of items in response body
        return callback(null,success(result.Items));
    } catch (e) {
        console.log(e.message);
        return callback(null,failure({ status: false }));
    }
}