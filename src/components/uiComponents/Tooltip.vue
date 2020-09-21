<template lang='pug'>
  .tooltip(v-click-outside="onClose")
    .content
      slot()




</template>

<script>
import { XIcon } from 'vue-feather-icons'
import ClickOutside from 'vue-click-outside'


export default {
  props: {
    onClose: Function,
  },
  components: {
    XIcon,
  },
  computed: {

  },
  directives: {
    ClickOutside,
  },
}
</script>

<style lang="stylus" scoped>
.tooltip
  position absolute
  top: 30px;
  left: 0
  background-color $dark_grey
  z-index 9999
  border-radius 5px
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);


  .content
    .close
      position absolute
      right 10px
      top 10px
      cursor pointer



</style>