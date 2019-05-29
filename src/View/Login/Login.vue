<template>
  <div style="margin-left: 43%; margin-top: 50px">
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
            {type: 'string', min: 6, message: '密码长度不能小于 6', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleLogin() {
        if (this.loginData.username === '' || this.loginData.username === '') {
          this.$Message.error('用户名和密码不能为空');
          return;
        }

        localStorage.setItem('userData', JSON.stringify(this.loginData));
        // TODO: 登录验证
        this.$router.push('/');
      }
    },
    mounted() {
      this.animate = true;
    }
  }
</script>

<style scoped>

</style>
