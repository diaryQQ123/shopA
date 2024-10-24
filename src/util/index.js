// src/axios.js
import axios from 'axios';
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'
import store from "../store/index"
let loading=null
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/', // 配置基础 URL
  timeout: 5000, // 请求超时时间
  //在请求头加token
  headers: { 'Content-Type': 'application/json;charset=utf-8','Authorization':store.state.uinfo.userinfo.token }, // 默认头部
});
//请求拦截
//loading 加载图标
//config都需要返回
instance.interceptors.request.use(
    config=>{
        loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })
        return config
    }
)

//响应拦截
instance.interceptors.response.use(
    response => {
        loading.close()
        const data=response.data
        // 作者写了if(data.meta.status!=200){ElMessage.error(data.meta.msg||"服务器响应错误")}
        if(!data.data){
            //此时返回的数据为空，意思是说我们在前端输入的账号或者密码是错误的
            ElMessage.error(data.meta.msg||"服务器响应错误")
            return response.data
        }
        return response.data
    },// 直接返回数据
    error => {
        loading.close()
        // console.error('响应错误', error);
        // return Promise.reject(error);
        ElMessage({
            message: '服务器响应错误',
            type: 'error',
          })
    }
  );
//暴露post请求和get请求
export const post=config=>{
    return instance({
        ...config,
        method:"post",
        data:config.data,
    })
}
export const get=config=>{
    return instance({
        ...config,
        method:"get",
        params:config.data
    })
}
//暴露put请求
export const put=config=>{
    return instance({
        ...config,
        method:"put",
        data:config.data
    })
}
//暴露delete请求
export const reqDelete=config=>{
    return instance({
        ...config,
        method:"delete"
    })
}