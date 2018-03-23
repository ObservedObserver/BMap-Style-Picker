<template lang="html">
<div>

    <div class="ui grid" id="main-grid">
      <div class="ten wide column">
        <bmap/>
      </div>
      <div class="six wide column">
        <div class="ui attached segment" id="configs">
          <configs v-for="(config, i) in configs"
          :title="config.featureType + ' | ' + config.elementType"
          :key="config.featureType + ' | ' + config.elementType"
          :style-id="i" />
        </div>
        <div class="ui two bottom attached buttons">
          <div class="ui green button" @click="saveOption">保存当前修改</div>
          <div class="ui yellow button" @click="createOption">创建新方案</div>
        </div>
      </div>
    </div>
    <cards/>
</div>
</template>

<script>
import colorPicker from '@/components/Tools/colorpicker.vue'
import configs from '@/components/Tools/configs.vue'
import bmap from '@/components/bmap.vue'
import cards from '@/components/Tools/cards.vue'
import modal from './Tools/jsonmodal.vue'
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
  methods: {
    createOption () {
      this.$store.commit('createOption')
    },
    saveOption () {
      this.$store.dispatch('updateOptions')
    }
  },
  mounted () {
    this.$store.dispatch('getOptions')
  },
  components: {
    modal,
    colorPicker,
    configs,
    bmap,
    cards
  }
}
</script>

<style lang="css">
#main-grid{
  height:800px;
}
#configs{
  height: 738px;
  overflow-y: auto;
}
</style>
