<template>
  <div class="table-container-box">
    <div class="self-table">
      <el-table
        :data="tableData"
        ref="multipleTable"
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
        <el-table-column
          width="150px"
          fixed="right"
          label="操作"
          align="center"
        >
          <template>
            <el-button type="text">详情</el-button>
            <el-button type="text">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <sidebarWidth>
      <virtualScroll
        @scrollChange="scrollChange"
        :tableWidth="tableWidth"
        :width="headerWidth"
      ></virtualScroll>
    </sidebarWidth>
  </div>
</template>

<script>
import { genID } from "@/utils";
import sticky from "@/utils/table-sticky";
import sidebarWidth from "@/components/sidebarWidth";
import virtualScroll from "@/components/virtualScroll";
export default {
  name: "Dashboard",
  components: {
    sidebarWidth,
    virtualScroll,
  },
  props: {
    parent: {
      type: String,
      default: "",
    },
    default: "",
  },
  data() {
    return {
      tableColumns: [],
      tableData: [],
      headerWidth: 0,
    };
  },
  mixins: [sticky],
  mounted() {
    this.tableData[0] = {};
    for (let i = 0; i < 40; i++) {
      this.tableData[0]["data" + i] = genID(5);
      this.tableColumns.push({
        prop: "data" + i,
        label: "标签" + i,
      });
    }
    for (let k = 1; k < 40; k++) {
      this.tableData.push({ ...this.tableData[0], id: genID(6) });
    }
    this.$nextTick(() => {
      this.setScrollXWidth();
    });
  },
  methods: {
    scrollChange(x) {
      this.$refs.multipleTable.bodyWrapper.scrollLeft = x;
    },
  },
};
</script>

<style lang="scss" scoped>
.table-container-box {
  background-color: #fff;
  box-sizing: border-box;
  padding-bottom: 70px;
}
</style>
