<template>
  <div>
  </div>
</template>

<script>
  export default {
    name: "pay",
    data() {
      return {}
    },
    mounted() {
      this.$Loading.start();
      this.$Message.success('支付成功！');
      setInterval(() => {
        this.$router.push('/');
      }, 1000);
      this.$Loading.finish();
    }
  }
</script>

<style scoped>

</style>
