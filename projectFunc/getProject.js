import * as dynamoDblib from "../libs/dynamodb-lib";
import {success,failure} from "../libs/response-lib";

export async function main(event,context) {

    const projectInfo = JSON.parse(event.body);

    const params = {

        TableName: "projects",

        Key: {
            projectId: event.pathParameters.id
        }
    };

    try {
        const res = await dynamoDblib.call("get",params);
        if (res.Item) {
            return success(res.Item);
        } else return failure({status:false,error:"project not found."});
    }catch (e) {
        console.log(e);
        return failure({status:false});

    }
}