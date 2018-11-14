const event = {
    "body":{
        "userKey":"User"
    }
};
const userInfo = event.body;
let exp = "SET ";
let values = {};
for (var key in userInfo){
    exp += key+" = :"+key+" and";
    values[":"+key]=userInfo[key];
}
exp = exp.substring(0,exp.length-4);

console.log(exp);
console.log(values);