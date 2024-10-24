<template>
    <div class="login_wrap">
        <div class="form_wrap">
            <el-form :model="form" label-width="auto" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password"/>
                </el-form-item>
            </el-form>
            <el-button type="primary" class="login_btn" @click="handle">登录</el-button>
        </div>
    </div>
  
</template>

<script setup>
import { reactive,ref} from 'vue';
import { useStore } from "vuex"
import {useRouter} from "vue-router"
import {loginapi} from "@/util/requests"
const store=useStore()
const router=useRouter()
const count=ref(store.state.count)
const form=reactive({
    username:"",
    password:"",
})
const rules = reactive({
username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度应该为3-10', trigger: 'blur' },
],
password:[
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 10, message: '长度应该为3-10', trigger: 'blur' },
]})
// const handle=()=>{
//     // store.commit("number/setcount",100)
//     // console.log(store.state.count)
//     store.dispatch("number/setcountPromise",99).then(res=>{
//         alert("修改成功")
//     }).catch(err=>{
//         alert(err)
//     })
//     console.log(store.state.number.count)
//     console.log(store.getters["number/setcountStatus"])
// }
const handle=()=>{
    // store.commit('number/setcount',100)
    // console.log(store.state.number.count)
    // store.commit("uinfo/setuinfo",form)
    // console.log(store.state.uinfo.userinfo)
    // localStorage.setItem("localdata",JSON.stringify(form))
    // router.push({
    //     path:"/user"
    // })
    loginapi(form).then(res=>{
        console.log("username",res)
        if(res.data){
            store.commit("uinfo/setuinfo",res.data)
            localStorage.setItem("localdata",JSON.stringify(res.data))
            // console.log(store.state.uinfo.userinfo.token)
            router.push({
                path:"/item"
            })
        }
    })

}
</script>

<style>
.login_wrap{
    width:100%;
    height:100vh;
    background-color:aqua;
    position:relative;
}
.form_wrap{
    position:fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    padding:30px 50px
    
}
.login_btn{
    display: block;
    margin:auto
}
</style>