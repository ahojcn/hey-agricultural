<template>
  <div style="padding-left: 300px; padding-right: 300px">
    <Card shadow>
      <p slot="title">个人中心</p>
      <div>
        <Col span="12">
          <img src="@/assets/logo.png" alt="touxiang" style="width: 30%">
        </Col>
        <Col span="12">
          <Upload
            multiple
            type="drag"
            action="https://sm.ms/api/upload"
            style="width: 300px"
            :multiple="false"
            :data="uploadData">
            <div style="padding: 20px 0;">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>修改头像，拖拽或选择上传！</p>
            </div>
          </Upload>
        </Col>
      </div>
      <p>
        ID：{{userData.userId}}<br/>
        用户名：{{userData.userName}}<br/>
        手机号：{{userData.userPhone}}<br/>
      </p>
    </Card>
  </div>
</template>

<script>
  export default {
    name: "SelfCenter",
    data() {
      return {
        userData: {},
        uploadData: {
          smfile: 'touxiang',
        }
      }
    },
    mounted() {
      this.$Loading.start();
      this.userData = JSON.parse(localStorage.getItem('userData'));

      this.$Loading.finish();
    }
  }
</script>

<style scoped>

</style>
