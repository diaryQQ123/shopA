<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/role' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/role'}" class="title">角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 下方的用户列表 -->
     <div class="content">
        <el-button type="primary" class="button" @click="addRole">新建角色</el-button>
     </div>
     <!-- 表格 -->
    <el-table :data="data.userlist" style="width: 100%">
        <el-table-column prop="roleName" label="角色名" width="380" />
        <el-table-column prop="roleDesc" label="角色描述" width="380" />
        <el-table-column label="操作" >
          <template #default="scope">
            <el-button type="primary" @click="editRole(scope.row)">编辑</el-button>
            <el-button type="danger" @click="deleteRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>

    <!-- 当点击新增角色时，会弹出下面的对话框 -->
    <el-dialog v-model="data.dialogFormVisible" title="新增用户" width="500">
        <el-form :model="data.formdata"
        :rules="rules"
        ref="roleForm">
          <el-form-item label="角色名" prop="roleName">
            <el-input v-model="data.formdata.roleName" placeholder="请输入角色名"/>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="data.formdata.roleDesc"  placeholder="请输入角色描述"/>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="data.dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm(roleForm)">确定</el-button>
          </div>
        </template>
    </el-dialog>
    <!-- 当点击编辑按钮的时候，会弹出下面的对话框 -->
    <el-dialog v-model="data.dialogFormVisible1" title="新增用户" width="500">
        <el-form :model="data.formdata1"
        :rules="rules"
        ref="roleForm1"
        >
          <el-form-item label="角色名" prop="roleName">
            <el-input v-model="data.formdata1.roleName" placeholder="请输入角色名"/>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="data.formdata1.roleDesc"  placeholder="请输入角色描述"/>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="data.dialogFormVisible1 = false">取消</el-button>
            <el-button type="primary" @click="submitForm1(roleForm1)">确定</el-button>
          </div>
        </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {reactive,ref} from "vue"
import {getRolelist} from "@/util/requests"
import {roleAddapi} from "@/util/requests"
import {roleEditapi} from "@/util/requests"
import {roleDeleteapi} from "@/util/requests"
const roleForm=ref()
const roleForm1=ref()
const data=reactive({
    userlist:[],
    dialogFormVisible:false,
    formdata:{
        roleName:"",
        roleDesc:""
    },
    dialogFormVisible1:false,
    formdata1:{
        roleName:"",
        roleDesc:"",
        id:""
    }
})
// 获取角色列表
const searchList=()=>{
    getRolelist().then(res=>{
        if(res.data){
            data.userlist=res.data
        }
    })
}
//新增角色
const addRole=()=>{
    data.dialogFormVisible=true
}
//校验输入的角色名和角色描述是否符合规范
const rules=reactive({
    roleName:[
        { required: true, message: '请输入角色名', trigger: 'blur' },
        { min: 3, max: 10, message: '长度应该为3-10', trigger: 'blur' },
    ],
    roleDesc:[
        { required: false, message: '请输入角色描述', trigger: 'blur' },
    ]
})
//如果输入的角色名和角色描述符合规范，就会请求后端接口将前端输入的数据保存到后端的数据库，同时重新刷新页面
//新增角色的确认按钮
const submitForm=(roleForm)=>{
    roleForm.validate(res=>{
        if(!res){
            return
        }else{
            // console.log(res)//响应true
            roleAddapi(data.formdata).then(res=>{
                if(res.data){
                    data.dialogFormVisible=false,
                    data.formdata={
                        roleName:"",
                        roleDesc:""
                    }
                    searchList()
                }
            })
        }
    })
};
//点击编辑按钮
const editRole=(row)=>{
    data.dialogFormVisible1=true
    data.formdata1.roleName=row.roleName
    data.formdata1.roleDesc=row.roleDesc
    data.formdata1.id=row.id
}
//点击编辑对话框的确认按钮，会将前端数据存储后端数据，带上id
//编辑角色的确认按钮
const submitForm1=(roleForm1)=>{
    roleForm1.validate(res=>{
        if(!res){
            return
        }else{
            roleEditapi(data.formdata1).then(res=>{
                if(res.data){
                    data.dialogFormVisible1=false
                    data.formdata1={
                        roleName:"",
                        roleDesc:"",
                    }
                    searchList()
                }
            })
            }
        })
}
//点击删除按钮
const deleteRole=(row)=>{
    roleDeleteapi(row).then(res=>{
        if(res.meta){
            searchList()
        }
    })
}
searchList()
</script>

<style scope>
.title{
    cursor: pointer;
}
</style>