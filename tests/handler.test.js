import * as getProject from "./getProject"

export async function test() {

    const info = {
        "body":"{\"projectId\":\"493c56e0-dfa1-11e8-818e-574ebfdcdee1\"}"
    };

    const res = await getProject(info);

    console.log(res);
}

test();