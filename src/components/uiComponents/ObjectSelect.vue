<template lang='pug'>
  .object_select
    .current(@click="openSelect()")
      | {{careObjects[current].name}}
      ArrowIcon
    .available(v-if="isShow")
      .item(v-for="(obj, index) in careObjects" @click="selectObj(index)") {{obj.name}}

</template>

<script>
  import ArrowIcon from '../../assets/images/arrow.svg'

  export default {
    name: 'ObjectSelect',
    components: { ArrowIcon },
    props: {
      careObjects: Object,
    },
    data: () => {
      return {
        current: 0,
        isShow: false,
      }
    },
    methods: {
      selectObj(index) {
        this.current = index
        this.isShow = false;
      },
      openSelect() {
        this.isShow = !this.isShow;
      }
    },
    created() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .object_select
    display inline-block
    position relative
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
    background: #FFFFFF;
    border-radius: 65px;
    min-width 180px
    max-width 200px
    color: #60626E;

    .current
      padding 14px 22px 13px
      cursor pointer
      display flex
      justify-content space-between
      align-items center
      font-size: 22px;

    .available
      position absolute
      top 0
      left 0
      right 0
      background: #FFFFFF;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
      border-radius: 7px;

      .item
        padding 11px 21px 10px
        border-bottom 1px solid #f2f2f2

        &:hover
          background-color #f2f2f2
          cursor pointer


</style>
