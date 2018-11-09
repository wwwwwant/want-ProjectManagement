import * as dynamoDblib from "../libs/dynamodb-lib";
import {success,failure} from "../libs/response-lib";

export async function main(event,context,callback) {


    const params = {

        TableName: "projects",

        Key: {
            projectId: event.pathParameters.id
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