<template>
  <div>
    <div class="top" style="padding-bottom: 30px">
      <Col span="12">
        <Breadcrumb separator=">" style="padding-bottom: 10px">
          当前位置：
          <BreadcrumbItem to="/">农产品采销</BreadcrumbItem>
          <BreadcrumbItem to="/Fruit">蔬菜</BreadcrumbItem>
        </Breadcrumb>
      </Col>
      <Col span="12">
        <Input style="padding-right: 70px" v-model="searchKeywords" search enter-button placeholder="查找..." autofocus
               autocomplete/>
      </Col>
    </div>

    <div v-for="(l, val, num) in search(searchKeywords)" :key="l.productId">
      <Col span="6" style="padding-bottom: 12px">
        <Tooltip theme="light" max-width="200">
          <!-- 文字提示 -->
          <div slot="content">
            {{l.productDescription}}
          </div>
          {{num}}

          <!-- 商品详细信息 -->
          <Card>
            <img :src="l.productIcon" :alt="l.productName" style="width: 200px"><br/>
            <Tag color="primary">{{l.productName}}</Tag>
            <Tag color="red">{{l.productPrice}}￥</Tag>
            <Tag color="volcano">{{'库存' + l.productStock}}</Tag>
            <br/>

            <div class="addToPackage">
              <InputNumber v-model="num"></InputNumber>
              <Button type="primary" shape="circle" icon="ios-cart"
                      @click="addGoodsToPackage(l, num)">
                加入购物车
              </Button>
            </div>
          </Card>
        </Tooltip>
      </Col>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Vegetables",
    data() {
      return {
        AllList: [],
        numberOfSelect: 0,
        isLogin: false,
        searchKeywords: '', // 查找关键字
      }
    },
    mounted() {
      this.$Loading.start();
      // 获取是否已经登录
      this.isLogin = JSON.parse(localStorage.getItem('isLogin'));
      // 每次调到此组件就给水果增加一个热门点击
      // this.$http.post('category/click', {
      //   category: 1
      // }).then(res => {
      //   //
      // }, err => {
      //   this.$Loading.error();
      //   this.$Message.error('Fruit/ 增加热门点击error');
      //   console.log(err);
      // });

      // 获取 水果 商品列表
      this.$http.post('product/findByCategory', {
        categoryType: 0
      }).then(res => {
        this.AllList = res.body.data;
      }, err => {
        this.$Loading.error();
        this.$Message.error('fruit error');
        console.log(err);
      });

      this.$Loading.finish();
    },
    methods: {
      // 添加商品到购物车
      // l.productId 商品ID    num 商品数量
      addGoodsToPackage(l, num) {
        this.$Loading.start();

        // 如果没有登录
        if (this.isLogin === false) {
          this.$Loading.error();
          this.$Message.error('请登录，正在跳转至登录页面...');
          this.$router.push('Login');
          return;
        }

        if (num === undefined) {
          num = 1;
        }

        this.$http.post('shopping/add', {
          productId: l.productId,
          count: num
        }).then(res => {
          if (res.body.code === 0) {
            this.$Message.success('购物车' + l.productName + '+' + num);
            this.$Loading.finish();
          } else {
            this.$Message.error('添加失败');
            this.$Loading.error();
          }
        }, err => {
          console.log(err);
          this.$Message.error('服务器异常');
          this.$Loading.error();
        });
        this.$Loading.finish();
      },
      search(keywords) {
        let retArr = [];
        if (keywords === '') {
          return this.AllList;
        } else {
          this.AllList.forEach(item => {
            if (item.productName.indexOf(keywords) !== -1) {
              retArr.push(item);
            }
          })
        }
        return retArr;
      },
    },
  }
</script>

<style scoped>
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
  }
</style>
