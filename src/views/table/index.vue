<template>
  <div class="app-container">
  <el-tabs v-model="activeName">
    <el-tab-pane label="用户管理" name="first" lazy>
        <div class="first-table" v-if="activeName=='first'">
          <TableList key="first"  parent="first-table"></TableList>
        </div>
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second" lazy>
      <div class="second-table" v-if="activeName=='second'">
          <TableList key="second" parent="second-table"></TableList>
        </div>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import TableList from './table.vue'
export default {
  components:{
    TableList
  },
  data() {
    return {
      activeName:'first'
    }
  },
  created() {

  },
  methods: {
 
  }
}
</script>
<style scoped>
.app-container{
  background-color: #fff;
  margin: 10px;
}
</style>