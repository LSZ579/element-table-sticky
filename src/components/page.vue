<template>
  <div :class="{'fixed-btn': fixed , 'sidebar': fixed&&sidebar }">
    <virtualScroll @scrollChange="scrollChange" :tableWidth="tableWidth" :width="width"></virtualScroll>
    <div class="flex">
        <div class="left"><slot></slot></div>
    <div class="right">
      <el-pagination
        background
        :page-sizes="[30, 50, 80, 100]"
        :current-page="page"
        layout="total, sizes, prev, pager, next,slot"
        :page-size="limit"
        @size-change="sizeChange"
        @current-change="currentChange"
        :total="total"
      >
        <span style="marg">
          前往
          <el-input class="self_input" size="mini" @keyup.enter.native="toPage" v-model="pages"></el-input>页
          <span @click="toPage" class="go">前往</span>
        </span>
      </el-pagination>
    </div>
    </div>
    
  </div>
</template>

<script>
import virtualScroll from '@/components/virtualScroll'
export default {
  name:'pages',
  components:{virtualScroll},
  props: {
    width:{
       type: [String,Number],
      default: 0
    },
    tableWidth:{
       type: [String,Number],
      default: 0
    },
    limit: {
      type: Number,
      default: 30
    },
    page: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    // 是否固定底部
    fixed: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      pages: 1
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar.opened
    }
  },
  methods: {
    scrollChange(x){
      this.$emit('scrollChange',x)
    },
    sizeChange(e) {
      this.$emit('update:limit', e)
    },
    currentChange(e) {
      this.pages = e
      this.$emit('update:page', e)
    },
    toPage() {
      let page = this.total / this.limit
      let reslove = page == parseInt(page) ? page : parseInt(page) + 1
      if (this.pages > reslove) {
        this.pages = reslove;
      }
      this.$emit('update:page', Number(this.pages))
    }
  }
}
</script>

<style lang="scss" scoped>
.self_input {
  width: 48px;
  margin: 0 5px;
}
.go {
  background-color: #66b1ff;
  padding: 0 15px;
  line-height: 28px;
  height: 28px;
  border-radius: 3px;
  color: #fff;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
}
.sidebar {
  left: 210px !important;
  width: calc(100% - 210px) !important;
}
.fixed-btn {
  background-color: #fff;
 
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
  position: fixed;
  bottom: 0;
  right: 0;
  width: calc(100% - 55px);
  left: 55px;
  z-index: 99;
  padding: 15px 0 20px 0;
 
  transition: left 0.2s ease-in-out;
  .flex{
     display: flex;
     flex-wrap: wrap;
      justify-content: space-between;
  }
  .right {
    display: flex;
    align-items: center;
    margin-right: 30px;
    &-item {
      // margin-left: 10px;
      font-size: 15px;
      color: #252525;
      span {
        font-weight: bold;
      }
    }
  }
}
</style>