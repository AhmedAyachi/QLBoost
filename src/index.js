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
    parse:function(data){
        if(Array.isArray(data)){
            let query="[";
            data.forEach(item=>{
                query+=this.parse(item)+",";
            });
            query+="]";
            return query; 
        }
        else if(data){
            switch(typeof(data)){
                case "string": return `"${data}"`;
                case "object": 
                    let query="{";
                    for(const key in data){
                        const value=data[key];
                        if(value!==undefined){
                            query+=`${key}:${this.parse(value)},`;
                        }
                    }
                    query+="}";
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
exports.GraphQLExtendType=()=>({});
exports.GraphQLObject=()=>({});

try{
    require("graphql");
    exports.GraphQLField=require("./GraphQLField/GraphQLField");
    exports.GraphQLDate=require("./GraphQLDate/GraphQLDate");
    exports.GrapthQLTime=require("./GrapthQLTime/GrapthQLTime");
    exports.GraphQLExtendType=require("./GraphQLExtendType/GrapthQLExtendType");
    exports.GraphQLObject=require("./GraphQLObject/GraphQLObject");

}
catch(error){};
