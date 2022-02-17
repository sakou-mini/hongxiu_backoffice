import axios from "axios"
import serve from "../api/host"
import publicMethod from "../publicMethod";
import { MessageBox, Message } from 'element-ui'

//创建axios
let instance = axios.create({
    baseURL:serve,
    timeout:5000
})

//发出请求拦截
instance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("JSESSIONID")
        if(token !== null){
            config.headers['Authorization'] = token
        }

        if(config.method === "post"){
            config.data = publicMethod.clearEmpty(config.data)
        }else if(config.method === "get"){
            config.params = publicMethod.clearEmpty(config.params)
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

function errMessage(res){
    MessageBox.alert(`错误接口：${res.config.url} <br> 错误信息：${res.data.message}<br>`,"请求发生错误", {
        dangerouslyUseHTMLString: true
    })
}

//收到请求拦截
instance.interceptors.response.use((response)=>{
    if(response.data.code !== "200"){
        errMessage(response)
    }
    return response
},(err)=>{
    console.log(err);
    switch (err.response.status) {
        case 404:
            Message({ type: 'error', message: '访问的目标资源不存在' });
            break;
        case 400:
            Message({ type: 'error', message: '客户端请求有语法错误，不能被服务器所理解' });
            break;
        case 403:
            Message.error({message:'权限不足,请联系管理员!'});
        case 504:
        case 505:
        case 500:
            Message({ type: 'error', message: '服务器发生不可预期的错误'});
            break;
        default:
            Message.error({ message: '未知错误!'});
    }
})

export default instance