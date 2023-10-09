import {GraphQLResolveInfo} from "graphql";


/**
 * Usable inside GraphQLField.args or GraphQLObjectType.fields 
 * @param options 
 */
export default function GraphQLDate<
    Type extends "string"|"number"="number",
    Key extends string|undefined=undefined,
>(options:{
    /**
     * @default "number"
     */
    srcType:Type,
    /**
     * The key of the target value in the parent object.
     * 
     * Required when the type is used as a field.
     * 
     * Should not be set when used as an argument in GraphQLField.args
     */
    key:Key,
    /**
     * @default "/"
     */
    seperator:"/"|"."|"-"|","|" ",
    /**
    * @default "dmy"
    */
    format:GraphQLDateFormat,
    /**
     * Makes sure that the date parts are in dd,mm,yyyy formats.
     * @default false
     */
    prettify:boolean,
    resolve(
        value:Any,
        args:Object,
        context:Object,
        info:GraphQLResolveInfo,
    ):Any,
}&(Type extends "string"?{
    /**
     * @default "dmy"
     */
    srcFormat:GraphQLDateFormat,
}:{})&(Key extends undefined?{
    /**
     * @default false
     */
    required:boolean,
}:{})):Any;


type GraphQLDateFormat="dmy"|"ymd"|"mdy";
