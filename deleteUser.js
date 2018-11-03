import * as dynamoDblib from "./libs/dynamodb-lib";
import {success,failure} from "./libs/response-lib";

export async function main(event,context) {

    const userInfo = JSON.parse(event.body);

    const params = {

        TableName: "users",

        Key: {
            userId: userInfo.userId
        }
    };

    try {
        const res = await dynamoDblib.call("delete",params);

        callback(null,success({status: true, result:res}));
    }catch (e) {
        console.log(e);
        callback(null,failure({status: false}));
    }
}