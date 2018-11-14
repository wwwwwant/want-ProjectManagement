const event = {
    "body": {
        "userName": "user11",
        "skill": "C",
        "isAdmin": false
    }
}

let temp = JSON.stringify(event);
console.log(temp);
console.log(typeof temp === 'string' ? temp :JSON.stringify(JSON.stringify(event)));