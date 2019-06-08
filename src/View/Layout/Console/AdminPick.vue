<template>
  <div>
    <Row>
      <div v-for="l in allPickList" :key="l.pickId">
        <Col span="6">
          <Tooltip theme="light" max-width="200">
            <!-- 文字提示 -->
            <div slot="content">
              {{l.productDescription}}
            </div>

            <!-- 详细信息 -->
            <Card>
              <img :src="l.productIcon" :alt="l.productName" style="width: 200px"><br/>
              <Tag color="primary">{{l.productName}}</Tag>
              <Tag color="volcano">{{'价格' + l.productPrice}}</Tag>
              <br/>
              <Tag color="pink">{{'用户' + l.pickUser}}</Tag>
              <Tag color="green">{{'时间' + new Date(l.pickTime).toLocaleDateString()}}</Tag>
              <br/>
              <Button type="warning" @click="calcelHisPick(l)">取消他的预约</Button>
            </Card>
          </Tooltip>
        </Col>
      </div>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "AdminPick",
    data() {
      return {
        // 所有用户预约的采摘信息
        allPickList: [],
      }
    },
    mounted() {
      this.$Loading.start();
      // 获取所有的采摘预约信息
      this.getAllPickList();
      this.$Loading.finish();
    },
    methods: {
      // 获取所有的预约信息
      getAllPickList() {
        this.$http.post('pick/checkShow', {}).then(res => {
          if (res.body.code === 0) {
            this.allPickList = res.body.data;
          } else {
            this.$Message.error(res.body.msg);
            this.$Loading.error();
          }
        }, err => {
          console.log(err);
          this.$Loading.error();
          this.$Message.error('服务器异常')
        });
      },
      // 取消用户的预约
      calcelHisPick(l) {
        this.$http.post('pick/checkOne', {
          pickId: l.pickId,
          checkStatus: 3
        }).then(res => {
          if (res.body.code === 0) {
            this.$Message.success(res.body.msg);
          } else {
            this.$Message.error(res.body.msg);
            this.$Loading.error();
          }
        }, err => {
          this.$Message.error('服务器异常');
          console.log(err);
          this.$Loading.error();
        });
      },
    }
  }
</script>

<style scoped>

</style>
