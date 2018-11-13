import * as dynamoDblib from "../libs/dynamodb-lib";
import {success,failure} from "../libs/response-lib";
import {userConstants,projectConstants} from '../utils/constants';

export async function main(event,context,callback) {

    const params = {

        TableName: userConstants.USER_TABLE,

        Key: {
            userKey: userConstants.PARTITION_KEY,
            userName: event.pathParameters.id
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