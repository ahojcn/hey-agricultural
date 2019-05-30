<template>
  <div style="margin-left: 44%; margin-top: 50px">
    <Logo></Logo>

    <br/>
    <br/>
    <h1 style="margin-left: 5px">
      <Mallki text="智慧农业平台-登录"></Mallki>
    </h1>
    <br/>

    <Form ref="formInline" :model="loginData" :rules="loginDataRule">
      <FormItem prop="user">
        <Input type="text" v-model="loginData.username" placeholder="用户名" style="width: 220px">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="loginData.password" placeholder="密码" style="width: 220px">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button style="width: 220px" type="primary" @click="handleLogin">登录</Button>
      </FormItem>
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
        loginData: {
          username: '',
          password: '',
        },
        loginDataRule: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {type: 'string', min: 3, message: '密码长度不能小于 6', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleLogin() {
        this.$Loading.start();
        if (this.loginData.username === '' || this.loginData.username === '') {
          this.$Message.error('用户名和密码不能为空');
          this.$Loading.error();
          return;
        }

        // localStorage.setItem('userData', JSON.stringify(this.loginData));
        // TODO: 登录验证
        this.$http.post('user/login', {
          userId: this.loginData.username,
          userPassword: this.loginData.password
        }).then(res => {
          console.log(res);
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
        })
      }
    },
    mounted() {
      this.animate = true;
    }
  }
</script>

<style scoped>

</style>
