export function processEvent(event){
    let res = {};
    if (typeof event === "string"){
        res = JSON.parse(event);
    }else{
        res = event;
    }
    return res;
}