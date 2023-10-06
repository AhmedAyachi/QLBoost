import {GraphQLFieldConfig,GraphQLArgumentConfig,GraphQLResolveInfo} from "graphql";


export default function GraphQLField(options:GraphQLFieldOptions):GraphQLFieldOptions;


interface GraphQLFieldOptions extends GraphQLFieldConfig<TSource,TContext,TArgs> {
    args?:GraphQLFieldArgsConfig,
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
