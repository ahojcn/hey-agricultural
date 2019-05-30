<template>
  <div class="layout">
    <Layout>
      <Header :style="{position: 'absolute', width: '100%'}">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
            <img src="@/assets/logo.png" alt="logo" style="width: 50%;" onclick="location.reload()"/>
          </div>

          <div class="layout-nav">
            <router-link to="/">
              <MenuItem name="Home">
                <Icon type="md-home"/>
                主页
              </MenuItem>
            </router-link>

            <MenuItem name="2" to="/Relaxation">
              <Icon type="md-cafe"/>
              休闲娱乐
            </MenuItem>

            <MenuItem name="3" to="/Support">
              <Icon type="ios-build"/>
              技术帮扶
            </MenuItem>

            <MenuItem name="4" to="/Practice">
              <Icon type="ios-egg"/>
              实践基地
            </MenuItem>

            <MenuItem name="5" to="/Business">
              <Icon type="md-thumbs-up"/>
              商业合作
            </MenuItem>
          </div>

          <!-- 右上角的个人中心 -->
          <div style="position:absolute; right: -20px;">
            <MenuItem name="6" v-if="isLogin === false || isLogin === null">
              <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
              <Button type="text" style="color: aliceblue" ghost to="Login">
                <h2>
                  <Mallki text="登录"></Mallki>
                </h2>
              </Button>
              <Button type="text" style="color: aliceblue" ghost to="Regist">
                <h2>
                  <Mallki text="注册"></Mallki>
                </h2>
              </Button>
            </MenuItem>

            <MenuItem name="7" v-show="isAdmin === true">
              <Button style="color: aliceblue">
                <Mallki text="管理控制台"></Mallki>
              </Button>
            </MenuItem>

            <!-- 已经登录 -->
            <Dropdown v-show="isLogin === true" @on-click="handleClick">
              <a href="javascript:void(0)">
                <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
                个人中心
              </a>
              <DropdownMenu slot="list">
                <DropdownItem>1</DropdownItem>
                <DropdownItem>2</DropdownItem>
                <DropdownItem>3</DropdownItem>
                <DropdownItem>4</DropdownItem>
                <DropdownItem name="logout" divided>退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Menu>
      </Header>

      <Content :style="{margin: '88px 20px 0', background: '#f5f7f9', minHeight: '1000px'}">
        <transition enter-active-class="fadeIn" mode="out-in" translate="yes" leave-active-class="fadeOut">
          <router-view v-if="animate" class="animated"></router-view>
        </transition>
      </Content>

      <!-- 回到顶部开关 -->
      <BackTop></BackTop>

      <Footer class="layout-footer-center">2019 &copy; XPU VAE Boys Team</Footer>
    </Layout>

  </div>
</template>

<script>
  import Mallki from "@/components/Mallki";
  import Logo from "@/components/Logo";

  export default {
    name: "index",
    components: {Logo, Mallki},
    data() {
      return {
        animate: false, // 动画控制
        isLogin: false, // 是否已登录
        isAdmin: false, // 是否管理员
        userData: null, // 用户信息
      }
    },
    mounted() {
      this.$Loading.start(); // 进度条开始

      this.animate = true;
      this.isLogin = JSON.parse(localStorage.getItem('isLogin'));

      if (localStorage.getItem('userData') === null) {
        localStorage.setItem('isLogin', false);
        this.$Message.info('未登录');
      } else {
        localStorage.setItem('isLogin', true);
      }

      this.$Loading.finish(); // 进度条结束
    },
    methods: {

      // 退出登录
      handleClick(name) {
        if (name === 'logout') {
          this.$http.post('user/logout', {}).then(res => {
            // console.log(res);
            console.log('logout');
          }, () => { // 异常
            this.$Loading.error();
            this.$Message.error('服务器异常');
          });

          localStorage.clear();
          sessionStorage.clear();
          this.$Message.success('退出登录');
          setTimeout(function () {
            location.reload();
          }, 1000);
        } else {
          // 处理其他点击事件
        }
      }
    },
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
    overflow: scroll;
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
    z-index: auto;
    /*margin-left: 370px;*/
  }

  .layout-footer-center {
    text-align: center;
  }
</style>
