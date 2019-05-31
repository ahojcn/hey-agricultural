<template>
  <div>
    <Row>
      <Col span="6">
        <Card title="农产品采销" :padding="0" shadow style="width: 300px;">
          <CellGroup>
            <!-- :selected="selected === 1" -->
            <Cell title="水果" label="今日两件特惠！" to="Fruit">
              <Icon type="logo-apple" slot="icon"/>
              <Badge v-if="nowHot.categoryType === 1" text="hot" slot="extra"/>
            </Cell>

            <Cell title="蔬菜" label="新鲜的蔬菜哟，不打农药纯天然！" to="Vegetables">
              <Icon type="logo-pinterest" slot="icon"/>
              <Badge v-show="nowHot.categoryType === 0" text="hot" slot="extra"/>
            </Cell>

            <Cell title="花卉" label="送父母送老师送女友！" to="Flowers">
              <Icon type="md-rose" slot="icon"/>
              <Badge v-if="nowHot.categoryType === 2" text="hot" slot="extra"/>
            </Cell>

            <Cell title="家禽" label="鸡你太美！" to="Poultry">
              <Icon type="logo-freebsd-devil" slot="icon"/>
              <Badge v-if="nowHot.categoryType === 3" text="hot" slot="extra"/>
            </Cell>
          </CellGroup>

          <ShowImages style="padding-bottom: 20px"></ShowImages>

          <div>
            <Card>
              我的订单信息
            </Card>
          </div>
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
  import ShowImages from "@/View/Layout/Home/ShowImages";

  export default {
    name: 'Home',
    components: {ShowImages},
    data() {
      return {
        animate: false,
        userData: null,
        selected: 1,
        nowHot: {},
      }
    },
    mounted() {
      this.$Loading.start();
      this.animate = true;

      // 如果已经登录 并且 没有刷新就刷新一次
      if (localStorage.getItem('isLogin') === 'true' && localStorage.getItem('refresh') === '1') {
        localStorage.setItem('refresh', '0');
        this.$router.go(0);
      }

      // 登陆后获取用户信息，并显示欢迎信息
      this.userData = JSON.parse(localStorage.getItem('userData'));
      if (this.userData !== null) {
        this.$Message.success('你好，' + this.userData.userName);
      }

      // 获取热门点击
      this.$http.post('category/click', {}).then(res => {
        this.nowHot = res.body.data;
      }, err => {
        this.$Loading.error();
        this.$Message.error('Home/ 获取热门失败，服务器异常');
        console.log(err);
      });

      this.$Loading.finish();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
