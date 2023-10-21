declare module "graphqlutils";


export {default as GraphQLField} from "./src/GraphQLField/GraphQLField.js";
export {default as GraphQLDate} from "./src/GraphQLDate/GraphQLDate.js";
export {default as GrapthQLTime} from "./src/GrapthQLTime/GrapthQLTime.js";
export {default as GraphQLExtendType} from "./src/GraphQLExtendType/GrapthQLExtendType.js";
export {default as GraphQLObject} from "./src/GraphQLObject/GraphQLObject.js";


export const Query={
    parse():String;
}
