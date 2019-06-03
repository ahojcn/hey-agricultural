<template>
  <div>
    <RelaxationIndex></RelaxationIndex>
    <!--<HtmlPanel url="@/assets/aaa.html"></HtmlPanel>-->
  </div>
</template>

<script>
  import RelaxationIndex from '@/View/Layout/Relaxation/Index'
  import HtmlPanel from "@/components/HtmlPanel";

  export default {
    name: "Relaxation",
    components: {HtmlPanel, RelaxationIndex},
  }
</script>

<style scoped>

</style>
