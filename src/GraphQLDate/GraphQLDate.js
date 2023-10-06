import {GraphQLString,GraphQLNonNull,GraphQLFloat} from "graphql";


export default function GraphQLDate(options={}){
    const {type="string",key,required,seperator="/",informat,outformat,prettify,resolve}=options;
    return {
        type:getType(type,required),
        resolve:(parent,args,context,info)=>{
            let value=key?parent[key]:parent;
            let date;
            if(type==="string"){
                let day,month,year;
                let parts=value.split(/\/|\-|\.| |\,/g).map(n=>parseInt(n));
                switch(informat){
                    case "ymd":[year,month,day]=parts;break;
                    case "mdy":[month,day,year]=parts;break;
                    default: [day,month,year]=parts;break;
                }
                date=new Date(year+seperator+month+seperator+day);
                if(isNaN(date)){
                    throw new Error("invalid date");
                }
                else{
                    day=date.getDate(),month=date.getMonth()+1,year=date.getFullYear();
                    switch(outformat){
                        case "ymd":parts=[year,month,day];break;
                        case "mdy":parts=[month,day,year];break;
                        default:parts=[day,month,year];break;
                    }
                    if(prettify){
                        parts.forEach((part,i)=>{
                            if(part<10){parts[i]="0"+part};
                        });
                    }
                    value=parts.join(seperator);
                }
            }
            else{
                date=new Date(value);
                value=date.getTime();
            }
            return resolve?resolve(value,args,context,info):value;
        },
    };
};

const getType=(type,required)=>{
    let value=type==="number"?GraphQLFloat:GraphQLString;
    if(required){value=new GraphQLNonNull(value)};
    return value;
}
