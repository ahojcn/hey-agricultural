<template>
  <div class="main">
    <Row>
      <Col span="12" style="background-color: aqua">
        1
      </Col>
      <Col span="12" style="background-color: aqua">
        1
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
      }
    },
    mounted() {
      if (localStorage.getItem('isLogin') === 'true' && localStorage.getItem('refresh') === '1') {
        localStorage.setItem('refresh', '0');
        this.$router.go(0);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    margin-left: 200px;
    margin-right: 200px;
  }
</style>
