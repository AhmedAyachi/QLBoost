"use strict";

exports.getArrayAsObject=(array=[])=>{
    const object={};
    array.forEach(item=>{
        const {name}=item;
        if(name){
            delete item.name;
            object[name]=item;
        }
    });
    return object;
}

exports.Query={
    stringify:function(data,options){
        const {spread}=options||{};
        if(Array.isArray(data)){
            let query=spread?"":"[";
            data.forEach(item=>{
                query+=this.stringify(item)+",";
            });
            if(!spread){query+="]"};
            return query; 
        }
        else if(data){
            switch(typeof(data)){
                case "string": return `"${data}"`;
                case "object": 
                    let query=spread?"":"{";
                    for(const key in data){
                        const value=data[key];
                        if(value!==undefined){
                            query+=`${key}:${this.stringify(value)},`;
                        }
                    }
                    if(!spread){query+="}"};
                    return query;
                case "boolean":
                case "number": return data;
                case "undefined":
                default: return "";
            }
        }
        else return "";
    }
}
exports.GraphQLField=()=>({});
exports.GraphQLDate=()=>({});
exports.GrapthQLTime=()=>({});
exports.extendObjectType=()=>({});
exports.GraphQLObject=()=>({});

try{
    require("graphql");
    exports.GraphQLField=require("./GraphQLField/GraphQLField");
    exports.GraphQLDate=require("./GraphQLDate/GraphQLDate");
    exports.GrapthQLTime=require("./GrapthQLTime/GrapthQLTime");
    exports.extendObjectType=require("./extendObjectType/extendObjectType");
    exports.GraphQLObject=require("./GraphQLObject/GraphQLObject");

}
catch(error){};
