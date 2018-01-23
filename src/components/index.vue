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
    <div class="ui segment">
      <div class="ui cards">
        <div class="ui link card" v-for="(option, i) in options"
        @click="changeOption(i)"
        :key="option.name">
          <div class="content">
            <div class="header">{{option.name}}</div>
            <div class="meta">{{option.date}}</div>
            <div class="description"></div>
          </div>
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
    },
    options () {
      return this.$store.getters.options
    }
  },
  methods: {
    changeOption (i) {
      this.$store.commit('changeOption', i)
    },
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
  height: 738px;
  overflow-y: auto;
}
</style>
