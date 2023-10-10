import {GraphQLString,GraphQLNonNull} from "graphql";


export default function GraphQLDate(options={}){
    const {srcType="number",key,seperator="/",resolve}=options;
    return {
        ...options,
        type:options.required?new GraphQLNonNull(GraphQLString):GraphQLString,
        resolve:(parent,args,context,info)=>{
            let value=key?parent[key]:parent;
            let date;
            if(srcType==="string"){
                let day,month,year;
                const parts=value.split(/\/|\-|\.| |\,/g).map(n=>parseInt(n));
                switch(options.srcFormat){
                    case "ymd":[year,month,day]=parts;break;
                    case "mdy":[month,day,year]=parts;break;
                    default: [day,month,year]=parts;break;
                }
                date=new Date(year+seperator+month+seperator+day);
            }
            else{date=new Date(value)};
            if(isNaN(date)){throw new Error("invalid date")}
            else{
                const day=date.getDate(),month=date.getMonth()+1,year=date.getFullYear();
                const parts=(()=>{
                    switch(options.format){
                        case "ymd": return [year,month,day];
                        case "mdy": return [month,day,year];
                        default: return [day,month,year];
                    }
                })();
                if(options.prettify){
                    parts.forEach((part,i)=>{
                        if(part<10){parts[i]="0"+part};
                    });
                }
                value=parts.join(seperator);
            }
            return resolve?resolve(value,args,context,info):value;
        },
    };
};
