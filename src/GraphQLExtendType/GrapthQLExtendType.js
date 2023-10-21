const {GraphQLObjectType}=require("graphql");


module.exports=function GrapthQLExtendType(parent,config){
    const {fields}=config;
    return new GraphQLObjectType({
        ...config,
        fields:()=>{
            const parentType=typeof(parent)==="function"?parent():parent;
            return {
                ...parentType.toConfig().fields,    
                ...(typeof(fields)==="function"?fields():fields),
            };
        },
    });
}
