<template>
  <div id="app">
    <div class="app-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'app',
    components: {

    },
    computed: {

    },
    methods: {
    },
    async mounted() {
    }
  }
</script>

<style lang="stylus">
  @import "~normalize.css"
  @import "styles/styles.styl"
  @import "styles/bootstrap.css"

</style>
