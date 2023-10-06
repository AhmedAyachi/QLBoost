import {GraphQLString,GraphQLNonNull} from "graphql";


export default function GrapthQLTime(options={}){
    const {key,required,use12HourFormat,prettify,resolve}=options;
    return {
        type:required?new GraphQLNonNull(GraphQLString):GraphQLString,
        resolve:(parent,args,context,info)=>{
            let value=key?parent[key]:parent;
            if(value){
                let [hours,minutes]=value.split(":").map(n=>parseInt(n));
                if((-1<hours)&&(hours<12)&&(-1<minutes)&&(minutes<60)){
                    let suffix="";
                    if(use12HourFormat){
                        if(hours>12){
                            hours-=12;
                            suffix=" PM";
                        }
                        else{suffix=" AM"};
                    }
                    if(prettify){
                        if(hours>9){hours="0"+hours};
                        if(minutes>9){minutes="0"+minutes};
                    }
                    value=hours+":"+minutes+suffix;
                }
                else{
                    throw new Error("invalid time");
                }
            }
            return resolve?resolve(value,args,context,info):value;
        },
    }
}
