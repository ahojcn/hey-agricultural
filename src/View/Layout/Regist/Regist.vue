<template>
  <div>
    <div style="margin-left: 42%;">
      <Logo></Logo>

      <br/>
      <br/>
      <h1 style="margin-left: 5px">
        <Mallki text="智慧农业平台-注册"></Mallki>
      </h1>
      <br/>

      <Form ref="formInline" :model="userData" :rules="loginDataRule">
        <FormItem prop="userId">
          <Input type="text" v-model="userData.userId" placeholder="ID" style="width: 220px">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="userData.password" placeholder="密码" style="width: 220px">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="username">
          <Input type="text" v-model="userData.username" placeholder="姓名" style="width: 220px"></Input>
        </FormItem>
        <FormItem prop="userAddress">
          <Input type="text" v-model="userData.userAddress" placeholder="地址" style="width: 220px"></Input>
        </FormItem>
        <FormItem prop="userPhone">
          <Input type="text" v-model="userData.userPhone" placeholder="手机号" style="width: 220px"></Input>
        </FormItem>
        <FormItem>
          <Input style="width: 220px" type="text" v-model="userData.userIcon" placeholder="头像，上传图片后自动填写" disabled></Input>
        </FormItem>
        <FormItem style="width: 220px">
          <input type="file" ref="uploadImg" style="width: 130px"></input>
          <Button type="text" @click="uploadProductIcon">
            <Mallki text="点击上传"></Mallki>
          </Button>
        </FormItem>

        <FormItem>
          <Button style="width: 220px" type="primary" @click="handleRegist">注册</Button>
        </FormItem>
      </Form>

    </div>
  </div>
</template>

<script>
  import Mallki from "@/components/Mallki";
  import Logo from "@/components/Logo";

  export default {
    name: "Regist",
    components: {Logo, Mallki},
    data() {
      return {
        userData: {
          userId: '',
          password: '', // 密码
          username: '', // 用户名
          userAddress: '', // 家庭住址,收货地址
          userIsman: 1,
          userPhone: '1', // 手机号
          userIcon: '', // 用户头像地址
        },
        loginDataRule: {
          userId: [
            {required: true, message: '请输入ID', trigger: 'blur'},
            {type: 'string', min: 5, message: 'ID不可小于5', trigger: 'blur'}
          ],
          username: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {type: 'string', max: 50, message: '姓名长度过长', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {type: 'string', min: 3, message: '密码长度不能小于 3', trigger: 'blur'}
          ],
          userAddress: [
            {required: true, message: '请输入收货地址', trigger: 'blur'},
          ],
          userPhone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {type: 'string', min: 11, message: '手机号错误', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      handleRegist() {
        this.$Loading.start();

        if (this.userData.userId === ''
          || this.userData.username === ''
          || this.userData.userAddress === ''
          || (this.userData.userPhone === '1' && this.userData.userPhone !== 11)) {
          this.$Message.error('请检查信息是否正确');
          this.$Loading.error();
          return;
        }

        this.$http.post('user/register', {
          userId: this.userData.userId,
          userPassword: this.userData.password,
          userName: this.userData.username,
          userAddress: this.userData.userAddress,
          userIsman: this.userData.userIsman,
          userPhone: this.userData.userPhone,
          userIcon: this.userData.userIcon,
        }).then(res => {
          if (res.body.code === 0) {
            this.$Message.success('注册成功');
            this.$Message.success('欢迎您，' + this.userData.username);
          } else {
            this.$Message.error(res.body.msg);
          }
        }, err => {
          this.$Loading.error();
          console.log(err);
          this.$Message.error('注册失败，服务器异常！');
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
