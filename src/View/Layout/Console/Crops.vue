<template>
  <div>
    <Tabs>
      <TabPane label="新增" style="padding-left: 10px">
        <Row>
          <Col span="12">
            <Form ref="addCrops" :model="addCrops" style="width: 300px">
              <FormItem prop="botanyId">
                <Input type="text" v-model="addCrops.botanyId" placeholder="领养Id，一个数字"></Input>
              </FormItem>
              <FormItem prop="botanyName">
                <Input type="text" v-model="addCrops.botanyName" placeholder="植物名称"></Input>
              </FormItem>
              <FormItem prop="botanyDescription">
                <Input type="textarea" v-model="addCrops.botanyDescription" placeholder="描述"></Input>
              </FormItem>
              <FormItem prop="botanyNum">
                库存
                <InputNumber :min="1" :value="addCrops.botanyNum" placeholder="植物图片，上传后会自动显示"></InputNumber>
              </FormItem>
              <FormItem prop="botanyIcon">
                <Input disabled type="text" v-model="addCrops.botanyIcon" placeholder="植物图片，上传后会自动显示"></Input>
              </FormItem>
              <FormItem style="width: 300px">
                <input type="file" ref="uploadImg" style="width: 180px"></input>
                <Button type="text" @click="uploadProductIcon">
                  <Mallki text="点击上传"></Mallki>
                </Button>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="handleAddCrop()">点击新增</Button>
              </FormItem>
            </Form>
          </Col>
          <Col span="12">
            <img :src="addCrops.botanyIcon" alt="植物图片，上传后在这里显示">
          </Col>
        </Row>
      </TabPane>
      <TabPane label="删除" style="padding-left: 10px">
        <Select v-model="selected" style="width:200px">
          <Option v-for="item in allCrops" :value="item.botanyId" :key="item.botanyName">{{ item.botanyName }}</Option>
        </Select>
        <Button type="error" @click="deleteCrops">删除它</Button>
        <br/>
        ID：{{selected}}
      </TabPane>
      <TabPane label="修改" style="padding-left: 10px">
        <Row>
          <Col span="12">
            <Select v-model="selected" style="width:300px">
              <Option v-for="item in allCrops" :value="item.botanyId" :key="item.botanyName">{{ item.botanyName }}</Option>
            </Select>
            <br/>
            ID：{{selected}}
            <Form ref="addCrops" :model="addCrops" style="width: 300px">
              <FormItem prop="botanyName">
                <Input type="text" v-model="addCrops.botanyName" placeholder="植物名称"></Input>
              </FormItem>
              <FormItem prop="botanyDescription">
                <Input type="textarea" v-model="addCrops.botanyDescription" placeholder="描述"></Input>
              </FormItem>
              <FormItem prop="botanyNum">
                库存
                <InputNumber :min="1" :value="addCrops.botanyNum" placeholder="植物图片，上传后会自动显示"></InputNumber>
              </FormItem>
              <FormItem prop="botanyIcon">
                <Input disabled type="text" v-model="addCrops.botanyIcon" placeholder="植物图片，上传后会自动显示"></Input>
              </FormItem>
              <FormItem style="width: 300px">
                <input type="file" ref="uploadImg" style="width: 180px"></input>
                <Button type="text" @click="uploadProductIcon">
                  <Mallki text="点击上传"></Mallki>
                </Button>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="handleChangeCrops()">点击修改</Button>
              </FormItem>
            </Form>
          </Col>
          <Col span="12">
            <img :src="addCrops.botanyIcon" alt="植物图片，上传后在这里显示">
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import uploadImg from 'smms';
  import Mallki from "../../../components/Mallki";

  export default {
    name: "Crops",
    components: {Mallki},
    data() {
      return {
        // 增加领养植物的信息
        addCrops: {
          botanyId: '', //植物Id(随便给)
          botanyName: '', //名称：String
          botanyIcon: '', // 图片：String
          botanyNum: 1, // 植物库存:Integer
          botanyDescription: '', // 植物描述:String
        },
        // 所有植物列表
        allCrops: [],
        // 选择的植物
        selected: '',
      }
    },
    mounted() {
      this.$Loading.start();
      // 获取所有植物列表
      this.getAllCrops();

      this.$Loading.error();
    },
    methods: {
      // 新增植物触发函数
      handleAddCrop() {
        if (this.addCrops.botanyId === ''
          || this.addCrops.botanyName === ''
          || this.addCrops.botanyIcon === ''
          || this.addCrops.botanyNum <= 1
          || this.addCrops.botanyDescription === '') {
          this.$Message.error('请填写完整的表单');
          return;
        }
        this.$http.post('botany/add', {
          botanyId: this.addCrops.botanyId,
          botanyName: this.addCrops.botanyName,
          botanyIcon: this.addCrops.botanyIcon,
          botanyNum: this.addCrops.botanyNum,
          botanyDescription: this.addCrops.botanyDescription,
        }).then(res => {
          if (res.body.code === 0) {
            this.$Message.success(res.body.msg);
          } else {
            this.$Message.error(res.body.msg);
          }
        }, err => {
          console.log(err);
          this.$Message.error('服务器异常');
        });
      },
      // 上传图片
      uploadProductIcon() {
        // console.log(this.$refs.uploadImg.files[0])
        this.$Loading.start();
        if (this.$refs.uploadImg.files.length === 0) {
          this.$Message.error('请选择一个图片文件');
          this.$Loading.error();
          return;
        }
        uploadImg(this.$refs.uploadImg.files[0]).then(res => {
          this.addCrops.botanyIcon = res.data.url;
        });
        this.$Loading.finish();
      },
      // 获取所有植物列表
      getAllCrops() {
        this.$http.post('botany/showAll', {}).then(res => {
          this.allCrops = res.body.data;
        }, err => {
          console.log(err);
        });
      },
      // 点击删除触发函数
      deleteCrops() {
        this.$http.post('botany/delete', {
          botanyId: this.selected
        }).then(res => {
          if (res.body.code === 0) {
            this.$Message.success(res.body.msg);
          } else {
            this.$Loading.error();
            this.$Message.error(res.body.msg);
          }
        }, err => {
          this.$Message.error('服务器异常');
          this.$Loading.error();
          console.log(err);
        });
      },
      // 点击修改触发函数
      handleChangeCrops() {
        if (this.addCrops.botanyId === ''
          || this.addCrops.botanyName === ''
          || this.addCrops.botanyIcon === ''
          || this.addCrops.botanyNum <= 1
          || this.addCrops.botanyDescription === '') {
          this.$Message.error('请填写完整的表单');
          return;
        }
        this.$http.post('botany/add', {
          botanyId: this.selected,
          botanyName: this.addCrops.botanyName,
          botanyIcon: this.addCrops.botanyIcon,
          botanyNum: this.addCrops.botanyNum,
          botanyDescription: this.addCrops.botanyDescription,
        }).then(res => {
          if (res.body.code === 0) {
            this.$Message.success(res.body.msg);
          } else {
            this.$Message.error(res.body.msg);
          }
        }, err => {
          console.log(err);
          this.$Message.error('服务器异常');
        });
      },
    },
  }
</script>

<style scoped>

</style>
