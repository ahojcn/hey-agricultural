<template>
  <div>
    <Table stripe :columns="allOrderListTitle" :data="allOrderList"></Table>
  </div>
</template>

<script>
  export default {
    name: "OrderInfo",
    data() {
      return {
        allOrderList: [],
        allOrderListTitle: [
          {
            title: '客户名',
            key: 'buyerId',
            align: 'center',
          },
          {
            title: '订单ID',
            key: 'orderId',
            align: 'center',
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
                    color: params.row.orderStatus === 0 ? 'red' : 'green'
                  },
                }, params.row.orderStatus === 0 ? '未收货' : '已收货')
              ]);
            }
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
                  on: {
                    click: () => {
                      this.finishOrder(params.index)
                    }
                  }
                }, '完结'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '5px'
                  },
                  on: {
                    click: () => {
                      this.cancelOrder(params.index)
                    }
                  }
                }, '取消')
              ]);
            }
          },
        ],
      }
    },
    mounted() {
      // 获取所有订单
      this.$Loading.start();
      this.$http.post('order/allList', {}).then(res => {
        if (res.body.code === 0) {
          this.allOrderList = res.body.data;
        } else {
          this.$Message.error(res.body.msg);
          this.$Loading.error();
        }
      }, err => {
        this.$Loading.error();
        console.log(err);
      });
      this.$Loading.finish();
    },
    methods: {
      // 完结订单
      finishOrder(index) {
        this.$http.post('order/finish', {
          orderMasterId: this.allOrderList[index].orderId
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
      cancelOrder(index) {
        this.$http.post('order/cancelOrder', {
          orderMasterId: this.allOrderList[index].orderId
        }).then(res => {
          if (res.body.code === 0) {
            this.$Message.success(res.body.msg);
          } else {
            this.$Message.error(res.body.msg);
          }
        }, err => {
          console.log(err);
        });
      }
    },
  }
</script>

<style scoped>

</style>
