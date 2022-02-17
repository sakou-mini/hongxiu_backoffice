import axios from "axios"
import serve from "../api/host"


//创建axios
let instance = axios.create({
    baseURL:serve,
    timeout:5000
})

//发出请求拦截
instance.interceptors.request.use(
    (config) => {
        //获取token
        const token = sessionStorage.getItem("JSESSIONID")
        //token传参名
        token && (config.headers['Authorization'] = token)
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

//收到请求拦截
instance.interceptors.response.use()

export default instance