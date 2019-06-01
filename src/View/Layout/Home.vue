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

          <ShowImages></ShowImages>
        </Card>

        <Card :title="'购物车：' + account + '￥'" v-if="isLogin === true" style="width: 300px;">
          <!-- TODO 支付按钮点击事件 -->
          <Col span="12">
            <Button type="success" icon="logo-usd">支付{{account}}元</Button>
          </Col>
          <Col span="12">
            <Button type="warning" icon="ios-cart" @click="shoppingPackageDetail = !shoppingPackageDetail">我的购物车
            </Button>
          </Col>
          <CellGroup v-for="item in shoppingPackage" :key="item.productInfo.productId">
            <Cell>
              {{item.productInfo.productName}}
              应付：{{item.productInfo.productPrice * item.productNum}}￥
              <Button type="text" @click="handleCellClick(item)" style="float: left">
                <Mallki text="详情"></Mallki>
              </Button>
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

    <!-- 购物车抽屉 -->
    <div>
      <Drawer title="我的购物车" placement="left" v-model="shoppingPackageDetail" width="42">
        <br/>
        <Table stripe ref="selection" height="500" :columns="shoppingPackageFormTitle"
               :data="shoppingPackageFormInfo"></Table>
        <br/>
        <Button type="primary" @click="handleSelectAll(true)">全选</Button>
        <Button type="primary" @click="handleSelectAll(false)">全不选</Button>
        <Button type="primary" @click="exportData(1)">
          <Icon type="ios-download-outline"></Icon>
          导出购物车数据
        </Button>
      </Drawer>
    </div>

    <!-- 浮动在右下角的购物车按钮和个人中心下拉菜单 -->
    <Affix :offset-bottom="20" style="margin-left: 85%">
      <Button type="warning" shape="circle" icon="ios-cart" @click="shoppingPackageDetail=!shoppingPackageDetail">
        我的购物车
      </Button>
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
  import Mallki from "@/components/Mallki";

  export default {
    name: 'Home',
    components: {Mallki, ShowImages},
    data() {
      return {
        animate: false, // 动画控制
        userData: null, // 用户信息
        nowHot: {}, // 当前热门
        isLogin: false, // 是否已经登录
        shoppingPackage: {}, // 购物车信息
        shoppingPackageLength: 0, // 数量
        account: 0, // 购物车应支付价钱
        shoppingPackageDetail: false, // 是否显示我的购物车（抽屉）
        shoppingPackageFormTitle: [ // 购物车表格头
          {
            type: 'selection',
            width: 30,
            align: 'center'
          },
          {
            title: '名称',
            key: 'productName'
          },
          {
            title: '单价',
            key: 'productPrice'
          },
          {
            title: '数量',
            key: 'productNum'
          },
          {
            title: '总价',
            key: 'total'
          },
          {
            title: '删除',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '-1')
              ]);
            }
          }
        ],
        shoppingPackageFormInfo: [], // 购物车表格信息
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
          // 处理成表格形式
          for (let i = 0; i < this.shoppingPackageLength; i++) {
            let temp = {productName: '', productPrice: 0, productNum: 0, total: 0, id: ''};
            temp.productName = this.shoppingPackage[i].productInfo.productName;
            temp.productPrice = this.shoppingPackage[i].productInfo.productPrice;
            temp.productNum = this.shoppingPackage[i].productNum;
            temp.total = temp.productNum * temp.productPrice;
            temp.id = this.shoppingPackage[i].productInfo.productId;
            this.shoppingPackageFormInfo.push(temp);
          }
        }, err => {
          this.$Loading.error();
          console.log('Home : 请求订单信息失败');
          console.log(err);
        });

        // 获取购物车结算价格
        this.$http.post('shopping/amount', {}).then(res => {
          this.account = res.body.data;
        }, err => {
          this.$Loading.error();
          console.log('Home : 获取总价钱失败');
          console.log(err)
        });
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
      },
      handleSelectAll(status) {
        this.$refs.selection.selectAll(status);
      },
      exportData(type) {
        this.$refs.table.exportCsv({
          filename: 'The original data'
        });
      },
      show(index) {
        this.$Modal.info({
          title: '订单详情',
          content: `编号：${this.shoppingPackage[index].productInfo.productId}<br/>
                    名称：${this.shoppingPackage[index].productInfo.productName}<br/>
                    数量：${this.shoppingPackage[index].productNum}<br/>
                    单价：${this.shoppingPackage[index].productInfo.productPrice}<br/>
                    描述：${this.shoppingPackage[index].productInfo.productDescription}<br/>`
        });
      },
      remove(index) { // 从购物车删除元素
        this.$http.post('shopping/delete', {
          productId: this.shoppingPackageFormInfo[index].id
        }).then(res => {

        }, err => {
          console.log('从购物车删除元素失败');
          console.log(err);
        });

        this.shoppingPackageFormInfo[index].productNum -= 1;
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
