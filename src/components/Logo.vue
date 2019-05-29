<template>
  <div>
    <transition enter-active-class="flip">
      <img v-if="animate" src="@/assets/logo.png" alt="logo" class="animated">
    </transition>
  </div>
</template>

<script>
  export default {
    name: "Logo",
    data() {
      return {
        animate: false,
      }
    },
    mounted() {
      this.animate = true;
    },
  }
</script>

<style scoped>

</style>
