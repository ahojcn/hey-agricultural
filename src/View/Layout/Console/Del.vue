<template>
  <div>
    <h1>
      删除商品
    </h1>
    <Input v-model="searchKeywords" search enter-button placeholder="查找..." autofocus
           autocomplete/>
    <Table stripe :columns="allListTitle" :data="allList"></Table>
  </div>
</template>

<script>
  export default {
    name: "Del",
    data() {
      return {
        searchKeywords: '',
        allList: [],
        allListTitle: [
          {
            title: '商品名',
            key: 'productName',
            align: 'center',
          },
          {
            title: '商品ID',
            key: 'productId',
            align: 'center',
          },
          {
            title: '商品类型',
            key: 'categoryType',
            align: 'center',
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
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除此商品')
              ]);
            }
          },
        ],
      }
    },
    mounted() {
      this.$Loading.start();
      this.$http.post('product/list', {}).then(res => {
        if (res.body.code === 0) {
          this.allList = res.body.data;
        } else {
          this.$Message.error(res.body.msg);
        }
      }, err => {
        this.$Loading.error();
        console.log(err);
      });
      this.$Loading.finish();
    },
    methods: {
      remove(index) {
        // this.allList[index].productId
        this.$Loading.start();
        this.$http.post('product/delete', {
          productId: this.allList[index].productId
        }).then(res => {
          this.$Message.success(res.body.msg);
        }, err => {
          console.log(err);
          this.$Message.error('delete err');
          this.$Loading.error();
        });
        this.$Loading.finish();
      }
    }
  }
</script>

<style scoped>

</style>
