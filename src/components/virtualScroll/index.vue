<template>
  <div class="scroll" ref="scrollX" :style="{ width: tableWidth + 'px' }">
    <div class="scorll-x" :style="{ width }"></div>
  </div>
</template>
<script>
export default {
  name:'Vir',
  props: {
    width: {
      type: [Number, String],
      default: 0
    },
    tableWidth: {
      type: [Number, String],
      default: 0
    },
    parentDom: {
      type: HTMLCollection,
    },
  },
  data() {
    return {
      allWidth: ''
    }
  },
  mounted() {
    let scroll = this.$refs.scrollX
    scroll.addEventListener('scroll', this.scrollX, true)

  },
  beforeDestroy() {
    let scroll = this.$refs.scrollX
    scroll.removeEventListener('scroll', this.scrollX)
  },
  computed: {
    widthPx() {
      return typeof this.headerWidth === 'string' ? this.headerWidth : this.headerWidth + 'px'
    }
  },
  methods: {
    scrollX(e) {
      let left = e.target.scrollLeft
      this.$emit('scrollChange', left)
    },
  }
}
</script>
<style lang="scss" scoped>
.scroll {
  width: calc(100% - 71px);
  overflow: auto;
  margin: 0 auto;
  margin-bottom: 10px;

  .scorll-x {
    height: 1px;
    display: block;
  }
}
</style>