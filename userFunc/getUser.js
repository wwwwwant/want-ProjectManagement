import * as dynamoDblib from "../libs/dynamodb-lib";
import {success,failure} from "../libs/response-lib";

export async function main(event,context) {

    const params = {

        TableName: "users",

        Key: {
            userId: event.pathParameters.id
        }
    };

    try {
        const res = await dynamoDblib.call("get",params);
        if (res.Item) {
            return success(res.Item);
        } else return failure({status:false,error:"User not found."});
    }catch (e) {
        console.log(e);
        return failure({status:false});

    }
}