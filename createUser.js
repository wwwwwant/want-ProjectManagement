import uuid from "uuid";
import * as dynamoDblib from "./libs/dynamodb-lib";
import {success,failure} from "./libs/response-lib";

export async function main(event,context,callback) {

    const userInfo = JSON.parse(event.body);

    const params = {

        TableName: "users",

        Item: {
            userId: uuid.v1(),
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