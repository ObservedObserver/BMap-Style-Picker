<template lang="html">
  <div class="ui segment">
    <div class="ui cards">
      <div class="ui link card" v-for="(option, i) in options"
      :key="option.name">
        <div class="content">
          <div class="header">{{option.name}}</div>
          <div class="meta">{{option.date}}</div>
          <div class="description"></div>
        </div>
        <div class="extra content">
          <div class="ui two buttons">
            <button type="button" class="ui red button" @click="showModal">json</button>
            <button type="button" class="ui green button" @click="changeOption(i)">map</button>
          </div>
        </div>
      </div>
    </div>
    <modal ref="modal" :show="false" />
  </div>
</template>

<script>
import modal from './jsonmodal.vue'
export default {
  name: 'CardsList',
  data () {
    return {}
  },
  methods: {
    changeOption (i) {
      this.$store.commit('changeOption', i)
    },
    showModal () {
      console.log(this.$refs.modal)
      this.$refs.modal.changeShow()
    }
  },
  computed: {
    options () {
      return this.$store.getters.options
    }
  },
  components: {
    modal
  }
}
</script>

<style lang="css">
</style>
