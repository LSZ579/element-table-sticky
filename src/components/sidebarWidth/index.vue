<template>
  <div :class="{ 'default-ani': 1, 'sidebar-ani': sidebar }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar.opened
    }
  },
}
</script>

<style lang="scss" scoped>
.sidebar-ani {
  left: 210px !important;
  width: calc(100% - 200px) !important;
}
.default-ani {
  background-color: #fff;
  display: flex;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
  flex-wrap: wrap;
  position: fixed;
  bottom: 0;
  right: 0;
  width: calc(100% - 50px);
  left: 55px;
  z-index: 99;
  padding: 15px 10px 20px 0px;
  justify-content: space-between;
  transition: left 0.2s ease-in-out;
}
</style>