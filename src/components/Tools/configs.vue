<template lang="html">
  <div class="ui segment">
    <h3 class="ui header">{{title}}</h3>
    <div class="ui toggle checkbox">
      <input type="checkbox" name="public" v-model="visible">
      <label>显示</label>
    </div>
    <div class="ui divider">

    </div>
    <div class="ui labeled button" :class="{disabled: !visible}" tabindex="0">
      <div class="ui button" @click="toggleBtn"><i class="eyedropper icon"></i> Like </div>
      <div class="ui basic label" :style="{color: color}">
        {{color}}
      </div>
    </div>
    <color-picker v-if="btnStatus" :style-id="styleId"></color-picker>
  </div>
</template>

<script>
import colorPicker from './colorpicker.vue'
export default {
  name: 'configs',
  props: {
    title: {
      type: String,
      default: 'undefined'
    },
    styleId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      btnStatus: false
    }
  },
  computed: {
    color () {
      return this.$store.state.colorList[this.$props.styleId].hex
    },
    visible: {
      get () {
        return this.$store.getters.styleJson[this.$props.styleId].stylers.visibility === 'on'
      },
      set (val) {
        this.$store.commit('changeVisible', [this.$props.styleId, !this.visible])
      }
    }
  },
  methods: {
    toggleBtn () {
      if (this.visible) {
        this.btnStatus = !this.btnStatus
      }
    }
  },
  components: {
    colorPicker
  }
}
</script>

<style lang="css">
</style>
