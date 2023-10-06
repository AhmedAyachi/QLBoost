

export default function GraphQLField(options){
    const mainResolver=options.resolve,{args}=options;
    const resolvers={}; 
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
    options.resolve=mainResolver&&(async (parent,args,context,info)=>{
        if(typeof(mainResolver)==="function"){
            for(const key in args){
                const resolver=resolvers[key];
                if(typeof(resolver)==="function"){
                    const value=resolver(args[key],args,context,info);
                    args[key]=value instanceof Promise?await value:value;
                }
            }
            return mainResolver(parent,args,context,info);
        }
        else{
            return null;
        }
    });
    return options;
}
