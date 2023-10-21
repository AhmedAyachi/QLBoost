import {GraphQLObjectType,GraphQLScalarType,GraphQLObjectTypeConfig} from "graphql";


export default function GraphQLExtendType(
    parentType:GraphQLScalarType|GraphQLObjectType|(()=>GraphQLScalarType|GraphQLObjectType),
    config:GraphQLObjectTypeConfig<Object,Object>,
):GraphQLObjectType;
