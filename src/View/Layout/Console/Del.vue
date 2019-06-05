<template>
  <div>
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
            filters: [
              {
                label: '水果',
                value: 1
              },
              {
                label: '蔬菜',
                value: 0
              },
              {
                label: '花卉',
                value: 2
              },
              {
                label: '家禽',
                value: 3
              }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
              if (value === 1) {
                return row.categoryType === '水果';
              } else if (value === 0) {
                return row.categoryType === '蔬菜';
              } else if (value === 2) {
                return row.categoryType === '花卉';
              } else {
                return row.categoryType === '家禽';
              }
            }
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
          for (let i = 0; i < res.body.data.length; i++) {
            if (this.allList[i].categoryType === 1) {
              this.allList[i].categoryType = String('水果');
            } else if (this.allList[i].categoryType === 0) {
              this.allList[i].categoryType = String('蔬菜');
            } else if (this.allList[i].categoryType === 2) {
              this.allList[i].categoryType = String('花卉');
            } else {
              this.allList[i].categoryType = String('家禽');
            }
          }
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
      },
      // TODO
      search(searchKeyWords){
        let retArr = [];
        if (searchKeyWords === '') {
          return this.allList;
        } else {
          this.AllList.forEach(item => {
            if (item.productName.indexOf(keywords) !== -1) {
              retArr.push(item);
            }
          })
        }
        return retArr;
      },
    }
  }
</script>

<style scoped>

</style>
