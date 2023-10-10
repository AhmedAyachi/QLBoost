import {GraphQLFieldConfig as GraphQLConfig,GraphQLArgumentConfig,GraphQLResolveInfo} from "graphql";


export default function GraphQLField(config:GraphQLFieldConfig):GraphQLConfig;


interface GraphQLFieldConfig extends GraphQLConfig<Object,Object,Object> {
    args?:GraphQLFieldArgsConfig|GraphQLArgItemConfig[]|(()=>GraphQLFieldArgsConfig|GraphQLArgItemConfig[]),
    resolve?(
        parent:any,
        args:Object,
        context:Object,
        info:GraphQLResolveInfo,
    ):any|Promise<any>
}

interface GraphQLFieldArgsConfig {
    [key:string]:GraphQLArgConfig;
}

interface GraphQLArgConfig extends GraphQLArgumentConfig {
    resolve?(
        value:any,
        args:Object,
        context:Object,
        info:GraphQLResolveInfo,
    ):any|Promise<any>
}

interface GraphQLArgItemConfig extends GraphQLArgConfig {
    name:string,
}
