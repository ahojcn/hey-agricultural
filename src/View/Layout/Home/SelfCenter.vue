<template>
  <div style="padding-left: 300px; padding-right: 300px">
    <Card shadow>
      <p slot="title">个人中心</p>
      <div>
        <Row>
          <Col span="3">
            <img :src="userData.userIcon" alt="touxiang" style="width: 90%">
          </Col>
          <Col span="8">
            账号：{{userData.userId}}<br/>
            用户名：{{userData.userName}}<br/>
            手机号：{{userData.userPhone}}
          </Col>
        </Row>
      </div>
    </Card>

    <Collapse accordion>
      <Panel name="所有订单">
        所有订单
        <div slot="content">
          <Card shadow>
            <Table stripe ref="selection" height="500" :columns="myOrderFormTitle"
                   :data="myOrder"></Table>
            <br/>
            <Button type="primary" @click="handleSelectAll(true)">全选</Button>
            <Button type="primary" @click="handleSelectAll(false)">全不选</Button>
            <Button type="primary" @click="exportData(1)">
              <Icon type="ios-download-outline"></Icon>
              导出订单数据
            </Button>
          </Card>
        </div>
      </Panel>
      <Panel name="购物车">
        购物车
        <div slot="content">
          <Card shadow>
            <Table stripe ref="selection" height="500" :columns="shoppingPackageFormTitle"
                   :data="shoppingPackageFormInfo"></Table>
            <br/>
            <Button type="primary" @click="handleSelectAll(true)">全选</Button>
            <Button type="primary" @click="handleSelectAll(false)">全不选</Button>
            <Button type="primary" @click="exportData(1)">
              <Icon type="ios-download-outline"></Icon>
              导出购物车数据
            </Button>
          </Card>
        </div>
      </Panel>
      <Panel name="预约实践">
        预约实践
        <div slot="content" v-if="myPractice !== []" v-for="item in myPractice" :key="item.baseId">
          <Poptip trigger="hover" word-wrap width="220" :title="item.baseName" :content="item.baseDescription"
                  placement="right">
            <Card style="margin-bottom: 20px">
              <div>
                <Row>
                  <Col span="8">
                    <h4>
                      实践基地编号：{{item.baseId}}<br/>
                      地点：{{item.baseAddress}}<br/>
                      开始时间：{{new Date(item.baseStart).toLocaleDateString()}}<br/>
                      结束时间：{{new Date(item.baseEnd).toLocaleDateString()}}<br/>
                      实践人数：{{item.baseJoin}}<br/>
                      剩余人数：{{item.baseMaxpeople - item.baseJoin}}
                    </h4>
                  </Col>
                  <Col span="16">
                    <img :src="item.baseIcon" alt="实践基地图片" style="width: 100%">
                  </Col>
                </Row>
              </div>
            </Card>
          </Poptip>
        </div>
      </Panel>
      <Panel name="植物领养">
        植物领养
        <div slot="content">
          <div v-for="(l, val, num) in myClaimCrops" :key="l.productId">
            <Tooltip theme="light" max-width="200">
              <!-- 文字提示 -->
              <div slot="content">
                {{l.botanyDescription}}
              </div>

              <!-- 详细信息 -->
              <Card>
                <img :src="l.botanyIcon" :alt="l.botanyName" style="width: 200px"><br/>
                <Tag color="primary">{{l.botanyName}}</Tag>
                <Tag color="volcano">{{'剩余' + l.botanyNum}}</Tag>
              </Card>
            </Tooltip>
          </div>
        </div>
      </Panel>
    </Collapse>

  </div>
</template>

