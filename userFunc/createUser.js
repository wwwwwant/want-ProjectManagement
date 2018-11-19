import * as dynamoDblib from "../libs/dynamodb-lib";
import {success,failure} from "../libs/response-lib";
import {userConstants} from "../utils/constants";
import {processEvent} from "../utils/preprocess";

export async function main(event,context,callback) {

    const res = processEvent(event);
    const userInfo = processEvent(res.body);

    const params = {

        TableName: userConstants.USER_TABLE,

        Item: {
            userKey: userConstants.PARTITION_KEY,
            isAdmin: userInfo.isAdmin,
            skill: userInfo.skill,
            userName: userInfo.userName,
            projects:userInfo.projects,
            details:userInfo.details,
            createAt: Date.now()
        }
    };

    try {
        await dynamoDblib.call("put",params);
        params.Item['typeEvent']=event.type;
        return callback(null,success(params.Item));
    }catch (e) {
        console.log(e);
        return callback(null,failure({status: false}));
    }
}