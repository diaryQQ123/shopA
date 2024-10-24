<script setup>
import {reactive, onBeforeMount, onMounted, onBeforeUpdate, onUpdated,ref} from "vue"

</script>

<template>
  <div>
    <router-view></router-view>
  </div>

</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.content{
  width: 100%;
  display: block;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  margin-top:30px;
}
/* .flex-float{
  display:flex;
  justify-content: space-between;
  align-items: center;
}
.flex{
  display: flex;
  align-items: center;
} */
</style>

