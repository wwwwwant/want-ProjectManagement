import * as dynamoDblib from "../libs/dynamodb-lib";
import {success,failure} from "../libs/response-lib";
import {userConstants} from "../utils/constants";
import {processEvent} from "../utils/preprocess";

export async function main(event,context,callback) {

    const userInfo = processEvent(event).body;

    const params = {

        TableName: userConstants.USER_TABLE,

        Item: {
            userKey: userConstants.PARTITION_KEY,
            isAdmin: userInfo.isAdmin,
            skill: userInfo.skill,
            userName: userInfo.userName,
            createAt: Date.now()
        }
    };

    try {
        await dynamoDblib.call("put",params);
        callback(null,success(params.Item));
    }catch (e) {
        console.log(e);
        callback(null,failure({status: false}));
    }
}