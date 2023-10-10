

export {default as GraphQLField} from "./GraphQLField/GraphQLField.js";
export {default as GraphQLDate} from "./GraphQLDate/GraphQLDate.js";
export {default as GrapthQLTime} from "./GrapthQLTime/GrapthQLTime.js";
export {default as GraphQLExtendType} from "./GraphQLExtendType/GrapthQLExtendType.js";
export {default as GraphQLObject} from "./GraphQLObject/GraphQLObject.js";


export const getArrayAsObject=(array=[])=>{
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
