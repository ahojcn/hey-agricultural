<template>
  <div>
    <Row>
      <Col span="6">
        <!-- TODO 功能具体实现 -->
        <Card title="管理员" icon="md-person" :padding="0" shadow style="width: 300px;">
          <CellGroup>
            <Cell title="上架新商品" label="新增各种商品" to="Add">
              <Icon type="md-arrow-round-up" slot="icon"/>
            </Cell>

            <Cell title="下架商品" label="下架已有商品" to="Del">
              <Icon type="md-arrow-round-down" slot="icon"/>
            </Cell>

            <Cell title="修改商品信息" label="修改商品信息" to="Modify">
              <Icon type="ios-brush" slot="icon"/>
            </Cell>

            <Cell title="订单查询" label="查询所有订单状况" to="Find">
              <Icon type="md-reorder" slot="icon"/>
            </Cell>
          </CellGroup>
        </Card>
      </Col>

      <Col span="18" style="margin-left: -30px">
        <transition enter-active-class="fadeIn" mode="out-in" translate="yes" leave-active-class="fadeOut">
          <router-view v-if="animate" class="animated"></router-view>
        </transition>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        userData: {},
        animate: false, // 动画控制
      }
    },
    mounted() {
      this.$Loading.start();
      this.animate = true; // 动画
      this.userData = JSON.parse(localStorage.getItem('userData'));
      if (this.userData.userIsman !== 0) { // 如果不是管理员，跳转到首页
        this.$router.push('/');
      }

      this.$Loading.finish();
    }
  }
</script>

<style scoped>

</style>
