import {GraphQLString,GraphQLNonNull} from "graphql";


export default function GrapthQLTime(options={}){
    const {srcType="number",key,required,use12HourFormat,prettify,resolve}=options;
    return {
        ...options,
        type:required?new GraphQLNonNull(GraphQLString):GraphQLString,
        resolve:(parent,args,context,info)=>{
            let value=key?parent[key]:parent;
            let hours,minutes;
            if(srcType==="string"){
                [hours,minutes]=value.split(":").map(n=>parseInt(n));
                if(!((-1<hours)&&(hours<12)&&(-1<minutes)&&(minutes<60))){
                    throw new Error("invalid time");
                }
            }
            else{
                const date=new Date(value);
                hours=date.getHours();
                minutes=date.getMinutes();
            }
            let suffix="";
            if(use12HourFormat){
                if(hours>12){
                    hours-=12;
                    suffix=" PM";
                }
                else{suffix=" AM"};
            }
            if(prettify){
                if(hours<10){hours="0"+hours};
                if(minutes<10){minutes="0"+minutes};
            }
            value=hours+":"+minutes+suffix;
            return resolve?resolve(value,args,context,info):value;
        },
    }
}
