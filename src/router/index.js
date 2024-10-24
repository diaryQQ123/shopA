import {createRouter,createWebHistory} from "vue-router"
import store from "@/store/index.js"
const routes=[
    {
        path:"/",
        name:"layout",
        component:()=>import("@/views/LayOut/layout.vue"),
        redirect:"/item",
        children:[
            {
                path:"/item",
                name:"itemlists",
                component:()=>import("@/views/Pages/itemlists.vue")
            },
            {
                path:"/user",
                name:"userlists",
                component:()=>import("@/views/Pages/userlists.vue")
            },
            {
                path:"/role",
                name:"rolelists",
                component:()=>import("@/views/Pages/rolelists.vue")
            }
        ]
    },
    {
        path:"/login",
        name:"login",
        component:()=>import("@/views/Pages/login.vue")
    }
];
const routers=createRouter({
    history:createWebHistory(),
    routes
});
//路由守卫
routers.beforeEach((to,from,next)=>{
    if(!store.state.uinfo.userinfo|| !store.state.uinfo.userinfo.username){
        if(to.path==="/login"){
            next()
        }else{
            next("/login")
        }
    }else{
        next()
    }

})
export default routers
