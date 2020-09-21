<template lang='pug'>
  .back_link(@click="onClick(link)")
    .icon
      BackArrowIcon
    | {{name}}

</template>

<script>
  import BackArrowIcon from '../../assets/images/arrow_back.svg';

  export default {
    components: {
      BackArrowIcon,
    },
    data: function () {
      return {
      }
    },
    props: {
      name: String,
      link: String,
    },
    methods: {
      onClick(link) {
        this.$router.push({ path: link });
      },
    },
    created() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .back_link
    display inline-flex
    align-items center
    cursor pointer
    font-family Montserrat
    font-style normal
    font-weight 600
    font-size 16px
    color $main_color_blue
    .icon
      margin-right 12px



</style>
