import * as dynamoDblib from "../libs/dynamodb-lib";
import {success,failure} from "../libs/response-lib";
import {processEvent} from "../utils/preprocess";
import {projectConstants} from "../utils/constants";

export async function main(event,context,callback) {

    const projectInfo = processEvent(event);

    const params = {

        TableName: projectConstants.PROJECT_TABLE,

        Key: {
            projectKey:projectConstants.PARTITION_KEY,
            projectName: projectInfo.pathParameters.id
        }
    };

    try {
        const res = await dynamoDblib.call("get",params);
        if (res.Item) {
            return callback(null,success(res.Item));
        } else return callback(null,failure({status:false,error:"project not found."}));
    }catch (e) {
        console.log(e);
        return callback(null,failure({status:false}));

    }
}