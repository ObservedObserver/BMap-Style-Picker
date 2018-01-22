<template lang="html">
  <div class="ui container">
    <div class="ui grid" id="main-grid">
      <div class="ten wide column">
        <bmap/>
      </div>
      <div class="six wide column">
        <div class="ui segment" id="configs">
          <configs v-for="(config, i) in configs"
          :title="config.featureType + ' | ' + config.elementType"
          :key="config.featureType + ' | ' + config.elementType"
          :style-id="i" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import colorPicker from '@/components/Tools/colorpicker.vue'
import configs from '@/components/Tools/configs.vue'
import bmap from '@/components/bmap.vue'
export default {
  name: 'index-board',
  data () {
    return {}
  },
  computed: {
    configs () {
      return this.$store.getters.styleJson
    }
  },
  components: {
    colorPicker,
    configs,
    bmap
  }
}
</script>

<style lang="css">
#main-grid{
  height:800px;
}
#configs{
  height: 768px;
  overflow-y: auto;
}
</style>
