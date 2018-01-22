<template lang="html">
  <div class="ui segment">
    <chrome-picker id="color-picker" v-model="colors" />
  </div>
</template>

<script>
import { Chrome } from 'vue-color'
export default {
  name: 'color-picker',
  props: {
    styleId: {
      type: Number
    }
  },
  data () {
    return {}
  },
  computed: {
    colors: {
      get () {
        console.log(this.$store.state.colorList[this.$props.styleId])
        return this.$store.state.colorList[this.$props.styleId]
      },
      set (val) {
        console.log('val', val)
        var _color = val.hex
        var _id = this.$props.styleId
        this.$store.commit('changeColor', [_id, _color])
      }
    }
  },
  components: {
    'chrome-picker': Chrome
  }
}
</script>

<style lang="css" scoped>
#color-picker{
  margin:auto;
}
</style>
