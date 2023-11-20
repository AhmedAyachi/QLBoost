## What is this ?
This repo addes additional features to graphql exports such as **GraphQLObjectType** args resolvers, fields/args as arrays, extending **GraphQLObjectType** types and more.
This repo has graphql >=15.8.0 package as an optional peer dependency, so make sure you have graphql installed through:

    npm install --save graphql


## GraphQLField
A function that takes a config object as param and returns a **GraphQLFieldConfig** object.

The config param object provides resolvers to args and supports args as an array of objects with an additional **name** property.
#### Args as an array
Can accept args as an array of objects.
GraphQL Nested objects syntax will still work.
Can be a function  that returns an object or an array. 
#### Arg Resolver 
Of Type **Function**: ( value , args , context , info ) : any | Promise\<any\>

|Param|Type|Description|
|-------|----|-----------|
|value|any|the arg value, same as args.argkey|
|args|object|the whole args object|

    new GraphQLObjectType({
        name:"Query",
        fields:()=>({
            findItems:GraphQLField({
                type:new GraphQLList(ItemType),
                args:[
	                {
					    name:"query",// required to play the role of the key
						type:new GraphQLNonNull(GraphQLString),
						resolve:(value,args,context,info)=>{
							/* Just for the sake of the example.
							The resolver can be async.
							You can throw erros too.
							Must return the new value, can't just set
							manually the args object otherwise the value
							will be undefined.
							*/
							return value.trim();
						},
				    },
			    ],
            }),
        }),
    });
Just go to any graphql field object  and pass it as an argument to the GraphQLField function. 

## GraphQLObject
A function that takes a **GraphQLObjectTypeConfig** object as param and returns a **new GraphQLObjectType instance** with the provided config object.

#### Fields as an array
Can accept an array of objects as fields, same logic above.
No need to wrap fields in a **GraphQLField** (Function above)
as it's done under the hood.

    export default GraphQLObject({
        name:"Product",
        fields:[
	        {name:"id",type:GraphQLID},
	        {
	            name:"name",
	            type:GraphQLString,
	            resolve:(parent)=>{
		            const {name}=parent;
		            return name.toLowerCase();
	            },
	        },
	        {name:"description",type:GraphQLString},
	        
        ],
    });
The name property is playing the role of the key in the fields object.
#### toArgType Method
In some cases a graphql object type is needed to be used as an Output and Input type. Instead of redefining an Output type from scratch, you can use the **toArgType** method of the object returned by the ***GraphQLObject*** function to create an GraphQLInputType.
|Param|Type|Description|
|-------|------|-------|
|name|Optional String|The Input type name. Default to the object name with "Arg" as a suffix|

    GraphQLObject({
		name:"Querier",
		fields:()=>[
			{
				name:"placeOrder",
				type:new  GraphQLList(ItemType),
				args:[{
					name:"items",
					type:new  GraphQLList(ItemType.toArgType()),
				}],
				resolve:(parent,args)=>args.items,
			},
		],
    });

## extendObjectType
Extends a GraphQLObjectType.
|Param|Type|Description|
|-----|----|-----------|
|type|***GraphQLObjectType*** \| ***()=>GraphQLObjectType***|The graphql object type to extend|
|config|***Object***|Type config|


    const PersonType=new GraphQLObjectType({
	    name:"Person",
	    fields:()=>({
		    name:{type:GraphQLString},
		    birthdate:{type:GraphQLString},
	    }),
    });
    const UserType=extendObjectType(()=>PersonType,{
	    name:"User",
	    fields:[
		    {name:"id",type:GraphQLID},
	    },
    });

The UserType will have as fields: name, birthdate and id.


## Query

#### Stringify
Stringifies a javascript object into a graphql query object.
Useful when you need to send graphql requests manually without using the apollo client.
|Param|Type|Description|
|------|----|------------|
|value|any|value to parse|
|options|object|stringification options|

|Option|Type|Description|
|------|----|-----------|
|spread|boolean|default to **false**



	const sendOrderRequest=(items)=>fetch(<graphql endpoint>,{
	    method:"POST",
	    body:{
		    query:`mutation {
			    placeOrder(items:${Query.stringify(items)}){
				    id,date,time
			    }
		    }`,
	    },
    });

JSON.stringify won't work in this case, as the graphql items arg looks like a json but it's actually not as the quoted JSON keys are not valid graphql query.

#### Using The spread option
Considering this object :

    const data={
	    id:"id",
	    name:"name",
	};

With spread **false**, stringify returns the string :

    {id:"id",name:"name"}
        
With spread **true**, stringify returns the string :

    id:"id",name:"name"

> Same goes for arrays

that is useful when you need to send a set of args in a graphql query field :

    `{
	    findItems:(${Query.stringify({
		    query:"am",
		    minAge:5,
	    },{spread:true})}){
		    id,name,
	    }
    }`
Well in this case, it is not that useful, but in real world scenarios, the args can be more than two or even dynamic.

## GraphQLDate
A predefined GraphQL object usable as a graphql field/arg inside a **GraphQLObject** config.
#### Config param  options :
|Name|Type|Description|
|----|----|-----------|
|key|string|The value key in the parent object. Required when the type is used as a field|
|seperator|"/" "." "-" "," or scape|Date components separator|
|prettify|boolean|make sure days, months and years are respectively in "dd","mm","yyyy" format|
|format|"dmy" "ymd" "mdy"|returned date format|
|srcFormat|"dmy" "ymd" "mdy"|The original value format. Only required when the original value is of type string|
|required|boolean|sets GraphQLNonNull type. Only when used as an arg|

#### As field :
    GraphQLObject({
	    name:"Person",
	    fields:()=>({
		    name:{type:GraphQLString},
		    birthdate:GraphQLDate({
			    key:"birthdate",
			    required:true,
			    prettify:true,
		    }),
	    }),
    });
    //or
    GraphQLObject({
	    name:"Person",
	    fields:()=>[
		    {name:"name",type:GraphQLString},
		    GraphQLDate({
			    name:"birthdate",
			    key:"birthdate",
			    required:true,
			    prettify:true,
		    }),
	    ],
    });
    

> Same for GrapthQLTime

## How to use it ?
Just install the package using npm or any package manager of your choice :

    npm install --save qlboost

To use it in a webpack environment without installing the graphql package,
add the config below to your webpack configuration:

    {
	    plugins:[
		    new webpack.IgnorePlugin({
			    resourceRegExp:/^graphql$/,
			}),
		],
	}

> GraphQLObject, GraphQLField, extendObjectType, GraphQLDate and GraphQLTime, all require the graphql package.
