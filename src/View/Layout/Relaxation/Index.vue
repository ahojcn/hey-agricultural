<template>
  <div>
    <Row>
      <Col span="6">
        <Card title="休闲娱乐" :padding="0" shadow style="width: 300px;">
          <CellGroup>
            <Cell name="植物认领" title="植物认领" label="我是不是你最可爱的小花花" to="CropsClaim">
              <Icon type="md-flower" slot="icon"/>
              <Badge text="hot" slot="extra"/>
            </Cell>

            <Cell name="采摘预约" title="采摘预约" label="自己动手丰衣足食" to="SelfPicking">
              <Icon type="ios-basket-outline" slot="icon"/>
            </Cell>

            <Cell name="旅游度假" title="旅游度假" label="这里有你要的梦和远方" to="Tourism">
              <Icon type="ios-car" slot="icon"/>
            </Cell>

            <Cell name="饮食住宿" title="饮食住宿" label="吃的好睡的香" to="Daily">
              <Icon type="ios-glasses" slot="icon"/>
            </Cell>
          </CellGroup>
        </Card>
      </Col>

      <Col span="18">
        <transition enter-active-class="fadeIn" mode="out-in" translate="yes" leave-active-class="fadeOut">
          <router-view v-if="animate" class="animated"></router-view>
        </transition>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        animate: false, // 动画控制
      }
    },
    mounted() {
      this.$Loading.start();
      this.animate = true;
      this.$Loading.finish();
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
