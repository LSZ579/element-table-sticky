
/* 组件需要提供parent字段，指定表格的className（字符串） */
const rafThrottle = (fn) => {
  let locked = false;
  return function (...args) {
    if (locked) return;
    locked = true;
    window.requestAnimationFrame(_ => {
      fn.apply(this, args);
      locked = false;
    });
  };
}
export default {
  mounted() {
    this.containerDom = document.getElementsByClassName('main-container')
    this.clearListener()
    let timer = setTimeout(() => {
      this.initFixedHeader()
      clearTimeout(timer)
    }, 300)
    window.addEventListener('resize', this.resizeChange)
  },
  deactivated() {
    this.clearListener()
  },
  beforeDestroy() {
    this.clearListener()
    //取消监听窗口大小
    window.removeEventListener('resize', this.resizeChange)
  },
  activated() {
    this.initFixedHeader()
    this.updateFixedRight()
    window.addEventListener('resize', this.resizeChange)
    let timer
    timer = setTimeout(() => {
      let container = this.containerDom
      if (container[0].scrollTop > 0) {
        container[0].scrollTop = container[0].scrollTop + 2
      }
      clearTimeout(timer)
    }, 1000)
  },
  methods: {
    activatedReload() {
      window.addEventListener('resize', this.resizeChange)
      let timer = setTimeout(() => {
        this.clearFixedStyle()
        this.initFixedHeader()
      }, 300)
      this.timerList.push(timer)
    },
    reset() {
      this.clearFixedStyle()
    },
    // 窗口大小变化时，初始化
    resizeChange() {
      this.headerDragend()
      let timer = setTimeout(() => {
        this.initFixedHeader()
        clearTimeout(timer)
      }, 300)
    },
    async initFixedHeader() {
      if (this.parent) {
        // console.log('启动监听，页面：', this.parent)
        this.parentDom = document.getElementsByClassName(this.parent)
        if (this.parentDom && this.parentDom.length !== 0) {
          this.tableWidth = this.parentDom[0].querySelector('.el-table__header-wrapper').getBoundingClientRect().width
          this.setScrollXWidth()
          this.tableDom = this.parentDom[0].getElementsByClassName('el-table__header-wrapper')
          this.scrollDom = document.querySelector('.main-container')
          this.scrollDom.addEventListener('scroll', this.scrollEvent)
        }
      }
    },
    // 清空监听事件
    clearListener() {
      if (this.scrollDom) {
        this.scrollDom.removeEventListener('scroll', this.scrollEvent)
        window.removeEventListener('resize', this.resizeChange)
        this.clearFixedStyle()
        // console.log('卸载监听,页面：', this.parent)
        this.timerList.forEach(key => {
          clearTimeout(key)
        });
      }
    },
    // 更新右侧固定栏
    updateFixedRight() {
      let { fixedRightHeaderDom, dom } = this.getFixedDom()
      if (dom.classList.contains('fixed')) {
        let timer = setTimeout(() => {
          this.setFixedStyle({
            dom: fixedRightHeaderDom,
            left: this.fixedRightDom[0].getBoundingClientRect().left + 'px',
            width: getComputedStyle(this.fixedRightDom[0]).width,
            scrollLeft: fixedRightHeaderDom.scrollWidth
          })
          clearTimeout(timer)
        }, 100)
      }
    },
    async headerDragend() {
      await this.updateWidth()
      await this.updateFixedRight()
      this.setScrollXWidth()
      // await this.updateHeaderHeight()
    },
    setScrollXWidth() {
      let timer = setTimeout(() => {
        if (!this.parentDom) this.parentDom = document.getElementsByClassName(this.parent)
        if (this.parentDom.length == 0) return
        let dom = this.parentDom[0].querySelector('.el-table__header')
        this.tableWidth = this.parentDom[0].querySelector('.el-table__body-wrapper').getBoundingClientRect().width
        this.tableDom[0].style.width = this.tableWidth + 'px'
        this.updateHeaderHeight()
        this.headerWidth = dom.style.width
        clearTimeout(timer)
      }, 200)
    },
    // 更新表格宽度，（拖拽改变宽度时使用）
    updateWidth() {
      if (!this.parentDom) this.parentDom = document.getElementsByClassName(this.parent)
      const bodyWrapperDom = this.parentDom[0].getElementsByClassName('el-table__body-wrapper')[0]
      const width = getComputedStyle(bodyWrapperDom).width//表格宽度
      // 给表格设置宽度。
      const tableParent = this.tableDom
      for (let i = 0; i < tableParent.length; i++) {
        tableParent[i].style.width = width
      }
    },
    getFixedDom() {
      let fixedRightHeaderDom, fixedRightBox, fixedLeftHeaderDom, fixedLeftBox;
      let dom = this.tableDom[0]
      if (this.fixedLeftDom && this.fixedLeftDom[0]) {
        let lefarr = this.fixedLeftDom[0].children
        fixedLeftHeaderDom = lefarr[0]
        fixedLeftBox = lefarr[1]
      }
      if (this.fixedRightDom && this.fixedRightDom[0]) {
        let rightarr = this.fixedRightDom[0].children
        fixedRightHeaderDom = rightarr[0]
        fixedRightBox = rightarr[1]
      }
      return { fixedRightHeaderDom, fixedRightBox, fixedLeftHeaderDom, fixedLeftBox, dom }
    },
    // 更新表头高度，表头高度有可能改变
    updateHeaderHeight() {
      this.$nextTick(() => {
        this.tableDom = this.parentDom[0].getElementsByClassName('el-table__header-wrapper')
        let obj = this.tableDom[0].getBoundingClientRect()
        if (obj.height != this.tablexy.height) {
          this.tablexy.height = obj.height
          let { dom } = this.getFixedDom()
          if (dom.classList.contains('fixed')) {
            let timer = setTimeout(() => {
              this.parentDom[0].getElementsByClassName('el-table__fixed-body-wrapper')[0].style.top = 0
              let container = this.containerDom
              if (container && container[0]) {
                container[0].scrollTop = container[0].scrollTop + 3;
              }
              clearTimeout(timer)
            }, 100)
          }
        }
      })
    },
    // 获取表格属性
    getTableXy() {
      this.tablexy = this.tableDom[0].getBoundingClientRect()
      this.tablexy.height = this.tableDom[0].offsetHeight
      return this.tablexy
    },
    getDom() {
      if (!this.parentDom) {
        this.parentDom = document.getElementsByClassName(this.parent)
      }
    },
    //滚动事件
    scrollEvent: rafThrottle(async function (e) {
      this.getDom()
      this.tableDom = this.parentDom[0].getElementsByClassName('el-table__header-wrapper')
      if (this.tablexy.top == 0 || !this.tablexy.height || !this.tablexy.top) {
        await this.getTableXy()
      }
      this.fixedRightDom = this.parentDom[0].getElementsByClassName('el-table__fixed-right')
      this.fixedLeftDom = this.parentDom[0].getElementsByClassName('el-table__fixed')
      let { height, top, left } = this.tablexy
      let scrollTop = e.target.scrollTop
      let { fixedRightHeaderDom, fixedRightBox, fixedLeftHeaderDom, fixedLeftBox, dom } = this.getFixedDom()
      if (scrollTop >= height / 2 + top) {
        // 存在右侧固定表头
        if (fixedRightHeaderDom) {
          this.setFixedStyle({
            dom: fixedRightHeaderDom,
            left: this.fixedRightDom[0].getBoundingClientRect().left + 'px',
            width: getComputedStyle(this.fixedRightDom[0]).width,
            scrollLeft: fixedRightHeaderDom.scrollWidth
          })
          fixedRightBox.style.top = 0
        }
        // 左侧固定
        if (fixedLeftHeaderDom) {
          this.setFixedStyle({
            dom: fixedLeftHeaderDom,
            left: left + 'px',
            width: getComputedStyle(this.fixedLeftDom[0]).width,
            scrollLeft: 0
          })
          fixedLeftBox.style.top = 0
        }
        dom.classList.add('fixed')//加一个固定标识
        this.updateWidth()
        dom.style.position = 'fixed'
        dom.style.zIndex = '2000'
        dom.style.top = 0 + 'px'
        dom.style.overflow = 'hidden'
      } else {
        this.clearFixedStyle()
      }
    }),
    //设置固定
    setFixedStyle(data) {
      let { dom, scrollLeft, width, left } = data
      dom.style.zIndex = '2000'
      dom.style.position = 'fixed'
      dom.style.top = '0'
      dom.scrollLeft = scrollLeft
      dom.style.width = width
      dom.style.overflow = 'hidden'
      dom.style.left = left
    },
    // 清除header固定
    clearFixedStyle() {
      if (!this.tableDom) return
      let { height, left } = this.tablexy
      let { dom, fixedRightHeaderDom, fixedRightBox, fixedLeftHeaderDom, fixedLeftBox } = this.getFixedDom()
      if (dom.classList.contains('fixed')) {
        if (fixedRightHeaderDom) {
          fixedRightBox.style.top = height + 'px'
          fixedRightHeaderDom.removeAttribute("style");
        }
        if (fixedLeftHeaderDom) {
          fixedLeftHeaderDom.style.zIndex = '0'
          fixedLeftHeaderDom.style.position = 'static'
          fixedLeftHeaderDom.style.top = 0 + 'px'
          fixedLeftHeaderDom.style.left = left + 'px'
          fixedLeftBox.style.top = getComputedStyle(dom).height
        }
        dom.classList.remove('fixed')
        dom.style.position = 'static'
        dom.style.top = '0'
        dom.style.zIndex = '0'
      }
    },
  },
  computed: {
    __opened() {
      return this.$store.state.app.sidebar.opened
    }
  },
  watch: {
    __opened() {
      this.$nextTick(() => {
        this.setScrollXWidth()
      })
    }
  },
  data() {
    return {
      tablexy: {},//表格的左边宽度信息
      fixedRightDom: null,//右侧
      fixedLeftDom: null,//左侧栏固定
      scrollDom: null,//滚动的dom
      parentDom: null,//表格的父元素dom
      tableWidth: 0,
      timerList: [],
      tableDom: null,
      containerDom: null
    }
  },
}