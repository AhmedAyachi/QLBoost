import {GraphQLArgConfig,GraphQLFieldConfig} from "../GraphQLField/GraphQLField";


/**
 * Usable inside GraphQLField.args or GraphQLObjectType.fields 
 * @param options 
 */
export default function GraphQLDate<
    Type extends "string"|"number"="number",
    Key extends string|undefined=undefined,
>(options:GraphQLDateOptions<Type,Key>):key extends undefined?GraphQLArgConfig:GraphQLFieldConfig;


type GraphQLDateOptions<Type,Key>=Omit<key extends undefined?GraphQLArgConfig:GraphQLFieldConfig,"type">&{
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
}:{});

type GraphQLDateFormat="dmy"|"ymd"|"mdy";
