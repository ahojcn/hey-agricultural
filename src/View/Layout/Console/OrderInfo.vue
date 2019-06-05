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
            title: '订单状态',
            key: 'orderStatus',
            align: 'center',
          },
          {
            title: '支付状态',
            key: 'payStatus',
            align: 'center',
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
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '修改')
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

    },
  }
</script>

<style scoped>

</style>
