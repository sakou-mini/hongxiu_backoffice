let serve = [
    //默认请求地址
    {local:"http://192.168.0.113:9010/",type:1},
    {local:"http://static.365mitu.com/",type:2},
    {local:"http://52.128.228.82:9010/",type:3},


]

let local = 2

function getLocal(){
    for(let i = 0 ;i<serve.length;i++){
        if(local===serve[i].type){
            return serve[i].local
        }
    }
}


export default getLocal()