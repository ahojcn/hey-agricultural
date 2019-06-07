<template>
  <div>
    <Row>
      <Col span="12">
        <h3>增加实践基地信息</h3>
        <Form style="width: 400px;" ref="formInline" :model="formInline">
          <FormItem prop="baseName">
            <Input type="text" v-model="formInline.baseName" placeholder="实践基地名称"></Input>
          </FormItem>
          <FormItem prop="baseAddress">
            <Input type="text" v-model="formInline.baseAddress" placeholder="实践基地地址"></Input>
          </FormItem>
          <FormItem prop="baseDescription">
            <Input type="textarea" v-model="formInline.baseDescription" placeholder="实践基地描述"></Input>
          </FormItem>
          <FormItem prop="baseMaxpeople">
            最多参加人数
            <InputNumber :min="0" type="textarea" v-model="formInline.baseMaxpeople" placeholder="已经加入人数"></InputNumber>
          </FormItem>
          <FormItem prop="baseJoin">
            已经加入人数
            <InputNumber :min="0" :max="formInline.baseMaxpeople" type="textarea" v-model="formInline.baseJoin"
                         placeholder="已经加入人数"></InputNumber>
          </FormItem>
          <FormItem prop="baseStart">
            开始时间
            <DatePicker format="yyyy-MM-dd HH:mm:ss" :value="formInline.baseStart" type="date" placeholder="Select date"
                        style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem prop="baseEnd">
            结束时间
            <DatePicker format="yyyy-MM-dd HH:mm:ss" :value="formInline.baseEnd" type="date" placeholder="Select date"
                        style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem prop="baseEnd">
            上传实践基地图片
            <Input disabled type="text" v-model="formInline.baseIcon" placeholder="实践基地图片，上传后自动填写"></Input>
            <input type="file" ref="uploadImg" style="width: 130px"></input>
            <Button type="text" @click="uploadProductIcon">
              <Mallki text="点击上传"></Mallki>
            </Button>
          </FormItem>

          <FormItem>
            <Button type="primary" @click="handleSubmit()">点击增加</Button>
          </FormItem>
        </Form>
      </Col>
      <Col span="12">
        <h3>修改实践基地信息</h3>
        <Form style="width: 400px;" ref="formInline" :model="changeBaseData">
          <FormItem prop="baseId">
            <Select v-model="selectedBaseId">
              <Option v-for="item in allBaseIdList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <div v-if="selectedBaseId !== ''">
              已选择的实践编号：{{selectedBaseId}}<br/>
            </div>
          </FormItem>
          <FormItem prop="baseName">
            <Input type="text" v-model="changeBaseData.baseName" placeholder="实践基地名称"></Input>
          </FormItem>
          <FormItem prop="baseAddress">
            <Input type="text" v-model="changeBaseData.baseAddress" placeholder="实践基地地址"></Input>
          </FormItem>
          <FormItem prop="baseDescription">
            <Input type="textarea" v-model="changeBaseData.baseDescription" placeholder="实践基地描述"></Input>
          </FormItem>
          <FormItem prop="baseMaxpeople">
            最多参加人数
            <InputNumber :min="0" type="textarea" v-model="changeBaseData.baseMaxpeople"
                         placeholder="已经加入人数"></InputNumber>
          </FormItem>
          <FormItem prop="baseJoin">
            已经加入人数
            <InputNumber :min="0" :max="changeBaseData.baseMaxpeople" type="textarea" v-model="changeBaseData.baseJoin"
                         placeholder="已经加入人数"></InputNumber>
          </FormItem>
          <FormItem prop="baseStart">
            开始时间
            <DatePicker format="yyyy-MM-dd HH:mm:ss" :value="changeBaseData.baseStart" type="date"
                        placeholder="Select date"
                        style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem prop="baseEnd">
            结束时间
            <DatePicker format="yyyy-MM-dd HH:mm:ss" :value="changeBaseData.baseEnd" type="date"
                        placeholder="Select date"
                        style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem prop="baseEnd">
            上传实践基地图片
            <Input disabled type="text" v-model="changeBaseData.baseIcon" placeholder="实践基地图片，上传后自动填写"></Input>
            <input type="file" ref="uploadImg2" style="width: 130px"></input>
            <Button type="text" @click="uploadProductIcon">
              <Mallki text="点击上传"></Mallki>
            </Button>
          </FormItem>

          <FormItem>
            <Button type="primary" @click="handleChangeBaseData()">点击增加</Button>
          </FormItem>
        </Form>
      </Col>
      <Divider orientation="left">删除实践基地信息</Divider>
      <Select v-model="selectedBaseId" style="width: 300px">
        <Option v-for="item in allBaseIdList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Button type="error" @click="handleDeleteBase">删除实践信息</Button>
      <div v-if="selectedBaseId !== ''">
        已选择的实践编号：{{selectedBaseId}}<br/>
      </div>
    </Row>
  </div>
</template>

