const {getArrayAsObject}=require("../index");


module.exports=function GraphQLField(config){
    const mainResolver=config.resolve,resolvers={};
    let {args}=config;
    if(args){
        if(typeof(args)==="function"){args=args()};
        if(Array.isArray(args)){args=getArrayAsObject(args)};
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
        config.args=args;
    }
    if(args&&(typeof(mainResolver)==="function")){
        config.resolve=async (parent,args,context,info)=>{
            for(const key in args){
                const resolver=resolvers[key];
                if(resolver){
                    const value=resolver(args[key],args,context,info);
                    args[key]=value instanceof Promise?await value:value;
                }
            }
            return mainResolver(parent,args,context,info);
        };
    }
    else if(mainResolver){config.resolve=mainResolver};
    return config;
}
