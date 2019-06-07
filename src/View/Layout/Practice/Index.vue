<template>
  <div style="padding-left: 10%; padding-right: 10%">

    <Row>
      <Col span="8">
        <div v-for="item in allList" :key="item.baseId">
          <Poptip trigger="hover" word-wrap width="220" :title="item.baseName" :content="item.baseDescription"
                  placement="right">
            <Card style="width:320px; margin-bottom: 20px">
              <p slot="title">{{item.baseName}}</p>
              <p slot="extra">
                <Icon type="ios-loop-strong"></Icon>
                {{item.baseId}}
              </p>
              <div>
                <h4>
                  地点：{{item.baseAddress}}<br/>
                  开始时间：{{new Date(item.baseStart).toLocaleDateString()}}<br/>
                  结束时间：{{new Date(item.baseEnd).toLocaleDateString()}}<br/>
                  实践人数：{{item.baseJoin}}<br/>
                  剩余人数：{{item.baseMaxpeople - item.baseJoin}}
                </h4>
                <img :src="item.baseIcon" alt="实践基地图片" style="width: 100%">
              </div>
            </Card>
          </Poptip>
        </div>
      </Col>
      <Col span="16">
        <Card style="margin-bottom: 20px">
          <p slot="title">实践预约</p>
          <Select v-model="selected" style="width:200px">
            <Option v-for="item in idList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button @click="addPractice" type="primary" shape="circle" icon="md-checkmark">提交</Button>
          <div v-if="selected !== ''">
            已选择的实践编号：{{selected}}<br/>
          </div>
        </Card>

        <div v-for="item in myPractice" :key="item.baseId">
          <Poptip trigger="hover" word-wrap width="220" :title="item.baseName" :content="item.baseDescription"
                  placement="right">
            <Card style="margin-bottom: 20px">
              <p slot="title">我预约的实践</p>
              <p slot="extra">
                <Icon type="ios-loop-strong"></Icon>
                {{item.baseId}}
              </p>
              <div>
                <Row>
                  <Col span="8">
                    <h4>
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
      </Col>
    </Row>

  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        allList: [], // 获取所有的信息

        idList: [], // 实践ID数组
        selected: '', // 预约实践选择的实践ID

        myPractice: [] // 我预约的实践
      }
    },
    mounted() {
      this.$Loading.start();

      // 获取所有的实践信息
      this.$http.post('practice/showAll', {}).then(res => {
        if (res.body.code === 0) {
          this.allList = res.body.data;
          for (let i = 0; i < res.body.data.length; ++i) {
            let j = {value: this.allList[i].baseId, label: this.allList[i].baseName};
            this.idList.push(j);
          }
        } else {
          this.$Loading.error();
          console.log(res.body.msg);
        }
      }, err => {
        console.log(err);
      });

      // 获取我预约了的实践
      this.$http.post('practice/showAllPractice', {}).then(res => {
        console.log(res);
        if (res.body.code === 0) {
          this.myPractice = res.body.data;
        } else {
          this.$Loading.error();
        }
      }, err => {
        this.$Loading.error();
        console.log(err);
      });

      this.$Loading.finish();
    },
    methods: {
      addPractice() {
        this.$Loading.start();
        if (this.selected === '') {
          this.$Message.error('请选择需要预约的实践基地');
          return;
        }
        this.$http.post('practice/addPractice', {
          practiceBaseId: this.selected
        }).then(res => {
          if (res.body.code === 0) {
            this.$Message.success(res.body.msg);
          } else {
            this.$Message.error(res.body.msg);
          }
        }, err => {
        });
        this.$Loading.finish();
      }
    },
  }
</script>

<style scoped>

</style>
