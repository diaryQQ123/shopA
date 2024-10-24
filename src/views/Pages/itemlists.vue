<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/item' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/item'}" class="title">商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 下方的用户列表 -->
    <div class="content">
      <!-- 搜索框，搜索图标，新增商品 -->
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
      </div>
      <!-- 商品列表 -->
      <el-table :data="data.goodlist" style="width: 100%">
        <el-table-column prop="goods_name" label="商品名" width="180" />
        <el-table-column prop="goods_price" label="价格($)" width="180" />
        <el-table-column prop="goods_weight" label="重量(KG)" />
        <el-table-column prop="goods_state" label="商品状态">
          <template #default="scope">
            <p>{{ switchState(scope.row.goods_state) }}</p>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页符 -->
      <el-pagination
        v-model:current-page="data.searchParams.pagenum"
        v-model:page-size="data.searchParams.pagesize"
        :page-sizes="[5,10,20,100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total"
        @size-change="searchList"
        @current-change="searchList"
    />
    </div>
  </div>
</template>

<script setup>
import {ref,reactive} from "vue"
import { getGoodlist } from "@/util/requests";
const data=reactive({
  goodlist:[],
  searchParams:{
    query:"",
    pagenum:1,
    pagesize:10
  },
  total:0

})
const searchList=()=>{
  getGoodlist(data.searchParams).then(res=>{
    if(res.data){
      data.total=res.data.total
      data.goodlist=res.data.goods
    }
  })
}
searchList()
const switchState=(state)=>{
  switch(state){
    case 0:
      return "未通过"
      break;
    case 1:
      return "审核中"
      break;
    case 2:
      return "已审核"
      break;
  }
}
</script>

<style>
.button{
  margin:auto 20px;
}
</style>