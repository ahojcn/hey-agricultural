<template>
  <div>
    <div v-for="l in list" :key="l.productId">
      <Col span="8" style="padding-right: 5px; padding-bottom: 12px">
        <Tooltip theme="light" max-width="200">
          <!-- 文字提示 -->
          <div slot="content">
            {{l.productDescription}}
          </div>

          <!-- TODO: fix 显示bug-->
          <!-- 商品详细信息 -->
          <Card>
            <img :src="l.productIcon" :alt="l.productName" style="width: 300px"><br/>
            价格：{{l.productPrice}}<br/>
            库存：{{l.productStock}}<br/>
          </Card>
        </Tooltip>
      </Col>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Fruit",
    data() {
      return {
        list: [],
      }
    },
    mounted() {
      this.$Loading.start();

      // 每次调到此组件就给蔬菜增加一个热门点击
      this.$http.post('category/click', {
        category: 1
      }).then(res => {
        //
      }, err => {
        this.$Loading.error();
        this.$Message.error('Fruit/ 增加热门点击error');
        console.log(err);
      });

      // 获取 水果 商品列表
      this.$http.post('product/findByCategory', {
        categoryType: 1
      }).then(res => {
        this.list = res.body.data;
      }, err => {
        this.$Loading.error();
        this.$Message.error('fruit error');
        console.log(err);
      });

      this.$Loading.finish();
    }
  }
</script>

<style scoped>

</style>
