<template>
  <div class="table-container-box">
    <div class="form">
       <el-input v-model="input" placeholder="请输入内容" style="width:300px"></el-input>
        <el-button type="primary" style="margin-left:15px">搜索</el-button>
    </div>

    <div class="self-table">
      <el-table
        :data="tableData"
        ref="multipleTable"
        @header-dragend="setWidth"
        :header-cell-style="{ background: '#eee' }"
        border
        row-key="id"
        style="width: 100%"
      >
        <el-table-column
          align="center"
          fixed="left"
          type="selection"
          width="40"
          :reserve-selection="true"
        ></el-table-column>
        <el-table-column
          v-for="(row, index) in tableColumns"
          :key="index"
          :prop="row.prop"
          :label="row.label"
        ></el-table-column>
        <el-table-column width="150px" fixed="right" label="操作" align="center">
          <template>
            <el-button type="text">详情</el-button>
            <el-button type="text">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pages  @scrollChange="scrollChange"    fixed
      :tableWidth="tableWidth"
      :limit.sync="limit"
      :page.sync="page"
      :total="total"  :width="headerWidth"></Pages>
  </div>
</template>

<script>
import { genID } from '@/utils'
import stacky from '@/utils/table-sticky'

import Pages from '@/components/page.vue'
export default {
  name: 'Dashboard',
  components: {
    Pages
  },
  data() {
    return {
      tableColumns: [],
      tableData: [],
      headerWidth: 0,
      parent: 'self-table',
      page:1,
      limit:30,
      total:60,
      input:''
    }
  },
  mixins: [stacky],
  mounted() {
    this.tableData[0] = {}
    for (let i = 0; i < 40; i++) {
      this.tableData[0]['data' + i] = genID(5)
      this.tableColumns.push({
        prop: 'data' + i,
        label: '标签' + i
      })
    }
    for (let k = 1; k < 40; k++) {
      this.tableData.push({ ...this.tableData[0], id: genID(6) })
    }
  },
  methods: {
    scrollChange(x) {
      this.$refs.multipleTable.bodyWrapper.scrollLeft = x
    },
    setWidth() {
      this.headerDragend()
    },
  }
}
</script>

<style lang="scss" scoped>
.table-container-box {
  background-color: #fff;
  padding: 20px;
  margin: 10px;
  box-sizing: border-box;
  padding-bottom: 70px;
  .form{
    margin: 15px 0 20px 0;
  }
}
</style>
