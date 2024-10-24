<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/user' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/user'}" class="title">用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 下方的用户列表 -->
    <div class="content">
      <!-- 搜素框，新增用户 -->
      <div class="input_box">
        <el-input
          v-model="data.searchParams.query"
          style="max-width: 600px"
          placeholder="搜索关键字"
          class="input-with-select"
        >
          <template #append>
            <el-button type="primary" @click="searchList"><el-icon><Search /></el-icon></el-button>
          </template>
        </el-input>
        <el-button type="primary" class="button" @click="addUser">新建用户</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="data.userlist" style="width: 100%">
        <el-table-column prop="username" label="姓名" width="180" />
        <el-table-column prop="email" label="邮箱" width="180" />
        <el-table-column prop="mobile" label="电话" />
        <el-table-column prop="role_name" label="角色" />
        <!-- scope.row 每一条数据 -->
        <!-- scope.row.mg_state每一条数据的状态值 -->
        <el-table-column prop="mg_state" label="状态" >
          <template #default="scope">
            <el-switch v-model="scope.row.mg_state" @change="changeStatus(scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" >
          <template #default="scope">
            <el-button type="primary" @click="editUser(scope.row)">编辑</el-button>
            <el-button type="danger" @click="deleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页符 -->
      <el-pagination
        v-model:current-page="data.searchParams.pagenum"
        v-model:page-size="data.searchParams.pagesize"
        :page-sizes="[5,10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total"
        @size-change="searchList"
        @current-change="searchList"
    />
      <!-- 点击新增用户，弹出来的对话框 -->
      <el-dialog v-model="data.dialogFormVisible" title="新增用户" width="500">
        <el-form :model="data.formdata"
        :rules="rules"
        ref="userForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="data.formdata.username" placeholder="请输入用户名"/>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input v-model="data.formdata.password" type="password" placeholder="请输入用户密码"/>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="data.formdata.email" placeholder="请输入用户邮箱"/>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="data.formdata.mobile" placeholder="请输入手机号"/>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="data.dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm(userForm)">确定</el-button>
          </div>
        </template>
      </el-dialog>
      <!-- 点击编辑用户，弹出来的对话框 -->
      <el-dialog v-model="data.dialogFormVisible1" title="新增用户" width="500">
        <el-form :model="data.formdata1"
        :rules="rules1"
        ref="userForm1">
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="data.formdata1.email" placeholder="请输入用户邮箱"/>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="data.formdata1.mobile" placeholder="请输入手机号"/>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="data.dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm1(userForm1)">确定</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import{ref,reactive} from "vue"
import { userListapi } from "@/util/requests";
import {userAddapi} from "@/util/requests"
import {userChangestatus} from "@/util/requests"
import {userEdit} from "@/util/requests"
import {userDelete} from "@/util/requests"
// const keyword=ref("")
const data=reactive({
  keyword:"",
  searchParams:{
    query:"",
    pagesize:5,
    pagenum:1
  },
  userlist:[],
  dialogFormVisible:false,
  formdata:{
    username:"",
    password:"",
    email:"",
    mobile:"",
  },
  total:0,
  formdata1:{
    id:"",
    email:"",
    mobile:""
  },
  dialogFormVisible1:false
})
//将Form表单初始化一个ref对象，检查Form表单是否符合规则
const userForm=ref()
//将编辑按钮的Form1表单初始化成一个ref对象，检查Form1表单是否符合规则
const userForm1=ref()
//初始化变量total,用在分页器上

const searchList=()=>{
  // console.log(data.searchParams.pagenum)
  // 获取用户列表的api,带着searchParams的参数，展示第一页，数量5个的用户
  userListapi(data.searchParams).then(res=>{
    if(res.data){
      //console.log(res.data)
      data.total=res.data.total
      //拿到被proxy包裹的数组
      data.userlist=res.data.users
      //console.log(data.userlist)
    }
  })

}
//初始化searchList()方法
searchList()
const addUser=()=>{
  data.dialogFormVisible=true
}
//这个是新增用户，关于用户名，用户密码，用户邮箱和手机号的校验
const rules=reactive({
  username:[
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度应该为3-10', trigger: 'blur' },
  ],
  password:[
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度应该为3-10', trigger: 'blur' },
  ],
  email:[
    {required:false,message:"请输入正确的邮箱格式",pattern:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,trigger:"blur"}
  ],
  mobile:[
    {required:false,message:"请输入正确的手机号码",trigger:"blur",pattern:/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/}
  ]
})
//点击修改用户，关于用户邮箱，手机号的校验
const rules1=reactive({
  email:[
    {required:false,message:"请输入正确的邮箱格式",pattern:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,trigger:"blur"}
  ],
  mobile:[
    {required:false,message:"请输入正确的手机号码",trigger:"blur",pattern:/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/}
  ]
})
//这是关于点击新增用户对话框的确定按钮，会将数据存储到后端
const submitForm=(userForm)=>{
  userForm.validate(res=>{
    //表单校验判断
    if(!res){
      return
    }else{
      userAddapi(data.formdata).then(res=>{
        if(res.data){
          data.dialogFormVisible=false
          data.formdata={
            username:"",
            password:"",
            email:"",
            mobile:"",
          }
          searchList()
        }
      })
    }
  })
  // data.dialogFormVisible = false
}
//当点击用户列表的用户状态时，就会改变这个状态的开或关，然后存储到后台
const changeStatus=(row)=>{
  userChangestatus(row).then(res=>{
    if(res.data){
      searchList()
    }
  })
  //console.log(row)
}
//点击编辑按钮，就会编辑用户
const editUser=(row)=>{
  data.dialogFormVisible1=true
  data.formdata1.email=row.email
  data.formdata1.mobile=row.mobile
  data.formdata1.id=row.id
  // userEdit(row).then(res=>{
  //   if(res.data){

  //   }
  // })
}
//这个是关于点击编辑用户对话框的确定按钮，会将数据存储到后端
const submitForm1=(userForm1)=>{
  userForm1.validate(res=>{
    if(!res){
      return
    }else{
      userEdit(data.formdata1).then(res=>{
        if(res.data){
          data.dialogFormVisible1=false,
          data.formdata1={
            email:"",
            mobile:""
          }
          searchList()
        }
      })
    }
  })
}
//这个是点击删除按钮，会请求后端删除对应ID的数据
const deleteUser=(row)=>{
  userDelete(row).then(res=>{
    if(res.meta){
      searchList()
    }
  })
}
</script>

<style scoped>
.title{
  cursor: pointer;
}
.button{
  margin:auto 20px
}
</style>