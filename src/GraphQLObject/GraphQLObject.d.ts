import {GraphQLObjectType,GraphQLObjectTypeConfig,GraphQLInputObjectType} from "graphql";
import {GraphQLFieldConfig} from "../GraphQLField/GraphQLField";


export default function GraphQLObject(config:GraphQLObjectTypeConfig<Object,Object>&{
    fields?:GraphQLFieldsConfig|GraphQLFieldItemConfig[]|(()=>GraphQLFieldsConfig|GraphQLFieldItemConfig[]),
}):GraphQLObjectType&{
    toArgType(name:string):GraphQLInputObjectType,
};

interface GraphQLFieldItemConfig extends GraphQLFieldConfig {
    name:string,
}

interface GraphQLFieldsConfig {
    [key:string]:GraphQLFieldConfig;
}
