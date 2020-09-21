<template lang='pug'>
  .popup
    .content
      .close(@click="onClose()")
        XIcon
      slot()




</template>

<script>
import { XIcon } from 'vue-feather-icons'



export default {
  props: {
    onClose: Function,
  },
  components: {
    XIcon,
  },
  computed: {

  },
}
</script>

<style lang="stylus" scoped>
  .popup
    position fixed
    top: 0
    left: 0
    width 100%
    height 100%
    background-color rgba(0, 0, 0, 0.5)
    z-index 9999
    overflow: scroll;
    display flex
    justify-content center
    align-items center


    .content
      margin 0px auto
      margin-bottom 50px
      top 50px
      left 0
      right 0
      z-index 10000
      width 500px
      position absolute
      box-sizing border-box
      opacity 1
      background white
      padding 30px 20px
      border-radius 20px

      .close
        position absolute
        right 10px
        top 10px
        cursor pointer



</style>