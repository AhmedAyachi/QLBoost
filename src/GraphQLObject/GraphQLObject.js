import {getArrayAsObject} from "../index.js";
import GraphQLField from "../GraphQLField/GraphQLField.js";
import {GraphQLObjectType} from "graphql";


export default function GraphQLObject(config){
    const {fields}=config;
    if(fields){
        config.fields=typeof(fields)==="function"?(()=>getFields(fields())):getFields(fields);
    }
    return new GraphQLObjectType(config);
}

const getFields=(value)=>{
    if(Array.isArray(value)){value=getArrayAsObject(value)};
    for(const key in value){
        value[key]=GraphQLField(value[key]);
    }
    return value;
}
