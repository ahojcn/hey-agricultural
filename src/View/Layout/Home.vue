<template>
  <div style="margin-left: 50px">
    <Top></Top>
    <Row>
      <Col span="6">
        <Card title="农产品采销" :padding="0" shadow style="width: 300px;">
          <CellGroup>

            <Cell title="水果" label="今日两件特惠！" to="Fruit">
              <Icon type="logo-apple" slot="icon"/>
            </Cell>

            <Cell title="蔬菜" label="新鲜的蔬菜哟，不打农药纯天然！">
              <Icon type="logo-pinterest" slot="icon"/>
            </Cell>

            <Cell title="花卉" label="送父母送老师送女友！">
              <Icon type="md-rose" slot="icon"/>
              <Badge text="hot" slot="extra"/>
            </Cell>

            <Cell title="家禽" label="鸡你太美！">
              <Icon type="logo-freebsd-devil" slot="icon"/>
            </Cell>
          </CellGroup>
        </Card>
      </Col>
      <Col span="18">
        <transition enter-active-class="fadeIn" mode="out-in" translate="yes" leave-active-class="fadeOut">
          <router-view v-if="animate" class="animated"></router-view>
        </transition>
      </Col>
    </Row>
  </div>
</template>

<script>
  import Top from "@/View/Layout/Home/Top";
  export default {
    name: 'Home',
    components: {Top},
    data() {
      return {
        animate: false,
        userData: null,
      }
    },
    mounted() {
      this.$Loading.start();
      this.animate = true;

      if (localStorage.getItem('isLogin') === 'true' && localStorage.getItem('refresh') === '1') {
        localStorage.setItem('refresh', '0');
        this.$router.go(0);
      }

      this.userData = JSON.parse(localStorage.getItem('userData'));
      if (this.userData !== null) {
        this.$Message.success('你好，' + this.userData.userName);
      }

      this.$Loading.finish();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
