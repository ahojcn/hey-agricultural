<template>
  <div>
    <Row>
      <Col span="6">
        <Card title="农产品采销" :padding="0" shadow style="width: 300px;">
          <CellGroup>
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
        </Card>

        <Card title="购物车" v-if="isLogin === true" style="width: 300px;">
          <CellGroup v-for="item in shoppingPackage" :key="item.productInfo.productId">
            <Cell>
              {{item.productInfo.productName}}
              应付{{item.productInfo.productPrice * item.productNum}}
              <Button type="text" @click="handleCellClick(item)">详情</Button>
            </Cell>
          </CellGroup>
          <Page :total="shoppingPackageLength" size="small" show-total show-sizer simple/>
        </Card>
      </Col>
      <Col span="18" style="margin-left: -30px">
        <transition enter-active-class="fadeIn" mode="out-in" translate="yes" leave-active-class="fadeOut">
          <router-view v-if="animate" class="animated"></router-view>
        </transition>
      </Col>
    </Row>

    <Affix :offset-bottom="20" style="margin-left: 85%">
      <!-- TODO 添加点击事件-->
      <Button type="warning" shape="circle" icon="ios-cart">我的购物车</Button>
      <!--  -->
      <Dropdown v-show="isLogin === true">
        <a href="javascript:void(0)">
          <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
        </a>
        <DropdownMenu slot="list">
          <router-link to="/SelfCenter">
            <DropdownItem name="selfCenter">个人中心</DropdownItem>
          </router-link>
        </DropdownMenu>
      </Dropdown>
    </Affix>
  </div>
</template>

<script>
  import ShowImages from "@/View/Layout/Home/ShowImages";

  export default {
    name: 'Home',
    components: {ShowImages},
    data() {
      return {
        animate: false, // 动画控制
        userData: null, // 用户信息
        nowHot: {}, // 当前热门
        isLogin: false, // 是否已经登录
        shoppingPackage: {}, // 购物车信息
        shoppingPackageLength: 0, // 数量
      }
    },
    mounted() {
      this.$Loading.start();
      this.animate = true;
      this.isLogin = JSON.parse(localStorage.getItem('isLogin'));

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

      // 如果已经登录，请求订单信息，如果未登录则不请求
      if (this.isLogin === true) {
        this.$http.post('shopping/list', {}).then(res => {
          this.shoppingPackage = res.body.data;
          this.shoppingPackageLength = res.body.data.length;
        }, err => {
          this.$Loading.error();
          console.log('Home : 请求订单信息失败');
          console.log(err);
        })
      }

      this.$Loading.finish();
    },
    methods: {
      handleCellClick(item) {
        this.$Modal.info({
          title: '订单详情',
          content: `编号：${item.productInfo.productId}<br/>
                    名称：${item.productInfo.productName}<br/>
                    数量：${item.productNum}<br/>
                    单价：${item.productInfo.productPrice}<br/>
                    描述：${item.productInfo.productDescription}<br/>`
        });
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
