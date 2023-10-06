import {GraphQLResolveInfo} from "graphql";


/**
 * Usable inside GraphQLField.args or GraphQLObjectType.fields 
 * @param options 
 */
export default function GraphQLDate<Type extends "string"|"number">(options:{
    type:Type,
    /**
     * required when the type is used for a GraphQLObjectType field.
     * Uses the value of parent[key].
     * 
     * Should not be set when used as an argument type in GraphQLField.args
     */
    key:string,
    /**
     * @default false
     */
    required:boolean,
    resolve(
        value:Any,
        args:Object,
        context:Object,
        info:GraphQLResolveInfo,
    ):Any,
}&(Type extends "string"?{
    /**
     * @default "/"
     */
    seperator:"/"|"."|"-"|","|" ",
    /**
     * @default "dmy"
     */
    informat:GraphQLDateFormat,
    /**
    * @default "dmy"
    */
    outformat:GraphQLDateFormat,
    /**
     * Makes sure that the date parts are in dd,mm,yyyy formats.
     * @default false
     */
    prettify:boolean,
}:{

})):Any;


type GraphQLDateFormat="dmy"|"ymd"|"mdy";
