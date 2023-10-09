

export default function GraphQLField(options){
    const mainResolver=options.resolve;
    ["args"].forEach(key=>{
        let value=options[key];
        if(typeof(value)==="function"){value=value()};
        if(Array.isArray(value)){value=getArrayAsObject(value)};
        options[key]=value;
    });
    const {fields,args}=options,resolvers={};
    if(fields){
        options.fields=()=>{
            let value=typeof(fields)==="function"?fields():fields;
            if(Array.isArray(value)){value=getArrayAsObject(value)};
            return value;
        }
    }
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
    options.resolve=async (parent,args,context,info)=>{
        for(const key in args){
            const resolver=resolvers[key];
            if(typeof(resolver)==="function"){
                const value=resolver(args[key],args,context,info);
                args[key]=value instanceof Promise?await value:value;
            }
        }
        return typeof(mainResolver)==="function"?mainResolver(parent,args,context,info):null;
    };
    return options;
}

const getArrayAsObject=(array=[])=>{
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
