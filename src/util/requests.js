import {post,get,put,reqDelete} from "./index.js"

//登录时校验，检验登录的密码账号是否正确
export const loginapi=data=>{
    return post({
        url:"/login",
        data
    })
}
//用来请求获取用户的列表
export const userListapi=data=>{
    return get({
        url:"/users",
        data
    })
}
//用来新增用户，将前端输入的数据提交给后台，需要有响应的接口
export const userAddapi=data=>{
    return post({
        url:"/users",
        data
    })
}

//用来将前端的mg_status传到后端
//点击改变状态
export const userChangestatus=data=>{
    return put({
        url:`users/${data.id}/state/${data.mg_state}`,
        data
    })
}
//点击编辑
//将前端编辑的邮箱和手机号码传到后端，请求的API带用户的ID
export const userEdit=data=>{
    return put({
        url:`users/${data.id}`,
        data
    })
}
//点击删除，删除的API带用户的ID
export const userDelete=data=>{
    return reqDelete({
        url:`users/${data.id}`
    })
}
//获取商品列表
export const getGoodlist=data=>{
    return get({
        url:`goods`,
        data
    })
}
//获取角色列表
export const getRolelist=data=>{
    return get({
        url:"roles",
        data
    })
}
//新增角色的接口
export const roleAddapi=data=>{
    return post({
        url:"roles",
        data
    })
}
//编辑角色的接口
export const roleEditapi=data=>{
    return put({
        url:`roles/${data.id}`,
        data
    })
}
//删除角色的接口
export const roleDeleteapi=data=>{
    return reqDelete({
        url:`roles/${data.id}`,
        data
    })
}
