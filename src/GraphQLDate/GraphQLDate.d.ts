import {GraphQLArgConfig,GraphQLFieldConfig} from "../GraphQLField/GraphQLField";


/**
 * Usable inside GraphQLField.args or GraphQLObjectType.fields 
 * @param options 
 */
export default function GraphQLDate<
    Key extends string|undefined=undefined,
>(options:GraphQLDateOptions<Key>):Key extends undefined?GraphQLArgConfig:GraphQLFieldConfig;


type GraphQLDateOptions<Key>=Omit<Key extends undefined?GraphQLArgConfig:GraphQLFieldConfig,"type">&{
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
     * Required when the source value is of type string.
     * @default "dmy"
     */
    srcFormat:GraphQLDateFormat,
    /**
     * Makes sure that the date parts are in dd,mm,yyyy formats.
     * @default false
     */
    prettify:boolean,
}&(Key extends undefined?{
    /**
     * @default false
     */
    required:boolean,
}:{});

type GraphQLDateFormat="dmy"|"ymd"|"mdy";
