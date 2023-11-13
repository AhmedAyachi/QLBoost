const GraphQLObject=require("../GraphQLObject/GraphQLObject");
const {getArrayAsObject}=require("../index");


module.exports=function extendObjectType(type,config){
    let {fields}=config;
    return GraphQLObject({
        ...config,
        fields:()=>{
            const parentType=typeof(type)==="function"?type():type;
            fields=typeof(fields)==="function"?fields():fields;
            if(Array.isArray(fields)){
                fields=getArrayAsObject(fields);
            }
            return {...parentType.toConfig().fields,...fields};
        },
    });
}
