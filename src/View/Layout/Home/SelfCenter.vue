<template>
  <div style="padding-left: 300px; padding-right: 300px">
    <Card shadow>
      <p slot="title">个人中心</p>
      <div>
        <Col span="8">
          ID：{{userData.userId}}<br/>
          用户名：{{userData.userName}}<br/>
          手机号：{{userData.userPhone}}
        </Col>
        <Col span="6">
          <img src="https://i.loli.net/2017/08/21/599a521472424.jpg" alt="touxiang" style="width: 50%">
        </Col>
        <Col span="10">
          <Upload
            multiple
            type="drag"
            action="https://sm.ms/api/upload"
            style="width: 300px"
            :multiple="false"
            :data="uploadData">
            <div style="padding: 20px 0;">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>修改头像，拖拽或选择上传！</p>
            </div>
          </Upload>
        </Col>
      </div>
      <p>
        修改用户信息<br/>修改用户信息<br/>修改用户信息<br/>
      </p>
    </Card>

    <Divider/>
    <!-- 购物车 -->
    <div>
      <Card shadow>
        <p slot="title">购物车</p>
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
  </div>
</template>

<script>
  export default {
    name: "SelfCenter",
    data() {
      return {
        userData: {},
        uploadData: {
          smfile: 'touxiang',
        },
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
        shoppingPackageFormInfo: [] // 购物车表格信息
      }
    },
    mounted() {
      this.$Loading.start();
      this.userData = JSON.parse(localStorage.getItem('userData'));
      this.$Loading.finish();

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
    }
  }
</script>

<style scoped>

</style>
