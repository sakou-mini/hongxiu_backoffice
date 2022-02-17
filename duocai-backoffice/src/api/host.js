let serve = [
    //默认请求地址
    {local:"http://192.168.0.113:9010/duocaiApi",type:1},
    {local:"http://192.168.0.113:8010",type:2},
    {local:"http://192.168.0.113:8005",type:3},
    {local:"http://192.168.0.113:8010/hongxiuWeb",type:4},
    {local:"http://52.128.228.82:8010",type:5},
    {local:"http://api.365mitu.com/duocaiApi",type:6},
    {local:"http://52.128.228.82:9010/duocaiApi",type:7},
]

let local = 6

function getLocal(){
    for(let i = 0 ;i<serve.length;i++){
        if(local===serve[i].type){
            return serve[i].local
        }
    }
}


export default getLocal()