<script>
  import Mallki from "../../../components/Mallki";
  import uploadImg from 'smms';

  export default {
    name: "Practice",
    components: {Mallki},
    data() {
      return {
        formInline: {
          baseName: '', // 基地名称：String
          baseAddress: '', // 基地地址：String
          baseDescription: '', //  基地描述：String
          baseJoin: 0, // 已参加人数：Integer
          baseMaxpeople: 0, // 最多参加人数：Integer
          baseStart: new Date(), // 开始时间：Date
          baseEnd: new Date(), // 结束时间：Date
          baseIcon: '',// 实践基地图：String
        },
        changeBaseData: {
          baseId: '', // 实践基地Id
          baseName: '', // 基地名称：String
          baseAddress: '', // 基地地址：String
          baseDescription: '', //  基地描述：String
          baseJoin: 0, // 已参加人数：Integer
          baseMaxpeople: 0, // 最多参加人数：Integer
          baseStart: new Date(), // 开始时间：Date
          baseEnd: new Date(), // 结束时间：Date
          baseIcon: '',// 实践基地图：String
        },
        selectedBaseId: '', // 已经选择的baseId
        allBaseIdList: [], // 所有的实践基地Id
      }
    },
    mounted() {
      this.$Loading.start();
      // 获取所有的实践信息
      this.$http.post('practice/showAll', {}).then(res => {
        if (res.body.code === 0) {
          let allList = res.body.data;
          for (let i = 0; i < res.body.data.length; ++i) {
            let j = {value: allList[i].baseId, label: allList[i].baseName};
            this.allBaseIdList.push(j);
          }
        } else {
          this.$Loading.error();
          console.log(res.body.msg);
        }
      }, err => {
        console.log(err);
      });
      this.$Loading.finish();
    },
    methods: {
      handleSubmit() {
        this.$Loading.start();
        this.$http.post('practice/add', {
          baseName: this.formInline.baseName, // 基地名称：String
          baseAddress: this.formInline.baseAddress, // 基地地址：String
          baseDescription: this.formInline.baseDescription, //  基地描述：String
          baseJoin: this.formInline.baseJoin, // 已参加人数：Integer
          baseMaxpeople: this.formInline.baseMaxpeople, // 最多参加人数：Integer
          baseStart: this.formInline.baseStart.getTime(), // 开始时间：Date
          baseEnd: this.formInline.baseEnd.getTime(), // 结束时间：Date
          baseIcon: this.formInline.baseIcon,// 实践基地图：String
        }).then(res => {
          if (res.body.code === 0) {
            this.$Message.success(res.body.msg);
          } else {
            this.$Loading.error();
            this.$Message.error(res.body.msg);
          }
        }, err => {
          this.$Loading.error();
          console.log(err);
        });
        this.$Loading.finish();
      },
      handleChangeBaseData() {
        this.$Loading.start();
        this.$http.post('practice/add', {
          baseId: this.changeBaseData.baseId,
          baseName: this.changeBaseData.baseName, // 基地名称：String
          baseAddress: this.changeBaseData.baseAddress, // 基地地址：String
          baseDescription: this.changeBaseData.baseDescription, //  基地描述：String
          baseJoin: this.changeBaseData.baseJoin, // 已参加人数：Integer
          baseMaxpeople: this.changeBaseData.baseMaxpeople, // 最多参加人数：Integer
          baseStart: this.changeBaseData.baseStart.getTime(), // 开始时间：Date
          baseEnd: this.changeBaseData.baseEnd.getTime(), // 结束时间：Date
          baseIcon: this.changeBaseData.baseIcon,// 实践基地图：String
        }).then(res => {
          if (res.body.code === 0) {
            this.$Message.success(res.body.msg);
          } else {
            this.$Loading.error();
            this.$Message.error(res.body.msg);
          }
        }, err => {
          this.$Loading.error();
          console.log(err);
        });
        this.$Loading.finish();
      },
      uploadProductIcon() {
        // console.log(this.$refs.uploadImg.files[0])
        this.$Loading.start();
        if (this.$refs.uploadImg.files.length === 0) {
          this.$Message.error('请选择一个图片文件');
          this.$Loading.error();
          return;
        }
        uploadImg(this.$refs.uploadImg.files[0]).then(res => {
          this.formInline.baseIcon = res.data.url;
        });
        this.$Loading.finish();
      },
      handleDeleteBase() {
        this.$Loading.start();
        if (this.selectedBaseId === '') {
          this.$Message.error('没有选择');
          return;
        }
        this.$http.post('practice/delete', {
          practiceBaseId: this.selectedBaseId
        }).then(res => {
          if (res.body.code === 0) {
            this.$Message.success(res.body.msg);
          } else {
            this.$Loading.error();
            this.$Message.error(res.body.msg);
          }
        }, err => {
          console.log(err);
          this.$Loading.error();
        });
        this.$Loading.finish();
      },
    }
  }
</script>

<style scoped>

</style>
