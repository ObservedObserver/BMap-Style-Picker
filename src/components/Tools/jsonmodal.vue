<template lang="html">
<div class="ui active modal" v-if="show">
  <i class="close link icon" @click="changeShow"></i>
  <div class="header">
    JSON STYLE
  </div>
  <div class="content">
    <div class="description">
      <p>{{jsonStyle}}</p>
    </div>
  </div>
  <div class="actions">
    <div class="ui green button" @click="changeShow">
      <i class="checkmark icon"></i>
      Return
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'JsonModal',
  data () {
    return {
      show: false
    }
  },
  methods: {
    changeShow () {
      this.show = !this.show
    }
  },
  computed: {
    jsonStyle () {
      var data = JSON.stringify(this.$store.getters.styleJson)
      data.replace(/["0-9]|(false|true),/, ', ')
      console.log(data)
      return data
    }
  }
}
</script>

<style lang="css">
</style>
