import uuid from "uuid";
import * as dynamoDblib from "../libs/dynamodb-lib";
import {success,failure} from "../libs/response-lib";

export async function main(event,context,callback) {

    const projectInfo = JSON.parse(event.body);

    const params = {

        TableName: "projects",

        Item: {
            projectId: uuid.v1(),
            projectName: projectInfo.projectName,
            details: projectInfo.details,
            developers: projectInfo.developers,
            managerId: projectInfo.managerId,
            status: "pending"

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