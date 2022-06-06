<!-- Vuex练习 -->
<template>

  <div>
    <button @click="increment">{{ $store.state.count }}</button>
    <h2>{{ $store.getters.showNum }}</h2>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  name: '',
  data () {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'showNum'
    ])
  },
  methods: {
    ...mapActions(['increment']),
    ...mapMutations(['addN']),
    increment () {
      // // this.$store.commit('increment',1010)
      this.$store.dispatch('increment', 5)
      // console.log(this.$store.state.count)
    }

  },
}
</script>

<style scoped>
</style>