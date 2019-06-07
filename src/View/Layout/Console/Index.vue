<template>
  <div>
    <Row>
      <Col span="6">
        <Card title="管理员" icon="md-person" :padding="0" shadow style="width: 300px;">
          <CellGroup @on-click="clickCell">
            <Cell name="上架新商品" title="上架新商品" label="新增各种商品" to="Add">
              <Icon type="md-arrow-round-up" slot="icon"/>
            </Cell>

            <Cell name="下架商品" title="下架商品" label="下架已有商品" to="Del">
              <Icon type="md-arrow-round-down" slot="icon"/>
            </Cell>

            <Cell name="修改商品信息" title="修改商品信息" label="修改商品信息" to="Modify">
              <Icon type="ios-brush" slot="icon"/>
            </Cell>

            <Cell name="订单查询" title="订单查询" label="查询所有订单状况" to="OrderInfo">
              <Icon type="md-reorder" slot="icon"/>
            </Cell>

            <Cell name="技术帮扶" title="技术帮扶" label="进行在线技术帮扶" to="AdminSupport">
              <Icon type="ios-build" slot="icon"/>
            </Cell>

            <Cell name="实践基地" title="实践基地" label="实践基地内容管理" to="AdminPractice">
              <Icon type="md-egg" slot="icon"/>
            </Cell>

            <Cell name="植物认领" title="植物认领" label="植物认领内容管理" to="AdminCrops">
              <Icon type="md-flower" slot="icon"/>
            </Cell>
          </CellGroup>
        </Card>
      </Col>

      <Col span="18" style="margin-left: -30px">
        <Card>
          <p slot="title">
            <Mallki :text="cardTitle"></Mallki>
          </p>
          <transition enter-active-class="fadeIn" mode="out-in" translate="yes" leave-active-class="fadeOut">
            <router-view v-if="animate" class="animated"></router-view>
          </transition>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  import Mallki from "../../../components/Mallki";
  export default {
    name: "Index",
    components: {Mallki},
    data() {
      return {
        userData: {},
        animate: false, // 动画控制
        cardTitle: '上架新商品', // 卡片头
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
    },
    methods: {
      clickCell(name) {
        // console.log(name);
        this.cardTitle = name;
      }
    }
  }
</script>

<style scoped>

</style>
