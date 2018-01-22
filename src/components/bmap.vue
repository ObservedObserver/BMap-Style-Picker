<template lang="html">
    <chart :options="bmapOption" id="main-bmap" ref="bmap"></chart>
</template>
<script>
export default {
  name: 'bmap',
  data () {
    return {}
  },
  computed: {
    bmapOption () {
      return this.$store.state.bmapOption
    }
  }
}
</script>

<style lang="css">
#main-bmap{

  width: 100%;
  height: 100%;
}
</style>
