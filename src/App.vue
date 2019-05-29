<template>
  <div id="app">

    <router-view></router-view>

  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        animate: false, // 动画控制
      }
    },
    mounted() {

      this.animate = true;

      // 配置全局的 message
      this.$Message.config({
        top: 200, // 和顶部距离
        duration: 5 // 显示时长
      });

    },
    beforeDestroy() { // vm实例销毁前，执行一些处理操作
    }
  }
</script>

<style>
</style>
