<template>
  <div>
    <Row>
      <Col span="12">
        <Form ref="formInline" :model="productInfo" label-position="right" :label-width="100">
          <FormItem label="商品分类">
            <label>
              <Select v-model="productInfo.categoryType">
                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </label>
          </FormItem>
          <FormItem label="商品名">
            <Input type="text" v-model="productInfo.productName" placeholder="请输入商品名称"></Input>
          </FormItem>
          <FormItem label="商品价格">
            <InputNumber :formatter="value => `￥ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')" :step="0.1" :min="0"
                         v-model="productInfo.productPrice"></InputNumber>
          </FormItem>
          <FormItem label="商品库存">
            <InputNumber :step="1" :min="0"
                         v-model="productInfo.productStock"></InputNumber>
          </FormItem>
          <FormItem label="商品描述">
            <Input v-model="productInfo.productDescription" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入商品描述"/>
          </FormItem>
          <FormItem label="商品图片">
            <Input type="text" v-model="productInfo.productIcon" placeholder="上传图片后自动填写" disabled></Input>
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
        <img :src="productInfo.productIcon" alt="商品的图片，上传后自动显示"/>
      </Col>
    </Row>

  </div>
</template>

<script>
  import uploadImg from 'smms';
  import Mallki from "../../../components/Mallki";

  export default {
    name: "Add",
    components: {Mallki},
    data() {
      return {
        productInfo: {
          productName: '',
          productPrice: 0.0,
          productStock: 0,
          productDescription: '', // 商品描述
          productIcon: '', // 商品图片
          categoryType: 1, // 商品类型
          productGrade: '5', // 商品评分
        }, // 商品信息 (0、蔬菜 1、水果 2、花草 3、家禽)
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
      }
    },
    methods: {
      handleSubmit() { // 增加商品
        this.$Loading.start();
        // product/add
        if (this.productInfo.productName === '') {
          this.$Message.error('商品名称 不能为空');
        } else if (this.productInfo.productDescription === '') {
          this.$Message.error('商品描述 不能为空');
        } else if (this.productInfo.productIcon === '') {
          this.$Message.error('请上传商品图片');
        } else { // 没了，提交~
          this.$http.post('product/add', {
            productName: this.productInfo.productName,
            productPrice: this.productInfo.productPrice,
            productStock: this.productInfo.productStock,
            productDescription: this.productInfo.productDescription,
            productIcon: this.productInfo.productIcon,
            categoryType: this.productInfo.categoryType,
            productGrade: this.productInfo.productGrade
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
          this.productInfo.productIcon = res.data.url;
        });
        this.$Loading.finish();
      }
    }
  }
</script>

<style scoped>

</style>
