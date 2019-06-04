<template>
  <div>
    <Row>
      <Col span="8">
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Username">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <input type="file" ref="uploadImg"></input>
            <Button type="success" @click="uploadProductIcon">
              <Mallki text="点击上传"></Mallki>
            </Button>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
          </FormItem>
        </Form>
      </Col>
      <Col span="14" style="padding-left: 100px">
        <img v-if="productInfo.productIcon!==''" :src="productInfo.productIcon" alt="商品描述"/>
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
          productPrice: '',
          productStock: 0,
          productDescription: '', // 商品描述
          productIcon: '', // 商品图片
          categoryType: 0, // 商品类型
          productGrade: '', // 商品评分
        }, // 商品信息
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            {required: true, message: 'Please fill in the user name', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Please fill in the password.', trigger: 'blur'},
            {type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
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
