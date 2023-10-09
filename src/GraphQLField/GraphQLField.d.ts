import {GraphQLFieldConfig,GraphQLArgumentConfig,GraphQLResolveInfo} from "graphql";


export default function GraphQLField(options:GraphQLFieldOptions):GraphQLFieldOptions;


interface GraphQLFieldOptions extends GraphQLFieldConfig<Object,Object,Object> {
    args?:GraphQLFieldArgsConfig|GraphQLArgConfig[]|(()=>GraphQLFieldArgsConfig|GraphQLArgConfig[]),
    fields?:GraphQLFieldsConfig|GraphQLFieldsConfig[]|(()=>GraphQLFieldsConfig|GraphQLFieldsConfig[]),
    resolve?(
        value:any,
        args:Object,
        context:Object,
        info:GraphQLResolveInfo,
    ):any|Promise<any>
}

interface GraphQLFieldArgsConfig {
    [key:string]:GraphQLArgConfig;
}
interface GraphQLArgConfig extends GraphQLArgumentConfig {
    name:string,
    resolve?(
        value:any,
        args:Object,
        context:Object,
        info:GraphQLResolveInfo,
    ):any|Promise<any>
}

interface GraphQLFieldsConfig {
    [key:string]:GraphQLFieldConfig;
}
interface GraphQLFieldConfig extends GraphQLArgumentConfig {
    name:string,
    resolve?(
        value:any,
        args:Object,
        context:Object,
        info:GraphQLResolveInfo,
    ):any|Promise<any>
}
