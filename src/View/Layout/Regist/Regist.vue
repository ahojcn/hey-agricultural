<template>
  <div>
    <div style="margin-left: 42%;">
      <Logo></Logo>

      <!-- TODO 用户注册-->
      <br/>
      <br/>
      <h1 style="margin-left: 5px">
        <Mallki text="智慧农业平台-注册"></Mallki>
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
        // TODO 注册请求
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
            {type: 'string', min: 3, message: '密码长度不能小于 3', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleRegist() {

      },
    }
  }
</script>

<style scoped>

</style>
