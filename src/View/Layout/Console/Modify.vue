<template>
  <div>
    <h1>
      修改商品信息
    </h1>
    <Table stripe :columns="allListTitle" :data="allList"></Table>

    <div>
      <Drawer title="修改商品信息" placement="left" v-model="modifySomeThing" width="55">
        <br/>
        <div>
          <Row>
            <Col span="12">
              <Form ref="formInline" :model="needToModify" label-position="right" :label-width="100">
                <FormItem label="商品分类">
                  <label>
                    <Select v-model="needToModify.categoryType">
                      <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </label>
                </FormItem>
                <FormItem label="商品名">
                  <Input type="text" v-model="needToModify.productName" placeholder="请输入商品名称"></Input>
                </FormItem>
                <FormItem label="商品价格">
                  <InputNumber :formatter="value => `￥ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')" :step="0.1"
                               :min="0"
                               v-model="needToModify.productPrice"></InputNumber>
                </FormItem>
                <FormItem label="商品库存">
                  <InputNumber :step="1" :min="0"
                               v-model="needToModify.productStock"></InputNumber>
                </FormItem>
                <FormItem label="商品描述">
                  <Input v-model="needToModify.productDescription" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                         placeholder="请输入商品描述"/>
                </FormItem>
                <FormItem label="商品图片">
                  <Input type="text" v-model="needToModify.productIcon" placeholder="上传图片后自动填写" disabled></Input>
                </FormItem>

                <FormItem>
                  <input type="file" ref="uploadImg"></input>
                  <Button type="text" @click="uploadProductIcon">
                    <h1>
                      <Mallki text="点击上传"></Mallki>
                    </h1>
                  </Button>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="handleSubmit">点击增加商品</Button>
                </FormItem>
              </Form>
            </Col>
            <Col span="12" style="padding-left: 100px">
              <img :src="needToModify.productIcon" alt="商品的图片，上传后自动显示"/>
            </Col>
          </Row>

        </div>
      </Drawer>
    </div>
  </div>
</template>

<script>
  import Mallki from "../../../components/Mallki";
  import uploadImg from 'smms';

  export default {
    name: "Modify",
    components: {Mallki},
    data() {
      return {
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
        needToModify: {}, // 需要重新修改的商品
        typeList: [
          {
            value: 1,
            label: '水果'
          },
          {
            value: 0,
            label: '蔬菜'
          },
          {
            value: 2,
            label: '花卉'
          },
          {
            value: 3,
            label: '家禽'
          },
        ],
        modifySomeThing: false,
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
        this.modifySomeThing = true;
        this.needToModify = this.allList[index];
        // console.log(this.needToModify);
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
          // console.log(res.data.url);
          this.needToModify.productIcon = res.data.url;
        });
        this.$Loading.finish();
      },
      handleSubmit() { // 增加商品
        this.$Loading.start();
        // product/add
        if (this.needToModify.productName === '') {
          this.$Message.error('商品名称 不能为空');
        } else if (this.needToModify.productDescription === '') {
          this.$Message.error('商品描述 不能为空');
        } else if (this.needToModify.productIcon === '') {
          this.$Message.error('请上传商品图片');
        } else { // 没了，提交~
          this.$http.post('product/update', {
            productId: this.needToModify.productId,
            productName: this.needToModify.productName,
            productPrice: this.needToModify.productPrice,
            productStock: this.needToModify.productStock,
            productDescription: this.needToModify.productDescription,
            productIcon: this.needToModify.productIcon,
            categoryType: this.needToModify.categoryType,
            productGrade: this.needToModify.productGrade
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
        }
        this.$Loading.finish();
      },
    },
  }
</script>

<style scoped>

</style>
