import {getArrayAsObject} from "../index.js";


export default function GraphQLField(config){
    const mainResolver=config.resolve,resolvers={};
    let {args}=config;
    if(typeof(args)==="function"){args=args()};
    if(Array.isArray(args)){args=getArrayAsObject(args)};
    config.args=args;
    for(const key in args){
        const argument=args[key];
        if(argument){
            const {resolve}=argument;
            if(typeof(resolve)==="function"){
                resolvers[key]=resolve;
                delete argument.resolve;
            };
        }
    }
    config.resolve=async (parent,args,context,info)=>{
        for(const key in args){
            const resolver=resolvers[key];
            if(typeof(resolver)==="function"){
                const value=resolver(args[key],args,context,info);
                args[key]=value instanceof Promise?await value:value;
            }
        }
        return typeof(mainResolver)==="function"?mainResolver(parent,args,context,info):null;
    };
    return config;
}
