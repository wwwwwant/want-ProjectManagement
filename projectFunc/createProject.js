import uuid from "uuid";
import * as dynamoDblib from "../libs/dynamodb-lib";
import {success,failure} from "../libs/response-lib";
import {processEvent} from "../utils/preprocess";
import {projectConstants} from "../utils/constants";

export async function main(event,context,callback) {

    const projectInfo = processEvent(processEvent(event).body);

    const params = {

        TableName: projectConstants.PROJECT_TABLE,

        Item: {
            projectKey: projectConstants.PARTITION_KEY,
            projectName: projectInfo.projectName,
            details: projectInfo.details,
            developers: projectInfo.developers,
            managerName: projectInfo.managerName,
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