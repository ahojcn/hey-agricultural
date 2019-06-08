<template>
  <div>
    <h3>请填写预约信息，花草，蔬菜，水果都可以采摘</h3><br/>
    <Form ref="formInline" :model="formInline" style="width: 300px;">
      <FormItem prop="user">
        <Select v-model="selected">
          <Option v-for="item in allCropsList" :value="item.productId" :key="item.productId">{{ item.productName }}
          </Option>
        </Select>
        ID：{{selected}}
      </FormItem>
      <FormItem prop="text">
        <DatePicker style="width: 300px" :value="formInline.pickTime" type="date" placeholder="预约日期"></DatePicker>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit">提交预约</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: "SelfPicking",
    data() {
      return {
        formInline: {
          pickProduct: '',
          pickTime: new Date()
        },
        // 可以采摘的所有作物预约
        allCropsList: [],
        // 选择的采摘作物
        selected: '',
      }
    },
    mounted() {
      this.$Loading.start();
      // 获取所有可采摘的农作物列表
      this.getAllCropsList();

      this.$Loading.finish();
    },
    methods: {
      // 点击提交预约触发函数
      handleSubmit() {
        this.$http.post('pick/addMyPick', {
          pickProduct: this.selected,
          pickTime: this.formInline.pickTime.getTime()
        }).then(res => {
          if (res.body.code === 0) {
            this.$Message.success(res.body.msg);
          } else {
            this.$Message.error(res.body.msg);
            this.$Loading.error();
          }
        }, err => {
          this.$Loading.error();
          console.log(err);
          this.$Message.error('服务器异常');
        });
      },
      // 获取所有可采摘的农作物列表
      getAllCropsList() {
        this.$http.post('product/list', {}).then(res => {
          if (res.body.code === 0) {
            this.allCropsList = res.body.data;
          } else {
            this.$Loading.error();
            this.$Message.error(res.body.msg);
          }
        }, err => {
          console.log(err);
          this.$Loading.error();
        });
      },
    }
  }
</script>

<style scoped>

</style>
