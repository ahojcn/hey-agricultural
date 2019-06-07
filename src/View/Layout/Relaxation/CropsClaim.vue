<template>
  <div>
    <Input style="padding-right: 30px" v-model="searchKeywords" search enter-button placeholder="查找想要的植物..." autofocus
           autocomplete/>
    <br/>
    <div v-for="(l, val, num) in search(searchKeywords)" :key="l.productId">
      <Col span="6" style="padding-bottom: 12px">
        <Tooltip theme="light" max-width="200">
          <!-- 文字提示 -->
          <div slot="content">
            {{l.botanyDescription}}
          </div>

          <!-- 商品详细信息 -->
          <Card>
            <img :src="l.botanyIcon" :alt="l.botanyName" style="width: 200px"><br/>
            <Tag color="primary">{{l.botanyName}}</Tag>
            <Tag color="volcano">{{'剩余' + l.botanyNum}}</Tag>
            <br/>

            <div class="addToPackage">
              <InputNumber :min="1" :max="1" v-model="num"></InputNumber>
              <Button type="primary" shape="circle" icon="md-flower"
                      @click="iWantClaimThisCrop(l)">
                我要领养
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
    name: "CropsClaim",
    data() {
      return {
        allCropsList: [], // 所有植物列表
        searchKeywords: '', // 查找关键字
      }
    },
    mounted() {
      this.$Loading.start();
      this.getAllCrops();
      this.$Loading.finish();
    },
    methods: {
      //获取所有植物列表
      getAllCrops() {
        this.$http.post('botany/showAll', {}).then(res => {
          if (res.body.code === 0) {
            this.allCropsList = res.body.data;
          } else {
            this.$Loading.error();
            this.$Message.error(res.body.msg);
          }
        }, err => {
          this.$Loading.error();
          console.log(err);
        })
      },
      // 查找用的函数
      search(keywords) {
        let retArr = [];
        if (keywords === '') {
          return this.allCropsList;
        } else {
          this.allCropsList.forEach(item => {
            if (item.botanyName.indexOf(keywords) !== -1) {
              retArr.push(item);
            }
          })
        }
        return retArr;
      },
      // 点击领养触发函数
      iWantClaimThisCrop(l) {
        this.$http.post('botany/adopt', {
          botanyId: l.botanyId
        }).then(res => {
          if (res.body.code === 0) {
            this.$Message.success('领养' + res.body.msg);
            this.$Message.success('你领养了一个' + l.botanyName);
          } else {
            this.$Message.error(res.body.msg);
          }
        }, err => {
          console.log(err);
        });
      },
    }
  }
</script>

<style scoped>

</style>
