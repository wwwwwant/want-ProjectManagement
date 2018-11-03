event = {
    "body":"{\"userId\":\"80989830-df72-11e8-a40f-331b95dde11a\",\"skill\":\"Python\"}"
};

const userInfo = JSON.parse(event.body);

let exp = "SET ";
let values = {};
for (var key in userInfo){
    if (key !== "userId"){
        exp += key+" = :"+key+",";
        values[":"+key]=userInfo[key];
    }
}
exp = exp.substring(0,exp.length-1);
console.log(exp);
console.log(values);