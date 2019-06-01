<template>
  <div style="margin-left: 42%;">
    <Logo></Logo>

    <br/>
    <br/>
    <h1 style="margin-left: 5px">
      <Mallki text="智慧农业平台-登录"></Mallki>
    </h1>
    <br/>

    <Form ref="formInline" :model="userData" :rules="loginDataRule">
      <FormItem prop="user">
        <Input type="text" v-model="userData.username" placeholder="用户名" style="width: 220px">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="userData.password" placeholder="密码" style="width: 220px">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button style="width: 220px" type="primary" @click="handleLogin">
          登录
        </Button>
      </FormItem>
      <FormItem>
        <router-link to="/Regist">
          <Button style="width: 220px" type="success">
            注册
          </Button>
        </router-link>
      </FormItem>
      userId：11111 password：11111<br/>
      userId：00000 password：123456<br/>
    </Form>
  </div>
</template>

<script>
  import Mallki from "@/components/Mallki";
  import Logo from "@/components/Logo";

  export default {
    name: "Login",
    components: {Logo, Mallki},
    data() {
      return {
        userData: {
          username: '11111',
          password: '11111',
        },
        loginDataRule: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {type: 'string', min: 3, message: '密码长度不能小于 6', trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      handleLogin() {
        this.$Loading.start();
        if (this.userData.username === '' || this.userData.username === '') {
          this.$Message.error('用户名和密码不能为空');
          this.$Loading.error();
          return;
        }

        this.$http.post('user/login', {
          userId: this.userData.username,
          userPassword: this.userData.password
        }).then(res => {
          if (res.body.data.userIsman === 0) { // 是管理员
            localStorage.setItem('isAdmin', 'true');
          }

          if (res.body.code === 0) {
            this.$Message.success('登录成功');
            localStorage.setItem('userData', JSON.stringify(res.body.data));

            localStorage.setItem('isLogin', 'true');
            localStorage.setItem('refresh', '1');
            this.$Loading.finish();
            this.$router.push('/');
          } else {
            this.$Message.error(res.body.msg);
            this.$Loading.error();
          }
        }, () => { // 异常
          this.$Loading.error();
          this.$Message.error('服务器异常');
        })
      }
    },
    mounted() {
      this.animate = true;
    },
    beforeCreate() {
      // 如果已经登录，跳转至首页
      if (JSON.parse(localStorage.getItem('isLogin')) === true) {
        this.$router.push('/');
      }
    },
  }
</script>

<style scoped>

</style>
