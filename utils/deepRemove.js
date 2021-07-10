
const deepRemoveKey=(obj,keyList)=>{
    if(obj instanceof Array){
        for(let _ of obj){
            deepRemoveKeyObject(_,keyList)
        }
    }
    else{
        deepRemoveKeyObject(obj,keyList)
    }
}

const deepRemoveKeyObject=(obj,keyList)=>{
    Object.keys(obj).forEach((key)=>{
        if(obj[key] instanceof Object){
            deepRemoveKey(obj[key],keyList)
        }
        if(keyList.includes(key)){
            delete obj[key]
        }
        if(key.includes('__c') || key.includes('__r') || key.includes('__s')){
            let value=obj[key];
            delete obj[key];
            obj[key.replace('__c','').replace('__r','').replace('__s','')]=value;
        }
    });
}

module.exports=deepRemoveKey