<script>
  import Mallki from "../../../components/Mallki";

  export default {
    name: "SelfCenter",
    components: {Mallki},
    data() {
      return {
        userData: {},
        uploadData: {
          smfile: 'touxiang',
        },
        myOrder: [], // 我的订单信息
        myOrderFormTitle: [
          {
            type: 'selection',
            width: 30,
            align: 'center'
          },
          {
            title: '日期',
            key: 'createTime',
            align: 'center',
            width: '200'
          },
          {
            title: '价格',
            key: 'orderAmount',
            align: 'center'
          },
          {
            title: '订单ID',
            key: 'orderId',
            align: 'center'
          },
          {
            title: '支付状态',
            key: 'payStatus',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Tag', {
                  props: {
                    color: params.row.payStatus === 0 ? 'red' : 'green'
                  },
                }, params.row.payStatus === 0 ? '未付款' : '已付款')
              ]);
            }
          },
          {
            title: '订单状态',
            key: 'orderStatus',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Tag', {
                  props: {
                    color: params.row.payStatus === 0 ? 'red' : 'green'
                  },
                }, params.row.payStatus === 0 ? '未完结' : '已完结')
              ]);
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 180,
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
                      this.more(params.index)
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                    display: params.row.payStatus === 0 ? '' : 'none' // 没有支付才显示
                  },
                  on: {
                    click: () => {
                      this.newPay(params.index)
                    }
                  }
                }, '支付'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.cancelOrder(params.index)
                    }
                  }
                }, '取消'),
              ]);
            }
          }],
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
            title: '操作',
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

        // 我预约的实践
        myPractice: [],
        // 我领养的植物列表
        myClaimCrops: [],
      }
    },
    mounted() {
      this.$Loading.start();
      this.userData = JSON.parse(localStorage.getItem('userData'));

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

      // 如果已经登录，请求订单信息，如果未登录则不请求
      if (this.isLogin === true) {
        this.$http.post('shopping/list', {}).then(res => {
          if (res.body.code === 0) {
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
          } else {
            this.$Message.warning('购物车空空如也哦~');
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

        // 获取自己的所有订单
        this.$http.post('order/allListByBuyerId', {
          buyerId: this.userData.userId
        }).then(res => {
          this.myOrder = res.body.data;
          for (let i = 0; i < res.body.data.length; ++i) {
            this.myOrder[i].createTime = new Date(this.myOrder[i].createTime).toLocaleString();
          }
        }, err => {
          console.log(err);
        });

        this.$Loading.finish();
      }

      // 获取我预约的实践
      this.getMyPractice();
      // 获取我领养的植物
      this.getMyClaimCrops();

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
      },
      more(i) {
        this.$Modal.info({
          title: '订单详情',
          content: `订单编号：${this.myOrder[i].orderId}<br/>
                    用户：${this.myOrder[i].buyerId}<br/>
                    时间：${this.myOrder[i].createTime}<br/>
                    价钱：${this.myOrder[i].orderAmount}<br/>
                    状态：${this.myOrder[i].payStatus === 0 ? '未支付' : '已支付'}<br/>
                    `
        });
      },
      newPay(i) {
        // 0表示等待支付，1表示已经支付
        if (this.myOrder[i].payStatus === 1) {
          this.$Message.success('已支付');
        } else {
          this.$Message.success('订单ID' + this.myOrder[i].orderId);
          this.$Message.success('正在跳转支付...');
          this.$http.post('pay/affirmPay', {
            masterOrderId: this.myOrder[i].orderId
          }).then(resp => {
            window.location.href = resp.url
              + '?masterOrderId='
              + this.myOrder[i].orderId;
          }, errp => {
            console.log(errp);
            this.$Loading.error();
          })
        }
      },
      cancelOrder(i) {
        console.log(this.myOrder[i]);
        this.$http.post('order/cancel', {
          orderMasterId: this.myOrder[i].orderId
        }).then(res => {
          if (res.body.code === 0) {
            this.$Message.success(res.body.msg);
          } else {
            this.$Message.error(res.body.msg);
          }
        }, err => {
          console.log(err);
        });
      },
      // 获取预约的实践
      getMyPractice() {
        // 获取我预约了的实践
        this.$http.post('practice/showAllPractice', {}).then(res => {
          if (res.body.code === 0) {
            this.myPractice = res.body.data;
          } else {
            this.$Loading.error();
          }
        }, err => {
          this.$Loading.error();
          console.log(err);
        });
      },
      // 获取所有我领养的植物
      getMyClaimCrops() {
        this.$http.post('botany/showMyAll', {}).then(res => {
          if (res.body.code === 0) {
            this.myClaimCrops = res.body.data;
          } else {
            this.$Loading.error();
            this.$Message.error(res.body.msg);
          }
        }, err => {
          this.$Loading.error();
          console.log(err);
        })
      },
    }
  }
</script>

<style scoped>

</style>
