import * as dynamoDblib from "../libs/dynamodb-lib";
import {success,failure} from "../libs/response-lib";

export async function main(event,context,callback) {

    const projectInfo = JSON.parse(event.body);

    const params = {

        TableName: "projects",

        Key: {
            projectId: projectInfo.projectId
        }
    };

    try {
        const res = await dynamoDblib.call("get",params);
        if (res.Item) {
            callback(null,success(res.Item));
        } else return failure({status:false,error:"project not found."});
    }catch (e) {
        console.log(e);
        return callback(null,failure({status:false}));

    }
}