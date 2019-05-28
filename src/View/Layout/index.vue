<template>
  <div class="layout">
    <Layout>
      <Header :style="{position: 'fixed', width: '100%'}">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
            <img src="@/assets/logo.png" style="width: 50%" alt="logo"/>
          </div>

          <div class="layout-nav">
            <router-link to="/">
              <MenuItem name="Home">
                <Icon type="md-home"/>
                主页
              </MenuItem>
            </router-link>

            <MenuItem name="2">
              <Icon type="md-cafe"/>
              休闲娱乐
            </MenuItem>

            <MenuItem name="3">
              <Icon type="ios-build"/>
              技术帮扶
            </MenuItem>

            <MenuItem name="4">
              <Icon type="ios-egg"/>
              实践基地
            </MenuItem>

            <MenuItem name="5">
              <Icon type="md-thumbs-up"/>
              商业合作
            </MenuItem>
          </div>

          <!-- 右上角的个人中心 -->
          <div style="position:absolute; right: -30px;">
            <MenuItem name="6" v-show="isLogin === false">
              <Button style="color: aliceblue" @click="loginBtnClick">
                <Mallki text="登录"></Mallki>
              </Button>
              <Button style="color: aliceblue" @click="registerBtnClick">
                <Mallki text="注册"></Mallki>
              </Button>
            </MenuItem>

            <MenuItem name="7" v-show="isAdmin === true">
              <Button style="color: aliceblue" @click="loginBtnClick">
                <Mallki text="管理控制台"></Mallki>
              </Button>
            </MenuItem>

            <!-- 已经登录 -->
            <Dropdown v-show="isLogin === true">
              <a href="javascript:void(0)">
                <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
                个人中心
              </a>
              <DropdownMenu slot="list">
                <DropdownItem>驴打滚</DropdownItem>
                <DropdownItem>炸酱面</DropdownItem>
                <DropdownItem>豆汁儿</DropdownItem>
                <DropdownItem>冰糖葫芦</DropdownItem>
                <DropdownItem>北京烤鸭</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Menu>
      </Header>

      <Content :style="{margin: '88px 20px 0', background: '#f5f7f9', minHeight: '1000px'}">
        <router-view></router-view>
      </Content>

      <Footer class="layout-footer-center">2019 &copy; XPU VAE Boys Team</Footer>
    </Layout>

  </div>
</template>

<script>
  import Mallki from "@/components/Mallki";

  export default {
    name: "index",
    components: {Mallki},
    data() {
      return {
        isLogin: false, // 是否已登录
        isAdmin: false, // 是否管理员
        userData: null, // 用户信息
      }
    },
    mounted() {
      this.$Loading.start(); // 进度条开始
      if (localStorage.getItem('userData') === null) {
        localStorage.setItem('isLogin', false);
        this.$Message.info('未登录');
      } else {
        localStorage.setItem('isLogin', true);
      }
      this.$Loading.finish(); // 进度条结束
    },
    methods: {
      loginBtnClick() {
        this.$router.push('/Login');  // 跳转到 Login 界面
      },
      registerBtnClick() {
        this.$Message.info('注册功能尚未开放！敬请期待！');
      },
    }
  }
</script>

<style scoped>

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #515a6e;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 8px;
    left: 20px;
  }

  .layout-nav {
    width: 100%;
    margin: 0 auto;
    margin-right: 20px;
    margin-left: 400px;
  }

  .layout-footer-center {
    text-align: center;
  }
</style>
