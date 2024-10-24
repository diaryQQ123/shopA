<template>
    <div class="common-layout">
        <el-container>
            <el-header class="header flex-float">
                <div class="flex">
                    <img src="../../assets/1.png" class="logo">
                    <h1>商城后台管理系统</h1>
                </div>
                <el-button class="button" type="danger" @click="login_out">退出</el-button>
            </el-header>
            <el-container>
                <el-aside width="200px" class="aside">
                    <el-menu background-color="none" text-color="white" class="custom-menu" :router="true">
                        <el-sub-menu index="1">
                            <template #title>
                                <el-icon><Goods /></el-icon>
                                <span>商品管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/item">商品列表</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-sub-menu index="2">
                            <template #title>
                                <el-icon><UserFilled/></el-icon>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/user">用户列表</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-sub-menu index="3">
                            <template #title>
                                <el-icon><UserFilled/></el-icon>
                                <span>角色管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/role">角色列表</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import { useStore } from "vuex"
import {useRouter} from "vue-router"
const store=useStore()
const router=useRouter()
const login_out=()=>{
    localStorage.removeItem("localdata")
    store.commit("uinfo/setuinfo",{username:"",password:""})
    router.push({
        path:"/login"
    })
    console.log(store.state.uinfo.userinfo)
}
</script>

<style>
.common-layout {
    height:100vh
}
.el-container{
    height:100vh;
    overflow:hidden
}
.header{
    background: rgb(71, 71, 144);
}
.flex-float{
    justify-content: space-between;
    display: flex;
}
.flex{
    display: flex;
}
.aside{
    background: greenyellow;
}
.logo{
    height:50px;
    width:50px;
    margin-top: 5px;
}
h1{
    color:white;
    align-items: center;
    margin-top: 15px;
}
.button{
    margin-top: 15px;  
}
.el-sub-menu__title:hover{
    background-color: transparent !important;
}
.el-menu-item:hover{
    background-color: transparent !important;
}
.el-main{
    background-color: #efefef;
}
</style>