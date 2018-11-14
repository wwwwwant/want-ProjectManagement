import * as dynamoDblib from "../libs/dynamodb-lib";
import {success,failure} from "../libs/response-lib";
import {userConstants} from '../utils/constants';
import {processEvent} from "../utils/preprocess";

export async function main(event,context,callback) {

    const userInfo = processEvent(event);
    const params = {

        TableName: userConstants.USER_TABLE,

        Key: {
            userKey: userConstants.PARTITION_KEY,
            userName: userInfo.pathParameters.id
        }
    };

    try {
        const res = await dynamoDblib.call("get",params);
        if (res.Item) {
            return callback(null,success(res.Item));
        } else return callback(null,failure({status:false,error:"User not found."}));
    }catch (e) {
        console.log(e);
        return callback(null,failure({status:false}));

    }
}