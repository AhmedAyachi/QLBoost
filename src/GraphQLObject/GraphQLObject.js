import {getArrayAsObject} from "../index.js";
import GraphQLField from "../GraphQLField/GraphQLField.js";
import {GraphQLObjectType,GraphQLInputObjectType} from "graphql";


export default function GraphQLObject(config){
    const {fields}=config;
    if(fields){
        config.fields=typeof(fields)==="function"?(()=>getFields(fields())):getFields(fields);
    }
    const type=new GraphQLObjectType(config);
    type.toArgType=(name)=>{
        const argconfig={...config};
        argconfig.name=name||argconfig.name+"Arg";
        return new GraphQLInputObjectType(argconfig);
    }
    return type;
}

const getFields=(value)=>{
    if(Array.isArray(value)){value=getArrayAsObject(value)};
    for(const key in value){
        value[key]=GraphQLField(value[key]);
    }
    return value;
}
