<template>
  <div>
    <h1>
      商业合作
    </h1>
    <HtmlPanel :url.asyc="url1"></HtmlPanel>
  </div>
</template>

<script>
  import HtmlPanel from "../../../components/HtmlPanel";

  export default {
    name: "Index",
    components: {HtmlPanel},
    data() {
      return {
        url1: '',
        url2: '',
      }
    },
    beforeCreate() {
      location.replace('http://ahojcn.natapp1.cc/business/2019/06/06/%E5%90%88%E4%BD%9C%E6%A1%88%E4%BE%8B/')
    },
    mounted() {
      this.url1 = 'aaa.html';
      this.url2 = 'http://file.xxx.com/group1/M00/0D/3B/yyyyyyy.html'
    },
    methods: {}
  }
</script>

<style scoped>
</style>
